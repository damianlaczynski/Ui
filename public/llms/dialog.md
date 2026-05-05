# Dialog

Dialog renders a modal surface with focus trapping, closable or static backdrop behavior, configurable sizing, fullscreen mode, and structured actions. It works best for decisions, confirmations, and short task flows that should temporarily interrupt the page.

## Import
```ts
import { DialogComponent } from 'ui';
```

## Basic confirmation dialog
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-basic-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="primary" (click)="visible.set(true)">Delete project</ui-button>
      <ui-dialog
        title="Delete this project?"
        bodyText="All automation rules and scheduled exports for this project will be removed. This action cannot be undone."
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      />
    </div>
  `,
})
export class DialogBasicExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Delete project',
    variant: 'danger',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
```

## Projected custom content
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-custom-content-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Review summary
      </ui-button>
      <ui-dialog
        title="Migration summary"
        [(visible)]="visible"
        width="38rem"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <div style="display:flex;flex-direction:column;gap:0.875rem">
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Content</span
              >
              <span style="font-size:0.9375rem;font-weight:600">124 files</span>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Groups</span
              >
              <span style="font-size:0.9375rem;font-weight:600">18 permissions</span>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Duration</span
              >
              <span style="font-size:0.9375rem;font-weight:600">~12 minutes</span>
            </div>
          </div>
          <div
            style="font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            External share links will be revalidated during the move. Team members keep existing
            roles unless a target workspace policy blocks them.
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogCustomContentExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Continue',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Back',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
```

## Widths and fullscreen
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-sizes-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="smallVisible.set(true)">Small</ui-button>
      <ui-button appearance="outline" (click)="mediumVisible.set(true)">Medium</ui-button>
      <ui-button appearance="outline" (click)="fullVisible.set(true)">Fullscreen</ui-button>

      <ui-dialog
        title="Small review"
        bodyText="Use a small width when the task is short and the decision is narrow."
        width="20rem"
        [(visible)]="smallVisible"
        [primaryAction]="okAction()"
      />

      <ui-dialog
        title="Standard edit surface"
        bodyText="Medium width is a solid default for richer copy, small forms, and straightforward review tasks."
        width="38rem"
        [(visible)]="mediumVisible"
        [primaryAction]="okAction()"
      />

      <ui-dialog
        title="Fullscreen editing flow"
        [fullscreen]="true"
        [(visible)]="fullVisible"
        [primaryAction]="publishAction()"
        [secondaryAction]="cancelAction()"
      >
        <div style="display:flex;flex-direction:column;gap:1rem;min-height:18rem">
          <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
            Fullscreen is better for complex editing, side-by-side review, or dense operational
            tasks.
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem"
          >
            <div
              style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              Left panel content
            </div>
            <div
              style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              Right panel content
            </div>
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogSizesExampleComponent {
  protected readonly smallVisible = model(false);
  protected readonly mediumVisible = model(false);
  protected readonly fullVisible = model(false);

  protected readonly okAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => {
      this.smallVisible.set(false);
      this.mediumVisible.set(false);
      this.fullVisible.set(false);
    },
  });

  protected readonly publishAction = signal<QuickAction>({
    label: 'Publish draft',
    variant: 'primary',
    action: () => this.fullVisible.set(false),
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.fullVisible.set(false),
  });
}
```

## Static backdrop and non-closable flows
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-static-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="danger" (click)="visible.set(true)">Open blocking dialog</ui-button>
      <ui-dialog
        title="Choose how to handle this conflict"
        bodyText="This import contains duplicate customer IDs. You must resolve the conflict before continuing."
        backdrop="static"
        [closable]="false"
        [(visible)]="visible"
        [primaryAction]="mergeAction()"
        [secondaryAction]="cancelImportAction()"
      />
    </div>
  `,
})
export class DialogStaticExampleComponent {
  protected readonly visible = model(false);

  protected readonly mergeAction = signal<QuickAction>({
    label: 'Review duplicates',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly cancelImportAction = signal<QuickAction>({
    label: 'Cancel import',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
```

