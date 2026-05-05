# Accordion

Accordion builds on the design-system `tree-node` header, so it inherits structured header chrome such as icons, chevron placement, selection indicators, quick actions, and tree-style expansion semantics. It is best for grouped content that should stay scannable when collapsed and readable when expanded.

## Import
```ts
import { AccordionComponent } from 'ui';
```

## Basic disclosure
```ts
import { Component } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-basic-example',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:38rem">
      <ui-accordion label="What is included in the Pro plan?">
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Pro includes team workspaces, advanced permissions, export tools, and audit history.
          </p>
          <p style="margin:0;color:var(--color-neutral-foreground2-rest)">
            Use concise headers so users can scan several collapsed sections quickly before opening one.
          </p>
        </div>
      </ui-accordion>

      <ui-accordion label="Can I change billing later?">
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Yes. Billing cadence can be changed from the subscription panel without recreating the workspace.
          </p>
        </div>
      </ui-accordion>
    </div>
  `,
})
export class AccordionBasicExampleComponent {}
```

## Appearance and shape
```ts
import { Component } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-appearance-shape-example',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:48rem">
      <ui-accordion label="Subtle rounded" appearance="subtle" shape="rounded">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Good default for FAQ lists and settings sections.
        </p>
      </ui-accordion>

      <ui-accordion label="Transparent square" appearance="transparent" shape="square">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Useful on dense surfaces where the parent card already defines the boundary.
        </p>
      </ui-accordion>

      <ui-accordion label="Filled rounded" appearance="filled" shape="rounded">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Better when the expanded header should feel more prominent than surrounding text.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionAppearanceShapeExampleComponent {}
```

## Chevron placement and icons
```ts
import { Component } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-chevron-icons-example',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:40rem">
      <ui-accordion
        label="Project summary"
        icon="document"
        chevronPosition="before"
        chevronIconCollapsed="add"
        chevronIconExpanded="subtract"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Custom chevrons can make expansion state feel more tailored, but keep the pattern consistent within one surface.
        </p>
      </ui-accordion>

      <ui-accordion label="Release notes" icon="rocket" chevronPosition="after">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          End-position chevrons work well when the leading side is reserved for status icons.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionChevronIconsExampleComponent {}
```

## Selection indicators
```ts
import { Component } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-indicators-example',
  standalone: true,
  imports: [AccordionComponent],
  template: `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:44rem">
      <ui-accordion
        label="Selected section"
        [showSelectionIndicator]="true"
        indicatorPosition="vertical"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Vertical indicators work well when the accordion behaves like a list of active sections.
        </p>
      </ui-accordion>

      <ui-accordion
        label="Prominent step"
        [showSelectionIndicator]="true"
        indicatorPosition="horizontal"
        appearance="filled"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Horizontal indicators fit better when the header chrome is visually stronger.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionIndicatorsExampleComponent {}
```

## Header quick actions
```ts
import { Component } from '@angular/core';
import { AccordionComponent, ButtonComponent } from 'ui';

@Component({
  selector: 'app-accordion-quick-actions-example',
  standalone: true,
  imports: [AccordionComponent, ButtonComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Deployment checklist</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Quick actions are useful when users need header-level commands like edit, duplicate, or remove without opening every section first.
        </div>
      </div>

      <ui-accordion
        label="Production rollout"
        icon="rocket"
        [showQuickActions]="true"
        [quickActionsTemplate]="actions"
      >
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Confirm approvers, release notes, and rollback contacts before enabling the final rollout step.
          </p>
        </div>
      </ui-accordion>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">Last action</span>
        <strong style="font-size:0.875rem">{{ lastAction }}</strong>
      </div>

      <ng-template #actions>
        <div style="display:flex;gap:0.375rem;align-items:center">
          <ui-button
            type="button"
            variant="secondary"
            size="small"
            appearance="outline"
            (click)="setAction('Edited'); $event.stopPropagation()"
          >
            Edit
          </ui-button>
          <ui-button
            type="button"
            variant="secondary"
            size="small"
            appearance="outline"
            (click)="setAction('Removed'); $event.stopPropagation()"
          >
            Remove
          </ui-button>
        </div>
      </ng-template>
    </div>
  `,
})
export class AccordionQuickActionsExampleComponent {
  protected lastAction = 'None';

  protected setAction(action: string): void {
    this.lastAction = action;
  }
}
```

## Form composition
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionComponent,
  ButtonComponent,
  CheckboxComponent,
  SwitchComponent,
  TextComponent,
} from 'ui';

@Component({
  selector: 'app-accordion-settings-form-example',
  standalone: true,
  imports: [
    FormsModule,
    AccordionComponent,
    ButtonComponent,
    CheckboxComponent,
    SwitchComponent,
    TextComponent,
  ],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Notification settings</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          A practical accordion often groups related form controls into compact sections instead of acting as a purely decorative disclosure.
        </div>
      </div>

      <ui-accordion label="Delivery channels" icon="mail">
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <ui-switch
            label="Email updates"
            [(ngModel)]="emailUpdates"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-switch
            label="Push alerts"
            [(ngModel)]="pushAlerts"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-checkbox
            label="Digest only"
            [(ngModel)]="digestOnly"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </ui-accordion>

      <ui-accordion label="Escalation details" icon="person">
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <ui-text
            label="Owner"
            placeholder="Enter owner"
            [(ngModel)]="owner"
            [ngModelOptions]="{ standalone: true }"
          />
          <ui-text
            label="Fallback contact"
            placeholder="Enter fallback contact"
            [(ngModel)]="fallbackContact"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </ui-accordion>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-button type="button" variant="primary">Save settings</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary }}
        </span>
      </div>
    </div>
  `,
})
export class AccordionSettingsFormExampleComponent {
  protected emailUpdates = true;
  protected pushAlerts = false;
  protected digestOnly = false;
  protected owner = 'Nina Woods';
  protected fallbackContact = 'Theo Murphy';

  protected get summary(): string {
    return `${this.owner} owns alerts. Digest only: ${this.digestOnly ? 'On' : 'Off'}.`;
  }
}
```

## Accessibility

### Header semantics
Accordion uses a `tree-node` based header, so the outer interactive structure exposes tree-style semantics instead of the typical heading plus button pattern.

| Element / state | Accessibility behavior |
| --- | --- |
| accordion header root | `role="treeitem"` |
| expandable section | `aria-expanded` on the header root |
| disabled section | `aria-disabled="true"` |
| chevron control | separate `role="button"` with expand or collapse label |

### Keyboard
Keyboard behavior comes from the tree-node foundation used by the header.

| Key | Action |
| --- | --- |
| `Enter` / `Space` | toggles the accordion through the header interaction |
| `ArrowRight` | expands a collapsed accordion |
| `ArrowLeft` | collapses an expanded accordion |
| chevron `Enter` / `Space` | toggles through the dedicated chevron control |

### Content and quick actions
Projected panel content stays out of the accessibility tree until the accordion is expanded because the panel is conditionally rendered. If you add quick actions, keep their labels explicit and stop them from hijacking the main toggle intent.
