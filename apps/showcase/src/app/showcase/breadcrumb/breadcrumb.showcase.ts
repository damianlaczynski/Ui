import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Breadcrumb } from 'angular-ui';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { BreadcrumbComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { BREADCRUMB_DRAWER_CONFIGS } from './breadcrumb.showcase.config';
import { BreadcrumbInteractiveComponent } from './breadcrumb.interactive';

const BASIC_BREADCRUMB: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'products', label: 'Products', icon: 'shopping_bag' },
  { id: 'electronics', label: 'Electronics', icon: 'device_eq', selected: true },
];

const SELECTED_BREADCRUMB: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'products', label: 'Products', icon: 'shopping_bag' },
  { id: 'electronics', label: 'Electronics', icon: 'device_eq', selected: true },
];

const DISABLED_BREADCRUMB: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'products', label: 'Products', icon: 'shopping_bag', disabled: true },
  { id: 'electronics', label: 'Electronics', icon: 'device_eq', selected: true },
];

const FILE_SYSTEM_BREADCRUMB: Breadcrumb[] = [
  { id: 'root', label: 'My Computer', icon: 'counter' },
  { id: 'users', label: 'Users', icon: 'people' },
  { id: 'documents', label: 'Documents', icon: 'folder', selected: true },
];

const ECOMMERCE_BREADCRUMB: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'shop', label: 'Shop', icon: 'shopping_bag' },
  { id: 'phones', label: 'Phones', icon: 'phone', selected: true },
];

const SETTINGS_BREADCRUMB: Breadcrumb[] = [
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'account', label: 'Account', icon: 'person' },
  { id: 'security', label: 'Security', icon: 'shield', selected: true },
];

const OVERFLOW_BREADCRUMB: Breadcrumb[] = [
  { id: '1', label: 'Home', icon: 'home' },
  { id: '2', label: 'Products', icon: 'folder' },
  { id: '3', label: 'Electronics', icon: 'device_eq' },
  { id: '4', label: 'Phones', icon: 'phone' },
  { id: '5', label: 'Smartphones', icon: 'phone' },
  { id: '6', label: 'Current', icon: 'folder', selected: true },
];

