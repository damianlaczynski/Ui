/**
 * DataGrid Styling Helpers
 *
 * Helper functions for CSS class generation
 */

import { DataGridColumn, DataGridRow } from '../models/data-grid-column.model';

/**
 * Get data grid CSS classes
 */
export function getDataGridClasses(
  size: string,
  striped: boolean,
  bordered: boolean,
  hoverable: boolean,
): string {
  const classes = ['data-grid'];
  classes.push(`data-grid--${size}`);

  if (striped) {
    classes.push('data-grid--striped');
  }

  if (bordered) {
    classes.push('data-grid--bordered');
  }

  if (hoverable) {
    classes.push('data-grid--hoverable');
  }

  return classes.join(' ');
}

/**
 * Get header CSS classes
 */
export function getHeaderClasses(stickyHeaders: boolean): string {
  const classes = ['data-grid__header'];

  if (stickyHeaders) {
    classes.push('data-grid__header--sticky');
  }

  return classes.join(' ');
}

/**
 * Get header cell CSS classes
 */
export function getHeaderCellClasses<T>(
  column: DataGridColumn<T> | null,
  isSelection: boolean = false,
  isSorted: boolean = false,
  sortDirection?: 'asc' | 'desc',
): string {
  const classes = ['data-grid__header-cell'];

  if (isSelection) {
    classes.push('data-grid__header-cell--selection');
  }

  if (column?.sortable) {
    classes.push('data-grid__header-cell--sortable');
  }

  if (isSorted && sortDirection) {
    classes.push(`data-grid__header-cell--sorted-${sortDirection}`);
  }

  return classes.join(' ');
}

/**
 * Get row CSS classes
 */
export function getRowClasses<T>(
  row: DataGridRow<T>,
  isSelected: boolean,
  isHovered: boolean,
  isExpanded: boolean,
): string {
  const classes = ['data-grid__row'];

  if (isSelected || row.selected) {
    classes.push('data-grid__row--selected');
  }

  if (row.disabled) {
    classes.push('data-grid__row--disabled');
  }

  if (isHovered) {
    classes.push('data-grid__row--hovered');
  }

  if (isExpanded) {
    classes.push('data-grid__row--expanded');
  }

  return classes.join(' ');
}

/**
 * Get cell CSS classes
 */
export function getCellClasses<T>(
  column: DataGridColumn<T> | null,
  isSelection: boolean = false,
): string {
  const classes = ['data-grid__cell'];

  if (isSelection) {
    classes.push('data-grid__cell--selection');
  }

  return classes.join(' ');
}
