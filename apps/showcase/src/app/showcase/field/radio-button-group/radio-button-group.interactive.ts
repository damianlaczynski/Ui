import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RadioButtonGroupComponent,
  type RadioButtonItem,
  type Appearance,
  type Orientation,
  type SegmentLayout,
  type Shape,
  type Size,
  type Variant,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { RADIO_BUTTON_GROUP_SHOWCASE_CONFIG } from './radio-button-group.showcase.config';

const DEFAULT_ITEMS: RadioButtonItem[] = [
  { id: 1, label: 'Option 1', value: 'option1' },
  { id: 2, label: 'Option 2', value: 'option2' },
  { id: 3, label: 'Option 3', value: 'option3' },
];

@Component({
  selector: 'app-radio-button-group-interactive',
  imports: [RadioButtonGroupComponent, FormsModule, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-radio-button-group
          [label]="currentLabel()"
          [helpText]="currentHelpText()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [orientation]="currentOrientation()"
          [layout]="currentLayout()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [items]="items"
          [(ngModel)]="currentValue"
          name="interactive-radio-button-group"
          (change)="onChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class RadioButtonGroupInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = RADIO_BUTTON_GROUP_SHOWCASE_CONFIG;

  items: RadioButtonItem[] = DEFAULT_ITEMS;
  currentValue: unknown = 'option2';

  private values = signal<Record<string, unknown>>({
    label: 'Choose an option',
    helpText: '',
    variant: 'secondary',
    appearance: 'outline',
    orientation: 'horizontal',
    layout: 'separate',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => (this.values()['helpText'] as string) ?? '');
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentLayout = computed(() => this.values()['layout'] as SegmentLayout);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
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
    this.currentValue = 'option2';
  }

  onChange(value: unknown): void {
    this.showcase()?.logEvent('change', { value });
  }
}
