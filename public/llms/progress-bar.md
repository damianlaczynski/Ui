# Progress Bar

Progress Bar renders a compact linear indicator with semantic variants, three sizes, and determinate or indeterminate behavior. Pair it with nearby text so users understand what is progressing and what happens next.

## Import
```ts
import { ProgressBarComponent } from 'ui';
```

## Basic determinate progress
```ts
import { Component } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-basic-example',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:100%;max-width:28rem">
      <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
        <span style="font-weight:600">Uploading contract.pdf</span>
        <span>64%</span>
      </div>
      <ui-progress-bar
        variant="primary"
        size="medium"
        type="determinate"
        [value]="64"
        ariaLabel="Uploading contract.pdf"
        ariaValueText="64 percent uploaded"
      />
    </div>
  `,
})
export class ProgressBarBasicExampleComponent {}
```

## Determinate and indeterminate states
```ts
import { Component } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-states-example',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem">
      <div style="display:flex;flex-direction:column;gap:0.45rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
          <span style="font-weight:600">Processing invoice batch</span>
          <span>Step 2 of 4</span>
        </div>
        <ui-progress-bar
          variant="info"
          type="determinate"
          [value]="48"
          ariaLabel="Processing invoice batch"
          ariaValueText="Step 2 of 4, 48 percent complete"
        />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.45rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
          <span style="font-weight:600">Waiting for antivirus scan</span>
          <span>Unknown duration</span>
        </div>
        <ui-progress-bar
          variant="secondary"
          type="indeterminate"
          ariaLabel="Waiting for antivirus scan"
          ariaValueText="Scan in progress"
        />
      </div>
    </div>
  `,
})
export class ProgressBarStatesExampleComponent {}
```

## Sizes and density
```ts
import { Component } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-sizes-example',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Small for dense rows</div>
        <ui-progress-bar size="small" [value]="32" ariaLabel="Dense row completion" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Medium for standard panels</div>
        <ui-progress-bar size="medium" [value]="58" ariaLabel="Panel completion" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Large for prominent status areas</div>
        <ui-progress-bar size="large" [value]="84" ariaLabel="Prominent completion status" />
      </div>
    </div>
  `,
})
export class ProgressBarSizesExampleComponent {}
```

## Semantic variants
```ts
import { Component } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-variants-example',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.9rem;width:100%;max-width:32rem">
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Sync in progress</span>
          <span>35%</span>
        </div>
        <ui-progress-bar variant="primary" [value]="35" ariaLabel="Sync in progress" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Review completed</span>
          <span>100%</span>
        </div>
        <ui-progress-bar variant="success" [value]="100" ariaLabel="Review completed" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Storage limit approaching</span>
          <span>91%</span>
        </div>
        <ui-progress-bar variant="warning" [value]="91" ariaLabel="Storage limit approaching" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Import failed</span>
          <span>47%</span>
        </div>
        <ui-progress-bar variant="danger" [value]="47" ariaLabel="Import failed" />
      </div>
    </div>
  `,
})
export class ProgressBarVariantsExampleComponent {}
```

## Upload queue pattern
```ts
import { Component } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-upload-queue-example',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap"
      >
        <div style="display:flex;flex-direction:column;gap:0.2rem">
          <div style="font-size:0.9375rem;font-weight:600">Upload queue</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            3 files active, 1 waiting for validation
          </div>
        </div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          8.4 MB / 12 MB
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.875rem">
        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">hero-banner.png</span>
            <span>82%</span>
          </div>
          <ui-progress-bar
            variant="primary"
            [value]="82"
            ariaLabel="Uploading hero-banner.png"
            ariaValueText="82 percent uploaded"
          />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">quarterly-report.pdf</span>
            <span>Processing</span>
          </div>
          <ui-progress-bar
            variant="info"
            type="indeterminate"
            ariaLabel="Processing quarterly-report.pdf"
            ariaValueText="File uploaded, processing in progress"
          />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
            <span style="font-weight:600">avatar-export.zip</span>
            <span>Failed at 41%</span>
          </div>
          <ui-progress-bar
            variant="danger"
            [value]="41"
            ariaLabel="Upload failed for avatar-export.zip"
            ariaValueText="Upload failed at 41 percent"
          />
        </div>
      </div>
    </div>
  `,
})
export class ProgressBarUploadQueueExampleComponent {}
```

## Task flow with actions
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent, ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-task-flow-example',
  standalone: true,
  imports: [ButtonComponent, ProgressBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem">
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div
          style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <div style="font-size:0.9375rem;font-weight:600">Workspace migration</div>
            <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
              {{ statusText() }}
            </div>
          </div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            {{ currentStepLabel() }}
          </div>
        </div>

        <ui-progress-bar
          [variant]="currentVariant()"
          [type]="currentType()"
          [value]="currentValue()"
          size="large"
          ariaLabel="Workspace migration"
          [ariaValueText]="currentAriaValueText()"
        />

        <div
          style="display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:0.75rem"
        >
          @for (step of steps; track step.label) {
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                {{ step.label }}
              </div>
              <div style="font-size:0.875rem;font-weight:600">{{ step.value }}</div>
            </div>
          }
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
        >
          <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
            Reset
          </ui-button>
          <ui-button
            type="button"
            variant="primary"
            (click)="advance()"
            [disabled]="state() === 'done'"
          >
            Advance
          </ui-button>
          <ui-button
            type="button"
            variant="danger"
            appearance="outline"
            (click)="fail()"
            [disabled]="state() === 'failed'"
          >
            Mark failed
          </ui-button>
        </div>
      </div>
    </div>
  `,
})
export class ProgressBarTaskFlowExampleComponent {
  protected readonly state = signal<'queued' | 'running' | 'verifying' | 'done' | 'failed'>(
    'queued',
  );

