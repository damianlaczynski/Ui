# Toast

Transient feedback for confirmations, warnings, and errors. Use `ToastComponent` for inline previews and layouts, and pair `ToastService` with `ToastContainerComponent` for stacked notifications from application logic.

## Import
```ts
import { ToastComponent, ToastContainerComponent, ToastService } from 'ui';
```

## Toast service and container
```ts
import { Component, inject } from '@angular/core';
import { ButtonComponent, ToastContainerComponent, ToastService } from 'ui';

@Component({
  selector: 'app-toast-service-example',
  standalone: true,
  imports: [ButtonComponent, ToastContainerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" (click)="pushPrimary()">Primary</ui-button>
        <ui-button type="button" variant="secondary" (click)="pushSecondary()">Secondary</ui-button>
        <ui-button type="button" variant="info" (click)="pushInfo()">Info</ui-button>
        <ui-button type="button" variant="success" (click)="pushSuccess()">Success</ui-button>
        <ui-button type="button" variant="warning" (click)="pushWarn()">Warning</ui-button>
        <ui-button type="button" variant="danger" (click)="pushError()">Error</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="clearAll()"
          >Reset</ui-button
        >
      </div>
    </div>
    <ui-toast-container position="top-right" />
  `,
})
export class ToastServiceExampleComponent {
  private readonly toast = inject(ToastService);

  pushPrimary(): void {
    this.toast.add({
      variant: 'primary',
      appearance: 'filled',
      title: 'Primary',
      message: 'Queued with variant primary.',
      duration: 5000,
    });
  }

  pushSecondary(): void {
    this.toast.add({
      variant: 'secondary',
      appearance: 'filled',
      title: 'Secondary',
      message: 'Queued with variant secondary.',
      duration: 5000,
    });
  }

  pushInfo(): void {
    this.toast.info('Information', 'Queued from ToastService.info().');
  }

  pushSuccess(): void {
    this.toast.success('Success', 'Queued from ToastService.success().');
  }

  pushWarn(): void {
    this.toast.warn('Warning', 'Queued from ToastService.warn().');
  }

  pushError(): void {
    this.toast.error('Error', 'Queued from ToastService.error().');
  }

  clearAll(): void {
    this.toast.clear();
  }
}
```

## Basic toast
```ts
import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-basic-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        variant="primary"
        appearance="filled"
        title="Saved"
        message="Your changes were stored."
        [(visible)]="visible"
      />
    </div>
  `,
})
export class ToastBasicExampleComponent {
  visible = true;

  reset(): void {
    this.visible = true;
  }
}
```

## Variants
```ts
import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-variants-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        variant="primary"
        title="Primary"
        message="Brand emphasis."
        [(visible)]="vPrimary"
      />
      <ui-toast
        variant="secondary"
        title="Secondary"
        message="Neutral supporting actions."
        [(visible)]="vSecondary"
      />
      <ui-toast variant="info" title="Info" message="Neutral context." [(visible)]="vInfo" />
      <ui-toast
        variant="success"
        title="Success"
        message="Operation completed."
        [(visible)]="vSuccess"
      />
      <ui-toast
        variant="warning"
        title="Warning"
        message="Review before continuing."
        [(visible)]="vWarning"
      />
      <ui-toast
        variant="danger"
        title="Error"
        message="Something went wrong."
        [(visible)]="vDanger"
      />
    </div>
  `,
})
export class ToastVariantsExampleComponent {
  vPrimary = true;
  vSecondary = true;
  vInfo = true;
  vSuccess = true;
  vWarning = true;
  vDanger = true;

  reset(): void {
    this.vPrimary =
      this.vSecondary =
      this.vInfo =
      this.vSuccess =
      this.vWarning =
      this.vDanger =
        true;
  }
}
```

## Appearance
```ts
import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-appearance-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        variant="info"
        appearance="filled"
        title="Filled"
        message="Strongest surface emphasis."
        [(visible)]="vFilled"
      />
      <ui-toast
        variant="info"
        appearance="outline"
        title="Outline"
        message="Lighter chrome with a border."
        [(visible)]="vOutline"
      />
      <ui-toast
        variant="info"
        appearance="subtle"
        title="Subtle"
        message="Low contrast alongside dense UI."
        [(visible)]="vSubtle"
      />
      <ui-toast
        variant="info"
        appearance="tint"
        title="Tint"
        message="Tinted surface between filled and outline."
        [(visible)]="vTint"
      />
      <ui-toast
        variant="info"
        appearance="transparent"
        title="Transparent"
        message="Minimal chrome; relies on variant color tokens."
        [(visible)]="vTransparent"
      />
    </div>
  `,
})
export class ToastAppearanceExampleComponent {
  vFilled = true;
  vOutline = true;
  vSubtle = true;
  vTint = true;
  vTransparent = true;

  reset(): void {
    this.vFilled = this.vOutline = this.vSubtle = this.vTint = this.vTransparent = true;
  }
}
```

