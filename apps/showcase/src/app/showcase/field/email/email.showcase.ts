import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { EmailComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { EMAIL_DRAWER_CONFIGS } from './email.showcase.config';
import { EmailInteractiveComponent } from './email.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-email-showcase',
  imports: [
    EmailComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    EmailInteractiveComponent,
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
        <app-showcase-header title="Email" />
        <p class="showcase__description">
          Email component based on Fluent 2 Design System. Features input variants (filled,
          filled-gray, filled-lighter, underlined), sizes, and states. Use for login, registration,
          contact forms, or any email input.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-email
                label="Email Address"
                placeholder="example@domain.com"
                helpText="Enter a valid email address"
              />
            </div>
            <div class="showcase__item">
              <ui-email
                label="With Default Value"
                placeholder="example@domain.com"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="Email field with default value"
              />
            </div>
          </div>
        </section>

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
                <ui-email
                  [label]="variant + ' variant'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  placeholder="example@domain.com"
                  [helpText]="'Default ' + variant + ' variant'"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the input height and touch target."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-email
                  [label]="size + ' email field'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  placeholder="example@domain.com"
                  [helpText]="size + ' size email field'"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, required, readonly, and error states."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-email
                  [label]="state.label"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [errorText]="state.errorText"
                  placeholder="example@domain.com"
                  [(ngModel)]="stateValues[state.id]"
                  [ngModelOptions]="{ standalone: true }"
                  [helpText]="state.helpText"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant + Size Combinations"
          sectionDescription="Combinations of variant and size. Use the Customize drawer to toggle disabled, readonly, and required across all examples."
          [formConfig]="combinationsDrawerFormConfig"
          [formValues]="combinationsFormValues()"
          (formValuesChange)="combinationsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (combo of combinationPresets; track combo.id) {
              <div class="showcase__item">
                <ui-email
                  [label]="combo.label"
                  [inputVariant]="combo.variant"
                  [size]="combo.size"
                  [disabled]="combinationsForm().disabled"
                  [readonly]="combinationsForm().readonly"
                  [required]="combinationsForm().required"
                  placeholder="example@domain.com"
                  [helpText]="combo.label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <form class="showcase__form" [formGroup]="formData">
            <ui-email
              label="Primary Email"
              placeholder="primary@example.com"
              formControlName="primaryEmail"
              [required]="true"
              helpText="Enter your primary email address"
            />
            <ui-email
              label="Secondary Email"
              placeholder="secondary@example.com"
              formControlName="secondaryEmail"
              helpText="Enter your secondary email address (optional)"
            />
            <ui-email
              label="Work Email"
              placeholder="work@company.com"
              formControlName="workEmail"
              helpText="Enter your work email address"
            />
            <div class="showcase__form-output">
              <strong>Form Values:</strong>
              <pre>{{ formData.value | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all email options in real time. Change label, placeholder, help text,
            variant, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-email-interactive />
        </section>
      </div>
    </div>
  `,
})
export class EmailShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];

  variantsDrawerFormConfig = EMAIL_DRAWER_CONFIGS.variants;
  sizeDrawerFormConfig = EMAIL_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = EMAIL_DRAWER_CONFIGS.states;
  combinationsDrawerFormConfig = EMAIL_DRAWER_CONFIGS.combinations;

  defaultValue = 'contact@microsoft.com';

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'This is a normal email field',
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
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      errorText: '',
      helpText: 'This field is required',
    },
    {
      id: 'readonly',
      label: 'Read Only',
      disabled: false,
      readonly: true,
      required: false,
      errorText: '',
      helpText: 'This field is read only',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      errorText: 'Invalid email format',
      helpText: '',
    },
  ];

  combinationPresets = [
    {
      id: 'filled-small',
      label: 'Filled + Small',
      variant: 'filled' as InputVariant,
      size: 'small' as Size,
    },
    {
      id: 'filled-large',
      label: 'Filled + Large',
      variant: 'filled' as InputVariant,
      size: 'large' as Size,
    },
    {
      id: 'underlined-small',
      label: 'Underlined + Small',
      variant: 'underlined' as InputVariant,
      size: 'small' as Size,
    },
    {
      id: 'underlined-large',
      label: 'Underlined + Large',
      variant: 'underlined' as InputVariant,
      size: 'large' as Size,
    },
  ];

  stateValues: Record<string, string> = {
    readonly: 'user@example.com',
  };

  formData = new FormGroup({
    primaryEmail: new FormControl('', [Validators.required, Validators.email]),
    secondaryEmail: new FormControl('', [Validators.required, Validators.email]),
    workEmail: new FormControl(''),
  });

  variantsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  variantsForm = computed(() => this.toForm(this.variantsFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  combinationsFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    required: false,
  });
  combinationsForm = computed(() => this.toForm(this.combinationsFormValues()));

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