  protected readonly steps = [
    { label: 'Content', value: '124 files' },
    { label: 'Permissions', value: '18 groups' },
    { label: 'Verification', value: 'Pending' },
  ];

  protected readonly statusText = () => {
    switch (this.state()) {
      case 'queued':
        return 'Queued and waiting for a migration slot.';
      case 'running':
        return 'Files are moving to the new workspace.';
      case 'verifying':
        return 'Migration finished. Running permission and link checks.';
      case 'done':
        return 'Migration completed successfully.';
      case 'failed':
        return 'Migration stopped. Review logs before retrying.';
    }
  };

  protected readonly currentStepLabel = () => {
    switch (this.state()) {
      case 'queued':
        return 'Step 1 of 3';
      case 'running':
        return 'Step 2 of 3';
      case 'verifying':
        return 'Step 3 of 3';
      case 'done':
        return 'Completed';
      case 'failed':
        return 'Attention needed';
    }
  };

  protected readonly currentType = () =>
    this.state() === 'queued' ? 'indeterminate' : 'determinate';

  protected readonly currentVariant = () => {
    switch (this.state()) {
      case 'done':
        return 'success';
      case 'failed':
        return 'danger';
      case 'verifying':
        return 'info';
      default:
        return 'primary';
    }
  };

  protected readonly currentValue = () => {
    switch (this.state()) {
      case 'queued':
        return 0;
      case 'running':
        return 52;
      case 'verifying':
        return 88;
      case 'done':
        return 100;
      case 'failed':
        return 52;
    }
  };

  protected readonly currentAriaValueText = () => {
    switch (this.state()) {
      case 'queued':
        return 'Waiting to start';
      case 'running':
        return 'Step 2 of 3, 52 percent complete';
      case 'verifying':
        return 'Step 3 of 3, verification in progress';
      case 'done':
        return 'Migration completed';
      case 'failed':
        return 'Migration failed during transfer';
    }
  };

  protected advance(): void {
    switch (this.state()) {
      case 'queued':
        this.state.set('running');
        break;
      case 'running':
        this.state.set('verifying');
        break;
      case 'verifying':
        this.state.set('done');
        break;
      default:
        break;
    }
  }

  protected fail(): void {
    this.state.set('failed');
  }

  protected reset(): void {
    this.state.set('queued');
  }
}
```

## Accessibility

### Role and value
`ProgressBarComponent` renders with `role="progressbar"`. In determinate mode it exposes `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`; in indeterminate mode those numeric value attributes are omitted.

| Mode | Accessibility behavior |
| --- | --- |
| determinate | exposes current value and range |
| indeterminate | omits numeric value attributes |

### Accessible name
Use `ariaLabel` to describe what is progressing, for example `Uploading contract.pdf` or `Storage usage`. The default label is only a generic fallback.

### Value text
Use `ariaValueText` when percent alone is not enough, such as `Step 2 of 4`, `3 files remaining`, or `Waiting for virus scan`.

| State | Attribute / guidance |
| --- | --- |
| current progress | `aria-valuenow` when determinate |
| min / max | `aria-valuemin` and `aria-valuemax` |
| richer wording | `aria-valuetext` or adjacent status text |
