/**
 * DataGrid Filter Helpers
 *
 * Helper functions for filter-related operations
 * Uses FilterFactory for extensible filter system
 */

import { DataGridFilterConfig } from '../models/data-grid-filter.model';
import { DropdownItem } from '../field/dropdown/dropdown.component';
import { FilterFactory } from '../filters/filter-factory';

/**
 * Get current operator for a filter config
 * Uses FilterFactory to get default operator from filter definition
 */
export function getCurrentFilterOperator(
  currentOperator: string | undefined,
  config: DataGridFilterConfig | null,
): string {
  if (currentOperator) return currentOperator;
  if (config?.defaultOperator) return config.defaultOperator;

  // Use FilterFactory to get default operator
  if (config?.type) {
    const definition = FilterFactory.getDefinition(config.type);
    if (definition) {
      return definition.getDefaultOperator().value;
    }
  }

  // Fallback
  return config?.type === 'text' ? 'contains' : 'equals';
}

/**
 * Get boolean filter options
 */
export function getBooleanFilterOptions(): DropdownItem[] {
  return [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];
}

/**
 * Get boolean filter value for binding
 */
export function getBooleanFilterValue(filterValue: any): string | null {
  if (filterValue === true) return 'true';
  if (filterValue === false) return 'false';
  return null;
}
