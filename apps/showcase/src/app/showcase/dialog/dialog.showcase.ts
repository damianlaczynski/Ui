import { Component, signal, model } from '@angular/core';
import { DialogComponent } from 'ui';
import { ButtonComponent } from 'ui';
import { QuickAction } from 'ui';
import { TableOfContentComponent } from 'ui';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { DialogInteractiveComponent } from './dialog.interactive';

@Component({
  selector: 'app-dialog-showcase',
  imports: [
    DialogComponent,
    ButtonComponent,
    TableOfContentComponent,
    ShowcaseHeaderComponent,
    DialogInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="Dialog" />
        <p class="showcase__description">
          Dialog component based on Fluent 2 Design System - displays modal dialogs with
          customizable content and actions.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Dialog</h2>
          <p class="showcase__section__description">
            Simple dialog with title, body text and action buttons.
          </p>
          <div class="showcase__demo">
            <ui-button variant="primary" (click)="basicDialogVisible.set(true)">
              Open Basic Dialog
            </ui-button>
            <ui-dialog
              title="Main question or action"
              bodyText="Here is more about the consequences of the main action, if details are needed."
              [(visible)]="basicDialogVisible"
              [primaryAction]="basicPrimaryAction()"
              [secondaryAction]="basicSecondaryAction()"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Dialog with Custom Content</h2>
          <p class="showcase__section__description">
            Dialog with projected content instead of simple body text.
          </p>
          <div class="showcase__demo">
            <ui-button variant="primary" (click)="customContentDialogVisible.set(true)">
              Open Custom Content Dialog
            </ui-button>
            <ui-dialog
              title="Main question or action"
              [(visible)]="customContentDialogVisible"
              [primaryAction]="customPrimaryAction()"
              [secondaryAction]="customSecondaryAction()"
            >
              <div
                style="background: #EBF3FC; min-width: 100%; min-height: 100%; padding: 40px; text-align: center; border-radius: 4px;"
              >
                <p style="color: #0F6CBD; font-size: 14px; margin: 0;">
                  Custom content area - you can place any component or HTML here
                </p>
              </div>
            </ui-dialog>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Dialog Sizes</h2>
          <p class="showcase__section__description">
            Different dialog sizes: small (320px), medium (600px), large (800px).
          </p>
          <div class="showcase__demo" style="display: flex; gap: 8px;">
            <ui-button appearance="outline" (click)="smallDialogVisible.set(true)">
              Small Dialog
            </ui-button>
            <ui-button appearance="outline" (click)="mediumDialogVisible.set(true)">
              Medium Dialog
            </ui-button>
            <ui-button appearance="outline" (click)="largeDialogVisible.set(true)">
              Large Dialog
            </ui-button>
            <ui-dialog
              title="Small Dialog (320px)"
              bodyText="This is a small dialog suitable for mobile devices or simple confirmations."
              width="320px"
              [(visible)]="smallDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />
            <ui-dialog
              title="Medium Dialog (600px)"
              bodyText="This is a medium dialog - the default size for most use cases."
              width="600px"
              [(visible)]="mediumDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />
            <ui-dialog
              title="Large Dialog (800px)"
              bodyText="This is a large dialog suitable for complex forms or detailed information."
              width="800px"
              [(visible)]="largeDialogVisible"
              [primaryAction]="sizePrimaryAction()"
              [secondaryAction]="sizeSecondaryAction()"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Non-Closable Dialog</h2>
          <p class="showcase__section__description">
            Dialog that can only be closed via action buttons (no close button, no ESC key, no
            backdrop click).
          </p>
          <div class="showcase__demo">
            <ui-button variant="primary" (click)="nonClosableDialogVisible.set(true)">
              Open Non-Closable Dialog
            </ui-button>
            <ui-dialog
              title="Important Action Required"
              bodyText="You must take one of the actions below. This dialog cannot be dismissed."
              [closable]="false"
              backdrop="static"
              [(visible)]="nonClosableDialogVisible"
              [primaryAction]="nonClosablePrimaryAction()"
              [secondaryAction]="nonClosableSecondaryAction()"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Multiple Actions</h2>
          <p class="showcase__section__description">
            Dialog with additional action buttons beyond primary and secondary.
          </p>
          <div class="showcase__demo">
            <ui-button variant="primary" (click)="multipleActionsDialogVisible.set(true)">
              Open Multi-Action Dialog
            </ui-button>
            <ui-dialog
              title="Choose an action"
              bodyText="This dialog has multiple action buttons to choose from."
              [(visible)]="multipleActionsDialogVisible"
              [primaryAction]="multiplePrimaryAction()"
              [secondaryAction]="multipleSecondaryAction()"
              [additionalActions]="additionalActions()"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Information Only Dialog</h2>
          <p class="showcase__section__description">
            Dialog without action buttons - informational only.
          </p>
          <div class="showcase__demo">
            <ui-button variant="primary" (click)="infoDialogVisible.set(true)">
              Open Info Dialog
            </ui-button>
            <ui-dialog
              title="Information"
              bodyText="This is an informational dialog. Close it by clicking the X button, pressing ESC, or clicking the backdrop."
              [(visible)]="infoDialogVisible"
            />
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all dialog options in real time. Change title, body text, width,
            fullscreen, closable, and backdrop behavior.
          </p>
          <app-dialog-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DialogShowcaseComponent {
  basicDialogVisible = model(false);
  basicPrimaryAction = signal<QuickAction>({
    label: 'Take action',
    variant: 'primary',
    action: () => this.basicDialogVisible.set(false),
  });
  basicSecondaryAction = signal<QuickAction>({
    label: 'Different action',
    variant: 'secondary',
    action: () => this.basicDialogVisible.set(false),
  });

  customContentDialogVisible = model(false);
  customPrimaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => this.customContentDialogVisible.set(false),
  });
  customSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.customContentDialogVisible.set(false),
  });

  smallDialogVisible = model(false);
  mediumDialogVisible = model(false);
  largeDialogVisible = model(false);
  sizePrimaryAction = signal<QuickAction>({
    label: 'OK',
    variant: 'primary',
    action: () => {
      this.smallDialogVisible.set(false);
      this.mediumDialogVisible.set(false);
      this.largeDialogVisible.set(false);
    },
  });
  sizeSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.smallDialogVisible.set(false);
      this.mediumDialogVisible.set(false);
      this.largeDialogVisible.set(false);
    },
  });

  nonClosableDialogVisible = model(false);
  nonClosablePrimaryAction = signal<QuickAction>({
    label: 'Accept',
    variant: 'primary',
    action: () => this.nonClosableDialogVisible.set(false),
  });
  nonClosableSecondaryAction = signal<QuickAction>({
    label: 'Decline',
    variant: 'secondary',
    action: () => this.nonClosableDialogVisible.set(false),
  });

  multipleActionsDialogVisible = model(false);
  multiplePrimaryAction = signal<QuickAction>({
    label: 'Primary',
    variant: 'primary',
    action: () => this.multipleActionsDialogVisible.set(false),
  });
  multipleSecondaryAction = signal<QuickAction>({
    label: 'Secondary',
    variant: 'secondary',
    action: () => this.multipleActionsDialogVisible.set(false),
  });
  additionalActions = signal<QuickAction[]>([
    {
      label: 'Option A',
      variant: 'secondary',
      appearance: 'outline',
      action: () => this.multipleActionsDialogVisible.set(false),
    },
    {
      label: 'Option B',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => this.multipleActionsDialogVisible.set(false),
    },
  ]);

  infoDialogVisible = model(false);
}
