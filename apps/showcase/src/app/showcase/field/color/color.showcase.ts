import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';
import { InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { COLOR_DRAWER_CONFIGS } from './color.showcase.config';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { ColorInteractiveComponent } from './color.interactive';
import { INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';

const COLOR_FORMATS = ['hex', 'rgb', 'hsl'] as const;

@Component({
  selector: 'app-color-showcase',
  imports: [
    ColorComponent,
    ReactiveFormsModule,
    CommonModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ColorInteractiveComponent,
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
        <app-showcase-header title="Color Picker" />
        <p class="showcase__description">
          The Color Picker component allows users to select colors. It supports HEX, RGB, and HSL
          formats, alpha channel, eye dropper tool, multiple input variants and sizes. Use for brand
          color selection, theme customization, or any color input scenario.
        </p>

        <app-section-with-drawer
          sectionTitle="Format"
          sectionDescription="Color output format: HEX (#RRGGBB), RGB (rgb(r,g,b)), or HSL (hsl(h,s%,l%)). Choose based on your use case—HEX for web, RGB/HSL for programmatic manipulation."
          [formConfig]="formatDrawerFormConfig"
          [formValues]="formatFormValues()"
          (formValuesChange)="formatFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (format of formats; track format) {
              <div class="showcase__item">
                <ui-color
                  [label]="format + ' Format'"
                  [format]="format"
                  [inputVariant]="formatForm().variant"
                  [size]="formatForm().size"
                  [showAlpha]="formatForm().showAlpha"
                  [showEyeDropper]="formatForm().showEyeDropper"
                  [readonly]="formatForm().readonly"
                  [required]="formatForm().required"
                  [formControl]="getFormatControl(format)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Input visual style: filled, filled-gray, filled-lighter, or underlined. Variants affect the background and border appearance of the color trigger."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of inputVariants; track variant) {
              <div class="showcase__item">
                <ui-color
                  [label]="variant"
                  [format]="variantForm().format"
                  [inputVariant]="variant"
                  [size]="variantForm().size"
                  [showAlpha]="variantForm().showAlpha"
                  [showEyeDropper]="variantForm().showEyeDropper"
                  [readonly]="variantForm().readonly"
                  [required]="variantForm().required"
                  [formControl]="getVariantControl(variant)"
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
                <ui-color
                  [label]="size"
                  [format]="sizeForm().format"
                  [inputVariant]="sizeForm().variant"
                  [size]="size"
                  [showAlpha]="sizeForm().showAlpha"
                  [showEyeDropper]="sizeForm().showEyeDropper"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [formControl]="getSizeControl(size)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Features"
          sectionDescription="Alpha channel adds opacity control. Eye dropper allows picking colors from the screen. Toggle these based on your design requirements."
          [formConfig]="featuresDrawerFormConfig"
          [formValues]="featuresFormValues()"
          (formValuesChange)="featuresFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of featurePresets; track preset.id) {
              <div class="showcase__item">
                <ui-color
                  [label]="preset.label"
                  [format]="featuresForm().format"
                  [inputVariant]="featuresForm().variant"
                  [size]="featuresForm().size"
                  [showAlpha]="preset.showAlpha"
                  [showEyeDropper]="preset.showEyeDropper"
                  [readonly]="featuresForm().readonly"
                  [required]="featuresForm().required"
                  [formControl]="getFeatureControl(preset.id)"
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
                <ui-color
                  [label]="state.label"
                  [format]="statesForm().format"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [showAlpha]="statesForm().showAlpha"
                  [showEyeDropper]="statesForm().showEyeDropper"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [formControl]="getStateControl(state.id)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <form [formGroup]="colorForm" class="showcase__form">
            <ui-color
              label="Brand Primary"
              formControlName="primaryColor"
              helpText="Main brand color"
              [format]="'hex'"
            />
            <ui-color
              label="Brand Secondary"
              formControlName="secondaryColor"
              helpText="Secondary brand color"
              [format]="'hex'"
            />
            <ui-color
              label="Accent Color"
              formControlName="accentColor"
              helpText="Accent color with opacity"
              [format]="'hex'"
              [showAlpha]="true"
            />
            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ colorForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all color picker options in real time. Change format, variant, size,
            toggle alpha and eye dropper, and test states. The component emits change events—check
            the event log to see interactions.
          </p>
          <app-color-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ColorShowcaseComponent {
  formats = COLOR_FORMATS;
  inputVariants = INPUT_VARIANTS;
  sizes = SIZES;

  formatDrawerFormConfig = COLOR_DRAWER_CONFIGS.format;
  variantDrawerFormConfig = COLOR_DRAWER_CONFIGS.variant;
  sizeDrawerFormConfig = COLOR_DRAWER_CONFIGS.size;
  featuresDrawerFormConfig = COLOR_DRAWER_CONFIGS.features;
  statesDrawerFormConfig = COLOR_DRAWER_CONFIGS.states;

  featurePresets = [
    { id: 'default', label: 'Default', showAlpha: false, showEyeDropper: true },
    { id: 'alpha', label: 'With Alpha', showAlpha: true, showEyeDropper: true },
    { id: 'noEyedropper', label: 'No Eye Dropper', showAlpha: false, showEyeDropper: false },
  ];

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, readonly: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, readonly: false, required: false },
    { id: 'readonly', label: 'Read-only', disabled: false, readonly: true, required: false },
    { id: 'required', label: 'Required', disabled: false, readonly: false, required: true },
  ];

  hexColorControl = new FormControl('#3B82F6');
  rgbColorControl = new FormControl('rgb(239, 68, 68)');
  hslColorControl = new FormControl('hsl(142, 71%, 45%)');

  filledControl = new FormControl('#00BCD4');
  filledGrayControl = new FormControl('#8BC34A');
  filledLighterControl = new FormControl('#FFEB3B');
  underlinedControl = new FormControl('#607D8B');

  smallSizeControl = new FormControl('#E91E63');
  mediumSizeControl = new FormControl('#2196F3');
  largeSizeControl = new FormControl('#FF9800');

  defaultFeatureControl = new FormControl('#9C27B0');
  alphaFeatureControl = new FormControl('#FF0000CC');
  noEyedropperFeatureControl = new FormControl('#4CAF50');

  normalStateControl = new FormControl('#607D8B');
  disabledStateControl = new FormControl(
    { value: '#9E9E9E', disabled: true },
    { nonNullable: false },
  );
  readonlyStateControl = new FormControl('#795548', { nonNullable: false });
  requiredStateControl = new FormControl('#3B82F6');

  colorForm = new FormGroup({
    primaryColor: new FormControl('#0078D4'),
    secondaryColor: new FormControl('#107C10'),
    accentColor: new FormControl('#881798CC'),
  });

  formatFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    showAlpha: false,
    showEyeDropper: true,
    disabled: false,
    readonly: false,
    required: false,
  });
  formatForm = computed(() => this.toColorForm(this.formatFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    format: 'hex',
    size: 'medium',
    showAlpha: false,
    showEyeDropper: true,
    disabled: false,
    readonly: false,
    required: false,
  });
  variantForm = computed(() => this.toColorForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    format: 'hex',
    variant: 'filled',
    showAlpha: false,
    showEyeDropper: true,
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toColorForm(this.sizeFormValues()));

  featuresFormValues = signal<Record<string, unknown>>({
    format: 'hex',
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  featuresForm = computed(() => this.toColorForm(this.featuresFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    format: 'hex',
    variant: 'filled',
    size: 'medium',
    showAlpha: false,
    showEyeDropper: true,
  });
  statesForm = computed(() => this.toColorForm(this.statesFormValues()));

  constructor() {
    effect(() => {
      this.setControlsDisabled(
        [this.hexColorControl, this.rgbColorControl, this.hslColorControl],
        this.formatForm().disabled,
      );
    });

    effect(() => {
      this.setControlsDisabled(
        [
          this.filledControl,
          this.filledGrayControl,
          this.filledLighterControl,
          this.underlinedControl,
        ],
        this.variantForm().disabled,
      );
    });

    effect(() => {
      this.setControlsDisabled(
        [this.smallSizeControl, this.mediumSizeControl, this.largeSizeControl],
        this.sizeForm().disabled,
      );
    });

    effect(() => {
      this.setControlsDisabled(
        [this.defaultFeatureControl, this.alphaFeatureControl, this.noEyedropperFeatureControl],
        this.featuresForm().disabled,
      );
    });
  }

  private toColorForm(v: Record<string, unknown>) {
    return {
      format: (v['format'] as (typeof COLOR_FORMATS)[number]) ?? 'hex',
      variant: (v['variant'] as InputVariant) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      showAlpha: !!v['showAlpha'],
      showEyeDropper: !!v['showEyeDropper'],
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }

  getFormatControl(format: (typeof COLOR_FORMATS)[number]): FormControl {
    if (format === 'hex') return this.hexColorControl;
    if (format === 'rgb') return this.rgbColorControl;
    return this.hslColorControl;
  }

  getVariantControl(variant: string): FormControl {
    if (variant === 'filled') return this.filledControl;
    if (variant === 'filled-gray') return this.filledGrayControl;
    if (variant === 'filled-lighter') return this.filledLighterControl;
    return this.underlinedControl;
  }

  getSizeControl(size: string): FormControl {
    if (size === 'small') return this.smallSizeControl;
    if (size === 'large') return this.largeSizeControl;
    return this.mediumSizeControl;
  }

  getFeatureControl(id: string): FormControl {
    if (id === 'alpha') return this.alphaFeatureControl;
    if (id === 'noEyedropper') return this.noEyedropperFeatureControl;
    return this.defaultFeatureControl;
  }

  getStateControl(id: string): FormControl {
    if (id === 'disabled') return this.disabledStateControl;
    if (id === 'readonly') return this.readonlyStateControl;
    if (id === 'required') return this.requiredStateControl;
    return this.normalStateControl;
  }

  private setControlsDisabled(controls: FormControl[], shouldDisable: boolean): void {
    for (const control of controls) {
      if (shouldDisable && control.enabled) {
        control.disable({ emitEvent: false });
      } else if (!shouldDisable && control.disabled) {
        control.enable({ emitEvent: false });
      }
    }
  }
}
