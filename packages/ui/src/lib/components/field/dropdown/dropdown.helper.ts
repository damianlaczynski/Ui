import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropdownItem } from './dropdown.component';
import { QueryParams, QueryResult } from '../../../api';

/**
 * Helper utilities for working with dropdown components
 */
export class DropdownHelper {
  /**
   * Load selected items using a dataSource function.
   * Useful for preloading items when you have preselected values.
   *
   * @example
   * ```typescript
   * ngOnInit() {
   *   const user = this.user();
   *   if (user.roleIds?.length) {
   *     DropdownHelper.loadSelectedItems(
   *       this.rolesDataSource,
   *       user.roleIds
   *     ).subscribe(items => {
   *       this.preloadedRoles.set(items);
   *     });
   *   }
   * }
   * ```
   *
   * @param dataSource The dataSource function from your dropdown
   * @param selectedValues Array of selected value IDs
   * @param idField The field name to filter by (default: 'id')
   * @returns Observable of DropdownItems
   */
  static loadSelectedItems<T = any>(
    dataSource: (params: QueryParams<T>) => Observable<QueryResult<DropdownItem>>,
    selectedValues: (string | number)[],
    idField: keyof T = 'id' as keyof T,
  ): Observable<DropdownItem[]> {
    if (!selectedValues || selectedValues.length === 0) {
      return new Observable(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    const params: QueryParams<T> = {
      page: 1,
      pageSize: selectedValues.length,
      filters: [
        {
          columnName: idField,
          filterType: 'in',
          value: selectedValues,
        },
      ],
    };

    return dataSource(params).pipe(map(result => result.items));
  }
}
