import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent, ColorFormat } from 'angular-ui';
import { InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { COLOR_SHOWCASE_CONFIG } from './color.showcase.config';

@Component({
  selector: 'app-color-interactive',
  imports: [ColorComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-color
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [format]="currentFormat()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [showAlpha]="currentShowAlpha()"
          [showEyeDropper]="currentShowEyeDropper()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (change)="onColorChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class ColorInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = COLOR_SHOWCASE_CONFIG;

  currentValue = '#3B82F6';

  private values = signal<Record<string, unknown>>({
    label: 'Pick a color',
    placeholder: 'Select color',
    helpText: '',
    format: 'hex',
    variant: 'filled',
    size: 'medium',
    showAlpha: false,
    showEyeDropper: true,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentFormat = computed(() => this.values()['format'] as ColorFormat);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShowAlpha = computed(() => this.values()['showAlpha'] as boolean);
  currentShowEyeDropper = computed(() => this.values()['showEyeDropper'] as boolean);
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
    this.currentValue = '#3B82F6';
  }

  onColorChange(value: string): void {
    this.showcase()?.logEvent('change', { value });
  }
}
