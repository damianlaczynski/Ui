import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { PasswordComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { PASSWORD_DRAWER_CONFIGS } from './password.showcase.config';
import { PasswordInteractiveComponent } from './password.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-password-showcase',
  imports: [
    PasswordComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    PasswordInteractiveComponent,
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
        <app-showcase-header title="Password" />
        <p class="showcase__description">
          Password component based on Fluent 2 Design System. Features password visibility toggle,
          input variants (filled, filled-gray, filled-lighter, underlined), sizes, and states. Use
          for login, registration, or any password input.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Examples</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Standard Password Field"
                placeholder="Enter your password"
                helpText="Password must be at least 8 characters"
              />
            </div>
            <div class="showcase__item">
              <ui-password
                label="Password with Value"
                placeholder="Enter password"
                [(ngModel)]="defaultPassword"
                [ngModelOptions]="{ standalone: true }"
                helpText="Toggle visibility to see password"
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
                <ui-password
                  [label]="variant + ' variant'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  placeholder="Enter password"
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
                <ui-password
                  [label]="size + ' password field'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  placeholder="Enter password"
                  [helpText]="size + ' size password field'"
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
                <ui-password
                  [label]="state.label"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [errorText]="state.errorText"
                  placeholder="Enter password"
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
                <ui-password
                  [label]="combo.label"
                  [inputVariant]="combo.variant"
                  [size]="combo.size"
                  [disabled]="combinationsForm().disabled"
                  [readonly]="combinationsForm().readonly"
                  [required]="combinationsForm().required"
                  placeholder="Enter password"
                  [helpText]="combo.label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Password Strength Indicator</h2>
          <p class="showcase__section__description">
            Example of integrating a password strength indicator with the password field. The
            strength bar updates based on character variety and length.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="Password"
                placeholder="Enter a strong password"
                [(ngModel)]="passwordWithStrength"
                [ngModelOptions]="{ standalone: true }"
                [helpText]="passwordHelpText"
                [(errorText)]="passwordErrorText"
              />
              <div class="showcase__password-strength-bar">
                <div
                  class="showcase__password-strength-bar__fill"
                  [attr.data-strength]="passwordStrength"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Registration Form</h2>
          <form class="showcase__form">
            <ui-password
              label="Password"
              placeholder="Enter password"
              [(ngModel)]="formData.password"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
            />
            <ui-password
              label="Confirm Password"
              placeholder="Re-enter password"
              [(ngModel)]="formData.confirmPassword"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              [(errorText)]="confirmPasswordErrorText"
              [helpText]="
                passwordsMatch && formData.confirmPassword
                  ? 'Passwords match'
                  : 'Must match the password above'
              "
            />
            <div class="showcase__form-output">
              <strong>Form Values:</strong>
              <pre>{{
                {
                  password: formData.password ? '***' : '',
                  confirmPassword: formData.confirmPassword ? '***' : '',
                } | json
              }}</pre>
              <div><strong>Passwords Match:</strong> {{ passwordsMatch ? 'Yes' : 'No' }}</div>
            </div>
          </form>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Autocomplete Attributes</h2>
          <p class="showcase__section__description">
            Use autocomplete attributes for proper browser autofill and password manager
            integration.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-password
                label="New Password"
                placeholder="Create new password"
                autocomplete="new-password"
                helpText="For registration or password creation"
              />
            </div>
            <div class="showcase__item">
              <ui-password
                label="Current Password"
                placeholder="Enter current password"
                autocomplete="current-password"
                helpText="For login or verification"
              />
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all password options in real time. Change label, placeholder, help text,
            variant, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-password-interactive />
        </section>
      </div>
    </div>
  `,
})
export class PasswordShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];

  variantsDrawerFormConfig = PASSWORD_DRAWER_CONFIGS.variants;
  sizeDrawerFormConfig = PASSWORD_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = PASSWORD_DRAWER_CONFIGS.states;
  combinationsDrawerFormConfig = PASSWORD_DRAWER_CONFIGS.combinations;

  defaultPassword = 'SecurePass123';

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'This is a normal password field',
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
      errorText: 'Password must contain at least one uppercase letter',
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
    readonly: 'ReadOnlyPassword',
  };

  formData = {
    password: '',
    confirmPassword: '',
  };

  passwordWithStrength = '';

  get passwordsMatch(): boolean {
    return (
      this.formData.password === this.formData.confirmPassword && this.formData.password !== ''
    );
  }

  get passwordStrength(): 'weak' | 'medium' | 'strong' | '' {
    if (!this.passwordWithStrength) return '';

    const hasLower = /[a-z]/.test(this.passwordWithStrength);
    const hasUpper = /[A-Z]/.test(this.passwordWithStrength);
    const hasNumber = /\d/.test(this.passwordWithStrength);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordWithStrength);
    const isLongEnough = this.passwordWithStrength.length >= 8;

    const criteria = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(
      Boolean,
    ).length;

    if (criteria <= 2) return 'weak';
    if (criteria <= 3) return 'medium';
    return 'strong';
  }

  get passwordErrorText(): string {
    if (!this.passwordWithStrength) return '';
    const strength = this.passwordStrength;
    if (strength === 'weak')
      return 'Password is too weak. Add uppercase, numbers, and special characters.';
    return '';
  }

  get passwordHelpText(): string {
    if (!this.passwordWithStrength) return 'Enter a password to check its strength';
    const strength = this.passwordStrength;
    if (strength === 'weak') return '';
    if (strength === 'medium') return 'Password strength: Medium. Consider adding more variety.';
    return 'Strong password! Good job.';
  }

  get confirmPasswordErrorText(): string {
    return !this.passwordsMatch && this.formData.confirmPassword ? 'Passwords do not match' : '';
  }

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
