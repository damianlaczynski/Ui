# Dropdown

Dropdown is appropriate when users choose from a bounded set rather than entering freeform text. In addition to standard field variants and validation, it covers multi-select tags, compact filter triggers, server-backed search, and custom item presentation without forcing consumers to build the overlay behavior themselves.

## Import
```ts
import { DropdownComponent } from 'ui';
```

## Basic single select
```ts
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
```

## Variants, sizes, and field states
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, type DropdownItem } from 'ui';

const densityItems: DropdownItem[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

@Component({
  selector: 'app-dropdown-variants-states-example',
  imports: [FormsModule, DropdownComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:52rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-dropdown
          label="Filled"
          [items]="densityItems"
          inputVariant="filled"
          [(ngModel)]="filledValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Filled gray"
          [items]="densityItems"
          inputVariant="filled-gray"
          [(ngModel)]="grayValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Filled lighter"
          [items]="densityItems"
          inputVariant="filled-lighter"
          size="small"
          [(ngModel)]="lighterValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Underlined"
          [items]="densityItems"
          inputVariant="underlined"
          size="large"
          [(ngModel)]="underlinedValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-dropdown
          label="Required"
          placeholder="Pick a cadence"
          helpText="Shown when a selection is mandatory before save."
          [items]="densityItems"
          [required]="true"
          [(ngModel)]="requiredValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Readonly"
          [items]="densityItems"
          [readonly]="true"
          [(ngModel)]="readonlyValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Disabled"
          [items]="densityItems"
          [disabled]="true"
          [(ngModel)]="disabledValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class DropdownVariantsStatesExampleComponent {
  protected readonly densityItems = densityItems;
  protected filledValue = 'daily';
  protected grayValue = 'weekly';
  protected lighterValue = 'monthly';
  protected underlinedValue = 'daily';
  protected requiredValue = '';
  protected readonlyValue = 'weekly';
  protected disabledValue = 'monthly';
}
```

## Multi-select with tags
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DropdownComponent, type DropdownItem } from 'ui';

const channelItems: DropdownItem[] = [
  { value: 'email', label: 'Email', icon: 'mail' },
  { value: 'teams', label: 'Teams', icon: 'chat' },
  { value: 'sms', label: 'SMS', icon: 'phone' },
  { value: 'push', label: 'Push', icon: 'alert' },
  { value: 'slack', label: 'Slack', icon: 'send' },
];

@Component({
  selector: 'app-dropdown-multi-tags-example',
  imports: [FormsModule, ButtonComponent, DropdownComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-dropdown
        label="Notification channels"
        placeholder="Select one or more channels"
        helpText="Multi mode keeps the list open and turns selections into removable tags."
        [items]="channelItems"
        mode="multi"
        [searchable]="true"
        [clearable]="true"
        [(ngModel)]="selectedChannels"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Selected
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedChannelLabels }}
          </strong>
        </div>

        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="resetSelection()"
        >
          Reset
        </ui-button>
      </div>
    </div>
  `,
})
export class DropdownMultiTagsExampleComponent {
  protected readonly channelItems = channelItems;
  protected selectedChannels: Array<string | number> = ['email', 'teams'];

  protected get selectedChannelLabels(): string {
    const selected = this.channelItems
      .filter(item => this.selectedChannels.includes(item.value))
      .map(item => item.label);

    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  protected resetSelection(): void {
    this.selectedChannels = [];
  }
}
```

## Search, clear, and disabled options
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, type DropdownItem } from 'ui';

const countryItems: DropdownItem[] = [
  { value: 'pl', label: 'Poland' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'pt', label: 'Portugal' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
];

const reviewerItems: DropdownItem[] = [
  { value: 'ava', label: 'Ava Lopez' },
  { value: 'miles', label: 'Miles Carter' },
  { value: 'zoe', label: 'Zoe Patel' },
  { value: 'nina', label: 'Nina Woods' },
  { value: 'liam', label: 'Liam Scott', disabled: true },
];

@Component({
  selector: 'app-dropdown-search-clear-example',
  imports: [FormsModule, DropdownComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem">
        <ui-dropdown
          label="Shipping country"
          placeholder="Search countries"
          helpText="Client-side search filters the static item list."
          [items]="countryItems"
          [searchable]="true"
          [clearable]="true"
          [(ngModel)]="selectedCountry"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-dropdown
          label="Reviewers"
          placeholder="Search people"
          [items]="reviewerItems"
          mode="multi"
          [searchable]="true"
          [clearable]="true"
          [(ngModel)]="selectedReviewers"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Country
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedCountryLabel }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:12rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Reviewers
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedReviewerLabels }}
          </strong>
        </div>
      </div>
    </div>
  `,
})
export class DropdownSearchClearExampleComponent {
  protected readonly countryItems = countryItems;
  protected readonly reviewerItems = reviewerItems;
  protected selectedCountry = 'pl';
  protected selectedReviewers: Array<string | number> = ['ava', 'zoe'];

