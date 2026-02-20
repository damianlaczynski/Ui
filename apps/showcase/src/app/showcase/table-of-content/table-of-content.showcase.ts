import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  APPEARANCES,
  ORIENTATIONS,
  SHAPES,
  SIZES,
} from '@shared/utils/showcase/component-options.utils';
import { TABLE_OF_CONTENT_DRAWER_CONFIGS } from './table-of-content.showcase.config';
import { TableOfContentInteractiveComponent } from './table-of-content.interactive';
import type { Appearance, Orientation, Shape, Size } from 'ui';

@Component({
  selector: 'app-table-of-content-showcase',
  imports: [
    CommonModule,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentInteractiveComponent,
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
        <app-showcase-header title="Table of Content" />
        <p class="showcase__description">
          Table of Content automatically maps headings inside a target container and renders
          hierarchical in-page navigation. It supports size, appearance, shape, active selection
          indicators, sticky positioning, and heading-level filtering.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Overview</h2>
          <p class="showcase__section__description">
            Default behavior: hierarchical heading detection, automatic active section tracking, and
            smooth navigation.
          </p>
          <div class="showcase__grid showcase__grid--two-columns">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Default Table of Content</h3>
              <ui-table-of-content containerSelector=".toc-overview-content" />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Documentation Content</h3>
              <div class="showcase__example toc-overview-content">
                <h1 id="toc-overview-introduction">Introduction</h1>
                <p>Table of Content scans headings and builds a navigation tree.</p>
                <h2 id="toc-overview-getting-started">Getting Started</h2>
                <p>Import the component and point it to the correct content container.</p>
                <h3 id="toc-overview-installation">Installation</h3>
                <p>Install package dependencies and include styles.</p>
                <h3 id="toc-overview-configuration">Configuration</h3>
                <p>Set size, appearance, sticky mode, and heading range.</p>
                <h2 id="toc-overview-usage">Usage</h2>
                <p>Use semantic heading levels to build clear structure.</p>
              </div>
            </div>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Use the Customize drawer to change shared style, indicator, behavior, and heading filters."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-table-of-content
                  [size]="size"
                  [appearance]="sizeForm().appearance"
                  [shape]="sizeForm().shape"
                  [showSelectionIndicator]="sizeForm().showSelectionIndicator"
                  [indicatorPosition]="sizeForm().indicatorPosition"
                  [sticky]="sizeForm().sticky"
                  [offsetTop]="sizeForm().offsetTop"
                  [minLevel]="sizeForm().minLevel"
                  [maxLevel]="sizeForm().maxLevel"
                  [containerSelector]="getSizeContainerSelector(size)"
                />
                <div [class]="'showcase__example ' + getSizeContainerClass(size)">
                  <h1 [id]="'toc-size-' + size + '-overview'">Overview</h1>
                  <h2 [id]="'toc-size-' + size + '-features'">Features</h2>
                  <h3 [id]="'toc-size-' + size + '-styling'">Styling</h3>
                  <h2 [id]="'toc-size-' + size + '-usage'">Usage</h2>
                </div>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Shape"
          sectionDescription="Appearance controls visual emphasis, while shape adjusts corner radius of TOC items. Use the Customize drawer to change size, indicator, behavior, and heading filters."
          [formConfig]="appearanceShapeDrawerFormConfig"
          [formValues]="appearanceShapeFormValues()"
          (formValuesChange)="appearanceShapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ appearance | titlecase }}</h3>
                <ui-table-of-content
                  [size]="appearanceShapeForm().size"
                  [appearance]="appearance"
                  [shape]="appearanceShapeForm().shape"
                  [showSelectionIndicator]="appearanceShapeForm().showSelectionIndicator"
                  [indicatorPosition]="appearanceShapeForm().indicatorPosition"
                  [sticky]="appearanceShapeForm().sticky"
                  [offsetTop]="appearanceShapeForm().offsetTop"
                  [minLevel]="appearanceShapeForm().minLevel"
                  [maxLevel]="appearanceShapeForm().maxLevel"
                  [containerSelector]="getAppearanceContainerSelector(appearance)"
                />
                <div [class]="'showcase__example ' + getAppearanceContainerClass(appearance)">
                  <h1 [id]="'toc-appearance-' + appearance + '-overview'">Overview</h1>
                  <h2 [id]="'toc-appearance-' + appearance + '-api'">API</h2>
                  <h3 [id]="'toc-appearance-' + appearance + '-methods'">Methods</h3>
                  <h2 [id]="'toc-appearance-' + appearance + '-examples'">Examples</h2>
                </div>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Selection Indicator"
          sectionDescription="Selection indicator highlights the active section. Choose horizontal or vertical indicator position. Use the Customize drawer to control shared appearance, behavior, and heading range."
          [formConfig]="selectionIndicatorDrawerFormConfig"
          [formValues]="selectionIndicatorFormValues()"
          (formValuesChange)="selectionIndicatorFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (position of indicatorPositions; track position) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ position | titlecase }}</h3>
                <ui-table-of-content
                  [size]="selectionIndicatorForm().size"
                  [appearance]="selectionIndicatorForm().appearance"
                  [shape]="selectionIndicatorForm().shape"
                  [showSelectionIndicator]="true"
                  [indicatorPosition]="position"
                  [sticky]="selectionIndicatorForm().sticky"
                  [offsetTop]="selectionIndicatorForm().offsetTop"
                  [minLevel]="selectionIndicatorForm().minLevel"
                  [maxLevel]="selectionIndicatorForm().maxLevel"
                  [containerSelector]="getIndicatorContainerSelector(position)"
                />
                <div [class]="'showcase__example ' + getIndicatorContainerClass(position)">
                  <h1 [id]="'toc-indicator-' + position + '-intro'">Introduction</h1>
                  <h2 [id]="'toc-indicator-' + position + '-setup'">Setup</h2>
                  <h3 [id]="'toc-indicator-' + position + '-advanced'">Advanced</h3>
                  <h2 [id]="'toc-indicator-' + position + '-summary'">Summary</h2>
                </div>
              </div>
            }
            <div class="showcase__item">
              <h3 class="showcase__item__title">No Indicator</h3>
              <ui-table-of-content
                [size]="selectionIndicatorForm().size"
                [appearance]="selectionIndicatorForm().appearance"
                [shape]="selectionIndicatorForm().shape"
                [showSelectionIndicator]="false"
                [sticky]="selectionIndicatorForm().sticky"
                [offsetTop]="selectionIndicatorForm().offsetTop"
                [minLevel]="selectionIndicatorForm().minLevel"
                [maxLevel]="selectionIndicatorForm().maxLevel"
                containerSelector=".toc-indicator-none-content"
              />
              <div class="showcase__example toc-indicator-none-content">
                <h1 id="toc-indicator-none-intro">Introduction</h1>
                <h2 id="toc-indicator-none-setup">Setup</h2>
                <h3 id="toc-indicator-none-advanced">Advanced</h3>
                <h2 id="toc-indicator-none-summary">Summary</h2>
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Sticky & Offset"
          sectionDescription="Sticky mode keeps TOC visible while scrolling. Offset controls top spacing for fixed headers. Use the Customize drawer to change size, appearance, indicator, and heading range."
          [formConfig]="stickyOffsetDrawerFormConfig"
          [formValues]="stickyOffsetFormValues()"
          (formValuesChange)="stickyOffsetFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--two-columns">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Sticky Enabled</h3>
              <ui-table-of-content
                [size]="stickyOffsetForm().size"
                [appearance]="stickyOffsetForm().appearance"
                [shape]="stickyOffsetForm().shape"
                [showSelectionIndicator]="stickyOffsetForm().showSelectionIndicator"
                [indicatorPosition]="stickyOffsetForm().indicatorPosition"
                [sticky]="true"
                [offsetTop]="stickyOffsetForm().offsetTop"
                [minLevel]="stickyOffsetForm().minLevel"
                [maxLevel]="stickyOffsetForm().maxLevel"
                containerSelector=".toc-sticky-enabled-content"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Long Content</h3>
              <div class="showcase__example toc-sticky-enabled-content">
                <h1 id="toc-sticky-overview">Overview</h1>
                <p>Scroll inside page to observe active section updates.</p>
                <h2 id="toc-sticky-chapter-1">Chapter 1</h2>
                <p>Sticky TOC keeps context visible during reading.</p>
                <h2 id="toc-sticky-chapter-2">Chapter 2</h2>
                <p>Offset helps avoid overlapping fixed page headers.</p>
                <h2 id="toc-sticky-chapter-3">Chapter 3</h2>
                <p>Use heading levels to keep the list compact.</p>
                <h2 id="toc-sticky-chapter-4">Chapter 4</h2>
                <p>Finish with a summary section.</p>
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Heading Levels"
          sectionDescription="Filter TOC hierarchy by heading levels. Use the Customize drawer to tune visual style, indicator, and sticky settings."
          [formConfig]="headingLevelsDrawerFormConfig"
          [formValues]="headingLevelsFormValues()"
          (formValuesChange)="headingLevelsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--two-columns">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Level Filtering</h3>
              <ui-table-of-content
                [size]="headingLevelsForm().size"
                [appearance]="headingLevelsForm().appearance"
                [shape]="headingLevelsForm().shape"
                [showSelectionIndicator]="headingLevelsForm().showSelectionIndicator"
                [indicatorPosition]="headingLevelsForm().indicatorPosition"
                [sticky]="headingLevelsForm().sticky"
                [offsetTop]="headingLevelsForm().offsetTop"
                [minLevel]="headingLevelsForm().minLevel"
                [maxLevel]="headingLevelsForm().maxLevel"
                containerSelector=".toc-heading-levels-content"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Mixed Heading Depth</h3>
              <div class="showcase__example toc-heading-levels-content">
                <h1 id="toc-levels-h1">H1 Overview</h1>
                <p>Top-level chapter heading.</p>
                <h2 id="toc-levels-h2">H2 Section</h2>
                <p>Section heading used for major topics.</p>
                <h3 id="toc-levels-h3">H3 Subsection</h3>
                <p>Subsection heading for details.</p>
                <h4 id="toc-levels-h4">H4 Deep Topic</h4>
                <p>Deeply nested topic example.</p>
                <h5 id="toc-levels-h5">H5 Note</h5>
                <p>Optional extra depth.</p>
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all Table of Content options in real time. Change styling, indicator,
            sticky behavior, offset, and heading levels.
          </p>
          <app-table-of-content-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TableOfContentShowcaseComponent {
  sizes = SIZES;
  appearances = APPEARANCES;
  shapes = SHAPES;
  indicatorPositions = [...ORIENTATIONS];

  sizeDrawerFormConfig = TABLE_OF_CONTENT_DRAWER_CONFIGS.size;
  appearanceShapeDrawerFormConfig = TABLE_OF_CONTENT_DRAWER_CONFIGS.appearanceShape;
  selectionIndicatorDrawerFormConfig = TABLE_OF_CONTENT_DRAWER_CONFIGS.selectionIndicator;
  stickyOffsetDrawerFormConfig = TABLE_OF_CONTENT_DRAWER_CONFIGS.stickyOffset;
  headingLevelsDrawerFormConfig = TABLE_OF_CONTENT_DRAWER_CONFIGS.headingLevels;

  sizeFormValues = signal<Record<string, unknown>>({
    appearance: 'subtle',
    shape: 'rounded',
    showSelectionIndicator: true,
    indicatorPosition: 'vertical',
    sticky: false,
    offsetTop: 0,
    minLevel: 1,
    maxLevel: 4,
  });

  sizeForm = computed(() => this.mapTocOptions(this.sizeFormValues()));

  appearanceShapeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    showSelectionIndicator: true,
    indicatorPosition: 'vertical',
    sticky: false,
    offsetTop: 0,
    minLevel: 1,
    maxLevel: 4,
  });

  appearanceShapeForm = computed(() => this.mapTocOptions(this.appearanceShapeFormValues()));

  selectionIndicatorFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    sticky: false,
    offsetTop: 0,
    minLevel: 1,
    maxLevel: 4,
  });

  selectionIndicatorForm = computed(() => this.mapTocOptions(this.selectionIndicatorFormValues()));

  stickyOffsetFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    showSelectionIndicator: true,
    indicatorPosition: 'vertical',
    minLevel: 1,
    maxLevel: 4,
  });

  stickyOffsetForm = computed(() => this.mapTocOptions(this.stickyOffsetFormValues()));

  headingLevelsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    showSelectionIndicator: true,
    indicatorPosition: 'vertical',
    sticky: false,
    offsetTop: 0,
  });

  headingLevelsForm = computed(() => this.mapTocOptions(this.headingLevelsFormValues()));

  getSizeContainerClass(size: Size): string {
    return `toc-size-content-${size}`;
  }

  getSizeContainerSelector(size: Size): string {
    return `.${this.getSizeContainerClass(size)}`;
  }

  getAppearanceContainerClass(appearance: Appearance): string {
    return `toc-appearance-content-${appearance}`;
  }

  getAppearanceContainerSelector(appearance: Appearance): string {
    return `.${this.getAppearanceContainerClass(appearance)}`;
  }

  getIndicatorContainerClass(position: Orientation): string {
    return `toc-indicator-content-${position}`;
  }

  getIndicatorContainerSelector(position: Orientation): string {
    return `.${this.getIndicatorContainerClass(position)}`;
  }

  private mapTocOptions(values: Record<string, unknown>) {
    const minLevel = (values['minLevel'] as number) ?? 1;
    const maxLevel = (values['maxLevel'] as number) ?? 4;

    return {
      size: (values['size'] as Size) ?? 'medium',
      appearance: (values['appearance'] as Appearance) ?? 'subtle',
      shape: (values['shape'] as Shape) ?? 'rounded',
      showSelectionIndicator: (values['showSelectionIndicator'] as boolean) ?? true,
      indicatorPosition: (values['indicatorPosition'] as Orientation) ?? 'vertical',
      sticky: (values['sticky'] as boolean) ?? false,
      offsetTop: (values['offsetTop'] as number) ?? 0,
      minLevel: Math.min(minLevel, maxLevel),
      maxLevel: Math.max(minLevel, maxLevel),
    };
  }
}
