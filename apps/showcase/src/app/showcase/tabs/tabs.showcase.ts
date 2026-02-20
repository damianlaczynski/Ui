import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent, Tab } from 'ui';
import type { Appearance, Orientation, Shape, Size, Variant } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  TABS_DRAWER_CONFIGS,
  TABS_ORIENTATIONS,
  DEFAULT_TABS,
  EXTENDED_TABS,
  LABELS_ONLY_TABS,
} from './tabs.showcase.config';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { TabsInteractiveComponent } from './tabs.interactive';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TabsInteractiveComponent,
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
        <app-showcase-header title="Tabs" />
        <p class="showcase__description">
          Tabs organize related content into switchable views. Use them to reduce visual noise and
          keep navigation local to a section while preserving quick access to key areas.
        </p>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Appearance changes the visual emphasis of tabs (for example subtle or filled styles) without changing their structure. Use this to match hierarchy and contrast in your layout."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="appearanceForm().variant"
                  [appearance]="appearance"
                  [size]="appearanceForm().size"
                  [shape]="appearanceForm().shape"
                  [orientation]="appearanceForm().orientation"
                  [showSelectionIndicator]="appearanceForm().showSelectionIndicator"
                  [fullWidth]="appearanceForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Variant controls the semantic color intent of tabs, such as primary or status-oriented styles. Combine it with appearance to tune clarity and emphasis."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="variant"
                  [appearance]="variantForm().appearance"
                  [size]="variantForm().size"
                  [shape]="variantForm().shape"
                  [orientation]="variantForm().orientation"
                  [showSelectionIndicator]="variantForm().showSelectionIndicator"
                  [fullWidth]="variantForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Size adjusts tab height and spacing. Pick smaller sizes for dense interfaces and larger sizes when tabs are a primary navigation element."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [shape]="sizeForm().shape"
                  [orientation]="sizeForm().orientation"
                  [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                  [fullWidth]="sizeForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Shape changes tab corner geometry to better align with your design language, from rounded defaults to more angular alternatives."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="shapeForm().variant"
                  [appearance]="shapeForm().appearance"
                  [size]="shapeForm().size"
                  [shape]="shape"
                  [orientation]="shapeForm().orientation"
                  [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                  [fullWidth]="shapeForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Orientation switches tabs between horizontal and vertical layouts. Vertical tabs work well for side navigation and longer labels."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <ui-tabs
                  [tabs]="defaultTabs"
                  [variant]="orientationForm().variant"
                  [appearance]="orientationForm().appearance"
                  [size]="orientationForm().size"
                  [shape]="orientationForm().shape"
                  [orientation]="orientation"
                  [showSelectionIndicator]="orientationForm().showSelectionIndicator"
                  [fullWidth]="orientationForm().fullWidth"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="tab-options" class="showcase__section">
          <h2 class="showcase__section__title">Tab options</h2>
          <p class="showcase__section__description">
            Compare different tab data sets: standard tabs, disabled and closable items, and a
            minimal labels-only configuration.
          </p>
          <div class="showcase__option-section__box">
            <div class="showcase__grid">
              <div class="showcase__item">
                <span class="showcase__item-label">Default set</span>
                <ui-tabs [tabs]="defaultTabs" variant="primary" appearance="subtle" />
              </div>
              <div class="showcase__item">
                <span class="showcase__item-label">With disabled and closable</span>
                <ui-tabs
                  [tabs]="extendedTabs()"
                  variant="primary"
                  appearance="subtle"
                  (tabClose)="onTabClose($event)"
                />
              </div>
              <div class="showcase__item">
                <span class="showcase__item-label">Labels only</span>
                <ui-tabs [tabs]="labelsOnlyTabs" variant="primary" appearance="subtle" />
              </div>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all tab properties in real time, then review generated markup and
            emitted events.
          </p>
          <app-tabs-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TabsShowcaseComponent {
  defaultTabs = DEFAULT_TABS;
  labelsOnlyTabs = LABELS_ONLY_TABS;
  extendedTabs = signal<Tab[]>([...EXTENDED_TABS]);
  appearances = APPEARANCES;
  variants = VARIANTS;
  sizes = SIZES;
  shapes = SHAPES;
  orientations = TABS_ORIENTATIONS;

  appearanceDrawerFormConfig = TABS_DRAWER_CONFIGS.appearance;
  variantDrawerFormConfig = TABS_DRAWER_CONFIGS.variant;
  sizeDrawerFormConfig = TABS_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = TABS_DRAWER_CONFIGS.shape;
  orientationDrawerFormConfig = TABS_DRAWER_CONFIGS.orientation;

  appearanceFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  appearanceForm = computed(() => this.toTabsForm(this.appearanceFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  variantForm = computed(() => this.toTabsForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  sizeForm = computed(() => this.toTabsForm(this.sizeFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    orientation: 'horizontal',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  shapeForm = computed(() => this.toTabsForm(this.shapeFormValues()));

  orientationFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    showSelectionIndicator: true,
    fullWidth: false,
  });

  orientationForm = computed(() => this.toTabsForm(this.orientationFormValues()));

  private toTabsForm(v: Record<string, unknown>) {
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      shape: v['shape'] as Shape,
      orientation: (v['orientation'] as Orientation) ?? 'horizontal',
      showSelectionIndicator: !!v['showSelectionIndicator'],
      fullWidth: !!v['fullWidth'],
    };
  }

  onTabClose(tab: Tab): void {
    this.extendedTabs.update(list => {
      const next = list.filter(t => t.id !== tab.id);
      return next;
    });
  }
}