  protected get selectedCountryLabel(): string {
    return this.countryItems.find(item => item.value === this.selectedCountry)?.label ?? 'None';
  }

  protected get selectedReviewerLabels(): string {
    const labels = this.reviewerItems
      .filter(item => this.selectedReviewers.includes(item.value))
      .map(item => item.label);

    return labels.length > 0 ? labels.join(', ') : 'None';
  }
}
```

## Compact trigger and panel sizing
```ts
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
```

## Async data source and paged search
```ts
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
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:42rem"
    >
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
        <strong
          style="display:block;font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ selectedAssigneeLabel }}
        </strong>
        <p
          style="margin:0.5rem 0 0;font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)"
        >
          Search runs against the data source instead of filtering the local array in memory.
        </p>
      </div>
    </div>
  `,
})
export class DropdownAsyncDataExampleComponent {
  protected readonly directoryItems = directoryItems;
  protected selectedAssignee: string | number = 12;

  protected readonly directoryDataSource = (params: {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
  }) => {
    const query = params.searchTerm?.trim().toLowerCase() ?? '';
    const filtered = query
      ? directoryItems.filter(item => item.label.toLowerCase().includes(query))
      : directoryItems;

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
```

## Custom item template
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, IconComponent, type DropdownItem } from 'ui';

type EnvironmentItem = DropdownItem & {
  data: {
    region: string;
    note: string;
  };
};

const environmentItems: EnvironmentItem[] = [
  {
    value: 'prod-eu',
    label: 'Production EU',
    icon: 'globe',
    data: { region: 'Frankfurt', note: 'Customer-facing traffic' },
  },
  {
    value: 'prod-us',
    label: 'Production US',
    icon: 'globe',
    data: { region: 'Virginia', note: 'Low-latency API edge' },
  },
  {
    value: 'stage',
    label: 'Staging',
    icon: 'beaker',
    data: { region: 'Shared cluster', note: 'Pre-release validation' },
  },
  {
    value: 'sandbox',
    label: 'Sandbox',
    icon: 'code',
    data: { region: 'Ephemeral', note: 'Safe experimentation' },
  },
];

