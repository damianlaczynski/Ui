import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appearance, TagComponent, TableOfContentComponent, Variant } from 'ui';
import type { IconName } from 'ui';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { TAG_DRAWER_CONFIGS } from './tag.showcase.config';
import { TagInteractiveComponent } from './tag.interactive';

@Component({
  selector: 'app-tag-showcase',
  imports: [
    TagComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    TagInteractiveComponent,
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
        <app-showcase-header title="Tag" />
        <p class="showcase__description">
          Labels for categories, filters, or status. Use for tags, chips, or removable tokens (e.g.
          next to inputs, in filters).
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete matrix of all tag combinations: variants (primary, secondary, success, etc.) and appearances (filled, tint, outline, subtle). Use the Customize drawer to toggle icon, dismissible, disabled, selected, and selectable states across all tags."
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
                    <ui-tag
                      [text]="variant | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      size="medium"
                      shape="rounded"
                      [icon]="overviewForm().icon"
                      [dismissible]="overviewForm().dismissible"
                      [disabled]="overviewForm().disabled"
                      [selected]="overviewForm().selected"
                      [selectable]="overviewForm().selectable"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the visual style (filled, tint, outline, subtle) while variant sets the semantic color (primary, secondary, success, warning, danger, info). These combine to create distinct tag styles for different contexts and hierarchy levels."
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
                    <ui-tag
                      [text]="appearance | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [icon]="appearanceVariantForm().icon"
                      [dismissible]="appearanceVariantForm().dismissible"
                      [disabled]="appearanceVariantForm().disabled"
                      [selected]="appearanceVariantForm().selected"
                      [selectable]="appearanceVariantForm().selectable"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icons"
          sectionDescription="Tags support optional icons from the Fluent icon set. Icons can be used alone or alongside text. Each variant is shown with a different icon to demonstrate flexibility."
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
                    <ui-tag
                      [text]="variant | titlecase"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="iconForm().size"
                      [shape]="iconForm().shape"
                      [icon]="iconsPerVariant[colIndex]"
                      [dismissible]="iconForm().dismissible"
                      [disabled]="iconForm().disabled"
                      [selected]="iconForm().selected"
                      [selectable]="iconForm().selectable"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects padding, font size, and icon dimensions. Choose based on context—small for dense UIs, large for prominent tags."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-tag
                [text]="size | titlecase"
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [icon]="sizeForm().icon"
                [dismissible]="sizeForm().dismissible"
                [disabled]="sizeForm().disabled"
                [selected]="sizeForm().selected"
                [selectable]="sizeForm().selectable"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Border radius options: rounded (default), circular (pill-shaped), and square. Shape affects the visual weight and works well with different use cases."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-tag
                [text]="shape | titlecase"
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [icon]="shapeForm().icon"
                [dismissible]="shapeForm().dismissible"
                [disabled]="shapeForm().disabled"
                [selected]="shapeForm().selected"
                [selectable]="shapeForm().selectable"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Tag states: normal, selected (highlighted when selectable), and disabled. Use selectable for filter chips or multi-select scenarios."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <ui-tag
                [text]="state.label"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [icon]="statesForm().icon"
                [dismissible]="statesForm().dismissible"
                [disabled]="state.disabled"
                [selected]="state.selected"
                [selectable]="statesForm().selectable"
              />
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all tag options in real time. Change variant, appearance, size, shape,
            add icons, and toggle states. The tag emits tagClick and dismiss events—check the event
            log to see interactions.
          </p>
          <app-tag-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TagShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;

  overviewDrawerFormConfig = TAG_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = TAG_DRAWER_CONFIGS.appearanceVariant;
  iconsDrawerFormConfig = TAG_DRAWER_CONFIGS.icons;
  sizeDrawerFormConfig = TAG_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = TAG_DRAWER_CONFIGS.shape;
  statesDrawerFormConfig = TAG_DRAWER_CONFIGS.states;

  iconsPerVariant: IconName[] = ['star', 'checkmark', 'delete', 'info', 'settings', 'home'];

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, selected: false },
    { id: 'selected', label: 'Selected', disabled: false, selected: true },
    { id: 'disabled', label: 'Disabled', disabled: true, selected: false },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    icon: '',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      selectable: !!v['selectable'],
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    icon: '',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: v['size'] as import('ui').Size,
      shape: v['shape'] as import('ui').Shape,
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      selectable: !!v['selectable'],
    };
  });

  iconFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  iconForm = computed(() => {
    const v = this.iconFormValues();
    return {
      size: v['size'] as import('ui').Size,
      shape: v['shape'] as import('ui').Shape,
      dismissible: !!v['dismissible'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      selectable: !!v['selectable'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'tint',
    shape: 'rounded',
    icon: '',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      shape: v['shape'] as import('ui').Shape,
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      selectable: !!v['selectable'],
    };
  });

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'tint',
    size: 'medium',
    icon: '',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as import('ui').Size,
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      selectable: !!v['selectable'],
    };
  });

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'tint',
    size: 'medium',
    shape: 'rounded',
    icon: '',
    dismissible: false,
    selectable: false,
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as import('ui').Size,
      shape: v['shape'] as import('ui').Shape,
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      selectable: !!v['selectable'],
    };
  });
}
