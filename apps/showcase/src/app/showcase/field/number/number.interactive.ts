import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberComponent } from 'ui';
import { InputVariant, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { NUMBER_SHOWCASE_CONFIG } from './number.showcase.config';

@Component({
  selector: 'app-number-interactive',
  imports: [NumberComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-number
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [min]="currentMin()"
          [max]="currentMax()"
          [step]="currentStep()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onNumberChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class NumberInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = NUMBER_SHOWCASE_CONFIG;

  currentValue: number | null = 0;

  private values = signal<Record<string, unknown>>({
    label: 'Quantity',
    placeholder: 'Enter number...',
    helpText: '',
    min: 0,
    max: 100,
    step: 1,
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMin = computed(() => this.values()['min'] as number);
  currentMax = computed(() => this.values()['max'] as number);
  currentStep = computed(() => this.values()['step'] as number);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);
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
  }

  onReset(): void {
    this.currentValue = 0;
  }

  onNumberChange(value: number): void {
    this.showcase()?.logEvent('change', { value });
  }
}