@Component({
  selector: 'app-dropdown-custom-template-example',
  imports: [FormsModule, DropdownComponent, IconComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <div style="flex:1 1 20rem;min-width:18rem;max-width:26rem">
        <ui-dropdown
          label="Deployment environment"
          placeholder="Choose environment"
          [items]="environmentItems"
          [clearable]="true"
          [(ngModel)]="selectedEnvironment"
          [ngModelOptions]="{ standalone: true }"
        >
          <ng-template #itemTemplate let-item let-selected="selected">
            <div
              style="display:flex;gap:0.5rem;width:100%;min-width:0;justify-content:space-between"
            >
              <div style="display:flex;gap:0.75rem;align-items:center;min-width:0">
                <ui-icon [icon]="item.icon || 'globe'" size="medium" />
                <div
                  style="display:flex;flex-direction:column;align-items:flex-start;gap:0.125rem;min-width:0"
                >
                  <span
                    style="font-weight:600;line-height:1.35;color:var(--color-neutral-foreground-rest)"
                  >
                    {{ item.label }}
                  </span>
                  <span
                    style="font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)"
                  >
                    {{ item.data.region }} · {{ item.data.note }}
                  </span>
                </div>
              </div>
              @if (selected) {
                <span
                  style="align-self:center;padding:0.125rem 0.5rem;border-radius:999px;background:var(--color-brand-background2-rest);color:var(--color-brand-foreground1-rest);font-size:0.75rem;font-weight:600"
                >
                  Selected
                </span>
              }
            </div>
          </ng-template>
        </ui-dropdown>
      </div>

      <div
        style="min-width:14rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Summary
        </p>
        <strong
          style="display:block;font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ selectedEnvironmentItem?.label || 'None' }}
        </strong>
        <p
          style="margin:0.35rem 0 0;font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)"
        >
          {{ selectedEnvironmentItem?.data?.region || 'No region selected' }}
        </p>
      </div>
    </div>
  `,
})
export class DropdownCustomTemplateExampleComponent {
  protected readonly environmentItems = environmentItems;
  protected selectedEnvironment: string | number = 'prod-eu';

  protected get selectedEnvironmentItem(): EnvironmentItem | undefined {
    return this.environmentItems.find(item => item.value === this.selectedEnvironment);
  }
}
```

## Form composition
```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, DropdownComponent, type DropdownItem } from 'ui';

const ownerItems: DropdownItem[] = [
  { value: 'ava', label: 'Ava Lopez' },
  { value: 'nina', label: 'Nina Woods' },
  { value: 'zoe', label: 'Zoe Patel' },
  { value: 'theo', label: 'Theo Murphy' },
];

const reviewerItems: DropdownItem[] = [
  { value: 'legal', label: 'Legal' },
  { value: 'ops', label: 'Operations' },
  { value: 'security', label: 'Security' },
  { value: 'support', label: 'Support' },
];

const releaseItems: DropdownItem[] = [
  { value: 'patch', label: 'Patch release' },
  { value: 'minor', label: 'Minor release' },
  { value: 'major', label: 'Major release' },
];

@Component({
  selector: 'app-dropdown-form-pattern-example',
  imports: [ReactiveFormsModule, ButtonComponent, DropdownComponent],
  template: `
    <form
      [formGroup]="form"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      (ngSubmit)="submit()"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Release handoff</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          A realistic form usually mixes single and multi-select fields with actions and a compact
          summary of the current choice set.
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem">
        <ui-dropdown
          label="Release owner"
          placeholder="Select owner"
          helpText="Required before the handoff can be submitted."
          [items]="ownerItems"
          [searchable]="true"
          [clearable]="true"
          [required]="true"
          formControlName="owner"
        />

        <ui-dropdown
          label="Release type"
          placeholder="Choose release type"
          [items]="releaseItems"
          formControlName="releaseType"
        />
      </div>

      <ui-dropdown
        label="Required reviewers"
        placeholder="Choose one or more reviewers"
        [items]="reviewerItems"
        mode="multi"
        [searchable]="true"
        [clearable]="true"
        formControlName="reviewers"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Owner
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ ownerLabel }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:11rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Reviewers
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ reviewerLabels }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Last submit
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ submitState }}
          </strong>
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-button type="submit" variant="primary">Save handoff</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
          Reset
        </ui-button>
      </div>
    </form>
  `,
})
export class DropdownFormPatternExampleComponent {
  protected readonly ownerItems = ownerItems;
  protected readonly reviewerItems = reviewerItems;
  protected readonly releaseItems = releaseItems;
  protected submitState = 'Not submitted';

  protected readonly form = new FormGroup({
    owner: new FormControl<string | number>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    releaseType: new FormControl<string | number>('minor', { nonNullable: true }),
    reviewers: new FormControl<Array<string | number>>(['ops'], { nonNullable: true }),
  });

  protected get ownerLabel(): string {
    return ownerItems.find(item => item.value === this.form.controls.owner.value)?.label ?? 'None';
  }

  protected get reviewerLabels(): string {
    const selected = reviewerItems
      .filter(item => this.form.controls.reviewers.value.includes(item.value))
      .map(item => item.label);

    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitState = 'Complete the required fields';
      return;
    }

    this.submitState = 'Saved';
  }

  protected reset(): void {
    this.form.reset({
      owner: '',
      releaseType: 'minor',
      reviewers: ['ops'],
    });
    this.submitState = 'Not submitted';
  }
}
```

## Accessibility

### Accessible name and role
The standard trigger uses `ariaLabel` when provided and otherwise falls back to the visible `label`. Compact mode also needs an explicit accessible name because the trigger is just an icon button.

| Mode / input | Exposed semantics |
| --- | --- |
| `single` | `combobox` trigger controlling a `listbox` |
| `multi` | `listbox` trigger with `aria-multiselectable="true"` |
| `ariaLabel` | explicit accessible name override |
| visible `label` | default accessible name fallback |

### Keyboard model
Disabled items are skipped during navigation, and typeahead moves focus to the next matching option.

| Key | Action |
| --- | --- |
| `ArrowDown` / `ArrowUp` | opens the panel and moves through selectable items |
| `Home` / `End` | jumps to the first or last selectable item |
| `PageUp` / `PageDown` | moves through longer lists in larger steps |
| `Enter` / `Space` | selects the active option |
| `Escape` | closes the panel and returns focus to the trigger |
| `Tab` | leaves the control and closes the panel |
| printable characters | runs typeahead search against option labels |

### Active descendant and selection state
The component tracks the active option through `aria-activedescendant`. In multi-select mode, the visible tags are only a sighted summary; the authoritative accessibility state remains on the trigger and list options.

| Input / state | Attribute |
| --- | --- |
| active option | `aria-activedescendant` |
| open state | `aria-expanded` |
| controlled panel | `aria-controls` |
| selected option | `aria-selected` on each option |
| disabled option | `aria-disabled` on each option |
