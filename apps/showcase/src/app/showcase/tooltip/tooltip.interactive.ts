import { Component, computed, signal } from '@angular/core';
import { ButtonComponent, TooltipDirective, TooltipPosition, TooltipSize } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TOOLTIP_SHOWCASE_CONFIG } from './tooltip.showcase.config';

@Component({
  selector: 'app-tooltip-interactive',
  imports: [TooltipDirective, ButtonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-button
          variant="primary"
          [uiTooltip]="currentText()"
          [uiTooltipPosition]="currentPosition()"
          [uiTooltipSize]="currentSize()"
          [uiTooltipDisabled]="currentDisabled()"
          [uiTooltipDelay]="currentDelay()"
        >
          Hover me
        </ui-button>
      </div>
    </app-interactive-showcase>
  `,
})
export class TooltipInteractiveComponent {
  showcaseConfig: ShowcaseConfig = TOOLTIP_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    uiTooltip: 'This is a helpful tooltip',
    uiTooltipPosition: 'top',
    uiTooltipSize: 'medium',
    uiTooltipDisabled: false,
    uiTooltipDelay: 300,
  });

  currentText = computed(() => this.values()['uiTooltip'] as string);
  currentPosition = computed(() => this.values()['uiTooltipPosition'] as TooltipPosition);
  currentSize = computed(() => this.values()['uiTooltipSize'] as TooltipSize);
  currentDisabled = computed(() => !!this.values()['uiTooltipDisabled']);
  currentDelay = computed(() => this.values()['uiTooltipDelay'] as number);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
