import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from 'ui';
import { InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  DROPDOWN_DRAWER_CONFIGS,
  DROPDOWN_INPUT_VARIANTS,
  DROPDOWN_MODES,
  DROPDOWN_BASIC_ITEMS,
} from './dropdown.showcase.config';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { DropdownInteractiveComponent } from './dropdown.interactive';
import type { DropdownMode } from 'ui';

@Component({
  selector: 'app-dropdown-showcase',
  imports: [
    CommonModule,
    FormsModule,
    DropdownComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    DropdownInteractiveComponent,
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
        <app-showcase-header title="Dropdown" />
        <p class="showcase__description">
          The Dropdown component lets users select one or multiple options from a list. It supports
          input variants (filled, filled-gray, filled-lighter, underlined), sizes, single and multi
          selection modes, searchable lists, and states like disabled or required. Use for form
          selects, filters, or any choice from a predefined set.
        </p>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Input variants control the visual style: filled (default), filled-gray, filled-lighter, and underlined. Choose based on context and hierarchy within your form layout."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of inputVariants; track variant) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="variant"
                  [items]="basicItems"
                  [inputVariant]="variant"
                  [size]="variantForm().size"
                  [mode]="variantForm().mode"
                  [searchable]="variantForm().searchable"
                  [clearable]="variantForm().clearable"
                  [disabled]="variantForm().disabled"
                  [required]="variantForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the trigger height and touch target. Choose based on form density and context."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="size"
                  [items]="basicItems"
                  [inputVariant]="sizeForm().variant"
                  [size]="size"
                  [mode]="sizeForm().mode"
                  [searchable]="sizeForm().searchable"
                  [clearable]="sizeForm().clearable"
                  [disabled]="sizeForm().disabled"
                  [required]="sizeForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Mode"
          sectionDescription="Single mode allows one selection; multi mode allows multiple selections with checkboxes and tags. Use single for exclusive choices, multi for filters or multi-select scenarios."
          [formConfig]="modeDrawerFormConfig"
          [formValues]="modeFormValues()"
          (formValuesChange)="modeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (mode of modes; track mode) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="mode"
                  [items]="basicItems"
                  [inputVariant]="modeForm().variant"
                  [size]="modeForm().size"
                  [mode]="mode"
                  [searchable]="modeForm().searchable"
                  [clearable]="modeForm().clearable"
                  [disabled]="modeForm().disabled"
                  [required]="modeForm().required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, and required states. Use the Customize drawer to adjust variant, size, and mode across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <ui-dropdown
                  [label]="state.label"
                  [items]="basicItems"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [mode]="statesForm().mode"
                  [searchable]="statesForm().searchable"
                  [clearable]="statesForm().clearable"
                  [disabled]="state.disabled"
                  [required]="state.required"
                  placeholder="Select..."
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all dropdown options in real time. Change label, placeholder, variant,
            size, mode, and toggle searchable, clearable, disabled, and required. The component
            emits selectionChange events—check the event log to see interactions.
          </p>
          <app-dropdown-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DropdownShowcaseComponent {
  inputVariants = DROPDOWN_INPUT_VARIANTS;
  sizes = SIZES;
  modes = DROPDOWN_MODES;
  basicItems = DROPDOWN_BASIC_ITEMS;

  variantDrawerFormConfig = DROPDOWN_DRAWER_CONFIGS.variant;
  sizeDrawerFormConfig = DROPDOWN_DRAWER_CONFIGS.size;
  modeDrawerFormConfig = DROPDOWN_DRAWER_CONFIGS.mode;
  statesDrawerFormConfig = DROPDOWN_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, required: false },
    { id: 'required', label: 'Required', disabled: false, required: true },
  ];

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    mode: 'single',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  variantForm = computed(() => this.toDropdownForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    mode: 'single',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  sizeForm = computed(() => this.toDropdownForm(this.sizeFormValues()));

  modeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
  });
  modeForm = computed(() => this.toDropdownForm(this.modeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    mode: 'single',
    searchable: false,
    clearable: false,
  });
  statesForm = computed(() => this.toDropdownForm(this.statesFormValues()));

  private toDropdownForm(v: Record<string, unknown>) {
    return {
      variant: (v['variant'] as InputVariant) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      mode: (v['mode'] as DropdownMode) ?? 'single',
      searchable: !!v['searchable'],
      clearable: !!v['clearable'],
      disabled: !!v['disabled'],
      required: !!v['required'],
    };
  }
}
