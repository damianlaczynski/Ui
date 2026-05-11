/**
 * DataGrid Column Factory
 *
 * Provides factory methods for creating common column types.
 * Reduces boilerplate and ensures consistency across columns.
 */

import { IconName } from '../../icon';
import { FilterFactory } from '../filters';
import { DataGridColumn } from '../models/data-grid-column.model';

/**
 * Factory for creating DataGrid columns
 *
 * Provides convenient methods for creating columns with sensible defaults,
 * reducing boilerplate code significantly.
 */
export class DataGridColumnFactory {
  /**
   * Creates a text column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.text('name', 'Name', 'name');
   * ```
   */
  static text<T>(
    id: string,
    header: string,
    field: keyof T,
    options?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('text');

    return {
      id,
      header,
      field,
      resizable: true,
      sortable: true,
      filterable: {
        type: 'text',
        placeholder: `Filter ${header}...`,
        debounceMs: 300,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
      },
      ...options,
    };
  }

  /**
   * Creates a number column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.number('age', 'Age', 'age');
   * ```
   */
  static number<T>(
    id: string,
    header: string,
    field: keyof T,
    options?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('number');

    return {
      id,
      header,
      field,
      sortable: true,
      resizable: true,
      filterable: {
        type: 'number',
        placeholder: `Filter ${header}...`,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
      },
      ...options,
    };
  }

  /**
   * Creates a date column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.date('createdAt', 'Created', 'createdAt');
   * ```
   */
  static date<T>(
    id: string,
    header: string,
    field: keyof T,
    options?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('date');

    return {
      id,
      header,
      field,
      sortable: true,
      resizable: true,
      filterable: {
        type: 'date',
        placeholder: `Filter ${header}...`,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
      },
      ...options,
    };
  }

  /**
   * Creates a select (dropdown) filter column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Filter options for the dropdown
   * @param columnOptions - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.select(
   *   'status',
   *   'Status',
   *   'status',
   *   [
   *     { label: 'Active', value: 'active' },
   *     { label: 'Inactive', value: 'inactive' }
   *   ]
   * );
   * ```
   */
  static select<T>(
    id: string,
    header: string,
    field: keyof T,
    options: { value: any; label: string; disabled?: boolean }[],
    columnOptions?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('select');

    return {
      id,
      header,
      field,
      sortable: true,
      resizable: true,
      filterable: {
        type: 'select',
        placeholder: `Select ${header}...`,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
        parameters: options,
      },
      ...columnOptions,
    };
  }

  /**
   * Creates a multi-select filter column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Filter options for the multi-select
   * @param columnOptions - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.multiSelect(
   *   'tags',
   *   'Tags',
   *   'tags',
   *   [
   *     { label: 'Important', value: 'important' },
   *     { label: 'Urgent', value: 'urgent' }
   *   ]
   * );
   * ```
   */
  static multiSelect<T>(
    id: string,
    header: string,
    field: keyof T,
    options: Array<{ label: string; value: any; disabled?: boolean }>,
    columnOptions?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('multi-select');

    return {
      id,
      header,
      field,
      sortable: true,
      resizable: true,
      filterable: {
        type: 'multi-select',
        placeholder: `Select ${header}...`,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
        parameters: options.map(opt => ({
          label: opt.label,
          value: opt.value,
          disabled: opt.disabled || false,
        })),
      },
      ...columnOptions,
    };
  }

  /**
   * Creates a boolean column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param field - Field name in the data object
   * @param options - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.boolean('isActive', 'Active', 'isActive');
   * ```
   */
  static boolean<T>(
    id: string,
    header: string,
    field: keyof T,
    options?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    const filter = FilterFactory.getDefinition('boolean');
    return {
      id,
      header,
      field,
      sortable: true,
      resizable: true,
      filterable: {
        type: 'boolean',
        placeholder: `Filter ${header}...`,
        operators: filter?.getOperators().map(op => op.value),
        defaultOperator: filter?.getDefaultOperator().value,
      },
      ...options,
    };
  }

  /**
   * Creates an actions column
   *
   * @template T - The type of data items
   * @param id - Unique column identifier
   * @param header - Column header text
   * @param actions - Array of actions to display
   * @param options - Additional column options
   * @returns Column definition
   *
   * @example
   * ```typescript
   * const column = DataGridColumnFactory.actions('actions', 'Actions', [
   *   { id: 'edit', icon: 'edit', label: 'Edit', action: () => {} },
   *   { id: 'delete', icon: 'delete', label: 'Delete', action: () => {} }
   * ]);
   * ```
   */
  static actions<T>(
    id: string,
    header: string,
    actions: Array<{
      id: string;
      icon?: IconName;
      label?: string;
      disabled?: boolean;
      action: (row: T) => void;
    }>,
    options?: Partial<DataGridColumn<T>>,
  ): DataGridColumn<T> {
    return {
      id,
      header,
      sortable: false,
      resizable: true,
      width: '120px',
      actions,
      ...options,
    };
  }

  /**
   * Creates a custom column
   *
   * Use this when you need full control over the column configuration.
   * All other factory methods are convenience wrappers around this.
   *
   * @template T - The type of data items
   * @param config - Complete column configuration
   * @returns Column definition
   */
  static custom<T>(config: DataGridColumn<T>): DataGridColumn<T> {
    return config;
  }
}
