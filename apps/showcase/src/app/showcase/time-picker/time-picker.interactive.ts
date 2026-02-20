import { Component, computed, signal, viewChild } from '@angular/core';
import { Size, TimePickerComponent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TIME_PICKER_SHOWCASE_CONFIG } from './time-picker.showcase.config';

@Component({
  selector: 'app-time-picker-interactive',
  imports: [TimePickerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-time-picker
          [value]="selectedTime()"
          [size]="currentSize()"
          [step]="currentStep()"
          [use24HourFormat]="currentUse24HourFormat()"
          [inline]="currentInline()"
          [showLabel]="currentShowLabel()"
          [label]="'Select Time'"
          [disabled]="currentDisabled()"
          (timeChange)="onTimeChange($event)"
        />
        <p style="margin-top: 12px; text-align: center;">
          Selected time: <strong>{{ selectedTime() || 'Not set' }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class TimePickerInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TIME_PICKER_SHOWCASE_CONFIG;

  selectedTime = signal('');
  private values = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    use24HourFormat: true,
    inline: false,
    showLabel: false,
    disabled: false,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentStep = computed(() => this.values()['step'] as number);
  currentUse24HourFormat = computed(() => this.values()['use24HourFormat'] as boolean);
  currentInline = computed(() => this.values()['inline'] as boolean);
  currentShowLabel = computed(() => this.values()['showLabel'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.selectedTime.set('');
  }

  onTimeChange(time: string): void {
    this.selectedTime.set(time);
    this.showcase()?.logEvent('timeChange', { value: time });
  }
}
