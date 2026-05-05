# Divider

Divider renders a semantic separator with horizontal or vertical orientation, optional text, and configurable text alignment. It should support layout comprehension quietly rather than become a visual focal point.

## Import
```ts
import { DividerComponent } from 'ui';
```

## Basic separators
```ts
import { Component } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-basic-example',
  standalone: true,
  imports: [DividerComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;min-width:16rem;"
    >
      <div style="font-size:0.875rem">Overview section</div>
      <ui-divider />
      <div style="font-size:0.875rem">Details section</div>
      <ui-divider text="Section break" />
      <div style="font-size:0.875rem">Follow-up section</div>
    </div>
  `,
})
export class DividerBasicExampleComponent {}
```

## Horizontal and vertical orientation
```ts
import { Component } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-orientation-example',
  standalone: true,
  imports: [DividerComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1.5rem;width:100%"
    >
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.8125rem;font-weight:600">Horizontal</div>
        <div style="font-size:0.875rem">Title</div>
        <ui-divider text="Details" />
        <div style="font-size:0.875rem">Metadata and notes</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.8125rem;font-weight:600">Vertical</div>
        <div style="display:flex;align-items:center;gap:1rem;height:5rem">
          <span style="font-size:0.875rem">Created</span>
          <ui-divider orientation="vertical" text="Info" />
          <span style="font-size:0.875rem">Updated</span>
        </div>
      </div>
    </div>
  `,
})
export class DividerOrientationExampleComponent {}
```

## Text alignment
```ts
import { Component } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-alignment-example',
  standalone: true,
  imports: [DividerComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem;min-width:16rem;"
    >
      <ui-divider alignment="start" text="Start aligned" />
      <ui-divider alignment="center" text="Center aligned" />
      <ui-divider alignment="end" text="End aligned" />
    </div>
  `,
})
export class DividerAlignmentExampleComponent {}
```

## Alternative path split
```ts
import { Component } from '@angular/core';
import { ButtonComponent, DividerComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-divider-auth-split-example',
  standalone: true,
  imports: [ButtonComponent, DividerComponent, TextComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;min-width:16rem;"
    >
      <ui-button variant="primary" [fullWidth]="true">Continue with Microsoft</ui-button>
      <ui-divider text="OR" />
      <ui-text
        label="Work email"
        placeholder="name@company.com"
        helpText="We will send a secure sign-in link."
      />
      <ui-button variant="secondary" appearance="outline" [fullWidth]="true">
        Send magic link
      </ui-button>
    </div>
  `,
})
export class DividerAuthSplitExampleComponent {}
```

## Sectioned panels
```ts
import { Component } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-panel-sections-example',
  standalone: true,
  imports: [DividerComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.9375rem;font-weight:600">Customer health summary</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last reviewed 12 minutes ago
        </div>
      </div>

      <ui-divider text="Signals" alignment="start" />
      <div style="font-size:0.875rem;line-height:1.55">
        Renewal confidence fell after legal review was delayed by two weeks.
      </div>

      <ui-divider text="Recommended action" alignment="start" />
      <div style="font-size:0.875rem;line-height:1.55">
        Book a procurement follow-up with finance and legal before the Friday checkpoint.
      </div>
    </div>
  `,
})
export class DividerPanelSectionsExampleComponent {}
```

## Toolbar and metadata grouping
```ts
import { Component } from '@angular/core';
import { ButtonComponent, DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-toolbar-grouping-example',
  standalone: true,
  imports: [ButtonComponent, DividerComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;width:100%;max-width:40rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem"
    >
      <ui-button appearance="outline">Undo</ui-button>
      <ui-button appearance="outline">Redo</ui-button>
      <div style="height:1.75rem">
        <ui-divider orientation="vertical" ariaLabel="Editing actions divider" />
      </div>
      <ui-button appearance="outline">Assign owner</ui-button>
      <ui-button appearance="outline">Add tag</ui-button>
      <div style="height:1.75rem">
        <ui-divider orientation="vertical" ariaLabel="Metadata actions divider" />
      </div>
      <ui-button variant="primary">Publish</ui-button>
    </div>
  `,
})
export class DividerToolbarGroupingExampleComponent {}
```

## Accessibility

### Role and orientation
`DividerComponent` renders with `role="separator"` and exposes `aria-orientation` so assistive technologies understand whether it separates horizontal or vertical content.

### Accessible label
If `ariaLabel` is provided, it is used directly. Otherwise the component falls back to divider text when present, or to a generic localized divider label.

### Applicability
Divider is purely structural and not interactive, so there is no keyboard section. Add visible text only when it adds meaning, not as decoration.
