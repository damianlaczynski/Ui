import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SliderComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { SLIDER_DRAWER_CONFIGS } from './slider.showcase.config';
import { SliderInteractiveComponent } from './slider.interactive';
import type { Size } from 'ui';

@Component({
  selector: 'app-slider-showcase',
  imports: [
    CommonModule,
    SliderComponent,
    FormsModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    SliderInteractiveComponent,
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
        <app-showcase-header title="Slider" />
        <p class="showcase__description">
          Comprehensive showcase of the Slider component built with Fluent 2 Design System. All
          variants are responsive and accessible. Use for volume, brightness, or any numeric range
          selection.
        </p>

        <app-section-with-drawer
          sectionTitle="Basic"
          sectionDescription="Simple sliders with default range (0–100). Use the Customize drawer to adjust size and states across all examples."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="basicFormValues()"
          (formValuesChange)="basicFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Volume</h3>
              <ui-slider
                label="Volume"
                [min]="0"
                [max]="100"
                [step]="1"
                [size]="basicForm().size"
                [disabled]="basicForm().disabled"
                [readonly]="basicForm().readonly"
                [required]="basicForm().required"
                [(ngModel)]="basicValues.volume"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Brightness</h3>
              <ui-slider
                label="Brightness"
                [min]="0"
                [max]="100"
                helpText="Adjust screen brightness"
                [size]="basicForm().size"
                [disabled]="basicForm().disabled"
                [readonly]="basicForm().readonly"
                [required]="basicForm().required"
                [(ngModel)]="basicValues.brightness"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the track height and thumb dimensions."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-slider
                  [label]="size + ' Slider'"
                  [size]="size"
                  [min]="0"
                  [max]="100"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [(ngModel)]="sizeValues[size]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Range"
          sectionDescription="Different min, max, and step configurations. Use the Customize drawer to adjust size and states."
          [formConfig]="rangeDrawerFormConfig"
          [formValues]="rangeFormValues()"
          (formValuesChange)="rangeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of rangePresets; track preset.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-slider
                  [label]="preset.label"
                  [min]="preset.min"
                  [max]="preset.max"
                  [step]="preset.step"
                  [helpText]="preset.helpText"
                  [size]="rangeForm().size"
                  [disabled]="rangeForm().disabled"
                  [readonly]="rangeForm().readonly"
                  [required]="rangeForm().required"
                  [(ngModel)]="rangePresetValues[preset.id]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Step"
          sectionDescription="Use showStepMarkers to display discrete step points on the track. Value snaps to multiples of step."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="stepFormValues()"
          (formValuesChange)="stepFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Step Example</h3>
              <ui-slider
                label="Step Example"
                [min]="0"
                [max]="12"
                [step]="3"
                [showStepMarkers]="true"
                [size]="stepForm().size"
                [disabled]="stepForm().disabled"
                [readonly]="stepForm().readonly"
                [(ngModel)]="stepValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Min/Max"
          sectionDescription="Display min and max values next to the slider for context."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="minmaxFormValues()"
          (formValuesChange)="minmaxFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Min/Max Example</h3>
              <ui-slider
                label="Min/Max Example"
                [min]="10"
                [max]="50"
                [showMinMax]="true"
                [size]="minmaxForm().size"
                [disabled]="minmaxForm().disabled"
                [readonly]="minmaxForm().readonly"
                [(ngModel)]="minmaxValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Vertical"
          sectionDescription="Vertical orientation with max value at top. Use for compact layouts."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="verticalFormValues()"
          (formValuesChange)="verticalFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Vertical Example</h3>
              <ui-slider
                label="Vertical Example"
                [vertical]="true"
                [min]="0"
                [max]="10"
                [step]="2"
                [showStepMarkers]="true"
                [size]="verticalForm().size"
                [disabled]="verticalForm().disabled"
                [readonly]="verticalForm().readonly"
                [(ngModel)]="verticalValue"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Accessibility"
          sectionDescription="ariaValueText provides custom accessible value description for screen readers."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="a11yFormValues()"
          (formValuesChange)="a11yFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">ariaValueText</h3>
              <ui-slider
                label="Control Slider"
                [ariaValueText]="getAriaValueText"
                [min]="20"
                [max]="200"
                [size]="a11yForm().size"
                [disabled]="a11yForm().disabled"
                [readonly]="a11yForm().readonly"
                [(ngModel)]="a11yValue"
                [ngModelOptions]="{ standalone: true }"
              />
              <p class="showcase__item__meta">Current value: {{ a11yValue }}</p>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, error, disabled, readonly, and required states. Use the Customize drawer to adjust size across all examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-slider
                  [label]="state.label"
                  [min]="0"
                  [max]="100"
                  [helpText]="state.helpText"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [(errorText)]="stateErrorTexts[state.id]"
                  [(ngModel)]="stateValues[state.id]"
                  [ngModelOptions]="{ standalone: true }"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Example</h2>
          <form class="showcase__form">
            <ui-slider
              label="Volume"
              [min]="0"
              [max]="100"
              helpText="Adjust the volume level"
              [(ngModel)]="formData.volume"
              [ngModelOptions]="{ standalone: true }"
            />
            <ui-slider
              label="Temperature"
              [min]="-20"
              [max]="40"
              [step]="1"
              [(ngModel)]="formData.temperature"
              [ngModelOptions]="{ standalone: true }"
              helpText="Temperature in Celsius"
            />
            <ui-slider
              label="Price Range"
              [min]="0"
              [max]="1000"
              [step]="10"
              [(ngModel)]="formData.price"
              [ngModelOptions]="{ standalone: true }"
              helpText="Price range in dollars"
            />
            <div class="showcase__form-output">
              <strong>Selected Values:</strong>
              <pre>{{ formData | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all slider options in real time. Change label, help text, min, max,
            step, size, and toggle states. The component emits change events—check the event log to
            see interactions.
          </p>
          <app-slider-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SliderShowcaseComponent {
  sizes: Size[] = [...SIZES];

  basicDrawerFormConfig = SLIDER_DRAWER_CONFIGS.basic;
  sizeDrawerFormConfig = SLIDER_DRAWER_CONFIGS.size;
  rangeDrawerFormConfig = SLIDER_DRAWER_CONFIGS.range;
  statesDrawerFormConfig = SLIDER_DRAWER_CONFIGS.states;

  rangePresets = [
    {
      id: 'rating',
      label: 'Rating (0–10)',
      min: 0,
      max: 10,
      step: 1,
      helpText: 'Rate from 0 to 10',
    },
    {
      id: 'opacity',
      label: 'Opacity (0–1)',
      min: 0,
      max: 1,
      step: 0.1,
      helpText: 'Adjust opacity from 0 to 1',
    },
    {
      id: 'custom',
      label: 'Custom (50–150)',
      min: 50,
      max: 150,
      step: 5,
      helpText: 'Custom range with step 5',
    },
  ];

  statePresets = [
    {
      id: 'normal',
      label: 'Normal',
      disabled: false,
      readonly: false,
      required: false,
      helpText: 'This is a normal slider',
    },
    {
      id: 'error',
      label: 'Error',
      disabled: false,
      readonly: false,
      required: false,
      helpText: '',
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      readonly: false,
      required: false,
      helpText: 'This slider is disabled',
    },
    {
      id: 'readonly',
      label: 'Read Only',
      disabled: false,
      readonly: true,
      required: false,
      helpText: 'This slider is read only',
    },
    {
      id: 'required',
      label: 'Required',
      disabled: false,
      readonly: false,
      required: true,
      helpText: 'This field is required',
    },
  ];

  basicValues = { volume: 50, brightness: 75 };
  sizeValues: Record<string, number> = { small: 30, medium: 50, large: 70 };
  rangePresetValues: Record<string, number> = { rating: 5, opacity: 0.5, custom: 100 };
  stepValue = 6;
  minmaxValue = 20;
  verticalValue = 6;
  a11yValue = 160;

  getAriaValueText = (value: number): string => `Value is ${value}`;
  stateValues: Record<string, number> = {
    normal: 50,
    error: 90,
    disabled: 50,
    readonly: 50,
    required: 50,
  };
  stateErrorTexts: Record<string, string> = {
    normal: '',
    error: 'Value out of safe range',
    disabled: '',
    readonly: '',
    required: '',
  };

  formData = {
    volume: 50,
    temperature: 20,
    price: 500,
  };

  basicFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  basicForm = computed(() => this.toForm(this.basicFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  rangeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  rangeForm = computed(() => this.toForm(this.rangeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
  });
  statesForm = computed(() => this.toForm(this.statesFormValues()));

  stepFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  stepForm = computed(() => this.toForm(this.stepFormValues()));

  minmaxFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  minmaxForm = computed(() => this.toForm(this.minmaxFormValues()));

  verticalFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  verticalForm = computed(() => this.toForm(this.verticalFormValues()));

  a11yFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  a11yForm = computed(() => this.toForm(this.a11yFormValues()));

  private toForm(v: Record<string, unknown>): {
    size: Size;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
