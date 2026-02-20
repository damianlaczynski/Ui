import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Appearance,
  ButtonComponent,
  ChevronPosition,
  Orientation,
  Shape,
  Size,
  TableOfContentComponent,
  TreeComponent,
  TreeNode,
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
import { TREE_DRAWER_CONFIGS } from './tree.showcase.config';
import { TreeInteractiveComponent } from './tree.interactive';

@Component({
  selector: 'app-tree-showcase',
  imports: [
    CommonModule,
    FormsModule,
    TreeComponent,
    ButtonComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    TreeInteractiveComponent,
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
        <app-showcase-header title="Tree" />
        <p class="showcase__description">
          Tree displays hierarchical data with expandable nodes. It supports appearance, variant,
          size, shape, selection indicator, chevron placement, and drag & drop for reordering.
        </p>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the visual style and variant controls semantic color. Use the drawer to adjust shared options (size, shape, behavior, selection indicator)."
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
                    <ui-tree
                      [nodes]="createBasicTree(appearance + '-' + variant)"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [chevronPosition]="appearanceVariantForm().chevronPosition"
                      [asButton]="appearanceVariantForm().asButton"
                      [expandOnClick]="appearanceVariantForm().expandOnClick"
                      [selectOnClick]="appearanceVariantForm().selectOnClick"
                      [showSelectionIndicator]="appearanceVariantForm().showSelectionIndicator"
                      [indicatorPosition]="appearanceVariantForm().indicatorPosition"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Tree supports small, medium, and large node sizes. Use this section to compare spacing and visual density."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-tree
                [nodes]="createBasicTree('size-' + size)"
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [chevronPosition]="sizeForm().chevronPosition"
                [asButton]="sizeForm().asButton"
                [expandOnClick]="sizeForm().expandOnClick"
                [selectOnClick]="sizeForm().selectOnClick"
                [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                [indicatorPosition]="sizeForm().indicatorPosition"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Tree node shape can be rounded, circular, or square. Shape influences hit area and visual style."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-tree
                [nodes]="createBasicTree('shape-' + shape)"
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [chevronPosition]="shapeForm().chevronPosition"
                [asButton]="shapeForm().asButton"
                [expandOnClick]="shapeForm().expandOnClick"
                [selectOnClick]="shapeForm().selectOnClick"
                [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                [indicatorPosition]="shapeForm().indicatorPosition"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicator"
          sectionDescription="Selection indicator can be horizontal or vertical. This section keeps it enabled and compares both indicator positions."
          [formConfig]="selectionIndicatorDrawerFormConfig"
          [formValues]="selectionIndicatorFormValues()"
          (formValuesChange)="selectionIndicatorFormValues.set($event)"
        >
          <div class="showcase__grid">
            <ui-tree
              [nodes]="selectionTree()"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [chevronPosition]="selectionIndicatorForm().chevronPosition"
              [asButton]="selectionIndicatorForm().asButton"
              [expandOnClick]="selectionIndicatorForm().expandOnClick"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [showSelectionIndicator]="true"
              indicatorPosition="vertical"
            />
            <ui-tree
              [nodes]="selectionTree()"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [chevronPosition]="selectionIndicatorForm().chevronPosition"
              [asButton]="selectionIndicatorForm().asButton"
              [expandOnClick]="selectionIndicatorForm().expandOnClick"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [showSelectionIndicator]="true"
              indicatorPosition="horizontal"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Chevron Position"
          sectionDescription="Chevron can be rendered before or after the label. This section highlights navigation affordance placement."
          [formConfig]="chevronPositionDrawerFormConfig"
          [formValues]="chevronPositionFormValues()"
          (formValuesChange)="chevronPositionFormValues.set($event)"
        >
          <div class="showcase__grid">
            <ui-tree
              [nodes]="createBasicTree('chevron-before')"
              [variant]="chevronPositionForm().variant"
              [appearance]="chevronPositionForm().appearance"
              [size]="chevronPositionForm().size"
              [shape]="chevronPositionForm().shape"
              chevronPosition="before"
              [asButton]="chevronPositionForm().asButton"
              [expandOnClick]="chevronPositionForm().expandOnClick"
              [selectOnClick]="chevronPositionForm().selectOnClick"
              [showSelectionIndicator]="chevronPositionForm().showSelectionIndicator"
              [indicatorPosition]="chevronPositionForm().indicatorPosition"
            />
            <ui-tree
              [nodes]="createBasicTree('chevron-after')"
              [variant]="chevronPositionForm().variant"
              [appearance]="chevronPositionForm().appearance"
              [size]="chevronPositionForm().size"
              [shape]="chevronPositionForm().shape"
              chevronPosition="after"
              [asButton]="chevronPositionForm().asButton"
              [expandOnClick]="chevronPositionForm().expandOnClick"
              [selectOnClick]="chevronPositionForm().selectOnClick"
              [showSelectionIndicator]="chevronPositionForm().showSelectionIndicator"
              [indicatorPosition]="chevronPositionForm().indicatorPosition"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Drag & Drop"
          sectionDescription="Drag nodes and drop between targets. Use Reset Tree to restore the initial structure."
          [formConfig]="dragDropDrawerFormConfig"
          [formValues]="dragDropFormValues()"
          (formValuesChange)="dragDropFormValues.set($event)"
        >
          <div class="showcase__stack">
            <ui-tree
              [nodes]="draggableTree()"
              [variant]="dragDropForm().variant"
              [appearance]="dragDropForm().appearance"
              [size]="dragDropForm().size"
              [shape]="dragDropForm().shape"
              [chevronPosition]="dragDropForm().chevronPosition"
              [asButton]="dragDropForm().asButton"
              [expandOnClick]="dragDropForm().expandOnClick"
              [selectOnClick]="dragDropForm().selectOnClick"
              [showSelectionIndicator]="dragDropForm().showSelectionIndicator"
              [indicatorPosition]="dragDropForm().indicatorPosition"
              [draggable]="true"
              [dropZone]="true"
              (nodeMoved)="onNodeMoved($event)"
            />
            <ui-button variant="secondary" appearance="outline" size="small" (click)="resetTree()">
              Reset Tree
            </ui-button>
            @if (lastDragDropAction()) {
              <p class="showcase__section__description">{{ lastDragDropAction() }}</p>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test all tree options in one place. Events are logged automatically for clicks, toggles,
            selection, and drag & drop.
          </p>
          <app-tree-interactive />
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__stack {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    `,
  ],
})
export class TreeShowcaseComponent {
  variants: Variant[] = VARIANTS;
  appearances: Appearance[] = APPEARANCES;
  sizes: Size[] = SIZES;
  shapes: Shape[] = SHAPES;

  appearanceVariantDrawerFormConfig = TREE_DRAWER_CONFIGS.appearanceVariant;
  sizeDrawerFormConfig = TREE_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = TREE_DRAWER_CONFIGS.shape;
  selectionIndicatorDrawerFormConfig = TREE_DRAWER_CONFIGS.selectionIndicator;
  chevronPositionDrawerFormConfig = TREE_DRAWER_CONFIGS.chevronPosition;
  dragDropDrawerFormConfig = TREE_DRAWER_CONFIGS.dragDrop;

  lastDragDropAction = signal('');

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: false,
    draggable: false,
    dropZone: false,
  });

  appearanceVariantForm = computed(() => this.toTreeProps(this.appearanceVariantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    chevronPosition: 'before',
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: false,
    draggable: false,
    dropZone: false,
  });

  sizeForm = computed(() => this.toTreeProps(this.sizeFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    chevronPosition: 'before',
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: false,
    draggable: false,
    dropZone: false,
  });

  shapeForm = computed(() => this.toTreeProps(this.shapeFormValues()));

  selectionIndicatorFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    draggable: false,
    dropZone: false,
  });

  selectionIndicatorForm = computed(() => this.toTreeProps(this.selectionIndicatorFormValues()));

  chevronPositionFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: false,
    draggable: false,
    dropZone: false,
  });

  chevronPositionForm = computed(() => this.toTreeProps(this.chevronPositionFormValues()));

  dragDropFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    chevronPosition: 'before',
    indicatorPosition: 'vertical',
    asButton: false,
    expandOnClick: false,
    selectOnClick: false,
    showSelectionIndicator: true,
  });

  dragDropForm = computed(() => this.toTreeProps(this.dragDropFormValues()));

  draggableTree = signal<TreeNode[]>(this.createDraggableTree());

  selectionTree = signal<TreeNode[]>([
    {
      id: 'sel-1',
      label: 'Projects',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'sel-1-1', label: 'Project Alpha', icon: 'document', hasChildren: false },
        {
          id: 'sel-1-2',
          label: 'Project Beta',
          icon: 'document',
          hasChildren: false,
          selected: true,
        },
      ],
    },
    { id: 'sel-2', label: 'Archive', icon: 'folder', hasChildren: false },
  ]);

  resetTree(): void {
    this.draggableTree.set(this.createDraggableTree());
    this.lastDragDropAction.set('Tree reset to initial state.');
  }

  onNodeMoved(event: { node: TreeNode; target: TreeNode; position: string }): void {
    this.lastDragDropAction.set(
      `Moved "${event.node.label}" ${event.position} "${event.target.label}".`,
    );
  }

  createBasicTree(id: string): TreeNode[] {
    return [
      {
        id: `${id}-1`,
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: `${id}-1-1`, label: 'File 1.pdf', icon: 'document', hasChildren: false },
          { id: `${id}-1-2`, label: 'File 2.docx', icon: 'document', hasChildren: false },
        ],
      },
      { id: `${id}-2`, label: 'Settings', icon: 'settings', hasChildren: false },
    ];
  }

  private createDraggableTree(): TreeNode[] {
    return [
      {
        id: 'drag-1',
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'drag-1-1', label: 'Report.pdf', icon: 'document', hasChildren: false },
          { id: 'drag-1-2', label: 'Notes.txt', icon: 'document', hasChildren: false },
        ],
      },
      {
        id: 'drag-2',
        label: 'Images',
        icon: 'image',
        hasChildren: true,
        expanded: true,
        children: [{ id: 'drag-2-1', label: 'Photo.jpg', icon: 'image', hasChildren: false }],
      },
      { id: 'drag-3', label: 'Videos', icon: 'video', hasChildren: false },
    ];
  }

  private toTreeProps(values: Record<string, unknown>): {
    variant: Variant;
    appearance: Appearance;
    size: Size;
    shape: Shape;
    chevronPosition: ChevronPosition;
    indicatorPosition: Orientation;
    asButton: boolean;
    expandOnClick: boolean;
    selectOnClick: boolean;
    showSelectionIndicator: boolean;
    draggable: boolean;
    dropZone: boolean;
  } {
    return {
      variant: (values['variant'] as Variant) ?? 'primary',
      appearance: (values['appearance'] as Appearance) ?? 'subtle',
      size: (values['size'] as Size) ?? 'medium',
      shape: (values['shape'] as Shape) ?? 'rounded',
      chevronPosition: (values['chevronPosition'] as ChevronPosition) ?? 'before',
      indicatorPosition: (values['indicatorPosition'] as Orientation) ?? 'vertical',
      asButton: !!values['asButton'],
      expandOnClick: !!values['expandOnClick'],
      selectOnClick: !!values['selectOnClick'],
      showSelectionIndicator: !!values['showSelectionIndicator'],
      draggable: !!values['draggable'],
      dropZone: !!values['dropZone'],
    };
  }
}
