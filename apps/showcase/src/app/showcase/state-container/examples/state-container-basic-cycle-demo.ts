import { Component } from '@angular/core';
import { StateContainerComponent, type State, initialState, loadedState, loadingState, errorState } from 'ui';

interface UserCard {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-state-container-basic-cycle-demo',
  standalone: true,
  imports: [StateContainerComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:58rem"
    >
      @for (preset of presets; track preset.label) {
        <div
          style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <p style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)">
            {{ preset.label }}
          </p>

          <ui-state-container
            [state]="preset.state"
            [showEmptyOnInitial]="true"
            loadingTitle="Loading users..."
            loadingDescription="Fetching the latest people data."
            emptyTitle="No users yet"
            emptyDescription="Invite your first teammate to populate this workspace."
            emptyIcon="people_add"
            errorTitle="Could not load users"
          >
            <div style="display:grid;gap:0.5rem">
              @for (user of preset.state.data ?? []; track user.id) {
                <div
                  style="padding:0.75rem 0.875rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
                >
                  <strong>{{ user.name }}</strong>
                  <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                    {{ user.role }}
                  </div>
                </div>
              }
            </div>
          </ui-state-container>
        </div>
      }
    </div>
  `
})
export class StateContainerBasicCycleDemoComponent {
  private readonly users: UserCard[] = [
    { id: 1, name: 'Anna Kowalska', role: 'Administrator' },
    { id: 2, name: 'Piotr Nowak', role: 'Project Manager' }
  ];

  protected readonly presets: Array<{ label: string; state: State<UserCard[]> }> = [
    { label: 'Initial', state: initialState<UserCard[]>() },
    { label: 'Loading', state: loadingState(initialState<UserCard[]>()) },
    { label: 'Empty', state: loadedState<UserCard[]>([]) },
    { label: 'Loaded', state: loadedState(this.users) },
    { label: 'Error', state: errorState<UserCard[]>('Unable to load people data.') }
  ];
}
