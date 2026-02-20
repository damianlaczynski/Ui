import { Component, signal, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, of } from 'rxjs';
import {
  ScrollContainerComponent,
  ScrollContainerDataSource,
  ButtonComponent,
  TableOfContentComponent,
  Node,
  IconName,
  Size,
  Appearance,
  Shape,
} from 'ui';
import { SIZES, APPEARANCES, SHAPES } from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SCROLL_CONTAINER_DRAWER_CONFIGS } from './scroll-container.showcase.config';
import { ScrollContainerInteractiveComponent } from './scroll-container.interactive';

interface MockItem {
  id: number;
  label: string;
  icon?: IconName;
  description?: string;
}

@Component({
  selector: 'app-scroll-container-showcase',
  imports: [
    ScrollContainerComponent,
    ButtonComponent,
    CommonModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    ScrollContainerInteractiveComponent,
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
        <app-showcase-header title="Scroll Container" />
        <p class="showcase__description">
          Scroll Container provides infinite scroll functionality with automatic data loading. It
          supports displaying items using Node components or custom templates, following the Fluent
          2 Design System.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Basic scroll container with Node component. Use the Customize drawer to adjust appearance, behavior, and layout options."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="basicDataSource"
              [pageSize]="20"
              [maxHeight]="overviewForm().maxHeight"
              [nodeSize]="overviewForm().nodeSize"
              [appearance]="overviewForm().appearance"
              [shape]="overviewForm().shape"
              [showSelectionIndicator]="overviewForm().showSelectionIndicator"
              [indicatorPosition]="overviewForm().indicatorPosition"
              [asButton]="overviewForm().asButton"
              [selectOnClick]="overviewForm().selectOnClick"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="With Icons"
          sectionDescription="Scroll container with icon nodes."
          [formConfig]="iconsDrawerFormConfig"
          [formValues]="iconsFormValues()"
          (formValuesChange)="iconsFormValues.set($event)"
        >
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="iconDataSource"
              [pageSize]="15"
              [maxHeight]="iconsForm().maxHeight"
              [nodeSize]="iconsForm().nodeSize"
              [appearance]="iconsForm().appearance"
              [shape]="iconsForm().shape"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="With Selection Indicator"
          sectionDescription="Scroll container with selection indicators and click handling."
          [formConfig]="selectionDrawerFormConfig"
          [formValues]="selectionFormValues()"
          (formValuesChange)="selectionFormValues.set($event)"
        >
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="selectionDataSource"
              [pageSize]="20"
              [maxHeight]="selectionForm().maxHeight"
              [nodeSize]="selectionForm().nodeSize"
              [appearance]="selectionForm().appearance"
              [shape]="selectionForm().shape"
              [showSelectionIndicator]="true"
              [indicatorPosition]="selectionForm().indicatorPosition"
              (itemSelect)="onItemSelect($event)"
            />
            @if (selectedItem()) {
              <p class="showcase__feedback">Selected: {{ selectedItem()?.node?.label }}</p>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Item Template</h2>
          <p class="showcase__section__description">
            Using custom template instead of Node component.
          </p>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="customTemplateDataSource"
              [pageSize]="15"
              [maxHeight]="'400px'"
              [useNodeComponent]="false"
            >
              <ng-template #itemTemplate let-item let-index="index">
                <div class="scroll-container-custom-item">
                  <span class="scroll-container-custom-item__index">#{{ index + 1 }}</span>
                  <div class="scroll-container-custom-item__content">
                    <div class="scroll-container-custom-item__label">{{ item.label }}</div>
                    @if (item.description) {
                      <div class="scroll-container-custom-item__description">
                        {{ item.description }}
                      </div>
                    }
                  </div>
                </div>
              </ng-template>
            </ui-scroll-container>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Node Size"
          sectionDescription="Three size options for node items: small, medium (default), and large."
          [formConfig]="nodeSizeDrawerFormConfig"
          [formValues]="nodeSizeFormValues()"
          (formValuesChange)="nodeSizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3>{{ size | titlecase }} Nodes</h3>
                <ui-scroll-container
                  [dataSource]="sizeDataSource"
                  [pageSize]="25"
                  [maxHeight]="'300px'"
                  [nodeSize]="size"
                  [appearance]="nodeSizeForm().appearance"
                  [shape]="nodeSizeForm().shape"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Visual style options: transparent, subtle, filled. Shape affects border radius."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3>{{ appearance | titlecase }}</h3>
                <ui-scroll-container
                  [dataSource]="variantDataSource"
                  [pageSize]="20"
                  [maxHeight]="'300px'"
                  [nodeSize]="appearanceForm().nodeSize"
                  [appearance]="appearance"
                  [shape]="appearanceForm().shape"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Border radius options: rounded (default), circular, and square."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3>{{ shape | titlecase }}</h3>
                <ui-scroll-container
                  [dataSource]="variantDataSource"
                  [pageSize]="20"
                  [maxHeight]="'300px'"
                  [nodeSize]="shapeForm().nodeSize"
                  [appearance]="shapeForm().appearance"
                  [shape]="shape"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="As Button"
          sectionDescription="Nodes rendered as buttons with click handling."
          [formConfig]="asButtonDrawerFormConfig"
          [formValues]="asButtonFormValues()"
          (formValuesChange)="asButtonFormValues.set($event)"
        >
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="buttonDataSource"
              [pageSize]="20"
              [maxHeight]="asButtonForm().maxHeight"
              [nodeSize]="asButtonForm().nodeSize"
              [appearance]="asButtonForm().appearance"
              [shape]="asButtonForm().shape"
              [asButton]="true"
              (itemClick)="onItemClick($event)"
            />
            @if (clickedItem()) {
              <p class="showcase__feedback">Clicked: {{ clickedItem()?.node?.label }}</p>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Programmatic Control</h2>
          <p class="showcase__section__description">
            Control scrolling and refresh data programmatically.
          </p>
          <div class="showcase__example">
            <div class="showcase__button-row">
              <ui-button (click)="scrollToTop()" size="small">Scroll to Top</ui-button>
              <ui-button (click)="scrollToBottom()" size="small">Scroll to Bottom</ui-button>
              <ui-button (click)="refresh()" size="small">Refresh</ui-button>
            </div>
            <ui-scroll-container
              #programmaticScroll
              [dataSource]="programmaticDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Event Logging</h2>
          <div class="showcase__example">
            <ui-scroll-container
              [dataSource]="eventDataSource"
              [pageSize]="20"
              [maxHeight]="'400px'"
              (loadMore)="onLoadMore()"
              (loadComplete)="onLoadComplete()"
            />
            <div class="showcase__feedback showcase__feedback--events">
              <p><strong>Load More Events:</strong> {{ loadMoreCount() }}</p>
              <p><strong>Load Complete:</strong> {{ loadCompleteCount() > 0 ? 'Yes' : 'No' }}</p>
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all scroll container options in real time. Change node size, appearance,
            shape, toggle selection indicator, as button mode, and more.
          </p>
          <app-scroll-container-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ScrollContainerShowcaseComponent {
  programmaticScroll = viewChild<ScrollContainerComponent>('programmaticScroll');

  sizes = SIZES;
  appearances = APPEARANCES;
  shapes = SHAPES;

  selectedItem = signal<{ item: MockItem; node: Node | null } | null>(null);
  clickedItem = signal<{ item: MockItem; node: Node | null } | null>(null);
  loadMoreCount = signal<number>(0);
  loadCompleteCount = signal<number>(0);

  overviewDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.overview;
  iconsDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.overview;
  selectionDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.overview;
  nodeSizeDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.nodeSize;
  appearanceDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.appearance;
  shapeDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.shape;
  asButtonDrawerFormConfig = SCROLL_CONTAINER_DRAWER_CONFIGS.overview;

  overviewFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    maxHeight: '400px',
    showSelectionIndicator: false,
    indicatorPosition: 'horizontal' as 'horizontal' | 'vertical',
    asButton: false,
    selectOnClick: true,
    orientation: 'vertical',
    scrollbarBehavior: 'auto',
  });

  overviewForm = computed(() => this.toForm(this.overviewFormValues()));

  iconsFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    maxHeight: '400px',
  });

  iconsForm = computed(() => this.toForm(this.iconsFormValues()));

  selectionFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    maxHeight: '400px',
    indicatorPosition: 'horizontal',
  });

  selectionForm = computed(() => this.toForm(this.selectionFormValues()));

  nodeSizeFormValues = signal<Record<string, unknown>>({
    appearance: 'subtle',
    shape: 'rounded',
  });

  nodeSizeForm = computed(() => this.toForm(this.nodeSizeFormValues()));

  appearanceFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    shape: 'rounded',
  });

  appearanceForm = computed(() => this.toForm(this.appearanceFormValues()));

  shapeFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
  });

  shapeForm = computed(() => this.toForm(this.shapeFormValues()));

  asButtonFormValues = signal<Record<string, unknown>>({
    nodeSize: 'medium',
    appearance: 'subtle',
    shape: 'rounded',
    maxHeight: '400px',
  });

  asButtonForm = computed(() => this.toForm(this.asButtonFormValues()));

  private toForm(v: Record<string, unknown>) {
    return {
      nodeSize: (v['nodeSize'] as Size) ?? 'medium',
      appearance: (v['appearance'] as Appearance) ?? 'subtle',
      shape: (v['shape'] as Shape) ?? 'rounded',
      maxHeight: (v['maxHeight'] as string) ?? '400px',
      showSelectionIndicator: !!v['showSelectionIndicator'],
      indicatorPosition: (v['indicatorPosition'] as 'horizontal' | 'vertical') ?? 'horizontal',
      asButton: !!v['asButton'],
      selectOnClick: v['selectOnClick'] !== false,
      orientation: v['orientation'] ?? 'vertical',
      scrollbarBehavior: v['scrollbarBehavior'] ?? 'auto',
    };
  }

  private generateMockItems(startId: number, count: number, withIcons = false): MockItem[] {
    const icons: IconName[] = [
      'home',
      'settings',
      'accessibility',
      'document',
      'folder',
      'image',
      'mail',
      'calendar',
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      label: `Item ${startId + i}`,
      icon: withIcons ? icons[(startId + i) % icons.length] : undefined,
      description: withIcons ? `Description for item ${startId + i}` : undefined,
    }));
  }

  private createDataSource(
    totalPages: number,
    withIcons = false,
  ): ScrollContainerDataSource<MockItem> {
    return (page: number, pageSize: number) => {
      const startId = (page - 1) * pageSize + 1;
      const items = this.generateMockItems(startId, pageSize, withIcons);
      return of({
        items,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalCount: totalPages * pageSize,
      }).pipe(delay(500));
    };
  }

  basicDataSource = this.createDataSource(5);
  iconDataSource = this.createDataSource(4, true);
  selectionDataSource = this.createDataSource(5, true);
  customTemplateDataSource = this.createDataSource(4, true);
  sizeDataSource = this.createDataSource(3, true);
  variantDataSource = this.createDataSource(3, true);
  buttonDataSource = this.createDataSource(5, true);
  programmaticDataSource = this.createDataSource(5, true);
  eventDataSource = this.createDataSource(3);

  onItemSelect(event: { item: MockItem; node: Node | null }): void {
    this.selectedItem.set(event);
  }

  onItemClick(event: { item: MockItem; node: Node | null }): void {
    this.clickedItem.set(event);
  }

  onLoadMore(): void {
    this.loadMoreCount.update(count => count + 1);
  }

  onLoadComplete(): void {
    this.loadCompleteCount.update(count => count + 1);
  }

  scrollToTop(): void {
    this.programmaticScroll()?.scrollToTop();
  }

  scrollToBottom(): void {
    this.programmaticScroll()?.scrollToBottom();
  }

  refresh(): void {
    this.programmaticScroll()?.refresh();
  }
}
