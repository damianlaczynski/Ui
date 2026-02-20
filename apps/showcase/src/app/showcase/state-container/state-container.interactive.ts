import { Component, signal, computed, viewChild } from '@angular/core';
import {
  StateContainerComponent,
  errorState,
  initialState,
  loadedState,
  loadingState,
  QuickAction,
  Size,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { STATE_CONTAINER_SHOWCASE_CONFIG } from './state-container.showcase.config';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-state-container-interactive',
  imports: [StateContainerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-state-container
          [state]="currentState()"
          [size]="currentSize()"
          [loadingTitle]="'Loading users...'"
          [loadingDescription]="'Please wait while we fetch the latest people data.'"
          [emptyTitle]="'No users yet'"
          [emptyIcon]="'people_add'"
          [emptyDescription]="'Invite your team or add your first user to get started.'"
          [emptyPrimaryAction]="emptyPrimaryAction()"
          [errorTitle]="'Unable to load users'"
          [errorPrimaryAction]="errorPrimaryAction()"
          [errorSecondaryAction]="errorSecondaryAction()"
          [showEmptyOnInitial]="currentShowEmptyOnInitial()"
          (errorActionClick)="onErrorAction($event)"
          (emptyActionClick)="onEmptyAction($event)"
        >
          <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;"
          >
            @for (user of currentState().data ?? []; track user.id) {
              <div
                style="padding: 16px; border-radius: 12px; border: 1px solid var(--Neutral-Stroke-rest, #EDEBE9); background: var(--Neutral-Background-rest, #FFFFFF); display: flex; flex-direction: column; gap: 4px;"
              >
                <strong>{{ user.name }}</strong>
                <span style="color: var(--color-neutral-foreground2-rest, #605E5C);">{{
                  user.role
                }}</span>
              </div>
            }
          </div>
        </ui-state-container>
      </div>
    </app-interactive-showcase>
  `,
})
export class StateContainerInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  private readonly sampleUsers: User[] = [
    { id: 1, name: 'Anna Kowalska', role: 'Administrator' },
    { id: 2, name: 'Piotr Nowak', role: 'Project Manager' },
    { id: 3, name: 'Zofia Wiśniewska', role: 'Product Designer' },
    { id: 4, name: 'Tomasz Zieliński', role: 'Developer' },
  ];

  showcaseConfig: ShowcaseConfig = STATE_CONTAINER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    state: 'loaded',
    showEmptyOnInitial: true,
  });

  currentSize = computed(() => (this.values()['size'] as Size) || 'medium');
  currentStateType = computed(() => (this.values()['state'] as string) || 'loaded');
  currentShowEmptyOnInitial = computed(
    () => (this.values()['showEmptyOnInitial'] as boolean) ?? true,
  );

  currentState = computed(() => {
    const stateType = this.currentStateType();
    switch (stateType) {
      case 'initial':
        return initialState<User[]>();
      case 'loading':
        return loadingState(initialState<User[]>());
      case 'empty':
        return loadedState<User[]>([]);
      case 'loaded':
        return loadedState(this.sampleUsers);
      case 'error':
        return errorState<User[]>('Nie udało się pobrać listy użytkowników. Spróbuj ponownie.');
      default:
        return loadedState(this.sampleUsers);
    }
  });

  emptyPrimaryAction = signal<QuickAction>({
    label: 'Add user',
    variant: 'primary',
    icon: 'add',
    action: () => this.showcase()?.logEvent('emptyActionClick', { label: 'Add user' }),
  });

  errorPrimaryAction = signal<QuickAction>({
    label: 'Retry',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => this.showcase()?.logEvent('errorActionClick', { label: 'Retry' }),
  });

  errorSecondaryAction = signal<QuickAction>({
    label: 'Reset',
    variant: 'secondary',
    icon: 'dismiss',
    action: () => this.showcase()?.logEvent('errorActionClick', { label: 'Reset' }),
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onErrorAction(action: QuickAction): void {
    this.showcase()?.logEvent('errorActionClick', { label: action.label });
  }

  onEmptyAction(action: QuickAction): void {
    this.showcase()?.logEvent('emptyActionClick', { label: action.label });
  }
}
