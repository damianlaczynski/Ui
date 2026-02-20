import { Observable } from 'rxjs';
import { DataGridColumn, DataGridRow } from './data-grid-column.model';
import { DataGridActiveFilter } from './data-grid-filter.model';
import { QueryParams, QueryResult } from '../../../api';
import { FilterOperator } from '../filters';

export interface DataGridPaginationConfig {
  enabled: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPageNumbers?: boolean;
  showFirstLast?: boolean;
  showInfo?: boolean;
}

export interface DataGridSortingConfig {
  enabled: boolean;
  defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

export interface DataGridFilteringConfig {
  enabled: boolean;
  debounceMs?: number;
}

export interface DataGridStylingConfig {
  size?: 'small' | 'medium' | 'large';
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  stickyHeaders?: boolean;
}

export interface DataGridVirtualizationConfig {
  enabled: boolean;
  itemHeight?: number;
  bufferSize?: number;
}

export interface DataGridCallbacks<T> {
  onRowClick?: (row: DataGridRow<T>) => void;
  onRowSelect?: (row: DataGridRow<T>) => void;
  onSelectionChange?: (rows: DataGridRow<T>[]) => void;
  onSortChange?: (sort: { field: string; direction: 'asc' | 'desc' }) => void;
  onFilterChange?: (filters: DataGridActiveFilter[]) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onRowExpand?: (row: DataGridRow<T>) => void;
  onRowCollapse?: (row: DataGridRow<T>) => void;
  onCellClick?: (row: DataGridRow<T>, column: DataGridColumn<T>) => void;
  onColumnResize?: (resize: { columnId: string; width: string }) => void;
}

export interface DataGridLoadingConfig {
  title?: string;
  description?: string;
  spinnerSize?:
    | 'extra-tiny'
    | 'tiny'
    | 'extra-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'extra-large'
    | 'huge';
}

export interface DataGridEmptyConfig {
  title?: string;
  description?: string;
  icon?: string;
  primaryAction?: {
    label: string;
    variant: 'primary' | 'secondary';
    action: () => void;
  };
  secondaryAction?: {
    label: string;
    variant: 'primary' | 'secondary';
    action: () => void;
  };
}

export interface DataGridErrorConfig {
  title?: string;
  description?: string;
  icon?: string;
  primaryAction?: {
    label: string;
    variant: 'primary' | 'secondary';
    action: () => void;
  };
  secondaryAction?: {
    label: string;
    variant: 'primary' | 'secondary';
    action: () => void;
  };
}

export interface DataGridFilterTemplateContext<T = any> {
  column: DataGridColumn<T>;
  filterValue: any;
  filterOperator: FilterOperator;
  filterConfig: any;
  placeholder: string;
  operators: FilterOperator[];
  parameters?: any;
  onValueChange: (value: any) => void;
  onOperatorChange: (operator: string) => void;
  onClear: () => void;
}

export interface DataGridConfigInput<T> {
  columns: DataGridColumn<T>[];
  dataSource: (params: QueryParams<T>) => Observable<QueryResult<T>>;
  selection?: 'none' | 'single' | 'multi';
  pagination?: DataGridPaginationConfig;
  sorting?: DataGridSortingConfig;
  filtering?: DataGridFilteringConfig;
  styling?: DataGridStylingConfig;
  virtualization?: DataGridVirtualizationConfig;
  callbacks?: DataGridCallbacks<T>;
  loading?: DataGridLoadingConfig;
  empty?: DataGridEmptyConfig;
  error?: DataGridErrorConfig;
  expandable?: boolean;
}

export interface DataGridConfig<T> extends Required<
  Omit<DataGridConfigInput<T>, 'columns' | 'dataSource'>
> {
  columns: DataGridColumn<T>[];
  dataSource: (params: QueryParams<T>) => Observable<QueryResult<T>>;
}
