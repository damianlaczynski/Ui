# Tooltip

Tooltip is exposed as a standalone directive applied to an existing trigger element. It supports placement, size, show delay, optional arrow rendering, disabled mode, and an accessibility relationship that can behave as a description or as the element label.

## Import
```ts
import { TooltipDirective } from 'ui';
```

## Basic usage
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-basic-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;width:100%;max-width:32rem">
      <ui-button
        type="button"
        variant="primary"
        uiTooltip="Creates a draft issue and opens it in the editor."
      >
        New issue
      </ui-button>

      <ui-button
        type="button"
        variant="secondary"
        appearance="outline"
        uiTooltip="Exports only the currently filtered rows."
      >
        Export filtered
      </ui-button>
    </div>
  `,
})
export class TooltipBasicExampleComponent {}
```

## Placement and fallback
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-positions-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1rem;width:100%;max-width:36rem"
    >
      <ui-button type="button" appearance="outline" uiTooltip="Appears above the trigger." uiTooltipPosition="top">
        Top
      </ui-button>

      <ui-button type="button" appearance="outline" uiTooltip="Appears below the trigger." uiTooltipPosition="bottom">
        Bottom
      </ui-button>

      <ui-button type="button" appearance="outline" uiTooltip="Appears to the left when space allows." uiTooltipPosition="left">
        Left
      </ui-button>

      <ui-button type="button" appearance="outline" uiTooltip="Appears to the right when space allows." uiTooltipPosition="right">
        Right
      </ui-button>
    </div>
  `,
})
export class TooltipPositionsExampleComponent {}
```

## Sizes, delays, and arrow
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-sizes-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;width:100%;max-width:40rem">
      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Compact hint"
        uiTooltipSize="small"
      >
        Small
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Balanced default tooltip for most interface hints."
        uiTooltipSize="medium"
      >
        Medium
      </ui-button>

      <ui-button
        type="button"
        appearance="outline"
        uiTooltip="Longer tooltip text can wrap to multiple lines when the message still stays short, supporting, and easy to scan."
        uiTooltipSize="large"
        [uiTooltipDelay]="600"
        [uiTooltipWithArrow]="false"
      >
        Large, delayed, no arrow
      </ui-button>
    </div>
  `,
})
export class TooltipSizesExampleComponent {}
```

## Accessible relationship
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-relationship-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:34rem">
      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Description relationship</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Visible label stays primary, tooltip adds supporting context.
        </div>
        <ui-button
          type="button"
          appearance="outline"
          uiTooltip="Runs only checks impacted by files changed in the current branch."
          uiTooltipRelationship="description"
        >
          Smart test run
        </ui-button>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Label relationship</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Use only when the trigger itself does not expose a sufficient accessible name.
        </div>
        <ui-button
          type="button"
          icon="info"
          shape="circular"
          appearance="subtle"
          uiTooltip="Billing policy details"
          uiTooltipRelationship="label"
        ></ui-button>
      </div>
    </div>
  `,
})
export class TooltipRelationshipExampleComponent {}
```

## Toolbar and compact actions
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-toolbar-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="font-size:0.875rem;font-weight:600">Compact editor toolbar</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
        <ui-button type="button" icon="text_bold" shape="square" appearance="subtle" uiTooltip="Bold" uiTooltipRelationship="label"></ui-button>
        <ui-button type="button" icon="text_italic" shape="square" appearance="subtle" uiTooltip="Italic" uiTooltipRelationship="label"></ui-button>
        <ui-button type="button" icon="link" shape="square" appearance="subtle" uiTooltip="Insert link" uiTooltipRelationship="label"></ui-button>
        <ui-button type="button" icon="image" shape="square" appearance="subtle" uiTooltip="Insert image" uiTooltipRelationship="label"></ui-button>
        <ui-button type="button" icon="code" shape="square" appearance="subtle" uiTooltip="Code block" uiTooltipRelationship="label"></ui-button>
      </div>
    </div>
  `,
})
export class TooltipToolbarExampleComponent {}
```

## Metadata in dense data views
```ts
import { Component } from '@angular/core';
import { ButtonComponent, TooltipDirective } from 'ui';

@Component({
  selector: 'app-tooltip-data-table-example',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.5rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;padding-bottom:0.5rem;border-bottom:1px solid var(--color-neutral-stroke-rest);font-size:0.75rem;font-weight:600;color:var(--color-neutral-foreground2-rest);text-transform:uppercase;letter-spacing:0.03em"
      >
        <div>Job</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;align-items:center;padding:0.5rem 0"
      >
        <div>Nightly billing sync</div>
        <div
          style="display:inline-flex;align-items:center;gap:0.375rem"
          uiTooltip="Completed 8 minutes ago. Duration: 2m 14s."
        >
          <span style="width:0.5rem;height:0.5rem;border-radius:999px;background:#107c10"></span>
          <span>Healthy</span>
        </div>
        <ui-button
          type="button"
          icon="info"
          shape="circular"
          appearance="subtle"
          uiTooltip="Last payload contained 1,248 records with no retries."
          uiTooltipRelationship="label"
        ></ui-button>
      </div>

      <div
        style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(8rem,0.9fr) auto;gap:0.75rem;align-items:center;padding:0.5rem 0"
      >
        <div>Region cache warmup</div>
        <div
          style="display:inline-flex;align-items:center;gap:0.375rem"
          uiTooltip="Retry 2 of 3. Temporary network timeout on the edge worker."
        >
          <span style="width:0.5rem;height:0.5rem;border-radius:999px;background:#d83b01"></span>
          <span>Attention</span>
        </div>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          uiTooltip="Opens the incident timeline in a side panel."
        >
          Inspect
        </ui-button>
      </div>
    </div>
  `,
})
export class TooltipDataTableExampleComponent {}
```

## Accessibility

### Description versus label
By default the directive sets `aria-describedby`, which is the right choice when the trigger already has a visible label and the tooltip adds supporting context. Use `uiTooltipRelationship="label"` only when the tooltip should act as the accessible name.

| Relationship | Behavior |
| --- | --- |
| `description` | adds tooltip text as supplemental context |
| `label` | uses tooltip text as the accessible name |
| disabled tooltip | no overlay and no relationship wiring |

### Keyboard access
The directive listens to both hover and focus, so keyboard users can reveal the tooltip when the trigger itself is focusable.

| Trigger state | Result |
| --- | --- |
| hover | tooltip opens after the configured delay |
| focus | tooltip opens for keyboard users |
| blur / mouse leave | tooltip closes |

Do not rely on tooltip text for information that is required before the trigger can be understood or used.

### Tooltip role
The overlay renders with `role="tooltip"`. Keep content short, plain, and non-interactive so it behaves like a tooltip rather than a popover or inline help panel.
