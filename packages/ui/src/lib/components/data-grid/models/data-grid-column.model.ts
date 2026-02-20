import { TemplateRef } from '@angular/core';
import { DataGridFilterConfig } from './data-grid-filter.model';
import { Size } from '../../utils';
import { IconName } from '../../icon';

export type SortType = 'numeric' | 'alphanumeric';

export interface DataGridColumnAction<T = any> {
  id: string;
  icon?: IconName;
  label?: string;
  disabled?: boolean;
  action: (row: T) => void;
}

export interface DataGridColumn<T = any> {
  id: string;
  header: string;
  field?: keyof T;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  sortType?: SortType; // Type of sorting: 'numeric' for numbers, 'alphanumeric' for strings
  resizable?: boolean;
  filterable?: DataGridFilterConfig;
  cellTemplate?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  actions?: DataGridColumnAction<T>[];
  formatter?: (value: any, row: T) => string | number | null | undefined;
}

export interface DataGridRow<T = any> {
  id: string;
  data: T;
  selected?: boolean;
  disabled?: boolean;
  expanded?: boolean;
}

export interface DataGridConfig<T = any> {
  columns: DataGridColumn<T>[];
  rows: DataGridRow<T>[];
  selectable?: boolean;
  multiSelect?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  size?: Size;
  loading?: boolean;
  emptyMessage?: string;
  filterable?: boolean;
}
