# Message Bar

Message Bar renders persistent inline feedback with semantic variants, multiple appearances, optional actions, dismiss support, and richer projected content. It fits places where a toast would disappear too quickly and a dialog would be too heavy.

## Import
```ts
import { MessageBarComponent } from 'ui';
```

## Basic inline notice
```ts
import { Component } from '@angular/core';
import { MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-basic-example',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <ui-message-bar
        title="Sync paused"
        message="The workspace will resume syncing when your connection is stable again."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarBasicExampleComponent {}
```

## Semantic variants
```ts
import { Component } from '@angular/core';
import { MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-variants-example',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:44rem">
      <ui-message-bar
        title="Migration scheduled"
        message="The workspace move begins tonight at 22:00."
        variant="primary"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Saved successfully"
        message="Your contract settings were updated and shared with the team."
        variant="success"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Storage nearing limit"
        message="Uploads may stop soon unless you archive or buy more space."
        variant="warning"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Payment failed"
        message="Subscription renewal could not be completed. Update billing to avoid suspension."
        variant="danger"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarVariantsExampleComponent {}
```

## Appearances
```ts
import { Component } from '@angular/core';
import { MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-appearance-example',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:44rem">
      <ui-message-bar
        title="Tint"
        message="Balanced default for most inline notices."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Filled"
        message="Use when the notice needs stronger visual priority."
        variant="info"
        appearance="filled"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Outline"
        message="Useful on visually busy surfaces where you still need separation."
        variant="info"
        appearance="outline"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Subtle"
        message="Calmer presentation for embedded panels and secondary guidance."
        variant="info"
        appearance="subtle"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Transparent"
        message="Minimal chrome when surrounding layout already provides structure."
        variant="info"
        appearance="transparent"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarAppearanceExampleComponent {}
```

## Single-line and multiline layout
```ts
import { Component } from '@angular/core';
import { MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-layout-example',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <ui-message-bar
        title="Single-line row"
        message="A new policy update is available."
        variant="secondary"
        appearance="outline"
        [multiline]="false"
      />

      <ui-message-bar
        title="Multiline panel notice"
        message="Identity verification is required before new team members can access billing and security settings. Complete verification to keep invites enabled."
        variant="warning"
        appearance="tint"
        [multiline]="true"
      />
    </div>
  `,
})
export class MessageBarLayoutExampleComponent {}
```

## Built-in actions and dismiss
```ts
import { Component, signal } from '@angular/core';
import { MessageBarComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-message-bar-actions-example',
  standalone: true,
  imports: [MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:46rem">
      @if (!dismissed()) {
        <ui-message-bar
          title="Invoice sync failed"
          message="Three invoices could not be matched to customers. Review the import and retry."
          variant="danger"
          appearance="outline"
          [actions]="actions"
          (actionSelect)="lastAction.set($event.label)"
          (dismiss)="dismissed.set(true)"
        />
      } @else {
        <ui-message-bar
          title="Notice dismissed"
          message="In a real app you would usually keep this hidden until the next relevant state change."
          variant="secondary"
          appearance="subtle"
          [dismissible]="false"
          [showIcon]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>
    </div>
  `,
})
export class MessageBarActionsExampleComponent {
  protected readonly dismissed = signal(false);
  protected readonly lastAction = signal('');

  protected readonly actions: QuickAction[] = [
    {
      label: 'Review errors',
      variant: 'danger',
      appearance: 'outline',
      action: () => this.lastAction.set('Review errors'),
    },
    {
      label: 'Retry sync',
      variant: 'secondary',
      appearance: 'outline',
      action: () => this.lastAction.set('Retry sync'),
    },
  ];
}
```

## Rich content and custom action area
```ts
import { Component } from '@angular/core';
import { ButtonComponent, MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-rich-content-example',
  standalone: true,
  imports: [ButtonComponent, MessageBarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <ui-message-bar
        title="Storage policy update"
        message="Automatic cleanup will archive inactive media after 30 days."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      >
        <div
          style="margin-top:0.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:0.75rem"
        >
          <div
            style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border-radius:0.75rem;background:color-mix(in srgb, currentColor 7%, transparent)"
          >
            <span style="font-size:0.75rem;opacity:0.8">Archived last week</span>
            <span style="font-size:0.9375rem;font-weight:600">148 assets</span>
          </div>
          <div
            style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border-radius:0.75rem;background:color-mix(in srgb, currentColor 7%, transparent)"
          >
            <span style="font-size:0.75rem;opacity:0.8">Recovered space</span>
            <span style="font-size:0.9375rem;font-weight:600">12.6 GB</span>
          </div>
        </div>

        <div slot="actions" style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-button type="button" variant="primary" appearance="outline">Open policy</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline">Export report</ui-button>
        </div>
      </ui-message-bar>
    </div>
  `,
})
export class MessageBarRichContentExampleComponent {}
```

## Accessibility

### Role and live region
`MessageBarComponent` uses `role="alert"` with assertive live announcements for the `danger` variant, and `role="status"` with polite announcements for other variants.

| Variant group | Live region |
| --- | --- |
| `danger` | `role="alert"` + assertive announcement |
| all other variants | `role="status"` + polite announcement |

### Atomic announcement and actions
The root sets `aria-atomic="true"`, so assistive technologies announce the message as one unit instead of piecemeal fragments.

| Element | Keyboard behavior |
| --- | --- |
| dismiss button | standard button keyboard support |
| quick actions | standard button keyboard support |
| custom `slot="actions"` content | follows the projected control semantics |

### Dismiss control
When `dismissible` is true, the dismiss control receives an accessible label from the shared i18n message. Keep visible copy concise so the main announcement remains understandable before users reach the dismiss button.
