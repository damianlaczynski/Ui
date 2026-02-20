import { Component, input, output, model, HostListener, computed } from '@angular/core';

import { QuickAction } from '../utils';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

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

  close = output<void>();
  backdropClick = output<void>();
  openChange = output<{ open: boolean }>();

  isOverlay = computed(() => this.type() === 'overlay');
  isInline = computed(() => this.type() === 'inline');
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
    const classes = ['drawer'];

    if (!this.visible()) {
      classes.push('drawer--hidden');
    }

    classes.push(`drawer--${this.position()}`);
    classes.push(`drawer--${this.type()}`);

    return classes.join(' ');
  });

  backdropClasses = computed(() => {
    const classes = ['drawer__backdrop'];

    if (!this.visible()) {
      classes.push('drawer__backdrop--hidden');
    }

    return classes.join(' ');
  });

  contentClasses = computed(() => {
    const classes = ['drawer__content'];

    classes.push(`drawer__content--${this.position()}`);
    classes.push(`drawer__content--${this.size()}`);

    return classes.join(' ');
  });

  headerClasses = computed(() => {
    return 'drawer__header';
  });

  bodyClasses = computed(() => {
    const classes = ['drawer__body'];
    if (!this.bodyScrollable()) {
      classes.push('drawer__body--no-scroll');
    }
    return classes.join(' ');
  });

  footerClasses = computed(() => {
    return 'drawer__footer';
  });

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

  hasActions(): boolean {
    return !!(
      this.primaryAction() ||
      this.secondaryAction() ||
      this.additionalActions().length > 0
    );
  }
}
