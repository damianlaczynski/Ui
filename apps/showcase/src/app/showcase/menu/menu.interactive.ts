import { Component, signal, computed, viewChild } from '@angular/core';
import { MenuComponent, MenuItem, Variant, Appearance, Size, Shape, IconName } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { MENU_SHOWCASE_CONFIG } from './menu.showcase.config';

@Component({
  selector: 'app-menu-interactive',
  imports: [MenuComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-menu
          [triggerVariant]="currentTriggerVariant()"
          [text]="currentText()"
          [icon]="currentIcon()"
          [menuItems]="menuItems"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [disabled]="currentDisabled()"
          [selected]="currentSelected()"
          [ariaLabel]="currentAriaLabel()"
          [menuMaxHeight]="currentMenuMaxHeight()"
          (menuItemClick)="onItemClick($event); logEvent('menuItemClick', $event)"
          (primaryClick)="onPrimaryClick($event); logEvent('primaryClick')"
          (menuOpened)="logEvent('menuOpened')"
          (menuClosed)="logEvent('menuClosed')"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class MenuInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = MENU_SHOWCASE_CONFIG;

  menuItems: MenuItem[] = [
    { id: 'new', label: 'New File', icon: 'document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open File', icon: 'folder', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'export', label: 'Export', icon: 'arrow_download' },
  ];

  private values = signal<Record<string, unknown>>({
    triggerVariant: 'dropdown',
    text: 'Open Menu',
    icon: '',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selected: false,
    ariaLabel: 'Open menu',
    menuMaxHeight: '300px',
  });

  currentTriggerVariant = computed(
    () => (this.values()['triggerVariant'] as 'dropdown' | 'split' | 'button') ?? 'dropdown',
  );
  currentText = computed(() => (this.values()['text'] as string) ?? 'Open Menu');
  currentIcon = computed((): IconName | undefined => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => (this.values()['shape'] as Shape) ?? 'rounded');
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelected = computed(() => this.values()['selected'] as boolean);
  currentAriaLabel = computed(() => (this.values()['ariaLabel'] as string) ?? 'Open menu');
  currentMenuMaxHeight = computed(() => (this.values()['menuMaxHeight'] as string) ?? '300px');

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onItemClick(_item: MenuItem): void {}

  onPrimaryClick(_event: MouseEvent): void {}

  logEvent(name: string, data?: MenuItem | MouseEvent): void {
    const payload =
      data && typeof data === 'object' && 'label' in data
        ? { label: (data as MenuItem).label, id: (data as MenuItem).id }
        : undefined;
    this.showcase()?.logEvent(name, payload);
  }
}
