import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelComponent, ButtonComponent, TableOfContentComponent } from 'ui';
import {
  SCROLL_PANEL_ORIENTATIONS,
  SCROLL_PANEL_BEHAVIORS,
  SCROLL_PANEL_MAX_HEIGHTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ShowcaseDemoCardComponent } from '@shared/components/showcase-demo-card';
import { SCROLL_PANEL_DRAWER_CONFIGS } from './scroll-panel.showcase.config';
import { ScrollPanelInteractiveComponent } from './scroll-panel.interactive';
import type { ScrollPanelOrientation, ScrollPanelBehavior } from 'ui';

@Component({
  selector: 'app-scroll-panel-showcase',
  imports: [
    ScrollPanelComponent,
    ButtonComponent,
    TableOfContentComponent,
    CommonModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ShowcaseDemoCardComponent,
    ScrollPanelInteractiveComponent,
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
        <app-showcase-header title="ScrollPanel" />
        <p class="showcase__description">
          ScrollPanel provides a scrollable container with customizable scrollbars following the
          Fluent 2 Design System. It supports vertical, horizontal, and bidirectional scrolling with
          various scrollbar behaviors.
        </p>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Scroll direction: vertical (default), horizontal for wide content, or both for bidirectional scrolling. Use the Customize drawer to adjust scrollbar behavior and max height."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ orientation | titlecase }}</h3>
                <ui-scroll-panel
                  [orientation]="orientation"
                  [scrollbarBehavior]="orientationForm().scrollbarBehavior"
                  [maxHeight]="orientationForm().maxHeight"
                >
                  <div [class]="getOrientationContentClass(orientation)">
                    @for (item of items; track item.id) {
                      <div
                        class="scroll-panel-card-wrapper"
                        [class.scroll-panel-card-wrapper--horizontal]="orientation === 'horizontal'"
                      >
                        <app-showcase-demo-card
                          [title]="item.title"
                          [subtitle]="item.subtitle"
                          [badge]="orientation | titlecase"
                          appearance="outline"
                        >
                          @if (orientation !== 'horizontal') {
                            <p>{{ item.body }}</p>
                          }
                        </app-showcase-demo-card>
                      </div>
                    }
                  </div>
                </ui-scroll-panel>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Scrollbar Behavior"
          sectionDescription="When scrollbars are visible: auto (shows on hover), always (always visible), or never (hidden). Use the Customize drawer to adjust orientation and max height."
          [formConfig]="scrollbarBehaviorDrawerFormConfig"
          [formValues]="scrollbarBehaviorFormValues()"
          (formValuesChange)="scrollbarBehaviorFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (behavior of scrollbarBehaviors; track behavior) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ behavior | titlecase }}</h3>
                <ui-scroll-panel
                  [orientation]="scrollbarBehaviorForm().orientation"
                  [scrollbarBehavior]="behavior"
                  [maxHeight]="scrollbarBehaviorForm().maxHeight"
                >
                  <div class="scroll-panel-demo-content">
                    @for (item of shortItems; track item.id) {
                      <div class="scroll-panel-card-wrapper">
                        <app-showcase-demo-card
                          [title]="item.title"
                          subtitle="Compact row item"
                          [badge]="behavior | titlecase"
                          appearance="subtle"
                        />
                      </div>
                    }
                  </div>
                </ui-scroll-panel>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Dimensions"
          sectionDescription="Maximum height presets for the scroll area. Use the Customize drawer to adjust orientation and scrollbar behavior."
          [formConfig]="dimensionsDrawerFormConfig"
          [formValues]="dimensionsFormValues()"
          (formValuesChange)="dimensionsFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of maxHeightPresets; track preset.value) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-scroll-panel
                  [orientation]="dimensionsForm().orientation"
                  [scrollbarBehavior]="dimensionsForm().scrollbarBehavior"
                  [maxHeight]="preset.value"
                >
                  <div class="scroll-panel-demo-content scroll-panel-demo-content--vertical">
                    @for (item of items; track item.id) {
                      <div class="scroll-panel-card-wrapper">
                        <app-showcase-demo-card
                          [title]="item.title"
                          [subtitle]="item.subtitle"
                          [badge]="preset.label"
                          appearance="filled-alternative"
                        />
                      </div>
                    }
                  </div>
                </ui-scroll-panel>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Programmatic Scrolling</h2>
          <p class="showcase__section__description">
            Control scrolling programmatically using component methods.
          </p>
          <div class="showcase__example">
            <div class="scroll-panel-actions">
              <ui-button (click)="scrollToTop()" size="small">Scroll to Top</ui-button>
              <ui-button (click)="scrollToBottom()" size="small">Scroll to Bottom</ui-button>
            </div>
            <ui-scroll-panel #programmaticScroll maxHeight="400px">
              <div class="scroll-panel-demo-content scroll-panel-demo-content--vertical">
                @for (item of items; track item.id) {
                  <div class="scroll-panel-card-wrapper">
                    <app-showcase-demo-card
                      [title]="item.id + '. ' + item.title"
                      [subtitle]="item.subtitle"
                      appearance="outline"
                    />
                  </div>
                }
              </div>
            </ui-scroll-panel>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Scroll Events</h2>
          <p class="showcase__section__description">Listen to scroll and scrollEnd events.</p>
          <div class="showcase__example">
            <p class="scroll-panel-events-info">
              Scroll position: {{ scrollPosition }}px | Last scroll ended:
              {{ scrollEndCount }} times
            </p>
            <ui-scroll-panel
              (scroll)="onScroll($event)"
              (scrollEnd)="onScrollEnd()"
              maxHeight="400px"
            >
              <div class="scroll-panel-demo-content scroll-panel-demo-content--vertical">
                @for (item of items; track item.id) {
                  <div class="scroll-panel-card-wrapper">
                    <app-showcase-demo-card
                      [title]="item.title"
                      [subtitle]="item.subtitle"
                      appearance="outline"
                    />
                  </div>
                }
              </div>
            </ui-scroll-panel>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all ScrollPanel options in real time. Change orientation, scrollbar
            behavior, and max height. Scroll the content to see scroll and scrollEnd events in the
            event log.
          </p>
          <app-scroll-panel-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ScrollPanelShowcaseComponent {
  programmaticScroll = viewChild<ScrollPanelComponent>('programmaticScroll');

  scrollPosition = 0;
  scrollEndCount = 0;

  orientations = [...SCROLL_PANEL_ORIENTATIONS];
  scrollbarBehaviors = [...SCROLL_PANEL_BEHAVIORS];
  maxHeightPresets = [...SCROLL_PANEL_MAX_HEIGHTS];

  orientationDrawerFormConfig = SCROLL_PANEL_DRAWER_CONFIGS.orientation;
  scrollbarBehaviorDrawerFormConfig = SCROLL_PANEL_DRAWER_CONFIGS.scrollbarBehavior;
  dimensionsDrawerFormConfig = SCROLL_PANEL_DRAWER_CONFIGS.dimensions;

  items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: `Subtitle for item ${i + 1}`,
    body: `This is the body content for item ${i + 1}. It contains some descriptive text to demonstrate the scrolling behavior.`,
  }));

  shortItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Short Item ${i + 1}`,
  }));

  orientationFormValues = signal<Record<string, unknown>>({
    scrollbarBehavior: 'auto',
    maxHeight: '400px',
  });

  orientationForm = computed(() => {
    const v = this.orientationFormValues();
    return {
      scrollbarBehavior: v['scrollbarBehavior'] as ScrollPanelBehavior,
      maxHeight: v['maxHeight'] as string,
    };
  });

  scrollbarBehaviorFormValues = signal<Record<string, unknown>>({
    orientation: 'vertical',
    maxHeight: '200px',
  });

  scrollbarBehaviorForm = computed(() => {
    const v = this.scrollbarBehaviorFormValues();
    return {
      orientation: v['orientation'] as ScrollPanelOrientation,
      maxHeight: v['maxHeight'] as string,
    };
  });

  dimensionsFormValues = signal<Record<string, unknown>>({
    orientation: 'vertical',
    scrollbarBehavior: 'auto',
  });

  dimensionsForm = computed(() => {
    const v = this.dimensionsFormValues();
    return {
      orientation: v['orientation'] as ScrollPanelOrientation,
      scrollbarBehavior: v['scrollbarBehavior'] as ScrollPanelBehavior,
    };
  });

  getOrientationContentClass(orientation: string): string {
    const base = 'scroll-panel-demo-content';
    if (orientation === 'horizontal') {
      return `${base} scroll-panel-demo-content--horizontal`;
    }
    if (orientation === 'both') {
      return `${base} scroll-panel-demo-content--both`;
    }
    return `${base} scroll-panel-demo-content--vertical`;
  }

  scrollToTop(): void {
    this.programmaticScroll()?.scrollToTop();
  }

  scrollToBottom(): void {
    this.programmaticScroll()?.scrollToBottom();
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.scrollPosition = Math.round(target.scrollTop);
  }

  onScrollEnd(): void {
    this.scrollEndCount++;
  }
}
