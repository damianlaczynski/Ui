import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SearchComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { SEARCH_DRAWER_CONFIGS } from './search.showcase.config';
import { SearchInteractiveComponent } from './search.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-search-showcase',
  imports: [
    SearchComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    SearchInteractiveComponent,
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
        <app-showcase-header title="Search" />
        <p class="showcase__description">
          Search component built with Fluent 2 Design System. Supports input variants (filled,
          filled-gray, filled-lighter, underlined), sizes, and states like disabled, readonly, or
          required. Use for search inputs, filters, or any text search field.
        </p>

        <app-section-with-drawer
          sectionTitle="Basic"
          sectionDescription="Default search field and with default value. Use the Customize drawer to adjust variant, size, and states."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="basicFormValues()"
          (formValuesChange)="basicFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Default</h3>
              <ui-search
                [label]="basicForm().label"
                [placeholder]="basicForm().placeholder"
                [inputVariant]="basicForm().variant"
                [size]="basicForm().size"
                [disabled]="basicForm().disabled"
                [readonly]="basicForm().readonly"
                [required]="basicForm().required"
                [helpText]="basicForm().helpText"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">With Default Value</h3>
              <ui-search
                [label]="basicForm().label"
                [placeholder]="basicForm().placeholder"
                [inputVariant]="basicForm().variant"
                [size]="basicForm().size"
                [disabled]="basicForm().disabled"
                [readonly]="basicForm().readonly"
                [required]="basicForm().required"
                [helpText]="basicForm().helpText"
                [(ngModel)]="defaultValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
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
                <ui-search
                  [label]="size + ' Search'"
                  [placeholder]="'Search…'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [helpText]="'This is a ' + size + ' search field'"
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
                <ui-search
                  [label]="variant + ' variant'"
                  [placeholder]="'Search…'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [disabled]="variantsForm().disabled"
                  [readonly]="variantsForm().readonly"
                  [required]="variantsForm().required"
                  [helpText]="'This is ' + variant + ' variant'"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, error, disabled, readonly, and required states."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-search
                  [label]="state.label"
                  [placeholder]="'Search…'"
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
            <ui-search
              label="Product Search"
              placeholder="Search products…"
              [(ngModel)]="formData.productSearch"
              [ngModelOptions]="{ standalone: true }"
              helpText="Search for products"
            />
            <ui-search
              label="User Search"
              placeholder="Search users…"
              [(ngModel)]="formData.userSearch"
              [ngModelOptions]="{ standalone: true }"
              helpText="Search for users"
            />
            <ui-search
              label="Document Search"
              placeholder="Search documents…"
              [(ngModel)]="formData.documentSearch"
              [ngModelOptions]="{ standalone: true }"
              helpText="Search for documents"
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
            Experiment with all search options in real time. Change label, placeholder, help text,
            variant, size, and toggle states. The component emits change events—check the event log
            to see interactions.
          </p>
          <app-search-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SearchShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];

  basicDrawerFormConfig = SEARCH_DRAWER_CONFIGS.basic;
  sizeDrawerFormConfig = SEARCH_DRAWER_CONFIGS.size;
  variantsDrawerFormConfig = SEARCH_DRAWER_CONFIGS.variants;
  statesDrawerFormConfig = SEARCH_DRAWER_CONFIGS.states;

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      errorText: '',
      helpText: 'This is a normal search field',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: true,
      errorText: 'Search query is too short',
      helpText: '',
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
      label: 'Read Only',
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
  ];

  defaultValue = 'Default search';
  stateValues: Record<string, string> = {
    readonly: 'Sample search query',
  };
  formData = {
    productSearch: '',
    userSearch: '',
    documentSearch: '',
  };

  basicFormValues = signal<Record<string, unknown>>({
    label: 'Search',
    placeholder: 'Search…',
    helpText: 'Enter your search query',
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  basicForm = computed(() => this.toForm(this.basicFormValues()));

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
    label: string;
    placeholder: string;
    helpText: string;
    variant: InputVariant;
    size: Size;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      label: (v['label'] as string) ?? 'Search',
      placeholder: (v['placeholder'] as string) ?? 'Search…',
      helpText: (v['helpText'] as string) ?? '',
      variant: (v['variant'] ?? 'filled') as InputVariant,
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
