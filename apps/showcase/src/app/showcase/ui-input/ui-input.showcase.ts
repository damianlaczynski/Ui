import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TableOfContentComponent, UiInputDirective } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { INPUT_VARIANTS, SIZES } from '@shared/utils/showcase/component-options.utils';
import { UI_INPUT_DRAWER_CONFIGS } from './ui-input.showcase.config';

@Component({
  selector: 'app-ui-input-showcase',
  imports: [
    CommonModule,
    UiInputDirective,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
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
        <app-showcase-header title="UI Input" />
        <p class="showcase__description">
          The <code>uiInput</code> directive applies Fluent-style input surface styles to native
          <code>&lt;input&gt;</code> and <code>&lt;textarea&gt;</code> elements. It wraps the
          control in an <code>input-wrapper</code> with the same visual variants as field
          components.
        </p>

        <app-section-with-drawer
          sectionTitle="Appearance matrix"
          sectionDescription="Variants and sizes. Use Customize to toggle disabled, readonly, and error across all cells."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix showcase__icons-matrix--3-cols">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (size of sizes; track size) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ size | titlecase }}
                </div>
              }
            </div>
            @for (variant of variants; track variant) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ variant | titlecase }}
                </div>
                @for (size of sizes; track size) {
                  <div class="showcase__icons-matrix__cell">
                    <input
                      type="text"
                      uiInput
                      [uiInputAppearance]="variant"
                      [uiInputSize]="size"
                      [uiInputError]="!!overviewFormValues()['error']"
                      [disabled]="!!overviewFormValues()['disabled']"
                      [readonly]="!!overviewFormValues()['readonly']"
                      [attr.aria-label]="variant + ' ' + size + ' input'"
                      [placeholder]="variant + ' · ' + size"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Textarea"
          sectionDescription="The directive applies the same wrapper and input typography to multi-line fields."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <textarea
                  uiInput
                  [uiInputAppearance]="variant"
                  [uiInputSize]="'medium'"
                  [uiInputError]="!!overviewFormValues()['error']"
                  [disabled]="!!overviewFormValues()['disabled']"
                  [readonly]="!!overviewFormValues()['readonly']"
                  rows="3"
                  [attr.aria-label]="variant + ' textarea'"
                  [placeholder]="'Notes (' + variant + ')'"
                ></textarea>
              </div>
            }
          </div>
        </app-section-with-drawer>
      </div>
    </div>
  `,
})
export class UiInputShowcaseComponent {
  protected readonly variants = INPUT_VARIANTS;
  protected readonly sizes = SIZES;

  protected readonly overviewDrawerFormConfig = UI_INPUT_DRAWER_CONFIGS.overview;

  overviewFormValues = signal<Record<string, unknown>>({
    disabled: false,
    readonly: false,
    error: false,
  });
}
