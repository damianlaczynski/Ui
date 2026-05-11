import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import { DropdownComponent, type DropdownItem } from 'ui';

const directoryItems: DropdownItem[] = [
  { value: 1, label: 'Ava Lopez' },
  { value: 2, label: 'Ben Carter' },
  { value: 3, label: 'Chloe Young' },
  { value: 4, label: 'Daniel Kim' },
  { value: 5, label: 'Ella Brown' },
  { value: 6, label: 'Felix Reed' },
  { value: 7, label: 'Grace Hall' },
  { value: 8, label: 'Henry Cox' },
  { value: 9, label: 'Isla Price' },
  { value: 10, label: 'Jack Long' },
  { value: 11, label: 'Kira Stone' },
  { value: 12, label: 'Leo Ward' },
  { value: 13, label: 'Maya Diaz' },
  { value: 14, label: 'Noah Bell' },
  { value: 15, label: 'Olivia Cook' },
  { value: 16, label: 'Piper Lane' },
  { value: 17, label: 'Quinn Ross' },
  { value: 18, label: 'Ruby Perry' },
  { value: 19, label: 'Sam Foster' },
  { value: 20, label: 'Theo Murphy' },
];

@Component({
  selector: 'app-dropdown-async-data-example',
  imports: [FormsModule, DropdownComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:42rem">
      <div style="flex:1 1 18rem;min-width:16rem;max-width:24rem">
        <ui-dropdown
          label="Assignee"
          placeholder="Search directory"
          helpText="Results are loaded in pages of 6 items to mimic a server-backed directory."
          [items]="directoryItems"
          [dataSource]="directoryDataSource"
          [searchable]="true"
          [clearable]="true"
          [pageSize]="6"
          [searchDebounceMs]="250"
          [(ngModel)]="selectedAssignee"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="min-width:13rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Current value
        </p>
        <strong style="display:block;font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)">
          {{ selectedAssigneeLabel }}
        </strong>
        <p style="margin:0.5rem 0 0;font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)">
          Search runs against the data source instead of filtering the local array in memory.
        </p>
      </div>
    </div>
  `,
})
export class DropdownAsyncDataExampleComponent {
  protected readonly directoryItems = directoryItems;
  protected selectedAssignee: string | number = 12;

  protected readonly directoryDataSource = (params: { page?: number; pageSize?: number; searchTerm?: string }) => {
    const query = params.searchTerm?.trim().toLowerCase() ?? '';
    const filtered = query ? directoryItems.filter(item => item.label.toLowerCase().includes(query)) : directoryItems;

    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 6;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({
      items,
      hasNextPage: start + pageSize < filtered.length,
      hasPreviousPage: page > 1,
      totalCount: filtered.length,
    }).pipe(delay(250));
  };

  protected get selectedAssigneeLabel(): string {
    return this.directoryItems.find(item => item.value === this.selectedAssignee)?.label ?? 'None';
  }
}
