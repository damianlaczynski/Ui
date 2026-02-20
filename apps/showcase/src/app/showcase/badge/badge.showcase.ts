import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Appearance,
  BadgeComponent,
  ContentPosition,
  IconName,
  Shape,
  Size,
  TableOfContentComponent,
  Variant,
} from 'ui';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { BADGE_DRAWER_CONFIGS } from './badge.showcase.config';
import { BadgeInteractiveComponent } from './badge.interactive';

@Component({
  selector: 'app-badge-showcase',
  imports: [
    BadgeComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    BadgeInteractiveComponent,
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
        <app-showcase-header title="Badge" />
        <p class="showcase__description">
          Compact status labels for counts, categories, and metadata. Badge supports variant,
          appearance, size, shape, and optional icon with configurable position.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete matrix of badge combinations: variants and appearances. Use the Customize drawer to change size, shape, icon, and icon position across all badges."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-badge
                      [text]="variant | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="overviewForm().size"
                      [shape]="overviewForm().shape"
                      [icon]="overviewForm().icon"
                      [iconPosition]="overviewForm().iconPosition"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the visual style (filled, tint, outline, subtle, transparent), while variant sets the semantic color (primary, secondary, success, warning, danger, info)."
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="appearanceVariantFormValues()"
          (formValuesChange)="appearanceVariantFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-badge
                      [text]="appearance | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [icon]="appearanceVariantForm().icon"
                      [iconPosition]="appearanceVariantForm().iconPosition"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icons"
          sectionDescription="Badges support optional icons from the Fluent icon set. This section shows icon usage across all variants and appearances."
          [formConfig]="iconsDrawerFormConfig"
          [formValues]="iconFormValues()"
          (formValuesChange)="iconFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant; let colIndex = $index) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-badge
                      [text]="variant | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="iconForm().size"
                      [shape]="iconForm().shape"
                      [icon]="iconsPerVariant[colIndex]"
                      [iconPosition]="iconForm().iconPosition"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects badge height, padding, and icon dimensions."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-badge
                [text]="size | titlecase"
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [icon]="sizeForm().icon"
                [iconPosition]="sizeForm().iconPosition"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Border radius options: rounded (default), circular (pill), and square."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-badge
                [text]="shape | titlecase"
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [icon]="shapeForm().icon"
                [iconPosition]="shapeForm().iconPosition"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icon Position"
          sectionDescription="Icon can be rendered before or after text. Use this when badge text order needs to match UI context."
          [formConfig]="iconPositionDrawerFormConfig"
          [formValues]="iconPositionFormValues()"
          (formValuesChange)="iconPositionFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (iconPosition of iconPositions; track iconPosition) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ iconPosition | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-badge
                      text="Badge"
                      [variant]="variant"
                      [appearance]="iconPositionForm().appearance"
                      [size]="iconPositionForm().size"
                      [shape]="iconPositionForm().shape"
                      [icon]="iconPositionForm().icon"
                      [iconPosition]="iconPosition"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all badge options in real time. Change text, icon, variant, appearance,
            size, shape, and icon position.
          </p>
          <app-badge-interactive />
        </section>
      </div>
    </div>
  `,
})
export class BadgeShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;
  iconPositions: ContentPosition[] = ['before', 'after'];

  overviewDrawerFormConfig = BADGE_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = BADGE_DRAWER_CONFIGS.appearanceVariant;
  iconsDrawerFormConfig = BADGE_DRAWER_CONFIGS.icons;
  sizeDrawerFormConfig = BADGE_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = BADGE_DRAWER_CONFIGS.shape;
  iconPositionDrawerFormConfig = BADGE_DRAWER_CONFIGS.iconPosition;

  iconsPerVariant: IconName[] = ['star', 'checkmark', 'delete', 'info', 'settings', 'home'];

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    icon: '',
    iconPosition: 'before',
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      icon: (v['icon'] as IconName) || undefined,
      iconPosition: v['iconPosition'] as ContentPosition,
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    icon: '',
    iconPosition: 'before',
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      icon: (v['icon'] as IconName) || undefined,
      iconPosition: v['iconPosition'] as ContentPosition,
    };
  });

  iconFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    iconPosition: 'before',
  });

  iconForm = computed(() => {
    const v = this.iconFormValues();
    return {
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      iconPosition: v['iconPosition'] as ContentPosition,
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    shape: 'rounded',
    icon: '',
    iconPosition: 'before',
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      shape: v['shape'] as Shape,
      icon: (v['icon'] as IconName) || undefined,
      iconPosition: v['iconPosition'] as ContentPosition,
    };
  });

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    icon: '',
    iconPosition: 'before',
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      icon: (v['icon'] as IconName) || undefined,
      iconPosition: v['iconPosition'] as ContentPosition,
    };
  });

  iconPositionFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    icon: 'star',
  });

  iconPositionForm = computed(() => {
    const v = this.iconPositionFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      icon: (v['icon'] as IconName) || undefined,
    };
  });
}
