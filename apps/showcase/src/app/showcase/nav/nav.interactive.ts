import { Component, computed, signal, viewChild } from '@angular/core';
import {
  Appearance,
  ChevronPosition,
  NavComponent,
  NavNode,
  Orientation,
  Shape,
  Size,
  Variant,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { NAV_SHOWCASE_CONFIG } from './nav.showcase.config';

@Component({
  selector: 'app-nav-interactive',
  imports: [NavComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-nav
          [items]="interactiveItems"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [shape]="currentShape()"
          [size]="currentSize()"
          [chevronPosition]="currentChevronPosition()"
          [showSelectionIndicator]="currentShowSelectionIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          (nodeClick)="onNodeClick($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class NavInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = NAV_SHOWCASE_CONFIG;

  interactiveItems: NavNode[] = [
    { id: 'home', label: 'Home', icon: 'home', selected: true },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'folder',
      hasChildren: true,
      children: [
        { id: 'active', label: 'Active' },
        { id: 'archive', label: 'Archive' },
      ],
    },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  private values = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    size: 'medium',
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  currentVariant = computed(() => (this.values()['variant'] as Variant) ?? 'primary');
  currentAppearance = computed(() => (this.values()['appearance'] as Appearance) ?? 'subtle');
  currentShape = computed(() => (this.values()['shape'] as Shape) ?? 'rounded');
  currentSize = computed(() => (this.values()['size'] as Size) ?? 'medium');
  currentChevronPosition = computed(
    () => (this.values()['chevronPosition'] as ChevronPosition) ?? 'after',
  );
  currentIndicatorPosition = computed(
    () => (this.values()['indicatorPosition'] as Orientation) ?? 'vertical',
  );
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onNodeClick(node: NavNode): void {
    this.showcase()?.logEvent('nodeClick', { id: node.id, label: node.label });
  }
}
