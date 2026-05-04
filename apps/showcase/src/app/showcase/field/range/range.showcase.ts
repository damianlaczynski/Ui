import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { SLIDER_DRAWER_CONFIGS } from '../slider/slider.showcase.config';
import type { Size } from 'ui';

@Component({
  selector: 'app-range-showcase',
  imports: [
    CommonModule,
    RangeComponent,
    FormsModule,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
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
        <app-showcase-header title="Range" />
        <p class="showcase__description">
          Dual-thumb range input for selecting a numeric interval. Shares patterns with Slider:
          Fluent track, step markers, and min/max labels.
        </p>

        <app-section-with-drawer
          sectionTitle="Basic"
          sectionDescription="Default full-span value (0–100). Adjust size and states from the drawer."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="basicFormValues()"
          (formValuesChange)="basicFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Price range</h3>
              <ui-range
                label="Price range"
                [min]="0"
                [max]="1000"
                [step]="10"
                [(ngModel)]="basicRange"
                [ngModelOptions]="{ standalone: true }"
                [size]="basicForm().size"
                [disabled]="basicForm().disabled"
                [readonly]="basicForm().readonly"
                [required]="basicForm().required"
              />
              <p class="showcase__item__meta">{{ basicRange.min }} – {{ basicRange.max }}</p>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large affect rail thickness and thumb size."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-range
                  [label]="size + ' range'"
                  [size]="size"
                  [min]="0"
                  [max]="100"
                  [(ngModel)]="sizeRanges[size]"
                  [ngModelOptions]="{ standalone: true }"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Step & markers"
          sectionDescription="Discrete steps with optional tick marks on the track."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="stepFormValues()"
          (formValuesChange)="stepFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Step markers</h3>
              <ui-range
                label="Hours"
                [min]="0"
                [max]="24"
                [step]="2"
                [showStepMarkers]="true"
                [(ngModel)]="stepRange"
                [ngModelOptions]="{ standalone: true }"
                [size]="stepForm().size"
                [disabled]="stepForm().disabled"
                [readonly]="stepForm().readonly"
                [required]="stepForm().required"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Min / max labels"
          sectionDescription="Show track bounds next to the control."
          [formConfig]="basicDrawerFormConfig"
          [formValues]="minmaxFormValues()"
          (formValuesChange)="minmaxFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">With labels</h3>
              <ui-range
                label="Temperature (°C)"
                [min]="-20"
                [max]="40"
                [step]="1"
                [showMinMax]="true"
                [(ngModel)]="minmaxRange"
                [ngModelOptions]="{ standalone: true }"
                [size]="minmaxForm().size"
                [disabled]="minmaxForm().disabled"
                [readonly]="minmaxForm().readonly"
                [required]="minmaxForm().required"
              />
            </div>
          </div>
        </app-section-with-drawer>
      </div>
    </div>
  `,
})
export class RangeShowcaseComponent {
  sizes: Size[] = [...SIZES];

  basicDrawerFormConfig = SLIDER_DRAWER_CONFIGS.basic;
  sizeDrawerFormConfig = SLIDER_DRAWER_CONFIGS.size;

  basicRange: NumericRange = { min: 200, max: 800 };
  stepRange: NumericRange = { min: 4, max: 16 };
  minmaxRange: NumericRange = { min: 0, max: 28 };

  sizeRanges: Record<Size, NumericRange> = {
    small: { min: 10, max: 40 },
    medium: { min: 20, max: 80 },
    large: { min: 30, max: 70 },
  };

  basicFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  basicForm = computed(() => this.toForm(this.basicFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  stepFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  stepForm = computed(() => this.toForm(this.stepFormValues()));

  minmaxFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  minmaxForm = computed(() => this.toForm(this.minmaxFormValues()));

  private toForm(v: Record<string, unknown>): {
    size: Size;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  } {
    return {
      size: (v['size'] ?? 'medium') as Size,
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
