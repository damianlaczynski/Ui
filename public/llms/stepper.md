# Stepper

Drive the UI with `activeStepIndex` and `(stepChange)`. Set `linear` when steps must be completed in order, and mutate each `Step`’s `completed`, `error`, `warning`, or `disabled` flags to mirror validation. Use `showDescriptions` for subtitled milestones and `orientation="vertical"` beside a detail pane.

## Import
```ts
import { StepperComponent, type Step } from 'ui';
```

## Navigation without linear gating
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent, Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-basic-example',
  standalone: true,
  imports: [ButtonComponent, StepperComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <ui-stepper
        [steps]="steps()"
        [activeStepIndex]="active()"
        [clickable]="true"
        (stepChange)="active.set($event.index)"
      />
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="prev()">
          Back
        </ui-button>
        <ui-button
          type="button"
          variant="primary"
          [disabled]="active() >= steps().length - 1"
          (click)="next()"
        >
          Next
        </ui-button>
      </div>
    </div>
  `,
})
export class StepperBasicExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: 'scope', label: 'Scope' },
    { id: 'details', label: 'Details' },
    { id: 'publish', label: 'Publish' },
  ]);

  protected readonly active = signal(0);

  protected prev(): void {
    this.active.update(i => Math.max(0, i - 1));
  }

  protected next(): void {
    this.active.update(i => Math.min(this.steps().length - 1, i + 1));
  }
}
```

## Linear completion
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent, Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-linear-progress-example',
  standalone: true,
  imports: [ButtonComponent, StepperComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <ui-stepper
        [steps]="steps()"
        [activeStepIndex]="active()"
        [linear]="true"
        [clickable]="true"
        [showDescriptions]="true"
        (stepChange)="active.set($event.index)"
      />
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="prev()">
          Back
        </ui-button>
        <ui-button
          type="button"
          variant="primary"
          [disabled]="active() >= steps().length - 1"
          (click)="completeAndNext()"
        >
          Mark done and continue
        </ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
          Reset
        </ui-button>
      </div>
    </div>
  `,
})
export class StepperLinearProgressExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: 'a', label: 'Inventory', description: 'Pick sources' },
    { id: 'b', label: 'Mapping', description: 'Match fields' },
    { id: 'c', label: 'Run', description: 'Start job' },
  ]);

  protected readonly active = signal(0);

  protected prev(): void {
    this.active.update(i => Math.max(0, i - 1));
  }

  protected completeAndNext(): void {
    const i = this.active();
    const list = this.steps();
    this.steps.update(prev => prev.map((s, idx) => (idx === i ? { ...s, completed: true } : s)));
    if (i < list.length - 1) {
      this.active.set(i + 1);
    }
  }

  protected reset(): void {
    this.active.set(0);
    this.steps.set([
      { id: 'a', label: 'Inventory', description: 'Pick sources' },
      { id: 'b', label: 'Mapping', description: 'Match fields' },
      { id: 'c', label: 'Run', description: 'Start job' },
    ]);
  }
}
```

## Vertical rail
```ts
import { Component, signal } from '@angular/core';
import { BadgeComponent, Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-vertical-example',
  standalone: true,
  imports: [BadgeComponent, StepperComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <ui-stepper
        style="flex:0 0 auto"
        [steps]="steps()"
        [activeStepIndex]="active()"
        orientation="vertical"
        [showDescriptions]="true"
        [clickable]="true"
        (stepChange)="active.set($event.index)"
      />
      <div
        style="flex:1;min-width:14rem;display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem 0"
      >
        <ui-badge appearance="tint" variant="secondary" text="Draft policy" />
        <p
          style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          Vertical steppers suit narrow rails next to a detail pane. Labels and descriptions stay
          aligned while the main surface swaps content.
        </p>
      </div>
    </div>
  `,
})
export class StepperVerticalExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: '1', label: 'Intake', description: 'Collect request' },
    { id: '2', label: 'Legal', description: 'Review wording' },
    { id: '3', label: 'Sign-off', description: 'Approver' },
  ]);

  protected readonly active = signal(0);
}
```

## Step signals
```ts
import { Component } from '@angular/core';
import { Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-step-states-example',
  standalone: true,
  imports: [StepperComponent],
  template: `
    <div style="width:100%;max-width:52rem">
      <ui-stepper [steps]="steps" [activeStepIndex]="1" [clickable]="false" />
    </div>
  `,
})
export class StepperStepStatesExampleComponent {
  protected readonly steps: Step[] = [
    { id: 1, label: 'Done', completed: true },
    { id: 2, label: 'Active', completed: false },
    { id: 3, label: 'Blocked', error: true, completed: false },
    { id: 4, label: 'Review', warning: true, completed: false },
    { id: 5, label: 'Later', disabled: true, completed: false },
  ];
}
```

## Onboarding-style wizard
```ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  MessageBarComponent,
  Step,
  StepperComponent,
  TextComponent,
} from 'ui';

