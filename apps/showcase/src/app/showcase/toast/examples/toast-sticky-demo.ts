import { Component, inject } from '@angular/core';
import { ButtonComponent, ToastService } from 'ui';

@Component({
  selector: 'app-toast-sticky-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
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
