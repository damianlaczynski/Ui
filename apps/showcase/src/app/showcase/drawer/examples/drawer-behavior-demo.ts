import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-behavior-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="dynamicVisible.set(true)">Dynamic backdrop</ui-button>
      <ui-button appearance="outline" (click)="staticVisible.set(true)">Static backdrop</ui-button>
      <ui-button variant="danger" appearance="outline" (click)="alertVisible.set(true)"> Alert drawer </ui-button>

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
