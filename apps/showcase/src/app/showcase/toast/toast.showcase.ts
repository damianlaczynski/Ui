import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent, ToastComponent, ToastContainerComponent, ToastService } from 'ui';
import { Appearance, Size, TableOfContentComponent, Variant } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { APPEARANCES, SIZES, VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { TOAST_DRAWER_CONFIGS } from './toast.showcase.config';
import { ToastInteractiveComponent } from './toast.interactive';

@Component({
  selector: 'app-toast-showcase',
  imports: [
    CommonModule,
    ButtonComponent,
    ToastComponent,
    ToastContainerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ToastInteractiveComponent,
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
        <app-showcase-header title="Toast" />
        <p class="showcase__description">
          The Toast component displays brief feedback messages for user actions and system events.
          It supports semantic variants, multiple visual appearances, sizes, and optional behaviors
          like dismiss button, icon, and progress indicator.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete matrix of variant and appearance combinations. Use the Customize drawer to adjust shared size and toast options across all examples."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-toast
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="overviewForm().size"
                      [dismissible]="overviewForm().dismissible"
                      [showIcon]="overviewForm().showIcon"
                      [showProgress]="overviewForm().showProgress"
                      [title]="variant | titlecase"
                      [message]="'Appearance: ' + appearance"
                      [visible]="true"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects spacing and text density in the toast body."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-toast
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [dismissible]="sizeForm().dismissible"
                  [showIcon]="sizeForm().showIcon"
                  [showProgress]="sizeForm().showProgress"
                  [title]="size | titlecase"
                  [message]="'Toast size example'"
                  [visible]="true"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Options"
          sectionDescription="Behavior options control dismiss action, icon visibility, and progress indicator. Use the Customize drawer to adjust shared visual style."
          [formConfig]="optionsDrawerFormConfig"
          [formValues]="optionsFormValues()"
          (formValuesChange)="optionsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (preset of optionPresets; track preset.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-toast
                  [variant]="optionsForm().variant"
                  [appearance]="optionsForm().appearance"
                  [size]="optionsForm().size"
                  [dismissible]="preset.dismissible"
                  [showIcon]="preset.showIcon"
                  [showProgress]="preset.showProgress"
                  [title]="preset.label"
                  [message]="preset.message"
                  [visible]="true"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Toast Service</h2>
          <p class="showcase__section__description">
            Use ToastService for ephemeral notifications from business logic.
          </p>
          <div class="showcase__option-section__box">
            <ui-toast-container position="top-right" />
            <div class="showcase__form">
              <ui-button type="button" variant="info" (click)="showInfoToast()">
                Show Info Toast
              </ui-button>
              <ui-button type="button" variant="success" (click)="showSuccessToast()">
                Show Success Toast
              </ui-button>
              <ui-button type="button" variant="warning" (click)="showWarningToast()">
                Show Warning Toast
              </ui-button>
              <ui-button type="button" variant="danger" (click)="showErrorToast()">
                Show Error Toast
              </ui-button>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all toast options in real time. Change content, variant, appearance,
            size, and behavior flags.
          </p>
          <app-toast-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ToastShowcaseComponent {
  private toastService = inject(ToastService);

  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;

  overviewDrawerFormConfig = TOAST_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = TOAST_DRAWER_CONFIGS.size;
  optionsDrawerFormConfig = TOAST_DRAWER_CONFIGS.options;

  optionPresets = [
    {
      id: 'dismissible',
      label: 'Dismissible',
      message: 'Click the close button to dismiss this toast.',
      dismissible: true,
      showIcon: true,
      showProgress: false,
    },
    {
      id: 'progress',
      label: 'With Progress',
      message: 'Shows progress indicator for auto-dismiss behavior.',
      dismissible: true,
      showIcon: true,
      showProgress: true,
    },
    {
      id: 'without-icon',
      label: 'Without Icon',
      message: 'The icon is hidden while preserving semantic style.',
      dismissible: true,
      showIcon: false,
      showProgress: false,
    },
    {
      id: 'minimal',
      label: 'Minimal',
      message: 'No icon and no dismiss button.',
      dismissible: false,
      showIcon: false,
      showProgress: false,
    },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    dismissible: true,
    showIcon: true,
    showProgress: false,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      size: v['size'] as Size,
      dismissible: !!v['dismissible'],
      showIcon: !!v['showIcon'],
      showProgress: !!v['showProgress'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'info',
    appearance: 'filled',
    dismissible: true,
    showIcon: true,
    showProgress: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      dismissible: !!v['dismissible'],
      showIcon: !!v['showIcon'],
      showProgress: !!v['showProgress'],
    };
  });

  optionsFormValues = signal<Record<string, unknown>>({
    variant: 'info',
    appearance: 'filled',
    size: 'medium',
  });

  optionsForm = computed(() => {
    const v = this.optionsFormValues();
    return {
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
    };
  });

  showInfoToast(): void {
    this.toastService.info('Information', 'This is an informational message.');
  }

  showSuccessToast(): void {
    this.toastService.success('Success', 'Your operation completed successfully.');
  }

  showWarningToast(): void {
    this.toastService.warn('Warning', 'Please review your input before proceeding.');
  }

  showErrorToast(): void {
    this.toastService.error('Error', 'Something went wrong. Please try again.');
  }
}
