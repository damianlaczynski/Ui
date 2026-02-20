/**
 * Text Filter Definition
 *
 * Filter definition for text fields with string operators
 */

import { BaseFilterDefinition } from './base-filter-definition';
import { FilterOperator } from './filter-definition.interface';
import { DataGridColumn } from '../models/data-grid-column.model';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { TextFilterComponent } from './components/text-filter.component';

/**
 * Text filter definition
 */
export class TextFilterDefinition extends BaseFilterDefinition {
  readonly type = 'text';

  constructor() {
    super();
    this.setComponent(TextFilterComponent);
  }

  override hasActiveValue(filter: DataGridFilterValue): boolean {
    // For null checks, value can be null/undefined
    if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
      return true;
    }
    return super.hasActiveValue(filter);
  }

  override getOperators(): FilterOperator[] {
    return [
      { value: 'contains', label: 'Contains', icon: 'search' },
      { value: 'doesNotContain', label: 'Does not contain', icon: 'prohibited' },
      { value: 'startsWith', label: 'Starts with', icon: 'text_align_left' },
      { value: 'endsWith', label: 'Ends with', icon: 'text_align_right' },
      { value: 'equals', label: 'Equals', icon: 'equal_circle' },
      { value: 'doesNotEqual', label: 'Does not equal', icon: 'equal_off' },
      { value: 'isNull', label: 'Is null', icon: 'dismiss_circle' },
      { value: 'isNotNull', label: 'Is not null', icon: 'checkmark_circle' },
    ];
  }

  override getDefaultOperator(): FilterOperator {
    return { value: 'contains', label: 'contains', icon: 'search' } as FilterOperator;
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

    return `${column.header} ${operatorText} "${filter.value}"`;
  }
}

/**
 * Create text filter definition instance
 */
export function createTextFilterDefinition(): TextFilterDefinition {
  return new TextFilterDefinition();
}
