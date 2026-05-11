import { Component, computed } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface AssetRow {
  id: string;
  name: string;
  owner: string;
  modified: string;
  status: string;
  views: number;
}

@Component({
  selector: 'app-data-grid-column-factory-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />
  `
})
export class DataGridColumnFactoryDemoComponent {
  private rows: AssetRow[] = [
    {
      id: '1',
      name: 'Homepage hero',
      owner: 'Ava Patel',
      modified: '2026-04-14',
      status: 'Approved',
      views: 182
    },
    {
      id: '2',
      name: 'Pricing table',
      owner: 'Noah Kim',
      modified: '2026-04-12',
      status: 'Review',
      views: 73
    },
    {
      id: '3',
      name: 'Retention report',
      owner: 'Mila Brooks',
      modified: '2026-04-09',
      status: 'Draft',
      views: 29
    }
  ];

  config = computed(() =>
    createDataGridConfig<AssetRow>({
      columns: [
        DataGridColumnFactory.text('name', 'Name', 'name', { width: '220px' }),
        DataGridColumnFactory.text('owner', 'Owner', 'owner', { width: '180px' }),
        DataGridColumnFactory.number('views', 'Views', 'views', { width: '100px' }),
        DataGridColumnFactory.date('modified', 'Modified', 'modified', {
          width: '160px'
        }),
        DataGridColumnFactory.select(
          'status',
          'Status',
          'status',
          [
            { label: 'Approved', value: 'Approved' },
            { label: 'Review', value: 'Review' },
            { label: 'Draft', value: 'Draft' }
          ],
          { width: '140px' }
        )
      ],
      dataSource: this.createStaticDataSource(this.rows),
      styling: {
        size: 'medium',
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
