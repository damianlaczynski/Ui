/**
 * Utility function to enrich DataGrid columns with sort types from GraphQL introspection
 *
 * This function uses GraphQL introspection to automatically determine whether
 * each column should use numeric or alphanumeric sorting based on the field type
 * in the GraphQL schema.
 */

import { DataGridColumn } from '../models/data-grid-column.model';
import { GraphQLService } from '@shared/api/services/graphql.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Enriches columns with sort types from GraphQL introspection
 *
 * @param columns - Array of DataGridColumn to enrich
 * @param queryName - GraphQL query name (e.g., 'projects', 'users', 'workItems')
 * @param graphQLService - GraphQLService instance
 * @returns Observable with enriched columns
 *
 * @example
 * ```typescript
 * const columns = [
 *   DataGridColumnFactory.text('name', 'Name', 'name'),
 *   DataGridColumnFactory.number('age', 'Age', 'age'),
 * ];
 *
 * enrichColumnsWithSortTypes(columns, 'users', graphQLService).subscribe(enrichedColumns => {
 *   // enrichedColumns now have sortType set based on GraphQL schema
 * });
 * ```
 */
export function enrichColumnsWithSortTypes<T = any>(
  columns: DataGridColumn<T>[],
  queryName: string,
  graphQLService: GraphQLService,
): Observable<DataGridColumn<T>[]> {
  // Filter columns that are sortable and have a field
  const sortableColumns = columns.filter(col => col.sortable && col.field !== undefined);

  if (sortableColumns.length === 0) {
    // No sortable columns, return as-is
    return of(columns);
  }

  // Extract field names
  const fieldNames = sortableColumns
    .map(col => String(col.field))
    .filter((field, index, self) => self.indexOf(field) === index); // Remove duplicates

  // Get sort types for all fields at once (batch introspection)
  return graphQLService.getFieldsSortTypes(queryName, fieldNames).pipe(
    map(sortTypesMap => {
      // Create enriched columns
      return columns.map(column => {
        // Only enrich sortable columns with fields
        if (!column.sortable || !column.field) {
          return column;
        }

        const fieldName = String(column.field);
        const sortType = sortTypesMap.get(fieldName);

        // If sortType is already set, don't override it
        if (column.sortType) {
          return column;
        }

        // Add sortType from introspection
        return {
          ...column,
          sortType: sortType || 'alphanumeric', // Default to alphanumeric if not found
        };
      });
    }),
    catchError(error => {
      // On error, return columns as-is (without sortType enrichment)
      console.warn('Failed to enrich columns with sort types:', error);
      return of(columns);
    }),
  );
}

/**
 * Enriches a single column with sort type from GraphQL introspection
 *
 * @param column - DataGridColumn to enrich
 * @param queryName - GraphQL query name
 * @param graphQLService - GraphQLService instance
 * @returns Observable with enriched column
 */
export function enrichColumnWithSortType<T = any>(
  column: DataGridColumn<T>,
  queryName: string,
  graphQLService: GraphQLService,
): Observable<DataGridColumn<T>> {
  if (!column.sortable || !column.field) {
    return of(column);
  }

  const fieldName = String(column.field);

  return graphQLService.getFieldSortType(queryName, fieldName).pipe(
    map(sortType => {
      // If sortType is already set, don't override it
      if (column.sortType) {
        return column;
      }

      return {
        ...column,
        sortType,
      };
    }),
    catchError(error => {
      console.warn(`Failed to enrich column ${fieldName} with sort type:`, error);
      return of(column);
    }),
  );
}
