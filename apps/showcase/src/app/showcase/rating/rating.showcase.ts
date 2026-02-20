import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { RATING_DRAWER_CONFIGS } from './rating.showcase.config';
import { RatingInteractiveComponent } from './rating.interactive';
import type { Size } from 'ui';

@Component({
  selector: 'app-rating-showcase',
  imports: [
    RatingComponent,
    CommonModule,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    RatingInteractiveComponent,
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
        <app-showcase-header title="Rating" />
        <p class="showcase__description">
          Rating component based on Fluent 2 Design System. Allows users to provide feedback by
          selecting a value using stars. Supports read-only mode, different sizes, customizable
          maximum, and value display.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Basic rating examples: default, with value display, read-only, and disabled. Use the Customize drawer to adjust max, size, and showValue across all examples."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Basic</h3>
              <ui-rating
                [value]="basicRating()"
                [max]="overviewForm().max"
                [size]="overviewForm().size"
                [showValue]="overviewForm().showValue"
                [disabled]="overviewForm().disabled"
                [readOnly]="overviewForm().readOnly"
                (valueChange)="basicRating.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">With Value Display</h3>
              <ui-rating
                [value]="valueDisplayRating()"
                [max]="overviewForm().max"
                [size]="overviewForm().size"
                [showValue]="true"
                [disabled]="overviewForm().disabled"
                [readOnly]="overviewForm().readOnly"
                (valueChange)="valueDisplayRating.set($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Read-Only</h3>
              <ui-rating
                [value]="4"
                [max]="overviewForm().max"
                [size]="overviewForm().size"
                [showValue]="overviewForm().showValue"
                [readOnly]="true"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-rating
                [value]="3"
                [max]="overviewForm().max"
                [size]="overviewForm().size"
                [showValue]="overviewForm().showValue"
                [disabled]="true"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects star dimensions and touch target."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-rating
                  [value]="sizeRatings()[size]"
                  [max]="sizeForm().max"
                  [size]="size"
                  [showValue]="sizeForm().showValue"
                  [disabled]="sizeForm().disabled"
                  [readOnly]="sizeForm().readOnly"
                  (valueChange)="onSizeRatingChange(size, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Custom Maximum"
          sectionDescription="Rating with custom maximum value. Use the Customize drawer to adjust size and states across all examples."
          [formConfig]="maxDrawerFormConfig"
          [formValues]="maxFormValues()"
          (formValuesChange)="maxFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of maxPresets; track preset.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-rating
                  [value]="maxPresetValues()[preset.id]"
                  [max]="preset.max"
                  [size]="maxForm().size"
                  [showValue]="true"
                  [disabled]="maxForm().disabled"
                  [readOnly]="maxForm().readOnly"
                  (valueChange)="onMaxPresetChange(preset.id, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, and read-only states. Use the Customize drawer to adjust size and showValue across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-rating
                  [value]="stateRatings()[state.id]"
                  [max]="statesForm().max"
                  [size]="statesForm().size"
                  [showValue]="statesForm().showValue"
                  [disabled]="state.disabled"
                  [readOnly]="state.readOnly"
                  (valueChange)="onStateRatingChange(state.id, $event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all rating options in real time. Change value, max, size, showValue, and
            toggle states. The component emits valueChange events—check the event log to see
            interactions.
          </p>
          <app-rating-interactive />
        </section>
      </div>
    </div>
  `,
})
export class RatingShowcaseComponent {
  sizes: Size[] = [...SIZES];

  overviewDrawerFormConfig = RATING_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = RATING_DRAWER_CONFIGS.size;
  maxDrawerFormConfig = RATING_DRAWER_CONFIGS.max;
  statesDrawerFormConfig = RATING_DRAWER_CONFIGS.states;

  maxPresets = [
    { id: 'max5', label: '5 Stars', max: 5 },
    { id: 'max7', label: '7 Stars', max: 7 },
    { id: 'max10', label: '10 Stars', max: 10 },
  ];

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, readOnly: false },
    { id: 'disabled', label: 'Disabled', disabled: true, readOnly: false },
    { id: 'readonly', label: 'Read Only', disabled: false, readOnly: true },
  ];

  basicRating = signal(0);
  valueDisplayRating = signal(3);

  sizeRatings = signal<Record<string, number>>({
    small: 2,
    medium: 3,
    large: 4,
  });

  maxPresetValues = signal<Record<string, number>>({
    max5: 3,
    max7: 5,
    max10: 7,
  });

  stateRatings = signal<Record<string, number>>({
    normal: 4,
    disabled: 3,
    readonly: 5,
  });

  overviewFormValues = signal<Record<string, unknown>>({
    max: '5',
    size: 'medium',
    showValue: false,
    disabled: false,
    readOnly: false,
  });

  overviewForm = computed(() => this.toRatingForm(this.overviewFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    max: '5',
    showValue: false,
    disabled: false,
    readOnly: false,
  });

  sizeForm = computed(() => this.toRatingForm(this.sizeFormValues()));

  maxFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readOnly: false,
  });

  maxForm = computed(() => this.toRatingForm(this.maxFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    max: '5',
    size: 'medium',
    showValue: true,
  });

  statesForm = computed(() => this.toRatingForm(this.statesFormValues()));

  private toRatingForm(v: Record<string, unknown>) {
    return {
      max: Number(v['max']) || 5,
      size: (v['size'] as Size) ?? 'medium',
      showValue: !!v['showValue'],
      disabled: !!v['disabled'],
      readOnly: !!v['readOnly'],
    };
  }

  onSizeRatingChange(size: string, value: number): void {
    this.sizeRatings.update(r => ({ ...r, [size]: value }));
  }

  onMaxPresetChange(id: string, value: number): void {
    this.maxPresetValues.update(v => ({ ...v, [id]: value }));
  }

  onStateRatingChange(id: string, value: number): void {
    this.stateRatings.update(r => ({ ...r, [id]: value }));
  }
}
