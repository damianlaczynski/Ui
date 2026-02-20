import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStateComponent, CardComponent, ButtonComponent, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { LOADING_STATE_DRAWER_CONFIGS } from './loading-state.showcase.config';
import { LoadingStateInteractiveComponent } from './loading-state.interactive';

@Component({
  selector: 'app-loading-state-showcase',
  imports: [
    CommonModule,
    LoadingStateComponent,
    CardComponent,
    ButtonComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    LoadingStateInteractiveComponent,
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
        <app-showcase-header title="Loading State" />
        <p class="showcase__description">
          The Loading State component indicates that content is being loaded, providing visual
          feedback during asynchronous operations. It supports title, description, sizes, overlay
          mode with optional blur, and full screen overlay for page-level loading.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic</h2>
          <p class="showcase__section__description">Simple loading state with just a spinner.</p>
          <div class="showcase__preview">
            <ui-loading-state />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">With Title</h2>
          <p class="showcase__section__description">
            Loading state with a title to provide context about what is loading.
          </p>
          <div class="showcase__preview">
            <ui-loading-state title="Loading data..." />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">With Title and Description</h2>
          <p class="showcase__section__description">
            Loading state with both title and description for more detailed information.
          </p>
          <div class="showcase__preview">
            <ui-loading-state
              title="Loading your content"
              description="Please wait while we fetch the latest information for you."
            />
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Use the Customize drawer to adjust spinner size and overlay options."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-loading-state
                  title="Loading data"
                  description="Please wait..."
                  [size]="size"
                  [spinnerSize]="sizeForm().spinnerSize"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Spinner Size"
          sectionDescription="Loading state with different spinner sizes: small, medium, and large. Use the Customize drawer to adjust component size."
          [formConfig]="spinnerSizeDrawerFormConfig"
          [formValues]="spinnerSizeFormValues()"
          (formValuesChange)="spinnerSizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (spinnerSize of sizes; track spinnerSize) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ spinnerSize | titlecase }}</h3>
                <ui-loading-state
                  title="Loading..."
                  description="Fetching data"
                  [size]="spinnerSizeForm().size"
                  [spinnerSize]="spinnerSize"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Content</h2>
          <p class="showcase__section__description">
            Loading state with custom content projection for advanced use cases.
          </p>
          <div class="showcase__preview">
            <ui-loading-state title="Initializing application">
              <ng-template #content>
                <div style="text-align: center; padding: 16px;">
                  <p style="margin-bottom: 16px;">Setting up your environment...</p>
                  <div style="display: flex; gap: 8px; justify-content: center;">
                    <span
                      style="font-size: 12px; color: var(--color-neutral-foreground2-rest, #605E5C);"
                      >Step 1 of 3</span
                    >
                  </div>
                </div>
              </ng-template>
            </ui-loading-state>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Overlay"
          sectionDescription="Loading state as overlay on existing content. Use the Customize drawer to adjust size and spinner size."
          [formConfig]="overlayDrawerFormConfig"
          [formValues]="overlayFormValues()"
          (formValuesChange)="overlayFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Overlay with Blur</h3>
              <ui-loading-state
                [overlay]="true"
                [blurContent]="true"
                [isLoading]="true"
                [title]="overlayForm().title"
                [description]="overlayForm().description"
                [size]="overlayForm().size"
                [spinnerSize]="overlayForm().spinnerSize"
              >
                <ui-card appearance="filled" ariaLabel="Sample content card">
                  <div uiCardHeader><strong>Sample Content</strong></div>
                  <p uiCardBody>
                    This content will be covered by the loading overlay. The blur effect helps draw
                    attention to the loading state.
                  </p>
                </ui-card>
              </ui-loading-state>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Overlay without Blur</h3>
              <ui-loading-state
                [overlay]="true"
                [blurContent]="false"
                [isLoading]="true"
                title="Processing..."
                description="This may take a moment"
                [size]="overlayForm().size"
                [spinnerSize]="overlayForm().spinnerSize"
              >
                <ui-card appearance="outline" ariaLabel="Sample content card">
                  <div uiCardHeader><strong>Sample Content</strong></div>
                  <p uiCardBody>
                    This content is visible through the overlay without blur, allowing users to see
                    what's being loaded.
                  </p>
                </ui-card>
              </ui-loading-state>
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Overlay on Table</h2>
          <p class="showcase__section__description">
            Loading overlay applied to tables while data is being fetched or updated.
          </p>
          <div class="showcase__preview">
            <ui-loading-state
              [overlay]="true"
              [isLoading]="true"
              title="Loading data"
              spinnerSize="medium"
            >
              <table
                style="width: 100%; border-collapse: collapse; background: var(--Neutral-Background-rest, #FFFFFF);"
              >
                <thead>
                  <tr style="background: var(--Neutral-Background-hover, #F3F2F1);">
                    <th
                      style="padding: 12px; text-align: left; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      Name
                    </th>
                    <th
                      style="padding: 12px; text-align: left; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      Email
                    </th>
                    <th
                      style="padding: 12px; text-align: left; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      John Doe
                    </td>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      john&#64;example.com
                    </td>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      Admin
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      Jane Smith
                    </td>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      jane&#64;example.com
                    </td>
                    <td
                      style="padding: 12px; border-bottom: 1px solid var(--Neutral-Stroke-rest, #EDEBE9);"
                    >
                      User
                    </td>
                  </tr>
                </tbody>
              </table>
            </ui-loading-state>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Overlay on Card</h2>
          <p class="showcase__section__description">
            Loading overlay applied to cards or other content containers.
          </p>
          <div class="showcase__preview">
            <div
              style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;"
            >
              <ui-loading-state
                [overlay]="true"
                [isLoading]="true"
                title="Updating..."
                description="Saving your changes"
                spinnerSize="small"
                size="small"
              >
                <ui-card appearance="filled" ariaLabel="Card with actions">
                  <div uiCardHeader><strong>Card Title</strong></div>
                  <p uiCardBody>
                    This is a sample card with content that will be covered by the loading overlay.
                  </p>
                  <div uiCardFooter>
                    <ui-button size="small">Action Button</ui-button>
                  </div>
                </ui-card>
              </ui-loading-state>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Full Screen Overlay</h2>
          <p class="showcase__section__description">
            Full screen overlay that covers the entire viewport, useful for page-level loading or
            blocking operations.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Full Screen Loading</h3>
              <p
                style="margin-bottom: 16px; color: var(--color-neutral-foreground2-rest, #605E5C);"
              >
                Click the button below to demonstrate full screen loading overlay:
              </p>
              <ui-button variant="primary" (click)="showFullScreenDemo()">
                Show Full Screen Loading
              </ui-button>
              @if (showFullScreen()) {
                <ui-loading-state
                  [overlay]="true"
                  [fullScreen]="true"
                  [blurContent]="true"
                  title="Loading application"
                  description="Please wait while we initialize everything for you..."
                  spinnerSize="large"
                  size="large"
                />
              }
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Use Case Examples</h2>
          <p class="showcase__section__description">
            Various loading state examples for different scenarios.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Page Loading</h3>
              <ui-loading-state
                title="Loading page"
                description="Please wait while we load the content"
                spinnerSize="large"
                size="large"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Data Fetching</h3>
              <ui-loading-state
                title="Fetching data"
                description="Retrieving information from the server"
                spinnerSize="medium"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Form Submission</h3>
              <ui-loading-state
                title="Submitting form"
                description="Please wait while we process your request"
                spinnerSize="small"
                size="small"
              />
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all loading state options in real time. Change title, description, size,
            spinner size, overlay mode, and blur. Toggle overlay to see it on sample content.
          </p>
          <app-loading-state-interactive />
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Loading State component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class LoadingStateShowcaseComponent {
  sizes: Size[] = [...SIZES];

  sizeDrawerFormConfig = LOADING_STATE_DRAWER_CONFIGS.size;
  spinnerSizeDrawerFormConfig = LOADING_STATE_DRAWER_CONFIGS.spinnerSize;
  overlayDrawerFormConfig = LOADING_STATE_DRAWER_CONFIGS.overlay;

  sizeFormValues = signal<Record<string, unknown>>({
    spinnerSize: 'medium',
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      spinnerSize: (v['spinnerSize'] as Size) ?? 'medium',
    };
  });

  spinnerSizeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
  });

  spinnerSizeForm = computed(() => {
    const v = this.spinnerSizeFormValues();
    return {
      size: (v['size'] as Size) ?? 'medium',
    };
  });

  overlayFormValues = signal<Record<string, unknown>>({
    title: 'Loading content',
    description: 'Please wait...',
    size: 'medium',
    spinnerSize: 'medium',
  });

  overlayForm = computed(() => {
    const v = this.overlayFormValues();
    return {
      title: (v['title'] as string) ?? 'Loading content',
      description: (v['description'] as string) ?? 'Please wait...',
      size: (v['size'] as Size) ?? 'medium',
      spinnerSize: (v['spinnerSize'] as Size) ?? 'medium',
    };
  });

  showFullScreen = signal<boolean>(false);

  showFullScreenDemo(): void {
    this.showFullScreen.set(true);
    setTimeout(() => {
      this.showFullScreen.set(false);
    }, 3000);
  }

  usageExample = `// In your component
import { LoadingStateComponent } from 'ui';

@Component({
  template: \`
    @if (isLoading() && !showContent()) {
      <ui-loading-state
        title="Loading data"
        description="Please wait while we fetch the information"
        spinnerSize="medium"
        size="medium"
      />
    }

    @if (isLoading() && showContent() && !fullScreen()) {
      <ui-loading-state
        [overlay]="true"
        [blurContent]="true"
        [isLoading]="true"
        title="Loading..."
        description="Updating content"
        spinnerSize="medium"
      >
        <div class="content">
          <h2>Content Title</h2>
          <p>This content will be covered by the loading overlay.</p>
        </div>
      </ui-loading-state>
    }

    @if (isLoading() && fullScreen()) {
      <ui-loading-state
        [overlay]="true"
        [fullScreen]="true"
        [blurContent]="true"
        title="Loading application"
        description="Please wait while we initialize everything..."
        spinnerSize="large"
        size="large"
      />
    }

    @if (!isLoading()) {
      <div class="content"><!-- Your loaded content --></div>
    }
  \`
})
export class MyComponent {
  isLoading = signal(false);
  showContent = signal(true);
  fullScreen = signal(false);
}`;
}
