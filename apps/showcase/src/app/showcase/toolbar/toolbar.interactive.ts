import { Component, computed, signal, viewChild } from '@angular/core';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import { ToolbarComponent, type Size, type ToolbarGroup, type ToolbarItem } from 'ui';
import { TOOLBAR_SHOWCASE_CONFIG } from './toolbar.showcase.config';

type Orientation = 'horizontal' | 'vertical';

interface ToolbarInteractiveForm {
  size: Size;
  orientation: Orientation;
  useGroups: boolean;
  withLabels: boolean;
  disabled: boolean;
  selected: boolean;
  overflow: boolean;
}

@Component({
  selector: 'app-toolbar-interactive',
  imports: [ToolbarComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-toolbar
          [items]="currentUseGroups() ? [] : interactiveItems()"
          [groups]="currentUseGroups() ? interactiveGroups() : []"
          [size]="currentSize()"
          [orientation]="currentOrientation()"
          [overflow]="currentOverflow()"
          (itemClick)="onItemClick($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class ToolbarInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TOOLBAR_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    useGroups: false,
    withLabels: false,
    disabled: false,
    selected: false,
    overflow: false,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentUseGroups = computed(() => this.values()['useGroups'] as boolean);
  currentWithLabels = computed(() => this.values()['withLabels'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelected = computed(() => this.values()['selected'] as boolean);
  currentOverflow = computed(() => this.values()['overflow'] as boolean);

  interactiveItems = computed<ToolbarItem[]>(() =>
    this.toItems({
      size: this.currentSize(),
      orientation: this.currentOrientation(),
      useGroups: this.currentUseGroups(),
      withLabels: this.currentWithLabels(),
      disabled: this.currentDisabled(),
      selected: this.currentSelected(),
      overflow: this.currentOverflow(),
    }),
  );

  interactiveGroups = computed<ToolbarGroup[]>(() => {
    const options: ToolbarInteractiveForm = {
      size: this.currentSize(),
      orientation: this.currentOrientation(),
      useGroups: this.currentUseGroups(),
      withLabels: this.currentWithLabels(),
      disabled: this.currentDisabled(),
      selected: this.currentSelected(),
      overflow: this.currentOverflow(),
    };

    return [
      {
        id: 'file',
        items: this.toItems(options, [
          { id: 'new', label: 'New', icon: 'document_add' },
          { id: 'open', label: 'Open', icon: 'folder_open' },
          { id: 'save', label: 'Save', icon: 'save' },
        ]),
      },
      {
        id: 'format',
        items: this.toItems(options, [
          { id: 'bold', label: 'Bold', icon: 'text_bold' },
          { id: 'italic', label: 'Italic', icon: 'text_italic' },
          { id: 'underline', label: 'Underline', icon: 'text_underline' },
        ]),
      },
    ];
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onItemClick(item: ToolbarItem): void {
    this.showcase()?.logEvent('itemClick', { id: item.id });
  }

  private toItems(
    form: ToolbarInteractiveForm,
    source: Array<{ id: string; label: string; icon: ToolbarItem['icon'] }> = [
      { id: 'bold', label: 'Bold', icon: 'text_bold' },
      { id: 'italic', label: 'Italic', icon: 'text_italic' },
      { id: 'underline', label: 'Underline', icon: 'text_underline' },
      { id: 'strikethrough', label: 'Strikethrough', icon: 'text_strikethrough' },
    ],
  ): ToolbarItem[] {
    return source.map((item, index) => ({
      id: item.id,
      label: form.withLabels ? item.label : undefined,
      icon: item.icon,
      type: form.selected ? 'toggle' : 'button',
      selected: form.selected ? index === 0 : false,
      disabled: form.disabled ? index % 3 === 2 : false,
      tooltip: item.label,
    }));
  }
}
