import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ProgressBarComponent, ProgressBarType, Size, TableOfContentComponent, Variant } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES, VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { ProgressBarInteractiveComponent } from './progress-bar.interactive';
import { PROGRESS_BAR_DRAWER_CONFIGS } from './progress-bar.showcase.config';

@Component({
  selector: 'app-progress-bar-showcase',
  imports: [
    CommonModule,
    ProgressBarComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ProgressBarInteractiveComponent,
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
        <app-showcase-header title="Progress Bar" />
        <p class="showcase__description">
          Progress bar component for visualizing task completion. Supports semantic variants, sizes,
          determinate and indeterminate modes, and common UI usage patterns.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core progress bar examples with shared options. Use the Customize drawer to change variant, size, type, and value preset."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Current Selection</h3>
              <ui-progress-bar
                [variant]="overviewForm().variant"
                [size]="overviewForm().size"
                [type]="overviewForm().type"
                [value]="overviewForm().value"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Indeterminate Loading</h3>
              <ui-progress-bar
                [variant]="overviewForm().variant"
                [size]="overviewForm().size"
                type="indeterminate"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Completed</h3>
              <ui-progress-bar
                variant="success"
                [size]="overviewForm().size"
                type="determinate"
                [value]="100"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Semantic variants for different statuses and contexts. Use the Customize drawer to adjust shared size, type, and value preset."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <span class="showcase__label">{{ variant | titlecase }}</span>
                <ui-progress-bar
                  [variant]="variant"
                  [size]="variantForm().size"
                  [type]="variantForm().type"
                  [value]="variantForm().value"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium, and large. Use the Customize drawer to adjust shared variant, type, and value preset."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <span class="showcase__label">{{ size | titlecase }}</span>
                <ui-progress-bar
                  [variant]="sizeForm().variant"
                  [size]="size"
                  [type]="sizeForm().type"
                  [value]="sizeForm().value"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Type"
          sectionDescription="Determinate mode uses a specific value, while indeterminate mode represents ongoing work with unknown duration."
          [formConfig]="typeDrawerFormConfig"
          [formValues]="typeFormValues()"
          (formValuesChange)="typeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <span class="showcase__label">Determinate (animated {{ animatedProgress }}%)</span>
              <ui-progress-bar
                [variant]="typeForm().variant"
                [size]="typeForm().size"
                type="determinate"
                [value]="animatedProgress"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Indeterminate</span>
              <ui-progress-bar
                [variant]="typeForm().variant"
                [size]="typeForm().size"
                type="indeterminate"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Usage Patterns"
          sectionDescription="Common product scenarios such as upload, processing, completion, warning, and failure states."
          [formConfig]="usageDrawerFormConfig"
          [formValues]="usageFormValues()"
          (formValuesChange)="usageFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <span class="showcase__label">File Upload ({{ fileUploadProgress }}%)</span>
              <ui-progress-bar
                [variant]="usageForm().variant"
                [size]="usageForm().size"
                type="determinate"
                [value]="fileUploadProgress"
                ariaLabel="File upload progress"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Processing</span>
              <ui-progress-bar
                variant="info"
                [size]="usageForm().size"
                type="indeterminate"
                ariaLabel="Processing"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Download Complete</span>
              <ui-progress-bar
                variant="success"
                [size]="usageForm().size"
                type="determinate"
                [value]="100"
                ariaLabel="Download complete"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Upload Failed</span>
              <ui-progress-bar
                variant="danger"
                [size]="usageForm().size"
                type="determinate"
                [value]="45"
                ariaLabel="Upload failed"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Storage Warning</span>
              <ui-progress-bar
                variant="warning"
                [size]="usageForm().size"
                type="determinate"
                [value]="90"
                ariaLabel="Storage almost full"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with progress bar options in real time. Change variant, size, type, and value
            to inspect generated code and behavior.
          </p>
          <app-progress-bar-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ProgressBarShowcaseComponent implements OnInit, OnDestroy {
  variants: Variant[] = [...VARIANTS];
  sizes: Size[] = [...SIZES];

  overviewDrawerFormConfig = PROGRESS_BAR_DRAWER_CONFIGS.overview;
  variantDrawerFormConfig = PROGRESS_BAR_DRAWER_CONFIGS.variant;
  sizeDrawerFormConfig = PROGRESS_BAR_DRAWER_CONFIGS.size;
  typeDrawerFormConfig = PROGRESS_BAR_DRAWER_CONFIGS.type;
  usageDrawerFormConfig = PROGRESS_BAR_DRAWER_CONFIGS.usage;

  animatedProgress = 0;
  fileUploadProgress = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  overviewFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    type: 'determinate',
    valuePreset: '75',
  });

  overviewForm = computed(() => this.toProgressForm(this.overviewFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    type: 'determinate',
    valuePreset: '75',
  });

  variantForm = computed(() => this.toProgressForm(this.variantFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    type: 'determinate',
    valuePreset: '75',
  });

  sizeForm = computed(() => this.toProgressForm(this.sizeFormValues()));

  typeFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    valuePreset: '75',
  });

  typeForm = computed(() => this.toProgressForm(this.typeFormValues()));

  usageFormValues = signal<Record<string, unknown>>({
    variant: 'primary',
    size: 'medium',
    valuePreset: '75',
  });

  usageForm = computed(() => this.toProgressForm(this.usageFormValues()));

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.animatedProgress = (this.animatedProgress + 1) % 101;
      this.fileUploadProgress = (this.fileUploadProgress + 2) % 101;
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private toProgressForm(v: Record<string, unknown>): {
    variant: Variant;
    size: Size;
    type: ProgressBarType;
    value: number;
  } {
    const value = Number(v['valuePreset']);
    return {
      variant: (v['variant'] as Variant) ?? 'primary',
      size: (v['size'] as Size) ?? 'medium',
      type: (v['type'] as ProgressBarType) ?? 'determinate',
      value: Number.isNaN(value) ? 75 : value,
    };
  }
}
