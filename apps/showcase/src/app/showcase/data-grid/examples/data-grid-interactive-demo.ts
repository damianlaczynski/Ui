import { Component, computed, signal, viewChild } from '@angular/core';
import {
  createDataGridConfig,
  DataGridActiveFilter,
  DataGridColumnFactory,
  DataGridComponent,
  DataGridRow,
} from 'ui';
import { Observable, of } from 'rxjs';
import {
  InteractiveShowcaseComponent,
  type ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface FileRow {
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
  selector: 'app-data-grid-interactive-demo',
  imports: [DataGridComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="values.set($event)"
    >
      <div preview>
        <ui-data-grid [config]="config()">
          <ng-template #rowDetailsTemplate let-row>
            <div style="display:grid; grid-template-columns:130px 1fr; gap:8px;">
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
export class DataGridInteractiveDemoComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-data-grid',
    controlGroups: [
      { id: 'appearance', label: 'Appearance', icon: 'paint_brush', expanded: true },
      { id: 'layout', label: 'Layout', icon: 'panel_left' },
      { id: 'behavior', label: 'Behavior', icon: 'settings' },
      { id: 'performance', label: 'Performance', icon: 'flash' },
    ],
    controls: [
      {
        key: 'selection',
        label: 'Selection',
        type: 'dropdown',
        defaultValue: 'none',
        options: [
          { label: 'none', value: 'none' },
          { label: 'single', value: 'single' },
          { label: 'multi', value: 'multi' },
        ],
        group: 'behavior',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        defaultValue: 'medium',
        options: [
          { label: 'small', value: 'small' },
          { label: 'medium', value: 'medium' },
          { label: 'large', value: 'large' },
        ],
        group: 'layout',
      },
      {
        key: 'pageSize',
        label: 'Page size',
        type: 'dropdown',
        defaultValue: '10',
        options: [
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '20', value: '20' },
        ],
        group: 'layout',
      },
      {
        key: 'striped',
        label: 'Striped rows',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      {
        key: 'bordered',
        label: 'Bordered',
        type: 'switch',
        defaultValue: false,
        group: 'appearance',
      },
      {
        key: 'hoverable',
        label: 'Hoverable',
        type: 'switch',
        defaultValue: true,
        group: 'appearance',
      },
      {
        key: 'stickyHeaders',
        label: 'Sticky headers',
        type: 'switch',
        defaultValue: false,
        group: 'layout',
      },
      {
        key: 'pagination',
        label: 'Pagination',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
      { key: 'sorting', label: 'Sorting', type: 'switch', defaultValue: true, group: 'behavior' },
      {
        key: 'filtering',
        label: 'Filtering',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'expandable',
        label: 'Expandable rows',
        type: 'switch',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'virtualization',
        label: 'Virtualization',
        type: 'switch',
        defaultValue: false,
        group: 'performance',
      },
      {
        key: 'virtualizationItemHeight',
        label: 'Row height',
        type: 'number',
        defaultValue: 48,
        min: 32,
        max: 80,
        step: 4,
        group: 'performance',
      },
      {
        key: 'virtualizationBufferSize',
        label: 'Buffer size',
        type: 'number',
        defaultValue: 3,
        min: 1,
        max: 10,
        step: 1,
        group: 'performance',
      },
    ],
  };

  values = signal<Record<string, unknown>>({
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

  private rows: FileRow[] = [
    {
      id: '1',
      name: 'Roadmap Q2.docx',
      type: 'Word Document',
      modified: '2026-04-12',
      modifiedBy: 'Ava Patel',
      size: '2.5 MB',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Launch Plan.pptx',
      type: 'PowerPoint',
      modified: '2026-04-10',
      modifiedBy: 'Noah Kim',
      size: '5.8 MB',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Budget.xlsx',
      type: 'Excel',
      modified: '2026-04-08',
      modifiedBy: 'Mia Chen',
      size: '1.2 MB',
      status: 'Archived',
    },
    {
      id: '4',
      name: 'Notes.docx',
      type: 'Word Document',
      modified: '2026-04-06',
      modifiedBy: 'Luca Rossi',
      size: '860 KB',
      status: 'Draft',
    },
    {
      id: '5',
      name: 'Metrics.pdf',
      type: 'PDF Document',
      modified: '2026-04-04',
      modifiedBy: 'Iris Cole',
      size: '3.7 MB',
      status: 'Published',
    },
  ];

  config = computed(() => {
    const pageSize = Number(this.values()['pageSize']) || 10;
    const itemHeight = Number(this.values()['virtualizationItemHeight']) || 48;
    const bufferSize = Number(this.values()['virtualizationBufferSize']) || 3;

    return createDataGridConfig<FileRow>({
      columns: [
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
      ],
      dataSource: this.createStaticDataSource(this.rows),
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
        onRowClick: (row: DataGridRow<FileRow>) =>
          this.showcase()?.logEvent('rowClick', { id: row.id, name: row.data.name }),
        onSelectionChange: (rows: DataGridRow<FileRow>[]) =>
          this.showcase()?.logEvent('selectionChange', { count: rows.length }),
        onSortChange: sort => this.showcase()?.logEvent('sortChange', sort),
        onFilterChange: (filters: DataGridActiveFilter[]) =>
          this.showcase()?.logEvent('filterChange', { count: filters.length }),
        onPageChange: page => this.showcase()?.logEvent('pageChange', { page }),
        onRowExpand: (row: DataGridRow<FileRow>) =>
          this.showcase()?.logEvent('rowExpand', { id: row.id, name: row.data.name }),
        onRowCollapse: (row: DataGridRow<FileRow>) =>
          this.showcase()?.logEvent('rowCollapse', { id: row.id, name: row.data.name }),
      },
    });
  });

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
              case 'startsWith':
                return String(value ?? '')
                  .toLowerCase()
                  .startsWith(String(filterValue ?? '').toLowerCase());
              case 'endsWith':
                return String(value ?? '')
                  .toLowerCase()
                  .endsWith(String(filterValue ?? '').toLowerCase());
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
        hasNextPage: !!(
          params.page &&
          params.pageSize &&
          params.page * params.pageSize < totalCount
        ),
        hasPreviousPage: !!(params.page && params.page > 1),
      });
    };
  }
}
