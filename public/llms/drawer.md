# Drawer

Drawer supports overlay and inline presentation, edge positioning, structured footer actions, modal versus non-modal behavior, and focus management. It is a better fit than a dialog when users need more room or should keep page context visible beside the panel.

## Import
```ts
import { DrawerComponent } from 'ui';
```

## Basic overlay drawer
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-basic-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="primary" (click)="visible.set(true)">Open drawer</ui-button>
      <ui-drawer
        title="Customer notes"
        bodyText="Review the latest support notes without leaving the account page."
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            Renewal risk increased after delayed procurement review.
          </div>
          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            Next suggested action: schedule finance follow-up before Friday.
          </div>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerBasicExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Add note',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Close',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
```

## Overlay and inline types
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-types-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        <ui-button appearance="outline" (click)="overlayVisible.set(true)"
          >Overlay drawer</ui-button
        >
        <ui-button appearance="outline" (click)="inlineVisible.set(true)">Inline drawer</ui-button>
      </div>

      <div
        style="display:flex;flex-direction:row;align-items:stretch;gap:1rem;min-height:28rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);overflow:hidden"
      >
        <div
          style="flex:1;min-width:0;max-width:22rem;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest);display:flex;flex-direction:column;gap:0.75rem"
        >
          <p style="margin:0">
            This bordered region represents part of a page. Inline mode keeps the panel inside the
            host layout — it needs enough height and a horizontal row so the panel can sit beside
            the narrative copy.
          </p>
          <p style="margin:0">
            The overlay variant is rendered below, outside this card, spanning the full viewport.
          </p>
        </div>
        <div
          style="display:flex;align-items:stretch;justify-content:flex-end;flex-shrink:0;min-height:0"
        >
          <ui-drawer
            title="Inline panel"
            type="inline"
            position="right"
            size="medium"
            [(visible)]="inlineVisible"
            [primaryAction]="closeInlineAction()"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.75rem;color:var(--color-neutral-foreground-rest);font-size:0.875rem;line-height:1.55"
            >
              <p style="margin:0">
                Use inline drawers for filters, contextual review, or stacked tools that should feel
                anchored to the workspace instead of masking the whole app.
              </p>
              <p style="margin:0">
                When you need a focused task that blocks the rest of the UI, prefer an overlay
                drawer.
              </p>
            </div>
          </ui-drawer>
        </div>
      </div>

      <ui-drawer
        title="Overlay panel"
        bodyText="Overlay mode pauses the chrome behind the panel and is ideal for confirmations, multi-step edits, or transient forms."
        type="overlay"
        [(visible)]="overlayVisible"
        [primaryAction]="closeOverlayAction()"
      />
    </div>
  `,
})
export class DrawerTypesExampleComponent {
  protected readonly overlayVisible = model(false);
  protected readonly inlineVisible = model(false);

