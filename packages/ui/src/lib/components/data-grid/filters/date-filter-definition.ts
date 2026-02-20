/**
 * Date Filter Definition
 *
 * Filter definition for date fields with date operators
 */

import { BaseFilterDefinition } from './base-filter-definition';
import { FilterOperator } from './filter-definition.interface';
import { DataGridColumn } from '../models/data-grid-column.model';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { DateRange } from '../../field/date-range/date-range.component';
import { DateFilterComponent } from './components/date-filter.component';

/**
 * Date filter definition
 */
export class DateFilterDefinition extends BaseFilterDefinition {
  readonly type = 'date';

  constructor() {
    super();
    this.setComponent(DateFilterComponent);
  }

  override getOperators(): FilterOperator[] {
    return [
      { value: 'equals', label: 'Equals', icon: 'equal_circle' },
      { value: 'notEquals', label: 'Does not equal', icon: 'equal_off' },
      { value: 'lessThan', label: 'Less than', icon: 'chevron_left' },
      { value: 'greaterThan', label: 'Greater than', icon: 'chevron_right' },
      { value: 'lessOrEqual', label: 'Less than or equal to', icon: 'arrow_sort_down_lines' },
      {
        value: 'greaterOrEqual',
        label: 'Greater than or equal to',
        icon: 'arrow_sort_up_lines',
      },
      { value: 'between', label: 'Between', icon: 'arrow_swap' },
      { value: 'isNull', label: 'Is null', icon: 'dismiss_circle' },
      { value: 'isNotNull', label: 'Is not null', icon: 'checkmark_circle' },
    ];
  }

  override getDefaultOperator(): FilterOperator {
    return { value: 'equals', label: '=', icon: 'equal_circle' } as FilterOperator;
  }

  override getDisplayText(
    column: DataGridColumn<any>,
    filter: DataGridFilterValue,
    config: DataGridFilterConfig,
  ): string {
    const operator = filter.operator || this.getDefaultOperator().value;
    const operatorText = this.getOperatorText(operator);

    // For null checks, don't show value
    if (operator === 'isNull' || operator === 'isNotNull') {
      return `${column.header} ${operatorText}`;
    }

    if (operator === 'between') {
      // For 'between', value is a DateRange object
      const range = filter.value as DateRange | null | undefined;
      if (range && (range.startDate || range.endDate)) {
        return `${column.header} between ${range.startDate ?? ''} and ${range.endDate ?? ''}`;
      }
      return `${column.header} between`;
    }

    return `${column.header} ${operatorText} ${filter.value}`;
  }

  override hasActiveValue(filter: DataGridFilterValue): boolean {
    // For null checks, value can be null/undefined
    if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
      return true;
    }

    if (filter.value == null) {
      return false;
    }

    // For 'between', check if DateRange has values
    if (typeof filter.value === 'object' && filter.value !== null && !Array.isArray(filter.value)) {
      const range = filter.value as DateRange;
      return (
        (range.startDate != null && range.startDate !== '') ||
        (range.endDate != null && range.endDate !== '')
      );
    }

    return filter.value !== '';
  }
}

/**
 * Create date filter definition instance
 */
export function createDateFilterDefinition(): DateFilterDefinition {
  return new DateFilterDefinition();
}
