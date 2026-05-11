/**
 * Base Filter Definition
 *
 * Abstract base class for filter definitions with common functionality
 */

import { Type } from '@angular/core';
import { FilterDefinition, FilterOperator } from './filter-definition.interface';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { DataGridColumn } from '../models/data-grid-column.model';
import { IconName } from '../../icon';

/**
 * Abstract base class for filter definitions
 */
export abstract class BaseFilterDefinition implements FilterDefinition {
  abstract readonly type: string;
  defaultPlaceholder?: string = 'Filter...';

  /**
   * Component class for rendering this filter
   * If provided, this component will be used instead of template
   */
  component?: Type<any>;

  /**
   * Set component class for this filter definition
   */
  setComponent(component: Type<any>): this {
    this.component = component;
    return this;
  }

  /**
   * Get available operators for this filter type
   */
  abstract getOperators(): FilterOperator[];

  /**
   * Get default operator for this filter type
   */
  abstract getDefaultOperator(): FilterOperator;

  /**
   * Get operator icon
   */
  getOperatorIcon(operator: string): IconName {
    const operators = this.getOperators();
    const operatorDef = operators.find(op => op.value === operator);
    return operatorDef?.icon || 'filter';
  }

  /**
   * Get operator display text
   */
  getOperatorText(operator: string): string {
    const operators = this.getOperators();
    const operatorDef = operators.find(op => op.value === operator);
    return operatorDef?.label || operator;
  }

  /**
   * Create filter configuration
   */
  createConfig(options?: Partial<DataGridFilterConfig>): DataGridFilterConfig {
    const operators = this.getOperators();

    return {
      type: this.type as any,
      operators: operators.map(op => op.value) as any,
      defaultOperator: this.getDefaultOperator() as any,
      placeholder: options?.placeholder,
      debounceMs: options?.debounceMs ?? 300,
      parameters: options?.parameters,
      ...options,
    };
  }

  /**
   * Check if filter needs operator selector
   */
  needsOperatorSelector(): boolean {
    return this.getOperators().length > 1;
  }

  /**
   * Get display text for the filter
   */
  getDisplayText(
    column: DataGridColumn<any>,
    filter: DataGridFilterValue,
    config: DataGridFilterConfig,
  ): string {
    const operatorText = this.getOperatorText(filter.operator || this.getDefaultOperator().value);
    return `${column.header} ${operatorText} "${filter.value}"`;
  }

  /**
   * Check if filter has active value
   */
  hasActiveValue(filter: DataGridFilterValue): boolean {
    if (filter.value == null || filter.value === '') {
      return false;
    }

    // Check for empty arrays
    if (Array.isArray(filter.value) && filter.value.length === 0) {
      return false;
    }

    // Check for empty objects
    if (typeof filter.value === 'object' && !Array.isArray(filter.value)) {
      const keys = Object.keys(filter.value);
      if (keys.length === 0) {
        return false;
      }
      // For range objects (between operator), check if any value exists
      const hasAnyValue = keys.some(key => {
        const val = filter.value[key];
        return val != null && val !== '';
      });
      if (!hasAnyValue) {
        return false;
      }
    }

    return true;
  }

  /**
   * Parse value for this filter type
   * Default implementation returns value as-is
   */
  parseValue(value: any): any {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return value;
  }
}
