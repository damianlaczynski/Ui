import { Component, computed } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface WorkspaceRow {
  id: string;
  title: string;
  area: string;
  owner: string;
  status: string;
  modified: string;
}

@Component({
  selector: 'app-data-grid-full-featured-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()">
      <ng-template #rowDetailsTemplate let-row>
        <div style="display:grid; gap:10px;">
          <div style="display:grid; grid-template-columns:120px 1fr; gap:8px;">
            <strong>Owner</strong>
            <span>{{ row.data.owner }}</span>
          </div>
          <div style="display:grid; grid-template-columns:120px 1fr; gap:8px;">
            <strong>Status</strong>
            <span>{{ row.data.status }}</span>
          </div>
          <div style="display:grid; grid-template-columns:120px 1fr; gap:8px;">
            <strong>Area</strong>
            <span>{{ row.data.area }}</span>
          </div>
        </div>
      </ng-template>
    </ui-data-grid>
  `
})
export class DataGridFullFeaturedDemoComponent {
  private rows: WorkspaceRow[] = [
    {
      id: '1',
      title: 'Billing migration',
      area: 'Finance',
      owner: 'Ava Patel',
      status: 'Active',
      modified: '2026-04-12'
    },
    {
      id: '2',
      title: 'Access review',
      area: 'Security',
      owner: 'Owen Baker',
      status: 'Draft',
      modified: '2026-04-10'
    },
    {
      id: '3',
      title: 'Retention survey',
      area: 'Research',
      owner: 'Mia Chen',
      status: 'Published',
      modified: '2026-04-08'
    },
    {
      id: '4',
      title: 'Support macros',
      area: 'Operations',
      owner: 'Noah Kim',
      status: 'Active',
      modified: '2026-04-05'
    }
  ];

  config = computed(() =>
    createDataGridConfig<WorkspaceRow>({
      columns: [
        DataGridColumnFactory.text('title', 'Title', 'title', { sortable: true }),
        DataGridColumnFactory.text('area', 'Area', 'area', { sortable: true }),
        DataGridColumnFactory.text('owner', 'Owner', 'owner'),
        DataGridColumnFactory.text('modified', 'Modified', 'modified', {
          sortable: true
        })
      ],
      dataSource: this.createStaticDataSource(this.rows),
      selection: 'multi',
      pagination: {
        enabled: true,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        showPageNumbers: true,
        showPageSizeSelector: true
      },
      sorting: { enabled: true },
      filtering: { enabled: true, debounceMs: 250 },
      expandable: true,
      styling: {
        striped: true,
        bordered: true,
        stickyHeaders: true,
        hoverable: true
      }
    })
  );

  private createStaticDataSource<T extends { id?: string }>(
    data: T[]
  ): (params: QueryParams<T>) => Observable<QueryResult<T>> {
    return () =>
      of({
        items: [...data],
        totalCount: data.length,
        hasNextPage: false,
        hasPreviousPage: false
      });
  }
}
