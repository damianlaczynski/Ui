import { Component, input, output, model, HostListener, computed, inject } from '@angular/core';

import { QuickAction } from '../utils';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { UiI18nService } from '../../i18n';

export type DrawerBackdrop = 'static' | 'dynamic';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerType = 'overlay' | 'inline';
export type DrawerModalType = 'modal' | 'non-modal' | 'alert';

@Component({
  selector: 'ui-drawer',
  templateUrl: './drawer.component.html',
  imports: [ButtonComponent, IconComponent],
})
export class DrawerComponent {
  //Service
  private readonly i18n = inject(UiI18nService);

  //Translations
  private readonly closeAriaLabel = this.i18n.tSignal('drawer.closeAriaLabel', 'Close drawer');

  //Inputs
  title = input<string>('');
  bodyText = input<string>('');
  position = input<DrawerPosition>('right');
  backdrop = input<DrawerBackdrop>('dynamic');
  closable = input<boolean>(true);
  size = input<'small' | 'medium' | 'large'>('medium');
  type = input<DrawerType>('overlay');
  bodyScrollable = input<boolean>(true);
  modalType = input<DrawerModalType>('modal');
  visible = model<boolean>(false);

  primaryAction = input<QuickAction | null>(null);
  secondaryAction = input<QuickAction | null>(null);
  additionalActions = input<QuickAction[]>([]);

  //Outputs
  close = output<void>();
  backdropClick = output<void>();
  openChange = output<{ open: boolean }>();

  //Computed
  ariaLabelComputed = computed(() => this.closeAriaLabel());

  isOverlay = computed(() => this.type() === 'overlay');

  isInline = computed(() => this.type() === 'inline');

  hasActions = computed(
    () => !!(this.primaryAction() || this.secondaryAction() || this.additionalActions().length > 0),
  );

  canCloseByBackdrop = computed(() => {
    if (this.modalType() === 'alert') return false;
    return this.backdrop() === 'dynamic' && this.closable();
  });

  canCloseByEscape = computed(() => {
    if (this.modalType() === 'alert') return false;
    return this.closable();
  });

  isModal = computed(() => this.modalType() === 'modal');

  drawerClasses = computed(() => {
    return [
      'drawer',
      `drawer--${this.position()}`,
      `drawer--${this.type()}`,
      !this.visible() ? 'drawer--hidden' : '',
    ].join(' ');
  });

  backdropClasses = computed(() => {
    return ['drawer__backdrop', !this.visible() ? 'drawer__backdrop--hidden' : ''].join(' ');
  });

  contentClasses = computed(() => {
    return [
      'drawer__content',
      `drawer__content--${this.position()}`,
      `drawer__content--${this.size()}`,
    ].join(' ');
  });

  headerClasses = computed(() => {
    return 'drawer__header';
  });

  bodyClasses = computed(() => {
    return ['drawer__body', !this.bodyScrollable() ? 'drawer__body--no-scroll' : ''].join(' ');
  });

  footerClasses = computed(() => {
    return 'drawer__footer';
  });

  //Event handlers
  onBackdropClick(event: MouseEvent): void {
    if (this.canCloseByBackdrop() && event.target === event.currentTarget) {
      this.backdropClick.emit();
      this.closeDrawer();
    }
  }

  onCloseClick(): void {
    if (this.closable()) {
      this.closeDrawer();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.visible() && this.canCloseByEscape()) {
      event.preventDefault();
      this.closeDrawer();
    }
  }

  private closeDrawer(): void {
    this.visible.set(false);
    this.close.emit();
    this.openChange.emit({ open: false });
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
