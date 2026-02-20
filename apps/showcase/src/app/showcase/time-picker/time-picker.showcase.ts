import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Size, TableOfContentComponent, TimePickerComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { TimePickerInteractiveComponent } from './time-picker.interactive';
import { TIME_PICKER_DRAWER_CONFIGS, TIME_PICKER_STEPS } from './time-picker.showcase.config';

@Component({
  selector: 'app-time-picker-showcase',
  imports: [
    CommonModule,
    TimePickerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TimePickerInteractiveComponent,
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
        <app-showcase-header title="Time Picker" />
        <p class="showcase__description">
          Time picker for selecting hours and minutes in 24-hour or 12-hour format. Supports size
          variants, step intervals, inline mode, label visibility, and disabled state.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Default configuration with all key options available in Customize: size, minute step, format, inline mode, label visibility, and disabled state."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time-picker
                [value]="overviewValue()"
                [size]="overviewForm().size"
                [step]="overviewForm().step"
                [use24HourFormat]="overviewForm().use24HourFormat"
                [inline]="overviewForm().inline"
                [showLabel]="overviewForm().showLabel"
                [label]="'Select Time'"
                [disabled]="overviewForm().disabled"
                (timeChange)="overviewValue.set($event)"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ overviewValue() || 'Not set' }}
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Format"
          sectionDescription="Comparison between 24-hour and 12-hour modes with shared options from the drawer."
          [formConfig]="formatDrawerFormConfig"
          [formValues]="formatFormValues()"
          (formValuesChange)="formatFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>24-Hour</h3>
              <ui-time-picker
                [value]="format24Value()"
                [size]="formatForm().size"
                [step]="formatForm().step"
                [inline]="formatForm().inline"
                [showLabel]="formatForm().showLabel"
                [disabled]="formatForm().disabled"
                [use24HourFormat]="true"
                (timeChange)="format24Value.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>12-Hour</h3>
              <ui-time-picker
                [value]="format12Value()"
                [size]="formatForm().size"
                [step]="formatForm().step"
                [inline]="formatForm().inline"
                [showLabel]="formatForm().showLabel"
                [disabled]="formatForm().disabled"
                [use24HourFormat]="false"
                (timeChange)="format12Value.set($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large sizes. Customize controls remaining options for all examples."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3>{{ size | titlecase }}</h3>
                <ui-time-picker
                  [value]="sizeValues()[size] || ''"
                  [size]="size"
                  [step]="sizeForm().step"
                  [use24HourFormat]="sizeForm().use24HourFormat"
                  [inline]="sizeForm().inline"
                  [showLabel]="sizeForm().showLabel"
                  [disabled]="sizeForm().disabled"
                  (timeChange)="setSizeValue(size, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Step"
          sectionDescription="Minute interval presets for the same picker: 1, 5, 15, and 30 minutes."
          [formConfig]="stepDrawerFormConfig"
          [formValues]="stepFormValues()"
          (formValuesChange)="stepFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (step of steps; track step) {
              <div class="showcase__item">
                <h3>{{ step / 60 }} min</h3>
                <ui-time-picker
                  [value]="stepValues()[step] || ''"
                  [size]="stepForm().size"
                  [step]="step"
                  [use24HourFormat]="stepForm().use24HourFormat"
                  [inline]="stepForm().inline"
                  [showLabel]="stepForm().showLabel"
                  [disabled]="stepForm().disabled"
                  (timeChange)="setStepValue(step, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Layout & Label"
          sectionDescription="Standard, inline, and inline-with-label layouts. Customize controls shared appearance and behavior."
          [formConfig]="inlineLabelDrawerFormConfig"
          [formValues]="inlineLabelFormValues()"
          (formValuesChange)="inlineLabelFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Standard</h3>
              <ui-time-picker
                [value]="layoutStandardValue()"
                [size]="inlineLabelForm().size"
                [step]="inlineLabelForm().step"
                [use24HourFormat]="inlineLabelForm().use24HourFormat"
                [disabled]="inlineLabelForm().disabled"
                [inline]="false"
                [showLabel]="false"
                (timeChange)="layoutStandardValue.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>Inline</h3>
              <ui-time-picker
                [value]="layoutInlineValue()"
                [size]="inlineLabelForm().size"
                [step]="inlineLabelForm().step"
                [use24HourFormat]="inlineLabelForm().use24HourFormat"
                [disabled]="inlineLabelForm().disabled"
                [inline]="true"
                [showLabel]="false"
                (timeChange)="layoutInlineValue.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>Inline + Label</h3>
              <ui-time-picker
                [value]="layoutInlineLabelValue()"
                [size]="inlineLabelForm().size"
                [step]="inlineLabelForm().step"
                [use24HourFormat]="inlineLabelForm().use24HourFormat"
                [disabled]="inlineLabelForm().disabled"
                [inline]="true"
                [showLabel]="true"
                [label]="'Meeting Time'"
                (timeChange)="layoutInlineLabelValue.set($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal and disabled variants with shared format, size, step, and layout options."
          [formConfig]="stateDrawerFormConfig"
          [formValues]="stateFormValues()"
          (formValuesChange)="stateFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Normal</h3>
              <ui-time-picker
                [value]="stateNormalValue()"
                [size]="stateForm().size"
                [step]="stateForm().step"
                [use24HourFormat]="stateForm().use24HourFormat"
                [inline]="stateForm().inline"
                [showLabel]="stateForm().showLabel"
                [disabled]="false"
                (timeChange)="stateNormalValue.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3>Disabled</h3>
              <ui-time-picker
                [value]="stateDisabledValue()"
                [size]="stateForm().size"
                [step]="stateForm().step"
                [use24HourFormat]="stateForm().use24HourFormat"
                [inline]="stateForm().inline"
                [showLabel]="stateForm().showLabel"
                [disabled]="true"
                (timeChange)="stateDisabledValue.set($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all time picker options in real time and inspect emitted events.
          </p>
          <app-time-picker-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TimePickerShowcaseComponent {
  sizes = SIZES;
  steps = [...TIME_PICKER_STEPS];

  overviewDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.overview;
  formatDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.format;
  sizeDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.size;
  stepDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.step;
  inlineLabelDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.inlineLabel;
  stateDrawerFormConfig = TIME_PICKER_DRAWER_CONFIGS.state;

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    use24HourFormat: true,
    inline: false,
    showLabel: false,
    disabled: false,
  });
  formatFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    inline: false,
    showLabel: false,
    disabled: false,
  });
  sizeFormValues = signal<Record<string, unknown>>({
    step: 60,
    use24HourFormat: true,
    inline: false,
    showLabel: false,
    disabled: false,
  });
  stepFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    use24HourFormat: true,
    inline: false,
    showLabel: false,
    disabled: false,
  });
  inlineLabelFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    use24HourFormat: true,
    disabled: false,
  });
  stateFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    step: 60,
    use24HourFormat: true,
    inline: false,
    showLabel: false,
  });

  overviewValue = signal('');
  format24Value = signal('');
  format12Value = signal('');
  layoutStandardValue = signal('');
  layoutInlineValue = signal('');
  layoutInlineLabelValue = signal('');
  stateNormalValue = signal('');
  stateDisabledValue = signal('09:30');

  sizeValues = signal<Record<Size, string>>({
    small: '',
    medium: '',
    large: '',
  });
  stepValues = signal<Record<number, string>>({
    60: '',
    300: '',
    900: '',
    1800: '',
  });

  overviewForm = computed(() => ({
    size: (this.overviewFormValues()['size'] as Size) || 'medium',
    step: (this.overviewFormValues()['step'] as number) || 60,
    use24HourFormat: (this.overviewFormValues()['use24HourFormat'] as boolean) ?? true,
    inline: (this.overviewFormValues()['inline'] as boolean) ?? false,
    showLabel: (this.overviewFormValues()['showLabel'] as boolean) ?? false,
    disabled: (this.overviewFormValues()['disabled'] as boolean) ?? false,
  }));

  formatForm = computed(() => ({
    size: (this.formatFormValues()['size'] as Size) || 'medium',
    step: (this.formatFormValues()['step'] as number) || 60,
    inline: (this.formatFormValues()['inline'] as boolean) ?? false,
    showLabel: (this.formatFormValues()['showLabel'] as boolean) ?? false,
    disabled: (this.formatFormValues()['disabled'] as boolean) ?? false,
  }));

  sizeForm = computed(() => ({
    step: (this.sizeFormValues()['step'] as number) || 60,
    use24HourFormat: (this.sizeFormValues()['use24HourFormat'] as boolean) ?? true,
    inline: (this.sizeFormValues()['inline'] as boolean) ?? false,
    showLabel: (this.sizeFormValues()['showLabel'] as boolean) ?? false,
    disabled: (this.sizeFormValues()['disabled'] as boolean) ?? false,
  }));

  stepForm = computed(() => ({
    size: (this.stepFormValues()['size'] as Size) || 'medium',
    use24HourFormat: (this.stepFormValues()['use24HourFormat'] as boolean) ?? true,
    inline: (this.stepFormValues()['inline'] as boolean) ?? false,
    showLabel: (this.stepFormValues()['showLabel'] as boolean) ?? false,
    disabled: (this.stepFormValues()['disabled'] as boolean) ?? false,
  }));

  inlineLabelForm = computed(() => ({
    size: (this.inlineLabelFormValues()['size'] as Size) || 'medium',
    step: (this.inlineLabelFormValues()['step'] as number) || 60,
    use24HourFormat: (this.inlineLabelFormValues()['use24HourFormat'] as boolean) ?? true,
    disabled: (this.inlineLabelFormValues()['disabled'] as boolean) ?? false,
  }));

  stateForm = computed(() => ({
    size: (this.stateFormValues()['size'] as Size) || 'medium',
    step: (this.stateFormValues()['step'] as number) || 60,
    use24HourFormat: (this.stateFormValues()['use24HourFormat'] as boolean) ?? true,
    inline: (this.stateFormValues()['inline'] as boolean) ?? false,
    showLabel: (this.stateFormValues()['showLabel'] as boolean) ?? false,
  }));

  setSizeValue(size: Size, value: string): void {
    this.sizeValues.update(prev => ({ ...prev, [size]: value }));
  }

  setStepValue(step: number, value: string): void {
    this.stepValues.update(prev => ({ ...prev, [step]: value }));
  }
}
