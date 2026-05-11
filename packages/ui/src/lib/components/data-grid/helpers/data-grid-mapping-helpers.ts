import { QueryResult } from '../../../api';
import { DataGridRow } from '../models/data-grid-column.model';

/**
 * Maps QueryResult<T> to QueryResult<DataGridRow<T>>
 * This is used to convert API responses to DataGrid row format
 *
 * @param result - QueryResult containing items of type T
 * @returns QueryResult containing DataGridRow items
 */
export function mapToDataGridRows<T>(result: QueryResult<T>): QueryResult<DataGridRow<T>> {
  return {
    items: (result.items || []).map((item: T) => ({
      id: (item as any).id || String(Math.random()),
      data: item,
    })) as DataGridRow<T>[],
    totalCount: result.totalCount || 0,
    hasNextPage: result.hasNextPage ?? false,
    hasPreviousPage: result.hasPreviousPage ?? false,
  };
}
