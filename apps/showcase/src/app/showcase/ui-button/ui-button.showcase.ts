import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  Appearance,
  IconComponent,
  Size,
  TableOfContentComponent,
  UiButtonDirective,
  Variant,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { UI_BUTTON_DRAWER_CONFIGS } from './ui-button.showcase.config';

@Component({
  selector: 'app-ui-button-showcase',
  imports: [
    CommonModule,
    UiButtonDirective,
    IconComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
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
        <app-showcase-header title="UI Button" />
        <p class="showcase__description">
          The <code>uiButton</code> directive applies the same Fluent button surface classes as
          <code>ui-button</code> to native <code>&lt;button&gt;</code> elements. Use it when you
          need a plain button (for example with <code>RouterLink</code> host directives) while
          keeping design-system styles.
        </p>

        <app-section-with-drawer
          sectionTitle="Variant × size"
          sectionDescription="Filled appearance and rounded shape. Use Customize for disabled, loading, selected, and full width."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix showcase__icons-matrix--3-cols">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (size of sizes; track size) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ size | titlecase }}
                </div>
              }
            </div>
            @for (variant of variants; track variant) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ variant | titlecase }}
                </div>
                @for (size of sizes; track size) {
                  <div class="showcase__icons-matrix__cell">
                    <button
                      type="button"
                      uiButton
                      [uiButtonVariant]="variant"
                      uiButtonAppearance="filled"
                      [uiButtonSize]="size"
                      uiButtonShape="rounded"
                      [uiButtonLoading]="!!overviewFormValues()['loading']"
                      [uiButtonSelected]="!!overviewFormValues()['selected']"
                      [uiButtonFullWidth]="!!overviewFormValues()['fullWidth']"
                      [disabled]="!!overviewFormValues()['disabled']"
                      [attr.aria-label]="variant + ' ' + size + ' button'"
                    >
                      {{ variant }} · {{ size }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearances"
          sectionDescription="Each appearance with primary variant, medium size, rounded shape."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ appearance | titlecase }}</h3>
                <button
                  type="button"
                  uiButton
                  uiButtonVariant="primary"
                  [uiButtonAppearance]="appearance"
                  uiButtonSize="medium"
                  uiButtonShape="rounded"
                  [uiButtonLoading]="!!overviewFormValues()['loading']"
                  [uiButtonSelected]="!!overviewFormValues()['selected']"
                  [uiButtonFullWidth]="!!overviewFormValues()['fullWidth']"
                  [disabled]="!!overviewFormValues()['disabled']"
                  [attr.aria-label]="appearance + ' primary button'"
                >
                  {{ appearance | titlecase }}
                </button>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Rounded, circular, and square outlines with secondary / outline for contrast."
          [formConfig]="shapesDrawerFormConfig"
          [formValues]="shapesFormValues()"
          (formValuesChange)="shapesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ shape | titlecase }}</h3>
                <button
                  type="button"
                  uiButton
                  [uiButtonVariant]="shapesForm().variant"
                  [uiButtonAppearance]="shapesForm().appearance"
                  [uiButtonSize]="shapesForm().size"
                  [uiButtonShape]="shape"
                  [disabled]="shapesForm().disabled"
                  [attr.aria-label]="shape + ' shape button'"
                >
                  @if (shape === 'circular') {
                    <ui-icon icon="checkmark" [size]="shapesForm().size" />
                  } @else {
                    {{ shape | titlecase }}
                  }
                </button>
              </div>
            }
          </div>
        </app-section-with-drawer>
      </div>
    </div>
  `,
})
export class UiButtonShowcaseComponent {
  protected readonly variants = VARIANTS;
  protected readonly sizes = SIZES;
  protected readonly appearances = APPEARANCES;
  protected readonly shapes = SHAPES;

  protected readonly overviewDrawerFormConfig = UI_BUTTON_DRAWER_CONFIGS.overview;
  protected readonly shapesDrawerFormConfig = UI_BUTTON_DRAWER_CONFIGS.shapes;

  overviewFormValues = signal<Record<string, unknown>>({
    disabled: false,
    loading: false,
    selected: false,
    fullWidth: false,
  });

  shapesFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    size: 'medium',
    disabled: false,
  });

  shapesForm = computed(() => {
    const v = this.shapesFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      disabled: !!v['disabled'],
    };
  });
}
