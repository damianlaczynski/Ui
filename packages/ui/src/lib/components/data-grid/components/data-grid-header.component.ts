// =============================================================================
// DataGrid Header Component
// =============================================================================

import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataGridColumn } from '../models/data-grid-column.model';
import { CheckboxComponent } from '../../field/checkbox/checkbox.component';
import { IconName } from '../../icon';
import { ButtonComponent } from '../../button/button.component';
import { DropdownComponent, DropdownItem } from '../../field/dropdown/dropdown.component';
import { DataGridFilterService } from '../services/data-grid-filter.service';
import { FilterFactory } from '../filters/filter-factory';

/**
 * Component for rendering data grid header row with column labels and sorting
 */
@Component({
  selector: 'ui-data-grid-header',

  imports: [CommonModule, FormsModule, CheckboxComponent, ButtonComponent, DropdownComponent],
  template: `
    <div [class]="headerClasses()">
      <!-- Header Label Row -->
      <div class="data-grid__header-row">
        <!-- Expand Column Header -->
        @if (expandable()) {
          <div
            [class]="getHeaderCellClasses(null, false)"
            class="data-grid__header-cell--expand"
          ></div>
        }

        <!-- Selection Column Header -->
        @if (selectable() && multiSelect()) {
          <div [class]="getSelectionHeaderClasses()">
            <ui-checkbox
              [ngModel]="allRowsSelected()"
              [indeterminate]="someRowsSelected()"
              (ngModelChange)="toggleAllRows.emit()"
            />
          </div>
        }

        <!-- Column Headers -->
        @for (column of columns(); track trackByColumnId($index, column)) {
          <div
            [class]="getHeaderCellClasses(column)"
            [style.width]="column.width || null"
            [style.min-width]="column.minWidth || (column.width ? null : '0')"
            [style.max-width]="column.maxWidth || null"
            [style.flex]="
              column.width ? '0 0 ' + column.width : column.minWidth ? '1 1 auto' : '1 1 0'
            "
          >
            <div class="data-grid__header-label-content">
              @if (column.headerTemplate) {
                <ng-container *ngTemplateOutlet="column.headerTemplate"></ng-container>
              } @else {
                <div class="data-grid__header-text">{{ column.header }}</div>
              }
              <div class="data-grid__header-actions">
                <!-- Operator Selector (for filterable columns) -->
                @if (
                  filteringEnabled() &&
                  isColumnFilterable(column) &&
                  getFilterOperators(column).length > 0
                ) {
                  @if (getFilterOperator(column); as operator) {
                    <ui-dropdown
                      [items]="getFilterOperators(column)"
                      [size]="size()"
                      [ngModel]="operator.value"
                      (ngModelChange)="onFilterOperatorChange(column, $event)"
                      [clearable]="false"
                      [compact]="true"
                      [compactIcon]="operator.icon || 'filter'"
                      class="data-grid__header-filter-operator"
                    />
                  }
                }
                <!-- Sort Button -->
                @if (column.sortable) {
                  <ui-button
                    appearance="subtle"
                    [size]="size()"
                    [icon]="getSortIconForColumn(column)"
                    [selected]="isColumnSorted(column)"
                    [ariaLabel]="
                      column.header +
                      (isColumnSorted(column) ? ' sorted ' + sortDirection() : ' sortable')
                    "
                    [attr.aria-sort]="
                      isColumnSorted(column)
                        ? sortDirection() === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    "
                    (click)="onHeaderClick(column, $event)"
                    (keydown.enter)="onHeaderClick(column, $event)"
                    (keydown.space)="onHeaderClick(column, $event); $event.preventDefault()"
                    class="data-grid__header-sort-button"
                    [class.button--selected]="isColumnSorted(column)"
                  />
                }
              </div>
            </div>
            @if (isColumnResizable()(column)) {
              <div
                class="data-grid__header-resize-handle"
                (mousedown)="onResizeStart($event, column)"
                [attr.aria-label]="'Resize column ' + column.header"
                role="separator"
                [attr.aria-orientation]="'vertical'"
              ></div>
            }
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridHeaderComponent<T = any> {
  private filterService = inject(DataGridFilterService<T>);
  private destroyRef = inject(DestroyRef);

  // Resize state
  private resizingColumnId = signal<string | null>(null);
  private resizeStartX = signal<number>(0);
  private resizeStartWidth = signal<number>(0);
  private resizeNextColumnId = signal<string | null>(null);
  private resizeNextColumnStartWidth = signal<number>(0);

  // Computed: Filter operators per column (stable references)
  filterOperatorsMap = computed(() => {
    const columns = this.columns();
    const map = new Map<string, DropdownItem[]>();

    columns.forEach(column => {
      if (this.isColumnFilterable(column) && column.filterable) {
        const definition = FilterFactory.getDefinition(column.filterable.type);
        if (definition) {
          const operators = definition.getOperators().map(op => ({
            value: op.value,
            label: op.label,
            icon: op.icon as IconName,
          }));
          map.set(column.id, operators);
        }
      }
    });

    return map;
  });

  // Computed: Current filter operator per column (stable references)
  filterOperatorMap = computed(() => {
    const columns = this.columns();
    const activeFilters = this.filterService.activeFilters();
    const map = new Map<string, DropdownItem | null>();

    columns.forEach(column => {
      if (this.isColumnFilterable(column) && column.filterable) {
        const filterValue = activeFilters.get(column.id);
        const definition = FilterFactory.getDefinition(column.filterable.type);

        if (definition) {
          const defaultOperator = definition.getDefaultOperator();
          const operator =
            definition.getOperators().find(op => op.value === filterValue?.operator) ??
            defaultOperator;

          const result = operator
            ? {
                value: operator.value,
                label: operator.label,
                icon: operator.icon as IconName,
              }
            : null;

          map.set(column.id, result);
        }
      }
    });

    return map;
  });

  // Inputs
  columns = input<DataGridColumn<T>[]>([]);
  size = input<'small' | 'medium' | 'large'>('medium');
  stickyHeaders = input<boolean>(false);
  selectable = input<boolean>(false);
  multiSelect = input<boolean>(false);
  expandable = input<boolean>(false);
  allRowsSelected = input<boolean>(false);
  someRowsSelected = input<boolean>(false);
  sortField = input<string | null>(null);
  sortDirection = input<'asc' | 'desc'>('asc');
  getSortIcon = input.required<(column: DataGridColumn<T>) => IconName | null>();
  isColumnResizable = input.required<(column: DataGridColumn<T>) => boolean>();
  filteringEnabled = input<boolean>(true);

  // Outputs
  headerClick = output<{ column: DataGridColumn<T>; event: Event }>();
  toggleAllRows = output<void>();
  filterOperatorChange = output<{ column: DataGridColumn<T>; operator: string }>();
  columnResize = output<{
    columnId: string;
    width: string;
    nextColumnId?: string;
    nextColumnWidth?: string;
  }>();

  // Methods
  headerClasses(): string {
    const classes = ['data-grid__header'];
    if (this.stickyHeaders()) {
      classes.push('data-grid__header--sticky');
    }
    return classes.join(' ');
  }

  getHeaderCellClasses(column: DataGridColumn<T> | null, isSelection: boolean = false): string {
    const classes = ['data-grid__header-cell'];

    if (isSelection) {
      classes.push('data-grid__header-cell--selection');
    }

    // Keep sorted classes for styling the sort indicator color
    if (column?.sortable && this.isColumnSorted(column)) {
      classes.push(`data-grid__header-cell--sorted-${this.sortDirection()}`);
    }

    return classes.join(' ');
  }

  getSelectionHeaderClasses(): string {
    return this.getHeaderCellClasses(null, true);
  }

  onHeaderClick(column: DataGridColumn<T>, event: Event): void {
    this.headerClick.emit({ column, event });
  }

  trackByColumnId(index: number, column: DataGridColumn<T>): string {
    return column.id;
  }

  isColumnSorted(column: DataGridColumn<T>): boolean {
    if (!column.sortable || !column.field) {
      return false;
    }
    return this.sortField() === column.field.toString();
  }

  getSortIconForColumn(column: DataGridColumn<T>): IconName | undefined {
    const icon = this.getSortIcon()(column);
    return icon || undefined;
  }

  // Filter methods
  isColumnFilterable(column: DataGridColumn<T>): boolean {
    return this.filterService.isColumnFilterable(column);
  }

  getFilterOperators(column: DataGridColumn<T>): DropdownItem[] {
    // Get from computed map - stable reference
    return this.filterOperatorsMap().get(column.id) || [];
  }

  getFilterOperator(column: DataGridColumn<T>): DropdownItem | null {
    // Get from computed map - stable reference
    return this.filterOperatorMap().get(column.id) || null;
  }

  onFilterOperatorChange(column: DataGridColumn<T>, operator: string): void {
    this.filterOperatorChange.emit({ column, operator });
  }

  onResizeStart(event: MouseEvent, column: DataGridColumn<T>): void {
    event.preventDefault();
    event.stopPropagation();

    const headerCell = (event.target as HTMLElement).closest(
      '.data-grid__header-cell',
    ) as HTMLElement;
    if (!headerCell) return;

    const startX = event.clientX;
    const startWidth = headerCell.getBoundingClientRect().width;

    const headerRow = headerCell.closest('.data-grid__header-row') as HTMLElement;
    let nextColumn: DataGridColumn<T> | null = null;
    let nextColumnStartWidth = 0;

    if (headerRow) {
      const allCells = Array.from(headerRow.querySelectorAll('.data-grid__header-cell'));
      const currentCellIndex = allCells.indexOf(headerCell);

      for (let i = currentCellIndex + 1; i < allCells.length; i++) {
        const nextCell = allCells[i] as HTMLElement;
        if (
          !nextCell.classList.contains('data-grid__header-cell--selection') &&
          !nextCell.classList.contains('data-grid__header-cell--expand')
        ) {
          nextColumnStartWidth = nextCell.getBoundingClientRect().width;

          const dataCells = allCells.filter(cell => {
            const htmlCell = cell as HTMLElement;
            return (
              !htmlCell.classList.contains('data-grid__header-cell--selection') &&
              !htmlCell.classList.contains('data-grid__header-cell--expand')
            );
          });
          const nextDataCellIndex = dataCells.indexOf(nextCell);

          if (nextDataCellIndex >= 0 && nextDataCellIndex < this.columns().length) {
            nextColumn = this.columns()[nextDataCellIndex];
          }
          break;
        }
      }
    }

    this.resizingColumnId.set(column.id);
    this.resizeStartX.set(startX);
    this.resizeStartWidth.set(startWidth);
    this.resizeNextColumnId.set(nextColumn?.id || null);
    this.resizeNextColumnStartWidth.set(nextColumnStartWidth);

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.onResizeEnd);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  private onResizeMove = (event: MouseEvent): void => {
    const columnId = this.resizingColumnId();
    if (!columnId) return;

    const deltaX = event.clientX - this.resizeStartX();
    const newWidth = Math.max(0, this.resizeStartWidth() + deltaX);

    const column = this.columns().find(col => col.id === columnId);
    if (!column) return;

    const minWidth = column.minWidth ? parseFloat(column.minWidth) : 0;
    const maxWidth = column.maxWidth ? parseFloat(column.maxWidth) : Infinity;
    const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

    const nextColumnId = this.resizeNextColumnId();
    let nextColumnWidth: string | undefined;

    if (nextColumnId) {
      const nextColumn = this.columns().find(col => col.id === nextColumnId);
      if (nextColumn) {
        const widthDelta = this.resizeStartWidth() - constrainedWidth;
        const nextNewWidth = Math.max(0, this.resizeNextColumnStartWidth() + widthDelta);
        const nextMinWidth = nextColumn.minWidth ? parseFloat(nextColumn.minWidth) : 0;
        const nextMaxWidth = nextColumn.maxWidth ? parseFloat(nextColumn.maxWidth) : Infinity;
        const nextConstrainedWidth = Math.max(nextMinWidth, Math.min(nextMaxWidth, nextNewWidth));

        if (nextConstrainedWidth !== nextNewWidth) {
          const actualDelta = nextConstrainedWidth - this.resizeNextColumnStartWidth();
          const adjustedWidth = this.resizeStartWidth() - actualDelta;
          const finalConstrainedWidth = Math.max(minWidth, Math.min(maxWidth, adjustedWidth));
          nextColumnWidth = `${nextConstrainedWidth}px`;
          this.columnResize.emit({
            columnId,
            width: `${finalConstrainedWidth}px`,
            nextColumnId,
            nextColumnWidth,
          });
          return;
        }

        nextColumnWidth = `${nextConstrainedWidth}px`;
      }
    }

    this.columnResize.emit({
      columnId,
      width: `${constrainedWidth}px`,
      nextColumnId: nextColumnId || undefined,
      nextColumnWidth,
    });
  };

  private onResizeEnd = (): void => {
    this.resizingColumnId.set(null);
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.onResizeEnd);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mousemove', this.onResizeMove);
      document.removeEventListener('mouseup', this.onResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
  }
}
