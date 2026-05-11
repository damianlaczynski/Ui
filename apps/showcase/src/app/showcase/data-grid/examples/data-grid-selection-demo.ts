import { Component, computed, signal } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent, DataGridRow } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface QueueRow {
  id: string;
  ticket: string;
  priority: string;
  owner: string;
}

@Component({
  selector: 'app-data-grid-selection-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />

    <div
      style="display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; padding:12px 14px; border:1px dashed var(--color-neutral-stroke-2, #c8c6c4); border-radius:12px; background:var(--color-neutral-background-2, #f7f7f7);"
    >
      <div style="font-weight:600;">Selected rows</div>
      <div>{{ selectedCount() }}</div>
    </div>
  `
})
export class DataGridSelectionDemoComponent {
  selectedCount = signal(0);

  private rows: QueueRow[] = [
    { id: '1', ticket: 'INC-2411', priority: 'High', owner: 'Mia Chen' },
    { id: '2', ticket: 'INC-2412', priority: 'Medium', owner: 'Luca Rossi' },
    { id: '3', ticket: 'INC-2413', priority: 'Low', owner: 'Sofia Reed' },
    { id: '4', ticket: 'INC-2414', priority: 'High', owner: 'Ethan Hall' }
  ];

  config = computed(() =>
    createDataGridConfig<QueueRow>({
      columns: [
        DataGridColumnFactory.text('ticket', 'Ticket', 'ticket'),
        DataGridColumnFactory.text('priority', 'Priority', 'priority'),
        DataGridColumnFactory.text('owner', 'Owner', 'owner')
      ],
      dataSource: this.createStaticDataSource(this.rows),
      selection: 'multi',
      styling: {
        striped: true,
        hoverable: true
      },
      callbacks: {
        onSelectionChange: (rows: DataGridRow<QueueRow>[]) => this.selectedCount.set(rows.length)
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
