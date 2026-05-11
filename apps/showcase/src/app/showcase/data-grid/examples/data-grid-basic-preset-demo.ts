import { Component, computed } from '@angular/core';
import { createDataGridConfig, DataGridColumnFactory, DataGridComponent } from 'ui';
import { Observable, of } from 'rxjs';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

interface FileRow {
  id: string;
  name: string;
  type: string;
  modified: string;
}

@Component({
  selector: 'app-data-grid-basic-preset-demo',
  imports: [DataGridComponent],
  template: `
    <ui-data-grid [config]="config()" />
  `
})
export class DataGridBasicPresetDemoComponent {
  private rows: FileRow[] = [
    { id: '1', name: 'Roadmap.docx', type: 'Word Document', modified: '2026-04-12' },
    { id: '2', name: 'Launch Plan.pptx', type: 'PowerPoint', modified: '2026-04-10' },
    { id: '3', name: 'Budget.xlsx', type: 'Excel', modified: '2026-04-07' },
    { id: '4', name: 'Notes.pdf', type: 'PDF Document', modified: '2026-04-03' }
  ];

  config = computed(() =>
    createDataGridConfig<FileRow>({
      columns: [
        DataGridColumnFactory.text('name', 'Name', 'name'),
        DataGridColumnFactory.text('type', 'Type', 'type'),
        DataGridColumnFactory.text('modified', 'Modified', 'modified')
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