  protected readonly closeInlineAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.inlineVisible.set(false),
  });

  protected readonly closeOverlayAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.overlayVisible.set(false),
  });
}
```

## Positions and sizes
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

const bodyStackStyle =
  'display:flex;flex-direction:column;gap:0.875rem;color:var(--color-neutral-foreground-rest);font-size:0.875rem;line-height:1.55';

@Component({
  selector: 'app-drawer-positions-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="leftVisible.set(true)">Left small</ui-button>
      <ui-button appearance="outline" (click)="rightVisible.set(true)"
        >Right large · scroll</ui-button
      >
      <ui-button appearance="outline" (click)="bottomVisible.set(true)">Bottom medium</ui-button>

      <ui-drawer
        title="Left rail tools"
        position="left"
        size="small"
        [(visible)]="leftVisible"
        [primaryAction]="closeLeftAction()"
      >
        <div [attr.style]="bodyStackStyle">
          <p style="margin:0">
            The compact width suits navigation rails, shortcuts to sibling views, or secondary
            actions that should not dominate the canvas.
          </p>
          <p style="margin:0"><strong style="font-weight:600">Quick links</strong></p>
          <ul style="margin:0;padding-left:1.25rem">
            <li style="margin-bottom:0.35rem">Create record in current context</li>
            <li style="margin-bottom:0.35rem">Export filtered table to CSV</li>
            <li style="margin-bottom:0">Open keyboard shortcuts reference</li>
          </ul>
        </div>
      </ui-drawer>

      <ui-drawer
        title="Right inspection panel"
        position="right"
        size="large"
        [(visible)]="rightVisible"
        [primaryAction]="closeRightAction()"
      >
        <div [attr.style]="bodyStackStyle">
          @for (paragraph of scrollParagraphs; track $index) {
            <p style="margin:0">{{ paragraph }}</p>
          }
        </div>
      </ui-drawer>

      <ui-drawer
        title="Bottom review tray"
        position="bottom"
        size="medium"
        [(visible)]="bottomVisible"
        [primaryAction]="closeBottomAction()"
      >
        <div [attr.style]="bodyStackStyle">
          <p style="margin:0">
            Bottom placements work well for cart summaries, approvals, or short step-through flows
            that should stay attached to the page chrome.
          </p>
          <p style="margin:0">
            This copy stays concise on purpose — open “Right large · scroll” to see the drawer body
            scroll when content exceeds the available height.
          </p>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerPositionsExampleComponent {
  readonly bodyStackStyle = bodyStackStyle;

  protected readonly scrollParagraphs = [
    'Before shipping changes, double-check workspace membership and downstream permissions.',
    'Workspace admins may transfer ownership, archive projects, and restore soft-deleted items for 30 days.',
    'Version notes are lightweight — still add why each rollout matters for future auditors.',
    'Directory sync refreshes nightly; local entitlement edits still persist immediately after save.',
    'Email alerts can be silenced module-by-module unless they are tagged as security-critical.',
    'Exports that include personal information must honor your retention policy; queue large payloads.',
    'Keyboard shortcuts activate only while focus lives within the interactive surface of the shell.',
    'Idle sessions extend tokens automatically when the tab stays foreground and trusted.',
    'Draft templates remain private until co-authors explicitly publish a stable revision.',
    'Full API manuals live next to onboarding guides — link banners stay pinned in workspace footers.',
    'When performance regresses capture the tracing id from network responses before filing support.',
    'Permission deltas propagate globally within seconds once the optimistic save completes.',
  ];

  protected readonly leftVisible = model(false);
  protected readonly rightVisible = model(false);
  protected readonly bottomVisible = model(false);

  protected readonly closeLeftAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.leftVisible.set(false),
  });

  protected readonly closeRightAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.rightVisible.set(false),
  });

  protected readonly closeBottomAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.bottomVisible.set(false),
  });
}
```

## Closable, static, and alert behavior
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-behavior-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="dynamicVisible.set(true)"
        >Dynamic backdrop</ui-button
      >
      <ui-button appearance="outline" (click)="staticVisible.set(true)">Static backdrop</ui-button>
      <ui-button variant="danger" appearance="outline" (click)="alertVisible.set(true)">
        Alert drawer
      </ui-button>

      <ui-drawer
        title="Standard behavior"
        bodyText="This drawer closes on backdrop click and Escape."
        backdrop="dynamic"
        [(visible)]="dynamicVisible"
        [primaryAction]="closeDynamicAction()"
      />

      <ui-drawer
        title="Static backdrop"
        bodyText="Backdrop clicks are ignored here, so users must close with the close button or footer actions."
        backdrop="static"
        [(visible)]="staticVisible"
        [primaryAction]="closeStaticAction()"
      />

      <ui-drawer
        title="Blocking review required"
        bodyText="Alert mode disables Escape and backdrop dismissal. Use it only when the task really demands that level of interruption."
        backdrop="static"
        modalType="alert"
        [closable]="true"
        [(visible)]="alertVisible"
        [primaryAction]="resolveAlertAction()"
        [secondaryAction]="dismissAlertAction()"
      />
    </div>
  `,
})
export class DrawerBehaviorExampleComponent {
  protected readonly dynamicVisible = model(false);
  protected readonly staticVisible = model(false);
  protected readonly alertVisible = model(false);

  protected readonly closeDynamicAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.dynamicVisible.set(false),
  });

  protected readonly closeStaticAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.staticVisible.set(false),
  });

  protected readonly resolveAlertAction = signal<QuickAction>({
    label: 'Review now',
    variant: 'primary',
    action: () => this.alertVisible.set(false),
  });

  protected readonly dismissAlertAction = signal<QuickAction>({
    label: 'Defer',
    variant: 'secondary',
    action: () => this.alertVisible.set(false),
  });
}
```

