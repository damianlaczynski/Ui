import { Component, signal, computed, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionComponent,
  ButtonComponent,
  TextComponent,
  EmailComponent,
  TableOfContentComponent,
  Appearance,
  ChevronPosition,
  IconName,
  Orientation,
  Shape,
  Size,
} from 'ui';
import { SIZES, SHAPES } from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ACCORDION_DRAWER_CONFIGS, ACCORDION_APPEARANCES } from './accordion.showcase.config';
import { AccordionInteractiveComponent } from './accordion.interactive';

@Component({
  selector: 'app-accordion-showcase',
  imports: [
    AccordionComponent,
    ButtonComponent,
    TextComponent,
    EmailComponent,
    CommonModule,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    AccordionInteractiveComponent,
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
        <app-showcase-header title="Accordion" />
        <p class="showcase__description">
          Accordion component built with Fluent 2 Design System. Supports expand/collapse, multiple
          sizes, appearance variants, selection indicators, chevron positions, and quick actions.
          Use for collapsible content sections.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Matrix of appearance and shape combinations. Use the Customize drawer to adjust size, icon, and disabled state across all accordions."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix showcase__icons-matrix--3-cols">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (shape of shapes; track shape) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ shape | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (shape of shapes; track shape) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-accordion
                      [label]="appearance + ' ' + shape"
                      [size]="overviewForm().size"
                      [appearance]="appearance"
                      [shape]="shape"
                      [icon]="overviewForm().icon"
                      [disabled]="overviewForm().disabled"
                    >
                      <p>Content for {{ appearance }} {{ shape }} accordion.</p>
                    </ui-accordion>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Shape"
          sectionDescription="Appearance controls visual style (transparent, subtle, filled) while shape sets border radius (rounded, circular, square)."
          [formConfig]="appearanceShapeDrawerFormConfig"
          [formValues]="appearanceShapeFormValues()"
          (formValuesChange)="appearanceShapeFormValues.set($event)"
        >
          <div class="showcase__icons-matrix showcase__icons-matrix--3-cols">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (shape of shapes; track shape) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ shape | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (shape of shapes; track shape) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-accordion
                      [label]="appearance + ' ' + shape"
                      [size]="appearanceShapeForm().size"
                      [appearance]="appearance"
                      [shape]="shape"
                      [chevronPosition]="appearanceShapeForm().chevronPosition"
                      [icon]="appearanceShapeForm().icon"
                      [disabled]="appearanceShapeForm().disabled"
                    >
                      <p>Content inside accordion.</p>
                    </ui-accordion>
                  </div>
                }
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
                <ui-accordion
                  [label]="size + ' accordion'"
                  [size]="size"
                  [appearance]="sizeForm().appearance"
                  [shape]="sizeForm().shape"
                  [disabled]="sizeForm().disabled"
                >
                  <p>Content for {{ size }} accordion.</p>
                </ui-accordion>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Chevron Position"
          sectionDescription="Chevron icon position: before (default) or after the label."
          [formConfig]="chevronPositionDrawerFormConfig"
          [formValues]="chevronPositionFormValues()"
          (formValuesChange)="chevronPositionFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (pos of chevronPositions; track pos) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ pos | titlecase }}</h3>
                <ui-accordion
                  label="Chevron {{ pos }}"
                  [chevronPosition]="pos"
                  [size]="chevronPositionForm().size"
                  [appearance]="chevronPositionForm().appearance"
                  [shape]="chevronPositionForm().shape"
                  [disabled]="chevronPositionForm().disabled"
                >
                  <p>Chevron appears {{ pos }} the label.</p>
                </ui-accordion>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icons"
          sectionDescription="Accordions support optional icons in the header. Each example uses a different icon."
          [formConfig]="iconsDrawerFormConfig"
          [formValues]="iconsFormValues()"
          (formValuesChange)="iconsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (icon of iconsPerAccordion; track icon) {
              <div class="showcase__item">
                <ui-accordion
                  [label]="icon + ' accordion'"
                  [icon]="icon"
                  [size]="iconsForm().size"
                  [appearance]="iconsForm().appearance"
                  [shape]="iconsForm().shape"
                  [disabled]="iconsForm().disabled"
                >
                  <p>Accordion with {{ icon }} icon.</p>
                </ui-accordion>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicators"
          sectionDescription="Horizontal or vertical selection indicator. Use for selected/active state styling."
          [formConfig]="selectionIndicatorsDrawerFormConfig"
          [formValues]="selectionIndicatorsFormValues()"
          (formValuesChange)="selectionIndicatorsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (pos of indicatorPositions; track pos) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ pos | titlecase }} Indicator</h3>
                <ui-accordion
                  [label]="pos + ' indicator'"
                  [showSelectionIndicator]="true"
                  [indicatorPosition]="pos"
                  [size]="selectionIndicatorsForm().size"
                  [appearance]="selectionIndicatorsForm().appearance"
                  [shape]="selectionIndicatorsForm().shape"
                  [disabled]="selectionIndicatorsForm().disabled"
                >
                  <p>Accordion with {{ pos }} selection indicator.</p>
                </ui-accordion>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal and disabled states. Disabled accordions cannot be expanded."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-accordion
                  [label]="state.label + ' accordion'"
                  [disabled]="state.disabled"
                  [size]="statesForm().size"
                  [appearance]="statesForm().appearance"
                  [shape]="statesForm().shape"
                >
                  <p>Content for {{ state.label.toLowerCase() }} accordion.</p>
                </ui-accordion>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Quick Actions</h2>
          <p class="showcase__section__description">
            Accordions can show quick action buttons in the header. Use for edit, delete, or other
            actions without expanding the panel.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-accordion
                label="Accordion with Quick Actions"
                [showQuickActions]="true"
                [quickActionsTemplate]="quickActionsTemplateRef() ?? null"
              >
                <p>This accordion has quick actions in the header.</p>
              </ui-accordion>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Content Examples</h2>
          <p class="showcase__section__description">
            Accordion panels can contain any content: text, forms, lists, or nested components.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Simple Text</h3>
              <ui-accordion label="Simple Text Content">
                <p>Simple text content inside the accordion.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Multiple Paragraphs</h3>
              <ui-accordion label="Multiple Paragraphs">
                <p>First paragraph.</p>
                <p>Second paragraph.</p>
                <p>Third paragraph.</p>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Form Content</h3>
              <ui-accordion label="Form Content">
                <div class="showcase__accordion-form">
                  <ui-text label="Name" placeholder="Enter name" size="small" />
                  <ui-email label="Email" placeholder="Enter email" size="small" />
                  <ui-button variant="primary" size="small">Submit</ui-button>
                </div>
              </ui-accordion>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">List Content</h3>
              <ui-accordion label="List Content">
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </ui-accordion>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all accordion options in real time. Change size, appearance, shape,
            chevron position, icon, selection indicator, and disabled state. The accordion emits
            toggle events—check the event log to see interactions.
          </p>
          <app-accordion-interactive />
        </section>

        <ng-template #quickActionsTemplate>
          <div class="showcase__quick-actions">
            <ui-button
              variant="primary"
              size="small"
              (click)="onQuickActionClick('edit'); $event.stopPropagation()"
            >
              Edit
            </ui-button>
            <ui-button
              variant="primary"
              size="small"
              (click)="onQuickActionClick('delete'); $event.stopPropagation()"
            >
              Delete
            </ui-button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class AccordionShowcaseComponent {
  quickActionsTemplateRef = viewChild<TemplateRef<unknown>>('quickActionsTemplate');

  appearances = ACCORDION_APPEARANCES;
  shapes = [...SHAPES];
  sizes = [...SIZES];
  chevronPositions: ChevronPosition[] = ['before', 'after'];
  indicatorPositions: Orientation[] = ['horizontal', 'vertical'];

  iconsPerAccordion: IconName[] = ['folder', 'settings', 'info', 'star'];

  overviewDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.overview;
  appearanceShapeDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.appearanceShape;
  sizeDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.size;
  chevronPositionDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.chevronPosition;
  iconsDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.icons;
  selectionIndicatorsDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.selectionIndicators;
  statesDrawerFormConfig = ACCORDION_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false },
    { id: 'disabled', label: 'Disabled', disabled: true },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    chevronPosition: 'before',
    icon: '',
    showIndicator: false,
    indicatorPosition: 'vertical',
    disabled: false,
  });
  overviewForm = computed(() => this.toOverviewForm(this.overviewFormValues()));

  appearanceShapeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    chevronPosition: 'before',
    icon: '',
    disabled: false,
  });
  appearanceShapeForm = computed(() =>
    this.toAppearanceShapeForm(this.appearanceShapeFormValues()),
  );

  sizeFormValues = signal<Record<string, unknown>>({
    appearance: 'subtle',
    shape: 'rounded',
    disabled: false,
  });
  sizeForm = computed(() => this.toSizeForm(this.sizeFormValues()));

  chevronPositionFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    disabled: false,
  });
  chevronPositionForm = computed(() =>
    this.toChevronPositionForm(this.chevronPositionFormValues()),
  );

  iconsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    disabled: false,
  });
  iconsForm = computed(() => this.toIconsForm(this.iconsFormValues()));

  selectionIndicatorsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    disabled: false,
  });
  selectionIndicatorsForm = computed(() =>
    this.toSelectionIndicatorsForm(this.selectionIndicatorsFormValues()),
  );

  statesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
  });
  statesForm = computed(() => this.toStatesForm(this.statesFormValues()));

  private toOverviewForm(v: Record<string, unknown>) {
    const icon = v['icon'] as string;
    return {
      size: (v['size'] as Size) ?? 'medium',
      icon: icon ? (icon as IconName) : undefined,
      disabled: !!v['disabled'],
    };
  }

  private toAppearanceShapeForm(v: Record<string, unknown>) {
    const icon = v['icon'] as string;
    return {
      size: (v['size'] as Size) ?? 'medium',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'before',
      icon: icon ? (icon as IconName) : undefined,
      disabled: !!v['disabled'],
    };
  }

  private toSizeForm(v: Record<string, unknown>) {
    return {
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
    };
  }

  private toChevronPositionForm(v: Record<string, unknown>) {
    return {
      size: (v['size'] as Size) ?? 'medium',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
    };
  }

  private toIconsForm(v: Record<string, unknown>) {
    return {
      size: (v['size'] as Size) ?? 'medium',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
    };
  }

  private toSelectionIndicatorsForm(v: Record<string, unknown>) {
    return {
      size: (v['size'] as Size) ?? 'medium',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
    };
  }

  private toStatesForm(v: Record<string, unknown>) {
    return {
      size: (v['size'] as Size) ?? 'medium',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
    };
  }

  onQuickActionClick(action: string): void {
    console.log('Quick action clicked:', action);
  }
}
