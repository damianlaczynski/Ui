import { Component } from '@angular/core';
import { EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-scenarios-demo',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:56rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          No results
        </p>
        <ui-empty-state
          title="No matches found"
          description="Try different keywords or clear some filters."
          icon="search"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          First run
        </p>
        <ui-empty-state
          title="Create your first board"
          description="Start with a new board to organize work and track progress."
          icon="board"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          No access
        </p>
        <ui-empty-state
          title="Access restricted"
          description="You do not have permission to view this content. Contact an administrator for access."
          icon="shield"
        />
      </div>
    </div>
  `,
})
export class EmptyStateScenariosDemoComponent {}
