import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'ui';
import { DropdownComponent } from 'ui';
import { TextComponent } from 'ui';
import { TextareaComponent } from 'ui';
import { SwitchComponent } from 'ui';
import { NumberComponent } from 'ui';
import { IconName, IconComponent } from 'ui';

export type ControlType = 'dropdown' | 'text' | 'textarea' | 'number' | 'switch' | 'color';
export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'custom';

export interface ControlOption {
  value: string | number | boolean;
  label: string;
}

export interface ShowcaseControl {
  key: string;
  label: string;
  type: ControlType;
  description?: string;
  options?: ControlOption[];
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  rows?: number;
  group?: string;
}

export interface ShowcaseControlGroup {
  id: string;
  label: string;
  icon?: IconName;
  expanded?: boolean;
}

export interface ShowcaseConfig {
  componentSelector?: string;
  controls: ShowcaseControl[];
  controlGroups?: ShowcaseControlGroup[];
}

export interface ShowcaseEvent {
  name: string;
  timestamp: string;
  data?: any;
}

interface ViewportOption {
  value: ViewportSize;
  label: string;
  width: number;
  icon: IconName;
}

@Component({
  selector: 'app-interactive-showcase',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    IconComponent,
    DropdownComponent,
    TextComponent,
    TextareaComponent,
    SwitchComponent,
    NumberComponent,
  ],
  templateUrl: './interactive-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveShowcaseComponent {
  config = input<ShowcaseConfig>();
  initialValues = input<Record<string, any>>();
  showCopyCode = input<boolean>(true);
  showEventLog = input<boolean>(true);
  showViewportControls = input<boolean>(true);
  showPreview = input<boolean>(true);
  maxEventLogItems = input<number>(10);

  // Outputs
  valuesChange = output<Record<string, any>>();
  resetRequested = output<void>();
  codeCopyRequested = output<void>();

  // Internal state
  isDarkTheme = signal<boolean>(false);
  private controlValues = signal<Record<string, any>>({});
  eventLog = signal<ShowcaseEvent[]>([]);

  // Viewport state
  currentViewport = signal<ViewportSize>('desktop');
  customWidth = signal<number>(800);
  isResizing = signal<boolean>(false);
  private resizeStartX = 0;
  private resizeStartWidth = 0;

  // Code panel state
  isCodePanelOpen = signal<boolean>(false);
  codeCopied = signal<boolean>(false);

  // Control groups state
  expandedGroups = signal<Set<string>>(new Set());

  // Viewport options
  readonly viewportOptions: ViewportOption[] = [
    { value: 'mobile', label: 'Mobile', width: 375, icon: 'phone' as IconName },
    { value: 'tablet', label: 'Tablet', width: 768, icon: 'tablet' as IconName },
    { value: 'desktop', label: 'Desktop', width: 0, icon: 'desktop' as IconName },
    { value: 'custom', label: 'Custom', width: 0, icon: 'resize' as IconName },
  ];

  // Computed control groups with controls
  controlGroups = computed(() => {
    const cfg = this.config();
    if (!cfg?.controlGroups || cfg.controlGroups.length === 0) {
      return null;
    }

    const groups = cfg.controlGroups.map(group => ({
      ...group,
      controls: cfg.controls.filter(c => c.group === group.id),
    }));

    // Add ungrouped controls
    const ungroupedControls = cfg.controls.filter(c => !c.group);
    if (ungroupedControls.length > 0) {
      groups.push({
        id: '_ungrouped',
        label: 'Other',
        controls: ungroupedControls,
        expanded: true,
      });
    }

    return groups;
  });

  // Computed preview width
  previewWidth = computed(() => {
    const viewport = this.currentViewport();
    if (viewport === 'desktop') return '100%';
    if (viewport === 'custom') return `${this.customWidth()}px`;
    const option = this.viewportOptions.find(v => v.value === viewport);
    return option ? `${option.width}px` : '100%';
  });

  // Computed generated code
  generatedCode = computed(() => {
    const cfg = this.config();
    if (!cfg?.componentSelector) return '';

    const values = this.controlValues();
    const attrs: string[] = [];

    cfg.controls.forEach(control => {
      const value = values[control.key];
      if (value === undefined || value === control.defaultValue) return;

      if (typeof value === 'boolean') {
        if (value) {
          attrs.push(`[${control.key}]="true"`);
        }
      } else if (typeof value === 'number') {
        attrs.push(`[${control.key}]="${value}"`);
      } else if (typeof value === 'string' && value) {
        attrs.push(`${control.key}="${value}"`);
      }
    });

    const selector = cfg.componentSelector;
    if (attrs.length === 0) {
      return `<${selector}></${selector}>`;
    }

    if (attrs.length <= 2) {
      return `<${selector} ${attrs.join(' ')}></${selector}>`;
    }

    return `<${selector}\n  ${attrs.join('\n  ')}\n></${selector}>`;
  });

  constructor() {
    effect(() => {
      const cfg = this.config();
      if (!cfg?.controls?.length) return;
      const initial = this.initialValues();
      if (initial && Object.keys(initial).length > 0) {
        const defaults: Record<string, any> = {};
        cfg.controls.forEach(c => {
          defaults[c.key] = c.defaultValue;
        });
        this.controlValues.set({ ...defaults, ...initial });
        this.valuesChange.emit(this.controlValues());
        return;
      }
      const current = this.controlValues();
      const configKeys = cfg.controls
        .map(c => c.key)
        .sort()
        .join(',');
      const currentKeys = Object.keys(current).sort().join(',');
      if (currentKeys !== configKeys) {
        this.initializeDefaults();
      }
      this.valuesChange.emit(this.controlValues());
    });
  }

  private initializeDefaults(): void {
    const cfg = this.config();
    if (cfg?.controls) {
      const defaults: Record<string, any> = {};
      cfg.controls.forEach(control => {
        defaults[control.key] = control.defaultValue;
      });
      this.controlValues.set(defaults);
    }
  }

  // === COMPUTED - Control values and items ===
  // Use computed to prevent infinite loops from function calls in templates

  controlValuesMap = computed(() => this.controlValues());

  // Computed: Dropdown items per control (stable references)
  dropdownItemsMap = computed(() => {
    const cfg = this.config();
    if (!cfg?.controls) return new Map<string, { value: string | number; label: string }[]>();

    const map = new Map<string, { value: string | number; label: string }[]>();

    cfg.controls.forEach(control => {
      if (control.type === 'dropdown' && control.options) {
        const items = control.options.map(opt => ({
          value: typeof opt.value === 'boolean' ? String(opt.value) : opt.value,
          label: opt.label,
        }));
        map.set(control.key, items);
      }
    });

    return map;
  });

  getControlValue(key: string): any {
    return this.controlValuesMap()[key];
  }

  getControlTypeName(control: ShowcaseControl): string {
    if (control.type === 'dropdown' && control.options) {
      const types = control.options.map(o =>
        typeof o.value === 'string' ? `'${o.value}'` : String(o.value),
      );
      if (types.length <= 4) {
        return types.join(' | ');
      }
      return `${types.slice(0, 3).join(' | ')} | ...`;
    }
    switch (control.type) {
      case 'text':
      case 'textarea':
        return 'string';
      case 'number':
        return 'number';
      case 'switch':
        return 'boolean';
      case 'color':
        return 'color';
      default:
        return control.type;
    }
  }

  getDropdownItems(control: ShowcaseControl): { value: string | number; label: string }[] {
    // Get from computed map - stable reference
    return this.dropdownItemsMap().get(control.key) || [];
  }

  onControlChange(key: string, value: any): void {
    const control = this.config()?.controls.find(c => c.key === key);

    // Handle different value types from dropdown
    let normalizedValue: any = value;

    // If value is array (shouldn't happen in single mode, but just in case)
    if (Array.isArray(value)) {
      normalizedValue = value.length > 0 ? value[0] : undefined;
    }

    // Convert back to boolean if needed
    if (control?.type === 'dropdown' && control.options) {
      const originalOption = control.options.find(
        opt => String(opt.value) === String(normalizedValue),
      );
      if (originalOption && typeof originalOption.value === 'boolean') {
        normalizedValue = originalOption.value;
      }
    }

    if (normalizedValue !== undefined) {
      this.updateValue(key, normalizedValue);
    }
  }

  onTextChange(key: string, value: any): void {
    this.updateValue(key, value);
  }

  private updateValue(key: string, value: any): void {
    this.controlValues.update(values => ({
      ...values,
      [key]: value,
    }));
    this.valuesChange.emit(this.controlValues());
  }

  toggleTheme(): void {
    this.isDarkTheme.update(v => !v);
  }

  onReset(): void {
    this.initializeDefaults();
    this.eventLog.set([]);
    this.currentViewport.set('desktop');
    this.customWidth.set(800);
    this.valuesChange.emit(this.controlValues());
    this.resetRequested.emit();
  }

  // Viewport methods
  setViewport(viewport: ViewportSize): void {
    this.currentViewport.set(viewport);
  }

  getViewportIcon(viewport: ViewportSize): IconName {
    return this.viewportOptions.find(v => v.value === viewport)?.icon || ('desktop' as IconName);
  }

  // Resize handle methods
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing.set(true);
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.customWidth();

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.onResizeEnd);
  }

  private onResizeMove = (event: MouseEvent): void => {
    if (!this.isResizing()) return;

    const delta = event.clientX - this.resizeStartX;
    const newWidth = Math.max(320, Math.min(1200, this.resizeStartWidth + delta * 2));
    this.customWidth.set(newWidth);
    this.currentViewport.set('custom');
  };

  private onResizeEnd = (): void => {
    this.isResizing.set(false);
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };

  // Code panel methods
  toggleCodePanel(): void {
    this.isCodePanelOpen.update(v => !v);
  }

  async copyCodeToClipboard(): Promise<void> {
    const code = this.generatedCode();
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      this.codeCopied.set(true);
      setTimeout(() => this.codeCopied.set(false), 2000);
    } catch {
      console.error('Failed to copy code');
    }
  }

  onCopyCode(): void {
    this.copyCodeToClipboard();
    this.codeCopyRequested.emit();
  }

  // Event log methods
  logEvent(name: string, data?: any): void {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    this.eventLog.update(log => {
      const newLog = [{ name, timestamp, data }, ...log];
      return newLog.slice(0, this.maxEventLogItems());
    });
  }

  clearEventLog(): void {
    this.eventLog.set([]);
  }

  formatEventData(data: any): string {
    if (data === undefined || data === null) return '';
    if (typeof data === 'object') {
      try {
        return JSON.stringify(data);
      } catch {
        return String(data);
      }
    }
    return String(data);
  }

  getValues(): Record<string, any> {
    return this.controlValues();
  }

  // Control groups methods
  isGroupExpanded(groupId: string): boolean {
    const cfg = this.config();
    const group = cfg?.controlGroups?.find(g => g.id === groupId);
    const expanded = this.expandedGroups();

    // If explicitly set in state, use that
    if (expanded.has(groupId)) return true;
    if (expanded.has(`_collapsed_${groupId}`)) return false;

    // Otherwise use default from config (default true)
    return group?.expanded !== false;
  }

  toggleGroup(groupId: string): void {
    this.expandedGroups.update(groups => {
      const newGroups = new Set(groups);
      const isCurrentlyExpanded = this.isGroupExpanded(groupId);

      if (isCurrentlyExpanded) {
        newGroups.delete(groupId);
        newGroups.add(`_collapsed_${groupId}`);
      } else {
        newGroups.delete(`_collapsed_${groupId}`);
        newGroups.add(groupId);
      }

      return newGroups;
    });
  }

  expandAllGroups(): void {
    const cfg = this.config();
    if (!cfg?.controlGroups) return;

    this.expandedGroups.update(() => {
      const newGroups = new Set<string>();
      cfg.controlGroups!.forEach(g => newGroups.add(g.id));
      newGroups.add('_ungrouped');
      return newGroups;
    });
  }

  collapseAllGroups(): void {
    const cfg = this.config();
    if (!cfg?.controlGroups) return;

    this.expandedGroups.update(() => {
      const newGroups = new Set<string>();
      cfg.controlGroups!.forEach(g => newGroups.add(`_collapsed_${g.id}`));
      newGroups.add('_collapsed__ungrouped');
      return newGroups;
    });
  }
}
