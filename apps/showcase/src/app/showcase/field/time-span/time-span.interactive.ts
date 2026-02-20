import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSpanComponent, TimeSpanValue, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TIMESPAN_SHOWCASE_CONFIG } from './time-span.showcase.config';

@Component({
  selector: 'app-time-span-interactive',
  imports: [TimeSpanComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-time-span
          [label]="currentLabel()"
          [placeholder]="'1h 30m'"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [showYears]="currentShowYears()"
          [showMonths]="currentShowMonths()"
          [showDays]="currentShowDays()"
          [showHours]="currentShowHours()"
          [showMinutes]="currentShowMinutes()"
          [showSeconds]="currentShowSeconds()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [clearable]="currentClearable()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onTimeSpanChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class TimeSpanInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TIMESPAN_SHOWCASE_CONFIG;

  currentValue: TimeSpanValue = {};

  private values = signal<Record<string, unknown>>({
    label: 'Duration',
    helpText: '',
    variant: 'filled',
    size: 'medium',
    showYears: false,
    showMonths: false,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: false,
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentVariant = computed(
    () => this.values()['variant'] as 'filled' | 'filled-gray' | 'filled-lighter' | 'underlined',
  );
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowYears = computed(() => this.values()['showYears'] as boolean);
  currentShowMonths = computed(() => this.values()['showMonths'] as boolean);
  currentShowDays = computed(() => this.values()['showDays'] as boolean);
  currentShowHours = computed(() => this.values()['showHours'] as boolean);
  currentShowMinutes = computed(() => this.values()['showMinutes'] as boolean);
  currentShowSeconds = computed(() => this.values()['showSeconds'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);
  currentClearable = computed(() => this.values()['clearable'] as boolean);
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
    this.currentValue = {};
  }

  onTimeSpanChange(value: TimeSpanValue): void {
    this.showcase()?.logEvent('change', { value });
  }
}
