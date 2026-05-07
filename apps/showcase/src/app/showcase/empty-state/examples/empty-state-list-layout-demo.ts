import { Component } from '@angular/core';
import { ButtonComponent, EmptyStateComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-empty-state-list-layout-demo',
  standalone: true,
  imports: [ButtonComponent, EmptyStateComponent, TextComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:60rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem"
      >
        <ui-text placeholder="Search projects..." style="width:16rem" />
        <ui-button variant="secondary" appearance="outline">Filters</ui-button>
      </div>

      <div
        style="display:flex;align-items:center;justify-content:center;min-height:18rem;padding:1.5rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-empty-state
          title="No projects in this view"
          description="Try clearing filters or create a new project to get started."
          icon="folder"
        />
      </div>
    </div>
  `,
})
export class EmptyStateListLayoutDemoComponent {}
