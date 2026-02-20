import { Component, computed, signal } from '@angular/core';
import { Alignment, DividerComponent, Orientation } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DIVIDER_SHOWCASE_CONFIG } from './divider.showcase.config';

@Component({
  selector: 'app-divider-interactive',
  imports: [DividerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div
        preview
        [style.width]="'100%'"
        [style.height]="currentOrientation() === 'vertical' ? '120px' : 'auto'"
      >
        <ui-divider
          [orientation]="currentOrientation()"
          [alignment]="currentAlignment()"
          [text]="currentText()"
          [ariaLabel]="currentAriaLabel()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class DividerInteractiveComponent {
  showcaseConfig: ShowcaseConfig = DIVIDER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    alignment: 'center',
    text: 'OR',
    ariaLabel: 'Divider',
  });

  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentAlignment = computed(() => this.values()['alignment'] as Alignment);
  currentText = computed(() => (this.values()['text'] as string) ?? '');
  currentAriaLabel = computed(() => (this.values()['ariaLabel'] as string) ?? '');

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
