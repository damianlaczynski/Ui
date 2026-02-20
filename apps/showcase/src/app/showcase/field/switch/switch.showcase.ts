import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent, Size, ContentPosition } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { SIZES, CONTENT_POSITIONS } from '@shared/utils/showcase/component-options.utils';
import { SWITCH_DRAWER_CONFIGS } from './switch.showcase.config';
import { SwitchInteractiveComponent } from './switch.interactive';

@Component({
  selector: 'app-switch-showcase',
  imports: [
    SwitchComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    SwitchInteractiveComponent,
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
        <app-showcase-header title="Switch" />
        <p class="showcase__description">
          Switch component based on Fluent 2 Design System. Supports label positions (before, after,
          above, below, none), sizes, and states like disabled, readonly, required. Use for binary
          toggles, settings, or form options.
        </p>

        <app-section-with-drawer
          sectionTitle="Label Positions"
          sectionDescription="Label can be positioned before, after, above, below the switch, or hidden (none) with aria-label for accessibility. Use the Customize drawer to adjust size and states across all examples."
          [formConfig]="labelPositionDrawerFormConfig"
          [formValues]="labelPositionFormValues()"
          (formValuesChange)="labelPositionFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (pos of labelPositions; track pos) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ pos | titlecase }}</h3>
                @if (pos === 'none') {
                  <ui-switch
                    ariaLabel="Switch without visible label"
                    [labelPosition]="pos"
                    [size]="labelPositionForm().size"
                    [readonly]="labelPositionForm().readonly"
                    [required]="labelPositionForm().required"
                    [formControl]="getLabelPositionControl(pos)"
                  />
                } @else {
                  <ui-switch
                    [label]="pos + ' label'"
                    [labelPosition]="pos"
                    [size]="labelPositionForm().size"
                    [readonly]="labelPositionForm().readonly"
                    [required]="labelPositionForm().required"
                    [formControl]="getLabelPositionControl(pos)"
                  />
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Sizes"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the switch track and touch target."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-switch
                  [label]="size + ' switch'"
                  [labelPosition]="sizeForm().labelPosition"
                  [size]="size"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [formControl]="getSizeControl(size)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, readonly, required, and error states. Use the Customize drawer to adjust label position and size across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                @if (state.id === 'error') {
                  <ui-switch
                    [label]="state.label + ' switch'"
                    [labelPosition]="statesForm().labelPosition"
                    [size]="statesForm().size"
                    [disabled]="state.disabled"
                    [readonly]="state.readonly"
                    [required]="state.required"
                    [(ngModel)]="errorStateValue"
                    [(errorText)]="errorStateText"
                  />
                } @else {
                  <ui-switch
                    [label]="state.label + ' switch'"
                    [labelPosition]="statesForm().labelPosition"
                    [size]="statesForm().size"
                    [readonly]="state.readonly"
                    [required]="state.required"
                    [formControl]="getStateControl(state.id)"
                  />
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Label Position + Size Combinations"
          sectionDescription="Combinations of label position and size. Use the Customize drawer to toggle disabled, readonly, and required across all examples."
          [formConfig]="combinationsDrawerFormConfig"
          [formValues]="combinationsFormValues()"
          (formValuesChange)="combinationsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (combo of combinationPresets; track combo.id) {
              <div class="showcase__item">
                <ui-switch
                  [label]="combo.label"
                  [labelPosition]="combo.labelPosition"
                  [size]="combo.size"
                  [readonly]="combinationsForm().readonly"
                  [required]="combinationsForm().required"
                  [formControl]="getComboControl(combo.id)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <form [formGroup]="switchForm" class="showcase__form">
            <ui-switch
              label="Email Notifications"
              formControlName="emailNotifications"
              helpText="Receive email notifications"
            />
            <ui-switch
              label="SMS Notifications"
              formControlName="smsNotifications"
              helpText="Receive SMS notifications"
            />
            <ui-switch
              label="Push Notifications"
              formControlName="pushNotifications"
              helpText="Receive push notifications"
            />
            <ui-switch
              label="Marketing Emails"
              formControlName="marketingEmails"
              helpText="Receive marketing emails"
            />
            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ switchForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all switch options in real time. Change label, help text, label
            position, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-switch-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SwitchShowcaseComponent {
  labelPositions: ContentPosition[] = [...CONTENT_POSITIONS];
  sizes: Size[] = [...SIZES];

  labelPositionDrawerFormConfig = SWITCH_DRAWER_CONFIGS.labelPosition;
  sizeDrawerFormConfig = SWITCH_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = SWITCH_DRAWER_CONFIGS.states;
  combinationsDrawerFormConfig = SWITCH_DRAWER_CONFIGS.combinations;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, readonly: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, readonly: false, required: false },
    { id: 'required', label: 'Required', disabled: false, readonly: false, required: true },
    { id: 'readonly', label: 'Read Only', disabled: false, readonly: true, required: false },
    { id: 'error', label: 'Error', disabled: false, readonly: false, required: false },
  ];

  combinationPresets = [
    {
      id: 'after-small',
      label: 'After + Small',
      labelPosition: 'after' as ContentPosition,
      size: 'small' as Size,
    },
    {
      id: 'after-large',
      label: 'After + Large',
      labelPosition: 'after' as ContentPosition,
      size: 'large' as Size,
    },
    {
      id: 'before-small',
      label: 'Before + Small',
      labelPosition: 'before' as ContentPosition,
      size: 'small' as Size,
    },
    {
      id: 'above-medium',
      label: 'Above + Medium',
      labelPosition: 'above' as ContentPosition,
      size: 'medium' as Size,
    },
  ];

  afterPositionControl = new FormControl(false);
  beforePositionControl = new FormControl(false);
  abovePositionControl = new FormControl(false);
  belowPositionControl = new FormControl(false);
  nonePositionControl = new FormControl(false);

  smallSizeControl = new FormControl(false);
  mediumSizeControl = new FormControl(true);
  largeSizeControl = new FormControl(false);

  normalStateControl = new FormControl(true);
  disabledStateControl = new FormControl({ value: true, disabled: true });
  requiredStateControl = new FormControl(false);
  readonlyStateControl = new FormControl(true);

  afterSmallControl = new FormControl(false);
  afterLargeControl = new FormControl(true);
  beforeSmallControl = new FormControl(false);
  aboveMediumControl = new FormControl(true);

  errorStateValue = false;
  errorStateText = 'This switch has an error';

  switchForm = new FormGroup({
    emailNotifications: new FormControl(true),
    smsNotifications: new FormControl(false),
    pushNotifications: new FormControl(true),
    marketingEmails: new FormControl(false),
  });

  labelPositionFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  labelPositionForm = computed(() => this.toSwitchForm(this.labelPositionFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    labelPosition: 'after',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toSwitchForm(this.sizeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    labelPosition: 'after',
    size: 'medium',
  });
  statesForm = computed(() => this.toSwitchForm(this.statesFormValues()));

  combinationsFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    required: false,
  });
  combinationsForm = computed(() => this.toSwitchForm(this.combinationsFormValues()));

  constructor() {
    effect(() => {
      this.setControlsDisabled(
        [
          this.afterPositionControl,
          this.beforePositionControl,
          this.abovePositionControl,
          this.belowPositionControl,
          this.nonePositionControl,
        ],
        this.labelPositionForm().disabled,
      );
    });

    effect(() => {
      this.setControlsDisabled(
        [this.smallSizeControl, this.mediumSizeControl, this.largeSizeControl],
        this.sizeForm().disabled,
      );
    });

    effect(() => {
      this.setControlsDisabled(
        [
          this.afterSmallControl,
          this.afterLargeControl,
          this.beforeSmallControl,
          this.aboveMediumControl,
        ],
        this.combinationsForm().disabled,
      );
    });
  }

  private toSwitchForm(v: Record<string, unknown>) {
    return {
      labelPosition: (v['labelPosition'] as ContentPosition) ?? 'after',
      size: (v['size'] as Size) ?? 'medium',
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }

  getLabelPositionControl(pos: ContentPosition): FormControl {
    if (pos === 'after') return this.afterPositionControl;
    if (pos === 'before') return this.beforePositionControl;
    if (pos === 'above') return this.abovePositionControl;
    if (pos === 'below') return this.belowPositionControl;
    return this.nonePositionControl;
  }

  getSizeControl(size: Size): FormControl {
    if (size === 'small') return this.smallSizeControl;
    if (size === 'large') return this.largeSizeControl;
    return this.mediumSizeControl;
  }

  getStateControl(id: string): FormControl {
    if (id === 'disabled') return this.disabledStateControl;
    if (id === 'required') return this.requiredStateControl;
    if (id === 'readonly') return this.readonlyStateControl;
    return this.normalStateControl;
  }

  getComboControl(id: string): FormControl {
    if (id === 'after-small') return this.afterSmallControl;
    if (id === 'after-large') return this.afterLargeControl;
    if (id === 'before-small') return this.beforeSmallControl;
    return this.aboveMediumControl;
  }

  private setControlsDisabled(controls: FormControl[], shouldDisable: boolean): void {
    for (const control of controls) {
      if (shouldDisable && control.enabled) {
        control.disable({ emitEvent: false });
      } else if (!shouldDisable && control.disabled) {
        control.enable({ emitEvent: false });
      }
    }
  }
}
