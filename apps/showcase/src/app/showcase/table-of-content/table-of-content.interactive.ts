import { Component, computed, signal } from '@angular/core';
import { TableOfContentComponent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { Appearance, Orientation, Shape, Size } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TABLE_OF_CONTENT_SHOWCASE_CONFIG } from './table-of-content.showcase.config';

@Component({
  selector: 'app-table-of-content-interactive',
  imports: [TableOfContentComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
    >
      <div preview>
        <div class="showcase__grid showcase__grid--two-columns">
          <div class="showcase__item">
            <h3 class="showcase__item__title">Interactive TOC</h3>
            <ui-table-of-content
              [size]="currentSize()"
              [appearance]="currentAppearance()"
              [shape]="currentShape()"
              [showSelectionIndicator]="currentShowSelectionIndicator()"
              [indicatorPosition]="currentIndicatorPosition()"
              [sticky]="currentSticky()"
              [offsetTop]="currentOffsetTop()"
              [minLevel]="currentMinLevel()"
              [maxLevel]="currentMaxLevel()"
              containerSelector=".toc-interactive-content"
            />
          </div>
          <div class="showcase__item">
            <h3 class="showcase__item__title">Content</h3>
            <div class="showcase__example toc-interactive-content">
              <h1 id="toc-interactive-overview">Overview</h1>
              <p>Use controls on the left to change TOC behavior and styling in real time.</p>
              <h2 id="toc-interactive-installation">Installation</h2>
              <p>Install the package and import the module in your app.</p>
              <h3 id="toc-interactive-configuration">Configuration</h3>
              <p>Configure heading levels, indicator, and sticky behavior.</p>
              <h2 id="toc-interactive-usage">Usage</h2>
              <p>Bind <code>containerSelector</code> and heading level boundaries.</p>
              <h3 id="toc-interactive-patterns">Patterns</h3>
              <p>Use nested headings for clearer navigation.</p>
              <h4 id="toc-interactive-best-practices">Best Practices</h4>
              <p>Prefer concise, unique headings to keep navigation readable.</p>
            </div>
          </div>
        </div>
      </div>
    </app-interactive-showcase>
  `,
})
export class TableOfContentInteractiveComponent {
  showcaseConfig: ShowcaseConfig = TABLE_OF_CONTENT_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    showSelectionIndicator: true,
    indicatorPosition: 'vertical',
    sticky: false,
    offsetTop: 0,
    minLevel: 1,
    maxLevel: 4,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentSticky = computed(() => this.values()['sticky'] as boolean);
  currentOffsetTop = computed(() => this.values()['offsetTop'] as number);
  private rawMinLevel = computed(() => this.values()['minLevel'] as number);
  private rawMaxLevel = computed(() => this.values()['maxLevel'] as number);
  currentMinLevel = computed(() => Math.min(this.rawMinLevel(), this.rawMaxLevel()));
  currentMaxLevel = computed(() => Math.max(this.rawMinLevel(), this.rawMaxLevel()));

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }
}
