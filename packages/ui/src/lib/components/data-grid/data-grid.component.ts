import {
  Component,
  input,
  output,
  signal,
  computed,
  TemplateRef,
  contentChild,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  effect,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataGridColumn, DataGridRow, DataGridColumnAction } from './models/data-grid-column.model';
import { DataGridActiveFilter } from './models/data-grid-filter.model';
import { DataGridConfig } from './models/data-grid-config.model';
import { QueryParams } from '../../api';
import { CheckboxComponent } from '../field/checkbox/checkbox.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import { StateContainerComponent } from '../state-container/state-container.component';
import { PaginationComponent, PaginationConfig } from '../pagination/pagination.component';
import { ButtonComponent } from '../button/button.component';
import { QuickAction } from '../utils';
import { State } from '../../state/models/state.model';
import { IconName } from '../icon';
import { DataGridFilterService } from './services/data-grid-filter.service';
import { DataGridSelectionService } from './services/data-grid-selection.service';
import { DataGridSortService } from './services/data-grid-sort.service';
import { DataGridHeaderComponent } from './components/data-grid-header.component';
import { DataGridFilterRowComponent } from './components/data-grid-filter-row.component';
import {
  getDataGridClasses,
  getHeaderClasses,
  getHeaderCellClasses,
  getRowClasses,
  getCellClasses,
} from './helpers/data-grid-styling-helpers';
import { mapToDataGridRows } from './helpers/data-grid-mapping-helpers';
import { map, switchMap, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'ui-data-grid',
  templateUrl: './data-grid.component.html',
  imports: [
    CommonModule,
    FormsModule,
    CheckboxComponent,
    LoadingStateComponent,
    StateContainerComponent,
    PaginationComponent,
    ButtonComponent,
    DataGridHeaderComponent,
    DataGridFilterRowComponent,
  ],
  providers: [DataGridFilterService, DataGridSelectionService, DataGridSortService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        min-height: 0;
      }
    `,
  ],
})
export class DataGridComponent<T = any> {
  // Main configuration input
  config = input.required<DataGridConfig<T>>();

  // Template for expandable rows
  rowDetailsTemplate =
    contentChild<TemplateRef<{ $implicit: DataGridRow<T> }>>('rowDetailsTemplate');

  // Outputs
  rowClick = output<DataGridRow<T>>();
  rowSelect = output<DataGridRow<T>>();
  selectionChange = output<DataGridRow<T>[]>();
  cellClick = output<{ row: DataGridRow<T>; column: DataGridColumn<T> }>();
  emptyActionClick = output<QuickAction>();
  errorActionClick = output<QuickAction>();
  sortChange = output<{ field: string; direction: 'asc' | 'desc' }>();
  pageChange = output<number>();
  pageSizeChange = output<number>();
  rowExpand = output<DataGridRow<T>>();
  rowCollapse = output<DataGridRow<T>>();
  filterChange = output<DataGridActiveFilter[]>();
  columnResize = output<{ columnId: string; width: string }>();

  // Internal state
  private destroyRef = inject(DestroyRef);

  hoveredRowId = signal<string | null>(null);
  expandedRows = signal<Set<string>>(new Set());
  currentPage = signal<number>(1);
  currentPageSize = signal<number>(10);
  currentSort = signal<{ field: string; direction: 'asc' | 'desc' } | null>(null);
  rows = signal<DataGridRow<T>[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  totalCount = signal<number>(0);
  columnWidths = signal<Map<string, string>>(new Map());
  private initializedWidths = signal<boolean>(false);
  private queryParamsSubject = new Subject<QueryParams<T>>();
  private lastQueryParams: QueryParams<T> | null = null;

  // Services
  private filterService = inject(DataGridFilterService<T>);
  private selectionService = inject(DataGridSelectionService<T>);
  private sortService = inject(DataGridSortService<T>);

  // Computed properties from config
  columns = computed(() => {
    const configColumns = this.config().columns;
    const widths = this.columnWidths();
    if (widths.size === 0) {
      return configColumns;
    }
    return configColumns.map(col => {
      const resizedWidth = widths.get(col.id);
      if (resizedWidth) {
        return { ...col, width: resizedWidth };
      }
      // If column has explicit width in config, keep it
      if (col.width) {
        return col;
      }
      // Otherwise return column as is (will use flex)
      return col;
    });
  });
  dataSource$ = computed(() => this.config().dataSource);
  selectionMode = computed(() => this.config().selection);
  paginationConfig = computed(() => this.config().pagination);
  sortingConfig = computed(() => this.config().sorting);
  filteringConfig = computed(() => this.config().filtering);
  stylingConfig = computed(() => this.config().styling);
  expandable = computed(() => this.config().expandable);
  callbacks = computed(() => this.config().callbacks);
  loadingConfig = computed(() => this.config().loading);
  emptyConfig = computed(() => this.config().empty);
  errorConfig = computed(() => this.config().error);

  // Selection computed
  allRowsSelected = computed(() => {
    return this.selectionService.allRowsSelected(this.rows());
  });

  someRowsSelected = computed(() => {
    return this.selectionService.someRowsSelected(this.rows());
  });

  hasData = computed(() => {
    return this.rows().length > 0;
  });

  // Computed state for state-container integration
  gridState = computed<State<DataGridRow<T>[]>>(() => {
    const isLoading = this.loading();
    const isError = this.error() != null;
    const rows = this.rows();
    const errorMessage = this.error();

    return {
      isInitial: false,
      isLoading,
      isError,
      data: rows,
      error: errorMessage || undefined,
    };
  });

  // Pagination computed
  paginationConfigComputed = computed<PaginationConfig | null>(() => {
    const pagination = this.paginationConfig();
    if (!pagination?.enabled) {
      return null;
    }

    const pageSize = this.currentPageSize();
    const totalCount = this.totalCount();
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return {
      currentPage: this.currentPage(),
      totalPages: totalPages,
      totalItems: totalCount,
      pageSize: pageSize,
      showPageSizeSelector: pagination.showPageSizeSelector ?? true,
      pageSizeOptions: pagination.pageSizeOptions ?? [10, 20, 50, 100],
      showPageNumbers: pagination.showPageNumbers ?? true,
      maxVisiblePages: 3,
      showFirstLast: pagination.showFirstLast ?? false,
      showInfo: pagination.showInfo ?? false,
    };
  });

  // Styling computed
  size = computed(() => this.stylingConfig()?.size || 'medium');
  striped = computed(() => this.stylingConfig()?.striped || false);
  bordered = computed(() => this.stylingConfig()?.bordered || false);
  hoverable = computed(() => this.stylingConfig()?.hoverable ?? true);
  stickyHeaders = computed(() => this.stylingConfig()?.stickyHeaders || false);

  // Filter computed
  hasFilterableColumns = computed(() => {
    // Check if filtering is globally enabled
    const filteringEnabled = this.filteringConfig()?.enabled ?? true;
    if (!filteringEnabled) {
      return false;
    }
    // Use config().columns instead of columns() to avoid dependency on columnWidths
    return this.config().columns.some(col => this.filterService.isColumnFilterable(col));
  });

  // Loading/Empty/Error state computed
  loadingTitle = computed(() => this.loadingConfig()?.title || 'Loading...');
  loadingDescription = computed(() => this.loadingConfig()?.description || '');
  loadingSpinnerSize = computed(() => this.loadingConfig()?.spinnerSize || 'medium');

  emptyTitle = computed(() => this.emptyConfig()?.title || 'No data available');
  emptyDescription = computed(
    () => this.emptyConfig()?.description || 'There is no data to display.',
  );
  emptyIcon = computed(() => {
    const icon = this.emptyConfig()?.icon;
    return icon ? (icon as IconName) : undefined;
  });
  emptyPrimaryAction = computed(() => {
    const action = this.emptyConfig()?.primaryAction;
    return action
      ? {
          label: action.label,
          variant: action.variant,
          action: action.action,
        }
      : null;
  });
  emptySecondaryAction = computed(() => {
    const action = this.emptyConfig()?.secondaryAction;
    return action
      ? {
          label: action.label,
          variant: action.variant,
          action: action.action,
        }
      : null;
  });

  errorTitle = computed(() => this.errorConfig()?.title || 'Error');
  errorDescription = computed(() => this.errorConfig()?.description || 'An error occurred');
  errorIcon = computed(() => {
    const icon = this.errorConfig()?.icon || 'error_circle';
    return icon as IconName;
  });
  errorPrimaryAction = computed(() => {
    const action = this.errorConfig()?.primaryAction;
    return action
      ? {
          label: action.label,
          variant: action.variant,
          action: action.action,
        }
      : null;
  });
  errorSecondaryAction = computed(() => {
    const action = this.errorConfig()?.secondaryAction;
    return action
      ? {
          label: action.label,
          variant: action.variant,
          action: action.action,
        }
      : null;
  });

  // Sort state
  sortField = computed(() => this.sortService.getSortState().field);
  sortDirection = computed(() => this.sortService.getSortState().direction);

  constructor() {
    // Complete Subject on destroy
    this.destroyRef.onDestroy(() => {
      this.queryParamsSubject.complete();
    });

    // Initialize column widths after first render
    afterNextRender(() => {
      this.initializeColumnWidths();
    });

    // Re-initialize column widths when columns change (but only if not already initialized)
    effect(() => {
      const columns = this.config().columns;
      if (columns.length > 0 && !this.initializedWidths()) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
          this.initializeColumnWidths();
        }, 0);
      }
    });

    // Initialize default sort if configured (only once)
    effect(() => {
      const sorting = this.sortingConfig();
      if (sorting.enabled && sorting.defaultSort && !this.currentSort()) {
        this.sortService.setSort(sorting.defaultSort.field, sorting.defaultSort.direction);
        this.currentSort.set(sorting.defaultSort);
      }
    });

    // Initialize pagination (only once)
    effect(() => {
      const pagination = this.paginationConfig();
      if (pagination.enabled && this.currentPageSize() === 10 && this.currentPage() === 1) {
        this.currentPageSize.set(pagination.pageSize ?? 10);
        this.currentPage.set(1);
      }
    });

    // Subscribe to data source Observable when query params change
    // Use switchMap to cancel previous subscriptions when new query params arrive
    this.queryParamsSubject
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(queryParams => {
          const dataSourceFn = this.dataSource$();
          if (!dataSourceFn) {
            return of({ items: [], totalCount: 0 });
          }
          return dataSourceFn(queryParams).pipe(map(result => mapToDataGridRows(result)));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: data => {
          this.rows.set(data.items);
          this.totalCount.set(data.totalCount);
          this.loading.set(false);
          this.error.set(null);
        },
        error: error => {
          console.error('DataGrid data source error:', error);
          this.error.set(error?.message || 'Failed to load data');
          this.loading.set(false);
        },
      });

    // Effect to emit query params when dependencies change
    effect(() => {
      const dataSourceFn = this.dataSource$();
      if (!dataSourceFn) return;

      // Read all reactive values - these will be tracked by the effect
      // Use config().columns instead of columns() to avoid triggering on columnWidths changes
      const filters = this.filterService.getActiveFiltersArray(this.config().columns);
      const sort = this.currentSort();
      const page = this.currentPage();
      const pageSize = this.currentPageSize();
      const pagination = this.paginationConfig();

      // Filter out empty filters (filters with empty string values)
      const validFilters = filters.filter(f => {
        if (!f.filter || f.filter.value === null || f.filter.value === undefined) {
          return false;
        }
        // Skip empty string values
        if (typeof f.filter.value === 'string' && f.filter.value.trim() === '') {
          return false;
        }
        return true;
      });

      const dataGridFilters = validFilters.map(f => ({
        columnName: f.field || f.columnId,
        filterType: f.filter?.operator || 'equals',
        value: f.filter?.value,
      }));

      // Build query params
      const queryParams: QueryParams<T> = {
        page: pagination.enabled ? page : undefined,
        pageSize: pagination.enabled ? pageSize : undefined,
        orders: sort
          ? [
              {
                columnName: sort.field as keyof T,
                order: sort.direction,
              },
            ]
          : undefined,
        filters: dataGridFilters.map(f => ({
          columnName: f.columnName as keyof T,
          filterType: f.filterType,
          value: f.value,
        })),
      };

      // Only emit if query params actually changed
      if (this.hasQueryParamsChanged(queryParams)) {
        this.lastQueryParams = queryParams;
        this.queryParamsSubject.next(queryParams);
      }
    });
  }

  // Methods
  getDataGridClasses(): string {
    return getDataGridClasses(this.size(), this.striped(), this.bordered(), this.hoverable());
  }

  getHeaderClasses(): string {
    return getHeaderClasses(this.stickyHeaders());
  }

  getHeaderCellClasses(column: DataGridColumn<T> | null, isSelection: boolean = false): string {
    const isSorted = column?.sortable && this.sortService.isColumnSorted(column);
    const sortState = isSorted ? this.sortService.getSortState() : undefined;
    return getHeaderCellClasses(column, isSelection, isSorted, sortState?.direction);
  }

  getSelectionHeaderClasses(): string {
    return this.getHeaderCellClasses(null, true);
  }

  getRowClasses(row: DataGridRow<T>): string {
    return getRowClasses(
      row,
      this.selectionService.isRowSelected(row),
      this.hoveredRowId() === row.id,
      this.isRowExpanded(row),
    );
  }

  getCellClasses(column: DataGridColumn<T> | null, isSelection: boolean = false): string {
    return getCellClasses(column, isSelection);
  }

  getSelectionCellClasses(): string {
    return this.getCellClasses(null, true);
  }

  // Selection methods
  isSelectable(): boolean {
    return this.selectionMode() !== 'none';
  }

  isMultiSelect(): boolean {
    return this.selectionMode() === 'multi';
  }

  toggleAllRows(): void {
    this.selectionService.toggleAllRows(this.rows());
    this.emitSelectionChange();
  }

  toggleRow(row: DataGridRow<T>): void {
    const multiSelect = this.isMultiSelect();
    this.selectionService.toggleRow(row, multiSelect);
    this.rowSelect.emit(row);
    this.emitSelectionChange();
  }

  isRowSelected(row: DataGridRow<T>): boolean {
    return this.selectionService.isRowSelected(row);
  }

  private emitSelectionChange(): void {
    const selected = this.selectionService.getSelectedRows(this.rows());
    this.selectionChange.emit(selected);
    this.callbacks()?.onSelectionChange?.(selected);
  }

  // Row interaction methods
  onRowMouseEnter(row: DataGridRow<T>): void {
    if (!row.disabled) {
      this.hoveredRowId.set(row.id);
    }
  }

  onRowMouseLeave(row: DataGridRow<T>): void {
    this.hoveredRowId.set(null);
  }

  onRowClick(row: DataGridRow<T>): void {
    if (!row.disabled) {
      this.rowClick.emit(row);
      this.callbacks()?.onRowClick?.(row);

      if (this.isSelectable()) {
        this.toggleRow(row);
      }
    }
  }

  onCellClick(row: DataGridRow<T>, column: DataGridColumn<T>, event: MouseEvent): void {
    event.stopPropagation();
    this.cellClick.emit({ row, column });
    this.callbacks()?.onCellClick?.(row, column);
  }

  onActionClick(action: DataGridColumnAction<T>, rowData: T, event: Event): void {
    event.stopPropagation();
    action.action(rowData);
  }

  // Sorting methods
  onHeaderClick(column: DataGridColumn<T>, event: Event): void {
    event.stopPropagation();

    const sorting = this.sortingConfig();
    if (!sorting?.enabled || !column.sortable || !column.field) {
      return;
    }

    const sortState = this.sortService.handleHeaderClick(column);
    if (sortState) {
      this.currentSort.set({
        field: sortState.field!,
        direction: sortState.direction,
      });
      this.sortChange.emit({
        field: sortState.field!,
        direction: sortState.direction,
      });
      this.callbacks()?.onSortChange?.({
        field: sortState.field!,
        direction: sortState.direction,
      });
    }
  }

  getSortIcon(column: DataGridColumn<T>): IconName | null {
    return this.sortService.getSortIcon(column);
  }

  isColumnSorted(column: DataGridColumn<T>): boolean {
    return this.sortService.isColumnSorted(column);
  }

  // State component helpers
  onEmptyActionClick(action: QuickAction): void {
    this.emptyActionClick.emit(action);
    action.action();
  }

  onErrorActionClick(action: QuickAction): void {
    this.errorActionClick.emit(action);
    action.action();
  }

  // Pagination event handlers
  onPaginationPageChange(page: number): void {
    this.currentPage.set(page);
    this.pageChange.emit(page);
    this.callbacks()?.onPageChange?.(page);
  }

  onPaginationPageSizeChange(size: number): void {
    // Update signals - this will trigger the effect to update query params
    this.currentPageSize.set(size);
    this.currentPage.set(1); // Reset to first page when page size changes
    this.pageSizeChange.emit(size);
    this.callbacks()?.onPageSizeChange?.(size);
  }

  // Expandable rows methods
  toggleRowExpansion(row: DataGridRow<T>, event?: Event): void {
    if (row.disabled || !this.expandable()) {
      return;
    }

    if (event) {
      event.stopPropagation();
    }

    const expanded = new Set(this.expandedRows());
    const isExpanded = expanded.has(row.id);

    if (isExpanded) {
      expanded.delete(row.id);
      this.rowCollapse.emit(row);
      this.callbacks()?.onRowCollapse?.(row);
    } else {
      expanded.add(row.id);
      this.rowExpand.emit(row);
      this.callbacks()?.onRowExpand?.(row);
    }

    this.expandedRows.set(expanded);
  }

  isRowExpanded(row: DataGridRow<T>): boolean {
    return this.expandedRows().has(row.id) || row.expanded === true;
  }

  hasRowDetails(row: DataGridRow<T>): boolean {
    return this.expandable() && this.rowDetailsTemplate() != null;
  }

  // Unified filter methods
  onFilterValueChange(column: DataGridColumn<T>, value: any): void {
    this.filterService.handleFilterChange(column, value, filter => {
      this.filterService.updateFilter(column.id, column, filter);
      this.emitFilterChange();
    });
  }

  onFilterOperatorChange(column: DataGridColumn<T>, operator: string): void {
    this.filterService.handleFilterOperatorChange(column, operator);
    this.emitFilterChange();
  }

  // Clear filter
  clearFilter(column: DataGridColumn<T>): void {
    this.filterService.clearFilter(column);
    this.emitFilterChange();
  }

  // Emit filter change
  private emitFilterChange(): void {
    const activeFiltersArray = this.filterService.getActiveFiltersArray(this.columns());
    this.filterChange.emit(activeFiltersArray);
    this.callbacks()?.onFilterChange?.(activeFiltersArray);

    // Reset to first page when filters change
    const pagination = this.paginationConfig();
    if (pagination?.enabled && this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.pageChange.emit(1);
      this.callbacks()?.onPageChange?.(1);
    }
  }

  onColumnResize(
    columnId: string,
    width: string,
    nextColumnId?: string,
    nextColumnWidth?: string,
  ): void {
    const widths = new Map(this.columnWidths());
    widths.set(columnId, width);

    if (nextColumnId && nextColumnWidth) {
      widths.set(nextColumnId, nextColumnWidth);
    }

    this.columnWidths.set(widths);
    this.columnResize.emit({ columnId, width });
    this.callbacks()?.onColumnResize?.({ columnId, width });
  }

  isColumnResizable(column: DataGridColumn<T>): boolean {
    return column.resizable === true;
  }

  private hasQueryParamsChanged(newParams: QueryParams<T>): boolean {
    if (!this.lastQueryParams) {
      return true;
    }

    const old = this.lastQueryParams;
    const newP = newParams;

    // Compare page
    if (old.page !== newP.page) {
      return true;
    }

    // Compare pageSize
    if (old.pageSize !== newP.pageSize) {
      return true;
    }

    // Compare orders
    const oldOrders = old.orders || [];
    const newOrders = newP.orders || [];
    if (oldOrders.length !== newOrders.length) {
      return true;
    }
    for (let i = 0; i < oldOrders.length; i++) {
      if (
        oldOrders[i].columnName !== newOrders[i].columnName ||
        oldOrders[i].order !== newOrders[i].order
      ) {
        return true;
      }
    }

    // Compare filters
    const oldFilters = old.filters || [];
    const newFilters = newP.filters || [];
    if (oldFilters.length !== newFilters.length) {
      return true;
    }
    for (let i = 0; i < oldFilters.length; i++) {
      const oldFilter = oldFilters[i];
      const newFilter = newFilters[i];
      if (
        oldFilter.columnName !== newFilter.columnName ||
        oldFilter.filterType !== newFilter.filterType ||
        JSON.stringify(oldFilter.value) !== JSON.stringify(newFilter.value)
      ) {
        return true;
      }
    }

    // Compare searchTerm
    if (old.searchTerm !== newP.searchTerm) {
      return true;
    }

    return false;
  }

  private initializeColumnWidths(): void {
    if (this.initializedWidths()) {
      return;
    }

    // Wait a bit for DOM to be fully rendered
    setTimeout(() => {
      const headerRow = document.querySelector('.data-grid__header-row') as HTMLElement;
      if (!headerRow) {
        return;
      }

      const configColumns = this.config().columns;
      const widths = new Map<string, string>();
      const allHeaderCells = headerRow.querySelectorAll('.data-grid__header-cell');

      // Find data columns (skip selection and expand columns)
      const dataColumnCells: HTMLElement[] = [];
      allHeaderCells.forEach(cell => {
        const htmlCell = cell as HTMLElement;
        if (
          !htmlCell.classList.contains('data-grid__header-cell--selection') &&
          !htmlCell.classList.contains('data-grid__header-cell--expand')
        ) {
          dataColumnCells.push(htmlCell);
        }
      });

      dataColumnCells.forEach((cell, index) => {
        const column = configColumns[index];
        if (!column) return;

        // Always set initial width, even if column has explicit width
        // This ensures consistent widths across header, filter, and data cells
        const computedWidth = cell.getBoundingClientRect().width;
        if (computedWidth > 0) {
          widths.set(column.id, `${computedWidth}px`);
        } else if (column.width) {
          // Fallback to configured width if computed width is 0
          widths.set(column.id, column.width);
        }
      });

      if (widths.size > 0) {
        this.columnWidths.set(widths);
        this.initializedWidths.set(true);
      }
    }, 0);
  }
}