## Primary, secondary, and additional actions
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-actions-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:22rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Open action chooser
      </ui-button>
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>
      <ui-dialog
        title="Send the report"
        bodyText="Choose whether the report should be shared now, scheduled, or saved as a draft."
        [(visible)]="visible"
        [primaryAction]="sendNowAction()"
        [secondaryAction]="saveDraftAction()"
        [additionalActions]="additionalActions()"
      />
    </div>
  `,
})
export class DialogActionsExampleComponent {
  protected readonly visible = model(false);
  protected readonly lastAction = signal('');

  protected readonly sendNowAction = signal<QuickAction>({
    label: 'Send now',
    variant: 'primary',
    action: () => {
      this.lastAction.set('Send now');
      this.visible.set(false);
    },
  });

  protected readonly saveDraftAction = signal<QuickAction>({
    label: 'Save draft',
    variant: 'secondary',
    action: () => {
      this.lastAction.set('Save draft');
      this.visible.set(false);
    },
  });

  protected readonly additionalActions = signal<QuickAction[]>([
    {
      label: 'Schedule',
      variant: 'secondary',
      appearance: 'outline',
      action: () => {
        this.lastAction.set('Schedule');
        this.visible.set(false);
      },
    },
    {
      label: 'Preview',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => {
        this.lastAction.set('Preview');
        this.visible.set(false);
      },
    },
  ]);
}
```

## Task flow with form content
```ts
import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DialogComponent, QuickAction, TextComponent } from 'ui';

@Component({
  selector: 'app-dialog-rename-flow-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DialogComponent, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:24rem">
      <ui-button variant="primary" (click)="visible.set(true)">Rename workspace</ui-button>
      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current name: <strong>{{ currentName() }}</strong>
      </div>

      <ui-dialog
        title="Rename workspace"
        [(visible)]="visible"
        width="34rem"
        [primaryAction]="saveAction()"
        [secondaryAction]="cancelAction()"
      >
        <div style="display:flex;flex-direction:column;gap:1rem">
          <div
            style="font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            Update the public workspace name. This will be visible in navigation, email
            notifications, and shared review pages.
          </div>

          <ui-text
            label="Workspace name"
            placeholder="Enter workspace name"
            helpText="Keep it short and recognizable for the whole team."
            [(ngModel)]="draftName"
            [ngModelOptions]="{ standalone: true }"
          />

          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <div
              style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);margin-bottom:0.25rem"
            >
              Preview
            </div>
            <div style="font-size:0.9375rem;font-weight:600">
              {{ draftName.trim() || 'Untitled workspace' }}
            </div>
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogRenameFlowExampleComponent {
  protected readonly visible = model(false);
  protected readonly currentName = signal('Product Ops Europe');
  protected draftName = 'Product Ops Europe';

  protected readonly saveAction = signal<QuickAction>({
    label: 'Save name',
    variant: 'primary',
    action: () => {
      const next = this.draftName.trim();
      this.currentName.set(next || this.currentName());
      this.visible.set(false);
    },
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.draftName = this.currentName();
      this.visible.set(false);
    },
  });
}
```

## Accessibility

### Role and modal behavior
`DialogComponent` renders with `role="dialog"` and `aria-modal="true"`, so assistive technologies treat it as a blocking modal surface.

| Element / state | Accessibility behavior |
| --- | --- |
| dialog root | `role="dialog"` |
| modal presentation | `aria-modal="true"` |
| visible title | linked through `aria-labelledby` |

### Accessible title and description
When `title` is provided, the dialog content is linked through `aria-labelledby` to the visible heading. Give the title enough meaning that users can quickly understand the task.

Body text and projected content should explain the consequence or task context without forcing users to infer the purpose from buttons alone.

### Focus and dismissal
Focus is trapped inside the dialog while it is open. If `closable` is true, users can dismiss with the close button or `Escape`; backdrop dismissal depends on `backdrop` and only happens in `dynamic` mode.

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | keeps focus within the dialog |
| `Escape` | closes dismissible dialogs |
| `Enter` / `Space` | activates focused dialog actions |
