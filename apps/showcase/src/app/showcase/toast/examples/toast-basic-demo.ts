import { Component } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-basic-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
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
