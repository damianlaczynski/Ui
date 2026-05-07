import { Component, computed } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface ActivityRow {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  target: string;
}

@Component({
  selector: 'app-data-grid-virtualization-demo',
  imports: [DataGridComponent],
  template: `
    <div style="height: 420px;">
      <ui-data-grid [config]="config()" />
    </div>

    <div style="margin-top:12px; color:var(--color-neutral-foreground-3, #605e5c);">
      Dataset size: {{ rows.length }} rows
    </div>
  `,
})
export class DataGridVirtualizationDemoComponent {
  rows: ActivityRow[] = Array.from({ length: 1000 }, (_, index) => ({
    id: `activity-${index + 1}`,
    user: `User ${index + 1}`,
    action: index % 2 === 0 ? 'Updated file' : 'Shared link',
    timestamp: `2026-04-${String((index % 28) + 1).padStart(2, '0')}`,
    target: `Record ${index + 1}`,
  }));

  config = computed(() =>
    createDataGridConfig<ActivityRow>({
      columns: [
        DataGridColumnFactory.text('user', 'User', 'user', { sortable: true }),
        DataGridColumnFactory.text('action', 'Action', 'action'),
        DataGridColumnFactory.text('target', 'Target', 'target'),
        DataGridColumnFactory.text('timestamp', 'Timestamp', 'timestamp', { sortable: true }),
      ],
      dataSource: this.createStaticDataSource(this.rows),
      virtualization: {
        enabled: true,
        itemHeight: 48,
        bufferSize: 3,
      },
      styling: {
        hoverable: true,
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
