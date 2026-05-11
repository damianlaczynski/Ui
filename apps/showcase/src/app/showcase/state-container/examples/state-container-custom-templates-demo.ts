import { Component, signal } from '@angular/core';
import { StateContainerComponent, type State, initialState, loadedState, loadingState } from 'ui';

@Component({
  selector: 'app-state-container-custom-templates-demo',
  standalone: true,
  imports: [StateContainerComponent],
  template: `
    <div
      style="width:100%;max-width:38rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-state-container [state]="state()" [showEmptyOnInitial]="true">
        <ng-template #loadingContent>
          <div style="padding:2rem;text-align:center">
            <div style="margin-bottom:0.75rem;font-weight:600">Syncing records...</div>
            <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">Step 2 of 3</div>
          </div>
        </ng-template>

        <ng-template #emptyContent>
          <div style="padding:2rem;text-align:center">
            <div style="margin-bottom:0.5rem;font-weight:600">All caught up</div>
            <div style="color:var(--color-neutral-foreground2-rest)">There are no new records to review.</div>
          </div>
        </ng-template>

        <ng-template #dataState let-data>
          <div style="padding:1rem;display:grid;gap:0.75rem">
            <div style="font-weight:600">Data loaded successfully</div>
            <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
              Records: {{ data?.length ?? 0 }}
            </div>
          </div>
        </ng-template>
      </ui-state-container>
    </div>
  `,
})
export class StateContainerCustomTemplatesDemoComponent {
  protected readonly state = signal<State<string[]>>(loadingState(initialState<string[]>()));

  constructor() {
    setTimeout(() => {
      this.state.set(loadedState<string[]>([]));
      setTimeout(() => {
        this.state.set(loadedState(['Record A', 'Record B']));
      }, 1200);
    }, 1200);
  }
}
