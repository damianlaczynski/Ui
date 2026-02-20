import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent, DateRange, InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { DATE_RANGE_DRAWER_CONFIGS } from './date-range.showcase.config';
import { DateRangeInteractiveComponent } from './date-range.interactive';

@Component({
  selector: 'app-date-range-showcase',
  imports: [
    DateRangeComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    DateRangeInteractiveComponent,
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
        <app-showcase-header title="Date Range" />
        <p class="showcase__description">
          The Date Range component provides start and end date selection with visual range preview,
          quick presets, and full accessibility. It supports input variants, sizes, and states. Use
          for forms requiring date range input with calendar UI.
        </p>

        <app-section-with-drawer
          sectionTitle="Input Variant"
          sectionDescription="Visual style options: filled (default), filled-gray, filled-lighter, and underlined. Variant affects the input background and border."
          [formConfig]="inputVariantDrawerFormConfig"
          [formValues]="inputVariantFormValues()"
          (formValuesChange)="inputVariantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of inputVariants; track variant) {
              <div class="showcase__item">
                <ui-date-range
                  [label]="variant"
                  [inputVariant]="variant"
                  [size]="inputVariantForm().size"
                  [disabled]="inputVariantForm().disabled"
                  [readonly]="inputVariantForm().readonly"
                  [required]="inputVariantForm().required"
                  [(ngModel)]="variantValues[variant]"
                  [ngModelOptions]="{ standalone: true }"
                  [helpText]="'Select date range'"
                />
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
                <ui-date-range
                  [label]="size"
                  [inputVariant]="sizeForm().inputVariant"
                  [size]="size"
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
          sectionTitle="States"
          sectionDescription="Normal, disabled, readonly, required, and error states. Use the Customize drawer to adjust variant and size across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <ui-date-range
                  [label]="state.label"
                  [inputVariant]="statesForm().inputVariant"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [(ngModel)]="stateValues[state.id]"
                  [ngModelOptions]="{ standalone: true }"
                  [errorText]="state.errorText"
                  [helpText]="state.helpText"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date-range
                size="small"
                label="Standard Date Range"
                helpText="Select a date range"
              />
            </div>
            <div class="showcase__item">
              <ui-date-range
                label="Date Range with Value"
                [(ngModel)]="defaultRange"
                [ngModelOptions]="{ standalone: true }"
                helpText="Pre-filled date range"
              />
            </div>
            <div class="showcase__item">
              <ui-date-range
                label="Custom Separator"
                [separator]="' to '"
                [(ngModel)]="customSeparatorRange"
                [ngModelOptions]="{ standalone: true }"
                helpText="Using 'to' as separator"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Min/Max Constraints</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-date-range
                label="Date Range with Min Value"
                [min]="minDate"
                [(ngModel)]="constrainedRanges.minRange"
                [ngModelOptions]="{ standalone: true }"
                [helpText]="'Minimum date: ' + minDate"
              />
            </div>
            <div class="showcase__item">
              <ui-date-range
                label="Date Range with Max Value"
                [max]="maxDate"
                [(ngModel)]="constrainedRanges.maxRange"
                [ngModelOptions]="{ standalone: true }"
                [helpText]="'Maximum date: ' + maxDate"
              />
            </div>
            <div class="showcase__item">
              <ui-date-range
                label="Constrained Range (Min & Max)"
                [min]="minDate"
                [max]="maxDate"
                [(ngModel)]="constrainedRanges.bothRange"
                [ngModelOptions]="{ standalone: true }"
                [helpText]="'Range: ' + minDate + ' to ' + maxDate"
              />
            </div>
          </div>
          <div class="showcase__form-output">
            <strong>Constrained Ranges:</strong>
            <pre>{{ constrainedRanges | json }}</pre>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all date range options in real time. Change label, help text, variant,
            size, and toggle states. The component emits change events—check the event log to see
            interactions.
          </p>
          <app-date-range-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DateRangeShowcaseComponent {
  inputVariants = [...INPUT_VARIANTS];
  sizes = SIZES;

  defaultRange: DateRange = {
    startDate: '2024-03-01',
    endDate: '2024-03-15',
  };

  customSeparatorRange: DateRange = {
    startDate: '2024-04-01',
    endDate: '2024-04-30',
  };

  today = new Date().toISOString().split('T')[0];
  minDate = '2024-01-01';
  maxDate = '2024-12-31';

  constrainedRanges = {
    minRange: null as DateRange | null,
    maxRange: null as DateRange | null,
    bothRange: null as DateRange | null,
  };

  inputVariantDrawerFormConfig = DATE_RANGE_DRAWER_CONFIGS.inputVariant;
  sizeDrawerFormConfig = DATE_RANGE_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = DATE_RANGE_DRAWER_CONFIGS.states;

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'Select date range',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'This field is disabled',
    },
    {
      id: 'readonly',
      label: 'Read-only',
      disabled: false,
      readonly: true,
      required: false,
      errorText: '',
      helpText: 'This field is read only',
    },
    {
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      errorText: '',
      helpText: 'This field is required',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      errorText: 'Date range is required or invalid',
      helpText: '',
    },
  ];

  variantValues: Record<string, DateRange | null> = {};
  sizeValues: Record<string, DateRange | null> = {};
  stateValues: Record<string, DateRange | null> = {
    normal: null,
    disabled: null,
    readonly: { startDate: '2024-01-01', endDate: '2024-12-31' },
    required: null,
    error: null,
  };

  inputVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  inputVariantForm = computed(() => this.toDateRangeForm(this.inputVariantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    inputVariant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toDateRangeForm(this.sizeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    inputVariant: 'filled',
    size: 'medium',
  });
  statesForm = computed(() => this.toDateRangeForm(this.statesFormValues()));

  private toDateRangeForm(v: Record<string, unknown>) {
    return {
      inputVariant: (v['inputVariant'] as InputVariant) ?? 'filled',
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
