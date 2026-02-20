import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  createDataGridConfig,
  DataGridActiveFilter,
  DataGridColumnFactory,
  DataGridComponent,
  DataGridRow,
  TableOfContentComponent,
} from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { DATA_GRID_DRAWER_CONFIGS } from './data-grid.showcase.config';
import { DataGridInteractiveComponent } from './data-grid.interactive';

interface SampleData {
  id: string;
  name: string;
  type: string;
  modified: string;
  modifiedBy: string;
  size: string;
  status: string;
}

interface DataGridSectionOptions {
  selection: 'none' | 'single' | 'multi';
  size: 'small' | 'medium' | 'large';
  pageSize: number;
  striped: boolean;
  bordered: boolean;
  hoverable: boolean;
  stickyHeaders: boolean;
  pagination: boolean;
  sorting: boolean;
  filtering: boolean;
  expandable: boolean;
  virtualization: boolean;
}

function compareUnknownValues(aVal: unknown, bVal: unknown): number {
  if (typeof aVal === 'number' && typeof bVal === 'number') {
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  }

  const aText = String(aVal ?? '').toLowerCase();
  const bText = String(bVal ?? '').toLowerCase();
  return aText < bText ? -1 : aText > bText ? 1 : 0;
}

const DEFAULT_SECTION_FORM_VALUES: Record<string, unknown> = {
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
};

