import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DropdownComponent, type DropdownItem } from 'ui';

const assigneeItems: DropdownItem[] = [
  { value: 'nina', label: 'Nina Woods', icon: 'person' },
  { value: 'liam', label: 'Liam Scott', icon: 'person' },
  { value: 'zoe', label: 'Zoe Patel', icon: 'person' },
];

const labelItems: DropdownItem[] = [
  { value: 'ux', label: 'UX', icon: 'sparkle' },
  { value: 'frontend', label: 'Frontend', icon: 'code' },
  { value: 'ops', label: 'Ops', icon: 'settings' },
  { value: 'urgent', label: 'Urgent', icon: 'alert' },
  { value: 'release', label: 'Release', icon: 'rocket' },
];

@Component({
  selector: 'app-dropdown-compact-panel-example',
  imports: [FormsModule, ButtonComponent, DropdownComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Inline filter toolbar</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Compact mode works well in tables, toolbars, and dense filter rows where a full field
          shell would add too much weight.
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
        <ui-dropdown
          [items]="assigneeItems"
          [compact]="true"
          compactIcon="person"
          [clearable]="true"
          [panelWidth]="320"
          [(ngModel)]="selectedAssignee"
          [ngModelOptions]="{ standalone: true }"
          ariaLabel="Assignee filter"
        />

        <ui-dropdown
          [items]="labelItems"
          [compact]="true"
          compactIcon="filter"
          mode="multi"
          [searchable]="true"
          [clearable]="true"
          [minPanelWidth]="240"
          [maxPanelWidth]="360"
          [maxHeight]="'240px'"
          [(ngModel)]="selectedLabels"
          [ngModelOptions]="{ standalone: true }"
          ariaLabel="Label filter"
        />

        <ui-button type="button" variant="secondary" appearance="outline" (click)="resetFilters()">
          Reset
        </ui-button>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Assignee
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedAssigneeLabel }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:12rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Labels
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedLabelText }}
          </strong>
        </div>
      </div>
    </div>
  `,
})
export class DropdownCompactPanelExampleComponent {
  protected readonly assigneeItems = assigneeItems;
  protected readonly labelItems = labelItems;
  protected selectedAssignee: string | number = 'nina';
  protected selectedLabels: Array<string | number> = ['frontend', 'urgent'];

  protected get selectedAssigneeLabel(): string {
    return this.assigneeItems.find(item => item.value === this.selectedAssignee)?.label ?? 'None';
  }

  protected get selectedLabelText(): string {
    const labels = this.labelItems
      .filter(item => this.selectedLabels.includes(item.value))
      .map(item => item.label);

    return labels.length > 0 ? labels.join(', ') : 'None';
  }

  protected resetFilters(): void {
    this.selectedAssignee = '';
    this.selectedLabels = [];
  }
}
