import { Component } from '@angular/core';
import { EmptyStateComponent } from 'ui';

@Component({
  selector: 'app-empty-state-icons-sizes-demo',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:54rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Small
        </p>
        <ui-empty-state
          title="No drafts"
          description="Create a draft to start iterating."
          icon="document"
          size="small"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Medium
        </p>
        <ui-empty-state
          title="No results"
          description="Try changing the search term or removing some filters."
          icon="search"
          size="medium"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Large
        </p>
        <ui-empty-state
          title="Nothing scheduled"
          description="Plan the next activity to populate this timeline."
          icon="calendar"
          size="large"
        />
      </div>
    </div>
  `,
})
export class EmptyStateIconsSizesDemoComponent {}
