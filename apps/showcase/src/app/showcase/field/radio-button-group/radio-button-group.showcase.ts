import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RadioButtonGroupComponent,
  type RadioButtonItem,
  type Appearance,
  type Orientation,
  type SegmentLayout,
  type Shape,
  type Size,
  type Variant,
} from 'ui';
import { TableOfContentComponent } from 'ui';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
  ORIENTATIONS,
  SEGMENT_LAYOUTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { RADIO_BUTTON_GROUP_DRAWER_CONFIGS } from './radio-button-group.showcase.config';
import { RadioButtonGroupInteractiveComponent } from './radio-button-group.interactive';

const DEFAULT_ITEMS: RadioButtonItem[] = [
  { id: 1, label: 'Option 1', value: 'option1' },
  { id: 2, label: 'Option 2', value: 'option2' },
  { id: 3, label: 'Option 3', value: 'option3' },
];

@Component({
  selector: 'app-radio-button-group-showcase',
  imports: [
    RadioButtonGroupComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    RadioButtonGroupInteractiveComponent,
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
        <app-showcase-header title="Radio Button Group" />
        <p class="showcase__description">
          Radio Button Group renders a set of options as selectable buttons. It supports variants,
          appearances, sizes, shapes, orientation (horizontal/vertical), and layout
          (segmented/separate). Use for single-choice selection where button-style options fit the
          UI better than traditional radio buttons.
        </p>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Appearance controls the visual style: filled, tint, outline, and subtle."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ appearance | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="appearance + ' appearance'"
                  [appearance]="appearance"
                  [variant]="appearanceForm().variant"
                  [size]="appearanceForm().size"
                  [shape]="appearanceForm().shape"
                  [orientation]="appearanceForm().orientation"
                  [layout]="appearanceForm().layout"
                  [disabled]="appearanceForm().disabled"
                  [readonly]="appearanceForm().readonly"
                  [required]="appearanceForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="appearanceValues[appearance]"
                  [name]="'appearance-' + appearance"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Variant sets the semantic color for the group."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="variant + ' variant'"
                  [variant]="variant"
                  [appearance]="variantForm().appearance"
                  [size]="variantForm().size"
                  [shape]="variantForm().shape"
                  [orientation]="variantForm().orientation"
                  [layout]="variantForm().layout"
                  [disabled]="variantForm().disabled"
                  [readonly]="variantForm().readonly"
                  [required]="variantForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="variantValues[variant]"
                  [name]="'variant-' + variant"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Orientation sets horizontal or vertical arrangement of options."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ orientation | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="orientation + ' orientation'"
                  [orientation]="orientation"
                  [layout]="orientationForm().layout"
                  [variant]="orientationForm().variant"
                  [appearance]="orientationForm().appearance"
                  [size]="orientationForm().size"
                  [shape]="orientationForm().shape"
                  [disabled]="orientationForm().disabled"
                  [readonly]="orientationForm().readonly"
                  [required]="orientationForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="orientationValues[orientation]"
                  [name]="'orientation-' + orientation"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Layout"
          sectionDescription="Layout controls whether buttons are segmented (connected) or separate (spaced)."
          [formConfig]="layoutDrawerFormConfig"
          [formValues]="layoutFormValues()"
          (formValuesChange)="layoutFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (layout of segmentLayouts; track layout) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ layout | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="layout + ' layout'"
                  [layout]="layout"
                  [orientation]="layoutForm().orientation"
                  [variant]="layoutForm().variant"
                  [appearance]="layoutForm().appearance"
                  [size]="layoutForm().size"
                  [shape]="layoutForm().shape"
                  [disabled]="layoutForm().disabled"
                  [readonly]="layoutForm().readonly"
                  [required]="layoutForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="layoutValues[layout]"
                  [name]="'layout-' + layout"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects padding and font dimensions."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="size + ' size'"
                  [size]="size"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [shape]="sizeForm().shape"
                  [orientation]="sizeForm().orientation"
                  [layout]="sizeForm().layout"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="sizeValues[size]"
                  [name]="'size-' + size"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Border radius options: rounded (default), circular, and square. Shape affects the visual style of each button in the group."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ shape | titlecase }}</h3>
                <ui-radio-button-group
                  [label]="shape + ' shape'"
                  [shape]="shape"
                  [variant]="shapeForm().variant"
                  [appearance]="shapeForm().appearance"
                  [size]="shapeForm().size"
                  [orientation]="shapeForm().orientation"
                  [layout]="shapeForm().layout"
                  [disabled]="shapeForm().disabled"
                  [readonly]="shapeForm().readonly"
                  [required]="shapeForm().required"
                  [items]="defaultItems"
                  [(ngModel)]="shapeValues[shape]"
                  [name]="'shape-' + shape"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, required, and readonly states. Use the Customize drawer to adjust variant, appearance, size, shape, orientation, and layout across all state examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-radio-button-group
                  [label]="state.label"
                  [variant]="statesForm().variant"
                  [appearance]="statesForm().appearance"
                  [size]="statesForm().size"
                  [shape]="statesForm().shape"
                  [orientation]="statesForm().orientation"
                  [layout]="statesForm().layout"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                  [items]="defaultItems"
                  [(ngModel)]="stateValues[state.id]"
                  [name]="'state-' + state.id"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all radio button group options in real time. Change variant, appearance,
            orientation, layout, size, shape, and toggle states. The component emits change
            events—check the event log to see interactions.
          </p>
          <app-radio-button-group-interactive />
        </section>
      </div>
    </div>
  `,
})
export class RadioButtonGroupShowcaseComponent {
  variants: Variant[] = [...VARIANTS];
  appearances: Appearance[] = [...APPEARANCES];
  sizes: Size[] = [...SIZES];
  shapes: Shape[] = [...SHAPES];
  orientations: Orientation[] = [...ORIENTATIONS];
  segmentLayouts: SegmentLayout[] = [...SEGMENT_LAYOUTS];

  defaultItems = DEFAULT_ITEMS;

  appearanceDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.appearance;
  variantDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.variant;
  orientationDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.orientation;
  layoutDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.layout;
  sizeDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.shape;
  statesDrawerFormConfig = RADIO_BUTTON_GROUP_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, readonly: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, readonly: false, required: false },
    { id: 'required', label: 'Required', disabled: false, readonly: false, required: true },
    { id: 'readonly', label: 'Read Only', disabled: false, readonly: true, required: false },
  ];

  appearanceValues: Record<string, unknown> = {};
  variantValues: Record<string, unknown> = {};
  orientationValues: Record<string, unknown> = {};
  layoutValues: Record<string, unknown> = {};
  sizeValues: Record<string, unknown> = {};
  shapeValues: Record<string, unknown> = {};
  stateValues: Record<string, unknown> = {};

  appearanceFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    layout: 'separate',
    disabled: false,
    readonly: false,
    required: false,
  });

  appearanceForm = computed(() => this.toForm(this.appearanceFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    appearance: 'outline',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    layout: 'separate',
    disabled: false,
    readonly: false,
    required: false,
  });

  variantForm = computed(() => this.toForm(this.variantFormValues()));

  orientationFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    size: 'medium',
    shape: 'rounded',
    layout: 'separate',
    disabled: false,
    readonly: false,
    required: false,
  });

  orientationForm = computed(() => this.toForm(this.orientationFormValues()));

  layoutFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    disabled: false,
    readonly: false,
    required: false,
  });

  layoutForm = computed(() => this.toForm(this.layoutFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    shape: 'rounded',
    orientation: 'horizontal',
    layout: 'separate',
    disabled: false,
    readonly: false,
    required: false,
  });

  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    size: 'medium',
    orientation: 'horizontal',
    layout: 'separate',
    disabled: false,
    readonly: false,
    required: false,
  });

  shapeForm = computed(() => this.toForm(this.shapeFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'outline',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    layout: 'separate',
  });

  statesForm = computed(() => this.toForm(this.statesFormValues()));

  private toForm(v: Record<string, unknown>) {
    return {
      variant: (v['variant'] as Variant) ?? 'secondary',
      appearance: (v['appearance'] as Appearance) ?? 'outline',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      orientation: (v['orientation'] as Orientation) ?? 'horizontal',
      layout: (v['layout'] as SegmentLayout) ?? 'separate',
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
