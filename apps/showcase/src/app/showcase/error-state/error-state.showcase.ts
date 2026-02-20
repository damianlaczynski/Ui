import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateComponent, IconName, QuickAction, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { ERROR_STATE_DRAWER_CONFIGS } from './error-state.showcase.config';
import { ErrorStateInteractiveComponent } from './error-state.interactive';

@Component({
  selector: 'app-error-state-showcase',
  imports: [
    CommonModule,
    ErrorStateComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ErrorStateInteractiveComponent,
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
        <app-showcase-header title="Error State" />
        <p class="showcase__description">
          The Error State component displays error messages when something goes wrong. It supports
          title, description, icon variants, sizes, and primary/secondary actions. Use for failed
          data loads, validation errors, or any error scenario where users need context and recovery
          options.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic</h2>
          <p class="showcase__section__description">
            Simple error state with title and description.
          </p>
          <div class="showcase__preview">
            <ui-error-state
              title="Something went wrong"
              description="An unexpected error occurred. Please try again later."
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">With Icon</h2>
          <p class="showcase__section__description">
            Error state with default or custom icon for visual context.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Default Icon</h3>
              <ui-error-state
                title="Failed to load data"
                description="We couldn't load the requested information. Please check your connection and try again."
                icon="error_circle"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Custom Icon</h3>
              <ui-error-state
                title="Connection error"
                description="Unable to connect to the server. Please check your internet connection."
                icon="wifi_off"
              />
            </div>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Sizes"
          sectionDescription="Three size options: small, medium (default), and large. Use the Customize drawer to toggle icon and actions across all examples."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-error-state
                  title="Error occurred"
                  description="Please try again."
                  [icon]="sizeForm().icon"
                  [size]="size"
                  [primaryAction]="sizeForm().showPrimary ? retryAction() : null"
                  [secondaryAction]="sizeForm().showSecondary ? contactSupportAction() : null"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Actions"
          sectionDescription="Primary and secondary action buttons for recovery options. Use the Customize drawer to adjust size and icon."
          [formConfig]="actionsDrawerFormConfig"
          [formValues]="actionsFormValues()"
          (formValuesChange)="actionsFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Primary Only</h3>
              <ui-error-state
                title="Failed to save changes"
                description="Your changes could not be saved. Please try again."
                [icon]="actionsForm().icon"
                [size]="actionsForm().size"
                [primaryAction]="retryAction()"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Primary and Secondary</h3>
              <ui-error-state
                title="Upload failed"
                description="The file could not be uploaded. You can try again or contact support for help."
                [icon]="actionsForm().icon"
                [size]="actionsForm().size"
                [primaryAction]="retryUploadAction()"
                [secondaryAction]="contactSupportAction()"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Content</h2>
          <p class="showcase__section__description">
            Error state with custom content projection for advanced use cases.
          </p>
          <div class="showcase__preview">
            <ui-error-state title="Validation error">
              <ng-template #content>
                <div style="text-align: center; padding: 16px;">
                  <p
                    style="margin-bottom: 16px; color: var(--color-shared-red-foreground, #D13438);"
                  >
                    Please fix the following issues:
                  </p>
                  <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                    <li>Email address is required</li>
                    <li>Password must be at least 8 characters</li>
                    <li>Phone number is invalid</li>
                  </ul>
                </div>
              </ng-template>
            </ui-error-state>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Use Case Examples</h2>
          <p class="showcase__section__description">
            Various error state examples for different scenarios.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Network Error</h3>
              <ui-error-state
                title="Network connection failed"
                description="Unable to connect to the server. Please check your internet connection and try again."
                icon="wifi_off"
                [primaryAction]="retryAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Permission Error</h3>
              <ui-error-state
                title="Access denied"
                description="You don't have permission to access this resource. Contact your administrator if you believe this is an error."
                icon="shield"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>404 Error</h3>
              <ui-error-state
                title="Page not found"
                description="The page you're looking for doesn't exist or has been moved."
                icon="document_dismiss"
                [primaryAction]="goHomeAction()"
              />
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all error state options in real time. Change title, description, icon,
            size, and toggle primary/secondary actions. Action clicks are logged—check the event log
            to see interactions.
          </p>
          <app-error-state-interactive />
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Error State component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class ErrorStateShowcaseComponent {
  sizes: Size[] = [...SIZES];

  sizeDrawerFormConfig = ERROR_STATE_DRAWER_CONFIGS.size;
  actionsDrawerFormConfig = ERROR_STATE_DRAWER_CONFIGS.actions;

  sizeFormValues = signal<Record<string, unknown>>({
    icon: 'error_circle',
    showPrimary: false,
    showSecondary: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      icon: ((v['icon'] as string | undefined) ?? 'error_circle') as IconName,
      showPrimary: !!v['showPrimary'],
      showSecondary: !!v['showSecondary'],
    };
  });

  actionsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    icon: 'error_circle',
  });

  actionsForm = computed(() => {
    const v = this.actionsFormValues();
    return {
      size: (v['size'] as Size) ?? 'medium',
      icon: ((v['icon'] as string | undefined) ?? 'error_circle') as IconName,
    };
  });

  retryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => alert('Retry action clicked!'),
  });

  retryUploadAction = signal<QuickAction>({
    label: 'Retry Upload',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => alert('Retry upload clicked!'),
  });

  contactSupportAction = signal<QuickAction>({
    label: 'Contact Support',
    variant: 'secondary',
    icon: 'person_support',
    action: () => alert('Contact support clicked!'),
  });

  goHomeAction = signal<QuickAction>({
    label: 'Go Home',
    variant: 'primary',
    icon: 'home',
    action: () => alert('Go home clicked!'),
  });

  usageExample = `// In your component
import { ErrorStateComponent } from 'ui';
import { QuickAction } from 'ui';

@Component({
  template: \`
    @if (error()) {
      <ui-error-state
        title="Something went wrong"
        description="An unexpected error occurred. Please try again later."
        icon="error_circle"
        [primaryAction]="retryAction()"
      />
    } @else {
      <!-- Your content here -->
    }
  \`
})
export class MyComponent {
  error = signal<Error | null>(null);

  retryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => this.loadData(),
  });

  loadData(): void {
    // Load data logic
  }
}`;
}
