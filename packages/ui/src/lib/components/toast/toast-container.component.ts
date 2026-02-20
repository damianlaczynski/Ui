import { Component, inject, input } from '@angular/core';

import { ToastComponent } from './toast.component';
import { ToastMessage, ToastPosition } from './models/toast.model';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'ui-toast-container',

  imports: [ToastComponent],
  template: `
    <div [class]="containerClasses()">
      @for (toast of toasts(); track toast.id) {
        <ui-toast
          [title]="toast.title"
          [message]="toast.message"
          [variant]="toast.variant || 'info'"
          [appearance]="toast.appearance || 'filled'"
          [size]="toast.size || 'medium'"
          [showIcon]="toast.showIcon !== false"
          [dismissible]="toast.dismissible !== false"
          [showProgress]="toast.showProgress !== false"
          [duration]="toast.duration || 5000"
          (dismiss)="onToastDismiss(toast)"
        />
      }
    </div>
  `,
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);

  toasts = this.toastService.toasts;
  // Inputs
  position = input<ToastPosition>('top-right');

  containerClasses(): string {
    return `toast-container toast-container--${this.position()}`;
  }

  onToastDismiss(toast: ToastMessage): void {
    this.toastService.remove(toast.id!);
  }
}
