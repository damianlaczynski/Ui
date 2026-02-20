import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterComponent, SplitterPanelDirective, SplitterPanel, SplitterResizeEvent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import { ShowcaseDemoCardComponent } from '@shared/components/showcase-demo-card';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SPLITTER_SHOWCASE_CONFIG } from './splitter.showcase.config';
import type { Orientation } from 'ui';

@Component({
  selector: 'app-splitter-interactive',
  imports: [
    CommonModule,
    SplitterComponent,
    SplitterPanelDirective,
    InteractiveShowcaseComponent,
    ShowcaseDemoCardComponent,
  ],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview [style.height]="'400px'">
        <ui-splitter
          [orientation]="currentOrientation()"
          [gutterSize]="currentGutterSize()"
          [panels]="interactivePanels()"
          (panelResize)="onInteractivePanelResize($event)"
        >
          <ng-template uiSplitterPanel="panel-1">
            <div class="splitter-panel-content">
              <app-showcase-demo-card
                title="Panel 1"
                subtitle="Interactive panel"
                badge="Live"
                appearance="outline"
              >
                <p>Resizable panel with interactive controls.</p>
                <p class="splitter-panel-stat">
                  Current size: {{ interactivePanelSizes()[0] | number: '1.0-1' }}%
                </p>
              </app-showcase-demo-card>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="panel-2">
            <div class="splitter-panel-content">
              <app-showcase-demo-card
                title="Panel 2"
                subtitle="Center panel"
                badge="Live"
                appearance="filled-alternative"
              >
                <p>Middle panel.</p>
                <p class="splitter-panel-stat">
                  Current size: {{ interactivePanelSizes()[1] | number: '1.0-1' }}%
                </p>
              </app-showcase-demo-card>
            </div>
          </ng-template>

          <ng-template uiSplitterPanel="panel-3">
            <div class="splitter-panel-content">
              <app-showcase-demo-card
                title="Panel 3"
                subtitle="End panel"
                badge="Live"
                appearance="outline"
              >
                <p>Right or bottom panel depending on orientation.</p>
                <p class="splitter-panel-stat">
                  Current size: {{ interactivePanelSizes()[2] | number: '1.0-1' }}%
                </p>
              </app-showcase-demo-card>
            </div>
          </ng-template>
        </ui-splitter>
      </div>
    </app-interactive-showcase>
  `,
})
export class SplitterInteractiveComponent {
  showcaseConfig: ShowcaseConfig = SPLITTER_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    gutterSize: 6,
  });

  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentGutterSize = computed(() => this.values()['gutterSize'] as number);

  interactivePanels = signal<SplitterPanel[]>([
    { id: 'panel-1', size: 30, minSize: 200 },
    { id: 'panel-2', size: 40 },
    { id: 'panel-3', size: 30, maxSize: 400 },
  ]);

  interactivePanelSizes = signal<number[]>([30, 40, 30]);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.interactivePanelSizes.set([30, 40, 30]);
  }

  onInteractivePanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.interactivePanelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.interactivePanelSizes.set(sizes);
  }
}
