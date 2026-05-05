# Switch

Switch builds on the shared field foundation, so it supports labels, helper and error text, validation hooks, disabled and readonly states, and Angular forms integration. It keeps the interaction model close to a native checkbox while presenting a Fluent-style toggle surface.

## Import
```ts
import { SwitchComponent } from 'ui';
```

## Basic toggles
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-basic-example',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:30rem">
      <ui-switch
        label="Enable desktop notifications"
        helpText="Important mentions and task activity only."
        [(ngModel)]="desktopNotifications"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Auto-save drafts"
        helpText="Saves edits every 30 seconds while you work."
        [(ngModel)]="autosaveDrafts"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Share anonymous usage insights"
        [(ngModel)]="shareInsights"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class SwitchBasicExampleComponent {
  protected desktopNotifications = true;
  protected autosaveDrafts = true;
  protected shareInsights = false;
}
```

## Label positions
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-label-positions-example',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;width:100%;max-width:40rem"
    >
      <ui-switch
        label="Label after"
        labelPosition="after"
        [(ngModel)]="afterValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Label before"
        labelPosition="before"
        [(ngModel)]="beforeValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Label above"
        labelPosition="above"
        [(ngModel)]="aboveValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
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
        <ui-switch
          labelPosition="none"
          ariaLabel="Enable condensed navigation"
          [(ngModel)]="hiddenLabelValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class SwitchLabelPositionsExampleComponent {
  protected afterValue = true;
  protected beforeValue = false;
  protected aboveValue = true;
  protected belowValue = false;
  protected hiddenLabelValue = true;
}
```

## Sizes and states
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-sizes-states-example',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <ui-switch
          label="Compact density"
          size="small"
          [(ngModel)]="compactValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Default density"
          size="medium"
          [(ngModel)]="defaultValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Prominent density"
          size="large"
          [(ngModel)]="prominentValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-switch label="Disabled off" [disabled]="true" [ngModel]="false" />
        <ui-switch label="Disabled on" [disabled]="true" [ngModel]="true" />
        <ui-switch label="Readonly on" [readonly]="true" [ngModel]="true" />
        <ui-switch label="Readonly off" [readonly]="true" [ngModel]="false" />
      </div>
    </div>
  `,
})
export class SwitchSizesStatesExampleComponent {
  protected compactValue = false;
  protected defaultValue = true;
  protected prominentValue = true;
}
```

## Helper text and validation
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-helper-validation-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SwitchComponent],
  template: `
    <form style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem" (ngSubmit)="submit()">
      <ui-switch
        label="Allow production deploy"
        helpText="This enables direct deployment from the release checklist."
        [(ngModel)]="allowDeploy"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="I confirm I reviewed the rollback plan"
        [required]="true"
        [(errorText)]="confirmationError"
        [(ngModel)]="rollbackConfirmed"
        name="rollbackConfirmed"
      />

      <div
        style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="submit" variant="primary">Continue</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ statusText }}
        </span>
      </div>
    </form>
  `,
})
export class SwitchHelperValidationExampleComponent {
  protected allowDeploy = true;
  protected rollbackConfirmed = false;
  protected confirmationError = '';
  protected statusText = 'Validation appears only when the confirmation is still missing.';

  protected submit(): void {
    if (!this.rollbackConfirmed) {
      this.confirmationError = 'Review confirmation is required before continuing.';
      this.statusText = 'Confirmation is still missing.';
      return;
    }

    this.confirmationError = '';
    this.statusText = 'Release checks are complete. The flow can continue.';
  }
}
```

## Preferences form
```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-preferences-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(0,1fr) minmax(12rem,16rem);gap:1rem;align-items:start;width:100%;max-width:42rem"
    >
      <form
        [formGroup]="preferencesForm"
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-switch
          label="Weekly summary email"
          helpText="A digest of unresolved tasks and team activity."
          formControlName="summaryEmail"
        />
        <ui-switch
          label="Comment mentions"
          helpText="Send an alert when someone mentions you directly."
          formControlName="mentions"
        />
        <ui-switch
          label="Calendar reminders"
          formControlName="calendarReminders"
        />
        <ui-switch
          label="Marketing updates"
          formControlName="marketing"
        />
      </form>

      <div
        style="padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;line-height:1.5"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4">
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Summary email</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.summaryEmail.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Mentions</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.mentions.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Calendar reminders</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.calendarReminders.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Marketing</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              preferencesForm.controls.marketing.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SwitchPreferencesFormExampleComponent {
  protected readonly preferencesForm = new FormGroup({
    summaryEmail: new FormControl(true, { nonNullable: true }),
    mentions: new FormControl(true, { nonNullable: true }),
    calendarReminders: new FormControl(false, { nonNullable: true }),
    marketing: new FormControl(false, { nonNullable: true }),
  });
}
```

## Notification control panel
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SliderComponent, SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-notification-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SliderComponent, SwitchComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:35rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Incident notification policy</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure how aggressively owners are notified when service health degrades.
        </div>
      </div>

      <ui-switch
        label="Smart alerts"
        helpText="Filter low-signal events and escalate only when incidents become actionable."
        [(ngModel)]="smartAlerts"
        [ngModelOptions]="{ standalone: true }"
      />

      <div style="display:flex;flex-direction:column;gap:0.75rem;padding-left:0.25rem">
        <ui-switch
          label="Escalate to manager after 15 minutes"
          [disabled]="!smartAlerts"
          [(ngModel)]="escalateManager"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Send overnight SMS fallback"
          [disabled]="!smartAlerts"
          [(ngModel)]="smsFallback"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-slider
          label="Noise threshold"
          [min]="0"
          [max]="100"
          [step]="5"
          [showMinMax]="true"
          [disabled]="!smartAlerts"
          [(ngModel)]="threshold"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="describeThreshold"
          helpText="Higher values reduce low-priority notifications."
        />
      </div>

      <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
        <ui-button type="button" variant="primary">Save policy</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Preview digest</ui-button>
      </div>
    </div>
  `,
})
export class SwitchNotificationPanelExampleComponent {
  protected smartAlerts = true;
  protected escalateManager = true;
  protected smsFallback = false;
  protected threshold = 65;

  protected readonly describeThreshold = (value: number) => `${value} percent threshold`;
}
```

## Accessibility

### Accessible name
The inner checkbox uses `ariaLabel` when provided and otherwise falls back to the visible `label`. If you render the switch with `labelPosition="none"`, provide an explicit accessible name.

| Source | Accessible name |
| --- | --- |
| `ariaLabel` | explicit accessible name |
| visible `label` | default fallback |
| no label + no `ariaLabel` | avoid this state |

### Keyboard and role
Because the control is backed by a native checkbox input, standard keyboard behavior applies while the UI stays visually switch-like.

| Key | Action |
| --- | --- |
| `Tab` | moves focus to or from the switch |
| `Space` | toggles checked state when interactive |

| State | Attribute |
| --- | --- |
| on / off | native checkbox checked state |
| disabled | native `disabled` |
| required | native `required` |

### Descriptions and errors
Helper text and error text are wired into `aria-describedby` through the shared field wrapper. When an error is present, it becomes the active description and helper text is suppressed.
