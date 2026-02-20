import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent, ProgressBarType } from 'ui';
import { TableOfContentComponent } from 'ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';
import { Variant, Size } from 'ui';

@Component({
  selector: 'app-progress-bar-showcase',
  imports: [
    ProgressBarComponent,
    CommonModule,
    TableOfContentComponent,
    InteractiveShowcaseComponent,
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
        <h1 class="showcase__title">Progress Bar Component</h1>
        <p class="showcase__description">
          Progress bar based on Fluent 2 Design System. Unified API: variant + size + type.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            [config]="showcaseConfig"
            (valuesChange)="showcaseValues.set($event)"
          >
            <div preview style="width: 100%;">
              <ui-progress-bar
                [variant]="currentVariant()"
                [size]="currentSize()"
                [type]="currentType()"
                [value]="currentValue()"
              />
              <p style="margin-top: 12px; text-align: center;">
                Current value: <strong>{{ currentValue() }}%</strong>
              </p>
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Variants -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Variants (Semantic Colors)</h2>
          <div class="showcase__grid showcase__grid--vertical">
            @for (v of variants; track v) {
              <div class="showcase__item">
                <span class="showcase__label">{{ v | titlecase }} (75%)</span>
                <ui-progress-bar type="determinate" size="medium" [variant]="v" [value]="75" />
              </div>
            }
          </div>
        </section>

        <!-- Sizes -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Sizes</h2>
          <div class="showcase__grid showcase__grid--vertical">
            @for (s of sizes; track s) {
              <div class="showcase__item">
                <span class="showcase__label">{{ s | titlecase }} (60%)</span>
                <ui-progress-bar type="determinate" [size]="s" variant="primary" [value]="60" />
              </div>
            }
          </div>
        </section>

        <!-- Types -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Types</h2>
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <span class="showcase__label">Determinate ({{ animatedProgress }}%)</span>
              <ui-progress-bar
                type="determinate"
                size="medium"
                variant="primary"
                [value]="animatedProgress"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Indeterminate</span>
              <ui-progress-bar type="indeterminate" size="medium" variant="primary" />
            </div>
          </div>
        </section>

        <!-- Usage Examples -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Examples</h2>
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <span class="showcase__label">File Upload ({{ fileUploadProgress }}%)</span>
              <ui-progress-bar
                type="determinate"
                size="medium"
                variant="primary"
                [value]="fileUploadProgress"
                ariaLabel="File upload progress"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Processing</span>
              <ui-progress-bar
                type="indeterminate"
                size="medium"
                variant="info"
                ariaLabel="Processing"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Download Complete</span>
              <ui-progress-bar
                type="determinate"
                size="large"
                variant="success"
                [value]="100"
                ariaLabel="Download complete"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Upload Failed</span>
              <ui-progress-bar
                type="determinate"
                size="medium"
                variant="danger"
                [value]="45"
                ariaLabel="Upload failed"
              />
            </div>
            <div class="showcase__item">
              <span class="showcase__label">Storage Warning</span>
              <ui-progress-bar
                type="determinate"
                size="medium"
                variant="warning"
                [value]="90"
                ariaLabel="Storage almost full"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ProgressBarShowcaseComponent implements OnInit, OnDestroy {
  variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  sizes: Size[] = ['small', 'medium', 'large'];
  types: ProgressBarType[] = ['determinate', 'indeterminate'];

  animatedProgress = 0;
  fileUploadProgress = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  showcaseConfig: ShowcaseConfig = {
    controls: [
      {
        key: 'variant',
        type: 'dropdown',
        label: 'Variant',
        options: this.variants.map(v => ({ value: v, label: v })),
        defaultValue: 'primary',
        group: 'appearance',
      },
      {
        key: 'size',
        type: 'dropdown',
        label: 'Size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
      {
        key: 'type',
        type: 'dropdown',
        label: 'Type',
        options: this.types.map(t => ({ value: t, label: t })),
        defaultValue: 'determinate',
        group: 'appearance',
      },
      {
        key: 'value',
        type: 'number',
        label: 'Progress',
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 1,
        group: 'value',
      },
    ],
    controlGroups: [
      {
        id: 'appearance',
        label: 'Appearance',
        expanded: true,
      },
      {
        id: 'value',
        label: 'Value',
        expanded: true,
      },
    ],
  };

  showcaseValues = signal<Record<string, any>>({});

  currentVariant = computed(() => (this.showcaseValues()['variant'] as Variant) || 'primary');
  currentSize = computed(() => (this.showcaseValues()['size'] as Size) || 'medium');
  currentType = computed(() => (this.showcaseValues()['type'] as ProgressBarType) || 'determinate');
  currentValue = computed(() => (this.showcaseValues()['value'] as number) || 50);

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.animatedProgress = (this.animatedProgress + 1) % 101;
      this.fileUploadProgress = (this.fileUploadProgress + 2) % 101;
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
