import { Component, input, output, model, HostListener, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { QuickAction } from '../utils';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { UiI18nService } from '../../i18n';

export type DialogBackdrop = 'static' | 'dynamic';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',

  imports: [CommonModule, A11yModule, ButtonComponent, IconComponent],
})
export class DialogComponent {
  //Service
  private readonly i18n = inject(UiI18nService);

  //Translations
  private readonly closeAriaLabel = this.i18n.tSignal('dialog.closeAriaLabel', 'Close dialog');

  //Inputs
  title = input<string>('');
  bodyText = input<string>('');
  backdrop = input<DialogBackdrop>('dynamic');
  closable = input<boolean>(true);
  fullscreen = input<boolean>(false);
  width = input<string>('');
  height = input<string>('');
  visible = model<boolean>(false);

  primaryAction = input<QuickAction | null>(null);
  secondaryAction = input<QuickAction | null>(null);
  additionalActions = input<QuickAction[]>([]);

  //Outputs
  close = output<void>();
  backdropClick = output<void>();

  //Computed
  closeAriaLabelComputed = computed(() => this.closeAriaLabel());

  hasActions = computed(() => {
    return !!(
      this.primaryAction() ||
      this.secondaryAction() ||
      this.additionalActions().length > 0
    );
  });

  dialogClasses = computed(() => {
    return ['dialog', !this.visible() ? 'dialog--hidden' : ''].join(' ');
  });

  backdropClasses = computed(() => {
    return [
      'dialog__backdrop',
      !this.visible() ? 'dialog__backdrop--hidden' : '',
      this.fullscreen() ? 'dialog__backdrop--fullscreen' : '',
    ].join(' ');
  });

  contentClasses = computed(() => {
    return ['dialog__content', this.fullscreen() ? 'dialog__content--fullscreen' : ''].join(' ');
  });

  contentStyles = computed(() => {
    const styles: { [key: string]: string } = {};

    if (this.width() && !this.fullscreen()) {
      styles['width'] = this.width();
      styles['max-width'] = this.width();
    }

    if (this.height() && !this.fullscreen()) {
      styles['height'] = this.height();
      styles['max-height'] = this.height();
    }

    return styles;
  });

  headerClasses = computed(() => {
    return 'dialog__header';
  });

  bodyClasses = computed(() => {
    return 'dialog__body';
  });

  footerClasses = computed(() => {
    return 'dialog__footer';
  });

  onBackdropClick(event: MouseEvent): void {
    if (this.backdrop() === 'dynamic' && event.target === event.currentTarget) {
      this.closeDialog();
      this.backdropClick.emit();
    }
  }

  onCloseClick(): void {
    if (this.closable()) {
      this.closeDialog();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.visible() && this.closable()) {
      event.preventDefault();
      this.closeDialog();
    }
  }

  private closeDialog(): void {
    this.visible.set(false);
    this.close.emit();
  }

  handlePrimaryAction(): void {
    const action = this.primaryAction();
    if (action && !action.disabled) {
      action.action();
    }
  }

  handleSecondaryAction(): void {
    const action = this.secondaryAction();
    if (action && !action.disabled) {
      action.action();
    }
  }

  handleAdditionalAction(action: QuickAction): void {
    if (!action.disabled) {
      action.action();
    }
  }
}
