/**
 * GraphQL Service
 *
 * Provides methods for executing GraphQL queries and mutations.
 * Handles error handling, response transformation, and automatic field type detection.
 */

import { inject, Injectable, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiErrorService } from './api-error.service';
import { State, loadData } from 'ui';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * GraphQL request structure
 */
export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

/**
 * GraphQL response structure
 */
export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    path?: (string | number)[];
    extensions?: Record<string, any>;
  }>;
}

/**
 * Options for GraphQL paginated query
 */
export interface GraphQLQueryOptions {
  /** Custom field name for items (default: 'items') */
  itemsFieldName?: string;
  /** Custom field name for page info (default: 'pageInfo') */
  pageInfoFieldName?: string;
  /** Custom fields fragment for query (default: 'id') */
  fieldsFragment?: string;
  /** Custom filter type name (default: '{SingularName}DtoFilterInput') */
  filterTypeName?: string;
  /** Custom sort type name (default: '{SingularName}DtoSortInput') */
  sortTypeName?: string;
  /** Function to check if field is enum (auto-detected if not provided) */
  isEnumField?: (field: string) => boolean;
  /** Function to check if field is date (auto-detected if not provided) */
  isDateField?: (field: string) => boolean;
  /** Function to convert enum value (optional - only needed for numeric enum mapping) */
  convertEnumValue?: (field: string, value: any) => any;
  /** Additional query arguments (e.g., { projectId: { value: '...', type: 'UUID!' } }) */
  additionalArguments?: Record<string, { value: any; type: string }>;
}

/**
 * Internal options for filter conversion
 */
interface FilterConversionOptions {
  isEnumField?: (field: string) => boolean;
  isDateField?: (field: string) => boolean;
  convertEnumValue?: (field: string, value: any) => any;
  queryName?: string;
}

/**
 * GraphQL Service for executing GraphQL queries and mutations
 */
