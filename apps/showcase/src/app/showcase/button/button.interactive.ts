import { Component, signal, computed, viewChild } from '@angular/core';
import { Appearance, ButtonComponent, IconName, Shape, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { BUTTON_SHOWCASE_CONFIG } from './button.showcase.config';

@Component({
  selector: 'app-button-interactive',
  imports: [ButtonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-button
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [icon]="currentIcon()"
          [text]="currentText() || undefined"
          [disabled]="currentDisabled()"
          [loading]="currentLoading()"
          [selected]="selectedModel()"
          (selectedChange)="selectedModel.set($event)"
          [selectable]="currentSelectable()"
          [fullWidth]="currentFullWidth()"
          (click)="onButtonClick()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class ButtonInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = BUTTON_SHOWCASE_CONFIG;

  selectedModel = signal(false);
  private values = signal<Record<string, unknown>>({
    text: 'Button',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    icon: '',
    disabled: false,
    selectable: false,
    selected: false,
    loading: false,
    fullWidth: false,
  });

  currentText = computed(() => this.values()['text'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentIcon = computed(() => {
    const icon = this.values()['icon'];
    return icon ? (icon as IconName) : undefined;
  });
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentSelectable = computed(() => this.values()['selectable'] as boolean);
  currentLoading = computed(() => this.values()['loading'] as boolean);
  currentFullWidth = computed(() => this.values()['fullWidth'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    if ('selected' in newValues) {
      this.selectedModel.set(newValues['selected'] as boolean);
    }
  }

  onReset(): void {}

  onButtonClick(): void {
    this.showcase()?.logEvent('click', { text: this.currentText() });
  }
}
