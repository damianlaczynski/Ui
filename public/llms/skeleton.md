# Skeleton

Skeleton renders simple loading placeholders with shape, animation, dimensions, and optional custom radius. Build shells that match the final layout closely so loading feels stable rather than jumpy.

## Import
```ts
import { SkeletonComponent } from 'ui';
```

## Basic text lines
```ts
import { Component } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-basic-example',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem">
      <ui-skeleton width="11rem" height="1.5rem" ariaLabel="Loading section title" />
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading paragraph line 1" />
        <ui-skeleton width="92%" height="0.875rem" ariaLabel="Loading paragraph line 2" />
        <ui-skeleton width="74%" height="0.875rem" ariaLabel="Loading paragraph line 3" />
      </div>
    </div>
  `,
})
export class SkeletonBasicExampleComponent {}
```

## Shapes and dimensions
```ts
import { Component } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-shapes-example',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1rem;width:100%"
    >
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Rounded text block</div>
        <ui-skeleton width="100%" height="4.5rem" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Circular avatar</div>
        <ui-skeleton shape="circular" width="4rem" height="4rem" ariaLabel="Loading avatar" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Square tile</div>
        <ui-skeleton shape="square" width="5rem" height="5rem" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.8125rem;font-weight:600">Custom radius</div>
        <ui-skeleton width="100%" height="4.5rem" borderRadius="1.25rem" />
      </div>
    </div>
  `,
})
export class SkeletonShapesExampleComponent {}
```

## Animated and static
```ts
import { Component } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-animation-example',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
      >
        <div style="font-size:0.8125rem;font-weight:600">Animated shimmer</div>
        <ui-skeleton width="8rem" height="1rem" />
        <ui-skeleton width="100%" height="0.875rem" />
        <ui-skeleton width="88%" height="0.875rem" />
      </div>
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
      >
        <div style="font-size:0.8125rem;font-weight:600">Static placeholder</div>
        <ui-skeleton width="8rem" height="1rem" [animated]="false" />
        <ui-skeleton width="100%" height="0.875rem" [animated]="false" />
        <ui-skeleton width="88%" height="0.875rem" [animated]="false" />
      </div>
    </div>
  `,
})
export class SkeletonAnimationExampleComponent {}
```

## Card shell
```ts
import { Component } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-card-shell-example',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-skeleton
        width="100%"
        height="11rem"
        borderRadius="0.75rem"
        ariaLabel="Loading card image"
      />
      <div style="display:flex;flex-direction:column;gap:0.625rem">
        <ui-skeleton width="65%" height="1.25rem" ariaLabel="Loading card title" />
        <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading card summary line 1" />
        <ui-skeleton width="84%" height="0.875rem" ariaLabel="Loading card summary line 2" />
      </div>
      <div style="display:flex;gap:0.75rem">
        <ui-skeleton
          width="7rem"
          height="2rem"
          borderRadius="9999px"
          ariaLabel="Loading primary action"
        />
        <ui-skeleton
          width="5.5rem"
          height="2rem"
          borderRadius="9999px"
          ariaLabel="Loading secondary action"
        />
      </div>
    </div>
  `,
})
export class SkeletonCardShellExampleComponent {}
```

