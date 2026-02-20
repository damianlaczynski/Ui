import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent, Shape, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { CHECKBOX_SHOWCASE_CONFIG } from './checkbox.showcase.config';

@Component({
  selector: 'app-checkbox-interactive',
  imports: [CheckboxComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-checkbox
          [label]="currentLabel()"
          [shape]="currentShape()"
          [size]="currentSize()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [(indeterminate)]="currentIndeterminate"
          [helpText]="currentHelpText()"
          (change)="onCheckboxChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class CheckboxInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = CHECKBOX_SHOWCASE_CONFIG;

  currentValue = false;
  currentIndeterminate = false;

  private values = signal<Record<string, unknown>>({
    label: 'Accept terms',
    helpText: '',
    shape: 'rounded',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentShape = computed(() => this.values()['shape'] as Shape);
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
    this.currentValue = false;
    this.currentIndeterminate = false;
  }

  onCheckboxChange(value: boolean): void {
    this.showcase()?.logEvent('change', { checked: value });
  }
}
