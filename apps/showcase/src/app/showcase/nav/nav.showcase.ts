import { CommonModule } from '@angular/common';
import { Component, TemplateRef, computed, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  APPEARANCES,
  SHAPES,
  SIZES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  Appearance,
  ButtonComponent,
  ChevronPosition,
  NavComponent,
  NavNode,
  Orientation,
  Shape,
  Size,
  TableOfContentComponent,
  Variant,
} from 'ui';
import { NAV_DRAWER_CONFIGS } from './nav.showcase.config';
import { NavInteractiveComponent } from './nav.interactive';

@Component({
  selector: 'app-nav-showcase',
  imports: [
    CommonModule,
    FormsModule,
    NavComponent,
    ButtonComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    NavInteractiveComponent,
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
        <app-showcase-header title="Nav" />
        <p class="showcase__description">
          Nav builds app side navigation with tree behavior. It supports semantic variants,
          appearances, sizes, shapes, chevron placement, selection indicators, and templating for
          custom node content.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete matrix of variant + appearance combinations. Customize shared options like selection indicator and chevron placement across all examples."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (col of overviewColumns; track col.variant + col.size + col.shape) {
                <div
                  class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header showcase__icons-matrix__cell--header-multi"
                >
                  <span>{{ col.variant | titlecase }}</span>
                  <span>{{ col.size | titlecase }}</span>
                  <span>{{ col.shape | titlecase }}</span>
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (col of overviewColumns; track col.variant + col.size + col.shape) {
                  <div class="showcase__icons-matrix__cell">
                    <div class="showcase__nav-preview">
                      <ui-nav
                        [items]="overviewItems"
                        [variant]="col.variant"
                        [appearance]="appearance"
                        [size]="col.size"
                        [shape]="col.shape"
                        [chevronPosition]="overviewForm().chevronPosition"
                        [showSelectionIndicator]="overviewForm().showSelectionIndicator"
                        [indicatorPosition]="overviewForm().indicatorPosition"
                      />
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls fill style while variant controls semantic color. This section keeps size and shape configurable so you can evaluate visual combinations in a consistent layout."
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
                    <div class="showcase__nav-preview">
                      <ui-nav
                        [items]="appearanceVariantItems"
                        [variant]="variant"
                        [appearance]="appearance"
                        [size]="appearanceVariantForm().size"
                        [shape]="appearanceVariantForm().shape"
                        [chevronPosition]="appearanceVariantForm().chevronPosition"
                        [showSelectionIndicator]="appearanceVariantForm().showSelectionIndicator"
                        [indicatorPosition]="appearanceVariantForm().indicatorPosition"
                      />
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large affect row height, icon spacing, and interaction density."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3>{{ size | titlecase }}</h3>
                <ui-nav
                  [items]="sizeItems"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [shape]="sizeForm().shape"
                  [chevronPosition]="sizeForm().chevronPosition"
                  [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                  [indicatorPosition]="sizeForm().indicatorPosition"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Rounded, circular, and square define corner radius for every nav row."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3>{{ shape | titlecase }}</h3>
                <ui-nav
                  [items]="shapeItems"
                  [variant]="shapeForm().variant"
                  [appearance]="shapeForm().appearance"
                  [size]="shapeForm().size"
                  [shape]="shape"
                  [chevronPosition]="shapeForm().chevronPosition"
                  [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                  [indicatorPosition]="shapeForm().indicatorPosition"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Chevron Position"
          sectionDescription="Chevron can appear before or after the label for items with children."
          [formConfig]="chevronPositionDrawerFormConfig"
          [formValues]="chevronPositionFormValues()"
          (formValuesChange)="chevronPositionFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (position of chevronPositions; track position) {
              <div class="showcase__item">
                <h3>{{ position | titlecase }}</h3>
                <ui-nav
                  [items]="nestedItems"
                  [variant]="chevronPositionForm().variant"
                  [appearance]="chevronPositionForm().appearance"
                  [size]="chevronPositionForm().size"
                  [shape]="chevronPositionForm().shape"
                  [chevronPosition]="position"
                  [showSelectionIndicator]="chevronPositionForm().showSelectionIndicator"
                  [indicatorPosition]="chevronPositionForm().indicatorPosition"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicator"
          sectionDescription="Configure selection marker visibility and orientation. Compare vertical and horizontal positions in the same data set."
          [formConfig]="selectionIndicatorDrawerFormConfig"
          [formValues]="selectionIndicatorFormValues()"
          (formValuesChange)="selectionIndicatorFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Configured</h3>
              <ui-nav
                [items]="selectionItems"
                [variant]="selectionIndicatorForm().variant"
                [appearance]="selectionIndicatorForm().appearance"
                [size]="selectionIndicatorForm().size"
                [shape]="selectionIndicatorForm().shape"
                [chevronPosition]="selectionIndicatorForm().chevronPosition"
                [showSelectionIndicator]="selectionIndicatorForm().showSelectionIndicator"
                [indicatorPosition]="selectionIndicatorForm().indicatorPosition"
              />
            </div>
            <div class="showcase__item">
              <h3>Vertical Reference</h3>
              <ui-nav
                [items]="selectionItems"
                [variant]="selectionIndicatorForm().variant"
                [appearance]="selectionIndicatorForm().appearance"
                [size]="selectionIndicatorForm().size"
                [shape]="selectionIndicatorForm().shape"
                [chevronPosition]="selectionIndicatorForm().chevronPosition"
                [showSelectionIndicator]="true"
                [indicatorPosition]="'vertical'"
              />
            </div>
            <div class="showcase__item">
              <h3>Horizontal Reference</h3>
              <ui-nav
                [items]="selectionItems"
                [variant]="selectionIndicatorForm().variant"
                [appearance]="selectionIndicatorForm().appearance"
                [size]="selectionIndicatorForm().size"
                [shape]="selectionIndicatorForm().shape"
                [chevronPosition]="selectionIndicatorForm().chevronPosition"
                [showSelectionIndicator]="true"
                [indicatorPosition]="'horizontal'"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Structure</h2>
          <p class="showcase__section__description">
            Examples of base structures: flat navigation, nested hierarchy, and mixed sections with
            dividers.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Flat Items</h3>
              <ui-nav [items]="flatItems" />
            </div>
            <div class="showcase__item">
              <h3>Nested Tree</h3>
              <ui-nav [items]="nestedItems" />
            </div>
            <div class="showcase__item">
              <h3>Sections and Dividers</h3>
              <ui-nav [items]="sectionedItems" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Templates</h2>
          <p class="showcase__section__description">
            Use templates to inject custom content and quick actions into each navigation node.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Content Template</h3>
              <ui-nav [items]="templateItems" [contentTemplate]="contentTemplateRef() ?? null" />
            </div>
            <div class="showcase__item">
              <h3>Quick Actions</h3>
              <ui-nav
                [items]="templateItems"
                [showQuickActions]="true"
                [quickActionsTemplate]="quickActionsTemplateRef() ?? null"
              />
            </div>
          </div>

          <ng-template #navContentTemplate let-node>
            <div class="showcase__nav-content-template">
              <span>{{ node.label }}</span>
              <span class="showcase__nav-content-template__badge">{{ getItemCount(node.id) }}</span>
            </div>
          </ng-template>

          <ng-template #navQuickActionsTemplate let-node>
            <div class="showcase__nav-quick-actions">
              <ui-button
                appearance="outline"
                variant="secondary"
                size="small"
                (click)="onQuickActionClick('edit', node); $event.stopPropagation()"
              >
                Edit
              </ui-button>
              <ui-button
                appearance="outline"
                variant="danger"
                size="small"
                (click)="onQuickActionClick('delete', node); $event.stopPropagation()"
              >
                Delete
              </ui-button>
            </div>
          </ng-template>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test live nav options: appearance, layout, shape, chevron position, and selection
            indicator. Node clicks are logged in the event panel.
          </p>
          <app-nav-interactive />
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__nav-preview {
        width: 220px;
      }

      .showcase__nav-content-template {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .showcase__nav-content-template__badge {
        min-width: 20px;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        background: var(--color-neutral-background3-rest, #f5f5f5);
        font-size: 12px;
        text-align: center;
      }

      .showcase__nav-quick-actions {
        display: flex;
        gap: 0.375rem;
      }
    `,
  ],
})
export class NavShowcaseComponent {
  variants: Variant[] = VARIANTS;
  appearances: Appearance[] = APPEARANCES;
  sizes: Size[] = SIZES;
  shapes: Shape[] = SHAPES;
  chevronPositions: ChevronPosition[] = ['before', 'after'];

  overviewDrawerFormConfig = NAV_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = NAV_DRAWER_CONFIGS.appearanceVariant;
  sizeDrawerFormConfig = NAV_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = NAV_DRAWER_CONFIGS.shape;
  chevronPositionDrawerFormConfig = NAV_DRAWER_CONFIGS.chevronPosition;
  selectionIndicatorDrawerFormConfig = NAV_DRAWER_CONFIGS.selectionIndicator;

  overviewColumns = VARIANTS.map((variant, i) => ({
    variant,
    size: SIZES[i % SIZES.length],
    shape: [...SHAPES].reverse()[i % SHAPES.length],
  }));

  overviewItems: NavNode[] = [
    {
      id: 'overview-home',
      label: 'Home',
      icon: 'home',
      selected: true,
      hasChildren: true,
      children: [{ id: 'overview-home-main', label: 'Main page' }],
    },
    {
      id: 'overview-settings',
      label: 'Settings',
      icon: 'settings',
      hasChildren: true,
      children: [{ id: 'overview-settings-profile', label: 'Profile' }],
    },
  ];

  appearanceVariantItems: NavNode[] = [
    {
      id: 'appearance-home',
      label: 'Overview',
      icon: 'home',
      selected: true,
      hasChildren: true,
      children: [{ id: 'appearance-home-insights', label: 'Insights' }],
    },
    {
      id: 'appearance-reports',
      label: 'Reports',
      icon: 'info',
      hasChildren: true,
      children: [{ id: 'appearance-reports-monthly', label: 'Monthly' }],
    },
  ];

  sizeItems: NavNode[] = [
    {
      id: 'size-home',
      label: 'Home',
      icon: 'home',
      selected: true,
      hasChildren: true,
      children: [{ id: 'size-home-summary', label: 'Summary' }],
    },
    {
      id: 'size-dashboard',
      label: 'Dashboard',
      icon: 'grid',
      hasChildren: true,
      children: [{ id: 'size-dashboard-kpis', label: 'KPIs' }],
    },
    { id: 'size-settings', label: 'Settings', icon: 'settings' },
  ];

  shapeItems: NavNode[] = [
    {
      id: 'shape-projects',
      label: 'Projects',
      icon: 'folder',
      selected: true,
      hasChildren: true,
      children: [{ id: 'shape-projects-alpha', label: 'Project Alpha' }],
    },
    {
      id: 'shape-files',
      label: 'Files',
      icon: 'document',
      hasChildren: true,
      children: [{ id: 'shape-files-shared', label: 'Shared' }],
    },
    { id: 'shape-settings', label: 'Settings', icon: 'settings' },
  ];

  nestedItems: NavNode[] = [
    {
      id: 'nested-products',
      label: 'Products',
      icon: 'folder',
      hasChildren: true,
      children: [
        { id: 'nested-product-a', label: 'Product A' },
        { id: 'nested-product-b', label: 'Product B' },
      ],
    },
    {
      id: 'nested-team',
      label: 'Team',
      icon: 'person',
      hasChildren: true,
      children: [
        { id: 'nested-members', label: 'Members' },
        { id: 'nested-permissions', label: 'Permissions' },
      ],
    },
    { id: 'nested-settings', label: 'Settings', icon: 'settings' },
  ];

  selectionItems: NavNode[] = [
    {
      id: 'selection-home',
      label: 'Home',
      icon: 'home',
      selected: true,
      hasChildren: true,
      children: [{ id: 'selection-home-feed', label: 'Feed' }],
    },
    {
      id: 'selection-projects',
      label: 'Projects',
      icon: 'folder',
      hasChildren: true,
      children: [{ id: 'selection-projects-active', label: 'Active projects' }],
    },
    { id: 'selection-settings', label: 'Settings', icon: 'settings' },
  ];

  flatItems: NavNode[] = [
    { id: 'flat-home', label: 'Home', icon: 'home' },
    { id: 'flat-analytics', label: 'Analytics', icon: 'info' },
    { id: 'flat-settings', label: 'Settings', icon: 'settings' },
  ];

  sectionedItems: NavNode[] = [
    { id: 'section-main', label: 'Main', isSectionHeader: true },
    { id: 'section-home', label: 'Home', icon: 'home', selected: true },
    { id: 'section-dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'section-divider', label: 'divider', isDivider: true },
    { id: 'section-account', label: 'Account', isSectionHeader: true },
    { id: 'section-profile', label: 'Profile', icon: 'person' },
    { id: 'section-security', label: 'Security', icon: 'lock_closed', disabled: true },
  ];

  templateItems: NavNode[] = [
    { id: 'template-inbox', label: 'Inbox', icon: 'mail', selected: true },
    { id: 'template-drafts', label: 'Drafts', icon: 'document' },
    { id: 'template-archive', label: 'Archive', icon: 'folder' },
  ];

  quickActionsTemplateRef = viewChild<TemplateRef<any>>('navQuickActionsTemplate');
  contentTemplateRef = viewChild<TemplateRef<any>>('navContentTemplate');

  overviewFormValues = signal<Record<string, unknown>>({
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'after',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'after',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'after',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      size: (v['size'] as Size) ?? 'medium',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'after',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  chevronPositionFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  chevronPositionForm = computed(() => {
    const v = this.chevronPositionFormValues();
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  selectionIndicatorFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'after',
    indicatorPosition: 'vertical',
    showSelectionIndicator: true,
  });

  selectionIndicatorForm = computed(() => {
    const v = this.selectionIndicatorFormValues();
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'after',
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      showSelectionIndicator: !!v['showSelectionIndicator'],
    };
  });

  onQuickActionClick(action: string, node: NavNode): void {
    console.log('Nav quick action:', action, node.label);
  }

  getItemCount(id: string): number {
    const counts: Record<string, number> = {
      'template-inbox': 12,
      'template-drafts': 4,
      'template-archive': 31,
    };
    return counts[id] ?? 0;
  }
}