## Footer actions
```ts
import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-actions-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:24rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Open actions drawer
      </ui-button>
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>

      <ui-drawer
        title="Report options"
        bodyText="Choose how the report should be handled after generation."
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
        [additionalActions]="additionalActions()"
      />
    </div>
  `,
})
export class DrawerActionsExampleComponent {
  protected readonly visible = model(false);
  protected readonly lastAction = signal('');

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Publish',
    variant: 'primary',
    action: () => {
      this.lastAction.set('Publish');
      this.visible.set(false);
    },
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.lastAction.set('Cancel');
      this.visible.set(false);
    },
  });

  protected readonly additionalActions = signal<QuickAction[]>([
    {
      label: 'Preview',
      variant: 'secondary',
      appearance: 'outline',
      action: () => this.lastAction.set('Preview'),
    },
    {
      label: 'Duplicate',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => this.lastAction.set('Duplicate'),
    },
  ]);
}
```

## Task panel pattern
```ts
import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DrawerComponent, QuickAction, SwitchComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-drawer-settings-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DrawerComponent, SwitchComponent, TextComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:26rem">
      <ui-button variant="primary" (click)="visible.set(true)">Open settings panel</ui-button>
      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current label: <strong>{{ currentLabel() }}</strong>
      </div>

      <ui-drawer
        title="Automation settings"
        bodyText="Adjust the automation label and notification behavior without leaving the workflow page."
        position="right"
        size="large"
        [(visible)]="visible"
        [primaryAction]="saveAction()"
        [secondaryAction]="cancelAction()"
      >
        <div style="display:flex;flex-direction:column;gap:1rem">
          <ui-text
            label="Automation label"
            placeholder="Enter label"
            [(ngModel)]="draftLabel"
            [ngModelOptions]="{ standalone: true }"
            helpText="Visible in activity logs and notification templates."
          />

          <div
            style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            <ui-switch
              label="Notify channel owners"
              [(ngModel)]="notifyOwners"
              [ngModelOptions]="{ standalone: true }"
            />
            <ui-switch
              label="Pause after failures"
              [(ngModel)]="pauseOnFailure"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerSettingsPanelExampleComponent {
  protected readonly visible = model(false);
  protected readonly currentLabel = signal('Weekly renewal digest');
  protected draftLabel = 'Weekly renewal digest';
  protected notifyOwners = true;
  protected pauseOnFailure = false;

  protected readonly saveAction = signal<QuickAction>({
    label: 'Save settings',
    variant: 'primary',
    action: () => {
      const next = this.draftLabel.trim();
      this.currentLabel.set(next || this.currentLabel());
      this.visible.set(false);
    },
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.draftLabel = this.currentLabel();
      this.visible.set(false);
    },
  });
}
```

## Accessibility

### Role and modality
Overlay drawers render with `role="dialog"`; inline drawers render as `role="region"`. Modal overlays also expose `aria-modal` so assistive technologies understand that focus is constrained.

| Mode | Accessibility behavior |
| --- | --- |
| overlay modal | `role="dialog"` with constrained focus |
| overlay non-modal | dialog semantics without full interruption |
| inline | `role="region"` inside page flow |
| alert | strongest interruption; avoid for routine tasks |

### Accessible title
When `title` is present, the drawer is linked through `aria-labelledby` to the visible heading. Give the title enough context that users immediately understand the panel purpose.

### Focus and dismissal
Modal overlay drawers trap focus while open. `Escape` and backdrop dismissal depend on `closable`, `backdrop`, and `modalType`; `alert` mode disables backdrop and Escape dismissal.

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | moves through interactive drawer content |
| `Escape` | closes dismissible overlay drawers |
| `Enter` / `Space` | activates focused controls inside the drawer |
