import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SLIDER_SHOWCASE_CONFIG } from './slider.showcase.config';

@Component({
  selector: 'app-slider-interactive',
  imports: [SliderComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-slider
          [label]="currentLabel()"
          [size]="currentSize()"
          [min]="currentMin()"
          [max]="currentMax()"
          [step]="currentStep()"
          [vertical]="currentVertical()"
          [showStepMarkers]="currentShowStepMarkers()"
          [showMinMax]="currentShowMinMax()"
          [ariaValueText]="currentAriaValueText() ? getAriaValueText : null"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onSliderChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class SliderInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = SLIDER_SHOWCASE_CONFIG;

  currentValue = 50;

  private values = signal<Record<string, unknown>>({
    label: 'Volume',
    helpText: '',
    min: 0,
    max: 100,
    step: 1,
    size: 'medium',
    vertical: false,
    showStepMarkers: false,
    showMinMax: false,
    ariaValueText: false,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMin = computed(() => this.values()['min'] as number);
  currentMax = computed(() => this.values()['max'] as number);
  currentStep = computed(() => this.values()['step'] as number);
  currentSize = computed(() => this.values()['size'] as Size);
  currentVertical = computed(() => this.values()['vertical'] as boolean);
  currentShowStepMarkers = computed(() => this.values()['showStepMarkers'] as boolean);
  currentShowMinMax = computed(() => this.values()['showMinMax'] as boolean);
  currentAriaValueText = computed(() => this.values()['ariaValueText'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  getAriaValueText = (value: number): string => `Value is ${value}`;
  getCurrentValuePreview(): string {
    const source = (this as unknown as { currentValue?: unknown }).currentValue;
    const value = typeof source === 'function' ? (source as () => unknown)() : source;

    if (value === null || value === undefined || value === '') {
      return 'Not set';
    }

    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    const min = newValues['min'] as number;
    const max = newValues['max'] as number;
    if (typeof min === 'number' && typeof max === 'number') {
      if (this.currentValue < min) this.currentValue = min;
      if (this.currentValue > max) this.currentValue = max;
    }
  }

  onReset(): void {
    this.currentValue = 50;
  }

  onSliderChange(value: number): void {
    this.showcase()?.logEvent('change', { value });
  }
}
