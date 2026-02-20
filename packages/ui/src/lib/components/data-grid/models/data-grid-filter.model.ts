export interface DataGridFilterConfig {
  type: string;
  placeholder?: string;
  operators?: string[];
  defaultOperator?: string;
  defaultValue?: any;
  parameters?: any;
  debounceMs?: number;
}

export interface DataGridFilterOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface DataGridFilterValue {
  operator?: string;
  value?: any;
}

export interface DataGridActiveFilter {
  columnId: string;
  field?: string;
  type: string;
  filter: DataGridFilterValue;
  displayText?: string;
}
