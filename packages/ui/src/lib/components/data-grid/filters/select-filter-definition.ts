/**
 * Select Filter Definition
 *
 * Filter definition for multi-select fields (always uses multi-select mode)
 */

import { BaseFilterDefinition } from './base-filter-definition';
import { FilterOperator } from './filter-definition.interface';
import { DataGridColumn } from '../models/data-grid-column.model';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { SelectFilterComponent } from './components/select-filter.component';

/**
 * Select filter definition
 */
export class SelectFilterDefinition extends BaseFilterDefinition {
  readonly type = 'select';

  constructor() {
    super();
    this.setComponent(SelectFilterComponent);
  }

  override getOperators(): FilterOperator[] {
    return [
      { value: 'contains', label: 'Contains', icon: 'search' },
      { value: 'doesNotContain', label: 'Does not contain', icon: 'prohibited' },
      { value: 'isNull', label: 'Is null', icon: 'dismiss_circle' },
      { value: 'isNotNull', label: 'Is not null', icon: 'checkmark_circle' },
    ];
  }

  override getDefaultOperator(): FilterOperator {
    return { value: 'contains', label: 'Contains', icon: 'search' } as FilterOperator;
  }

  /**
   * Override to include options in config
   */
  override createConfig(options?: Partial<DataGridFilterConfig>): DataGridFilterConfig {
    const config = super.createConfig(options);
    // Select filters require options
    if (!config.parameters && options?.parameters) {
      config.parameters = options.parameters;
    }
    return config;
  }

  override hasActiveValue(filter: DataGridFilterValue): boolean {
    // For null checks, value can be null/undefined
    if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
      return true;
    }
    return super.hasActiveValue(filter);
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

    return super.getDisplayText(column, filter, config);
  }
}

/**
 * Create select filter definition instance
 */
export function createSelectFilterDefinition(): SelectFilterDefinition {
  return new SelectFilterDefinition();
}
