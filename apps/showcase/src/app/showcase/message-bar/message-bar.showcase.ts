import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  Appearance,
  IconName,
  QuickAction,
  MessageBarComponent,
  Size,
  TableOfContentComponent,
  Variant,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { APPEARANCES, SIZES, VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { MESSAGE_BAR_DRAWER_CONFIGS } from './message-bar.showcase.config';
import { MessageBarInteractiveComponent } from './message-bar.interactive';

@Component({
  selector: 'app-message-bar-showcase',
  imports: [
    CommonModule,
    MessageBarComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    MessageBarInteractiveComponent,
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
        <app-showcase-header title="Message Bar" />
        <p class="showcase__description">
          Message Bar presents important status and contextual information inline. Use it for
          confirmation, warning, error, or informational messages that should stay visible in
          layout.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Intent variants shown as vertical rows. Use the Customize drawer to adjust shared content, appearance, and behavior."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__rows">
            @for (variant of variants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant | titlecase }}</h3>
                <ui-message-bar
                  [title]="overviewForm().title"
                  [message]="overviewForm().message"
                  [actions]="overviewForm().actions"
                  [icon]="overviewForm().icon"
                  [variant]="variant"
                  [appearance]="overviewForm().appearance"
                  [size]="overviewForm().size"
                  [showIcon]="overviewForm().showIcon"
                  [dismissible]="overviewForm().dismissible"
                  [multiline]="overviewForm().multiline"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options for spacing and typography. Use the Customize drawer to control shared style and behavior."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__rows">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-message-bar
                  [title]="sizeForm().title"
                  [message]="sizeForm().message"
                  [actions]="sizeForm().actions"
                  [icon]="sizeForm().icon"
                  [variant]="sizeForm().variant"
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [showIcon]="sizeForm().showIcon"
                  [dismissible]="sizeForm().dismissible"
                  [multiline]="sizeForm().multiline"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Layout & Actions"
          sectionDescription="Single-line mode keeps compact rows, multiline supports longer content. Actions can be configured as a comma-separated list and render under dismiss in multiline mode."
          [formConfig]="layoutDrawerFormConfig"
          [formValues]="layoutFormValues()"
          (formValuesChange)="layoutFormValues.set($event)"
        >
          <div class="showcase__rows">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Multiline</h3>
              <ui-message-bar
                [title]="layoutForm().title"
                [message]="layoutForm().message"
                [actions]="layoutForm().actions"
                [icon]="layoutForm().icon"
                [variant]="layoutForm().variant"
                [appearance]="layoutForm().appearance"
                [size]="layoutForm().size"
                [showIcon]="layoutForm().showIcon"
                [dismissible]="layoutForm().dismissible"
                [multiline]="true"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Single line</h3>
              <ui-message-bar
                [title]="layoutForm().title"
                [message]="layoutForm().message"
                [actions]="layoutForm().actions"
                [icon]="layoutForm().icon"
                [variant]="layoutForm().variant"
                [appearance]="layoutForm().appearance"
                [size]="layoutForm().size"
                [showIcon]="layoutForm().showIcon"
                [dismissible]="layoutForm().dismissible"
                [multiline]="false"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all message bar options in real time. Change content, appearance,
            layout, and behavior to inspect output and events.
          </p>
          <app-message-bar-interactive />
        </section>
      </div>
    </div>
  `,
})
export class MessageBarShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;

  overviewDrawerFormConfig = MESSAGE_BAR_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = MESSAGE_BAR_DRAWER_CONFIGS.size;
  layoutDrawerFormConfig = MESSAGE_BAR_DRAWER_CONFIGS.layout;

  overviewFormValues = signal<Record<string, unknown>>({
    title: 'Heads up',
    message: 'The next sync is scheduled for 14:30. Save your changes before reloading.',
    actionLabels: 'Review, Details',
    appearance: 'tint',
    size: 'medium',
    showIcon: true,
    icon: '',
    dismissible: true,
    multiline: true,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      title: v['title'] as string,
      message: v['message'] as string,
      actions: this.toActions(v['actionLabels'] as string),
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      showIcon: !!v['showIcon'],
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      multiline: !!v['multiline'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    title: 'Heads up',
    message: 'The next sync is scheduled for 14:30. Save your changes before reloading.',
    actionLabels: 'Review, Details',
    variant: 'info',
    appearance: 'tint',
    showIcon: true,
    icon: '',
    dismissible: true,
    multiline: true,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      title: v['title'] as string,
      message: v['message'] as string,
      actions: this.toActions(v['actionLabels'] as string),
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      showIcon: !!v['showIcon'],
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
      multiline: !!v['multiline'],
    };
  });

  layoutFormValues = signal<Record<string, unknown>>({
    title: 'Update available',
    message: 'Version 1.2.0 is ready to install.',
    actionLabels: 'Install, Later',
    variant: 'success',
    appearance: 'tint',
    size: 'medium',
    showIcon: true,
    icon: '',
    dismissible: true,
  });

  layoutForm = computed(() => {
    const v = this.layoutFormValues();
    return {
      title: v['title'] as string,
      message: v['message'] as string,
      actions: this.toActions(v['actionLabels'] as string),
      variant: v['variant'] as Variant,
      appearance: v['appearance'] as Appearance,
      size: v['size'] as Size,
      showIcon: !!v['showIcon'],
      icon: (v['icon'] as IconName) || undefined,
      dismissible: !!v['dismissible'],
    };
  });

  private toActions(raw: string): QuickAction[] {
    return (raw ?? '')
      .split(',')
      .map(label => label.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map(label => ({
        label,
        action: () => {},
      }));
  }
}
