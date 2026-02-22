/**
 * Number Filter Component
 *
 * Component for rendering number filter input
 */

import { Component, input, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NumberComponent } from '../../../field/number/number.component';
import { DataGridFilterTemplateContext } from '../../models/data-grid-config.model';
import { UiI18nService } from '../../../../i18n';

@Component({
  selector: 'ui-number-filter',

  imports: [FormsModule, NumberComponent],
  template: `
    @if (isBetween()) {
      <ui-number
        [placeholder]="context().placeholder"
        [size]="size()"
        [inputVariant]="'filled-gray'"
        [ngModel]="rangeValue().start"
        (ngModelChange)="onRangeStartChange($event)"
      />
      <span class="data-grid__filter-separator">{{ getBetweenSeparatorText() }}</span>
      <ui-number
        [placeholder]="getRangeEndPlaceholder()"
        [size]="size()"
        [inputVariant]="'filled-gray'"
        [ngModel]="rangeValue().end"
        (ngModelChange)="onRangeEndChange($event)"
      />
    } @else {
      <ui-number
        [placeholder]="context().placeholder"
        [size]="size()"
        [inputVariant]="'filled-gray'"
        [ngModel]="context().filterValue"
        (ngModelChange)="context().onValueChange($event)"
      />
    }
  `,
})
export class NumberFilterComponent {
  private readonly i18n = inject(UiI18nService);

  context = input.required<DataGridFilterTemplateContext>();
  size = input<'small' | 'medium' | 'large'>('medium');

  isBetween = computed(() => {
    return this.context().filterOperator.value === 'between';
  });

  rangeValue = computed(() => {
    const value = this.context().filterValue;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return {
        start: value.start ?? null,
        end: value.end ?? null,
      };
    }
    return { start: null, end: null };
  });

  onRangeStartChange(newValue: any): void {
    const currentValue = this.context().filterValue;
    const range =
      typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)
        ? { ...currentValue }
        : { start: null, end: null };
    range.start = newValue;
    this.context().onValueChange(range);
  }

  onRangeEndChange(newValue: any): void {
    const currentValue = this.context().filterValue;
    const range =
      typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)
        ? { ...currentValue }
        : { start: null, end: null };
    range.end = newValue;
    this.context().onValueChange(range);
  }

  getBetweenSeparatorText(): string {
    return this.i18n.t('dataGrid.filter.betweenAnd', 'and');
  }

  getRangeEndPlaceholder(): string {
    return this.i18n.t('dataGrid.filter.rangeEndPlaceholder', 'To');
  }
}
