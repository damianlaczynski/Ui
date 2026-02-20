import { Component, signal, computed } from '@angular/core';
import {
  StateContainerComponent,
  SpinnerComponent,
  IconComponent,
  State,
  errorState,
  initialState,
  loadedState,
  loadingState,
  Size,
  TableOfContentComponent,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ShowcaseDemoCardComponent } from '@shared/components/showcase-demo-card';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { STATE_CONTAINER_DRAWER_CONFIGS } from './state-container.showcase.config';
import { StateContainerInteractiveComponent } from './state-container.interactive';

interface User {
  id: number;
  name: string;
  role: string;
}

const STATE_PRESETS = [
  { id: 'initial', label: 'Initial' },
  { id: 'loading', label: 'Loading' },
  { id: 'empty', label: 'Empty' },
  { id: 'loaded', label: 'Loaded' },
  { id: 'error', label: 'Error' },
] as const;

@Component({
  selector: 'app-state-container-showcase',
  imports: [
    StateContainerComponent,
    SpinnerComponent,
    IconComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ShowcaseDemoCardComponent,
    StateContainerInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="State Container" />
        <p class="showcase__description">
          A composable container that orchestrates loading, empty, error, and data states using the
          shared Fluent 2 status components. Bind it to your asynchronous data model and provide
          projected templates for the rendered data or to customise each state.
        </p>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="State container supports initial, loading, empty, loaded, and error states. Use the Customize drawer to adjust size and show empty on initial across all examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of statePresets; track preset.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-state-container
                  [state]="getStateForPreset(preset.id)"
                  [size]="statesForm().size"
                  [loadingTitle]="'Loading users...'"
                  [loadingDescription]="'Please wait while we fetch the latest people data.'"
                  [emptyTitle]="'No users yet'"
                  [emptyIcon]="'people_add'"
                  [emptyDescription]="'Invite your team or add your first user to get started.'"
                  [emptyPrimaryAction]="emptyPrimaryAction()"
                  [errorTitle]="'Unable to load users'"
                  [errorPrimaryAction]="errorPrimaryAction()"
                  [errorSecondaryAction]="errorSecondaryAction()"
                  [showEmptyOnInitial]="statesForm().showEmptyOnInitial"
                >
                  <div class="state-container-user-grid">
                    @for (user of getStateForPreset(preset.id).data ?? []; track user.id) {
                      <app-showcase-demo-card
                        [title]="user.name"
                        [subtitle]="user.role"
                        [badge]="'User #' + user.id"
                        appearance="filled-alternative"
                      >
                        <p class="state-container-user-card-note">
                          Account is active and ready for assignment.
                        </p>
                      </app-showcase-demo-card>
                    }
                  </div>
                </ui-state-container>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom State Templates</h2>
          <p class="showcase__section__description">
            Override any state completely by providing named templates. This example replaces the
            loading and empty renderings with bespoke markup while keeping the default data branch.
          </p>

          <div class="showcase__preview">
            <ui-state-container
              [state]="customState()"
              [showEmptyOnInitial]="true"
              [loadingTitle]="'Synchronising records'"
              [emptyTitle]="'All caught up!'"
            >
              <ng-template #loadingContent>
                <div style="padding: 32px; text-align: center;">
                  <ui-spinner size="small" />
                  <p style="margin-top: 12px; margin-bottom: 0;">
                    Fetching data from the service...
                  </p>
                </div>
              </ng-template>

              <ng-template #emptyContent>
                <div style="padding: 32px; text-align: center;">
                  <ui-icon icon="checkmark_circle" size="large" />
                  <p style="margin-top: 12px; margin-bottom: 0;">
                    There is nothing to show right now.
                  </p>
                </div>
              </ng-template>

              <ng-template #dataState let-data>
                <div style="padding: 24px; text-align: center;">
                  <strong>Data loaded successfully.</strong>
                  <p style="margin-top: 8px; margin-bottom: 0;">Records: {{ data?.length ?? 0 }}</p>
                </div>
              </ng-template>
            </ui-state-container>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all state container options in real time. Change size, switch between
            states, and toggle show empty on initial. Action clicks are logged—check the event log
            to see interactions.
          </p>
          <app-state-container-interactive />
        </section>
      </div>
    </div>
  `,
})
export class StateContainerShowcaseComponent {
  private readonly sampleUsers: User[] = [
    { id: 1, name: 'Anna Kowalska', role: 'Administrator' },
    { id: 2, name: 'Piotr Nowak', role: 'Project Manager' },
    { id: 3, name: 'Zofia Wiśniewska', role: 'Product Designer' },
    { id: 4, name: 'Tomasz Zieliński', role: 'Developer' },
  ];

  statePresets = STATE_PRESETS;
  sizes: Size[] = [...SIZES];

  statesDrawerFormConfig = STATE_CONTAINER_DRAWER_CONFIGS.states;

  statesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showEmptyOnInitial: true,
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      size: (v['size'] as Size) ?? 'medium',
      showEmptyOnInitial: !!v['showEmptyOnInitial'],
    };
  });

  customState = signal<State<User[]>>(loadingState(initialState<User[]>()));

  emptyPrimaryAction = signal({
    label: 'Add user',
    variant: 'primary' as const,
    icon: 'add' as const,
    action: () => {},
  });

  errorPrimaryAction = signal({
    label: 'Retry',
    variant: 'primary' as const,
    icon: 'arrow_sync' as const,
    action: () => {},
  });

  errorSecondaryAction = signal({
    label: 'Reset',
    variant: 'secondary' as const,
    icon: 'dismiss' as const,
    action: () => {},
  });

  constructor() {
    setTimeout(() => {
      this.customState.set(loadedState<User[]>([]));
      setTimeout(() => {
        this.customState.set(loadedState(this.sampleUsers.slice(0, 2)));
      }, 1500);
    }, 1500);
  }

  getStateForPreset(presetId: (typeof STATE_PRESETS)[number]['id']): State<User[]> {
    switch (presetId) {
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
  }
}
