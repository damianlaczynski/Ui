import { Component } from '@angular/core';
import { EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-basic-demo',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div
      style="width:100%;max-width:28rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-empty-state
        title="No items yet"
        description="There is nothing to show in this section right now."
      />
    </div>
  `,
})
export class EmptyStateBasicDemoComponent {}
