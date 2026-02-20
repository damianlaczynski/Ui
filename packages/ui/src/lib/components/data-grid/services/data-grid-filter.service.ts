// =============================================================================
// DataGrid Filter Service
// =============================================================================

import { Injectable, signal, inject, DestroyRef } from '@angular/core';
import {
  DataGridFilterConfig,
  DataGridFilterValue,
  DataGridActiveFilter,
} from '../models/data-grid-filter.model';
import { DataGridColumn } from '../models/data-grid-column.model';
import { FilterFactory } from '../filters/filter-factory';

/**
 * Service for managing data grid filter logic
 * Uses Strategy Pattern for different filter types
 */
@Injectable()
export class DataGridFilterService<T = any> {
  private destroyRef = inject(DestroyRef);

  // Filter state
  activeFilters = signal<Map<string, DataGridFilterValue>>(new Map());
  filterDebounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor() {
    // Cleanup timers on service destruction
    this.destroyRef.onDestroy(() => {
      this.filterDebounceTimers.forEach(timer => clearTimeout(timer));
      this.filterDebounceTimers.clear();
    });
  }

  /**
   * Check if column is filterable
   */
  isColumnFilterable(column: DataGridColumn<T>): boolean {
    return column.filterable !== undefined && column.filterable !== null;
  }

  /**
   * Get filter configuration for a column
   */
  getFilterConfig(column: DataGridColumn<T>): DataGridFilterConfig | null {
    if (column.filterable !== undefined && column.filterable !== null) {
      return column.filterable;
    }
    return null;
  }

  /**
   * Get filter value for a column
   */
  getFilterValue(columnId: string): DataGridFilterValue | null {
    return this.activeFilters().get(columnId) ?? null;
  }

  /**
   * Check if column has active filter
   */
  hasActiveFilter(columnId: string, config?: DataGridFilterConfig): boolean {
    const filter = this.activeFilters().get(columnId);
    if (!filter || !config) return false;

    const definition = FilterFactory.getDefinition(config.type);
    if (!definition) return false;

    return definition.hasActiveValue(filter);
  }

  /**
   * Get filter placeholder text
   */
  getFilterPlaceholder(column: DataGridColumn<T>): string {
    const config = this.getFilterConfig(column);
    return config?.placeholder ?? `Filter ${column.header}...`;
  }

  /**
   * Handle filter value change using strategy
   */
  handleFilterChange(
    column: DataGridColumn<T>,
    value: any,
    debounceCallback?: (filter: DataGridFilterValue) => void,
  ): void {
    const columnId = column.id;
    const config = this.getFilterConfig(column);
    if (!config) return;

    const currentFilter = this.activeFilters().get(columnId) ?? null;
    const operator = currentFilter?.operator ?? config.defaultOperator ?? 'contains';

    const definition = FilterFactory.getDefinition(config.type);
    const parsedValue = definition ? definition.parseValue(value) : value;

    const newFilter: DataGridFilterValue = {
      ...currentFilter,
      operator: operator,
      value: parsedValue,
    };

    // Handle debouncing for text filters
    if (config.type === 'text' && config.debounceMs && config.debounceMs > 0) {
      this.debounceFilterChange(columnId, config.debounceMs, () => {
        if (debounceCallback) {
          debounceCallback(newFilter);
        } else {
          this.updateFilter(columnId, column, newFilter);
        }
      });
    } else {
      if (debounceCallback) {
        debounceCallback(newFilter);
      } else {
        this.updateFilter(columnId, column, newFilter);
      }
    }
  }

  /**
   * Handle filter operator change using strategy
   */
  handleFilterOperatorChange(column: DataGridColumn<T>, operator: string): void {
    const columnId = column.id;
    const config = this.getFilterConfig(column);
    if (!config) return;

    const currentFilter = this.activeFilters().get(columnId) ?? null;

    const newFilter: DataGridFilterValue = {
      ...currentFilter,
      operator: operator,
    };
    this.updateFilter(columnId, column, newFilter);
  }

  /**
   * Get display text for active filter
   */
  getFilterDisplayText(column: DataGridColumn<T>, filter: DataGridFilterValue): string {
    const config = this.getFilterConfig(column);
    if (!config) return '';

    const definition = FilterFactory.getDefinition(config.type);
    if (!definition) return '';

    return definition.getDisplayText(column, filter, config);
  }

  /**
   * Clear filter for a column
   */
  clearFilter(column: DataGridColumn<T>): void {
    const columnId = column.id;

    // Clear debounce timer if exists
    const timer = this.filterDebounceTimers.get(columnId);
    if (timer) {
      clearTimeout(timer);
      this.filterDebounceTimers.delete(columnId);
    }

    const filters = new Map(this.activeFilters());
    filters.delete(columnId);
    this.activeFilters.set(filters);
  }

  /**
   * Get active filters as array
   */
  getActiveFiltersArray(columns: DataGridColumn<T>[]): DataGridActiveFilter[] {
    const activeFiltersArray: DataGridActiveFilter[] = [];

    this.activeFilters().forEach((filter, columnId) => {
      const column = columns.find(col => col.id === columnId);
      if (!column) return;

      const config = this.getFilterConfig(column);
      if (!config) return;

      activeFiltersArray.push({
        columnId,
        field: column.field?.toString(), // Add field for proper data access
        type: config.type,
        filter,
        displayText: this.getFilterDisplayText(column, filter),
      });
    });

    return activeFiltersArray;
  }

  /**
   * Update filter for a column
   */
  updateFilter(columnId: string, column: DataGridColumn<T>, filter: DataGridFilterValue): void {
    const filters = new Map(this.activeFilters());

    const config = this.getFilterConfig(column);
    if (!config) {
      filters.delete(columnId);
      this.activeFilters.set(filters);
      return;
    }

    const definition = FilterFactory.getDefinition(config.type);
    if (!definition) {
      filters.delete(columnId);
      this.activeFilters.set(filters);
      return;
    }

    const hasActiveValue = definition.hasActiveValue(filter);

    if (hasActiveValue) {
      filters.set(columnId, filter);
    } else {
      filters.delete(columnId);
    }

    this.activeFilters.set(filters);
  }

  /**
   * Private helper methods
   */
  private getFilterConfigForColumn(columnId: string): DataGridFilterConfig | null {
    // This is a helper - in real usage, we need columns array
    // For now, return null - this should be called with column object
    return null;
  }

  private debounceFilterChange(columnId: string, debounceMs: number, callback: () => void): void {
    // Clear existing timer
    const existingTimer = this.filterDebounceTimers.get(columnId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      callback();
      this.filterDebounceTimers.delete(columnId);
    }, debounceMs);

    this.filterDebounceTimers.set(columnId, timer);
  }
}
