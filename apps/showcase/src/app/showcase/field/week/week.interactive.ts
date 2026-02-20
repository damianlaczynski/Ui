import { Component, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, WeekComponent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { WEEK_SHOWCASE_CONFIG } from './week.showcase.config';

@Component({
  selector: 'app-week-interactive',
  imports: [WeekComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-week
          [label]="'Select Week'"
          [placeholder]="'Select week'"
          [size]="currentSize()"
          [displayFormat]="currentDisplayFormat()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          (change)="onWeekChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class WeekInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = WEEK_SHOWCASE_CONFIG;
  currentValue = '';

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    displayFormat: 'date-range',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentDisplayFormat = computed(
    () => this.values()['displayFormat'] as 'date-range' | 'week-year' | 'iso',
  );
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
    this.currentValue = '';
  }

  onWeekChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
