import { Component, signal, computed, viewChild } from '@angular/core';
import { Appearance, IconName, Shape, Size, TagComponent, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TAG_SHOWCASE_CONFIG } from './tag.showcase.config';

@Component({
  selector: 'app-tag-interactive',
  imports: [TagComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-tag
          [text]="currentText()"
          [secondaryText]="currentSecondaryText()"
          [icon]="currentIcon()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [dismissible]="currentDismissible()"
          [selected]="selectedModel()"
          (selectedChange)="selectedModel.set($event)"
          [disabled]="currentDisabled()"
          [selectable]="currentSelectable()"
          (tagClick)="onTagClick()"
          (dismiss)="onDismiss()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class TagInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TAG_SHOWCASE_CONFIG;

  selectedModel = signal(false);
  private values = signal<Record<string, unknown>>({
    text: 'Tag',
    secondaryText: '',
    icon: '',
    variant: 'primary',
    appearance: 'tint',
    size: 'medium',
    shape: 'rounded',
    dismissible: false,
    selected: false,
    disabled: false,
    selectable: false,
  });

  currentText = computed(() => this.values()['text'] as string);
  currentSecondaryText = computed(() => {
    const t = this.values()['secondaryText'] as string;
    return t || undefined;
  });
  currentIcon = computed(() => {
    const icon = this.values()['icon'];
    return icon ? (icon as IconName) : undefined;
  });
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentDismissible = computed(() => this.values()['dismissible'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelectable = computed(() => this.values()['selectable'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    if ('selected' in newValues) {
      this.selectedModel.set(newValues['selected'] as boolean);
    }
  }

  onReset(): void {}

  onTagClick(): void {
    this.showcase()?.logEvent('tagClick', { text: this.currentText() });
  }

  onDismiss(): void {
    this.showcase()?.logEvent('dismiss', { text: this.currentText() });
  }
}
