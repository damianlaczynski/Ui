import { Component, computed, signal } from '@angular/core';
import { Appearance, BadgeComponent, ContentPosition, IconName, Shape, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { BADGE_SHOWCASE_CONFIG } from './badge.showcase.config';

@Component({
  selector: 'app-badge-interactive',
  imports: [BadgeComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-badge
          [text]="currentText()"
          [ariaLabel]="currentAriaLabel()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [icon]="currentIcon()"
          [iconPosition]="currentIconPosition()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class BadgeInteractiveComponent {
  showcaseConfig: ShowcaseConfig = BADGE_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    text: 'Badge',
    ariaLabel: '',
    icon: '',
    iconPosition: 'before',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
  });

  currentText = computed(() => this.values()['text'] as string);
  currentAriaLabel = computed(() => this.values()['ariaLabel'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentIcon = computed(() => {
    const icon = this.values()['icon'];
    return icon ? (icon as IconName) : undefined;
  });
  currentIconPosition = computed(() => this.values()['iconPosition'] as ContentPosition);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
