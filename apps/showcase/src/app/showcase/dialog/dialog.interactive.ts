import { Component, signal, computed, model } from '@angular/core';
import { DialogComponent, DialogBackdrop } from 'ui';
import { ButtonComponent } from 'ui';
import { QuickAction } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DIALOG_SHOWCASE_CONFIG } from './dialog.showcase.config';

@Component({
  selector: 'app-dialog-interactive',
  imports: [DialogComponent, ButtonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-button variant="primary" (click)="openDialog()">Open Interactive Dialog</ui-button>
        <ui-dialog
          [title]="currentTitle()"
          [bodyText]="currentBodyText()"
          [(visible)]="visible"
          [closable]="currentClosable()"
          [backdrop]="currentBackdrop()"
          [fullscreen]="currentFullscreen()"
          [width]="currentWidth()"
          [primaryAction]="primaryAction()"
          [secondaryAction]="secondaryAction()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class DialogInteractiveComponent {
  visible = model(false);

  showcaseConfig: ShowcaseConfig = DIALOG_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    title: 'Dialog Title',
    bodyText: 'This is the dialog body text. You can customize it using the controls.',
    width: '600px',
    fullscreen: false,
    closable: true,
    backdrop: 'dynamic',
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentBodyText = computed(() => this.values()['bodyText'] as string);
  currentWidth = computed(() => this.values()['width'] as string);
  currentFullscreen = computed(() => this.values()['fullscreen'] as boolean);
  currentClosable = computed(() => this.values()['closable'] as boolean);
  currentBackdrop = computed(() => this.values()['backdrop'] as DialogBackdrop);

  primaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  openDialog(): void {
    this.visible.set(true);
  }
}