@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  // ============================================================================
  // Private Properties
  // ============================================================================

  private readonly graphqlUrl = environment.apiUrl + '/graphql';
  private readonly http = inject(HttpClient);
  private readonly apiErrorService = inject(ApiErrorService);

  /** Cache for field types from GraphQL schema introspection */
  private readonly fieldTypeCache = new Map<string, 'numeric' | 'alphanumeric'>();
  /** Cache for fields fragments from GraphQL schema introspection */
  private readonly fieldsFragmentCache = new Map<string, string>();

  // ============================================================================
  // Public API Methods
  // ============================================================================

  /**
   * Executes a GraphQL query
   *
   * @param query - GraphQL query string
   * @param variables - Optional variables for the query
   * @param operationName - Optional operation name
   * @param showErrorToast - Whether to show error toast on failure
   * @returns Observable with the response data
   */
  public query<T = any>(
    query: string,
    variables?: Record<string, any>,
    operationName?: string,
    showErrorToast: boolean = true,
  ): Observable<T> {
    const request: GraphQLRequest = {
      query,
      variables,
      operationName,
    };

    return this.http
      .post<GraphQLResponse<T>>(this.graphqlUrl, request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map(response => this.handleResponse<T>(response, showErrorToast)),
        catchError(error => this.apiErrorService.handleError(error, showErrorToast)),
      );
  }

  /**
   * Executes a GraphQL mutation
   *
   * @param mutation - GraphQL mutation string
   * @param variables - Optional variables for the mutation
   * @param operationName - Optional operation name
   * @param showErrorToast - Whether to show error toast on failure
   * @returns Observable with the response data
   */
  public mutate<T = any>(
    mutation: string,
    variables?: Record<string, any>,
    operationName?: string,
    showErrorToast: boolean = true,
  ): Observable<T> {
    return this.query<T>(mutation, variables, operationName, showErrorToast);
  }

  /**
   * Executes a GraphQL query with state management
   *
   * @param state - WritableSignal to update with state changes
   * @param query - GraphQL query string
   * @param variables - Optional variables for the query
   * @param operationName - Optional operation name
   * @param showErrorToast - Whether to show error toast on failure
   * @param dataPath - Optional path to extract data from response (e.g., 'user' for { user: User })
   * @returns Observable with the response data
   */
  public queryWithState<T>(
    state: WritableSignal<State<T>>,
    query: string,
    variables?: Record<string, any>,
    operationName?: string,
    showErrorToast: boolean = true,
    dataPath?: string,
  ): Observable<T> {
    const observable = dataPath
      ? this.query<any>(query, variables, operationName, showErrorToast).pipe(
          map(response => {
            // Extract data from nested path if specified
            const keys = dataPath.split('.');
            let data = response;
            for (const key of keys) {
              data = data?.[key];
            }
            return data as T;
          }),
        )
      : this.query<T>(query, variables, operationName, showErrorToast);

    return loadData(state, observable);
  }

  /**
   * Executes a GraphQL mutation with state management
   *
   * @param state - WritableSignal to update with state changes
   * @param mutation - GraphQL mutation string
   * @param variables - Optional variables for the mutation
   * @param operationName - Optional operation name
   * @param showErrorToast - Whether to show error toast on failure
   * @param dataPath - Optional path to extract data from response (e.g., 'createUser' for { createUser: User })
   * @returns Observable with the response data
   */
  public mutateWithState<T = any>(
    state: WritableSignal<State<T>>,
    mutation: string,
    variables?: Record<string, any>,
    operationName?: string,
    showErrorToast: boolean = true,
    dataPath?: string,
  ): Observable<T> {
    const observable = dataPath
      ? this.mutate<any>(mutation, variables, operationName, showErrorToast).pipe(
          map(response => {
            // Extract data from nested path if specified
            const keys = dataPath.split('.');
            let data = response;
            for (const key of keys) {
              data = data?.[key];
            }
            return data as T;
          }),
        )
      : this.mutate<T>(mutation, variables, operationName, showErrorToast);

    return loadData(state, observable);
  }

  /**
   * Executes a GraphQL query with pagination, sorting, and filtering.
   * Automatically detects enum and date fields based on naming conventions.
   * Automatically fetches all fields from GraphQL schema if fieldsFragment is not provided.
   *
   * @param queryName - GraphQL query name (e.g., 'projects', 'users', 'workItems')
   * @param params - Query parameters (pagination, sorting, filtering)
   * @param options - Optional configuration for query building
   * @param showErrorToast - Whether to show error toast on failure
   * @returns Observable with QueryResult containing items and metadata
   */
  public queryPaginated<T = any>(
    queryName: string,
    params: QueryParams<T>,
    options?: GraphQLQueryOptions,
    showErrorToast: boolean = true,
  ): Observable<QueryResult<T>> {
    if (!options?.fieldsFragment) {
      const fieldsFragment = this.getFieldsFragmentFromCache(queryName);
      if (fieldsFragment) {
        return this.executePaginatedQuery<T>(queryName, params, { ...options, fieldsFragment }, showErrorToast);
      } else {
        return this.fetchFieldsFragmentAndQuery(queryName, params, options, showErrorToast);
      }
    }

    return this.executePaginatedQuery<T>(queryName, params, options, showErrorToast);
  }

  /**
   * Executes the paginated query
   */
  private executePaginatedQuery<T>(
    queryName: string,
    params: QueryParams<T>,
    options: GraphQLQueryOptions | undefined,
    showErrorToast: boolean,
  ): Observable<QueryResult<T>> {
    const query = this.buildPaginatedQuery(queryName, params, options);
    const variables = this.buildPaginatedVariables(queryName, params, options);

    return this.query<any>(query, variables, undefined, showErrorToast).pipe(
      map((response: any) => this.mapPaginatedResponse<T>(response, queryName, params, options)),
    );
  }

  /**
   * Fetches fields fragment via introspection and then executes the query
   */
  private fetchFieldsFragmentAndQuery<T>(
    queryName: string,
    params: QueryParams<T>,
    options: GraphQLQueryOptions | undefined,
    showErrorToast: boolean,
  ): Observable<QueryResult<T>> {
    const typeName = this.getSingularName(queryName);
    const introspectionQuery = this.buildFieldsIntrospectionQuery(typeName);

    return this.query<any>(introspectionQuery, undefined, undefined, false).pipe(
      switchMap(response => {
        const fieldsFragment = this.extractFieldsFragment(response, queryName);
        const optionsWithFields = { ...options, fieldsFragment };
        return this.executePaginatedQuery<T>(queryName, params, optionsWithFields, showErrorToast);
      }),
      catchError(error => {
        console.warn(`Failed to fetch fields fragment for ${queryName}, using default:`, error);
        const optionsWithDefaultFields = { ...options, fieldsFragment: 'id' };
        return this.executePaginatedQuery<T>(queryName, params, optionsWithDefaultFields, showErrorToast);
      }),
    );
  }

  // ============================================================================
  // Public Introspection Methods
  // ============================================================================

  /**
   * Determines sort type (numeric or alphanumeric) for a field using GraphQL introspection
   *
   * @param queryName - GraphQL query name (e.g., 'projects', 'users', 'workItems')
   * @param fieldName - Field name to check
   * @returns Observable with sort type: 'numeric' for numeric types, 'alphanumeric' for string types
   */
  public getFieldSortType(queryName: string, fieldName: string): Observable<'numeric' | 'alphanumeric'> {
    const cacheKey = `${queryName}.${fieldName}`;

    if (this.fieldTypeCache.has(cacheKey)) {
      return of(this.fieldTypeCache.get(cacheKey)!);
    }

    const typeName = this.getSingularName(queryName);
    const introspectionQuery = this.buildFieldTypeIntrospectionQuery(typeName);

    return this.query<any>(introspectionQuery, undefined, undefined, false).pipe(
      map(response => this.extractFieldSortType(response, cacheKey, fieldName)),
      catchError(error => {
        console.warn(`Failed to introspect field type for ${cacheKey}:`, error);
        this.fieldTypeCache.set(cacheKey, 'alphanumeric');
        return of('alphanumeric' as const);
      }),
    );
  }

  /**
   * Gets sort type for multiple fields at once (batch introspection)
   *
   * @param queryName - GraphQL query name
   * @param fieldNames - Array of field names to check
   * @returns Observable with map of field names to sort types
   */
  public getFieldsSortTypes(
    queryName: string,
    fieldNames: string[],
  ): Observable<Map<string, 'numeric' | 'alphanumeric'>> {
    const typeName = this.getSingularName(queryName);
    const introspectionQuery = this.buildFieldTypeIntrospectionQuery(typeName);

    return this.query<any>(introspectionQuery, undefined, undefined, false).pipe(
      map(response => this.extractFieldsSortTypes(response, queryName, fieldNames)),
      catchError(error => {
        console.warn(`Failed to introspect field types for ${queryName}:`, error);
        return of(this.createDefaultSortTypesMap(queryName, fieldNames));
      }),
    );
  }

  /**
   * Clears the field type cache (useful for testing or when schema changes)
   */
  public clearFieldTypeCache(): void {
    this.fieldTypeCache.clear();
  }

  /**
   * Clears the fields fragment cache (useful for testing or when schema changes)
   */
  public clearFieldsFragmentCache(): void {
    this.fieldsFragmentCache.clear();
  }

  /**
   * Clears all caches (field types and fields fragments)
   */
  public clearAllCaches(): void {
    this.clearFieldTypeCache();
    this.clearFieldsFragmentCache();
  }

  // ============================================================================
  // Private Response Handling Methods
  // ============================================================================

  /**
   * Handles GraphQL response and extracts data or throws error
   */
  private handleResponse<T>(response: GraphQLResponse<T>, showErrorToast: boolean): T {
    if (response.errors && response.errors.length > 0) {
      const errorMessages = response.errors.map(e => e.message).join(', ');
      const error: any = new Error(errorMessages);
      error.graphqlErrors = response.errors;
      throw error;
    }

    if (response.data === undefined) {
      throw new Error('No data returned from GraphQL query');
    }

    return response.data;
  }

  /**
   * Maps GraphQL response to QueryResult format
   */
  private mapPaginatedResponse<T>(
    response: any,
    queryName: string,
    params: QueryParams<T>,
    options?: GraphQLQueryOptions,
  ): QueryResult<T> {
    const queryResult = response[queryName];

    if (!queryResult) {
      throw new Error(`Query result not found for ${queryName}. Available keys: ${Object.keys(response).join(', ')}`);
    }

    const itemsFieldName = options?.itemsFieldName || 'items';
    const pageInfoFieldName = options?.pageInfoFieldName || 'pageInfo';
    const items = queryResult[itemsFieldName] || [];
    const pageInfo = queryResult[pageInfoFieldName] || {};

    const totalCount = this.calculateTotalCount(items, pageInfo, params);

    return {
      items: items as T[],
      totalCount,
      hasNextPage: pageInfo.hasNextPage ?? false,
      hasPreviousPage: params.page ? params.page > 1 : false,
    };
  }

  /**
   * Calculates total count based on pageInfo and items
   */
  private calculateTotalCount<T = any>(
    items: any[],
    pageInfo: { hasNextPage?: boolean },
    params: QueryParams<T>,
  ): number {
    if (pageInfo.hasNextPage && params.page && params.pageSize) {
      return params.page * params.pageSize + 1;
    }
    if (params.page && params.pageSize) {
      return (params.page - 1) * params.pageSize + items.length;
    }
    return items.length;
  }

  // ============================================================================
  // Private Query Building Methods
  // ============================================================================

  /**
   * Builds GraphQL query string from query parameters
   */
  private buildPaginatedQuery<T = any>(
    queryName: string,
    params: QueryParams<T>,
    options?: GraphQLQueryOptions,
  ): string {
    const hasFilters = !!(params.filters && params.filters.length > 0);
    const hasSort = !!(params.orders && params.orders.length > 0);

    const variables = this.buildQueryVariables(hasFilters, hasSort, queryName, options);
    const variablesString = variables.length > 0 ? `(${variables.join(', ')})` : '';
    const argumentsString = this.buildQueryArguments(params, options);

    const itemsFieldName = options?.itemsFieldName || 'items';
    const fieldsFragment = options?.fieldsFragment || this.getDefaultFieldsFragment();
    const pageInfoFieldName = options?.pageInfoFieldName || 'pageInfo';

    return `
      query Get${this.capitalizeFirst(queryName)}${variablesString} {
        ${queryName}${argumentsString} {
          ${itemsFieldName} {
            ${fieldsFragment}
          }
          ${pageInfoFieldName} {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `;
  }

  /**
   * Builds query variables array
   */
  private buildQueryVariables(
    hasFilters: boolean,
    hasSort: boolean,
    queryName: string,
    options?: GraphQLQueryOptions,
  ): string[] {
    const variables: string[] = ['$skip: Int', '$take: Int'];

    if (hasFilters) {
      const filterTypeName = options?.filterTypeName || this.getFilterTypeName(queryName);
      variables.push(`$where: ${filterTypeName}`);
    }

    if (hasSort) {
      const sortTypeName = options?.sortTypeName || this.getSortTypeName(queryName);
      variables.push(`$order: [${sortTypeName}!]`);
    }

    if (options?.additionalArguments) {
      Object.entries(options.additionalArguments).forEach(([name, arg]) => {
        variables.push(`$${name}: ${arg.type}`);
      });
    }

    return variables;
  }

  /**
   * Builds query arguments string
   */
  private buildQueryArguments<T = any>(params: QueryParams<T>, options?: GraphQLQueryOptions): string {
    const args: string[] = ['skip: $skip', 'take: $take'];

    if (params.filters && params.filters.length > 0) {
      args.push('where: $where');
    }

    if (params.orders && params.orders.length > 0) {
      args.push('order: $order');
    }

    if (options?.additionalArguments) {
      Object.keys(options.additionalArguments).forEach(name => {
        args.push(`${name}: $${name}`);
      });
    }

    return args.length > 0 ? `(${args.join(', ')})` : '';
  }

  /**
   * Builds GraphQL variables from query parameters
   */
  private buildPaginatedVariables<T = any>(
    queryName: string,
    params: QueryParams<T>,
    options?: GraphQLQueryOptions,
  ): Record<string, any> {
    const variables: Record<string, any> = {};
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 10;

    variables['skip'] = (page - 1) * pageSize;
    variables['take'] = pageSize;

    if (params.filters && params.filters.length > 0) {
      variables['where'] = this.buildWhereInput(params.filters, { ...options, queryName });
    }

    if (params.orders && params.orders.length > 0) {
      variables['order'] = params.orders.map(order => ({
        [order.columnName]: order.order.toUpperCase(),
      }));
    }

    if (options?.additionalArguments) {
      Object.entries(options.additionalArguments).forEach(([name, arg]) => {
        variables[name] = arg.value;
      });
    }

    return variables;
  }

  // ============================================================================
  // Private Filter Building Methods
  // ============================================================================

  /**
   * Builds where input object for GraphQL variables
   */
  private buildWhereInput<T = any>(
    filters: QueryParams<T>['filters'],
    options?: FilterConversionOptions,
  ): Record<string, any> {
    if (!filters || filters.length === 0) {
      return {};
    }

    const validFilters = filters
      .map(filter => this.convertFilterToGraphQL(filter, options))
      .filter((filter): filter is Record<string, any> => filter !== null);

    if (validFilters.length === 0) {
      return {};
    }

    if (validFilters.length === 1) {
      return validFilters[0];
    }

    return { and: validFilters };
  }

  /**
   * Converts filter to GraphQL filter format
   */
  private convertFilterToGraphQL<T = any>(
    filter: NonNullable<QueryParams<T>['filters']>[0],
    options?: FilterConversionOptions,
  ): Record<string, any> | null {
    if (!filter || filter.value === null || filter.value === undefined) {
      return null;
    }

    // Check for empty arrays
    if (Array.isArray(filter.value) && filter.value.length === 0) {
      return null;
    }

    // Check for empty objects
    if (typeof filter.value === 'object' && !Array.isArray(filter.value) && Object.keys(filter.value).length === 0) {
      return null;
    }

    const field = filter.columnName;
    const fieldString = String(field);
    const isEnumField = options?.isEnumField ? options.isEnumField(fieldString) : this.isDefaultEnumField(fieldString);
    const isDateField = options?.isDateField ? options.isDateField(fieldString) : this.isDefaultDateField(fieldString);

    let value = filter.value;
    let operator = filter.filterType;

    // Convert date values
    if (isDateField) {
      value = this.convertDateValueForFilter(value, operator);
    }

    // Convert enum values
    if (isEnumField) {
      const convertEnum = options?.convertEnumValue || this.convertDefaultEnumValue;
      value = this.convertEnumValueForFilter(value, fieldString, convertEnum, operator);
    }

    // Set default operator if not provided
    if (!operator) {
      operator = isEnumField ? 'equals' : 'contains';
    }

    const effectiveOperator = isEnumField && operator === 'contains' ? 'equals' : operator;

    return this.buildGraphQLFilter(fieldString, effectiveOperator, value);
  }

  /**
   * Converts date value for filter (handles ranges)
   */
  private convertDateValueForFilter(value: any, operator?: string): any {
    if (operator === 'between' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const range = value as { startDate?: any; endDate?: any };
      if (range.startDate) {
        range.startDate = this.convertDateValue(range.startDate);
      }
      if (range.endDate) {
        range.endDate = this.convertDateValue(range.endDate);
      }
      return range;
    }
    return this.convertDateValue(value);
  }

  /**
   * Converts enum value for filter (handles arrays and ranges)
   */
  private convertEnumValueForFilter(
    value: any,
    field: string,
    convertEnum: (field: string, value: any) => any,
    operator: string | undefined,
  ): any {
    if (operator === 'between' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const range = value as { start?: any; end?: any };
      if (range.start != null) {
        range.start = convertEnum(field, range.start);
      }
      if (range.end != null) {
        range.end = convertEnum(field, range.end);
      }
      return range;
    }

    const converted = convertEnum(field, value);
    return Array.isArray(converted) ? converted.map(v => convertEnum(field, v)) : converted;
  }

  /**
   * Builds GraphQL filter object based on operator
   */
  private buildGraphQLFilter(field: string, operator: string, value: any): Record<string, any> | null {
    switch (operator) {
      case 'contains':
        return this.buildContainsFilter(field, value);
      case 'equals':
        return this.buildEqualsFilter(field, value);
      case 'startsWith':
        return { [field]: { startsWith: value } };
      case 'endsWith':
        return { [field]: { endsWith: value } };
      case 'doesNotContain':
      case 'doesNotEqual':
      case 'notEquals':
        return this.buildNotEqualsFilter(field, value);
      case 'greaterThan':
        return { [field]: { gt: value } };
      case 'lessThan':
        return { [field]: { lt: value } };
      case 'greaterOrEqual':
        return { [field]: { gte: value } };
      case 'lessOrEqual':
        return { [field]: { lte: value } };
      case 'between':
        return this.buildBetweenFilter(field, value);
      case 'before':
        return { [field]: { lt: value } };
      case 'after':
        return { [field]: { gt: value } };
      case 'in':
        return this.buildInFilter(field, value);
      case 'notIn':
      case 'nin':
        return this.buildNotInFilter(field, value);
      case 'isNull':
        return { [field]: { eq: null } };
      case 'isNotNull':
        return { [field]: { neq: null } };
      default:
        return { [field]: { contains: value } };
    }
  }

  /**
   * Builds contains filter (handles arrays for multi-select)
   * Uses 'in' operator for arrays (more efficient than 'or' with multiple 'eq')
   */
  private buildContainsFilter(field: string, value: any): Record<string, any> | null {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1) {
        return { [field]: { eq: value[0] } };
      }
      // Use 'in' operator for better performance
      return { [field]: { in: value } };
    }
    return { [field]: { contains: value } };
  }

  /**
   * Builds equals filter (handles arrays for multi-select)
   * Uses 'in' operator for arrays (more efficient than 'or' with multiple 'eq')
   */
  private buildEqualsFilter(field: string, value: any): Record<string, any> | null {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1) {
        return { [field]: { eq: value[0] } };
      }
      // Use 'in' operator for better performance
      return { [field]: { in: value } };
    }
    return { [field]: { eq: value } };
  }

  /**
   * Builds not equals filter (handles arrays for multi-select)
   * Uses 'nin' operator for arrays (more efficient than 'and' with multiple 'neq')
   */
  private buildNotEqualsFilter(field: string, value: any): Record<string, any> | null {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1) {
        return { [field]: { neq: value[0] } };
      }
      // Use 'nin' operator for better performance
      return { [field]: { nin: value } };
    }
    return { [field]: { neq: value } };
  }

  /**
   * Builds 'in' filter (value is in the list)
   */
  private buildInFilter(field: string, value: any): Record<string, any> | null {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1) {
        return { [field]: { eq: value[0] } };
      }
      return { [field]: { in: value } };
    }
    // If not an array, treat as single value
    return { [field]: { eq: value } };
  }

  /**
   * Builds 'not in' filter (value is not in the list)
   */
  private buildNotInFilter(field: string, value: any): Record<string, any> | null {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1) {
        return { [field]: { neq: value[0] } };
      }
      return { [field]: { nin: value } };
    }
    // If not an array, treat as single value
    return { [field]: { neq: value } };
  }

  /**
   * Builds between filter (handles date ranges and numeric ranges)
   */
  private buildBetweenFilter(field: string, value: any): Record<string, any> {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Date range format: { startDate, endDate }
      if ('startDate' in value || 'endDate' in value) {
        const range = value as { startDate?: any; endDate?: any };
        if (range.startDate && range.endDate) {
          return {
            and: [{ [field]: { gte: range.startDate } }, { [field]: { lte: range.endDate } }],
          };
        }
        if (range.startDate) {
          return { [field]: { gte: range.startDate } };
        }
        if (range.endDate) {
          return { [field]: { lte: range.endDate } };
        }
      }
      // Numeric range format: { start, end }
      if ('start' in value || 'end' in value) {
        const range = value as { start?: any; end?: any };
        if (range.start != null && range.end != null) {
          return {
            and: [{ [field]: { gte: range.start } }, { [field]: { lte: range.end } }],
          };
        }
        if (range.start != null) {
          return { [field]: { gte: range.start } };
        }
        if (range.end != null) {
          return { [field]: { lte: range.end } };
        }
      }
    }
    return { [field]: { gte: value } };
  }

  // ============================================================================
  // Private Field Type Detection Methods
  // ============================================================================

  /**
   * Default check if field is enum (uses naming convention)
   */
  private isDefaultEnumField(field: string): boolean {
    const lowerField = field.toLowerCase();
    return (
      lowerField === 'status' ||
      lowerField === 'visibility' ||
      lowerField === 'type' ||
      lowerField === 'priority' ||
      lowerField === 'state' ||
      lowerField.endsWith('status') ||
      lowerField.endsWith('type') ||
      lowerField.endsWith('state')
    );
  }

  /**
   * Default check if field is date (uses naming convention)
   */
  private isDefaultDateField(field: string): boolean {
    const lowerField = field.toLowerCase();
    return lowerField.includes('date') || lowerField.endsWith('at');
  }

  // ============================================================================
  // Private Value Conversion Methods
  // ============================================================================

  /**
   * Default enum value converter (pass-through)
   */
  private convertDefaultEnumValue(field: string, value: any): any {
    return value;
  }

  /**
   * Converts date value to ISO 8601 format for GraphQL DateTime
   */
  private convertDateValue(value: any): string {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      // Already in ISO format
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return value;
      }
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
      return value;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === 'number') {
      return new Date(value).toISOString();
    }

    return value;
  }

  // ============================================================================
  // Private Introspection Helper Methods
  // ============================================================================

  /**
   * Builds GraphQL introspection query for field types
   */
  private buildFieldTypeIntrospectionQuery(typeName: string): string {
    return `
      query IntrospectFieldType {
        __type(name: "${typeName}") {
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    `;
  }

  /**
   * Builds GraphQL introspection query for all fields (for fields fragment)
   */
  private buildFieldsIntrospectionQuery(typeName: string): string {
    return `
      query IntrospectFields {
        __type(name: "${typeName}") {
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    `;
  }

  /**
   * Extracts fields fragment from introspection response
   * Includes scalar fields, enums, and lists of scalars/enums
   * Excludes nested objects and lists of objects
   */
  private extractFieldsFragment(response: any, queryName: string): string {
    const type = response?.__type;
    if (!type || !type.fields) {
      return 'id';
    }

    // Get all field names, excluding nested objects (we only want scalar/enum fields)
    const fields = type.fields.filter((field: any) => this.isScalarOrEnumField(field)).map((field: any) => field.name);

    const fieldsFragment = fields.length > 0 ? fields.join('\n        ') : 'id';

    // Cache the fragment
    this.fieldsFragmentCache.set(queryName, fieldsFragment);

    return fieldsFragment;
  }

  /**
   * Checks if a field is a scalar or enum type (including wrapped in NON_NULL or LIST)
   */
  private isScalarOrEnumField(field: any): boolean {
    const fieldType = field.type;
    let currentType = fieldType;

    // Unwrap NON_NULL and LIST wrappers to get to the actual type
    while (currentType && (currentType.kind === 'NON_NULL' || currentType.kind === 'LIST')) {
      currentType = currentType.ofType;
    }

    if (!currentType) {
      return false;
    }

    const kind = currentType.kind || '';
    // Include scalar types and enums, exclude objects and interfaces
    return kind === 'SCALAR' || kind === 'ENUM';
  }

  /**
   * Gets fields fragment from cache
   */
  private getFieldsFragmentFromCache(queryName: string): string | undefined {
    return this.fieldsFragmentCache.get(queryName);
  }

  /**
   * Extracts sort type for a single field from introspection response
   */
  private extractFieldSortType(response: any, cacheKey: string, fieldName: string): 'numeric' | 'alphanumeric' {
    const type = response?.__type;
    if (!type || !type.fields) {
      this.fieldTypeCache.set(cacheKey, 'alphanumeric');
      return 'alphanumeric';
    }

    const field = type.fields.find((f: any) => f.name === fieldName);
    if (!field) {
      this.fieldTypeCache.set(cacheKey, 'alphanumeric');
      return 'alphanumeric';
    }

    const sortType = this.determineSortTypeFromField(field);
    this.fieldTypeCache.set(cacheKey, sortType);
    return sortType;
  }

  /**
   * Extracts sort types for multiple fields from introspection response
   */
  private extractFieldsSortTypes(
    response: any,
    queryName: string,
    fieldNames: string[],
  ): Map<string, 'numeric' | 'alphanumeric'> {
    const result = new Map<string, 'numeric' | 'alphanumeric'>();
    const type = response?.__type;

    if (!type || !type.fields) {
      return this.createDefaultSortTypesMap(queryName, fieldNames);
    }

    fieldNames.forEach(fieldName => {
      const cacheKey = `${queryName}.${fieldName}`;

      if (this.fieldTypeCache.has(cacheKey)) {
        result.set(fieldName, this.fieldTypeCache.get(cacheKey)!);
        return;
      }

      const field = type.fields.find((f: any) => f.name === fieldName);
      if (!field) {
        this.fieldTypeCache.set(cacheKey, 'alphanumeric');
        result.set(fieldName, 'alphanumeric');
        return;
      }

      const sortType = this.determineSortTypeFromField(field);
      this.fieldTypeCache.set(cacheKey, sortType);
      result.set(fieldName, sortType);
    });

    return result;
  }

  /**
   * Determines sort type from GraphQL field type information
   */
  private determineSortTypeFromField(field: any): 'numeric' | 'alphanumeric' {
    const fieldType = field.type;
    const actualType = fieldType.ofType || fieldType;
    const fieldTypeName = actualType.name || '';
    const kind = actualType.kind || fieldType.kind || '';

    const isNumeric =
      fieldTypeName === 'Int' ||
      fieldTypeName === 'Float' ||
      fieldTypeName === 'Decimal' ||
      (kind === 'SCALAR' &&
        (fieldTypeName.includes('Int') || fieldTypeName.includes('Float') || fieldTypeName.includes('Decimal')));

    return isNumeric ? 'numeric' : 'alphanumeric';
  }

  /**
   * Creates default sort types map (all alphanumeric)
   */
  private createDefaultSortTypesMap(queryName: string, fieldNames: string[]): Map<string, 'numeric' | 'alphanumeric'> {
    const result = new Map<string, 'numeric' | 'alphanumeric'>();
    fieldNames.forEach(fieldName => {
      const cacheKey = `${queryName}.${fieldName}`;
      this.fieldTypeCache.set(cacheKey, 'alphanumeric');
      result.set(fieldName, 'alphanumeric');
    });
    return result;
  }

  // ============================================================================
  // Private Utility Methods
  // ============================================================================

  /**
   * Gets filter type name for GraphQL query (HotChocolate naming convention)
   */
  private getFilterTypeName(queryName: string): string {
    const singularName = this.getSingularName(queryName);
    return `${singularName}DtoFilterInput`;
  }

  /**
   * Gets sort type name for GraphQL query (HotChocolate naming convention)
   */
  private getSortTypeName(queryName: string): string {
    const singularName = this.getSingularName(queryName);
    return `${singularName}DtoSortInput`;
  }

  /**
   * Converts plural name to singular for DTO type names
   */
  private getSingularName(pluralName: string): string {
    if (pluralName.endsWith('ies')) {
      return this.capitalizeFirst(pluralName.slice(0, -3) + 'y');
    }
    // Words ending in "es" that should remove "es" (e.g., boxes -> box, watches -> watch)
    // Check for specific patterns: xes, ches, shes, ses (where s is preceded by consonant)
    if (pluralName.endsWith('es')) {
      const beforeEs = pluralName.slice(0, -2);
      const lastChar = beforeEs.slice(-1);
      // Remove "es" only for: xes, ches, shes, or ses (where s is preceded by consonant)
      if (
        pluralName.endsWith('xes') ||
        pluralName.endsWith('ches') ||
        pluralName.endsWith('shes') ||
        (pluralName.endsWith('ses') && !['a', 'e', 'i', 'o', 'u'].includes(lastChar))
      ) {
        return this.capitalizeFirst(beforeEs);
      }
      // For other words ending in "es" (like roles, tables, files), just remove "s"
      return this.capitalizeFirst(pluralName.slice(0, -1));
    }
    if (pluralName.endsWith('s')) {
      return this.capitalizeFirst(pluralName.slice(0, -1));
    }
    return this.capitalizeFirst(pluralName);
  }

  /**
   * Capitalizes first letter of string
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Gets default fields fragment for GraphQL query
   */
  private getDefaultFieldsFragment(): string {
    return 'id';
  }
}
