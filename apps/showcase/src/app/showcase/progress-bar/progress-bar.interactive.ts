import { Component, computed, signal, viewChild } from '@angular/core';
import { ProgressBarComponent, ProgressBarType, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { PROGRESS_BAR_SHOWCASE_CONFIG } from './progress-bar.showcase.config';

@Component({
  selector: 'app-progress-bar-interactive',
  imports: [ProgressBarComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview style="width: 100%;">
        <ui-progress-bar
          [variant]="currentVariant()"
          [size]="currentSize()"
          [type]="currentType()"
          [value]="currentValue()"
        />
        @if (currentType() === 'determinate') {
          <p style="margin-top: 12px; text-align: center;">
            Current value: <strong>{{ currentValue() }}%</strong>
          </p>
        }
      </div>
    </app-interactive-showcase>
  `,
})
export class ProgressBarInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = PROGRESS_BAR_SHOWCASE_CONFIG;

  private didInit = false;
  private values = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    type: 'determinate',
    value: 50,
  });

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentType = computed(() => this.values()['type'] as ProgressBarType);
  currentValue = computed(() => {
    const raw = Number(this.values()['value']);
    return Math.max(0, Math.min(100, Number.isNaN(raw) ? 0 : raw));
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    if (!this.didInit) {
      this.didInit = true;
      return;
    }
    this.showcase()?.logEvent('valuesChange', {
      variant: this.currentVariant(),
      size: this.currentSize(),
      type: this.currentType(),
      value: this.currentValue(),
    });
  }

  onReset(): void {
    this.showcase()?.logEvent('reset');
  }
}