@Component({
  selector: 'app-breadcrumb-showcase',
  styles: [
    `
      .breadcrumb-responsive-demo {
        width: 100%;
        min-width: 200px;
        overflow: hidden;
        resize: horizontal;
      }
    `,
  ],
  imports: [
    BreadcrumbComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    BreadcrumbInteractiveComponent,
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
        <app-showcase-header title="Breadcrumb" />
        <p class="showcase__description">
          Breadcrumb navigation based on Fluent 2 Design System. Unified API: variant + appearance +
          shape + size. Supports icons, selection indicators, and item states (disabled, selected).
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Quick variant overview shown as single examples in separate rows. Use the Customize drawer to toggle icons, selection indicator, and indicator position."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb"
                  [variant]="variant"
                  appearance="subtle"
                  [size]="overviewForm().size"
                  [shape]="overviewForm().shape"
                  [showIcons]="overviewForm().showIcons"
                  [showSelectionIndicator]="overviewForm().showIndicator"
                  [indicatorPosition]="overviewForm().indicatorPosition"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the visual style (filled, tint, outline, subtle, transparent) while variant sets the semantic color. Each combination is shown as a separate example row."
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="appearanceVariantFormValues()"
          (formValuesChange)="appearanceVariantFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            @for (appearance of appearances; track appearance) {
              @for (variant of variants; track variant) {
                <div class="showcase__item">
                  <h3 class="showcase__item__title">
                    {{ appearance | titlecase }} / {{ variant | titlecase }}
                  </h3>
                  <ui-breadcrumb
                    [items]="basicBreadcrumb"
                    [variant]="variant"
                    [appearance]="appearance"
                    [size]="appearanceVariantForm().size"
                    [shape]="appearanceVariantForm().shape"
                    [showIcons]="appearanceVariantForm().showIcons"
                    [showSelectionIndicator]="appearanceVariantForm().showIndicator"
                    [indicatorPosition]="appearanceVariantForm().indicatorPosition"
                    (itemClick)="onItemClick($event)"
                  />
                </div>
              }
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icons"
          sectionDescription="Breadcrumb items support optional icons from the Fluent icon set. Toggle showIcons to display or hide icons across all items."
          [formConfig]="iconsDrawerFormConfig"
          [formValues]="iconFormValues()"
          (formValuesChange)="iconFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            <div class="showcase__item">
              <h3 class="showcase__item__title">With Icons</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb"
                [showIcons]="true"
                [variant]="iconForm().variant"
                [appearance]="iconForm().appearance"
                [size]="iconForm().size"
                [shape]="iconForm().shape"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Without Icons</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb"
                [showIcons]="false"
                [variant]="iconForm().variant"
                [appearance]="iconForm().appearance"
                [size]="iconForm().size"
                [shape]="iconForm().shape"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects padding and font dimensions."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb"
                  [size]="size"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [shape]="sizeForm().shape"
                  [showIcons]="sizeForm().showIcons"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Border radius options: rounded (default), circular, and square. Shape affects the visual weight of breadcrumb items."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ shape | titlecase }}</h3>
                <ui-breadcrumb
                  [items]="basicBreadcrumb"
                  appearance="subtle"
                  [shape]="shape"
                  [variant]="shapeForm().variant"
                  [size]="shapeForm().size"
                  [showIcons]="shapeForm().showIcons"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Breadcrumb item states: normal, disabled (non-clickable), and selected (current location). Disabled and selected are set per item in the data."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Normal</h3>
              <ui-breadcrumb
                [items]="basicBreadcrumb"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [showIcons]="statesForm().showIcons"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled Item</h3>
              <ui-breadcrumb
                [items]="disabledBreadcrumb"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [showIcons]="statesForm().showIcons"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Selected Item</h3>
              <ui-breadcrumb
                [items]="selectedBreadcrumb"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [showIcons]="statesForm().showIcons"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicators"
          sectionDescription="Optional selection indicator for the current item. Position can be horizontal (underline) or vertical (side bar)."
          [formConfig]="selectionIndicatorsDrawerFormConfig"
          [formValues]="selectionIndicatorsFormValues()"
          (formValuesChange)="selectionIndicatorsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Horizontal Indicator</h3>
              <ui-breadcrumb
                [items]="selectedBreadcrumb"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
                [variant]="selectionIndicatorsForm().variant"
                [appearance]="selectionIndicatorsForm().appearance"
                [size]="selectionIndicatorsForm().size"
                [shape]="selectionIndicatorsForm().shape"
                [showIcons]="selectionIndicatorsForm().showIcons"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Vertical Indicator</h3>
              <ui-breadcrumb
                [items]="selectedBreadcrumb"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                [variant]="selectionIndicatorsForm().variant"
                [appearance]="selectionIndicatorsForm().appearance"
                [size]="selectionIndicatorsForm().size"
                [shape]="selectionIndicatorsForm().shape"
                [showIcons]="selectionIndicatorsForm().showIcons"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Real-World Examples"
          sectionDescription="Common breadcrumb patterns: file system navigation, e-commerce categories, and settings panels."
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="examplesFormValues()"
          (formValuesChange)="examplesFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--row">
            <div class="showcase__item">
              <h3 class="showcase__item__title">File System Navigation</h3>
              <ui-breadcrumb
                [items]="fileSystemBreadcrumb"
                size="small"
                appearance="subtle"
                [shape]="examplesForm().shape"
                [showIcons]="examplesForm().showIcons"
                [showSelectionIndicator]="examplesForm().showIndicator"
                [indicatorPosition]="examplesForm().indicatorPosition"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">E-commerce Category</h3>
              <ui-breadcrumb
                [items]="ecommerceBreadcrumb"
                appearance="transparent"
                [size]="examplesForm().size"
                [shape]="examplesForm().shape"
                [showIcons]="examplesForm().showIcons"
                [showSelectionIndicator]="examplesForm().showIndicator"
                [indicatorPosition]="examplesForm().indicatorPosition"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Settings Panel</h3>
              <ui-breadcrumb
                [items]="settingsBreadcrumb"
                appearance="subtle"
                shape="circular"
                [size]="examplesForm().size"
                [showIcons]="examplesForm().showIcons"
                [showSelectionIndicator]="examplesForm().showIndicator"
                [indicatorPosition]="examplesForm().indicatorPosition"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">With Overflow</h3>
              <ui-breadcrumb
                [items]="overflowBreadcrumb"
                [maxDisplayedItems]="4"
                [responsiveOverflow]="false"
                appearance="subtle"
                [showIcons]="true"
                (itemClick)="onItemClick($event)"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Responsive Overflow</h3>
              <div class="breadcrumb-responsive-demo">
                <ui-breadcrumb
                  [items]="overflowBreadcrumb"
                  [responsiveOverflow]="true"
                  appearance="subtle"
                  [showIcons]="true"
                  (itemClick)="onItemClick($event)"
                />
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all breadcrumb options in real time. Change variant, appearance, size,
            shape, toggle icons and selection indicator. Click items to navigate—the path truncates
            and events are logged.
          </p>
          <app-breadcrumb-interactive />
        </section>
      </div>
    </div>
  `,
})
export class BreadcrumbShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;

  basicBreadcrumb = BASIC_BREADCRUMB;
  selectedBreadcrumb = SELECTED_BREADCRUMB;
  disabledBreadcrumb = DISABLED_BREADCRUMB;
  fileSystemBreadcrumb = FILE_SYSTEM_BREADCRUMB;
  ecommerceBreadcrumb = ECOMMERCE_BREADCRUMB;
  settingsBreadcrumb = SETTINGS_BREADCRUMB;
  overflowBreadcrumb = OVERFLOW_BREADCRUMB;

  overviewDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.appearanceVariant;
  iconsDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.icons;
  sizeDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.shape;
  statesDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.states;
  selectionIndicatorsDrawerFormConfig = BREADCRUMB_DRAWER_CONFIGS.selectionIndicators;

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  iconFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  iconForm = computed(() => {
    const v = this.iconFormValues();
    return {
      variant: v['variant'] as import('angular-ui').Variant,
      appearance: v['appearance'] as import('angular-ui').Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: v['variant'] as import('angular-ui').Variant,
      appearance: v['appearance'] as import('angular-ui').Appearance,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: v['variant'] as import('angular-ui').Variant,
      appearance: v['appearance'] as import('angular-ui').Appearance,
      size: v['size'] as import('angular-ui').Size,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    showIcons: true,
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      variant: v['variant'] as import('angular-ui').Variant,
      appearance: v['appearance'] as import('angular-ui').Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
    };
  });

  selectionIndicatorsFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    showIcons: true,
    showIndicator: true,
    indicatorPosition: 'horizontal',
  });

  selectionIndicatorsForm = computed(() => {
    const v = this.selectionIndicatorsFormValues();
    return {
      variant: v['variant'] as import('angular-ui').Variant,
      appearance: v['appearance'] as import('angular-ui').Appearance,
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  examplesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    showIcons: true,
    showIndicator: false,
    indicatorPosition: 'horizontal',
  });

  examplesForm = computed(() => {
    const v = this.examplesFormValues();
    return {
      size: v['size'] as import('angular-ui').Size,
      shape: v['shape'] as import('angular-ui').Shape,
      showIcons: !!v['showIcons'],
      showIndicator: !!v['showIndicator'],
      indicatorPosition:
        (v['indicatorPosition'] as import('angular-ui').Orientation) || 'horizontal',
    };
  });

  onItemClick(_item: Breadcrumb): void {}
}
