import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  ContentPosition,
  ExtendedSize,
  SpinnerComponent,
  TableOfContentComponent,
  Variant,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { CONTENT_POSITIONS, VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { SpinnerInteractiveComponent } from './spinner.interactive';
import { SPINNER_DRAWER_CONFIGS, SPINNER_SIZES } from './spinner.showcase.config';

@Component({
  selector: 'app-spinner-showcase',
  imports: [
    CommonModule,
    SpinnerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    SpinnerInteractiveComponent,
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
        <app-showcase-header title="Spinner" />
        <p class="showcase__description">
          Spinner component for loading states and ongoing actions. Supports semantic variants,
          extended sizes, and flexible label positioning for inline and centered patterns.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core spinner examples with shared options. Use the Customize drawer to adjust variant, size, and label position."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Current Selection</h3>
              <ui-spinner
                [variant]="overviewForm().variant"
                [size]="overviewForm().size"
                [labelPosition]="overviewForm().labelPosition"
                [label]="overviewForm().label"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">No Label</h3>
              <ui-spinner
                [variant]="overviewForm().variant"
                [size]="overviewForm().size"
                labelPosition="none"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Centered Block</h3>
              <div
                style="display: flex; justify-content: center; padding: 24px; border-radius: 8px; background: var(--color-neutral-background2-rest);"
              >
                <ui-spinner
                  [variant]="overviewForm().variant"
                  [size]="overviewForm().size"
                  labelPosition="below"
                  [label]="overviewForm().label"
                />
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Semantic variants for different statuses and contexts. Use the Customize drawer to adjust shared size and label position."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <ui-spinner
                  [variant]="variant"
                  [size]="variantForm().size"
                  [labelPosition]="variantForm().labelPosition"
                  [label]="variantForm().label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Extended size scale from extra-small to extra-large. Use the Customize drawer to adjust shared variant and label position."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-spinner
                  [variant]="sizeForm().variant"
                  [size]="size"
                  [labelPosition]="sizeForm().labelPosition"
                  [label]="sizeForm().label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Label Position"
          sectionDescription="Place labels before, after, above, or below the spinner. The none option hides the label for compact loading indicators."
          [formConfig]="labelPositionDrawerFormConfig"
          [formValues]="labelPositionFormValues()"
          (formValuesChange)="labelPositionFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (position of positions; track position) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ position | titlecase }}</h3>
                <ui-spinner
                  [variant]="labelPositionForm().variant"
                  [size]="labelPositionForm().size"
                  [labelPosition]="position"
                  [label]="labelPositionForm().label"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Usage Patterns"
          sectionDescription="Common product scenarios such as inline loading, save state, retry flow, and centered page loading."
          [formConfig]="usageDrawerFormConfig"
          [formValues]="usageFormValues()"
          (formValuesChange)="usageFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Inline Loading</h3>
              <div style="display: flex; align-items: center; gap: 8px;">
                <ui-spinner [size]="usageForm().size" variant="primary" />
                <span>Loading data...</span>
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Saving</h3>
              <div
                style="display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 4px; background: var(--color-shared-green-background);"
              >
                <ui-spinner [size]="usageForm().size" variant="success" />
                <span style="color: var(--color-shared-green-foreground);">Saving changes...</span>
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Retrying</h3>
              <div
                style="display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 4px; background: var(--color-shared-red-background);"
              >
                <ui-spinner [size]="usageForm().size" variant="danger" />
                <span style="color: var(--color-shared-red-foreground);">Retrying request...</span>
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Centered Content Load</h3>
              <div
                style="display: flex; justify-content: center; padding: 24px; border-radius: 8px; background: var(--color-neutral-background2-rest);"
              >
                <ui-spinner
                  [size]="usageForm().size"
                  variant="primary"
                  labelPosition="below"
                  label="Loading content..."
                />
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with spinner options in real time. Change variant, size, label, and label
            position to inspect behavior and generated code.
          </p>
          <app-spinner-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SpinnerShowcaseComponent {
  variants: Variant[] = [...VARIANTS];
  sizes: ExtendedSize[] = [...SPINNER_SIZES];
  positions: ContentPosition[] = [...CONTENT_POSITIONS];

  overviewDrawerFormConfig = SPINNER_DRAWER_CONFIGS.overview;
  variantDrawerFormConfig = SPINNER_DRAWER_CONFIGS.variant;
  sizeDrawerFormConfig = SPINNER_DRAWER_CONFIGS.size;
  labelPositionDrawerFormConfig = SPINNER_DRAWER_CONFIGS.labelPosition;
  usageDrawerFormConfig = SPINNER_DRAWER_CONFIGS.usage;

  overviewFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    labelPosition: 'below',
    label: 'Loading...',
  });

  overviewForm = computed(() => this.toSpinnerForm(this.overviewFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    labelPosition: 'below',
    label: 'Loading...',
  });

  variantForm = computed(() => this.toSpinnerForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    labelPosition: 'below',
    label: 'Loading...',
  });

  sizeForm = computed(() => this.toSpinnerForm(this.sizeFormValues()));

  labelPositionFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    label: 'Loading...',
  });

  labelPositionForm = computed(() => this.toSpinnerForm(this.labelPositionFormValues()));

  usageFormValues = signal<Record<string, unknown>>({
    size: 'medium',
  });

  usageForm = computed(() => this.toSpinnerForm(this.usageFormValues()));

  private toSpinnerForm(v: Record<string, unknown>): {
    variant: Variant;
    size: ExtendedSize;
    labelPosition: ContentPosition;
    label: string;
  } {
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      size: (v['size'] as ExtendedSize) ?? 'medium',
      labelPosition: (v['labelPosition'] as ContentPosition) ?? 'below',
      label: (v['label'] as string) ?? 'Loading...',
    };
  }
}
