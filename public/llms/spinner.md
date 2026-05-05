# Spinner

Use `labelPosition="none"` for icon-only chrome and set `ariaLabel` to describe the wait. Turn on `label` with a position when the spinner substitutes for a block of content. `variant` and `size` follow the same tokens as buttons so loading states stay visually aligned with surrounding actions.

## Import
```ts
import { SpinnerComponent } from 'ui';
```

## Label and aria
```ts
import { Component } from '@angular/core';
import { SpinnerComponent } from 'ui';

@Component({
  selector: 'app-spinner-basic-example',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
        <ui-spinner labelPosition="none" ariaLabel="Refreshing issues list" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          label off · ariaLabel only
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
        <ui-spinner
          labelPosition="below"
          label="Loading workspace"
          ariaLabel="Loading workspace"
        />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          visible label + matching aria
        </span>
      </div>
    </div>
  `,
})
export class SpinnerBasicExampleComponent {}
```

## Variant and size
```ts
import { Component } from '@angular/core';
import { ExtendedSize, SpinnerComponent, Variant } from 'ui';

@Component({
  selector: 'app-spinner-semantics-example',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
        @for (variant of variants; track variant) {
          <ui-spinner [variant]="variant" size="medium" ariaLabel="Loading" />
        }
      </div>
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-spinner variant="primary" [size]="size" ariaLabel="Loading" />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{ size }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class SpinnerSemanticsExampleComponent {
  protected readonly variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

  protected readonly sizes: ExtendedSize[] = ['extra-small', 'medium', 'extra-large'];
}
```

## Label placement
```ts
import { Component } from '@angular/core';
import { ContentPosition, SpinnerComponent } from 'ui';

@Component({
  selector: 'app-spinner-label-positions-example',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1.25rem;align-items:center"
    >
      @for (position of positions; track position) {
        <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{ position }}</span>
          <ui-spinner
            size="small"
            variant="secondary"
            [labelPosition]="position"
            label="Syncing"
            ariaLabel="Syncing changes"
          />
        </div>
      }
    </div>
  `,
})
export class SpinnerLabelPositionsExampleComponent {
  protected readonly positions: Exclude<ContentPosition, 'none'>[] = [
    'before',
    'after',
    'above',
    'below',
  ];
}
```

## Primary action with wait
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent, SpinnerComponent } from 'ui';

@Component({
  selector: 'app-spinner-save-action-example',
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button type="button" variant="primary" [disabled]="saving()" (click)="runSave()">
        Save draft
      </ui-button>
      @if (saving()) {
        <ui-spinner
          size="small"
          variant="secondary"
          labelPosition="after"
          label="Saving…"
          ariaLabel="Saving draft"
        />
      }
    </div>
  `,
})
export class SpinnerSaveActionExampleComponent {
  protected readonly saving = signal(false);

  protected runSave(): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    window.setTimeout(() => this.saving.set(false), 2000);
  }
}
```

## Section placeholder
```ts
import { Component } from '@angular/core';
import { SpinnerComponent } from 'ui';

@Component({
  selector: 'app-spinner-section-loader-example',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div
      style="display:flex;min-height:10.5rem;align-items:center;justify-content:center;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background1-rest);min-width:16rem;"
    >
      <ui-spinner
        size="large"
        variant="primary"
        labelPosition="below"
        label="Fetching board"
        ariaLabel="Fetching board"
      />
    </div>
  `,
})
export class SpinnerSectionLoaderExampleComponent {}
```

## Accessibility

### Status and name
Root uses `role="status"` with `aria-label` from `ariaLabel` or the shared i18n loading string. Prefer an explicit `ariaLabel` that names the task, such as `Saving draft` or `Fetching board`, instead of repeating the word loading everywhere.

### Visible label and busy context
Optional `label` text is visual only; it is not automatically referenced from `aria-labelledby`. Keep `ariaLabel` consistent with the caption when both are present.

| Pattern | Guidance |
| --- | --- |
| inline wait | nearby context may already explain the task |
| longer region load | pair spinner with status text or a busy container |
| keyboard | spinner is not interactive and should not be focusable |
