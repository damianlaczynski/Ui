import { Component, computed, signal } from '@angular/core';
import { createDataGridConfig, DataGridActiveFilter, DataGridColumnFactory, DataGridComponent, DataGridRow } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface FileRow {
  id: string;
  name: string;
  type: string;
  size: number;
  modified: string;
}

@Component({
  selector: 'app-data-grid-advanced-configuration-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />

    <div
      style="display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; padding:12px 14px; border:1px dashed var(--color-neutral-stroke-2, #c8c6c4); border-radius:12px; background:var(--color-neutral-background-2, #f7f7f7);"
    >
      <div style="font-weight:600;">Event feedback</div>
      <div>{{ info() }}</div>
    </div>
  `,
})
export class DataGridAdvancedConfigurationDemoComponent {
  info = signal('Click rows, sort columns, or filter the grid.');

  private rows: FileRow[] = [
    { id: '1', name: 'Roadmap.docx', type: 'Word Document', size: 25, modified: '2026-04-12' },
    { id: '2', name: 'Metrics.xlsx', type: 'Excel', size: 14, modified: '2026-04-10' },
    { id: '3', name: 'Launch deck.pptx', type: 'PowerPoint', size: 58, modified: '2026-04-08' },
    { id: '4', name: 'Brief.pdf', type: 'PDF Document', size: 11, modified: '2026-04-06' },
  ];

  config = computed(() =>
    createDataGridConfig<FileRow>({
      columns: [
        DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
        DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
        DataGridColumnFactory.number('size', 'Size (MB)', 'size', { sortable: true }),
        DataGridColumnFactory.date('modified', 'Modified', 'modified', { sortable: true }),
      ],
      dataSource: this.createStaticDataSource(this.rows),
      selection: 'multi',
      pagination: {
        enabled: true,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        showPageNumbers: true,
        showPageSizeSelector: true,
        showInfo: true,
      },
      sorting: {
        enabled: true,
        defaultSort: { field: 'modified', direction: 'desc' },
      },
      filtering: { enabled: true, debounceMs: 250 },
      styling: {
        striped: true,
        bordered: true,
        stickyHeaders: true,
      },
      loading: {
        title: 'Loading documents...',
        description: 'Please wait',
      },
      empty: {
        title: 'No documents found',
        description: 'Try another filter set or upload new files.',
        icon: 'folder_open',
      },
      callbacks: {
        onRowClick: (row: DataGridRow<FileRow>) => this.info.set(`Clicked ${row.data.name}.`),
        onSortChange: sort => this.info.set(`Sorted by ${sort.field} (${sort.direction}).`),
        onFilterChange: (filters: DataGridActiveFilter[]) => this.info.set(`Active filters: ${filters.length}.`),
        onSelectionChange: rows => this.info.set(`Selected rows: ${rows.length}.`),
      },
    }),
  );

  private createStaticDataSource<T extends { id?: string }>(
    data: T[],
  ): (params: QueryParams<T>) => Observable<QueryResult<T>> {
    return () =>
      of({
        items: [...data],
        totalCount: data.length,
        hasNextPage: false,
        hasPreviousPage: false,
      });
  }
}
