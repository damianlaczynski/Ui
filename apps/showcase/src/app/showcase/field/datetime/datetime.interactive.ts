import { Component, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimeComponent, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DATETIME_SHOWCASE_CONFIG } from './datetime.showcase.config';

@Component({
  selector: 'app-datetime-interactive',
  imports: [DatetimeComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-datetime
          [label]="'Select Datetime'"
          [placeholder]="'YYYY-MM-DD HH:mm'"
          [size]="currentSize()"
          [step]="currentStep()"
          [use24HourFormat]="currentUse24HourFormat()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          (change)="onDatetimeChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class DatetimeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DATETIME_SHOWCASE_CONFIG;
  currentValue = signal<string>('2026-02-15T01:40:24.000Z');

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    use24HourFormat: true,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentStep = computed(() => this.values()['step'] as number);
  currentUse24HourFormat = computed(() => this.values()['use24HourFormat'] as boolean);
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
    this.currentValue.set('');
  }

  onDatetimeChange(value: string): void {
    this.currentValue.set(value);
    this.showcase()?.logEvent('change', { value });
  }
}
