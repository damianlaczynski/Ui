# Rating

Bind `value` and listen to `valueChange`, cap the scale with `max`, toggle `readOnly` when the score is informational, and use `showValue` when the numeric ratio should stay visible beside the stars. `ariaLabel` and the two formatter inputs localize copy without reimplementing the control.

## Import
```ts
import { RatingComponent } from 'ui';
```

## Controlled value
```ts
import { Component, signal } from '@angular/core';
import { RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-basic-example',
  standalone: true,
  imports: [RatingComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start">
      <ui-rating [value]="value()" [max]="5" [showValue]="true" (valueChange)="value.set($event)" />
      <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current value {{ value() }} of 5
      </span>
    </div>
  `,
})
export class RatingBasicExampleComponent {
  protected readonly value = signal(3);
}
```

## Density and modes
```ts
import { Component, signal } from '@angular/core';
import { RatingComponent, Size } from 'ui';

@Component({
  selector: 'app-rating-sizes-states-example',
  standalone: true,
  imports: [RatingComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;min-width:7rem">
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{
              size
            }}</span>
            <ui-rating [value]="3" [size]="size" [readOnly]="true" [showValue]="false" />
          </div>
        }
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Editable</span
          >
          <ui-rating [value]="editable()" [showValue]="true" (valueChange)="editable.set($event)" />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Read-only</span
          >
          <ui-rating [value]="4" [readOnly]="true" [showValue]="true" />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Disabled</span
          >
          <ui-rating [value]="3" [disabled]="true" [showValue]="true" />
        </div>
      </div>
    </div>
  `,
})
export class RatingSizesStatesExampleComponent {
  protected readonly sizes: Size[] = ['small', 'medium', 'large'];

  protected readonly editable = signal(2);
}
```

## Scale and published scores
```ts
import { Component, signal } from '@angular/core';
import { RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-scale-example',
  standalone: true,
  imports: [RatingComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1.25rem">
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:10rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Five stars</span
          >
          <ui-rating
            [value]="shortScale()"
            [max]="5"
            [showValue]="true"
            (valueChange)="shortScale.set($event)"
          />
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:10rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Ten stars</span
          >
          <ui-rating
            [value]="longScale()"
            [max]="10"
            [showValue]="true"
            (valueChange)="longScale.set($event)"
          />
        </div>
      </div>
      <div style="padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)">
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
          >Published aggregate</span
        >
        <div style="margin-top:0.35rem">
          <ui-rating [value]="8" [max]="10" [readOnly]="true" [showValue]="true" />
        </div>
      </div>
    </div>
  `,
})
export class RatingScaleExampleComponent {
  protected readonly shortScale = signal(4);

  protected readonly longScale = signal(7);
}
```

## Names and formatters
```ts
import { Component, signal } from '@angular/core';
import { RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-labels-example',
  standalone: true,
  imports: [RatingComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:26rem">
      <ui-rating
        [value]="value()"
        [max]="5"
        [showValue]="true"
        ariaLabel="Overall satisfaction with this onboarding"
        [starAriaLabelFormatter]="starLabel"
        [currentValueAriaLabelFormatter]="summaryLabel"
        (valueChange)="value.set($event)"
      />
      <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Group and star labels override defaults for product copy or i18n.
      </span>
    </div>
  `,
})
export class RatingLabelsExampleComponent {
  protected readonly value = signal(0);

  protected readonly starLabel = (star: number, max: number) =>
    `Set satisfaction to ${star} out of ${max}`;

  protected readonly summaryLabel = (v: number, max: number) =>
    v === 0 ? `Satisfaction not chosen, scale is ${max} stars` : `Satisfaction ${v} out of ${max}`;
}
```

## Listing row
```ts
import { Component } from '@angular/core';
import { ButtonComponent, RatingComponent } from 'ui';

@Component({
  selector: 'app-rating-listing-snapshot-example',
  standalone: true,
  imports: [ButtonComponent, RatingComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
    >
      <div style="display:flex;flex-direction:column;gap:0.2rem;min-width:12rem">
        <span style="font-size:0.9375rem;font-weight:600">Weekly digest template</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Workflow · 128 ratings
        </span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
        <ui-rating [value]="4" [max]="5" [readOnly]="true" size="small" />
        <ui-button type="button" variant="secondary" appearance="outline">Use template</ui-button>
      </div>
    </div>
  `,
})
export class RatingListingSnapshotExampleComponent {}
```

## Feedback form
```ts
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, RatingComponent, TextareaComponent } from 'ui';

@Component({
  selector: 'app-rating-review-feedback-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RatingComponent, TextareaComponent],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <span style="font-size:0.875rem;font-weight:600">How was the session?</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Pick a score before sending; comment stays optional.
        </span>
      </div>

      <ui-rating
        [value]="stars()"
        [max]="5"
        [showValue]="true"
        ariaLabel="Rate this session"
        (valueChange)="stars.set($event)"
      />

      <ui-textarea
        label="Optional comment"
        placeholder="What worked or should change next time?"
        formControlName="comment"
        [rows]="3"
      />

      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
        <ui-button type="submit" variant="primary" [disabled]="stars() === 0"
          >Send feedback</ui-button
        >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="clear()">
          Clear
        </ui-button>
      </div>
    </form>
  `,
})
export class RatingReviewFeedbackExampleComponent {
  protected readonly stars = signal(0);

  protected readonly form = new FormGroup({
    comment: new FormControl('', { nonNullable: true }),
  });

  protected submit(): void {
    if (this.stars() === 0) {
      return;
    }
    this.clear();
  }

  protected clear(): void {
    this.stars.set(0);
    this.form.reset({ comment: '' });
  }
}
```

## Accessibility

### Roles and states
Interactive ratings expose `role="radiogroup"` on the root with `aria-disabled` when needed. Stars are `role="radio"` with `aria-checked` reflecting the filled state. Read-only mode uses `role="img"` on the root with `aria-readonly="true"` and static star nodes instead of buttons.

### Names
Set `ariaLabel` for the group when the visible heading alone is insufficient. Per-star labels come from `starAriaLabelFormatter` or i18n defaults. The group label uses `currentValueAriaLabelFormatter` or i18n unless `ariaLabel` is set.

### Keyboard and focus
Arrow keys move between stars, Home selects the first star, End the last, Space and Enter commit the focused star. A single star stays in the tab order at a time via `tabindex` so focus does not walk every glyph.
