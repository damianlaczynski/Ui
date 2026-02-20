import { Component, signal, computed } from '@angular/core';
import { KbdComponent, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { KBD_SHOWCASE_CONFIG } from './kbd.showcase.config';

@Component({
  selector: 'app-kbd-interactive',
  standalone: true,
  imports: [KbdComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-kbd [text]="currentText()" [size]="currentSize()" [appearance]="currentAppearance()" />
      </div>
    </app-interactive-showcase>
  `,
})
export class KbdInteractiveComponent {
  showcaseConfig: ShowcaseConfig = KBD_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    text: 'Enter',
    size: 'medium',
    appearance: 'default',
  });

  currentText = computed(() => (this.values()['text'] as string) || 'Enter');
  currentSize = computed(() => (this.values()['size'] as Size) || 'medium');
  currentAppearance = computed(
    () => ((this.values()['appearance'] as string) || 'default') as 'default' | 'filled',
  );

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
