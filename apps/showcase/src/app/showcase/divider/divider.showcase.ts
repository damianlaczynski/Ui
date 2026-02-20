import { Component, computed, signal } from '@angular/core';
import { Alignment, DividerComponent, Orientation, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ORIENTATIONS } from '@shared/utils/showcase/component-options.utils';
import { DividerInteractiveComponent } from './divider.interactive';
import { DIVIDER_DRAWER_CONFIGS } from './divider.showcase.config';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-divider-showcase',
  imports: [
    DividerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    DividerInteractiveComponent,
    TitleCasePipe,
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
        <app-showcase-header title="Divider" />
        <p class="showcase__description">
          Divider separates content into clear sections. It supports horizontal and vertical
          orientation, text alignment, and optional labels for visual and semantic grouping.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core divider examples with shared text options. Use the Customize drawer to toggle label visibility and text preset."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Horizontal</h3>
              <ui-divider
                orientation="horizontal"
                alignment="center"
                [text]="overviewForm().text"
                ariaLabel="Horizontal divider"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Vertical</h3>
              <div style="height: 100px;">
                <ui-divider
                  orientation="vertical"
                  alignment="center"
                  [text]="overviewForm().text"
                  ariaLabel="Vertical divider"
                />
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Without Text</h3>
              <ui-divider orientation="horizontal" alignment="center" />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Horizontal dividers split stacked content, while vertical dividers separate side-by-side areas."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ orientation | titlecase }}</h3>
                @if (orientation === 'vertical') {
                  <div style="height: 100px;">
                    <ui-divider
                      [orientation]="orientation"
                      [alignment]="orientationForm().alignment"
                      [text]="orientationForm().text"
                      ariaLabel="Divider example"
                    />
                  </div>
                } @else {
                  <ui-divider
                    [orientation]="orientation"
                    [alignment]="orientationForm().alignment"
                    [text]="orientationForm().text"
                    ariaLabel="Divider example"
                  />
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Alignment"
          sectionDescription="Alignment controls where label text is positioned: start, center, or end."
          [formConfig]="alignmentDrawerFormConfig"
          [formValues]="alignmentFormValues()"
          (formValuesChange)="alignmentFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (alignment of alignments; track alignment) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ alignment | titlecase }}</h3>
                @if (alignmentForm().orientation === 'vertical') {
                  <div style="height: 100px;">
                    <ui-divider
                      [orientation]="alignmentForm().orientation"
                      [alignment]="alignment"
                      [text]="alignmentForm().text"
                      ariaLabel="Aligned divider"
                    />
                  </div>
                } @else {
                  <ui-divider
                    [orientation]="alignmentForm().orientation"
                    [alignment]="alignment"
                    [text]="alignmentForm().text"
                    ariaLabel="Aligned divider"
                  />
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Content Patterns"
          sectionDescription="Common divider labels used in UI flows such as login alternatives and section grouping."
          [formConfig]="contentDrawerFormConfig"
          [formValues]="contentFormValues()"
          (formValuesChange)="contentFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (label of contentLabels; track label) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ label }}</h3>
                @if (contentForm().orientation === 'vertical') {
                  <div style="height: 100px;">
                    <ui-divider
                      [orientation]="contentForm().orientation"
                      [alignment]="contentForm().alignment"
                      [text]="label"
                      ariaLabel="Content divider"
                    />
                  </div>
                } @else {
                  <ui-divider
                    [orientation]="contentForm().orientation"
                    [alignment]="contentForm().alignment"
                    [text]="label"
                    ariaLabel="Content divider"
                  />
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with orientation, alignment, text, and aria label to inspect divider behavior
            and generated code.
          </p>
          <app-divider-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DividerShowcaseComponent {
  orientations: Orientation[] = [...ORIENTATIONS];
  alignments: Alignment[] = ['start', 'center', 'end'];
  contentLabels = ['OR', 'Section', 'Details'];

  overviewDrawerFormConfig = DIVIDER_DRAWER_CONFIGS.overview;
  orientationDrawerFormConfig = DIVIDER_DRAWER_CONFIGS.orientation;
  alignmentDrawerFormConfig = DIVIDER_DRAWER_CONFIGS.alignment;
  contentDrawerFormConfig = DIVIDER_DRAWER_CONFIGS.content;

  overviewFormValues = signal<Record<string, unknown>>({
    showText: true,
    textPreset: 'OR',
  });
  overviewForm = computed(() => this.toDividerTextForm(this.overviewFormValues()));

  orientationFormValues = signal<Record<string, unknown>>({
    alignment: 'center',
    showText: true,
    textPreset: 'OR',
  });
  orientationForm = computed(() => this.toDividerTextForm(this.orientationFormValues()));

  alignmentFormValues = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    showText: true,
    textPreset: 'OR',
  });
  alignmentForm = computed(() => this.toDividerTextForm(this.alignmentFormValues()));

  contentFormValues = signal<Record<string, unknown>>({
    orientation: 'horizontal',
    alignment: 'center',
  });
  contentForm = computed(() => this.toDividerTextForm(this.contentFormValues()));

  private toDividerTextForm(v: Record<string, unknown>): {
    orientation: Orientation;
    alignment: Alignment;
    text: string;
  } {
    const showText = (v['showText'] as boolean) ?? true;
    const textPreset = (v['textPreset'] as string) ?? 'OR';
    return {
      orientation: (v['orientation'] as Orientation) ?? 'horizontal',
      alignment: (v['alignment'] as Alignment) ?? 'center',
      text: showText ? textPreset : '',
    };
  }
}
