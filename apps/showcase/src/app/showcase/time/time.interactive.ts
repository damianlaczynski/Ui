import { Component, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, TimeComponent } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TIME_SHOWCASE_CONFIG } from './time.showcase.config';

@Component({
  selector: 'app-time-interactive',
  imports: [FormsModule, TimeComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-time
          [ngModel]="selectedTime()"
          (ngModelChange)="onTimeChange($event)"
          [size]="currentSize()"
          [label]="currentLabel()"
          [placeholder]="'HH:mm'"
          [required]="currentRequired()"
          [readonly]="currentReadonly()"
          [disabled]="currentDisabled()"
        />
        <p style="margin-top: 12px; text-align: center;">
          Selected time: <strong>{{ selectedTime() || 'Not set' }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class TimeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TIME_SHOWCASE_CONFIG;

  selectedTime = signal('');
  private values = signal<Record<string, unknown>>({
    size: 'medium',
    label: 'Select time',
    required: false,
    readonly: false,
    disabled: false,
  });

  currentSize = computed(() => this.values()['size'] as Size);
  currentLabel = computed(() => this.values()['label'] as string);
  currentRequired = computed(() => this.values()['required'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.selectedTime.set('');
  }

  onTimeChange(time: string): void {
    this.selectedTime.set(time);
    this.showcase()?.logEvent('ngModelChange', { value: time });
  }
}
