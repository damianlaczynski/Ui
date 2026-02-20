import { Component, computed, signal, viewChild } from '@angular/core';
import {
  Appearance,
  ChevronPosition,
  IconName,
  Orientation,
  Shape,
  Size,
  TreeNode,
  TreeNodeComponent,
  Variant,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TREE_NODE_SHOWCASE_CONFIG } from './tree-node.showcase.config';

@Component({
  selector: 'app-tree-node-interactive',
  imports: [TreeNodeComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-tree-node
          [node]="interactiveNode()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [showSelectionIndicator]="currentShowSelectionIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          [chevronPosition]="currentChevronPosition()"
          [chevronIconCollapsed]="currentChevronIconCollapsed()"
          [chevronIconExpanded]="currentChevronIconExpanded()"
          [asButton]="currentAsButton()"
          [expandOnClick]="currentExpandOnClick()"
          [selectOnClick]="currentSelectOnClick()"
          [draggable]="currentDraggable()"
          [dropZone]="currentDropZone()"
          (nodeClick)="onNodeClick($event)"
          (nodeToggle)="onNodeToggle($event)"
          (nodeSelect)="onNodeSelect($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class TreeNodeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TREE_NODE_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    label: 'Documents',
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

  interactiveNode = computed<TreeNode>(() => {
    const v = this.values();
    const hasChildren = !!v['hasChildren'];
    const selected = !!v['selected'];
    const disabled = !!v['disabled'];

    return {
      id: 'interactive',
      label: (v['label'] as string) || 'Documents',
      icon: (v['icon'] as IconName) || 'folder',
      hasChildren,
      selected,
      disabled,
      expanded: hasChildren,
      children: hasChildren
        ? [
            { id: 'interactive-1', label: 'File 1.pdf', icon: 'document', hasChildren: false },
            { id: 'interactive-2', label: 'File 2.docx', icon: 'document', hasChildren: false },
            {
              id: 'interactive-3',
              label: 'Subfolder',
              icon: 'folder',
              hasChildren: true,
              children: [
                {
                  id: 'interactive-3-1',
                  label: 'Nested File.txt',
                  icon: 'document',
                  hasChildren: false,
                },
              ],
            },
          ]
        : undefined,
    };
  });

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentChevronIconCollapsed = computed(() => this.values()['chevronIconCollapsed'] as IconName);
  currentChevronIconExpanded = computed(() => this.values()['chevronIconExpanded'] as IconName);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentExpandOnClick = computed(() => this.values()['expandOnClick'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.showcase()?.logEvent('reset');
  }

  onNodeClick(node: TreeNode): void {
    this.showcase()?.logEvent('nodeClick', { id: node.id, label: node.label });
  }

  onNodeToggle(node: TreeNode): void {
    this.showcase()?.logEvent('nodeToggle', { id: node.id, expanded: node.expanded });
  }

  onNodeSelect(node: TreeNode): void {
    this.showcase()?.logEvent('nodeSelect', { id: node.id, selected: node.selected });
  }
}
