import { Component, computed, signal, viewChild } from '@angular/core';
import {
  Appearance,
  ChevronPosition,
  Orientation,
  Shape,
  Size,
  TreeComponent,
  TreeNode,
  Variant,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TREE_SHOWCASE_CONFIG } from './tree.showcase.config';

@Component({
  selector: 'app-tree-interactive',
  imports: [TreeComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-tree
          [nodes]="interactiveTree()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [showSelectionIndicator]="currentShowSelectionIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          [chevronPosition]="currentChevronPosition()"
          [asButton]="currentAsButton()"
          [expandOnClick]="currentExpandOnClick()"
          [selectOnClick]="currentSelectOnClick()"
          [draggable]="currentDraggable()"
          [dropZone]="currentDropZone()"
          (nodeClick)="onNodeClick($event)"
          (nodeToggle)="onNodeToggle($event)"
          (nodeSelect)="onNodeSelect($event)"
          (nodeMoved)="onNodeMoved($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class TreeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TREE_SHOWCASE_CONFIG;

  interactiveTree = signal<TreeNode[]>(this.createInteractiveTree());

  private values = signal<Record<string, unknown>>({
    variant: 'primary',
    appearance: 'subtle',
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

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentExpandOnClick = computed(() => this.values()['expandOnClick'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.interactiveTree.set(this.createInteractiveTree());
  }

  onNodeClick(node: TreeNode): void {
    this.showcase()?.logEvent('nodeClick', { id: node.id, label: node.label });
  }

  onNodeToggle(node: TreeNode): void {
    this.showcase()?.logEvent('nodeToggle', { label: node.label, expanded: node.expanded });
  }

  onNodeSelect(node: TreeNode): void {
    this.showcase()?.logEvent('nodeSelect', { id: node.id, label: node.label });
  }

  onNodeMoved(event: { node: TreeNode; target: TreeNode; position: string }): void {
    this.showcase()?.logEvent('nodeMoved', {
      node: event.node.label,
      target: event.target.label,
      position: event.position,
    });
  }

  private createInteractiveTree(): TreeNode[] {
    return [
      {
        id: 'int-1',
        label: 'Documents',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'int-1-1', label: 'Report.pdf', icon: 'document', hasChildren: false },
          { id: 'int-1-2', label: 'Notes.txt', icon: 'document', hasChildren: false },
          {
            id: 'int-1-3',
            label: 'Projects',
            icon: 'folder',
            hasChildren: true,
            expanded: false,
            children: [
              { id: 'int-1-3-1', label: 'Project A', icon: 'document', hasChildren: false },
              { id: 'int-1-3-2', label: 'Project B', icon: 'document', hasChildren: false },
            ],
          },
        ],
      },
      {
        id: 'int-2',
        label: 'Images',
        icon: 'image',
        hasChildren: true,
        expanded: false,
        children: [
          { id: 'int-2-1', label: 'Photo1.jpg', icon: 'image', hasChildren: false },
          { id: 'int-2-2', label: 'Photo2.jpg', icon: 'image', hasChildren: false },
        ],
      },
      { id: 'int-3', label: 'Settings', icon: 'settings', hasChildren: false },
    ];
  }
}
