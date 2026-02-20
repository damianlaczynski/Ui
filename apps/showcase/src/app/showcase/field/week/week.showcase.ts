import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Size, TableOfContentComponent, WeekComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { WeekInteractiveComponent } from './week.interactive';
import { WEEK_DRAWER_CONFIGS } from './week.showcase.config';
import { SIZES } from '@shared/utils/showcase/component-options.utils';

@Component({
  selector: 'app-week-showcase',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WeekComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    WeekInteractiveComponent,
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
        <app-showcase-header title="Week" />
        <p class="showcase__description">Week field for ISO week selection.</p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Week field in different sizes and states."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <ui-week
                  [label]="size"
                  [placeholder]="'Select week'"
                  [size]="size"
                  [displayFormat]="overviewForm().displayFormat"
                  [readonly]="overviewForm().readonly"
                  [required]="overviewForm().required"
                  [formControl]="getSizeControl(size)"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-week-interactive />
        </section>
      </div>
    </div>
  `,
})
export class WeekShowcaseComponent {
  sizes = SIZES;
  overviewDrawerFormConfig = WEEK_DRAWER_CONFIGS.overview;

  sizeControls: Record<string, FormControl<string | null>> = {
    small: new FormControl<string | null>(''),
    medium: new FormControl<string | null>(''),
    large: new FormControl<string | null>(''),
  };

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    displayFormat: 'date-range',
    disabled: false,
    readonly: false,
    required: false,
  });

  overviewForm = computed(() => ({
    size: (this.overviewFormValues()['size'] as Size) || 'medium',
    displayFormat:
      (this.overviewFormValues()['displayFormat'] as 'date-range' | 'week-year' | 'iso') ||
      'date-range',
    disabled: (this.overviewFormValues()['disabled'] as boolean) ?? false,
    readonly: (this.overviewFormValues()['readonly'] as boolean) ?? false,
    required: (this.overviewFormValues()['required'] as boolean) ?? false,
  }));

  constructor() {
    effect(() => {
      const shouldDisable = this.overviewForm().disabled;
      for (const control of Object.values(this.sizeControls)) {
        if (shouldDisable && control.enabled) {
          control.disable({ emitEvent: false });
        } else if (!shouldDisable && control.disabled) {
          control.enable({ emitEvent: false });
        }
      }
    });
  }

  getSizeControl(size: string): FormControl<string | null> {
    return this.sizeControls[size] ?? new FormControl<string | null>('');
  }
}
