/**
 * Date Filter Component
 *
 * Component for rendering date filter input
 */

import { Component, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DateComponent } from '../../../field/date/date.component';
import { DateRangeComponent } from '../../../field/date-range/date-range.component';
import { DataGridFilterTemplateContext } from '../../models/data-grid-config.model';

@Component({
  selector: 'ui-date-filter',

  imports: [FormsModule, DateComponent, DateRangeComponent],
  template: `
    @if (isBetween()) {
      <ui-date-range
        [placeholder]="context().placeholder"
        [size]="size()"
        [inputVariant]="'filled-gray'"
        [ngModel]="context().filterValue"
        (ngModelChange)="context().onValueChange($event)"
      />
    } @else {
      <ui-date
        [placeholder]="context().placeholder"
        [size]="size()"
        [inputVariant]="'filled-gray'"
        [ngModel]="context().filterValue"
        (ngModelChange)="context().onValueChange($event)"
      />
    }
  `,
})
export class DateFilterComponent {
  context = input.required<DataGridFilterTemplateContext>();
  size = input<'small' | 'medium' | 'large'>('medium');

  isBetween = computed(() => {
    return this.context().filterOperator.value === 'between';
  });
}
