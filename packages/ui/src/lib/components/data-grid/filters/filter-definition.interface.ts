/**
 * Filter Definition Interface
 *
 * Base interface for all filter types. Allows users to create custom filters.
 */

import { TemplateRef, Type } from '@angular/core';
import { DataGridFilterConfig, DataGridFilterValue } from '../models/data-grid-filter.model';
import { DataGridColumn } from '../models/data-grid-column.model';
import { IconName } from '../../icon';
import { DataGridFilterTemplateContext } from '../models/data-grid-config.model';

/**
 * Filter operator definition
 */
export interface FilterOperator {
  /** Operator value (e.g., 'contains', 'equals', 'greaterThan') */
  value: string;
  /** Display label */
  label: string;
  /** Icon name */
  icon: IconName;
}

/**
 * Filter Definition
 *
 * Defines how a filter type works, including:
 * - Available operators
 * - Default operator
 * - Display text and icons
 * - Configuration options
 */
export interface FilterDefinition {
  /** Filter type identifier (e.g., 'text', 'number', 'date') */
  readonly type: string;

  /**
   * Default placeholder text for the filter input
   */
  defaultPlaceholder?: string;

  /**
   * Custom template for rendering this filter
   * If provided, this template will be used instead of default component rendering
   */
  templateRef?: TemplateRef<DataGridFilterTemplateContext>;

  /**
   * Component class for rendering this filter
   * If provided, this component will be used instead of template
   */
  component?: Type<any>;

  /**
   * Get available operators for this filter type
   */
  getOperators(): FilterOperator[];

  /**
   * Get default operator for this filter type
   */
  getDefaultOperator(): FilterOperator;

  /**
   * Get operator icon
   */
  getOperatorIcon(operator: string): IconName;

  /**
   * Get operator display text
   */
  getOperatorText(operator: string): string;

  /**
   * Create filter configuration
   *
   * @param options - Optional configuration overrides
   */
  createConfig(options?: Partial<DataGridFilterConfig>): DataGridFilterConfig;

  /**
   * Get display text for the filter
   */
  getDisplayText(
    column: DataGridColumn<any>,
    filter: DataGridFilterValue,
    config: DataGridFilterConfig,
  ): string;

  /**
   * Check if filter has active value
   */
  hasActiveValue(filter: DataGridFilterValue): boolean;

  /**
   * Parse value for this filter type
   * Converts input value to the appropriate type for this filter
   */
  parseValue(value: any): any;
}
