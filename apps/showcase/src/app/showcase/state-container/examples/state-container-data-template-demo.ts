import { Component } from '@angular/core';
import { StateContainerComponent, loadedState, type State } from 'ui';

interface Metric {
  id: number;
  label: string;
  value: string;
}

@Component({
  selector: 'app-state-container-data-template-demo',
  standalone: true,
  imports: [StateContainerComponent],
  template: `
    <div
      style="width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-state-container [state]="state">
        <ng-template #dataState let-data>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:0.75rem"
          >
            @for (item of data ?? []; track item.id) {
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
        </ng-template>
      </ui-state-container>
    </div>
  `,
})
export class StateContainerDataTemplateDemoComponent {
  protected readonly state: State<Metric[]> = loadedState<Metric[]>([
    { id: 1, label: 'Open tasks', value: '24' },
    { id: 2, label: 'Blocked items', value: '3' },
    { id: 3, label: 'Approvals', value: '7' },
  ]);
}
