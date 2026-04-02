/**
 * Create DataGrid Configuration
 *
 * Helper function to create DataGrid configuration with default values
 */

import { DataGridConfig, DataGridConfigInput } from '../models/data-grid-config.model';
import { DataGridColumn } from '../models/data-grid-column.model';
import { createFilterConfig, CreateFilterConfigOptions } from './create-filter-config';

/**
 * Creates a DataGrid configuration with default values applied
 *
 * @template T - The type of data items
 * @param input - Partial configuration input
 * @returns Complete configuration with defaults
 *
 * @example
 * ```typescript
 * const config = createDataGridConfig<ProjectDto>({
 *   columns: projectColumns,
 *   dataSource: dataSource$,
 *   pagination: { enabled: true, pageSize: 20 }
 * });
 * ```
 */
export function createDataGridConfig<T>(input: DataGridConfigInput<T>): DataGridConfig<T> {
  // Validate required fields
  if (!input.columns || input.columns.length === 0) {
    throw new Error('DataGridConfig: columns array cannot be empty');
  }

  if (!input.dataSource) {
    throw new Error('DataGridConfig: dataSource Observable is required');
  }

  // Validate column IDs are unique
  const columnIds = input.columns.map(col => col.id);
  const uniqueIds = new Set(columnIds);
  if (columnIds.length !== uniqueIds.size) {
    throw new Error('DataGridConfig: column IDs must be unique');
  }

  // Apply defaults
  return {
    columns: input.columns,
    dataSource: input.dataSource,
    selection: input.selection ?? 'none',
    pagination: {
      enabled: input.pagination?.enabled ?? true,
      pageSize: input.pagination?.pageSize ?? 25,
      pageSizeOptions: input.pagination?.pageSizeOptions ?? [10, 25, 50],
      showPageSizeSelector: input.pagination?.showPageSizeSelector ?? true,
      showPageNumbers: input.pagination?.showPageNumbers ?? true,
      showFirstLast: input.pagination?.showFirstLast ?? false,
      showInfo: input.pagination?.showInfo ?? false,
    },
    sorting: {
      enabled: input.sorting?.enabled ?? true,
      defaultSort: input.sorting?.defaultSort,
    },
    filtering: {
      enabled: input.filtering?.enabled ?? true,
      debounceMs: input.filtering?.debounceMs ?? 300,
    },
    styling: {
      size: input.styling?.size ?? 'medium',
      striped: input.styling?.striped ?? false,
      bordered: input.styling?.bordered ?? false,
      hoverable: input.styling?.hoverable ?? true,
      stickyHeaders: input.styling?.stickyHeaders ?? false,
    },
    virtualization: {
      enabled: input.virtualization?.enabled ?? false,
      itemHeight: input.virtualization?.itemHeight ?? 48,
      bufferSize: input.virtualization?.bufferSize ?? 3,
    },
    callbacks: input.callbacks ?? {},
    loading: {
      title: input.loading?.title ?? 'Loading...',
      description: input.loading?.description ?? '',
      spinnerSize: input.loading?.spinnerSize ?? 'medium',
    },
    empty: {
      title: input.empty?.title ?? 'No data available',
      description: input.empty?.description ?? 'There is no data to display.',
      icon: input.empty?.icon,
      primaryAction: input.empty?.primaryAction,
      secondaryAction: input.empty?.secondaryAction,
    },
    error: {
      title: input.error?.title ?? 'Error',
      description: input.error?.description ?? 'An error occurred',
      icon: input.error?.icon ?? 'error_circle',
      primaryAction: input.error?.primaryAction,
      secondaryAction: input.error?.secondaryAction,
    },
    expandable: input.expandable ?? false,
  };
}

/**
 * Factory method to automatically set filter configuration for a column
 *
 * This method takes a column and filter configuration options, then automatically
 * sets the `filterable` property with default values from FilterDefinition system.
 *
 * @template T - The type of data items
 * @param column - Column to configure
 * @param filterOptions - Filter configuration options
 * @returns Column with filterable property set
 *
 * @example
 * ```typescript
 * // Simple text filter with all defaults
 * const column = createColumnWithFilter(
 *   { id: 'name', header: 'Name', field: 'name' },
 *   { type: 'text' }
 * );
 *
 * // Text filter with custom placeholder and debounce
 * const customColumn = createColumnWithFilter(
 *   { id: 'name', header: 'Name', field: 'name' },
 *   {
 *     type: 'text',
 *     placeholder: 'Search projects...',
 *     debounceMs: 500
 *   }
 * );
 *
 * // Number filter with selected operators
 * const numberColumn = createColumnWithFilter(
 *   { id: 'age', header: 'Age', field: 'age' },
 *   {
 *     type: 'number',
 *     operators: ['equals', 'greaterThan', 'lessThan'],
 *     defaultOperator: 'equals'
 *   }
 * );
 * ```
 */
export function createColumnWithFilter<T>(
  column: DataGridColumn<T>,
  filterOptions: CreateFilterConfigOptions,
): DataGridColumn<T> {
  const filterConfig = createFilterConfig(filterOptions);
  return {
    ...column,
    filterable: filterConfig,
  };
}
