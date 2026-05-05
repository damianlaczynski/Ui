# Checkbox

Checkbox builds on the shared field foundation, so it supports labels, helper and error text, validation hooks, disabled and readonly states, and Angular forms integration. It also adds checkbox-specific shape options and an indeterminate state for partially selected groups.

## Import
```ts
import { CheckboxComponent } from 'ui';
```

## Basic selection
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-basic-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:30rem">
      <ui-checkbox
        label="Accept terms and conditions"
        [(ngModel)]="acceptTerms"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Subscribe to product updates"
        helpText="Release notes and feature announcements about twice a month."
        [(ngModel)]="subscribeUpdates"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Remember this device for 30 days"
        [(ngModel)]="rememberDevice"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class CheckboxBasicExampleComponent {
  protected acceptTerms = false;
  protected subscribeUpdates = true;
  protected rememberDevice = true;
}
```

## Label positions
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-label-positions-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;width:100%;max-width:40rem"
    >
      <ui-checkbox
        label="Label after"
        labelPosition="after"
        [(ngModel)]="afterValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label before"
        labelPosition="before"
        [(ngModel)]="beforeValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label above"
        labelPosition="above"
        [(ngModel)]="aboveValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label below"
        labelPosition="below"
        [(ngModel)]="belowValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Hidden visible label
        </div>
        <ui-checkbox
          labelPosition="none"
          ariaLabel="Enable compact table rows"
          [(ngModel)]="hiddenLabelValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class CheckboxLabelPositionsExampleComponent {
  protected afterValue = true;
  protected beforeValue = false;
  protected aboveValue = true;
  protected belowValue = false;
  protected hiddenLabelValue = true;
}
```

## Shapes and density
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-shapes-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <ui-checkbox
          label="Rounded default"
          shape="rounded"
          size="medium"
          [(ngModel)]="roundedValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-checkbox
          label="Circular compact"
          shape="circular"
          size="small"
          [(ngModel)]="circularValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-checkbox
          label="Square prominent"
          shape="square"
          size="large"
          [(ngModel)]="squareValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class CheckboxShapesExampleComponent {
  protected roundedValue = true;
  protected circularValue = false;
  protected squareValue = true;
}
```

## States and indeterminate
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-states-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-checkbox label="Disabled unchecked" [disabled]="true" [ngModel]="false" />
        <ui-checkbox label="Disabled checked" [disabled]="true" [ngModel]="true" />
        <ui-checkbox label="Readonly checked" [readonly]="true" [ngModel]="true" />
        <ui-checkbox
          label="Required confirmation"
          [required]="true"
          [(ngModel)]="requiredValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Partial selection</div>
        <ui-checkbox
          label="Select all project notifications"
          [(ngModel)]="masterValue"
          [(indeterminate)]="masterIndeterminate"
          [ngModelOptions]="{ standalone: true }"
        />
        <div style="display:flex;flex-direction:column;gap:0.5rem;padding-left:1.5rem">
          <ui-checkbox
            label="Critical incidents"
            [(ngModel)]="criticalValue"
            [ngModelOptions]="{ standalone: true }"
            (change)="syncMasterState()"
          />
          <ui-checkbox
            label="Billing alerts"
            [(ngModel)]="billingValue"
            [ngModelOptions]="{ standalone: true }"
            (change)="syncMasterState()"
          />
        </div>
      </div>
    </div>
  `,
})
export class CheckboxStatesExampleComponent {
  protected requiredValue = false;
  protected masterValue = false;
  protected masterIndeterminate = true;
  protected criticalValue = true;
  protected billingValue = false;