## Sizes
```ts
import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-sizes-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        size="small"
        variant="primary"
        title="Small"
        message="Compact spacing."
        [(visible)]="vSmall"
      />
      <ui-toast
        size="medium"
        variant="primary"
        title="Medium"
        message="Default density."
        [(visible)]="vMedium"
      />
      <ui-toast
        size="large"
        variant="primary"
        title="Large"
        message="Prominent feedback."
        [(visible)]="vLarge"
      />
    </div>
  `,
})
export class ToastSizesExampleComponent {
  vSmall = true;
  vMedium = true;
  vLarge = true;

  reset(): void {
    this.vSmall = this.vMedium = this.vLarge = true;
  }
}
```

## Dismiss, icon, and progress
```ts
import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-options-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        variant="info"
        title="With progress"
        message="Auto-dismiss timeline shown when duration is set."
        [duration]="8000"
        [showProgress]="true"
        [(visible)]="vProgress"
      />
      <ui-toast
        variant="info"
        title="No icon"
        message="Icon hidden; variant colors remain."
        [showIcon]="false"
        [(visible)]="vNoIcon"
      />
      <ui-toast
        variant="info"
        title="Not dismissible"
        message="Close control hidden."
        [dismissible]="false"
        [showProgress]="false"
        [(visible)]="vNoDismiss"
      />
    </div>
  `,
})
export class ToastOptionsExampleComponent {
  vProgress = true;
  vNoIcon = true;
  vNoDismiss = true;

  reset(): void {
    this.vProgress = this.vNoIcon = this.vNoDismiss = true;
  }
}
```

## Sticky (ToastService)
```ts
import { Component, inject } from '@angular/core';
import { ButtonComponent, ToastService } from 'ui';

@Component({
  selector: 'app-toast-sticky-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
    >
      <ui-button type="button" variant="warning" appearance="subtle" (click)="pushSticky()">
        Sticky toast
      </ui-button>
      <ui-button type="button" variant="secondary" appearance="outline" (click)="clearAll()"
        >Reset</ui-button
      >
    </div>
  `,
})
export class ToastStickyExampleComponent {
  private readonly toast = inject(ToastService);

  pushSticky(): void {
    this.toast.add({
      variant: 'warning',
      appearance: 'filled',
      title: 'Sticky',
      message: 'ToastService skips auto-removal until dismiss or Reset.',
      sticky: true,
      duration: 8000,
    });
  }

  clearAll(): void {
    this.toast.clear();
  }
}
```

## Custom content and actions
```ts
import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { ButtonComponent, ToastService } from 'ui';

