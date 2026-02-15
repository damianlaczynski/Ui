import { Component, input, output, model } from '@angular/core';
import { Variant, Appearance, Size } from '../utils';
import { ToastPosition } from './models/toast.model';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon/generated/icon-name.type';
import { ButtonComponent } from 'angular-ui';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  imports: [IconComponent, ButtonComponent],
})
export class ToastComponent {
  title = input<string>('');
  message = input<string>('');

  // Unified Design System
  variant = input<Variant>('info');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');

  duration = input<number>(5000);
  dismissible = input<boolean>(true);
  showIcon = input<boolean>(true);
  showProgress = input<boolean>(true);
  position = input<ToastPosition>('top-right');
  visible = model<boolean>(true);

  dismiss = output<void>();
  actionClick = output<void>();

  toastClasses(): string {
    const classes = ['toast'];

    classes.push(`toast--${this.variant()}`);
    classes.push(`toast--${this.appearance()}`);
    classes.push(`toast--${this.size()}`);

    if (!this.visible()) {
      classes.push('toast--hidden');
    }

    return classes.join(' ');
  }

  getIconName(): IconName {
    switch (this.variant()) {
      case 'success':
        return 'checkmark_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error_circle';
      case 'info':
      default:
        return 'info';
    }
  }

  onDismiss(): void {
    this.visible.set(false);
    this.dismiss.emit();
  }

  onActionClick(): void {
    this.actionClick.emit();
  }
}
