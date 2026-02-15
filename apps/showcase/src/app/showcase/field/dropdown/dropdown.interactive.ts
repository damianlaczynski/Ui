import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, DropdownItem, DropdownMode } from 'angular-ui';
import { InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DROPDOWN_SHOWCASE_CONFIG, DROPDOWN_BASIC_ITEMS } from './dropdown.showcase.config';

@Component({
  selector: 'app-dropdown-interactive',
  imports: [FormsModule, DropdownComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-dropdown
          [label]="currentLabel()"
          [placeholder]="currentPlaceholder()"
          [items]="basicItems"
          [mode]="currentMode()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [searchable]="currentSearchable()"
          [clearable]="currentClearable()"
          [disabled]="currentDisabled()"
          [required]="currentRequired()"
          [(ngModel)]="currentValue"
          [helpText]="currentHelpText()"
          (selectionChange)="onSelectionChange($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class DropdownInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DROPDOWN_SHOWCASE_CONFIG;
  basicItems: DropdownItem[] = DROPDOWN_BASIC_ITEMS;

  currentValue: string | (string | number)[] = '';

  private values = signal<Record<string, unknown>>({
    label: 'Select Option',
    placeholder: 'Choose...',
    helpText: '',
    mode: 'single',
    variant: 'filled',
    size: 'medium',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentPlaceholder = computed(() => this.values()['placeholder'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMode = computed(() => this.values()['mode'] as DropdownMode);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentSearchable = computed(() => this.values()['searchable'] as boolean);
  currentClearable = computed(() => this.values()['clearable'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
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
    const mode = newValues['mode'] as DropdownMode;
    if (mode === 'single' && Array.isArray(this.currentValue)) {
      this.currentValue = '';
    } else if (mode === 'multi' && !Array.isArray(this.currentValue)) {
      this.currentValue = [];
    }
  }

  onReset(): void {
    this.currentValue = this.currentMode() === 'single' ? '' : [];
  }

  onSelectionChange(value: unknown): void {
    this.showcase()?.logEvent('selectionChange', { value });
  }
}
