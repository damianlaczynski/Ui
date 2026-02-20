import { Component, signal, computed, viewChild } from '@angular/core';
import { delay, of } from 'rxjs';
import {
  ScrollContainerComponent,
  ScrollContainerDataSource,
  Appearance,
  IconName,
  Shape,
  Size,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SCROLL_CONTAINER_SHOWCASE_CONFIG } from './scroll-container.showcase.config';

interface MockItem {
  id: number;
  label: string;
  icon?: IconName;
  description?: string;
}

@Component({
  selector: 'app-scroll-container-interactive',
  imports: [ScrollContainerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="20"
          [maxHeight]="currentMaxHeight()"
          [nodeSize]="currentNodeSize()"
          [appearance]="currentAppearance()"
          [shape]="currentShape()"
          [showSelectionIndicator]="currentShowSelectionIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          [asButton]="currentAsButton()"
          [selectOnClick]="currentSelectOnClick()"
          [orientation]="currentOrientation()"
          [scrollbarBehavior]="currentScrollbarBehavior()"
          (itemClick)="onItemClick($event)"
          (itemSelect)="onItemSelect($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class ScrollContainerInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  showcaseConfig: ShowcaseConfig = SCROLL_CONTAINER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    maxHeight: '400px',
    showSelectionIndicator: false,
    indicatorPosition: 'horizontal',
    asButton: false,
    selectOnClick: true,
    orientation: 'vertical',
    scrollbarBehavior: 'auto',
  });

  dataSource: ScrollContainerDataSource<MockItem> = (page: number, pageSize: number) => {
    const startId = (page - 1) * pageSize + 1;
    const icons: IconName[] = ['home', 'settings', 'document', 'folder', 'mail', 'calendar'];
    const items: MockItem[] = Array.from({ length: pageSize }, (_, i) => ({
      id: startId + i,
      label: `Item ${startId + i}`,
      icon: icons[(startId + i) % icons.length],
      description: `Description for item ${startId + i}`,
    }));
    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 100,
    }).pipe(delay(500));
  };

  currentNodeSize = computed(() => this.values()['nodeSize'] as Size);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentMaxHeight = computed(() => (this.values()['maxHeight'] as string) || '400px');
  currentShowSelectionIndicator = computed(() => !!this.values()['showSelectionIndicator']);
  currentIndicatorPosition = computed(
    () => (this.values()['indicatorPosition'] as 'horizontal' | 'vertical') || 'horizontal',
  );
  currentAsButton = computed(() => !!this.values()['asButton']);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] !== false);
  currentOrientation = computed(
    () => (this.values()['orientation'] as 'vertical' | 'horizontal' | 'both') || 'vertical',
  );
  currentScrollbarBehavior = computed(
    () => (this.values()['scrollbarBehavior'] as 'auto' | 'always' | 'never') || 'auto',
  );

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onItemClick(event: { item: MockItem; node: unknown }): void {
    this.showcase()?.logEvent('itemClick', { label: event.item.label });
  }

  onItemSelect(event: { item: MockItem; node: unknown }): void {
    this.showcase()?.logEvent('itemSelect', { label: event.item.label });
  }
}