@Component({
  selector: 'app-stepper-onboarding-wizard-example',
  standalone: true,
  imports: [
    FormsModule,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    MessageBarComponent,
    StepperComponent,
    TextComponent,
  ],
  template: `
    <div
      style="box-sizing:border-box;width:100%;max-width:44rem;min-width:0;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:1rem;min-width:0;width:100%">
        @if (showError()) {
          <div style="min-width:0;width:100%">
            <ui-message-bar
              variant="warning"
              appearance="tint"
              title="Workspace name required"
              message="This label appears in the sidebar and search. Enter at least two characters."
              [dismissible]="true"
              (dismiss)="showError.set(false)"
            />
          </div>
        }

        <div style="min-width:0;width:100%">
          <ui-stepper
            [steps]="steps()"
            [activeStepIndex]="active()"
            [linear]="true"
            [clickable]="true"
            [showDescriptions]="true"
            (stepChange)="active.set($event.index)"
          />
        </div>

        @switch (active()) {
          @case (0) {
            <div style="display:flex;flex-direction:column;gap:0.75rem;padding-top:0.25rem">
              <ui-text
                label="Workspace name"
                placeholder="Northwind logistics"
                [(ngModel)]="workspaceName"
                [ngModelOptions]="{ standalone: true }"
              />
              <ui-text
                label="URL slug"
                placeholder="northwind-log"
                [(ngModel)]="slug"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          }
          @case (1) {
            <div style="display:flex;flex-direction:column;gap:0.75rem;padding-top:0.25rem">
              <ui-text
                label="Billing contact"
                placeholder="finance@example.com"
                [(ngModel)]="billingEmail"
                [ngModelOptions]="{ standalone: true }"
              />
              <ui-checkbox
                label="Allow members to invite guests without approval"
                [(ngModel)]="guestsOk"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          }
          @case (2) {
            <div
              style="display:flex;flex-direction:column;gap:0.875rem;min-width:0;width:100%;max-width:32rem;padding-top:0.25rem"
            >
              <div style="display:flex;flex-direction:column;gap:0.2rem">
                <span style="font-size:0.9375rem;font-weight:600;line-height:1.3"
                  >Review before creating</span
                >
                <span
                  style="font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
                  >These values will be applied to the new workspace.</span
                >
              </div>
              <div
                style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11.25rem,1fr));gap:0.75rem"
              >
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background1-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Workspace name</span
                  >
                  <span
                    style="font-size:0.9375rem;font-weight:600;line-height:1.35;word-break:break-word"
                    >{{ workspaceName || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background1-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >URL slug</span
                  >
                  <span
                    style="font-weight:600;line-height:1.35;word-break:break-all;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:0.875rem"
                    >{{ slug || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background1-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Billing contact</span
                  >
                  <span
                    style="font-size:0.875rem;font-weight:600;line-height:1.35;word-break:break-word"
                    >{{ billingEmail || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.4rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background1-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Guest invites</span
                  >
                  <ui-badge
                    size="large"
                    appearance="outline"
                    [variant]="guestsOk ? 'success' : 'secondary'"
                    [text]="guestsOk ? 'Allowed' : 'Restricted'"
                  />
                </div>
              </div>
            </div>
          }
        }

        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;padding-top:0.25rem">
          <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="back()">
            Back
          </ui-button>
          @if (active() < 2) {
            <ui-button type="button" variant="primary" (click)="forward()">Continue</ui-button>
          } @else {
            <ui-button type="button" variant="primary" (click)="create()"
              >Create workspace</ui-button
            >
          }
        </div>
      </div>
    </div>
  `,
})
export class StepperOnboardingWizardExampleComponent {
  protected workspaceName = '';

  protected slug = '';

  protected billingEmail = '';

  protected guestsOk = false;

  protected readonly showError = signal(false);

  protected readonly steps = signal<Step[]>([
    { id: 'w', label: 'Workspace', description: 'Identity' },
    { id: 'p', label: 'People', description: 'Access' },
    { id: 'r', label: 'Review', description: 'Confirm' },
  ]);

  protected readonly active = signal(0);

  protected back(): void {
    this.showError.set(false);
    this.active.update(i => Math.max(0, i - 1));
  }

  protected forward(): void {
    const i = this.active();
    if (i === 0 && this.workspaceName.trim().length < 2) {
      this.showError.set(true);
      return;
    }
    this.showError.set(false);
    this.steps.update(prev => prev.map((s, idx) => (idx === i ? { ...s, completed: true } : s)));
    if (i < this.steps().length - 1) {
      this.active.set(i + 1);
    }
  }

  protected create(): void {
    this.workspaceName = '';
    this.slug = '';
    this.billingEmail = '';
    this.guestsOk = false;
    this.showError.set(false);
    this.active.set(0);
    this.steps.set([
      { id: 'w', label: 'Workspace', description: 'Identity' },
      { id: 'p', label: 'People', description: 'Access' },
      { id: 'r', label: 'Review', description: 'Confirm' },
    ]);
  }
}
```

## Accessibility

### Step control
Each step is a `role="button"` with `tabindex="0"` when enabled. The active step sets `aria-current="step"`; disabled steps use `aria-disabled`.

### Linear order
In linear mode, clicks that would skip incomplete work are ignored—keep primary actions in the content area so keyboard and pointer users get the same guardrails.
