import { Component, computed, signal, viewChild } from '@angular/core';
import { ContentPosition, ExtendedSize, SpinnerComponent, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SPINNER_SHOWCASE_CONFIG } from './spinner.showcase.config';

@Component({
  selector: 'app-spinner-interactive',
  imports: [SpinnerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-spinner
          [variant]="currentVariant()"
          [size]="currentSize()"
          [labelPosition]="currentLabelPosition()"
          [label]="currentLabel()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class SpinnerInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  private didInit = false;

  showcaseConfig: ShowcaseConfig = SPINNER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    label: 'Loading...',
    variant: 'primary',
    size: 'medium',
    labelPosition: 'below',
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentSize = computed(() => this.values()['size'] as ExtendedSize);
  currentLabelPosition = computed(() => this.values()['labelPosition'] as ContentPosition);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
    if (!this.didInit) {
      this.didInit = true;
      return;
    }
    this.showcase()?.logEvent('valuesChange', {
      label: this.currentLabel(),
      variant: this.currentVariant(),
      size: this.currentSize(),
      labelPosition: this.currentLabelPosition(),
    });
  }

  onReset(): void {
    this.showcase()?.logEvent('reset');
  }
}
