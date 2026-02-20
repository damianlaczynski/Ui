import { Component, signal, computed } from '@angular/core';
import { TabsComponent, Tab } from 'ui';
import type { Appearance, Orientation, Shape, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import {
  TABS_SHOWCASE_CONFIG,
  DEFAULT_TABS,
  EXTENDED_TABS,
  LABELS_ONLY_TABS,
} from './tabs.showcase.config';

@Component({
  selector: 'app-tabs-interactive',
  standalone: true,
  imports: [TabsComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-tabs
          [tabs]="interactiveTabs()"
          [selectedTabId]="selectedInteractiveTab()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [shape]="currentShape()"
          [size]="currentSize()"
          [orientation]="currentOrientation()"
          [showSelectionIndicator]="currentShowIndicator()"
          (tabChange)="onInteractiveTabChange($event)"
          (tabClose)="onTabClose($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class TabsInteractiveComponent {
  showcaseConfig: ShowcaseConfig = TABS_SHOWCASE_CONFIG;

  extendedTabs = signal<Tab[]>([...EXTENDED_TABS]);
  selectedInteractiveTab = signal<string | number>('t1');

  private values = signal<Record<string, unknown>>({});
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentSize = computed(() => this.values()['size'] as Size);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentShowIndicator = computed(() => this.values()['showSelectionIndicator'] as boolean);

  interactiveTabs = computed<Tab[]>(() => {
    const set = this.values()['tabSet'] as string;
    if (set === 'extended') return this.extendedTabs();
    if (set === 'labelsOnly') return LABELS_ONLY_TABS;
    return DEFAULT_TABS;
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onInteractiveTabChange(tab: Tab): void {
    this.selectedInteractiveTab.set(tab.id);
  }

  onTabClose(tab: Tab): void {
    this.extendedTabs.update(list => {
      const next = list.filter(t => t.id !== tab.id);
      if (this.selectedInteractiveTab() === tab.id && next.length > 0) {
        this.selectedInteractiveTab.set(next[0].id);
      }
      return next;
    });
  }
}
