import { Component } from '@angular/core';
import { StateContainerComponent, errorState, type State, TextComponent, ButtonComponent } from 'ui';

interface ActivityItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-state-container-list-layout-demo',
  standalone: true,
  imports: [ButtonComponent, StateContainerComponent, TextComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:60rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem">
        <ui-text placeholder="Search activity..." style="width:16rem" />
        <ui-button variant="secondary" appearance="outline">Filter</ui-button>
      </div>

      <div
        style="display:flex;align-items:center;justify-content:center;min-height:18rem;padding:1.5rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-state-container
          [state]="state"
          errorTitle="Could not load activity"
          errorIcon="history"
          [errorPrimaryAction]="retryAction"
        >
          <div style="display:grid;gap:0.75rem;width:100%">
            @for (item of state.data ?? []; track item.id) {
              <div style="padding:0.875rem;border-radius:0.75rem;background:var(--color-neutral-background-rest)">
                {{ item.title }}
              </div>
            }
          </div>
        </ui-state-container>
      </div>
    </div>
  `,
})
export class StateContainerListLayoutDemoComponent {
  protected readonly state: State<ActivityItem[]> = errorState<ActivityItem[]>(
    'The activity feed could not be refreshed.',
  );

  protected readonly retryAction = {
    label: 'Retry',
    variant: 'primary' as const,
    icon: 'arrow_sync' as const,
    action: () => {},
  };
}
