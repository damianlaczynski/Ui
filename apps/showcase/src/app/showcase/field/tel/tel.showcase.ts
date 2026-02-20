import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TelComponent } from 'ui';
import type { InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { TEL_DRAWER_CONFIGS } from './tel.showcase.config';
import { TelInteractiveComponent } from './tel.interactive';

@Component({
  selector: 'app-tel-showcase',
  imports: [
    TelComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TelInteractiveComponent,
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
        <app-showcase-header title="Tel" />
        <p class="showcase__description">
          Comprehensive showcase of the Telephone component built with Fluent 2 Design System. All
          variants are responsive and accessible.
        </p>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the input height."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-tel
                  [label]="size + ' Phone Field'"
                  placeholder="+1 (555) 123-4567"
                  [size]="size"
                  helpText="This is a {{ size }} phone field"
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
                <ui-tel
                  [label]="variant + ' variant'"
                  placeholder="+1 (555) 123-4567"
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
              <ui-tel
                label="Normal Field"
                placeholder="+1 (555) 123-4567"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                helpText="This is a normal phone field"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Error</h3>
              <ui-tel
                label="Error Field"
                placeholder="+1 (555) 123-4567"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [(errorText)]="errorStateText"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-tel
                label="Disabled Field"
                placeholder="+1 (555) 123-4567"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [disabled]="true"
                helpText="This field is disabled"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Read Only</h3>
              <ui-tel
                label="Read Only Field"
                placeholder="+1 (555) 123-4567"
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
              <ui-tel
                label="Required Field"
                placeholder="+1 (555) 123-4567"
                [inputVariant]="statesForm().variant"
                [size]="statesForm().size"
                [required]="true"
                helpText="This field is required"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <p class="showcase__section__description">
            Telephone fields in a form. Use ngModel or formControlName for reactive binding.
          </p>
          <form class="showcase__form">
            <ui-tel
              label="Mobile Phone"
              placeholder="+1 (555) 123-4567"
              [(ngModel)]="formData.mobile"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              helpText="Enter your mobile phone number"
            />
            <ui-tel
              label="Home Phone"
              placeholder="+1 (555) 123-4567"
              [(ngModel)]="formData.home"
              [ngModelOptions]="{ standalone: true }"
              helpText="Enter your home phone number (optional)"
            />
            <ui-tel
              label="Work Phone"
              placeholder="+1 (555) 123-4567"
              [(ngModel)]="formData.work"
              [ngModelOptions]="{ standalone: true }"
              helpText="Enter your work phone number"
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
            Experiment with all telephone field options in real time. Change label, placeholder,
            variant, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-tel-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TelShowcaseComponent {
  sizes = SIZES;
  variants = ['filled', 'filled-gray', 'filled-lighter', 'underlined'] as const;

  sizeDrawerFormConfig = TEL_DRAWER_CONFIGS.size;
  variantDrawerFormConfig = TEL_DRAWER_CONFIGS.variant;
  statesDrawerFormConfig = TEL_DRAWER_CONFIGS.states;

  readonlyValue = '+1 (555) 123-4567';

  formData = {
    mobile: '',
    home: '',
    work: '',
  };

  errorStateText = 'Invalid phone number format';

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
