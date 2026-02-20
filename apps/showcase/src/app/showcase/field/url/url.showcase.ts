import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { UrlComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { URL_DRAWER_CONFIGS } from './url.showcase.config';
import { UrlInteractiveComponent } from './url.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-url-showcase',
  imports: [
    UrlComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    UrlInteractiveComponent,
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
        <app-showcase-header title="URL" />
        <p class="showcase__description">
          URL input component based on Fluent 2 Design System. Supports variants (filled,
          filled-gray, filled-lighter, underlined), sizes, and states like disabled, readonly,
          required. Use for website URL input in forms.
        </p>

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
                <ui-url
                  [label]="size + ' URL Field'"
                  [placeholder]="'https://example.com'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [helpText]="'This is a ' + size + ' URL field'"
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
                <ui-url
                  [label]="variant + ' variant'"
                  [placeholder]="'https://example.com'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  [helpText]="'Fluent 2 ' + variant + ' style'"
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
                <ui-url
                  [label]="state.label"
                  [placeholder]="'https://example.com'"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
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

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <form class="showcase__form">
            <ui-url
              label="Website URL"
              placeholder="https://example.com"
              [(ngModel)]="formData.website"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              helpText="Enter your website URL"
            />
            <ui-url
              label="GitHub Repository"
              placeholder="https://github.com/user/repo"
              [(ngModel)]="formData.github"
              [ngModelOptions]="{ standalone: true }"
              helpText="Enter your GitHub repository URL"
            />
            <ui-url
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/profile"
              [(ngModel)]="formData.linkedin"
              [ngModelOptions]="{ standalone: true }"
              helpText="Enter your LinkedIn profile URL"
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
            Experiment with all URL field options in real time. Change label, placeholder, help
            text, variant, size, and toggle states. The component emits change events—check the
            event log to see interactions.
          </p>
          <app-url-interactive />
        </section>
      </div>
    </div>
  `,
})
export class UrlShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];

  sizeDrawerFormConfig = URL_DRAWER_CONFIGS.size;
  variantsDrawerFormConfig = URL_DRAWER_CONFIGS.variants;
  statesDrawerFormConfig = URL_DRAWER_CONFIGS.states;

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      helpText: 'Normal state',
      errorText: '',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      helpText: 'This field is disabled',
      errorText: '',
    },
    {
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      helpText: 'This field is required',
      errorText: '',
    },
    {
      id: 'readonly',
      label: 'Read Only',
      disabled: false,
      readonly: true,
      required: false,
      helpText: 'This field is read only',
      errorText: '',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      helpText: '',
      errorText: 'Invalid URL format',
    },
  ];

  stateValues: Record<string, string> = {
    readonly: 'https://www.microsoft.com',
  };

  formData = {
    website: '',
    github: '',
    linkedin: '',
  };

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