## List rows and navigation shells
```ts
import { Component } from '@angular/core';
import { SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-list-shell-example',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:36rem">
      @for (row of [1, 2, 3, 4]; track row) {
        <div
          style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:0.875rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-skeleton
            shape="circular"
            width="2.75rem"
            height="2.75rem"
            ariaLabel="Loading list avatar"
          />
          <div style="display:flex;flex-direction:column;gap:0.45rem;min-width:0">
            <ui-skeleton width="42%" height="0.9rem" ariaLabel="Loading row title" />
            <ui-skeleton width="78%" height="0.75rem" ariaLabel="Loading row metadata" />
          </div>
          <div style="display:flex;flex-direction:column;gap:0.45rem;align-items:flex-end">
            <ui-skeleton width="3.25rem" height="0.75rem" [animated]="false" />
            <ui-skeleton
              width="1.25rem"
              height="1.25rem"
              borderRadius="9999px"
              [animated]="false"
            />
          </div>
        </div>
      }
    </div>
  `,
})
export class SkeletonListShellExampleComponent {}
```

## Loading swap pattern
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent, SkeletonComponent } from 'ui';

@Component({
  selector: 'app-skeleton-detail-panel-example',
  standalone: true,
  imports: [ButtonComponent, SkeletonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Customer detail panel</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Toggle between the shell and the resolved content.
          </div>
        </div>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="loading.set(!loading())"
        >
          {{ loading() ? 'Show loaded state' : 'Show loading state' }}
        </ui-button>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @if (loading()) {
          <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
            <ui-skeleton
              shape="circular"
              width="4.5rem"
              height="4.5rem"
              ariaLabel="Loading customer avatar"
            />
            <div style="display:flex;flex:1;flex-direction:column;gap:0.55rem;min-width:14rem">
              <ui-skeleton width="10rem" height="1.15rem" ariaLabel="Loading customer name" />
              <ui-skeleton width="14rem" height="0.85rem" ariaLabel="Loading customer role" />
              <ui-skeleton width="8rem" height="0.85rem" ariaLabel="Loading customer status" />
            </div>
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            @for (metric of [1, 2, 3]; track metric) {
              <div
                style="display:flex;flex-direction:column;gap:0.45rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
              >
                <ui-skeleton width="4.5rem" height="0.75rem" [animated]="false" />
                <ui-skeleton width="6.25rem" height="1.25rem" />
              </div>
            }
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem">
            <ui-skeleton width="100%" height="0.875rem" ariaLabel="Loading activity line 1" />
            <ui-skeleton width="94%" height="0.875rem" ariaLabel="Loading activity line 2" />
            <ui-skeleton width="76%" height="0.875rem" ariaLabel="Loading activity line 3" />
          </div>
        } @else {
          <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
            <div
              style="display:grid;place-items:center;width:4.5rem;height:4.5rem;border-radius:9999px;background:color-mix(in srgb, var(--color-brand-primary) 14%, transparent);font-size:1.125rem;font-weight:700;color:var(--color-brand-primary)"
            >
              AC
            </div>
            <div style="display:flex;flex:1;flex-direction:column;gap:0.35rem;min-width:14rem">
              <div style="font-size:1rem;font-weight:600">Alicia Carter</div>
              <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
                Enterprise Customer Success Lead
              </div>
              <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                Last activity 12 minutes ago
              </div>
            </div>
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                Open renewals
              </div>
              <div style="font-size:1.125rem;font-weight:600">3</div>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                Health score
              </div>
              <div style="font-size:1.125rem;font-weight:600">82 / 100</div>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.35rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">ARR</div>
              <div style="font-size:1.125rem;font-weight:600">$148,000</div>
            </div>
          </div>
          <div
            style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.55"
          >
            <div>Customer requested a rollout timeline for the Q3 permissions update.</div>
            <div style="color:var(--color-neutral-foreground2-rest)">
              Next recommended step: schedule a migration review with IT and procurement this week.
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class SkeletonDetailPanelExampleComponent {
  protected readonly loading = signal(true);
}
```

## Accessibility

### Role and status
`SkeletonComponent` renders with `role="status"` and `aria-busy="true"` so assistive technologies can treat the placeholder as loading feedback.

### Accessible name and busy regions
Use `ariaLabel` when the default loading label is too generic for the surrounding context. For example, a profile shell can announce `Loading customer profile` instead of a generic loading message.

| Pattern | Guidance |
| --- | --- |
| loading section | keep the containing region marked busy |
| longer wait | pair the shell with nearby loading text |
| decorative placeholder only | do not treat the skeleton as final content |

### Applicability
Skeleton is not interactive, so there is no keyboard section. Do not add extra ARIA roles that imply a control; keep it as loading status only.
