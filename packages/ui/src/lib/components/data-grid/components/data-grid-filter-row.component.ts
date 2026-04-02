// =============================================================================
// DataGrid Filter Row Component
// =============================================================================

import { Component, input, output, Type, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataGridColumn } from '../models/data-grid-column.model';
import { DataGridFilterConfig } from '../models/data-grid-filter.model';
import { DataGridFilterTemplateContext } from '../models/data-grid-config.model';
import { FilterFactory } from '../filters/filter-factory';
import { DataGridFilterService } from '../services/data-grid-filter.service';

/**
 * Component for rendering data grid filter row
 */
@Component({
  selector: 'ui-data-grid-filter-row',

  imports: [CommonModule, FormsModule],
  template: `
    <div class="data-grid__filter-row">
      <!-- Expand Column Filter (empty) -->
      @if (expandable()) {
        <div [class]="getFilterCellClasses(null, false, true)"></div>
      }

      <!-- Selection Column Filter (empty) -->
      @if (selectable() && multiSelect()) {
        <div [class]="getFilterCellClasses(null, true)"></div>
      }

      <!-- Column Filters -->
      @for (column of columns(); track trackByColumnId($index, column)) {
        <div
          [class]="getFilterCellClasses(column)"
          [style.width]="column.width || null"
          [style.min-width]="column.minWidth || (column.width ? null : '0')"
          [style.max-width]="column.maxWidth || null"
          [style.flex]="
            column.width ? '0 0 ' + column.width : column.minWidth ? '1 1 auto' : '1 1 0'
          "
        >
          @if (filterableColumnIds().has(column.id)) {
            @if (getFilterComponent(column)) {
              <!-- Filter component (operator selector moved to header) -->
              <div class="data-grid__filter-wrapper">
                <ng-container
                  [ngComponentOutlet]="getFilterComponent(column)!"
                  [ngComponentOutletInputs]="getFilterComponentInputs(column)"
                ></ng-container>
              </div>
            } @else if (getFilterTemplate(column)) {
              <!-- Custom filter template (fallback for backward compatibility, operator selector moved to header) -->
              <div class="data-grid__filter-wrapper">
                <ng-container
                  [ngTemplateOutlet]="getFilterTemplate(column)!"
                  [ngTemplateOutletContext]="getFilterTemplateContextObject(column)"
                ></ng-container>
              </div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class DataGridFilterRowComponent<T = any> {
  private filterService = inject(DataGridFilterService);

  // Inputs
  columns = input<DataGridColumn<T>[]>([]);
  size = input<'small' | 'medium' | 'large'>('medium');
  selectable = input<boolean>(false);
  multiSelect = input<boolean>(false);
  expandable = input<boolean>(false);

  // Filter data - computed values passed as inputs
  filterConfigs = computed(() => {
    const map = new Map<string, DataGridFilterConfig>();
    this.columns().forEach(column => {
      const config = this.filterService.getFilterConfig(column);
      if (config) {
        map.set(column.id, config);
      }
    });
    return map;
  });

  filterValues = computed(() => {
    return this.filterService.activeFilters();
  });

  filterableColumnIds = computed(() => {
    const set = new Set<string>();
    this.columns().forEach(column => {
      if (this.filterService.isColumnFilterable(column)) {
        set.add(column.id);
      }
    });
    return set;
  });

  // Unified outputs
  filterValueChange = output<{
    column: DataGridColumn<T>;
    value: any;
  }>();
  filterOperatorChange = output<{
    column: DataGridColumn<T>;
    operator: string;
  }>();

  // Methods
  getFilterCellClasses(
    column: DataGridColumn<T> | null,
    isSelection: boolean = false,
    isExpand: boolean = false,
  ): string {
    const classes = ['data-grid__filter-cell'];

    if (isSelection) {
      classes.push('data-grid__filter-cell--selection');
    }

    if (isExpand) {
      classes.push('data-grid__filter-cell--expand');
    }

    return classes.join(' ');
  }

  trackByColumnId(index: number, column: DataGridColumn<T>): string {
    return column.id;
  }

  /**
   * Get filter component for a column
   */
  getFilterComponent(column: DataGridColumn<T>): Type<any> | null {
    const config = this.filterConfigs().get(column.id);
    if (!config) return null;

    // Get component directly from filter definition
    const definition = FilterFactory.getDefinition(config.type);
    return definition?.component ?? null;
  }

  /**
   * Get filter template for a column (fallback for backward compatibility)
   */
  getFilterTemplate(column: DataGridColumn<T>): any | null {
    const config = this.filterConfigs().get(column.id);
    if (!config) return null;

    // Get template directly from filter definition
    const definition = FilterFactory.getDefinition(config.type);
    return definition?.templateRef ?? null;
  }

  /**
   * Get inputs for filter component
   */
  getFilterComponentInputs(column: DataGridColumn<T>): { [key: string]: any } {
    const context = this.getFilterTemplateContext(column);
    return {
      context: context,
      size: this.size(),
    };
  }

  /**
   * Get filter template context for a column
   */
  /**
   * Get filter template context as object for ngTemplateOutletContext
   */
  getFilterTemplateContextObject(column: DataGridColumn<T>): {
    $implicit: DataGridFilterTemplateContext<T>;
  } {
    return { $implicit: this.getFilterTemplateContext(column) };
  }

  getFilterTemplateContext(column: DataGridColumn<T>): DataGridFilterTemplateContext<T> {
    const config = this.filterConfigs().get(column.id)!;
    const filterValue = this.filterValues().get(column.id);
    const filter = FilterFactory.getDefinition(column.filterable?.type ?? '');
    if (!filter) {
      throw new Error(`Filter definition not found for column ${column.id}`);
    }
    const defaultOperator = filter?.getDefaultOperator();
    const operator =
      filter?.getOperators().find(op => op.value === filterValue?.operator) ?? defaultOperator;
    const value = filterValue?.value ?? null;

    const definition = FilterFactory.getDefinition(config.type);
    const operators = definition
      ? definition.getOperators().map(op => ({
          value: op.value,
          label: op.label,
          icon: op.icon,
        }))
      : [];

    return {
      column,
      filterValue: value,
      filterOperator: operator,
      filterConfig: config,
      placeholder: config.placeholder ?? filter?.defaultPlaceholder ?? '',
      operators: operators,
      parameters: config.parameters,
      onValueChange: (newValue: any) => {
        this.filterValueChange.emit({ column, value: newValue });
      },
      onOperatorChange: (newOperator: string) => {
        this.filterOperatorChange.emit({ column, operator: newOperator });
      },

      onClear: () => {
        this.filterValueChange.emit({ column, value: null });
      },
    };
  }
}