@Component({
  selector: 'app-toast-actions-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem">
      <ng-template #invite>
        <div
          style="margin-top:0.35rem;display:flex;flex-direction:column;gap:0.35rem;font-size:0.8125rem;line-height:1.45;color:inherit"
        >
          <span style="font-weight:600;opacity:0.95">Conference room B · Building 2</span>
          <span style="opacity:0.85"
            >Teams link was copied—paste into chat if guests join late.</span
          >
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="primary" appearance="outline">
            Accept
          </ui-button>
          <ui-button slot="actions" type="button" variant="secondary" appearance="outline">
            Propose new time
          </ui-button>
        </div>
      </ng-template>

      <ng-template #quota>
        <div
          style="margin-top:0.4rem;padding:0.5rem 0.65rem;border-radius:6px;background:color-mix(in srgb, currentColor 8%, transparent);font-size:0.8125rem;line-height:1.5"
        >
          <div style="display:flex;justify-content:space-between;gap:0.75rem;margin-bottom:0.35rem">
            <span style="opacity:0.9">Projects / Media</span>
            <span style="font-weight:600">9.2 GB / 10 GB</span>
          </div>
          <div
            style="height:6px;border-radius:999px;background:color-mix(in srgb, currentColor 18%, transparent);overflow:hidden"
          >
            <div
              style="height:100%;width:92%;border-radius:inherit;background:currentColor;opacity:0.65"
            ></div>
          </div>
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="warning" appearance="tint">
            Manage storage
          </ui-button>
        </div>
      </ng-template>

      <ng-template #payment>
        <div style="margin-top:0.35rem;font-size:0.8125rem;line-height:1.45;opacity:0.9">
          <span
            style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:0.75rem;opacity:0.85"
            >card_···4196 · declined (insufficient funds)</span
          >
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="danger" appearance="outline">
            Retry payment
          </ui-button>
          <ui-button slot="actions" type="button" variant="secondary" appearance="outline">
            Update card
          </ui-button>
        </div>
      </ng-template>

      <ng-template #backup>
        <div
          style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8125rem;line-height:1.5"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
            <span style="font-weight:600">12 files</span>
            <span style="opacity:0.9">2 duplicates skipped</span>
          </div>
          <span style="opacity:0.8;font-size:0.75rem">Full report in Activity → Backup.</span>
        </div>
      </ng-template>
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
        <ui-button type="button" variant="info" (click)="pushInvite()">Meeting invite</ui-button>
        <ui-button type="button" variant="warning" (click)="pushQuota()">Storage warning</ui-button>
        <ui-button type="button" variant="danger" (click)="pushPayment()">Payment failed</ui-button>
        <ui-button type="button" variant="success" (click)="pushBackup()">Backup summary</ui-button>
      </div>
    </div>
  `,
})
export class ToastActionsExampleComponent {
  private readonly inviteTpl = viewChild.required<TemplateRef<unknown>>('invite');
  private readonly quotaTpl = viewChild.required<TemplateRef<unknown>>('quota');
  private readonly paymentTpl = viewChild.required<TemplateRef<unknown>>('payment');
  private readonly backupTpl = viewChild.required<TemplateRef<unknown>>('backup');
  private readonly toast = inject(ToastService);

  pushInvite(): void {
    this.toast.add({
      title: 'Meeting invite · Product sync',
      message: 'Alex Chen invited you for tomorrow 10:00–10:45.',
      variant: 'info',
      appearance: 'filled',
      contentTemplate: this.inviteTpl(),
      duration: 12000,
    });
  }

  pushQuota(): void {
    this.toast.add({
      title: 'Storage almost full',
      message: 'Uploads will pause soon unless you free space or upgrade.',
      variant: 'warning',
      appearance: 'filled',
      contentTemplate: this.quotaTpl(),
      duration: 15000,
    });
  }

  pushPayment(): void {
    this.toast.add({
      title: 'Payment could not be processed',
      message: 'Your subscription renewal failed. No charges were made.',
      variant: 'danger',
      appearance: 'filled',
      contentTemplate: this.paymentTpl(),
      duration: 12000,
      showProgress: false,
    });
  }

  pushBackup(): void {
    this.toast.add({
      title: 'Backup finished',
      message: '',
      variant: 'success',
      appearance: 'filled',
      contentTemplate: this.backupTpl(),
      duration: 9000,
    });
  }

  reset(): void {
    this.toast.clear();
  }
}
```

## Accessibility

### Role and live region
The root uses `role="alert"`. `aria-live` is `assertive` for the danger variant and `polite` for others so assistive technologies prioritize errors without shouting over every hint.

| Variant | Live region |
| --- | --- |
| `danger` | `assertive` |
| all other variants | `polite` |

### Keyboard and actions
Toast itself is not a focus trap. Keyboard interaction depends on whether dismiss and action buttons are rendered.

| Element | Keyboard behavior |
| --- | --- |
| dismiss button | standard button keyboard support |
| projected actions | standard keyboard support from the projected control |
| non-interactive toast body | announced through the live region rather than focused |

### Dismiss and progress
When `dismissible` is true, the dismiss control is a `ButtonComponent`; keep toast copy concise so the name and message remain the primary announcement.

The progress strip is decorative timing feedback. Critical status should still appear in `title` and `message` instead of relying on the countdown bar.
