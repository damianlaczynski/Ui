import { Component, computed } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface ReleaseRow {
  id: string;
  feature: string;
  owner: string;
  status: string;
  summary: string;
}

@Component({
  selector: 'app-data-grid-expandable-rows-demo',
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
            <strong>Summary</strong>
            <span>{{ row.data.summary }}</span>
          </div>
        </div>
      </ng-template>
    </ui-data-grid>
  `
})
export class DataGridExpandableRowsDemoComponent {
  private rows: ReleaseRow[] = [
    {
      id: '1',
      feature: 'Approvals workflow',
      owner: 'Marta Lee',
      status: 'Ready for QA',
      summary: 'Adds staged approvals and audit history for finance requests.'
    },
    {
      id: '2',
      feature: 'Bulk invite',
      owner: 'Nolan Price',
      status: 'In progress',
      summary: 'Lets admins upload CSV files to invite and map new members.'
    },
    {
      id: '3',
      feature: 'Retention dashboard',
      owner: 'Iris Cole',
      status: 'Planned',
      summary: 'Introduces weekly churn snapshots and cohort trend cards.'
    }
  ];

  config = computed(() =>
    createDataGridConfig<ReleaseRow>({
      columns: [
        DataGridColumnFactory.text('feature', 'Feature', 'feature'),
        DataGridColumnFactory.text('owner', 'Owner', 'owner'),
        DataGridColumnFactory.text('status', 'Status', 'status')
      ],
      dataSource: this.createStaticDataSource(this.rows),
      expandable: true,
      styling: {
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
