import { Component, computed, signal } from '@angular/core';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ButtonComponent, Step, StepperComponent, TableOfContentComponent, Size } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ORIENTATIONS, SIZES } from '@shared/utils/showcase/component-options.utils';
import { STEPPER_DRAWER_CONFIGS } from './stepper.showcase.config';
import { StepperInteractiveComponent } from './stepper.interactive';

type StepperOrientation = 'horizontal' | 'vertical';

const BASIC_STEPS: Step[] = [
  { id: 1, label: 'Personal Info', completed: false },
  { id: 2, label: 'Account Details', completed: false },
  { id: 3, label: 'Verification', completed: false },
  { id: 4, label: 'Complete', completed: false },
];

const ORIENTATION_STEPS: Step[] = [
  {
    id: 1,
    label: 'Plan',
    description: 'Define campaign settings',
    completed: true,
  },
  {
    id: 2,
    label: 'Create',
    description: 'Prepare creative assets',
    completed: false,
  },
  {
    id: 3,
    label: 'Review',
    description: 'Validate before launch',
    completed: false,
  },
  {
    id: 4,
    label: 'Launch',
    description: 'Publish campaign',
    completed: false,
  },
];

const LINEAR_STEPS: Step[] = [
  { id: 1, label: 'Basic Info', completed: false },
  { id: 2, label: 'Address', completed: false },
  { id: 3, label: 'Payment', completed: false },
  { id: 4, label: 'Confirm', completed: false },
];

const STATE_STEPS: Step[] = [
  { id: 1, label: 'Completed', completed: true },
  { id: 2, label: 'Active', completed: false },
  { id: 3, label: 'Error', error: true, completed: false },
  { id: 4, label: 'Warning', warning: true, completed: false },
  { id: 5, label: 'Disabled', disabled: true, completed: false },
];

const DEMO_STEPS: Step[] = [
  {
    id: 1,
    label: 'Personal Information',
    description: 'Enter your basic details',
    completed: false,
  },
  {
    id: 2,
    label: 'Address Details',
    description: 'Provide your address data',
    completed: false,
  },
  {
    id: 3,
    label: 'Review',
    description: 'Validate before submission',
    completed: false,
  },
  {
    id: 4,
    label: 'Complete',
    description: 'Finish registration',
    completed: false,
  },
];

