import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TextareaComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { TEXTAREA_DRAWER_CONFIGS } from './textarea.showcase.config';
import { TextareaInteractiveComponent } from './textarea.interactive';
import type { InputVariant, Size } from 'ui';

@Component({
  selector: 'app-textarea-showcase',
  imports: [
    TextareaComponent,
    CommonModule,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TextareaInteractiveComponent,
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
        <app-showcase-header title="Textarea" />
        <p class="showcase__description">
          Multi-line text input component based on Fluent 2 Design System. Supports variants
          (filled, filled-gray, filled-lighter, underlined), sizes, configurable rows, and states
          like disabled, readonly, required. Use for multi-line text input in forms.
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
                <ui-textarea
                  [label]="size + ' Textarea'"
                  [placeholder]="'Enter ' + size + ' text'"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [rows]="sizeForm().rows"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [helpText]="'This is a ' + size + ' textarea'"
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
                <ui-textarea
                  [label]="variant + ' variant'"
                  [placeholder]="'Enter text'"
                  [inputVariant]="variant"
                  [size]="variantsForm().size"
                  [rows]="variantsForm().rows"
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
          sectionTitle="Rows"
          sectionDescription="Configurable number of visible text rows. Affects the initial height of the textarea."
          [formConfig]="rowsDrawerFormConfig"
          [formValues]="rowsFormValues()"
          (formValuesChange)="rowsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (rowCount of rowPresets; track rowCount) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ rowCount }} rows</h3>
                <ui-textarea
                  [label]="rowCount + ' rows'"
                  [placeholder]="'Enter text'"
                  [inputVariant]="rowsForm().variant"
                  [size]="rowsForm().size"
                  [rows]="rowCount"
                  [disabled]="rowsForm().disabled"
                  [readonly]="rowsForm().readonly"
                  [required]="rowsForm().required"
                  [helpText]="'Textarea with ' + rowCount + ' rows'"
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
                <ui-textarea
                  [label]="state.label"
                  [placeholder]="'Enter text'"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [rows]="statesForm().rows"
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
            <ui-textarea
              label="Message"
              placeholder="Enter your message..."
              [(ngModel)]="formData.message"
              [ngModelOptions]="{ standalone: true }"
              [required]="true"
              [rows]="5"
              helpText="Enter your message"
            />
            <ui-textarea
              label="Notes"
              placeholder="Enter your notes..."
              [(ngModel)]="formData.notes"
              [ngModelOptions]="{ standalone: true }"
              [rows]="3"
              helpText="Optional notes"
            />
            <ui-textarea
              label="Description"
              placeholder="Enter description..."
              [(ngModel)]="formData.description"
              [ngModelOptions]="{ standalone: true }"
              [rows]="6"
              helpText="Detailed description"
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
            Experiment with all textarea options in real time. Change label, placeholder, help text,
            variant, size, rows, and toggle states. The component emits change events—check the
            event log to see interactions.
          </p>
          <app-textarea-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TextareaShowcaseComponent {
  sizes: Size[] = [...SIZES];
  variants = [...INPUT_VARIANTS];
  rowPresets = [3, 4, 6];

  sizeDrawerFormConfig = TEXTAREA_DRAWER_CONFIGS.size;
  variantsDrawerFormConfig = TEXTAREA_DRAWER_CONFIGS.variants;
  rowsDrawerFormConfig = TEXTAREA_DRAWER_CONFIGS.rows;
  statesDrawerFormConfig = TEXTAREA_DRAWER_CONFIGS.states;

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
      errorText: 'Please enter a valid value',
    },
  ];

  stateValues: Record<string, string> = {
    readonly:
      'This is a read-only textarea value that spans multiple lines.\nSecond line of text.\nThird line of text.',
  };

  formData = {
    message: '',
    notes: '',
    description: '',
  };

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  variantsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
  });
  variantsForm = computed(() => this.toForm(this.variantsFormValues()));

  rowsFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  rowsForm = computed(() => this.toForm(this.rowsFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    rows: 4,
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  private toForm(v: Record<string, unknown>): {
    size: Size;
    variant: InputVariant;
    rows: number;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      size: (v['size'] ?? 'medium') as Size,
      variant: (v['variant'] ?? 'filled') as InputVariant,
      rows: (v['rows'] ?? 4) as number,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
