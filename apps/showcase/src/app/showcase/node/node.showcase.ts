import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  Appearance,
  MenuComponent,
  MenuItem,
  Node,
  NodeComponent,
  Orientation,
  Shape,
  Size,
  TableOfContentComponent,
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
import { NODE_DRAWER_CONFIGS } from './node.showcase.config';
import { NodeInteractiveComponent } from './node.interactive';

@Component({
  selector: 'app-node-showcase',
  imports: [
    CommonModule,
    NodeComponent,
    MenuComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    NodeInteractiveComponent,
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
        <app-showcase-header title="Node" />
        <p class="showcase__description">
          Node is a compact item for tree-like or list-based navigation. It supports semantic
          variants, appearance styles, size and shape options, selection indicators, quick actions,
          button mode, and interaction states.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete matrix of appearance and variant combinations. Use the Customize drawer to toggle icon, close button, selection indicator, and interaction behavior across all nodes."
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
                    <ui-node
                      [node]="{
                        id: appearance + '-' + variant,
                        label: variant | titlecase,
                        icon: overviewForm().icon,
                        closable: overviewForm().closable,
                        selected: overviewForm().selected,
                        disabled: overviewForm().disabled,
                      }"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="overviewForm().size"
                      [shape]="overviewForm().shape"
                      [showSelectionIndicator]="overviewForm().showSelectionIndicator"
                      [indicatorPosition]="overviewForm().indicatorPosition"
                      [asButton]="overviewForm().asButton"
                      [selectOnClick]="overviewForm().selectOnClick"
                      [draggable]="overviewForm().draggable"
                      [dropZone]="overviewForm().dropZone"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls visual style while variant controls semantic color. Mix them to define hierarchy, emphasis, and status semantics."
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
                    <ui-node
                      [node]="{
                        id: 'appearance-variant-' + appearance + '-' + variant,
                        label: appearance | titlecase,
                        icon: appearanceVariantForm().icon,
                        closable: appearanceVariantForm().closable,
                        selected: appearanceVariantForm().selected,
                        disabled: appearanceVariantForm().disabled,
                      }"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [showSelectionIndicator]="appearanceVariantForm().showSelectionIndicator"
                      [indicatorPosition]="appearanceVariantForm().indicatorPosition"
                      [asButton]="appearanceVariantForm().asButton"
                      [selectOnClick]="appearanceVariantForm().selectOnClick"
                      [draggable]="appearanceVariantForm().draggable"
                      [dropZone]="appearanceVariantForm().dropZone"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three sizes are available: small, medium, and large. Size affects padding, typography, and overall density."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-node
                [node]="{
                  id: 'size-' + size,
                  label: size | titlecase,
                  icon: sizeForm().icon,
                  closable: sizeForm().closable,
                  selected: sizeForm().selected,
                  disabled: sizeForm().disabled,
                }"
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                [indicatorPosition]="sizeForm().indicatorPosition"
                [asButton]="sizeForm().asButton"
                [selectOnClick]="sizeForm().selectOnClick"
                [draggable]="sizeForm().draggable"
                [dropZone]="sizeForm().dropZone"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Use rounded, circular, or square shape to match the visual language of your navigation and content hierarchy."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-node
                [node]="{
                  id: 'shape-' + shape,
                  label: shape | titlecase,
                  icon: shapeForm().icon,
                  closable: shapeForm().closable,
                  selected: shapeForm().selected,
                  disabled: shapeForm().disabled,
                }"
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [showSelectionIndicator]="shapeForm().showSelectionIndicator"
                [indicatorPosition]="shapeForm().indicatorPosition"
                [asButton]="shapeForm().asButton"
                [selectOnClick]="shapeForm().selectOnClick"
                [draggable]="shapeForm().draggable"
                [dropZone]="shapeForm().dropZone"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicator"
          sectionDescription="Indicators can be displayed in horizontal or vertical orientation. This is useful when selected state should remain visible in dense nav structures."
          [formConfig]="selectionIndicatorDrawerFormConfig"
          [formValues]="selectionIndicatorFormValues()"
          (formValuesChange)="selectionIndicatorFormValues.set($event)"
        >
          <div class="showcase__grid">
            <ui-node
              [node]="{
                id: 'indicator-h-selected',
                label: 'Horizontal Selected',
                icon: selectionIndicatorForm().icon,
                selected: true,
                disabled: selectionIndicatorForm().disabled,
                closable: selectionIndicatorForm().closable,
              }"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [showSelectionIndicator]="true"
              indicatorPosition="horizontal"
              [asButton]="selectionIndicatorForm().asButton"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [draggable]="selectionIndicatorForm().draggable"
              [dropZone]="selectionIndicatorForm().dropZone"
            />
            <ui-node
              [node]="{
                id: 'indicator-h-normal',
                label: 'Horizontal Normal',
                icon: selectionIndicatorForm().icon,
                selected: false,
                disabled: selectionIndicatorForm().disabled,
                closable: selectionIndicatorForm().closable,
              }"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [showSelectionIndicator]="true"
              indicatorPosition="horizontal"
              [asButton]="selectionIndicatorForm().asButton"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [draggable]="selectionIndicatorForm().draggable"
              [dropZone]="selectionIndicatorForm().dropZone"
            />
            <ui-node
              [node]="{
                id: 'indicator-v-selected',
                label: 'Vertical Selected',
                icon: selectionIndicatorForm().icon,
                selected: true,
                disabled: selectionIndicatorForm().disabled,
                closable: selectionIndicatorForm().closable,
              }"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [showSelectionIndicator]="true"
              indicatorPosition="vertical"
              [asButton]="selectionIndicatorForm().asButton"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [draggable]="selectionIndicatorForm().draggable"
              [dropZone]="selectionIndicatorForm().dropZone"
            />
            <ui-node
              [node]="{
                id: 'indicator-v-normal',
                label: 'Vertical Normal',
                icon: selectionIndicatorForm().icon,
                selected: false,
                disabled: selectionIndicatorForm().disabled,
                closable: selectionIndicatorForm().closable,
              }"
              [variant]="selectionIndicatorForm().variant"
              [appearance]="selectionIndicatorForm().appearance"
              [size]="selectionIndicatorForm().size"
              [shape]="selectionIndicatorForm().shape"
              [showSelectionIndicator]="true"
              indicatorPosition="vertical"
              [asButton]="selectionIndicatorForm().asButton"
              [selectOnClick]="selectionIndicatorForm().selectOnClick"
              [draggable]="selectionIndicatorForm().draggable"
              [dropZone]="selectionIndicatorForm().dropZone"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Core states include normal, selected, disabled, and closable. Use them to represent focus, selection, availability, and removable entities."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <ui-node
                [node]="{
                  id: 'state-' + state.id,
                  label: state.label,
                  icon: statesForm().icon,
                  selected: state.selected,
                  disabled: state.disabled,
                  closable: state.closable,
                }"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [showSelectionIndicator]="statesForm().showSelectionIndicator"
                [indicatorPosition]="statesForm().indicatorPosition"
                [asButton]="statesForm().asButton"
                [selectOnClick]="statesForm().selectOnClick"
                [draggable]="statesForm().draggable"
                [dropZone]="statesForm().dropZone"
                (nodeClose)="onNodeClose($event)"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Quick Actions"
          sectionDescription="Quick actions let you attach contextual menus to each node. This pattern is useful for file explorers and content trees."
          [formConfig]="quickActionsDrawerFormConfig"
          [formValues]="quickActionsFormValues()"
          (formValuesChange)="quickActionsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (node of quickActionNodes(); track node.id) {
              <ui-node
                [node]="{
                  id: node.id,
                  label: node.label,
                  icon: node.icon,
                  selected: node.selected,
                  disabled: quickActionsForm().disabled,
                }"
                [variant]="quickActionsForm().variant"
                [appearance]="quickActionsForm().appearance"
                [size]="quickActionsForm().size"
                [shape]="quickActionsForm().shape"
                [showSelectionIndicator]="quickActionsForm().showSelectionIndicator"
                [indicatorPosition]="quickActionsForm().indicatorPosition"
                [showQuickActions]="true"
                [quickActionsTemplate]="quickActionsMenu"
                (nodeClick)="onNodeClick($event)"
              />
            }
          </div>

          <ng-template #quickActionsMenu let-node>
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="getNodeMenuItems(node)"
              icon="more_horizontal"
              size="small"
              [ariaLabel]="'Node actions'"
              (menuItemClick)="onMenuAction($event, node)"
            />
          </ng-template>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Log</h2>
          <div class="showcase__log">
            @if (eventLog().length === 0) {
              <p class="showcase__log__empty">No events yet. Interact with nodes above.</p>
            }
            @for (event of eventLog(); track $index) {
              <div class="showcase__log__item">
                <span class="showcase__log__time">{{ event.time }}</span>
                <span class="showcase__log__message">{{ event.message }}</span>
              </div>
            }
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all node options in real time. Change content, appearance, layout,
            state, and behavior settings. Node events are logged in the built-in event panel.
          </p>
          <app-node-interactive />
        </section>
      </div>
    </div>
  `,
})
export class NodeShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;

  overviewDrawerFormConfig = NODE_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = NODE_DRAWER_CONFIGS.appearanceVariant;
  sizeDrawerFormConfig = NODE_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = NODE_DRAWER_CONFIGS.shape;
  selectionIndicatorDrawerFormConfig = NODE_DRAWER_CONFIGS.selectionIndicator;
  statesDrawerFormConfig = NODE_DRAWER_CONFIGS.states;
  quickActionsDrawerFormConfig = NODE_DRAWER_CONFIGS.quickActions;

  statePresets = [
    { id: 'normal', label: 'Normal', selected: false, disabled: false, closable: false },
    { id: 'selected', label: 'Selected', selected: true, disabled: false, closable: false },
    { id: 'disabled', label: 'Disabled', selected: false, disabled: true, closable: false },
    { id: 'closable', label: 'Closable', selected: false, disabled: false, closable: true },
  ];

  quickActionNodes = signal<Node[]>([
    { id: 'file-1', label: 'Project.docx', icon: 'document' },
    { id: 'file-2', label: 'Report.xlsx', icon: 'document' },
    { id: 'folder-1', label: 'Assets', icon: 'folder', selected: true },
  ]);

  eventLog = signal<Array<{ time: string; message: string }>>([]);

  overviewFormValues = signal<Record<string, unknown>>({
    icon: 'folder',
    closable: false,
    selected: false,
    disabled: false,
    size: 'medium',
    shape: 'rounded',
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  overviewForm = computed(() => this.toNodeOptions(this.overviewFormValues()));

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    icon: 'folder',
    closable: false,
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  appearanceVariantForm = computed(() => this.toNodeOptions(this.appearanceVariantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    shape: 'rounded',
    icon: 'folder',
    closable: false,
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  sizeForm = computed(() => this.toNodeOptions(this.sizeFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    icon: 'folder',
    closable: false,
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  shapeForm = computed(() => this.toNodeOptions(this.shapeFormValues()));

  selectionIndicatorFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    icon: 'home',
    closable: false,
    disabled: false,
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  selectionIndicatorForm = computed(() => this.toNodeOptions(this.selectionIndicatorFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    icon: 'folder',
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    asButton: false,
    selectOnClick: true,
    draggable: false,
    dropZone: false,
  });

  statesForm = computed(() => this.toNodeOptions(this.statesFormValues()));

  quickActionsFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    showSelectionIndicator: true,
    indicatorPosition: 'horizontal',
  });

  quickActionsForm = computed(() => this.toNodeOptions(this.quickActionsFormValues()));

  getNodeMenuItems(_node: Node): MenuItem[] {
    return [
      { id: 'open', label: 'Open', icon: 'open', shortcut: 'Enter' },
      { id: 'rename', label: 'Rename', icon: 'rename', shortcut: 'F2' },
      { id: 'copy', label: 'Copy', icon: 'copy', shortcut: 'Ctrl+C' },
      { id: 'cut', label: 'Cut', icon: 'cut', shortcut: 'Ctrl+X' },
      { id: 'delete', label: 'Delete', icon: 'delete', shortcut: 'Del' },
    ];
  }

  onMenuAction(item: MenuItem, node: Node): void {
    this.log(`Menu action "${item.label}" on "${node.label}"`);
  }

  onNodeClick(node: Node): void {
    this.log(`Clicked: ${node.label}`);
  }

  onNodeClose(node: Node): void {
    this.log(`Closed: ${node.label}`);
  }

  private toNodeOptions(values: Record<string, unknown>) {
    return {
      variant: (values['variant'] as Variant) ?? 'primary',
      appearance: (values['appearance'] as Appearance) ?? 'subtle',
      size: (values['size'] as Size) ?? 'medium',
      shape: (values['shape'] as Shape) ?? 'rounded',
      icon: values['icon'] ? (values['icon'] as Node['icon']) : undefined,
      closable: !!values['closable'],
      selected: !!values['selected'],
      disabled: !!values['disabled'],
      showSelectionIndicator: !!values['showSelectionIndicator'],
      indicatorPosition: (values['indicatorPosition'] as Orientation) ?? 'vertical',
      asButton: !!values['asButton'],
      selectOnClick: values['selectOnClick'] !== false,
      draggable: !!values['draggable'],
      dropZone: !!values['dropZone'],
    };
  }

  private log(message: string): void {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    this.eventLog.update(log => [{ time, message }, ...log.slice(0, 9)]);
  }
}
