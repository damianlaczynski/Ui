import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TimeSpanComponent, TimeSpanValue } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { TIMESPAN_DRAWER_CONFIGS } from './time-span.showcase.config';
import { TimeSpanInteractiveComponent } from './time-span.interactive';
import type { InputVariant, Size } from 'angular-ui';

@Component({
  selector: 'app-time-span-showcase',
  imports: [
    TimeSpanComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TimeSpanInteractiveComponent,
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
        <app-showcase-header title="Time Span" />
        <p class="showcase__description">
          Comprehensive showcase of the Time Span component built with Fluent 2 Design System. This
          component allows users to set a duration using configurable time units (years, months,
          days, hours, minutes, seconds).
        </p>

        <app-section-with-drawer
          sectionTitle="Unit Configurations"
          sectionDescription="Choose which time units to display. Use the Customize drawer to adjust size, variant, and states across all examples."
          [formConfig]="unitsDrawerFormConfig"
          [formValues]="unitsFormValues()"
          (formValuesChange)="unitsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of unitPresets; track preset.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-time-span
                  [label]="preset.label"
                  [placeholder]="'PT1H30M'"
                  [showYears]="preset.showYears"
                  [showMonths]="preset.showMonths"
                  [showDays]="preset.showDays"
                  [showHours]="preset.showHours"
                  [showMinutes]="preset.showMinutes"
                  [showSeconds]="preset.showSeconds"
                  [size]="unitsForm().size"
                  [inputVariant]="unitsForm().variant"
                  [disabled]="unitsForm().disabled"
                  [readonly]="unitsForm().readonly"
                  [required]="unitsForm().required"
                  [(ngModel)]="unitPresetValues[preset.id]"
                  [ngModelOptions]="{ standalone: true }"
                />
                <div class="showcase__form-output">
                  <strong>Value:</strong>
                  <pre>{{ getUnitDisplayValue(preset.id) | json }}</pre>
                </div>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the trigger height and touch target."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-time-span
                  [label]="size + ' Time Span'"
                  [placeholder]="'PT1H30M'"
                  [size]="size"
                  [showDays]="true"
                  [showHours]="true"
                  [showMinutes]="true"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [(ngModel)]="sizeValues[size]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variants"
          sectionDescription="Input visual styles: filled, filled-gray, filled-lighter, and underlined."
          [formConfig]="variantsDrawerFormConfig"
          [formValues]="variantsFormValues()"
          (formValuesChange)="variantsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <ui-time-span
                  [label]="variant + ' variant'"
                  [placeholder]="'PT1H30M'"
                  [inputVariant]="variant"
                  [showDays]="true"
                  [showHours]="true"
                  [showMinutes]="true"
                  [size]="variantsForm().size"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  [(ngModel)]="variantValues[variant]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, required, readonly, error, and clearable states."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-time-span
                  [label]="state.label"
                  [placeholder]="'PT1H30M'"
                  [showDays]="true"
                  [showHours]="true"
                  [showMinutes]="true"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [clearable]="state.clearable"
                  [errorText]="state.errorText"
                  [(ngModel)]="stateValues[state.id]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Reactive Forms</h2>
          <form [formGroup]="reactiveForm" class="showcase__form">
            <ui-time-span
              label="Access Token Expiration"
              [showHours]="true"
              [showMinutes]="true"
              [showSeconds]="true"
              formControlName="accessTokenExpiration"
              inputVariant="filled"
              placeholder="Set expiration time"
              helpText="Output: ISO 8601 duration string (e.g., 'PT1H30M' for 1 hour 30 minutes)"
            />
            <ui-time-span
              label="Refresh Token Expiration"
              [showDays]="true"
              [showHours]="true"
              [showMinutes]="true"
              formControlName="refreshTokenExpiration"
              inputVariant="filled"
              placeholder="Set expiration time"
              helpText="Output: ISO 8601 duration string (e.g., 'P7D' for 7 days)"
            />
            <ui-time-span
              label="Password Reset Token Expiration"
              [showMinutes]="true"
              [showSeconds]="true"
              formControlName="passwordResetTokenExpiration"
              inputVariant="filled"
              placeholder="Set expiration time"
              helpText="Output: ISO 8601 duration string (e.g., 'PT10M' for 10 minutes)"
            />
            <div class="showcase__form-output">
              <strong>Form Values (Ready for API):</strong>
              <pre>{{ reactiveForm.value | json }}</pre>
              <strong>Form Status:</strong>
              <pre>{{ reactiveForm.status }}</pre>
            </div>
          </form>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <form class="showcase__form">
            <ui-time-span
              label="Project Duration"
              [showYears]="true"
              [showMonths]="true"
              [showDays]="true"
              [(ngModel)]="formData.projectDuration"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              inputVariant="filled"
              placeholder="Set project duration"
            />
            <ui-time-span
              label="Working Hours Per Day"
              [showHours]="true"
              [showMinutes]="true"
              [(ngModel)]="formData.workingHours"
              [ngModelOptions]="{ standalone: true }"
              inputVariant="filled"
              placeholder="Set working hours"
            />
            <ui-time-span
              label="Break Duration"
              [showMinutes]="true"
              [showSeconds]="true"
              [(ngModel)]="formData.breakDuration"
              [ngModelOptions]="{ standalone: true }"
              inputVariant="filled"
              placeholder="Set break duration"
            />
            <div class="showcase__form-output">
              <strong>Form Values:</strong>
              <pre>{{ formData | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all time span options in real time. Change label, help text, units,
            variant, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-time-span-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TimeSpanShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];

  unitsDrawerFormConfig = TIMESPAN_DRAWER_CONFIGS.units;
  sizeDrawerFormConfig = TIMESPAN_DRAWER_CONFIGS.size;
  variantsDrawerFormConfig = TIMESPAN_DRAWER_CONFIGS.variants;
  statesDrawerFormConfig = TIMESPAN_DRAWER_CONFIGS.states;

  unitPresets = [
    {
      id: 'days-hours-minutes',
      label: 'Duration (Days, Hours, Minutes)',
      showYears: false,
      showMonths: false,
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: false,
    },
    {
      id: 'all-units',
      label: 'Time Span (All Units)',
      showYears: true,
      showMonths: true,
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
    },
    {
      id: 'hours-minutes',
      label: 'Hours and Minutes Only',
      showYears: false,
      showMonths: false,
      showDays: false,
      showHours: true,
      showMinutes: true,
      showSeconds: false,
    },
    {
      id: 'days-only',
      label: 'Days Only',
      showYears: false,
      showMonths: false,
      showDays: true,
      showHours: false,
      showMinutes: false,
      showSeconds: false,
    },
    {
      id: 'years-months',
      label: 'Years and Months',
      showYears: true,
      showMonths: true,
      showDays: false,
      showHours: false,
      showMinutes: false,
      showSeconds: false,
    },
  ];

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      clearable: false,
      errorText: '',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      clearable: false,
      errorText: '',
    },
    {
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      clearable: false,
      errorText: '',
    },
    {
      id: 'readonly',
      label: 'Read Only',
      disabled: false,
      readonly: true,
      required: false,
      clearable: false,
      errorText: '',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      clearable: false,
      errorText: 'Please set a valid time span',
    },
    {
      id: 'clearable',
      label: 'Clearable',
      disabled: false,
      readonly: false,
      required: false,
      clearable: true,
      errorText: '',
    },
  ];

  unitPresetValues: Record<string, TimeSpanValue> = {};
  sizeValues: Record<string, TimeSpanValue> = {};
  variantValues: Record<string, TimeSpanValue> = {};
  stateValues: Record<string, TimeSpanValue> = {
    disabled: { days: 5, hours: 3, minutes: 30 },
    clearable: { hours: 8, minutes: 30 },
  };

  formData = {
    projectDuration: {} as TimeSpanValue,
    workingHours: {} as TimeSpanValue,
    breakDuration: {} as TimeSpanValue,
  };

  reactiveForm = new FormGroup({
    accessTokenExpiration: new FormControl('PT1H', [Validators.required]),
    refreshTokenExpiration: new FormControl('P7D', [Validators.required]),
    passwordResetTokenExpiration: new FormControl('PT10M', [Validators.required]),
  });

  unitsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  unitsForm = computed(() => this.toForm(this.unitsFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  variantsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  variantsForm = computed(() => this.toForm(this.variantsFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  getUnitDisplayValue(id: string): TimeSpanValue {
    return this.unitPresetValues[id] ?? {};
  }

  private toForm(v: Record<string, unknown>): {
    size: Size;
    variant: InputVariant;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      size: (v['size'] ?? 'medium') as Size,
      variant: (v['variant'] ?? 'filled') as InputVariant,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
