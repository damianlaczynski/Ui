import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ButtonComponent, TableOfContentComponent, TooltipDirective } from 'ui';
import type { TooltipPosition, TooltipSize } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  TOOLTIP_DRAWER_CONFIGS,
  TOOLTIP_POSITIONS,
  TOOLTIP_SIZES,
} from './tooltip.showcase.config';
import { TooltipInteractiveComponent } from './tooltip.interactive';

@Component({
  selector: 'app-tooltip-showcase',
  imports: [
    CommonModule,
    TooltipDirective,
    ButtonComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    TooltipInteractiveComponent,
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
        <app-showcase-header title="Tooltip" />
        <p class="showcase__description">
          The Tooltip component shows contextual information on hover or focus. It supports four
          positions, three sizes, configurable delays, and disabled state.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Position and size matrix. Use the Customize drawer to toggle disabled state across all previews."
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
            @for (position of positions; track position) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ position | titlecase }}
                </div>
                @for (size of sizes; track size) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-button
                      appearance="outline"
                      uiTooltip="Tooltip preview"
                      [uiTooltipPosition]="position"
                      [uiTooltipSize]="size"
                      [uiTooltipDisabled]="!!overviewFormValues()['uiTooltipDisabled']"
                    >
                      {{ position | titlecase }}
                    </ui-button>
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Position"
          sectionDescription="Tooltip placement relative to the trigger: top, bottom, left, right."
          [formConfig]="positionDrawerFormConfig"
          [formValues]="positionFormValues()"
          (formValuesChange)="positionFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (position of positions; track position) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ position | titlecase }}</h3>
                <ui-button
                  appearance="outline"
                  uiTooltip="Position example"
                  [uiTooltipPosition]="position"
                  [uiTooltipSize]="positionForm().size"
                  [uiTooltipDisabled]="positionForm().disabled"
                >
                  {{ position | titlecase }}
                </ui-button>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-button
                  appearance="outline"
                  [uiTooltip]="size === 'large' ? longTooltipText : 'Size example'"
                  [uiTooltipPosition]="sizeForm().position"
                  [uiTooltipSize]="size"
                  [uiTooltipDisabled]="sizeForm().disabled"
                >
                  {{ size | titlecase }}
                </ui-button>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal and disabled states."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of tooltipStates; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-button
                  appearance="outline"
                  uiTooltip="State example"
                  [uiTooltipPosition]="statesForm().position"
                  [uiTooltipSize]="statesForm().size"
                  [uiTooltipDisabled]="state.disabled"
                >
                  {{ state.label }}
                </ui-button>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Delay"
          sectionDescription="Tooltip show delay in milliseconds."
          [formConfig]="delayDrawerFormConfig"
          [formValues]="delayFormValues()"
          (formValuesChange)="delayFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (delay of delayPresets; track delay.value) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ delay.label }}</h3>
                <ui-button
                  appearance="outline"
                  [uiTooltip]="delay.text"
                  [uiTooltipPosition]="delayForm().position"
                  [uiTooltipSize]="delayForm().size"
                  [uiTooltipDisabled]="delayForm().disabled"
                  [uiTooltipDelay]="delay.value"
                >
                  {{ delay.label }}
                </ui-button>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Configure tooltip text, position, size, delay, and disabled state in real time.
          </p>
          <app-tooltip-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TooltipShowcaseComponent {
  positions: TooltipPosition[] = [...TOOLTIP_POSITIONS];
  sizes: TooltipSize[] = [...TOOLTIP_SIZES];

  overviewDrawerFormConfig = TOOLTIP_DRAWER_CONFIGS.overview;
  positionDrawerFormConfig = TOOLTIP_DRAWER_CONFIGS.position;
  sizeDrawerFormConfig = TOOLTIP_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = TOOLTIP_DRAWER_CONFIGS.states;
  delayDrawerFormConfig = TOOLTIP_DRAWER_CONFIGS.delay;

  overviewFormValues = signal<Record<string, unknown>>({
    uiTooltipDisabled: false,
  });

  positionFormValues = signal<Record<string, unknown>>({
    uiTooltipSize: 'medium',
    uiTooltipDisabled: false,
  });

  sizeFormValues = signal<Record<string, unknown>>({
    uiTooltipPosition: 'top',
    uiTooltipDisabled: false,
  });

  statesFormValues = signal<Record<string, unknown>>({
    uiTooltipPosition: 'top',
    uiTooltipSize: 'medium',
  });

  delayFormValues = signal<Record<string, unknown>>({
    uiTooltipPosition: 'top',
    uiTooltipSize: 'medium',
    uiTooltipDisabled: false,
  });

  positionForm = computed(() => {
    const v = this.positionFormValues();
    return {
      size: (v['uiTooltipSize'] as TooltipSize) ?? 'medium',
      disabled: !!v['uiTooltipDisabled'],
    };
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      position: (v['uiTooltipPosition'] as TooltipPosition) ?? 'top',
      disabled: !!v['uiTooltipDisabled'],
    };
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      position: (v['uiTooltipPosition'] as TooltipPosition) ?? 'top',
      size: (v['uiTooltipSize'] as TooltipSize) ?? 'medium',
    };
  });

  delayForm = computed(() => {
    const v = this.delayFormValues();
    return {
      position: (v['uiTooltipPosition'] as TooltipPosition) ?? 'top',
      size: (v['uiTooltipSize'] as TooltipSize) ?? 'medium',
      disabled: !!v['uiTooltipDisabled'],
    };
  });

  tooltipStates = [
    { id: 'normal', label: 'Normal', disabled: false },
    { id: 'disabled', label: 'Disabled', disabled: true },
  ];

  delayPresets = [
    { value: 0, label: '0 ms', text: 'Immediate tooltip' },
    { value: 300, label: '300 ms', text: 'Default tooltip delay' },
    { value: 1000, label: '1000 ms', text: 'Slow tooltip delay' },
  ];

  longTooltipText =
    'Large tooltip with longer text that can wrap to multiple lines for better readability and context.';
}
