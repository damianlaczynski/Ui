import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent, IconName, QuickAction, Size } from 'ui';
import { ButtonComponent } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { EMPTY_STATE_DRAWER_CONFIGS } from './empty-state.showcase.config';
import { EmptyStateInteractiveComponent } from './empty-state.interactive';

@Component({
  selector: 'app-empty-state-showcase',
  imports: [
    CommonModule,
    EmptyStateComponent,
    ButtonComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    EmptyStateInteractiveComponent,
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
        <app-showcase-header title="Empty State" />
        <p class="showcase__description">
          The Empty State component displays a message when there is no data to show, guiding users
          on what to do next. It supports title, description, icon, sizes, and primary/secondary
          actions. Use for empty lists, no search results, or any scenario where users need
          guidance.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic</h2>
          <p class="showcase__section__description">
            Simple empty state with title and description.
          </p>
          <div class="showcase__preview">
            <ui-empty-state
              title="No items found"
              description="There are no items to display at this time."
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">With Icon</h2>
          <p class="showcase__section__description">
            Empty state with an icon to provide visual context.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>Document</h3>
              <ui-empty-state
                title="No documents"
                description="You don't have any documents yet. Start by creating your first document."
                icon="document"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Search</h3>
              <ui-empty-state
                title="No results"
                description="Try adjusting your search criteria."
                icon="search"
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
                <ui-empty-state
                  title="No results"
                  description="Try adjusting your search criteria."
                  [icon]="sizeForm().icon"
                  [size]="size"
                  [primaryAction]="sizeForm().showPrimary ? addAction() : null"
                  [secondaryAction]="sizeForm().showSecondary ? learnMoreAction() : null"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Actions"
          sectionDescription="Primary and secondary action buttons to guide users. Use the Customize drawer to adjust size and icon."
          [formConfig]="actionsDrawerFormConfig"
          [formValues]="actionsFormValues()"
          (formValuesChange)="actionsFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Primary Only</h3>
              <ui-empty-state
                title="No items yet"
                description="Get started by adding your first item to the list."
                [icon]="actionsForm().icon"
                [size]="actionsForm().size"
                [primaryAction]="addAction()"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Primary and Secondary</h3>
              <ui-empty-state
                title="No data available"
                description="You can import data from a file or create new entries manually."
                [icon]="actionsForm().icon"
                [size]="actionsForm().size"
                [primaryAction]="importAction()"
                [secondaryAction]="createManuallyAction()"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Content</h2>
          <p class="showcase__section__description">
            Empty state with custom content projection for advanced use cases.
          </p>
          <div class="showcase__preview">
            <ui-empty-state title="Custom layout">
              <ng-template #content>
                <div style="text-align: center; padding: 16px;">
                  <p style="margin-bottom: 16px;">You can add any custom content here</p>
                  <div style="display: flex; gap: 8px; justify-content: center;">
                    <ui-button appearance="outline" size="small">Learn More</ui-button>
                    <ui-button variant="primary" size="small">Get Started</ui-button>
                  </div>
                </div>
              </ng-template>
            </ui-empty-state>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Use Case Examples</h2>
          <p class="showcase__section__description">
            Various empty state examples for different scenarios.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3>No Search Results</h3>
              <ui-empty-state
                title="No results found"
                description="We couldn't find anything matching your search. Try different keywords."
                icon="search"
                [primaryAction]="clearSearchAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>Empty List</h3>
              <ui-empty-state
                title="Your list is empty"
                description="Add items to get started."
                icon="list"
                [primaryAction]="addFirstItemAction()"
              />
            </div>
            <div class="showcase__preview-item">
              <h3>No Permissions</h3>
              <ui-empty-state
                title="Access restricted"
                description="You don't have permission to view this content. Contact your administrator for access."
                icon="shield"
              />
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all empty state options in real time. Change title, description, icon,
            size, and toggle primary/secondary actions. Action clicks are logged—check the event log
            to see interactions.
          </p>
          <app-empty-state-interactive />
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Empty State component in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class EmptyStateShowcaseComponent {
  sizes: Size[] = [...SIZES];

  sizeDrawerFormConfig = EMPTY_STATE_DRAWER_CONFIGS.size;
  actionsDrawerFormConfig = EMPTY_STATE_DRAWER_CONFIGS.actions;

  sizeFormValues = signal<Record<string, unknown>>({
    icon: 'document',
    showPrimary: false,
    showSecondary: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    const iconVal = v['icon'] as string;
    return {
      icon: iconVal ? (iconVal as IconName) : undefined,
      showPrimary: !!v['showPrimary'],
      showSecondary: !!v['showSecondary'],
    };
  });

  actionsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    icon: 'document',
  });

  actionsForm = computed(() => {
    const v = this.actionsFormValues();
    const iconVal = v['icon'] as string;
    return {
      size: (v['size'] as Size) ?? 'medium',
      icon: iconVal ? (iconVal as IconName) : undefined,
    };
  });

  addAction = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => alert('Add action clicked!'),
  });

  learnMoreAction = signal<QuickAction>({
    label: 'Learn More',
    variant: 'secondary',
    action: () => alert('Learn more clicked!'),
  });

  importAction = signal<QuickAction>({
    label: 'Import Data',
    variant: 'primary',
    icon: 'send',
    action: () => alert('Import action clicked!'),
  });

  createManuallyAction = signal<QuickAction>({
    label: 'Create Manually',
    variant: 'secondary',
    icon: 'add',
    action: () => alert('Create manually clicked!'),
  });

  clearSearchAction = signal<QuickAction>({
    label: 'Clear Search',
    variant: 'secondary',
    action: () => alert('Clear search clicked!'),
  });

  addFirstItemAction = signal<QuickAction>({
    label: 'Add First Item',
    variant: 'primary',
    icon: 'add',
    action: () => alert('Add item clicked!'),
  });

  usageExample = `// In your component
import { EmptyStateComponent } from 'ui';
import { QuickAction } from 'ui';

@Component({
  template: \`
    @if (items().length === 0) {
      <ui-empty-state
        title="No items found"
        description="There are no items to display at this time."
        icon="document"
        [primaryAction]="addAction()"
      />
    } @else {
      <!-- Your content here -->
    }
  \`
})
export class MyComponent {
  items = signal([]);

  addAction = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      // Handle add action
    },
  });
}`;
}
