import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateComponent, DateFieldType, Size } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { DATE_DRAWER_CONFIGS } from './date.showcase.config';
import { DateInteractiveComponent } from './date.interactive';
import { SIZES } from '@shared/utils/showcase/component-options.utils';

const DATE_TYPES: DateFieldType[] = ['date', 'datetime-local', 'time', 'month', 'week'];

@Component({
  selector: 'app-date-showcase',
  imports: [
    DateComponent,
    CommonModule,
    ReactiveFormsModule,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    DateInteractiveComponent,
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
        <app-showcase-header title="Date" />
        <p class="showcase__description">
          The Date component provides date, time, and datetime selection with CDK Overlay
          positioning. It supports multiple input types (date, datetime-local, time, month, week),
          sizes, and states. Use for forms requiring date or time input with calendar and time
          picker UI.
        </p>

        <app-section-with-drawer
          sectionTitle="Date Type"
          sectionDescription="Input type determines what the user selects: date (single day), datetime-local (date and time), time (time only), month (month and year), or week (ISO week)."
          [formConfig]="dateTypeDrawerFormConfig"
          [formValues]="dateTypeFormValues()"
          (formValuesChange)="dateTypeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (dateType of dateTypes; track dateType) {
              <div class="showcase__item">
                <ui-date
                  [label]="dateType"
                  [dateType]="dateType"
                  [placeholder]="getPlaceholderByDateType(dateType)"
                  [size]="dateTypeForm().size"
                  [readonly]="dateTypeForm().readonly"
                  [required]="dateTypeForm().required"
                  [formControl]="getDateTypeControl(dateType)"
                  [helpText]="'Select ' + dateType"
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
                <ui-date
                  [label]="size"
                  [dateType]="sizeForm().dateType"
                  [placeholder]="getPlaceholderByDateType(sizeForm().dateType)"
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
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <ui-date
                  [label]="state.label"
                  [dateType]="statesForm().dateType"
                  [placeholder]="getPlaceholderByDateType(statesForm().dateType)"
                  [size]="statesForm().size"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [formControl]="getStateControl(state.id)"
                  [errorText]="state.errorText"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all date picker options in real time. Change date type, size, toggle
            states. The component emits change events—check the event log to see interactions.
          </p>
          <app-date-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DateShowcaseComponent {
  dateTypes = DATE_TYPES;
  sizes = SIZES;

  dateTypeDrawerFormConfig = DATE_DRAWER_CONFIGS.dateType;
  sizeDrawerFormConfig = DATE_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = DATE_DRAWER_CONFIGS.states;

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      errorText: '',
    },
    {
      id: 'readonly',
      label: 'Read-only',
      disabled: false,
      readonly: true,
      required: false,
      errorText: '',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      errorText: 'Date is required',
    },
  ];

  dateTypeControls: Record<string, FormControl<string | null>> = {
    date: new FormControl<string | null>(''),
    'datetime-local': new FormControl<string | null>(''),
    time: new FormControl<string | null>(''),
    month: new FormControl<string | null>(''),
    week: new FormControl<string | null>(''),
  };

  sizeControls: Record<string, FormControl<string | null>> = {
    small: new FormControl<string | null>(''),
    medium: new FormControl<string | null>(''),
    large: new FormControl<string | null>(''),
  };

  stateControls: Record<string, FormControl<string | null>> = {
    normal: new FormControl<string | null>(''),
    disabled: new FormControl<string | null>({ value: '', disabled: true }),
    readonly: new FormControl<string | null>('2024-12-31'),
    error: new FormControl<string | null>(''),
  };

  dateTypeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  dateTypeForm = computed(() => this.toDateForm(this.dateTypeFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    dateType: 'date',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toDateForm(this.sizeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    dateType: 'date',
    size: 'medium',
  });
  statesForm = computed(() => this.toDateForm(this.statesFormValues()));

  constructor() {
    effect(() => {
      this.setControlsDisabled(Object.values(this.dateTypeControls), this.dateTypeForm().disabled);
    });

    effect(() => {
      this.setControlsDisabled(Object.values(this.sizeControls), this.sizeForm().disabled);
    });
  }

  private toDateForm(v: Record<string, unknown>) {
    return {
      dateType: (v['dateType'] as DateFieldType) ?? 'date',
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }

  getDateTypeControl(dateType: string): FormControl<string | null> {
    return this.dateTypeControls[dateType] ?? new FormControl<string | null>('');
  }

  getSizeControl(size: string): FormControl<string | null> {
    return this.sizeControls[size] ?? new FormControl<string | null>('');
  }

  getStateControl(id: string): FormControl<string | null> {
    return this.stateControls[id] ?? new FormControl<string | null>('');
  }

  getPlaceholderByDateType(dateType: DateFieldType): string {
    if (dateType === 'date') return 'YYYY-MM-DD';
    if (dateType === 'datetime-local') return 'YYYY-MM-DD HH:mm';
    if (dateType === 'time') return 'HH:mm';
    if (dateType === 'month') return 'YYYY-MM';
    if (dateType === 'week') return 'YYYY-Www';
    return 'Select date';
  }

  private setControlsDisabled(
    controls: FormControl<string | null>[],
    shouldDisable: boolean,
  ): void {
    for (const control of controls) {
      if (shouldDisable && control.enabled) {
        control.disable({ emitEvent: false });
      } else if (!shouldDisable && control.disabled) {
        control.enable({ emitEvent: false });
      }
    }
  }
}
