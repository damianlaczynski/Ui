import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterComponent, SplitterPanelDirective, SplitterPanel, SplitterResizeEvent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ShowcaseDemoCardComponent } from '@shared/components/showcase-demo-card';
import { SplitterInteractiveComponent } from './splitter.interactive';

@Component({
  selector: 'app-splitter-showcase',
  imports: [
    CommonModule,
    SplitterComponent,
    SplitterPanelDirective,
    TableOfContentComponent,
    ShowcaseHeaderComponent,
    ShowcaseDemoCardComponent,
    SplitterInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="Splitter" />
        <p class="showcase__description">
          Resizable panel component following Fluent 2 Design System. Supports horizontal and
          vertical orientation, configurable gutter size, and nested layouts. Panels can have min
          and max size constraints. Use for split views, resizable sidebars, or complex layouts.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Horizontal Splitter</h2>
          <p class="showcase__section__description">
            Resize panels by dragging the gutter between them. Use keyboard arrows for precise
            control.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 400px;">
                <ui-splitter
                  [panels]="horizontalPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                  (panelResize)="onPanelResize($event)"
                >
                  <ng-template uiSplitterPanel="panel-1">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Panel 1"
                        subtitle="Left panel with min width 200px"
                        badge="Horizontal"
                        appearance="outline"
                      >
                        <p>Resize using gutter drag or keyboard (Tab + Arrow keys).</p>
                        <p class="splitter-panel-stat">
                          Current size: {{ panelSizes()[0] | number: '1.0-1' }}%
                        </p>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>

                  <ng-template uiSplitterPanel="panel-2">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Panel 2"
                        subtitle="Flexible middle panel"
                        badge="Resizable"
                        appearance="filled-alternative"
                      >
                        <p>This panel has no min/max constraints.</p>
                        <p class="splitter-panel-stat">
                          Current size: {{ panelSizes()[1] | number: '1.0-1' }}%
                        </p>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>

                  <ng-template uiSplitterPanel="panel-3">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Panel 3"
                        subtitle="Right panel with max width 400px"
                        badge="Constrained"
                        appearance="outline"
                      >
                        <p>Useful for side panels that should not grow too wide.</p>
                        <p class="splitter-panel-stat">
                          Current size: {{ panelSizes()[2] | number: '1.0-1' }}%
                        </p>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Vertical Splitter</h2>
          <p class="showcase__section__description">Splitter can also be oriented vertically.</p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="verticalPanels()"
                  orientation="vertical"
                  [gutterSize]="8"
                  (panelResize)="onVerticalPanelResize($event)"
                >
                  <ng-template uiSplitterPanel="top-panel">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Top Panel"
                        subtitle="Upper region"
                        badge="Vertical"
                        appearance="outline"
                      >
                        <p>Ideal for headers, filters, or summary widgets.</p>
                        <p class="splitter-panel-stat">
                          Current size: {{ verticalPanelSizes()[0] | number: '1.0-1' }}%
                        </p>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>

                  <ng-template uiSplitterPanel="bottom-panel">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Bottom Panel"
                        subtitle="Lower region with min height 150px"
                        badge="Vertical"
                        appearance="filled-alternative"
                      >
                        <p>Keeps enough space for content-heavy sections.</p>
                        <p class="splitter-panel-stat">
                          Current size: {{ verticalPanelSizes()[1] | number: '1.0-1' }}%
                        </p>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Nested Splitter</h2>
          <p class="showcase__section__description">
            Splitters can be nested to create complex layouts.
          </p>
          <div class="showcase__grid">
            <div class="showcase__item">
              <div class="showcase__example" style="height: 500px;">
                <ui-splitter
                  [panels]="nestedOuterPanels()"
                  orientation="horizontal"
                  [gutterSize]="6"
                >
                  <ng-template uiSplitterPanel="left">
                    <div class="splitter-panel-content">
                      <app-showcase-demo-card
                        title="Sidebar"
                        subtitle="Min 150px / max 300px"
                        badge="Navigation"
                        appearance="outline"
                      >
                        <ul class="splitter-panel-list">
                          <li>Navigation Item 1</li>
                          <li>Navigation Item 2</li>
                          <li>Navigation Item 3</li>
                          <li>Navigation Item 4</li>
                        </ul>
                      </app-showcase-demo-card>
                    </div>
                  </ng-template>

                  <ng-template uiSplitterPanel="main">
                    <div class="splitter-panel-content splitter-panel-content--flush">
                      <ui-splitter
                        [panels]="nestedInnerPanels()"
                        orientation="vertical"
                        [gutterSize]="6"
                      >
                        <ng-template uiSplitterPanel="header">
                          <div class="splitter-panel-content">
                            <app-showcase-demo-card
                              title="Header"
                              subtitle="Minimum height 100px"
                              badge="Nested"
                              appearance="outline"
                            >
                              <p>Place summary controls or quick actions here.</p>
                            </app-showcase-demo-card>
                          </div>
                        </ng-template>

                        <ng-template uiSplitterPanel="content">
                          <div class="splitter-panel-content">
                            <app-showcase-demo-card
                              title="Main Content"
                              subtitle="Flexible center panel"
                              badge="Nested"
                              appearance="filled-alternative"
                            >
                              <p>This area expands to fill remaining vertical space.</p>
                              <p>Perfect for editors, tables, or dashboards.</p>
                            </app-showcase-demo-card>
                          </div>
                        </ng-template>

                        <ng-template uiSplitterPanel="footer">
                          <div class="splitter-panel-content">
                            <app-showcase-demo-card
                              title="Footer"
                              subtitle="Min 80px / max 150px"
                              badge="Nested"
                              appearance="outline"
                            >
                              <p>Use this zone for status info and secondary controls.</p>
                            </app-showcase-demo-card>
                          </div>
                        </ng-template>
                      </ui-splitter>
                    </div>
                  </ng-template>
                </ui-splitter>
              </div>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with orientation and gutter size in real time. Resize panels by dragging the
            gutter or using keyboard navigation.
          </p>
          <app-splitter-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SplitterShowcaseComponent {
  horizontalPanels = signal<SplitterPanel[]>([
    { id: 'panel-1', size: 30, minSize: 200 },
    { id: 'panel-2', size: 40 },
    { id: 'panel-3', size: 30, maxSize: 400 },
  ]);

  panelSizes = signal<number[]>([30, 40, 30]);

  verticalPanels = signal<SplitterPanel[]>([
    { id: 'top-panel', size: 60, minSize: 150 },
    { id: 'bottom-panel', size: 40, minSize: 150 },
  ]);

  verticalPanelSizes = signal<number[]>([60, 40]);

  nestedOuterPanels = signal<SplitterPanel[]>([
    { id: 'left', size: 20 },
    { id: 'main', size: 80 },
  ]);

  nestedInnerPanels = signal<SplitterPanel[]>([
    { id: 'header', size: 20, resizable: true },
    { id: 'content', size: 60, resizable: true },
    { id: 'footer', size: 20, resizable: true },
  ]);

  onPanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.panelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.panelSizes.set(sizes);
  }

  onVerticalPanelResize(event: SplitterResizeEvent): void {
    const sizes = [...this.verticalPanelSizes()];
    sizes[event.panelIndex] = event.newSize;
    this.verticalPanelSizes.set(sizes);
  }
}