@Component({
  selector: 'app-stepper-showcase',
  imports: [
    ButtonComponent,
    JsonPipe,
    TitleCasePipe,
    StepperComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    StepperInteractiveComponent,
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
        <app-showcase-header title="Stepper" />
        <p class="showcase__description">
          The Stepper component presents multi-step flows with clear progress. Use it for forms,
          onboarding, checkout, and any guided workflow.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="A default stepper setup with navigation controls. Use the Customize drawer to adjust visibility and behavior options."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__preview">
            <ui-stepper
              [steps]="overviewSteps()"
              [activeStepIndex]="activeOverviewStep()"
              [orientation]="overviewForm().orientation"
              [size]="overviewForm().size"
              [showLabels]="overviewForm().showLabels"
              [showDescriptions]="overviewForm().showDescriptions"
              [linear]="overviewForm().linear"
              [clickable]="overviewForm().clickable"
              (stepChange)="onOverviewStepChange($event)"
            />
            <div class="showcase__controls">
              <ui-button
                variant="secondary"
                (click)="previousOverviewStep()"
                [disabled]="activeOverviewStep() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="nextOverviewStep()"
                [disabled]="activeOverviewStep() >= overviewSteps().length - 1"
              >
                Next
              </ui-button>
              <ui-button appearance="outline" (click)="resetOverviewStepper()">Reset</ui-button>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Horizontal and vertical layouts for different container contexts. Toggle labels and descriptions in the drawer."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ orientation | titlecase }}</h3>
                <ui-stepper
                  [steps]="orientationSteps()"
                  [activeStepIndex]="orientationActiveSteps()[orientation]"
                  [orientation]="orientation"
                  [size]="orientationForm().size"
                  [showLabels]="orientationForm().showLabels"
                  [showDescriptions]="orientationForm().showDescriptions"
                  [linear]="orientationForm().linear"
                  [clickable]="orientationForm().clickable"
                  (stepChange)="onOrientationStepChange(orientation, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large size variants. Size changes indicator and label scale."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-stepper
                  [steps]="sizeSteps"
                  [activeStepIndex]="sizeActiveStep"
                  [size]="size"
                  [orientation]="sizeForm().orientation"
                  [showLabels]="sizeForm().showLabels"
                  [showDescriptions]="sizeForm().showDescriptions"
                  [linear]="sizeForm().linear"
                  [clickable]="sizeForm().clickable"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Linear Behavior"
          sectionDescription="Linear mode enforces step order. Use Complete & Next to mark progress."
          [formConfig]="behaviorDrawerFormConfig"
          [formValues]="behaviorFormValues()"
          (formValuesChange)="behaviorFormValues.set($event)"
        >
          <div class="showcase__preview">
            <ui-stepper
              [steps]="linearSteps()"
              [activeStepIndex]="activeLinearStep()"
              [orientation]="behaviorForm().orientation"
              [size]="behaviorForm().size"
              [showLabels]="behaviorForm().showLabels"
              [showDescriptions]="behaviorForm().showDescriptions"
              [linear]="true"
              [clickable]="behaviorForm().clickable"
              (stepChange)="onLinearStepChange($event)"
            />
            <div class="showcase__controls">
              <ui-button
                variant="secondary"
                (click)="previousLinearStep()"
                [disabled]="activeLinearStep() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="completeAndNextLinearStep()"
                [disabled]="activeLinearStep() >= linearSteps().length - 1"
              >
                Complete & Next
              </ui-button>
              <ui-button appearance="outline" (click)="resetLinearStepper()">Reset</ui-button>
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">State Variants</h2>
          <p class="showcase__section__description">
            Step states include completed, active, error, warning, and disabled.
          </p>
          <div class="showcase__preview">
            <ui-stepper [steps]="stateSteps" />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <p class="showcase__section__description">
            Example flow state synchronized with form progress data.
          </p>
          <div class="showcase__preview">
            <ui-stepper
              [steps]="demoSteps()"
              [activeStepIndex]="demoActiveStep()"
              [linear]="true"
              [clickable]="true"
              (stepChange)="onDemoStepChange($event)"
            />
            <div class="showcase__form-output">
              <strong>Demo Progress:</strong>
              <pre>{{ demoData() | json }}</pre>
            </div>
            <div class="showcase__controls">
              <ui-button
                variant="secondary"
                (click)="demoPreviousStep()"
                [disabled]="demoActiveStep() === 0"
              >
                Previous
              </ui-button>
              <ui-button
                variant="primary"
                (click)="demoCompleteAndNext()"
                [disabled]="demoActiveStep() >= demoSteps().length - 1"
              >
                Complete & Next
              </ui-button>
              <ui-button appearance="outline" (click)="demoReset()">Reset Demo</ui-button>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all stepper options in real time and inspect stepChange events.
          </p>
          <app-stepper-interactive />
        </section>
      </div>
    </div>
  `,
})
export class StepperShowcaseComponent {
  orientations: StepperOrientation[] = [...ORIENTATIONS];
  sizes: Size[] = [...SIZES];
  sizeSteps: Step[] = [
    { id: 1, label: 'Step 1', completed: true },
    { id: 2, label: 'Step 2', completed: false },
    { id: 3, label: 'Step 3', completed: false },
  ];
  sizeActiveStep = 1;
  stateSteps = STATE_STEPS;

  overviewDrawerFormConfig = STEPPER_DRAWER_CONFIGS.overview;
  orientationDrawerFormConfig = STEPPER_DRAWER_CONFIGS.orientation;
  sizeDrawerFormConfig = STEPPER_DRAWER_CONFIGS.size;
  behaviorDrawerFormConfig = STEPPER_DRAWER_CONFIGS.behavior;

  overviewSteps = signal<Step[]>(this.cloneSteps(BASIC_STEPS));
  orientationSteps = signal<Step[]>(this.cloneSteps(ORIENTATION_STEPS));
  linearSteps = signal<Step[]>(this.cloneSteps(LINEAR_STEPS));
  demoSteps = signal<Step[]>(this.cloneSteps(DEMO_STEPS));

  activeOverviewStep = signal(0);
  activeLinearStep = signal(0);
  orientationActiveSteps = signal<Record<StepperOrientation, number>>({
    horizontal: 0,
    vertical: 0,
  });
  demoActiveStep = signal(0);

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showLabels: true,
    showDescriptions: false,
    linear: false,
    clickable: true,
  });
  overviewForm = computed(() => this.toForm(this.overviewFormValues()));

  orientationFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showLabels: true,
    showDescriptions: true,
    linear: false,
    clickable: true,
  });
  orientationForm = computed(() => this.toForm(this.orientationFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    showLabels: true,
    showDescriptions: false,
    linear: false,
    clickable: true,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  behaviorFormValues = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    size: 'medium',
    showLabels: true,
    showDescriptions: false,
    clickable: true,
  });
  behaviorForm = computed(() => this.toForm(this.behaviorFormValues()));

  demoData = computed(() => {
    const stepIndex = this.demoActiveStep();
    const stepNames = ['Personal Information', 'Address Details', 'Review', 'Complete'];
    return {
      currentStep: stepIndex,
      totalSteps: 4,
      completedSteps: Array.from({ length: stepIndex }, (_, i) => i),
      currentStepName: stepNames[stepIndex] ?? 'Unknown',
    };
  });

  onOverviewStepChange(event: { step: Step; index: number }): void {
    this.activeOverviewStep.set(event.index);
  }

  nextOverviewStep(): void {
    const current = this.activeOverviewStep();
    const steps = this.overviewSteps();
    if (current >= steps.length - 1) return;
    this.overviewSteps.update(prev =>
      prev.map((step, index) => (index === current ? { ...step, completed: true } : step)),
    );
    this.activeOverviewStep.set(current + 1);
  }

  previousOverviewStep(): void {
    this.activeOverviewStep.update(value => Math.max(0, value - 1));
  }

  resetOverviewStepper(): void {
    this.activeOverviewStep.set(0);
    this.overviewSteps.set(this.cloneSteps(BASIC_STEPS));
  }

  onOrientationStepChange(
    orientation: StepperOrientation,
    event: { step: Step; index: number },
  ): void {
    this.orientationActiveSteps.update(prev => ({ ...prev, [orientation]: event.index }));
  }

  onLinearStepChange(event: { step: Step; index: number }): void {
    this.activeLinearStep.set(event.index);
  }

  previousLinearStep(): void {
    this.activeLinearStep.update(value => Math.max(0, value - 1));
  }

  completeAndNextLinearStep(): void {
    const current = this.activeLinearStep();
    const steps = this.linearSteps();
    if (current >= steps.length) return;
    this.linearSteps.update(prev =>
      prev.map((step, index) => (index === current ? { ...step, completed: true } : step)),
    );
    if (current < steps.length - 1) {
      this.activeLinearStep.set(current + 1);
    }
  }

  resetLinearStepper(): void {
    this.activeLinearStep.set(0);
    this.linearSteps.set(this.cloneSteps(LINEAR_STEPS));
  }

  onDemoStepChange(event: { step: Step; index: number }): void {
    this.demoActiveStep.set(event.index);
  }

  demoPreviousStep(): void {
    this.demoActiveStep.update(value => Math.max(0, value - 1));
  }

  demoCompleteAndNext(): void {
    const current = this.demoActiveStep();
    const steps = this.demoSteps();
    if (current >= steps.length) return;
    this.demoSteps.update(prev =>
      prev.map((step, index) => (index === current ? { ...step, completed: true } : step)),
    );
    if (current < steps.length - 1) {
      this.demoActiveStep.set(current + 1);
    }
  }

  demoReset(): void {
    this.demoActiveStep.set(0);
    this.demoSteps.set(this.cloneSteps(DEMO_STEPS));
  }

  private toForm(v: Record<string, unknown>): {
    orientation: StepperOrientation;
    size: Size;
    showLabels: boolean;
    showDescriptions: boolean;
    linear: boolean;
    clickable: boolean;
  } {
    return {
      orientation: (v['orientation'] as StepperOrientation) ?? 'horizontal',
      size: (v['size'] as Size) ?? 'medium',
      showLabels: (v['showLabels'] as boolean) ?? true,
      showDescriptions: !!v['showDescriptions'],
      linear: !!v['linear'],
      clickable: (v['clickable'] as boolean) ?? true,
    };
  }

  private cloneSteps(steps: Step[]): Step[] {
    return steps.map(step => ({ ...step }));
  }
}
