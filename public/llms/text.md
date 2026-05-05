# Text Input

Text Input builds on the shared field foundation, so it inherits label positioning, helper and error messaging, validation hooks, disabled and readonly states, and accessible naming. Use it for short single-line values rather than long-form content.

## Import
```ts
import { TextComponent } from 'ui';
```

## Basic field
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'ui';

@Component({
  selector: 'app-text-basic-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:24rem">
      <ui-text
        label="Workspace name"
        placeholder="Enter workspace name"
        helpText="Visible to everyone in your organization."
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextBasicExampleComponent {
  protected value = 'Product Ops Europe';
}
```

## Input variants and sizes
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'ui';

@Component({
  selector: 'app-text-variants-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:28rem">
      <ui-text
        label="Filled"
        inputVariant="filled"
        size="medium"
        [(ngModel)]="filled"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Filled gray"
        inputVariant="filled-gray"
        size="medium"
        [(ngModel)]="filledGray"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Filled lighter"
        inputVariant="filled-lighter"
        size="small"
        [(ngModel)]="filledLighter"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Underlined"
        inputVariant="underlined"
        size="large"
        [(ngModel)]="underlined"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextVariantsExampleComponent {
  protected filled = 'Quarterly planning';
  protected filledGray = 'Client success';
  protected filledLighter = 'Draft';
  protected underlined = 'Executive summary';
}
```

## Label positions and clear button
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'ui';

@Component({
  selector: 'app-text-label-clear-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-text
        label="Label above"
        labelPosition="above"
        placeholder="Default layout"
        [(ngModel)]="above"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Inline before"
        labelPosition="before"
        placeholder="Compact row"
        [(ngModel)]="before"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Inline after"
        labelPosition="after"
        placeholder="Trailing label"
        [(ngModel)]="after"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Below label"
        labelPosition="below"
        placeholder="Label rendered after the control"
        [(ngModel)]="below"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextLabelClearExampleComponent {
  protected above = 'Budget FY27';
  protected before = 'EMEA';
  protected after = 'Internal';
  protected below = 'Reference field';
}
```

## States, required, and validation
```ts
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-text-states-validation-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <form
        [formGroup]="draftForm"
        (ngSubmit)="onSubmit()"
        style="display:flex;flex-direction:column;gap:1.125rem;margin:0;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;padding-bottom:0.25rem">
          <span style="font-size:0.9375rem;font-weight:600">Workspace onboarding draft</span>
          <p
            style="margin:0;font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
          >
            Blurring a field surfaces its error when it stays invalid.
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">
              Save draft
            </strong>
            marks every control touched so min length, pattern and required appear together (like
            production forms).
          </p>
        </div>

        <ui-text
          label="Invite email"
          placeholder="operations@yourcompany.org"
          [required]="true"
          autocomplete="email"
          formControlName="inviteEmail"
        />

        <ui-text
          label="Coupon code"
          placeholder="SAVE-10NOW"
          helpText="Optional. If filled, must look like PREFIX-SUFFIX (letters/digits around a hyphen)."
          formControlName="coupon"
        />

        <ui-text
          label="Project code"
          placeholder="min four chars"
          helpText="At least 4 characters."
          formControlName="projectCode"
        />

        <ui-text
          label="Display slot name"
          placeholder="Morning brief"
          [required]="true"
          helpText="Required; at least 2 characters."
          formControlName="slotName"
        />

        <div
          style="display:flex;flex-direction:column;gap:0.5rem;padding-top:0.35rem;border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent)"
        >
          <ui-text
            label="Workspace subdomain"
            placeholder="finance-apac"
            helpText="autoValidation false: mocked API conflict via manual errorText only."
            formControlName="subdomain"
            [autoValidation]="false"
            [(errorText)]="manualError"
          />
          <button
            type="button"
            style="align-self:flex-start;padding:0.35rem 0.75rem;border-radius:0.5rem;border:1px solid var(--color-neutral-stroke-rest);background:var(--color-neutral-background2-rest);font-size:0.8125rem;cursor:pointer;color:var(--color-neutral-foreground-rest)"
            (click)="toggleManualError()"
          >
            {{
              manualError.trim()
                ? 'Clear mocked API conflict'
                : 'Simulate server conflict (manual error)'
            }}
          </button>
        </div>

        <div style="padding-top:0.25rem">
          @if (saveNotice()) {
            <p
              style="margin:0 0 0.625rem;font-size:0.8125rem;line-height:1.45;color:var(--color-brand-primary)"
              role="status"
            >
              {{ saveNotice() }}
            </p>
          }

          @if (!saveNotice()) {
            <p
              style="margin:0 0 0.625rem;font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
            >
              {{ submitHint }}
            </p>
          }

          <div style="display:flex;flex-wrap:wrap;gap:0.625rem">
            <ui-button type="submit" variant="primary">Save draft</ui-button>
            <ui-button type="button" variant="secondary" appearance="outline" (click)="discard()">
              Discard changes
            </ui-button>
          </div>
        </div>
      </form>

      <ui-text
        label="Readonly workspace id"
        [readonly]="true"
        [showClearButton]="false"
        [formControl]="workspaceId"
        helpText="System-generated identifier (not part of this draft form)."
      />

      <ui-text
        label="Disabled archived field"
        [formControl]="archivedName"
        helpText="Disabled fields stay out of the draft group."
      />
    </div>
  `,
})
export class TextStatesValidationExampleComponent {
  protected manualError = '';
  protected readonly saveNotice = signal('');
  protected readonly submitHint =
    'Save draft submits only when fields pass validators and no mocked API conflict is active.';

  protected readonly workspaceId = new FormControl('ws_29M4LX8', {
    nonNullable: true,
  });

  protected readonly archivedName = new FormControl(
    { value: 'Legacy intake form', disabled: true },
    { nonNullable: true },
  );

  private readonly couponPrefixSuffix = /^[A-Z0-9]+-[A-Z0-9]+$/i;

  private readonly starter = {
    inviteEmail: '',
    coupon: 'notvalidcoupon',
    projectCode: 'ab',
    slotName: 'x',
    subdomain: 'finance-apac',
  } as const;

  protected readonly draftForm = new FormGroup({
    inviteEmail: new FormControl(this.starter.inviteEmail, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    coupon: new FormControl(this.starter.coupon, {
      nonNullable: true,
      validators: [
        (c: AbstractControl<string>): ValidationErrors | null => {
          const raw = (c.value ?? '').trim();
          if (!raw.length) return null;
          return this.couponPrefixSuffix.test(raw) ? null : { pattern: true };
        },
      ],
    }),
    projectCode: new FormControl(this.starter.projectCode, {
      nonNullable: true,
      validators: [Validators.minLength(4)],
    }),
    slotName: new FormControl(this.starter.slotName, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    subdomain: new FormControl(this.starter.subdomain, {
      nonNullable: true,
    }),
  });

  protected toggleManualError(): void {
    this.manualError = this.manualError.trim()
      ? ''
      : 'That subdomain is already provisioned elsewhere. Pick a different slug.';
    this.saveNotice.set('');
  }

  protected discard(): void {
    this.manualError = '';
    this.saveNotice.set('');
    this.draftForm.reset({ ...this.starter });
    this.workspaceId.patchValue('ws_29M4LX8');
  }

  protected onSubmit(): void {
    this.saveNotice.set('');
    this.draftForm.markAllAsTouched();

    if (this.manualError.trim()) {
      return;
    }

    if (this.draftForm.invalid) {
      return;
    }

    this.saveNotice.set('Draft validates — controls would POST in a wired application.');
  }
}
```

## Form composition
```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-text-profile-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TextComponent],
  template: `
    <form
      [formGroup]="form"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
    >
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-text
          label="First name"
          placeholder="Enter first name"
          formControlName="firstName"
          helpText="Required for the public profile."
        />
        <ui-text
          label="Last name"
          placeholder="Enter last name"
          formControlName="lastName"
          helpText="Required for the public profile."
        />
      </div>

      <ui-text
        label="Job title"
        placeholder="Enter job title"
        formControlName="jobTitle"
        helpText="Shown in directory cards and mentions."
      />

      <ui-text
        label="Internal nickname"
        placeholder="Optional short label"
        formControlName="nickname"
        inputVariant="filled-gray"
        [showClearButton]="true"
        helpText="Used only inside admin and support views."
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="form.invalid"
          >Save profile</ui-button
        >
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="form.reset(defaults)"
        >
          Reset
        </ui-button>
      </div>
    </form>
  `,
})
export class TextProfileFormExampleComponent {
  protected readonly defaults = {
    firstName: 'Alicia',
    lastName: 'Carter',
    jobTitle: 'Enterprise Customer Success Lead',
    nickname: 'AC',
  };

  protected readonly form = new FormGroup({
    firstName: new FormControl(this.defaults.firstName, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl(this.defaults.lastName, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    jobTitle: new FormControl(this.defaults.jobTitle, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    nickname: new FormControl(this.defaults.nickname, {
      nonNullable: true,
    }),
  });
}
```

## Accessibility

### Accessible name
The input uses `ariaLabel` when provided; otherwise it falls back to the visible `label`. If both are empty, no fallback name is invented, so visible labeling should remain the default pattern.

| Source | Accessible name |
| --- | --- |
| `ariaLabel` | explicit accessible name |
| visible `label` | default fallback |
| placeholder | not a label substitute |

### Keyboard
| Key | Action |
| --- | --- |
| `Tab` | moves focus to or from the field |
| standard text editing keys | handled by the native text input |
| `Escape` / `Enter` | no custom component behavior is added |

### Descriptions, errors, and validation
Helper text and error text are wired into `aria-describedby`. When an error is present, helper text is suppressed and the error message becomes the active description.

| State | Attribute |
| --- | --- |
| helper or error text | `aria-describedby` |
| visible error | `aria-invalid="true"` |
| required field | native `required` |

With `autoValidation`, Angular form control errors can populate the field message automatically.
