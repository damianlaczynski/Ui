import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberComponent } from 'ui';
import type { InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { NUMBER_DRAWER_CONFIGS } from './number.showcase.config';
import { NumberInteractiveComponent } from './number.interactive';

@Component({
  selector: 'app-number-showcase',
  imports: [
    NumberComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    NumberInteractiveComponent,
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
        <app-showcase-header title="Number" />
        <p class="showcase__description">
          Comprehensive showcase of the Number component built with Fluent 2 Design System. All
          variants are responsive and accessible. Supports min, max, step, and stepper controls.
        </p>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the input height and stepper controls."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-number
                  [label]="size + ' Number Field'"
                  placeholder="Enter a number"
                  [size]="size"
                  helpText="This is a {{ size }} number field"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Input Variant"
          sectionDescription="Visual style options: filled, filled-gray, filled-lighter, and underlined. Each variant provides distinct visual hierarchy."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant }}</h3>
                <ui-number
                  [label]="variant + ' variant'"
                  placeholder="Enter number"
                  [inputVariant]="variant"
                  [size]="variantForm().size"
                  [disabled]="variantForm().disabled"
                  [readonly]="variantForm().readonly"
                  [required]="variantForm().required"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, error, disabled, readonly, and required states. Use the Customize drawer to adjust variant and size across all examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Normal</h3>
              <ui-number
                label="Normal Field"
                placeholder="Enter number"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                helpText="This is a normal number field"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Error</h3>
              <ui-number
                label="Error Field"
                placeholder="Error state"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [(errorText)]="errorStateText"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-number
                label="Disabled Field"
                placeholder="Disabled field"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [disabled]="true"
                helpText="This field is disabled"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Read Only</h3>
              <ui-number
                label="Read Only Field"
                placeholder="Read only field"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [readonly]="true"
                [(ngModel)]="readonlyValue"
                [ngModelOptions]="{ standalone: true }"
                helpText="This field is read only"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Required</h3>
              <ui-number
                label="Required Field"
                placeholder="Required field"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [required]="true"
                helpText="This field is required"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Stepper"
          sectionDescription="Number fields with stepper controls. Different min, max, and step configurations for quantity, price, and temperature use cases."
          [formConfig]="stepperDrawerFormConfig"
          [formValues]="stepperFormValues()"
          (formValuesChange)="stepperFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Quantity (Step: 1)</h3>
              <ui-number
                label="Quantity (Step: 1)"
                placeholder="0"
                [inputVariant]="stepperForm().variant"
                [size]="stepperForm().size"
                [(ngModel)]="quantity"
                [ngModelOptions]="{ standalone: true }"
                [step]="1"
                [min]="0"
                [max]="100"
                [disabled]="stepperForm().disabled"
                [readonly]="stepperForm().readonly"
                [required]="stepperForm().required"
                helpText="Min: 0, Max: 100, Step: 1"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Price (Step: 0.01)</h3>
              <ui-number
                label="Price (Step: 0.01)"
                placeholder="0.00"
                [inputVariant]="stepperForm().variant"
                [size]="stepperForm().size"
                [(ngModel)]="price"
                [ngModelOptions]="{ standalone: true }"
                [step]="0.01"
                [min]="0"
                [disabled]="stepperForm().disabled"
                [readonly]="stepperForm().readonly"
                [required]="stepperForm().required"
                helpText="Min: 0, Step: 0.01"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Temperature (Step: 5)</h3>
              <ui-number
                label="Temperature (Step: 5)"
                placeholder="0"
                [inputVariant]="stepperForm().variant"
                [size]="stepperForm().size"
                [(ngModel)]="temperature"
                [ngModelOptions]="{ standalone: true }"
                [step]="5"
                [min]="-50"
                [max]="50"
                [disabled]="stepperForm().disabled"
                [readonly]="stepperForm().readonly"
                [required]="stepperForm().required"
                helpText="Min: -50, Max: 50, Step: 5"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <p class="showcase__section__description">
            Number fields in a form with validation. Use ngModel or formControlName for reactive
            binding. Supports min, max, step, and required validation.
          </p>
          <form class="showcase__form">
            <ui-number
              label="Age"
              placeholder="Enter your age"
              [(ngModel)]="formData.age"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              [step]="1"
              [min]="0"
              [max]="150"
              helpText="Enter your age in years (0-150)"
            />
            <ui-number
              label="Phone Number"
              placeholder="Enter phone number"
              [(ngModel)]="formData.phone"
              [ngModelOptions]="{ standalone: true }"
              [step]="1"
              helpText="Enter your phone number"
            />
            <ui-number
              label="Salary"
              placeholder="Enter salary"
              [(ngModel)]="formData.salary"
              [ngModelOptions]="{ standalone: true }"
              [step]="1000"
              [min]="0"
              helpText="Enter your annual salary (step: 1000)"
            />
            <ui-number
              label="Experience Years"
              placeholder="Years of experience"
              [(ngModel)]="formData.experience"
              [ngModelOptions]="{ standalone: true }"
              [step]="1"
              [min]="0"
              [max]="50"
              helpText="Years of work experience (0-50)"
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
            Experiment with all number field options in real time. Change label, placeholder, min,
            max, step, variant, size, and toggle states. The component emits change events—check the
            event log to see interactions.
          </p>
          <app-number-interactive />
        </section>
      </div>
    </div>
  `,
})
export class NumberShowcaseComponent {
  sizes = SIZES;
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'] as const;

  sizeDrawerFormConfig = NUMBER_DRAWER_CONFIGS.size;
  variantDrawerFormConfig = NUMBER_DRAWER_CONFIGS.variant;
  statesDrawerFormConfig = NUMBER_DRAWER_CONFIGS.states;
  stepperDrawerFormConfig = NUMBER_DRAWER_CONFIGS.stepper;

  readonlyValue = 42;

  quantity = 10;
  price = 19.99;
  temperature = 0;

  formData = {
    age: null as number | null,
    phone: null as number | null,
    salary: null as number | null,
    experience: null as number | null,
  };

  errorStateText = 'This field has an error';

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  variantForm = computed(() => this.toForm(this.variantFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  stepperFormValues = signal<Record<string, unknown>>({
    variant: 'filled-lighter',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  stepperForm = computed(() => this.toForm(this.stepperFormValues()));

  private toForm(v: Record<string, unknown>): {
    variant: InputVariant;
    size: Size;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      variant: (v['variant'] ?? 'filled') as InputVariant,
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
