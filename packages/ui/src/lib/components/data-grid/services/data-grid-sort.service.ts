// =============================================================================
// DataGrid Sort Service
// =============================================================================

import { Injectable, signal } from '@angular/core';
import { DataGridColumn } from '../models/data-grid-column.model';

export interface SortState {
  field: string | null;
  direction: 'asc' | 'desc';
}

/**
 * Service for managing data grid sorting logic
 */
@Injectable()
export class DataGridSortService<T = any> {
  // Sort state
  sortField = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  /**
   * Get current sort state
   */
  getSortState(): SortState {
    return {
      field: this.sortField(),
      direction: this.sortDirection(),
    };
  }

  /**
   * Handle header click for sorting
   */
  handleHeaderClick(column: DataGridColumn<T>): SortState | null {
    if (!column.sortable || !column.field) {
      return null;
    }

    const field = column.field.toString();
    const isCurrentField = this.sortField() === field;

    if (isCurrentField) {
      // Toggle sort direction if same field
      const newDirection = this.sortDirection() === 'asc' ? 'desc' : 'asc';
      this.sortDirection.set(newDirection);
    } else {
      // Set new field and default to ascending
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }

    return this.getSortState();
  }

  /**
   * Check if column is sorted
   */
  isColumnSorted(column: DataGridColumn<T>): boolean {
    if (!column.sortable || !column.field) {
      return false;
    }
    return this.sortField() === column.field.toString();
  }

  /**
   * Get sort icon for column
   * Returns different icons based on sortType:
   * - numeric: arrow_sort_down_lines (asc) / arrow_sort_up_lines (desc) / arrow_sort (neutral)
   * - alphanumeric: text_sort_ascending (asc) / text_sort_descending (desc) / arrow_sort (neutral)
   */
  getSortIcon(
    column: DataGridColumn<T>,
  ):
    | 'arrow_sort'
    | 'text_sort_ascending'
    | 'text_sort_descending'
    | 'arrow_sort_down_lines'
    | 'arrow_sort_up_lines'
    | null {
    if (!column.sortable || !column.field) {
      return null;
    }

    const field = column.field.toString();
    const isSorted = this.sortField() === field;
    const sortType = column.sortType || 'alphanumeric'; // Default to alphanumeric

    if (!isSorted) {
      // Neutral/unsorted state
      return 'arrow_sort';
    }

    // Show direction-specific icon based on sort type
    if (sortType === 'numeric') {
      // Numeric sorting: use arrow_sort_down_lines for asc, arrow_sort_up_lines for desc
      return this.sortDirection() === 'asc' ? 'arrow_sort_down_lines' : 'arrow_sort_up_lines';
    } else {
      // Alphanumeric sorting: use text_sort icons
      return this.sortDirection() === 'asc' ? 'text_sort_ascending' : 'text_sort_descending';
    }
  }

  /**
   * Reset sort state
   */
  reset(): void {
    this.sortField.set(null);
    this.sortDirection.set('asc');
  }

  /**
   * Set sort state
   */
  setSort(field: string, direction: 'asc' | 'desc'): void {
    this.sortField.set(field);
    this.sortDirection.set(direction);
  }
}
