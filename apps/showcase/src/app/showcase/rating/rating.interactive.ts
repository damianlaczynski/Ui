import { Component, signal, computed, viewChild } from '@angular/core';
import { RatingComponent, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { RATING_SHOWCASE_CONFIG } from './rating.showcase.config';

@Component({
  selector: 'app-rating-interactive',
  imports: [RatingComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-rating
          [value]="currentValue()"
          [max]="currentMax()"
          [size]="currentSize()"
          [showValue]="currentShowValue()"
          [disabled]="currentDisabled()"
          [readOnly]="currentReadOnly()"
          (valueChange)="onRatingChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class RatingInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = RATING_SHOWCASE_CONFIG;

  private valueModel = signal(3);

  private values = signal<Record<string, unknown>>({
    max: '5',
    size: 'medium',
    showValue: false,
    disabled: false,
    readOnly: false,
  });

  currentValue = computed(() => this.valueModel());
  currentMax = computed(() => Number(this.values()['max']) || 5);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowValue = computed(() => this.values()['showValue'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadOnly = computed(() => this.values()['readOnly'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    const max = Number(newValues['max']) || 5;
    const current = this.valueModel();
    if (current > max) {
      this.valueModel.set(max);
    }
  }

  onReset(): void {
    this.valueModel.set(3);
  }

  onRatingChange(value: number): void {
    this.valueModel.set(value);
    this.showcase()?.logEvent('valueChange', { value });
  }
}
