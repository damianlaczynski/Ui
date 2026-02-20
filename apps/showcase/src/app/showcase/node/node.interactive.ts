import { Component, computed, signal, viewChild } from '@angular/core';
import { Appearance, IconName, Node, NodeComponent, Orientation, Shape, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { NODE_SHOWCASE_CONFIG } from './node.showcase.config';

@Component({
  selector: 'app-node-interactive',
  imports: [NodeComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-node
          [node]="interactiveNode()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [showSelectionIndicator]="currentShowSelectionIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          [asButton]="currentAsButton()"
          [selectOnClick]="currentSelectOnClick()"
          [draggable]="currentDraggable()"
          [dropZone]="currentDropZone()"
          (nodeClick)="onNodeClick($event)"
          (nodeSelect)="onNodeSelect($event)"
          (nodeClose)="onNodeClose($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class NodeInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = NODE_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    label: 'Documents',
    icon: 'folder',
    closable: false,
    variant: 'primary',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    asButton: false,
    selectOnClick: true,
    selected: false,
    disabled: false,
    showSelectionIndicator: false,
    indicatorPosition: 'vertical',
    draggable: false,
    dropZone: false,
  });

  interactiveNode = computed<Node>(() => {
    const v = this.values();
    const icon = v['icon'] ? (v['icon'] as IconName) : undefined;
    return {
      id: 'interactive',
      label: v['label'] as string,
      icon,
      closable: !!v['closable'],
      selected: !!v['selected'],
      disabled: !!v['disabled'],
    };
  });

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentShowSelectionIndicator = computed(
    () => this.values()['showSelectionIndicator'] as boolean,
  );
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentAsButton = computed(() => this.values()['asButton'] as boolean);
  currentSelectOnClick = computed(() => this.values()['selectOnClick'] as boolean);
  currentDraggable = computed(() => this.values()['draggable'] as boolean);
  currentDropZone = computed(() => this.values()['dropZone'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onNodeClick(node: Node): void {
    this.showcase()?.logEvent('nodeClick', { id: node.id, label: node.label });
  }

  onNodeSelect(node: Node): void {
    this.showcase()?.logEvent('nodeSelect', { id: node.id, label: node.label });
  }

  onNodeClose(node: Node): void {
    this.showcase()?.logEvent('nodeClose', { id: node.id, label: node.label });
  }
}
