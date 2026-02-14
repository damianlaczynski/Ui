import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateComponent, DateFieldType, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DATE_SHOWCASE_CONFIG } from './date.showcase.config';

@Component({
  selector: 'app-date-interactive',
  imports: [DateComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-date
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [dateType]="currentDateType()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onDateChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class DateInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DATE_SHOWCASE_CONFIG;

  currentValue = '';

  private values = signal<Record<string, unknown>>({
    label: 'Select Date',
    placeholder: 'YYYY-MM-DD',
    helpText: '',
    dateType: 'date',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentDateType = computed(() => this.values()['dateType'] as DateFieldType);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue = '';
  }

  onDateChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
