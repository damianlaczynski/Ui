/**
 * Number Filter Definition
 *
 * Filter definition for numeric fields with comparison operators
 */

import { BaseFilterDefinition } from './base-filter-definition';
import { FilterOperator } from './filter-definition.interface';
import { DataGridColumn } from '../models/data-grid-column.model';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { NumberFilterComponent } from './components/number-filter.component';

/**
 * Number filter definition
 */
export class NumberFilterDefinition extends BaseFilterDefinition {
  readonly type = 'number';

  constructor() {
    super();
    this.setComponent(NumberFilterComponent);
  }

  override getOperators(): FilterOperator[] {
    return [
      { value: 'equals', label: 'Equals', icon: 'checkmark' },
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
    return { value: 'equals', label: '=', icon: 'checkmark' } as FilterOperator;
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
      // For 'between', value is an object with start and end
      const range = filter.value as { start?: any; end?: any } | null | undefined;
      if (range && (range.start != null || range.end != null)) {
        return `${column.header} between ${range.start ?? ''} and ${range.end ?? ''}`;
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

    if (filter.value == null || filter.value === '') {
      return false;
    }

    // For 'between', check if range object has values
    if (typeof filter.value === 'object' && filter.value !== null && !Array.isArray(filter.value)) {
      const range = filter.value as { start?: any; end?: any };
      return (range.start != null && range.start !== '') || (range.end != null && range.end !== '');
    }

    return true;
  }

  override parseValue(value: any): any {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // For 'between' operator, value is an object with start and end
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const range = value as { start?: any; end?: any };
      return {
        start: range.start != null ? parseFloat(String(range.start)) : undefined,
        end: range.end != null ? parseFloat(String(range.end)) : undefined,
      };
    }

    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? null : parsed;
  }
}

/**
 * Create number filter definition instance
 */
export function createNumberFilterDefinition(): NumberFilterDefinition {
  return new NumberFilterDefinition();
}
