import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TotpComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { TOTP_DRAWER_CONFIGS } from './totp.showcase.config';
import { TotpInteractiveComponent } from './totp.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-totp-showcase',
  imports: [
    TotpComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TotpInteractiveComponent,
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
        <app-showcase-header title="TOTP" />
        <p class="showcase__description">
          TOTP (Time-based One-Time Password) component built with Fluent 2 Design System. Features
          automatic focus management, paste support, and keyboard navigation. Supports configurable
          digit count (4, 6, 8), input variants, sizes, and states.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-totp
                label="One-Time Password"
                helpText="Enter the 6-digit code from your authenticator app"
              />
            </div>
            <div class="showcase__item">
              <ui-totp
                label="TOTP Code"
                helpText="You can paste the full code or type digit by digit"
                [(ngModel)]="defaultTotp"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Digit Count"
          sectionDescription="Number of digit inputs: 4, 6 (default), or 8. Use the Customize drawer to adjust size, variant, and states across all examples."
          [formConfig]="digitsCountDrawerFormConfig"
          [formValues]="digitsCountFormValues()"
          (formValuesChange)="digitsCountFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (count of digitCounts; track count) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ count }}-Digit Code</h3>
                <ui-totp
                  [label]="count + '-digit verification code'"
                  [digitsCount]="count"
                  [size]="digitsCountForm().size"
                  [inputVariant]="digitsCountForm().variant"
                  [disabled]="digitsCountForm().disabled"
                  [readonly]="digitsCountForm().readonly"
                  [required]="digitsCountForm().required"
                  [helpText]="count + '-digit verification code'"
                  [(ngModel)]="digitCountValues[count]"
                  [ngModelOptions]="{ standalone: true }"
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
                <ui-totp
                  [label]="size + ' TOTP field'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [digitsCount]="sizeForm().digitsCount"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [helpText]="size + ' size TOTP field'"
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
                <ui-totp
                  [label]="variant + ' variant'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [digitsCount]="variantsForm().digitsCount"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  [helpText]="'Default ' + variant + ' variant'"
                  [(ngModel)]="variantValues[variant]"
                  [ngModelOptions]="{ standalone: true }"
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
                <ui-totp
                  [label]="state.label"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [digitsCount]="statesForm().digitsCount"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [errorText]="state.errorText"
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
                <ui-totp
                  [label]="combo.label"
                  [inputVariant]="combo.variant"
                  [size]="combo.size"
                  [digitsCount]="combinationsForm().digitsCount"
                  [disabled]="combinationsForm().disabled"
                  [readonly]="combinationsForm().readonly"
                  [required]="combinationsForm().required"
                  [helpText]="combo.label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Two-Factor Authentication Form</h2>
          <form class="showcase__form">
            <ui-totp
              label="Verification Code"
              placeholder="Enter 6-digit code"
              [(ngModel)]="formData.totpCode"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              [(errorText)]="totpErrorText"
              [helpText]="
                totpValidationState === 'success'
                  ? 'Code verified!'
                  : 'Enter the 6-digit code from your authenticator app'
              "
            />
            <div class="showcase__form-output">
              <strong>Form Value:</strong>
              <pre>{{ { totpCode: formData.totpCode || '(empty)' } | json }}</pre>
              <div><strong>Code Length:</strong> {{ formData.totpCode.length || 0 }}/6</div>
              <div>
                <strong>Is Valid:</strong> {{ totpValidationState === 'success' ? 'Yes' : 'No' }}
              </div>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all TOTP options in real time. Change label, placeholder, help text,
            digits count, variant, size, and toggle states. The component emits change events—check
            the event log to see interactions.
          </p>
          <app-totp-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TotpShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];
  digitCounts = [4, 6, 8];

  digitsCountDrawerFormConfig = TOTP_DRAWER_CONFIGS.digitsCount;
  sizeDrawerFormConfig = TOTP_DRAWER_CONFIGS.size;
  variantsDrawerFormConfig = TOTP_DRAWER_CONFIGS.variants;
  statesDrawerFormConfig = TOTP_DRAWER_CONFIGS.states;
  combinationsDrawerFormConfig = TOTP_DRAWER_CONFIGS.combinations;

  defaultTotp = '123456';

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'This is a normal TOTP field',
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
      errorText: 'Invalid code. Please try again.',
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

  digitCountValues: Record<number, string> = {};
  sizeValues: Record<string, string> = {};
  variantValues: Record<string, string> = {};
  stateValues: Record<string, string> = {
    readonly: '654321',
  };

  formData = {
    totpCode: '',
  };

  get totpValidationState(): 'error' | 'warning' | 'success' | 'info' {
    const code = this.formData.totpCode;
    if (!code) return 'info';
    if (code.length < 6) return 'warning';
    if (code.length === 6 && /^\d{6}$/.test(code)) return 'success';
    return 'error';
  }

  get totpErrorText(): string {
    return this.totpValidationState === 'error' ? 'Invalid verification code' : '';
  }

  digitsCountFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false,
  });
  digitsCountForm = computed(() => this.toForm(this.digitsCountFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    digitsCount: '6',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  variantsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    digitsCount: '6',
    disabled: false,
    readonly: false,
    required: false,
  });
  variantsForm = computed(() => this.toForm(this.variantsFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    digitsCount: '6',
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  combinationsFormValues = signal<Record<string, unknown>>({
    digitsCount: '6',
    disabled: false,
    readonly: false,
    required: false,
  });
  combinationsForm = computed(() => this.toForm(this.combinationsFormValues()));

  private toForm(v: Record<string, unknown>): {
    size: Size;
    variant: InputVariant;
    digitsCount: number;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      size: (v['size'] ?? 'medium') as Size,
      variant: (v['variant'] ?? 'filled') as InputVariant,
      digitsCount: Number(v['digitsCount']) || 6,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