  protected syncMasterState(): void {
    const selectedCount = Number(this.criticalValue) + Number(this.billingValue);

    if (selectedCount === 0) {
      this.masterIndeterminate = false;
      this.masterValue = false;
      return;
    }

    if (selectedCount === 2) {
      this.masterIndeterminate = false;
      this.masterValue = true;
      return;
    }

    this.masterValue = false;
    this.masterIndeterminate = true;
  }
}
```

## Filter group pattern
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-filter-group-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:26rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Issue filters</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Narrow backlog results without leaving the current view.
        </div>
      </div>

      <ui-checkbox
        label="Assigned to me"
        [(ngModel)]="assignedToMe"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Created this week"
        [(ngModel)]="createdThisWeek"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Includes blocked tasks"
        [(ngModel)]="includesBlocked"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Has customer impact"
        [(ngModel)]="customerImpact"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class CheckboxFilterGroupExampleComponent {
  protected assignedToMe = true;
  protected createdThisWeek = false;
  protected includesBlocked = true;
  protected customerImpact = false;
}
```

## Permissions panel
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-permissions-panel-example',
  standalone: true,
  imports: [ButtonComponent, CheckboxComponent, FormsModule, ReactiveFormsModule],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Workspace permissions</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure what project coordinators can do without editing each permission separately.
        </div>
      </div>

      <ui-checkbox
        labelPosition="after"
        label="Project management access"
        [(ngModel)]="managementAccess"
        [(indeterminate)]="managementIndeterminate"
        [ngModelOptions]="{ standalone: true }"
        (change)="toggleManagementGroup()"
      />

      <form
        [formGroup]="permissionsForm"
        style="display:flex;flex-direction:column;gap:0.625rem;padding-left:1.5rem"
      >
        <ui-checkbox
          labelPosition="after"
          label="Create and archive projects"
          formControlName="projects"
          (change)="syncManagementState()"
        />
        <ui-checkbox
          labelPosition="after"
          label="Invite and remove members"
          formControlName="members"
          (change)="syncManagementState()"
        />
        <ui-checkbox
          labelPosition="after"
          label="Manage billing settings"
          formControlName="billing"
          (change)="syncManagementState()"
        />
      </form>

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-button type="button" variant="primary">Save permissions</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Cancel</ui-button>
      </div>

      <div
        style="padding:0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Management access</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              managementIndeterminate ? 'Mixed' : managementAccess ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Projects</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.projects.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Members</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.members.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Billing</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.billing.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckboxPermissionsPanelExampleComponent {
  protected managementAccess = false;
  protected managementIndeterminate = true;

  protected readonly permissionsForm = new FormGroup({
    projects: new FormControl(true, { nonNullable: true }),
    members: new FormControl(false, { nonNullable: true }),
    billing: new FormControl(true, { nonNullable: true }),
  });

  protected toggleManagementGroup(): void {
    const nextValue = this.managementAccess;
    this.managementIndeterminate = false;
    this.permissionsForm.setValue({
      projects: nextValue,
      members: nextValue,
      billing: nextValue,
    });
  }

  protected syncManagementState(): void {
    const values = Object.values(this.permissionsForm.getRawValue());
    const selectedCount = values.filter(Boolean).length;

    if (selectedCount === 0) {
      this.managementAccess = false;
      this.managementIndeterminate = false;
      return;
    }

    if (selectedCount === values.length) {
      this.managementAccess = true;
      this.managementIndeterminate = false;
      return;
    }

    this.managementAccess = false;
    this.managementIndeterminate = true;
  }
}
```

## Accessibility

### Accessible name
The inner checkbox uses `ariaLabel` when provided and otherwise falls back to the visible `label`. If the visible label is hidden or omitted, provide an explicit accessible name.

| Source | Accessible name |
| --- | --- |
| `ariaLabel` | explicit accessible name |
| visible `label` | default fallback |
| no label + no `ariaLabel` | avoid this state |

### Keyboard and state
The control is backed by a native checkbox input, so it keeps the expected browser interaction model.

| Key | Action |
| --- | --- |
| `Tab` | moves focus to or from the checkbox |
| `Space` | toggles checked state when interactive |

| State | Attribute |
| --- | --- |
| checked | native `checked` |
| indeterminate | native mixed checkbox state |
| disabled | native `disabled` |
| required | native `required` |

### Descriptions, errors, and indeterminate
Helper text and error text are wired into `aria-describedby` through the shared field wrapper. When an error is present, it becomes the active description and helper text is suppressed.

Use `indeterminate` only for partially selected parent groups. It should communicate mixed child state, not act as a third standalone choice.
