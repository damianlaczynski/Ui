import { Component, computed, signal } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface ApiRow {
  id: string;
  endpoint: string;
  region: string;
  latency: number;
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
  selector: 'app-data-grid-server-side-features-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />

    <div
      style="display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; padding:12px 14px; border:1px dashed var(--color-neutral-stroke-2, #c8c6c4); border-radius:12px; background:var(--color-neutral-background-2, #f7f7f7);"
    >
      <div style="font-weight:600;">Last callback</div>
      <div>{{ info() }}</div>
    </div>
  `,
})
export class DataGridServerSideFeaturesDemoComponent {
  info = signal('Waiting for pagination, sort, or filter changes.');

  private rows: ApiRow[] = [
    { id: '1', endpoint: '/users', region: 'EU', latency: 129 },
    { id: '2', endpoint: '/projects', region: 'US', latency: 212 },
    { id: '3', endpoint: '/billing', region: 'EU', latency: 164 },
    { id: '4', endpoint: '/events', region: 'APAC', latency: 248 },
    { id: '5', endpoint: '/search', region: 'US', latency: 186 },
    { id: '6', endpoint: '/health', region: 'EU', latency: 95 },
  ];

  config = computed(() =>
    createDataGridConfig<ApiRow>({
      columns: [
        DataGridColumnFactory.text('endpoint', 'Endpoint', 'endpoint', { sortable: true }),
        DataGridColumnFactory.select('region', 'Region', 'region', [
          { label: 'EU', value: 'EU' },
          { label: 'US', value: 'US' },
          { label: 'APAC', value: 'APAC' },
        ]),
        DataGridColumnFactory.number('latency', 'Latency', 'latency', { sortable: true }),
      ],
      dataSource: this.createStaticDataSource(this.rows),
      pagination: {
        enabled: true,
        pageSize: 2,
        pageSizeOptions: [2, 4, 6],
        showPageSizeSelector: true,
        showPageNumbers: true,
      },
      sorting: { enabled: true },
      filtering: { enabled: true, debounceMs: 250 },
      styling: {
        striped: true,
        stickyHeaders: true,
      },
      callbacks: {
        onPageChange: page => this.info.set(`Page changed to ${page}.`),
        onSortChange: sort => this.info.set(`Sorted by ${sort.field} (${sort.direction}).`),
      },
    }),
  );

  private createStaticDataSource<T extends { id?: string }>(
    data: T[],
  ): (params: QueryParams<T>) => Observable<QueryResult<T>> {
    return params => {
      let items: T[] = [...data];

      if (params.filters?.length) {
        items = items.filter(item =>
          params.filters!.every(filter => {
            const value = (item as Record<string, unknown>)[filter.columnName as string];
            const filterValue = filter.value;
            switch (filter.filterType) {
              case 'contains':
                return String(value ?? '')
                  .toLowerCase()
                  .includes(String(filterValue ?? '').toLowerCase());
              case 'equals':
                return value === filterValue;
              default:
                return true;
            }
          }),
        );
      }

      if (params.orders?.length) {
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
        items = items.slice(start, start + params.pageSize);
      }

      return of({
        items,
        totalCount,
        hasNextPage: !!(params.page && params.pageSize && params.page * params.pageSize < totalCount),
        hasPreviousPage: !!(params.page && params.page > 1),
      });
    };
  }
}
