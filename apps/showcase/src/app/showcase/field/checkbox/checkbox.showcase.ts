import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent, Shape, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { SIZES, SHAPES } from '@shared/utils/showcase/component-options.utils';
import { CHECKBOX_DRAWER_CONFIGS } from './checkbox.showcase.config';
import { CheckboxInteractiveComponent } from './checkbox.interactive';

@Component({
  selector: 'app-checkbox-showcase',
  imports: [
    CheckboxComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    CheckboxInteractiveComponent,
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
        <app-showcase-header title="Checkbox" />
        <p class="showcase__description">
          Checkbox component based on Fluent 2 Design System. Unified API: shape + size. Supports
          states like disabled, readonly, required, and indeterminate. Use for form selections,
          consent toggles, or any binary choice.
        </p>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Border radius options: rounded (default), circular, and square. Shape affects the visual style of the checkbox indicator."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ shape | titlecase }}</h3>
                <ui-checkbox
                  [label]="shape + ' checkbox'"
                  [shape]="shape"
                  [size]="shapeForm().size"
                  [readonly]="shapeForm().readonly"
                  [required]="shapeForm().required"
                  [formControl]="getShapeControl(shape)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Sizes"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the checkbox indicator and touch target."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-checkbox
                  [label]="size + ' checkbox'"
                  [shape]="sizeForm().shape"
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
          sectionDescription="Normal, disabled, required, readonly, and indeterminate states. Use the Customize drawer to adjust shape and size across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                @if (state.id === 'indeterminate') {
                  <ui-checkbox
                    [label]="state.label + ' checkbox'"
                    [shape]="statesForm().shape"
                    [size]="statesForm().size"
                    [disabled]="state.disabled"
                    [readonly]="state.readonly"
                    [required]="state.required"
                    [(ngModel)]="indeterminateValue"
                    [(indeterminate)]="isIndeterminate"
                  />
                } @else {
                  <ui-checkbox
                    [label]="state.label + ' checkbox'"
                    [shape]="statesForm().shape"
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
          sectionTitle="Shape + Size Combinations"
          sectionDescription="Combinations of shape and size. Use the Customize drawer to toggle disabled, readonly, and required across all examples."
          [formConfig]="combinationsDrawerFormConfig"
          [formValues]="combinationsFormValues()"
          (formValuesChange)="combinationsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (combo of combinationPresets; track combo.id) {
              <div class="showcase__item">
                <ui-checkbox
                  [label]="combo.label"
                  [shape]="combo.shape"
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
          <form [formGroup]="checkboxForm" class="showcase__form">
            <ui-checkbox
              label="Accept Terms and Conditions"
              formControlName="acceptTerms"
              helpText="You must accept to continue"
              [required]="true"
            />
            <ui-checkbox
              label="Subscribe to Newsletter"
              formControlName="subscribeNewsletter"
              helpText="Receive our weekly newsletter"
            />
            <ui-checkbox
              label="Share Data with Partners"
              formControlName="shareData"
              shape="circular"
            />
            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ checkboxForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all checkbox options in real time. Change label, help text, shape, size,
            and toggle states. The component emits change events—check the event log to see
            interactions.
          </p>
          <app-checkbox-interactive />
        </section>
      </div>
    </div>
  `,
})
export class CheckboxShowcaseComponent {
  shapes: Shape[] = [...SHAPES];
  sizes: Size[] = [...SIZES];

  shapeDrawerFormConfig = CHECKBOX_DRAWER_CONFIGS.shape;
  sizeDrawerFormConfig = CHECKBOX_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = CHECKBOX_DRAWER_CONFIGS.states;
  combinationsDrawerFormConfig = CHECKBOX_DRAWER_CONFIGS.combinations;

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      indeterminate: false,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      indeterminate: false,
    },
    {
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      indeterminate: false,
    },
    {
      id: 'readonly',
      label: 'Read Only',
      disabled: false,
      readonly: true,
      required: false,
      indeterminate: false,
    },
    {
      id: 'indeterminate',
      label: 'Indeterminate',
      disabled: false,
      readonly: false,
      required: false,
      indeterminate: true,
    },
  ];

  combinationPresets = [
    {
      id: 'rounded-small',
      label: 'Rounded + Small',
      shape: 'rounded' as Shape,
      size: 'small' as Size,
    },
    {
      id: 'rounded-large',
      label: 'Rounded + Large',
      shape: 'rounded' as Shape,
      size: 'large' as Size,
    },
    {
      id: 'circular-small',
      label: 'Circular + Small',
      shape: 'circular' as Shape,
      size: 'small' as Size,
    },
    {
      id: 'circular-large',
      label: 'Circular + Large',
      shape: 'circular' as Shape,
      size: 'large' as Size,
    },
  ];

  roundedShapeControl = new FormControl(true);
  circularShapeControl = new FormControl(false);
  squareShapeControl = new FormControl(false);

  smallSizeControl = new FormControl(true);
  mediumSizeControl = new FormControl(true);
  largeSizeControl = new FormControl(true);

  normalStateControl = new FormControl(true);
  disabledStateControl = new FormControl({ value: true, disabled: true });
  requiredStateControl = new FormControl(false);
  readonlyStateControl = new FormControl(true);
  indeterminateStateControl = new FormControl(false);
  indeterminateValue = false;
  isIndeterminate = true;

  roundedSmallControl = new FormControl(false);
  roundedLargeControl = new FormControl(true);
  circularSmallControl = new FormControl(false);
  circularLargeControl = new FormControl(true);

  checkboxForm = new FormGroup({
    acceptTerms: new FormControl(false),
    subscribeNewsletter: new FormControl(false),
    shareData: new FormControl(false),
  });

  shapeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  shapeForm = computed(() => this.toCheckboxForm(this.shapeFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    shape: 'rounded',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toCheckboxForm(this.sizeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    shape: 'rounded',
    size: 'medium',
  });
  statesForm = computed(() => this.toCheckboxForm(this.statesFormValues()));

  combinationsFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    required: false,
  });
  combinationsForm = computed(() => this.toCheckboxForm(this.combinationsFormValues()));

  constructor() {
    effect(() => {
      this.setControlsDisabled(
        [this.roundedShapeControl, this.circularShapeControl, this.squareShapeControl],
        this.shapeForm().disabled,
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
          this.roundedSmallControl,
          this.roundedLargeControl,
          this.circularSmallControl,
          this.circularLargeControl,
        ],
        this.combinationsForm().disabled,
      );
    });
  }

  private toCheckboxForm(v: Record<string, unknown>) {
    return {
      shape: (v['shape'] as Shape) ?? 'rounded',
      size: (v['size'] as Size) ?? 'medium',
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }

  getShapeControl(shape: Shape): FormControl {
    if (shape === 'rounded') return this.roundedShapeControl;
    if (shape === 'circular') return this.circularShapeControl;
    return this.squareShapeControl;
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
    if (id === 'indeterminate') return this.indeterminateStateControl;
    return this.normalStateControl;
  }

  getComboControl(id: string): FormControl {
    if (id === 'rounded-small') return this.roundedSmallControl;
    if (id === 'rounded-large') return this.roundedLargeControl;
    if (id === 'circular-small') return this.circularSmallControl;
    return this.circularLargeControl;
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
