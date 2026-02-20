import { Component, signal, computed, viewChild } from '@angular/core';
import {
  AccordionComponent,
  Appearance,
  ChevronPosition,
  IconName,
  Orientation,
  Shape,
  Size,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { ACCORDION_SHOWCASE_CONFIG } from './accordion.showcase.config';

@Component({
  selector: 'app-accordion-interactive',
  imports: [AccordionComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-accordion
          [label]="currentLabel()"
          [size]="currentSize()"
          [appearance]="currentAppearance()"
          [shape]="currentShape()"
          [chevronPosition]="currentChevronPosition()"
          [icon]="currentIcon()"
          [showSelectionIndicator]="currentShowIndicator()"
          [indicatorPosition]="currentIndicatorPosition()"
          [disabled]="currentDisabled()"
          (toggle)="onToggle($event)"
        >
          <p>Content inside the interactive accordion.</p>
          <p>Customize all properties using the controls above.</p>
        </ui-accordion>
      </div>
    </app-interactive-showcase>
  `,
})
export class AccordionInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = ACCORDION_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    label: 'Interactive Accordion',
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    chevronPosition: 'before',
    icon: '',
    showIndicator: false,
    indicatorPosition: 'vertical',
    disabled: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentSize = computed(() => this.values()['size'] as Size);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentChevronPosition = computed(() => this.values()['chevronPosition'] as ChevronPosition);
  currentIcon = computed(() => {
    const icon = this.values()['icon'];
    return icon ? (icon as IconName) : undefined;
  });
  currentShowIndicator = computed(() => this.values()['showIndicator'] as boolean);
  currentIndicatorPosition = computed(() => this.values()['indicatorPosition'] as Orientation);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onToggle(expanded: boolean): void {
    this.showcase()?.logEvent('toggle', { expanded });
  }
}