@Component({
  selector: 'app-data-grid-showcase',
  imports: [
    CommonModule,
    DataGridComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    DataGridInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />

      <div class="showcase-content">
        <app-showcase-header title="Data Grid" />
        <p class="showcase__description">
          Data Grid supports DataSource-driven loading, column factories, selection, filtering,
          sorting, pagination, expandable rows, and virtualization. The examples below show focused
          configurations, and each section includes a drawer with options to tweak behavior.
        </p>

        <app-section-with-drawer
          sectionTitle="Basic Preset"
          sectionDescription="Minimal setup using a static data source and text columns. Use the drawer to adjust table density and visual styling."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="basicFormValues()"
          (formValuesChange)="basicFormValues.set($event)"
        >
          <ui-data-grid [config]="basicConfig()" />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Column Factory"
          sectionDescription="Columns generated with DataGridColumnFactory (text, number, date, and select) to reduce setup boilerplate."
          [formConfig]="columnFactoryDrawerFormConfig"
          [formValues]="columnFactoryFormValues()"
          (formValuesChange)="columnFactoryFormValues.set($event)"
        >
          <ui-data-grid [config]="columnFactoryConfig()" />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection"
          sectionDescription="Selection mode can be none, single, or multi. The selected rows counter updates through Data Grid callbacks."
          [formConfig]="selectableDrawerFormConfig"
          [formValues]="selectableFormValues()"
          (formValuesChange)="selectableFormValues.set($event)"
        >
          <ui-data-grid [config]="selectableConfig()" />
          @if (selectedCount() > 0) {
            <p class="showcase__info">Selected rows: {{ selectedCount() }}</p>
          }
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Server-side Features"
          sectionDescription="Simulates server-side pagination, sorting, and filtering through query params and callback events."
          [formConfig]="serverSideDrawerFormConfig"
          [formValues]="serverSideFormValues()"
          (formValuesChange)="serverSideFormValues.set($event)"
        >
          <ui-data-grid [config]="serverSideConfig()" />
          @if (serverSideInfo()) {
            <p class="showcase__info">{{ serverSideInfo() }}</p>
          }
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Virtualization"
          sectionDescription="Renders a large dataset efficiently by drawing only visible rows with a configurable virtual viewport."
          [formConfig]="virtualizedDrawerFormConfig"
          [formValues]="virtualizedFormValues()"
          (formValuesChange)="virtualizedFormValues.set($event)"
        >
          <div class="showcase__example showcase__example--virtualized">
            <ui-data-grid [config]="virtualizedConfig()" />
          </div>
          <p class="showcase__info">
            Virtualization dataset size: {{ virtualizedData.length }} rows.
          </p>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Filtering"
          sectionDescription="Combines text, single-select, multi-select, and date filters. Active filters are displayed below the grid."
          [formConfig]="filteringDrawerFormConfig"
          [formValues]="filteringFormValues()"
          (formValuesChange)="filteringFormValues.set($event)"
        >
          <ui-data-grid [config]="filteringConfig()" />
          @if (activeFilters().length > 0) {
            <p class="showcase__info">Active filters: {{ activeFilters().length }}</p>
            <div class="showcase__example">
              @for (filter of activeFilters(); track filter.columnId) {
                <span
                  style="display: inline-block; margin-right: 8px; margin-top: 4px; padding: 4px 8px; background: #e1e1e1; border-radius: 4px; font-size: 0.875rem;"
                >
                  {{ filter.displayText }}
                </span>
              }
            </div>
          }
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Expandable Rows"
          sectionDescription="Master-details mode with row expansion templates for additional metadata."
          [formConfig]="expandableDrawerFormConfig"
          [formValues]="expandableFormValues()"
          (formValuesChange)="expandableFormValues.set($event)"
        >
          <ui-data-grid [config]="expandableConfig()">
            <ng-template #rowDetailsTemplate let-row>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                  <strong>Modified By:</strong>
                  <span>{{ row.data.modifiedBy }}</span>
                </div>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                  <strong>Status:</strong>
                  <span>{{ row.data.status }}</span>
                </div>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                  <strong>File Size:</strong>
                  <span>{{ row.data.size }}</span>
                </div>
              </div>
            </ng-template>
          </ui-data-grid>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Full Featured"
          sectionDescription="Combines selection, pagination, sorting, filtering, styling, and expandable rows in a single preset configuration."
          [formConfig]="fullFeaturedDrawerFormConfig"
          [formValues]="fullFeaturedFormValues()"
          (formValuesChange)="fullFeaturedFormValues.set($event)"
        >
          <ui-data-grid [config]="fullFeaturedConfig()">
            <ng-template #rowDetailsTemplate let-row>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                  <strong>Modified By:</strong>
                  <span>{{ row.data.modifiedBy }}</span>
                </div>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px;">
                  <strong>Status:</strong>
                  <span>{{ row.data.status }}</span>
                </div>
              </div>
            </ng-template>
          </ui-data-grid>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Advanced Configuration"
          sectionDescription="Adds default sort, loading/empty states, and callback hooks for click, sort, filter, and selection tracking."
          [formConfig]="advancedDrawerFormConfig"
          [formValues]="advancedFormValues()"
          (formValuesChange)="advancedFormValues.set($event)"
        >
          <ui-data-grid [config]="advancedConfig()" />
          @if (advancedInfo()) {
            <p class="showcase__info">{{ advancedInfo() }}</p>
          }
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Adjust Data Grid options in one place and inspect emitted events (selection, sorting,
            filtering, pagination, row actions) in real time.
          </p>
          <app-data-grid-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DataGridShowcaseComponent {
  basicDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.basic;
  columnFactoryDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.columnFactory;
  selectableDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.selectable;
  serverSideDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.serverSide;
  virtualizedDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.virtualized;
  filteringDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.filtering;
  expandableDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.expandable;
  fullFeaturedDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.fullFeatured;
  advancedDrawerFormConfig = DATA_GRID_DRAWER_CONFIGS.advanced;

  selectedCount = signal(0);
  activeFilters = signal<DataGridActiveFilter[]>([]);
  currentSort = signal<{ field: string; direction: 'asc' | 'desc' } | null>(null);
  serverSideInfo = signal<string>('');
  advancedInfo = signal<string>('');

  basicFormValues = signal<Record<string, unknown>>({ ...DEFAULT_SECTION_FORM_VALUES });
  columnFactoryFormValues = signal<Record<string, unknown>>({ ...DEFAULT_SECTION_FORM_VALUES });
  selectableFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    selection: 'multi',
    striped: true,
  });
  serverSideFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    selection: 'multi',
    striped: true,
    stickyHeaders: true,
    pageSize: '2',
  });
  virtualizedFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    virtualization: true,
    sorting: false,
    filtering: false,
    pagination: false,
  });
  filteringFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    striped: true,
  });
  expandableFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    expandable: true,
  });
  fullFeaturedFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    selection: 'multi',
    striped: true,
    bordered: true,
    stickyHeaders: true,
    filtering: true,
    sorting: true,
    pagination: true,
    expandable: true,
  });
  advancedFormValues = signal<Record<string, unknown>>({
    ...DEFAULT_SECTION_FORM_VALUES,
    selection: 'multi',
    striped: true,
    bordered: true,
    stickyHeaders: true,
    filtering: true,
    sorting: true,
    pagination: true,
    pageSize: '5',
  });

  private basicOptions = computed(() => this.toSectionOptions(this.basicFormValues()));
  private columnFactoryOptions = computed(() =>
    this.toSectionOptions(this.columnFactoryFormValues()),
  );
  private selectableOptions = computed(() => this.toSectionOptions(this.selectableFormValues()));
  private serverSideOptions = computed(() => this.toSectionOptions(this.serverSideFormValues()));
  private virtualizedOptions = computed(() => this.toSectionOptions(this.virtualizedFormValues()));
  private filteringOptions = computed(() => this.toSectionOptions(this.filteringFormValues()));
  private expandableOptions = computed(() => this.toSectionOptions(this.expandableFormValues()));
  private fullFeaturedOptions = computed(() =>
    this.toSectionOptions(this.fullFeaturedFormValues()),
  );
  private advancedOptions = computed(() => this.toSectionOptions(this.advancedFormValues()));

  basicData: SampleData[] = [
    {
      id: '1',
      name: 'Document.docx',
      type: 'Word Document',
      modified: '2024-01-15',
      modifiedBy: 'John Doe',
      size: '2.5 MB',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Presentation.pptx',
      type: 'PowerPoint',
      modified: '2024-01-14',
      modifiedBy: 'Jane Smith',
      size: '5.8 MB',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Spreadsheet.xlsx',
      type: 'Excel',
      modified: '2024-01-13',
      modifiedBy: 'Bob Johnson',
      size: '1.2 MB',
      status: 'Archived',
    },
    {
      id: '4',
      name: 'Report.pdf',
      type: 'PDF Document',
      modified: '2024-01-12',
      modifiedBy: 'Alice Brown',
      size: '3.7 MB',
      status: 'Active',
    },
  ];

  filterableData: SampleData[] = [
    ...this.basicData,
    {
      id: '5',
      name: 'Analytics Dashboard.xlsx',
      type: 'Excel',
      modified: '2024-01-11',
      modifiedBy: 'Sarah Wilson',
      size: '4.2 MB',
      status: 'Draft',
    },
    {
      id: '6',
      name: 'Meeting Notes.docx',
      type: 'Word Document',
      modified: '2024-01-10',
      modifiedBy: 'Mike Davis',
      size: '856 KB',
      status: 'Published',
    },
  ];

  virtualizedData: SampleData[] = (() => {
    const data: SampleData[] = [];
    const baseData = this.basicData;
    for (let i = 0; i < 1000; i++) {
      const base = baseData[i % baseData.length];
      data.push({
        ...base,
        id: `virtual-${i + 1}`,
        name: `File_${i + 1}.${base.name.split('.').pop()}`,
      });
    }
    return data;
  })();

  basicConfig = computed(() => {
    const options = this.basicOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      styling: this.toStyling(options),
    });
  });

  columnFactoryConfig = computed(() => {
    const options = this.columnFactoryOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { width: '200px' }),
      DataGridColumnFactory.number('size', 'Size', 'size', { width: '120px' }),
      DataGridColumnFactory.date('modified', 'Modified', 'modified', { width: '180px' }),
      DataGridColumnFactory.select(
        'status',
        'Status',
        'status',
        [
          { label: 'Active', value: 'Active' },
          { label: 'Archived', value: 'Archived' },
          { label: 'Draft', value: 'Draft' },
        ],
        { width: '120px' },
      ),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      styling: this.toStyling(options),
    });
  });

  selectableConfig = computed(() => {
    const options = this.selectableOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: options.selection,
      styling: this.toStyling(options),
      callbacks: {
        onSelectionChange: (rows: DataGridRow<SampleData>[]) => {
          this.selectedCount.set(rows.length);
        },
      },
    });
  });

  serverSideConfig = computed(() => {
    const options = this.serverSideOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: options.selection,
      pagination: {
        enabled: options.pagination,
        pageSize: options.pageSize,
        pageSizeOptions: [2, 5, 10],
        showPageSizeSelector: true,
        showPageNumbers: true,
      },
      sorting: { enabled: options.sorting },
      filtering: { enabled: options.filtering, debounceMs: 300 },
      styling: this.toStyling(options),
      callbacks: {
        onPageChange: (page: number) => {
          this.serverSideInfo.set(`Page changed to: ${page}`);
        },
        onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => {
          this.serverSideInfo.set(`Sorted by: ${sort.field} (${sort.direction})`);
        },
      },
    });
  });

  virtualizedConfig = computed(() => {
    const options = this.virtualizedOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
      DataGridColumnFactory.text('size', 'Size', 'size', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.virtualizedData),
      sorting: { enabled: options.sorting },
      styling: this.toStyling(options),
      virtualization: {
        enabled: options.virtualization,
        itemHeight: 48,
        bufferSize: 3,
      },
    });
  });

  filteringConfig = computed(() => {
    const options = this.filteringOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
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
      DataGridColumnFactory.date('modified', 'Modified', 'modified'),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.filterableData),
      filtering: { enabled: options.filtering, debounceMs: 300 },
      styling: this.toStyling(options),
      callbacks: {
        onFilterChange: (filters: DataGridActiveFilter[]) => {
          this.activeFilters.set(filters);
        },
      },
    });
  });

  expandableConfig = computed(() => {
    const options = this.expandableOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name'),
      DataGridColumnFactory.text('type', 'Type', 'type'),
      DataGridColumnFactory.text('modified', 'Modified', 'modified'),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      styling: this.toStyling(options),
      expandable: options.expandable,
    });
  });

  fullFeaturedConfig = computed(() => {
    const options = this.fullFeaturedOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.text('modified', 'Modified', 'modified', { sortable: true }),
      DataGridColumnFactory.text('size', 'Size', 'size', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: options.selection,
      pagination: {
        enabled: options.pagination,
        pageSize: options.pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        showPageSizeSelector: true,
        showPageNumbers: true,
      },
      sorting: { enabled: options.sorting },
      filtering: { enabled: options.filtering, debounceMs: 300 },
      styling: this.toStyling(options),
      expandable: options.expandable,
    });
  });

  advancedConfig = computed(() => {
    const options = this.advancedOptions();
    const columns = [
      DataGridColumnFactory.text('name', 'Name', 'name', { sortable: true }),
      DataGridColumnFactory.text('type', 'Type', 'type', { sortable: true }),
      DataGridColumnFactory.number('size', 'Size', 'size', { sortable: true }),
      DataGridColumnFactory.date('modified', 'Modified', 'modified', { sortable: true }),
    ];

    return createDataGridConfig<SampleData>({
      columns,
      dataSource: this.createStaticDataSource(this.basicData),
      selection: options.selection,
      pagination: {
        enabled: options.pagination,
        pageSize: options.pageSize,
        pageSizeOptions: [5, 10, 20],
        showPageSizeSelector: true,
        showPageNumbers: true,
        showInfo: true,
      },
      sorting: {
        enabled: options.sorting,
        defaultSort: { field: 'modified', direction: 'desc' },
      },
      filtering: { enabled: options.filtering, debounceMs: 300 },
      styling: this.toStyling(options),
      loading: {
        title: 'Loading data...',
        description: 'Please wait',
      },
      empty: {
        title: 'No files found',
        description: 'Upload your first file to get started.',
        icon: 'folder_open',
      },
      callbacks: {
        onRowClick: (row: DataGridRow<SampleData>) => {
          this.advancedInfo.set(`Clicked: ${row.data.name}`);
        },
        onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => {
          this.currentSort.set(sort);
          this.advancedInfo.set(`Sorted by: ${sort.field} (${sort.direction})`);
        },
        onFilterChange: (filters: DataGridActiveFilter[]) => {
          this.activeFilters.set(filters);
        },
        onSelectionChange: (rows: DataGridRow<SampleData>[]) => {
          this.selectedCount.set(rows.length);
        },
      },
    });
  });

  private toSectionOptions(values: Record<string, unknown>): DataGridSectionOptions {
    return {
      selection: (values['selection'] as 'none' | 'single' | 'multi') ?? 'none',
      size: (values['size'] as 'small' | 'medium' | 'large') ?? 'medium',
      pageSize: Number(values['pageSize']) || 10,
      striped: !!values['striped'],
      bordered: !!values['bordered'],
      hoverable: !!values['hoverable'],
      stickyHeaders: !!values['stickyHeaders'],
      pagination: !!values['pagination'],
      sorting: !!values['sorting'],
      filtering: !!values['filtering'],
      expandable: !!values['expandable'],
      virtualization: !!values['virtualization'],
    };
  }

  private toStyling(options: DataGridSectionOptions) {
    return {
      size: options.size,
      striped: options.striped,
      bordered: options.bordered,
      hoverable: options.hoverable,
      stickyHeaders: options.stickyHeaders,
    };
  }

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
