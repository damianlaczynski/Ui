import { CommonModule } from '@angular/common';
import { Component, computed, signal, TemplateRef, viewChild } from '@angular/core';
import {
  Appearance,
  BadgeComponent,
  ChevronPosition,
  IconComponent,
  IconName,
  MenuComponent,
  MenuItem,
  Orientation,
  Shape,
  Size,
  TableOfContentComponent,
  TreeNode,
  TreeNodeComponent,
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
import { TreeNodeInteractiveComponent } from './tree-node.interactive';
import { TREE_NODE_DRAWER_CONFIGS } from './tree-node.showcase.config';

interface FileSystemItem {
  type: 'file' | 'folder';
  size?: number;
  itemCount?: number;
  status?: string;
}

interface CustomTreeNode extends TreeNode<CustomTreeNode> {
  data: FileSystemItem;
}

type TreeNodePreviewForm = {
  icon: IconName;
  hasChildren: boolean;
  variant: Variant;
  appearance: Appearance;
  size: Size;
  shape: Shape;
  chevronPosition: ChevronPosition;
  chevronIconCollapsed: IconName;
  chevronIconExpanded: IconName;
  selected: boolean;
  disabled: boolean;
  showSelectionIndicator: boolean;
  indicatorPosition: Orientation;
  asButton: boolean;
  expandOnClick: boolean;
  selectOnClick: boolean;
  draggable: boolean;
  dropZone: boolean;
};

@Component({
  selector: 'app-tree-node-showcase',
  imports: [
    CommonModule,
    TableOfContentComponent,
    TreeNodeComponent,
    IconComponent,
    BadgeComponent,
    MenuComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TreeNodeInteractiveComponent,
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
        <app-showcase-header title="Tree Node" />
        <p class="showcase__description">
          Tree Node displays hierarchical data with expand/collapse behavior, semantic variants,
          size and shape options, selection indicators, and optional drag-and-drop interactions.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Baseline preview for all main tree-node options. Use the Customize drawer to adjust appearance, layout, state, and behavior."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item" style="width: 100%;">
              <ui-tree-node
                [node]="createPreviewNode('overview', 'Overview node', overviewForm())"
                [variant]="overviewForm().variant"
                [appearance]="overviewForm().appearance"
                [size]="overviewForm().size"
                [shape]="overviewForm().shape"
                [showSelectionIndicator]="overviewForm().showSelectionIndicator"
                [indicatorPosition]="overviewForm().indicatorPosition"
                [chevronPosition]="overviewForm().chevronPosition"
                [chevronIconCollapsed]="overviewForm().chevronIconCollapsed"
                [chevronIconExpanded]="overviewForm().chevronIconExpanded"
                [asButton]="overviewForm().asButton"
                [expandOnClick]="overviewForm().expandOnClick"
                [selectOnClick]="overviewForm().selectOnClick"
                [draggable]="overviewForm().draggable"
                [dropZone]="overviewForm().dropZone"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Compare all appearances with shared options. Use Customize to tune variant, size, shape, and behavior."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3>{{ appearance | titlecase }}</h3>
                <ui-tree-node
                  [node]="
                    createPreviewNode('appearance-' + appearance, appearance, appearanceForm())
                  "
                  [variant]="appearanceForm().variant"
                  [appearance]="appearance"
                  [size]="appearanceForm().size"
                  [shape]="appearanceForm().shape"
                  [showSelectionIndicator]="appearanceForm().showSelectionIndicator"
                  [indicatorPosition]="appearanceForm().indicatorPosition"
                  [chevronPosition]="appearanceForm().chevronPosition"
                  [chevronIconCollapsed]="appearanceForm().chevronIconCollapsed"
                  [chevronIconExpanded]="appearanceForm().chevronIconExpanded"
                  [asButton]="appearanceForm().asButton"
                  [expandOnClick]="appearanceForm().expandOnClick"
                  [selectOnClick]="appearanceForm().selectOnClick"
                  [draggable]="appearanceForm().draggable"
                  [dropZone]="appearanceForm().dropZone"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Shape changes the node container style. Compare rounded, circular, and square with shared settings."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3>{{ shape | titlecase }}</h3>
                <ui-tree-node
                  [node]="createPreviewNode('shape-' + shape, shape, shapeForm())"
                  [variant]="shapeForm().variant"
                  [appearance]="shapeForm().appearance"
                  [size]="shapeForm().size"
                  [shape]="shape"
                  [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                  [indicatorPosition]="shapeForm().indicatorPosition"
                  [chevronPosition]="shapeForm().chevronPosition"
                  [chevronIconCollapsed]="shapeForm().chevronIconCollapsed"
                  [chevronIconExpanded]="shapeForm().chevronIconExpanded"
                  [asButton]="shapeForm().asButton"
                  [expandOnClick]="shapeForm().expandOnClick"
                  [selectOnClick]="shapeForm().selectOnClick"
                  [draggable]="shapeForm().draggable"
                  [dropZone]="shapeForm().dropZone"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium, and large. Customize shared style and behavior settings."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3>{{ size | titlecase }}</h3>
                <ui-tree-node
                  [node]="createPreviewNode('size-' + size, size, sizeForm())"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [shape]="sizeForm().shape"
                  [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                  [indicatorPosition]="sizeForm().indicatorPosition"
                  [chevronPosition]="sizeForm().chevronPosition"
                  [chevronIconCollapsed]="sizeForm().chevronIconCollapsed"
                  [chevronIconExpanded]="sizeForm().chevronIconExpanded"
                  [asButton]="sizeForm().asButton"
                  [expandOnClick]="sizeForm().expandOnClick"
                  [selectOnClick]="sizeForm().selectOnClick"
                  [draggable]="sizeForm().draggable"
                  [dropZone]="sizeForm().dropZone"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Chevron Position"
          sectionDescription="Chevron can appear before or after content. Customize shared icons, styles, and behavior."
          [formConfig]="chevronDrawerFormConfig"
          [formValues]="chevronFormValues()"
          (formValuesChange)="chevronFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Before</h3>
              <ui-tree-node
                [node]="createPreviewNode('chevron-before', 'Before', chevronForm())"
                [variant]="chevronForm().variant"
                [appearance]="chevronForm().appearance"
                [size]="chevronForm().size"
                [shape]="chevronForm().shape"
                [showSelectionIndicator]="chevronForm().showSelectionIndicator"
                [indicatorPosition]="chevronForm().indicatorPosition"
                chevronPosition="before"
                [chevronIconCollapsed]="chevronForm().chevronIconCollapsed"
                [chevronIconExpanded]="chevronForm().chevronIconExpanded"
                [asButton]="chevronForm().asButton"
                [expandOnClick]="chevronForm().expandOnClick"
                [selectOnClick]="chevronForm().selectOnClick"
                [draggable]="chevronForm().draggable"
                [dropZone]="chevronForm().dropZone"
              />
            </div>
            <div class="showcase__item">
              <h3>After</h3>
              <ui-tree-node
                [node]="createPreviewNode('chevron-after', 'After', chevronForm())"
                [variant]="chevronForm().variant"
                [appearance]="chevronForm().appearance"
                [size]="chevronForm().size"
                [shape]="chevronForm().shape"
                [showSelectionIndicator]="chevronForm().showSelectionIndicator"
                [indicatorPosition]="chevronForm().indicatorPosition"
                chevronPosition="after"
                [chevronIconCollapsed]="chevronForm().chevronIconCollapsed"
                [chevronIconExpanded]="chevronForm().chevronIconExpanded"
                [asButton]="chevronForm().asButton"
                [expandOnClick]="chevronForm().expandOnClick"
                [selectOnClick]="chevronForm().selectOnClick"
                [draggable]="chevronForm().draggable"
                [dropZone]="chevronForm().dropZone"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicator"
          sectionDescription="Selection indicator supports vertical or horizontal orientation."
          [formConfig]="indicatorDrawerFormConfig"
          [formValues]="indicatorFormValues()"
          (formValuesChange)="indicatorFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Vertical</h3>
              <ui-tree-node
                [node]="createPreviewNode('indicator-vertical', 'Vertical', indicatorForm())"
                [variant]="indicatorForm().variant"
                [appearance]="indicatorForm().appearance"
                [size]="indicatorForm().size"
                [shape]="indicatorForm().shape"
                [showSelectionIndicator]="true"
                indicatorPosition="vertical"
                [chevronPosition]="indicatorForm().chevronPosition"
                [chevronIconCollapsed]="indicatorForm().chevronIconCollapsed"
                [chevronIconExpanded]="indicatorForm().chevronIconExpanded"
                [asButton]="indicatorForm().asButton"
                [expandOnClick]="indicatorForm().expandOnClick"
                [selectOnClick]="indicatorForm().selectOnClick"
                [draggable]="indicatorForm().draggable"
                [dropZone]="indicatorForm().dropZone"
              />
            </div>
            <div class="showcase__item">
              <h3>Horizontal</h3>
              <ui-tree-node
                [node]="createPreviewNode('indicator-horizontal', 'Horizontal', indicatorForm())"
                [variant]="indicatorForm().variant"
                [appearance]="indicatorForm().appearance"
                [size]="indicatorForm().size"
                [shape]="indicatorForm().shape"
                [showSelectionIndicator]="true"
                indicatorPosition="horizontal"
                [chevronPosition]="indicatorForm().chevronPosition"
                [chevronIconCollapsed]="indicatorForm().chevronIconCollapsed"
                [chevronIconExpanded]="indicatorForm().chevronIconExpanded"
                [asButton]="indicatorForm().asButton"
                [expandOnClick]="indicatorForm().expandOnClick"
                [selectOnClick]="indicatorForm().selectOnClick"
                [draggable]="indicatorForm().draggable"
                [dropZone]="indicatorForm().dropZone"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Common node states with shared visual options."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3>{{ state.label }}</h3>
                <ui-tree-node
                  [node]="
                    createStateNode(
                      state.id,
                      state.label,
                      statesForm(),
                      state.selected,
                      state.disabled
                    )
                  "
                  [variant]="statesForm().variant"
                  [appearance]="statesForm().appearance"
                  [size]="statesForm().size"
                  [shape]="statesForm().shape"
                  [showSelectionIndicator]="statesForm().showSelectionIndicator"
                  [indicatorPosition]="statesForm().indicatorPosition"
                  [chevronPosition]="statesForm().chevronPosition"
                  [chevronIconCollapsed]="statesForm().chevronIconCollapsed"
                  [chevronIconExpanded]="statesForm().chevronIconExpanded"
                  [asButton]="statesForm().asButton"
                  [expandOnClick]="statesForm().expandOnClick"
                  [selectOnClick]="statesForm().selectOnClick"
                  [draggable]="statesForm().draggable"
                  [dropZone]="statesForm().dropZone"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Nested Structure</h2>
          <p class="showcase__section__description">
            Example tree hierarchy with folders and files for realistic nesting.
          </p>
          <div class="showcase__option-section__box">
            <ui-tree-node
              [node]="nestedTree()"
              appearance="subtle"
              [showSelectionIndicator]="true"
              indicatorPosition="vertical"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Type Template</h2>
          <p class="showcase__section__description">
            Type-safe custom node data with custom content and quick actions templates.
          </p>
          <div class="showcase__option-section__box">
            <ui-tree-node
              [node]="customTypeTree()"
              appearance="subtle"
              [showSelectionIndicator]="true"
              [expandOnClick]="true"
              indicatorPosition="vertical"
              [showQuickActions]="true"
              [quickActionsTemplate]="customQuickActionsTemplate() ?? null"
              [contentTemplate]="customContentTemplate() ?? null"
            >
              <ng-template #customContent let-node>
                <div class="tree-node-custom-content">
                  @if (node.icon) {
                    <ui-icon [icon]="node.icon" size="medium" />
                  }
                  <div class="tree-node-custom-content__main">
                    <div class="tree-node-custom-content__label">{{ node.label }}</div>
                    @if (node.data) {
                      <div class="tree-node-custom-content__meta">
                        @if (node.data.type === 'file') {
                          <span>{{ node.data.size }} KB</span>
                        } @else {
                          <span>{{ node.data.itemCount }} items</span>
                        }
                      </div>
                    }
                  </div>
                  @if (node.data?.status) {
                    <ui-badge
                      [text]="node.data.status"
                      size="large"
                      appearance="subtle"
                      variant="secondary"
                      shape="rounded"
                    />
                  }
                </div>
              </ng-template>
              <ng-template #customQuickActions let-node>
                <ui-menu
                  triggerVariant="dropdown"
                  [menuItems]="getCustomNodeMenuItems(node)"
                  icon="more_horizontal"
                  size="small"
                  ariaLabel="Menu"
                  (menuItemClick)="onCustomMenuAction($event)"
                />
              </ng-template>
            </ui-tree-node>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all tree-node options in real time. Adjust content, visual styles,
            chevron behavior, selection indicators, and interaction settings.
          </p>
          <app-tree-node-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TreeNodeShowcaseComponent {
  appearances: Appearance[] = [...APPEARANCES];
  shapes: Shape[] = [...SHAPES];
  sizes: Size[] = [...SIZES];
  variants: Variant[] = [...VARIANTS];

  overviewDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.overview;
  appearanceDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.appearance;
  shapeDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.shape;
  sizeDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.size;
  chevronDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.chevron;
  indicatorDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.indicator;
  statesDrawerFormConfig = TREE_NODE_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', selected: false, disabled: false },
    { id: 'selected', label: 'Selected', selected: true, disabled: false },
    { id: 'disabled', label: 'Disabled', selected: false, disabled: true },
  ];

  nestedTree = signal<TreeNode>(this.createNestedTree());
  customTypeTree = signal<CustomTreeNode>(this.createCustomTypeTree());

  customContentTemplate = viewChild<TemplateRef<any>>('customContent');
  customQuickActionsTemplate = viewChild<TemplateRef<any>>('customQuickActions');

  overviewFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  overviewForm = computed(() => this.toPreviewForm(this.overviewFormValues()));

  appearanceFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  appearanceForm = computed(() => this.toPreviewForm(this.appearanceFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  shapeForm = computed(() => this.toPreviewForm(this.shapeFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  sizeForm = computed(() => this.toPreviewForm(this.sizeFormValues()));

  chevronFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  chevronForm = computed(() => this.toPreviewForm(this.chevronFormValues()));

  indicatorFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: true,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    selected: true,
    disabled: false,
    showSelectionIndicator: true,
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  indicatorForm = computed(() => this.toPreviewForm(this.indicatorFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    hasChildren: false,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    chevronIconCollapsed: 'chevron_right',
    chevronIconExpanded: 'chevron_down',
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  statesForm = computed(() => this.toPreviewForm(this.statesFormValues()));

  createPreviewNode(id: string, label: string, form: TreeNodePreviewForm): TreeNode {
    const hasChildren = form.hasChildren;
    return {
      id,
      label,
      icon: form.icon,
      selected: form.selected,
      disabled: form.disabled,
      hasChildren,
      expanded: hasChildren,
      children: hasChildren
        ? [
            { id: `${id}-1`, label: 'Child 1', icon: 'document', hasChildren: false },
            { id: `${id}-2`, label: 'Child 2', icon: 'document', hasChildren: false },
          ]
        : undefined,
    };
  }

  createStateNode(
    id: string,
    label: string,
    form: TreeNodePreviewForm,
    selected: boolean,
    disabled: boolean,
  ): TreeNode {
    return {
      id,
      label,
      icon: form.icon,
      selected,
      disabled,
      hasChildren: false,
    };
  }

  getCustomNodeMenuItems(node: CustomTreeNode): MenuItem[] {
    return [
      { id: 'open', label: 'Open', icon: 'open' },
      { id: 'rename', label: 'Rename', icon: 'edit' },
      {
        id: 'delete',
        label: node.data?.type === 'file' ? 'Delete File' : 'Delete Folder',
        icon: 'delete',
      },
      { id: 'properties', label: 'Properties', icon: 'info' },
    ];
  }

  onCustomMenuAction(item: MenuItem): void {
    if (item.action) {
      item.action();
    }
  }

  private toPreviewForm(v: Record<string, unknown>): TreeNodePreviewForm {
    return {
      icon: (v['icon'] as IconName) ?? 'folder',
      hasChildren: !!v['hasChildren'],
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      chevronPosition: (v['chevronPosition'] as ChevronPosition) ?? 'before',
      chevronIconCollapsed: (v['chevronIconCollapsed'] as IconName) ?? 'chevron_right',
      chevronIconExpanded: (v['chevronIconExpanded'] as IconName) ?? 'chevron_down',
      selected: !!v['selected'],
      disabled: !!v['disabled'],
      showSelectionIndicator: !!v['showSelectionIndicator'],
      indicatorPosition: (v['indicatorPosition'] as Orientation) ?? 'vertical',
      asButton: !!v['asButton'],
      expandOnClick: !!v['expandOnClick'],
      selectOnClick: !!v['selectOnClick'],
      draggable: !!v['draggable'],
      dropZone: !!v['dropZone'],
    };
  }

  private createNestedTree(): TreeNode {
    return {
      id: 'root',
      label: 'Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'projects',
          label: 'Projects',
          icon: 'folder',
          hasChildren: true,
          expanded: true,
          children: [
            { id: 'proj-1', label: 'Project Alpha', icon: 'document', hasChildren: false },
            { id: 'proj-2', label: 'Project Beta', icon: 'document', hasChildren: false },
          ],
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'folder',
          hasChildren: true,
          expanded: false,
          children: [
            { id: 'rep-1', label: 'Q1 Report', icon: 'document', hasChildren: false },
            { id: 'rep-2', label: 'Q2 Report', icon: 'document', hasChildren: false },
          ],
        },
        { id: 'readme', label: 'README.md', icon: 'document', hasChildren: false },
      ],
    };
  }

  private createCustomTypeTree(): CustomTreeNode {
    return {
      id: 'root',
      label: 'My Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      data: {
        type: 'folder',
        itemCount: 3,
        status: 'Active',
      },
      children: [
        {
          id: 'projects',
          label: 'Projects',
          icon: 'folder',
          hasChildren: true,
          expanded: true,
          data: {
            type: 'folder',
            itemCount: 2,
            status: 'Synced',
          },
          children: [
            {
              id: 'project-alpha',
              label: 'Project Alpha',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 1024,
                status: 'Modified',
              },
            },
            {
              id: 'project-beta',
              label: 'Project Beta',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 2048,
                status: 'Saved',
              },
            },
          ],
        },
        {
          id: 'reports',
          label: 'Annual Report.pdf',
          icon: 'document',
          hasChildren: false,
          data: {
            type: 'file',
            size: 5120,
            status: 'Published',
          },
        },
        {
          id: 'notes',
          label: 'Notes',
          icon: 'folder',
          hasChildren: true,
          expanded: false,
          data: {
            type: 'folder',
            itemCount: 5,
            status: 'Local',
          },
          children: [
            {
              id: 'note-1',
              label: 'Meeting Notes.txt',
              icon: 'document',
              hasChildren: false,
              data: {
                type: 'file',
                size: 256,
                status: 'Draft',
              },
            },
          ],
        },
      ],
    };
  }
}
