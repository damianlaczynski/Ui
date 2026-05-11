import { Component, computed, signal } from '@angular/core';
import {
  createDataGridConfig,
  DataGridActiveFilter,
  DataGridColumnFactory,
  DataGridComponent,
} from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface FileRow {
  id: string;
  name: string;
  type: string;
  status: string;
  modified: string;
}

@Component({
  selector: 'app-data-grid-filtering-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />

    @if (activeFilters().length > 0) {
      <div
        style="display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; padding:12px 14px; border:1px dashed var(--color-neutral-stroke-2, #c8c6c4); border-radius:12px; background:var(--color-neutral-background-2, #f7f7f7);"
      >
        @for (filter of activeFilters(); track filter.columnId) {
          <span
            style="display:inline-flex; align-items:center; padding:4px 8px; border-radius:999px; background:var(--color-brand-background-2, #ebf3fc); color:var(--color-brand-foreground-1, #0f6cbd);"
          >
            {{ filter.displayText }}
          </span>
        }
      </div>
    }
  `,
})
export class DataGridFilteringDemoComponent {
  activeFilters = signal<DataGridActiveFilter[]>([]);

  private rows: FileRow[] = [
    {
      id: '1',
      name: 'Roadmap.docx',
      type: 'Word Document',
      status: 'Active',
      modified: '2026-04-12',
    },
    { id: '2', name: 'Budget.xlsx', type: 'Excel', status: 'Draft', modified: '2026-04-10' },
    { id: '3', name: 'Deck.pptx', type: 'PowerPoint', status: 'Published', modified: '2026-04-08' },
    {
      id: '4',
      name: 'Notes.pdf',
      type: 'PDF Document',
      status: 'Archived',
      modified: '2026-04-04',
    },
    { id: '5', name: 'Metrics.xlsx', type: 'Excel', status: 'Active', modified: '2026-04-01' },
  ];

  config = computed(() =>
    createDataGridConfig<FileRow>({
      columns: [
        DataGridColumnFactory.text('name', 'Name', 'name'),
        DataGridColumnFactory.select('type', 'Type', 'type', [
          { label: 'Word Document', value: 'Word Document' },
          { label: 'Excel', value: 'Excel' },
          { label: 'PowerPoint', value: 'PowerPoint' },
          { label: 'PDF Document', value: 'PDF Document' },
        ]),
        DataGridColumnFactory.multiSelect('status', 'Status', 'status', [
          { label: 'Active', value: 'Active' },
          { label: 'Draft', value: 'Draft' },
          { label: 'Published', value: 'Published' },
          { label: 'Archived', value: 'Archived' },
        ]),
        DataGridColumnFactory.date('modified', 'Modified', 'modified'),
      ],
      dataSource: this.createStaticDataSource(this.rows),
      filtering: { enabled: true, debounceMs: 300 },
      styling: {
        striped: true,
      },
      callbacks: {
        onFilterChange: filters => this.activeFilters.set(filters),
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
