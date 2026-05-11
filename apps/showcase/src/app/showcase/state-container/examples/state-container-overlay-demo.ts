import { Component, signal } from '@angular/core';
import { StateContainerComponent, type State, loadedState, loadingState } from 'ui';

interface SummaryCard {
  id: number;
  label: string;
  value: string;
}

@Component({
  selector: 'app-state-container-overlay-demo',
  standalone: true,
  imports: [StateContainerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div style="display:flex;justify-content:flex-start">
        <button
          type="button"
          style="padding:0.5rem 0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);cursor:pointer"
          (click)="toggleRefresh()"
        >
          {{ refreshing() ? 'Stop refresh' : 'Show refresh overlay' }}
        </button>
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-state-container
          [state]="state()"
          [loadingOverlay]="true"
          [loadingBlurContent]="true"
          loadingTitle="Refreshing summary"
          loadingDescription="Updating the latest metrics and activity."
        >
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem">
            @for (item of data; track item.id) {
              <div
                style="padding:0.875rem 1rem;border-radius:0.875rem;background:var(--color-neutral-background2-rest)"
              >
                <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                  {{ item.label }}
                </div>
                <strong style="font-size:1.125rem">{{ item.value }}</strong>
              </div>
            }
          </div>
        </ui-state-container>
      </div>
    </div>
  `
})
export class StateContainerOverlayDemoComponent {
  protected readonly data: SummaryCard[] = [
    { id: 1, label: 'Active projects', value: '12' },
    { id: 2, label: 'Pending reviews', value: '4' },
    { id: 3, label: 'Failed jobs', value: '1' }
  ];

  protected readonly refreshing = signal(true);
  protected readonly state = signal<State<SummaryCard[]>>(loadingState(loadedState(this.data)));

  protected toggleRefresh(): void {
    this.refreshing.update((value) => !value);
    this.state.set(this.refreshing() ? loadingState(loadedState(this.data)) : loadedState(this.data));
  }
}
