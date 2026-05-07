import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, type DropdownItem } from 'ui';

const statusItems: DropdownItem[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'ready', label: 'Ready for review' },
  { value: 'active', label: 'In progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'done', label: 'Done' },
];

@Component({
  selector: 'app-dropdown-basic-example',
  imports: [FormsModule, DropdownComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:42rem"
    >
      <div style="flex:1 1 18rem;min-width:16rem;max-width:22rem">
        <ui-dropdown
          label="Task status"
          placeholder="Choose a status"
          helpText="Use a short, stable set of labels that maps cleanly to downstream workflows."
          [items]="statusItems"
          [(ngModel)]="selectedStatus"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="min-width:12rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Value
        </p>
        <strong
          style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ selectedStatusLabel }}
        </strong>
      </div>
    </div>
  `,
})
export class DropdownBasicExampleComponent {
  protected readonly statusItems = statusItems;
  protected selectedStatus = 'active';

  protected get selectedStatusLabel(): string {
    return this.statusItems.find(item => item.value === this.selectedStatus)?.label ?? 'None';
  }
}
