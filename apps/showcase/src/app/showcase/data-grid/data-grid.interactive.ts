import { Component, computed, signal, viewChild } from '@angular/core';
import {
  createDataGridConfig,
  DataGridActiveFilter,
  DataGridColumnFactory,
  DataGridComponent,
  DataGridRow,
} from 'ui';
import { Observable, of } from 'rxjs';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';
import { DATA_GRID_SHOWCASE_CONFIG } from './data-grid.showcase.config';

interface SampleData {
  id: string;
  name: string;
  type: string;
  modified: string;
  modifiedBy: string;
  size: string;
  status: string;
}

function compareUnknownValues(aVal: unknown, bVal: unknown): number {
  if (typeof aVal === 'number' && typeof bVal === 'number') {
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  }

  const aText = String(aVal ?? '').toLowerCase();
  const bText = String(bVal ?? '').toLowerCase();
  return aText < bText ? -1 : aText > bText ? 1 : 0;
}

@Component({
  selector: 'app-data-grid-interactive',
  imports: [DataGridComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-data-grid [config]="interactiveConfig()">
          <ng-template #rowDetailsTemplate let-row>
            <div style="display: grid; grid-template-columns: 130px 1fr; gap: 8px;">
              <strong>Modified By:</strong>
              <span>{{ row.data.modifiedBy }}</span>
              <strong>Status:</strong>
              <span>{{ row.data.status }}</span>
              <strong>File Size:</strong>
              <span>{{ row.data.size }}</span>
            </div>
          </ng-template>
        </ui-data-grid>
      </div>
    </app-interactive-showcase>
  `,
})
export class DataGridInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DATA_GRID_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    selection: 'none',
    size: 'medium',
    pageSize: '10',
    striped: false,
    bordered: false,
    hoverable: true,
    stickyHeaders: false,
    pagination: true,
    sorting: true,
    filtering: true,
    expandable: false,
    virtualization: false,
    virtualizationItemHeight: 48,
    virtualizationBufferSize: 3,
  });

  private interactiveData: SampleData[] = [
    {
      id: '1',
      name: 'Roadmap Q1.docx',
      type: 'Word Document',
      modified: '2026-01-15',
      modifiedBy: 'John Doe',
      size: '2.5 MB',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Launch Plan.pptx',
      type: 'PowerPoint',
      modified: '2026-01-14',
      modifiedBy: 'Jane Smith',
      size: '5.8 MB',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Budget.xlsx',
      type: 'Excel',
      modified: '2026-01-13',
      modifiedBy: 'Bob Johnson',
      size: '1.2 MB',
      status: 'Archived',
    },
    {
      id: '4',
      name: 'Meeting Notes.docx',
      type: 'Word Document',
      modified: '2026-01-12',
      modifiedBy: 'Alice Brown',
      size: '860 KB',
      status: 'Draft',
    },
    {
      id: '5',
      name: 'Metrics.pdf',
      type: 'PDF Document',
      modified: '2026-01-11',
      modifiedBy: 'Sarah Wilson',
      size: '3.7 MB',
      status: 'Published',
    },
  ];

  interactiveConfig = computed(() => {
    const pageSize = Number(this.values()['pageSize']) || 10;
    const itemHeight = Number(this.values()['virtualizationItemHeight']) || 48;
    const bufferSize = Number(this.values()['virtualizationBufferSize']) || 3;

    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.select('type', 'Type', 'type', [
        { label: 'Word Document', value: 'Word Document' },
        { label: 'Excel', value: 'Excel' },
        { label: 'PowerPoint', value: 'PowerPoint' },
        { label: 'PDF Document', value: 'PDF Document' },
      ]),
      DataGridColumnFactory.multiSelect('status', 'Status', 'status', [
        { label: 'Active', value: 'Active' },
        { label: 'Archived', value: 'Archived' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
      ]),
      DataGridColumnFactory.date('modified', 'Modified', 'modified', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.interactiveData),
      selection: (this.values()['selection'] as 'none' | 'single' | 'multi') ?? 'none',
      pagination: {
        enabled: !!this.values()['pagination'],
        pageSize,
        pageSizeOptions: [5, 10, 20],
        showPageSizeSelector: true,
        showPageNumbers: true,
        showInfo: true,
      },
      sorting: { enabled: !!this.values()['sorting'] },
      filtering: { enabled: !!this.values()['filtering'], debounceMs: 300 },
      styling: {
        size: (this.values()['size'] as 'small' | 'medium' | 'large') ?? 'medium',
        striped: !!this.values()['striped'],
        bordered: !!this.values()['bordered'],
        hoverable: !!this.values()['hoverable'],
        stickyHeaders: !!this.values()['stickyHeaders'],
      },
      virtualization: {
        enabled: !!this.values()['virtualization'],
        itemHeight,
        bufferSize,
      },
      expandable: !!this.values()['expandable'],
      callbacks: {
        onRowClick: (row: DataGridRow<SampleData>) => {
          this.showcase()?.logEvent('rowClick', { id: row.id, name: row.data.name });
        },
        onSelectionChange: (rows: DataGridRow<SampleData>[]) => {
          this.showcase()?.logEvent('selectionChange', { count: rows.length });
        },
        onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => {
          this.showcase()?.logEvent('sortChange', sort);
        },
        onFilterChange: (filters: DataGridActiveFilter[]) => {
          this.showcase()?.logEvent('filterChange', { count: filters.length });
        },
        onPageChange: (page: number) => {
          this.showcase()?.logEvent('pageChange', { page });
        },
        onRowExpand: (row: DataGridRow<SampleData>) => {
          this.showcase()?.logEvent('rowExpand', { id: row.id, name: row.data.name });
        },
        onRowCollapse: (row: DataGridRow<SampleData>) => {
          this.showcase()?.logEvent('rowCollapse', { id: row.id, name: row.data.name });
        },
      },
    });
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  private createStaticDataSource<T extends { id?: string }>(
    data: T[],
  ): (params: QueryParams<T>) => Observable<QueryResult<T>> {
    return (params: QueryParams<T>) => {
      let items: T[] = [...data];

      if (params.filters && params.filters.length > 0) {
        items = items.filter(item => {
          return params.filters!.every(filter => {
            const value = (item as Record<string, unknown>)[filter.columnName as string];
            const filterValue = filter.value;

            switch (filter.filterType) {
              case 'contains':
                return String(value || '')
                  .toLowerCase()
                  .includes(String(filterValue || '').toLowerCase());
              case 'equals':
                return value === filterValue;
              case 'startsWith':
                return String(value || '')
                  .toLowerCase()
                  .startsWith(String(filterValue || '').toLowerCase());
              case 'endsWith':
                return String(value || '')
                  .toLowerCase()
                  .endsWith(String(filterValue || '').toLowerCase());
              default:
                return true;
            }
          });
        });
      }

      if (params.orders && params.orders.length > 0) {
        const order = params.orders[0];
        items.sort((a, b) => {
          const aVal = (a as Record<string, unknown>)[order.columnName as string];
          const bVal = (b as Record<string, unknown>)[order.columnName as string];
          const comparison = compareUnknownValues(aVal, bVal);
          return order.order === 'asc' ? comparison : -comparison;
        });
      }

      const totalCount = items.length;

      if (params.page && params.pageSize) {
        const start = (params.page - 1) * params.pageSize;
        const end = start + params.pageSize;
        items = items.slice(start, end);
      }

      const hasNextPage =
        params.page && params.pageSize ? params.page * params.pageSize < totalCount : false;
      const hasPreviousPage = params.page ? params.page > 1 : false;

      return of({
        items,
        totalCount,
        hasNextPage,
        hasPreviousPage,
      });
    };
  }
}
