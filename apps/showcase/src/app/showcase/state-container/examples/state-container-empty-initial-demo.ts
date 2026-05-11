import { Component } from '@angular/core';
import { StateContainerComponent, initialState } from 'ui';

@Component({
  selector: 'app-state-container-empty-initial-demo',
  standalone: true,
  imports: [StateContainerComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Initial hidden
        </p>
        <ui-state-container
          [state]="state"
          [showEmptyOnInitial]="false"
          emptyTitle="No records yet"
          emptyDescription="This will only show after the state resolves to empty."
        />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Initial shown as empty
        </p>
        <ui-state-container
          [state]="state"
          [showEmptyOnInitial]="true"
          emptyTitle="Start by adding a record"
          emptyDescription="Useful for first-run experiences where an initial blank should be actionable."
          emptyIcon="document_add"
        />
      </div>
    </div>
  `,
})
export class StateContainerEmptyInitialDemoComponent {
  protected readonly state = initialState<any[]>();
}
