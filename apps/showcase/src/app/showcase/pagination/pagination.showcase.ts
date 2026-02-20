import { CommonModule } from '@angular/common';
import { Component, WritableSignal, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig, Size, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { PaginationInteractiveComponent } from './pagination.interactive';
import { PAGINATION_DRAWER_CONFIGS } from './pagination.showcase.config';

interface PaginationSectionForm {
  size: Size;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  maxVisiblePages: number;
  showPageNumbers: boolean;
  showFirstLast: boolean;
  showInfo: boolean;
  showPageSizeSelector: boolean;
}

@Component({
  selector: 'app-pagination-showcase',
  imports: [
    CommonModule,
    PaginationComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    PaginationInteractiveComponent,
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
        <app-showcase-header title="Pagination" />
        <p class="showcase__description">
          Pagination navigates paged datasets with configurable page numbers, first/last controls,
          info text, and optional page size selection.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core pagination setup with size, data range, page number visibility, and optional helper controls."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <ui-pagination
            [config]="overviewConfig()"
            [size]="overviewForm().size"
            (pageChange)="overviewPage.set($event)"
            (pageSizeChange)="onOverviewPageSizeChange($event)"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Info"
          sectionDescription="Info text shows current item range and total count. Keep it on when users need context in large datasets."
          [formConfig]="infoDrawerFormConfig"
          [formValues]="infoFormValues()"
          (formValuesChange)="infoFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Info On</h3>
              <ui-pagination
                [config]="infoOnConfig()"
                [size]="infoForm().size"
                (pageChange)="infoPage.set($event)"
                (pageSizeChange)="onInfoPageSizeChange($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Info Off</h3>
              <ui-pagination
                [config]="infoOffConfig()"
                [size]="infoForm().size"
                (pageChange)="infoPage.set($event)"
                (pageSizeChange)="onInfoPageSizeChange($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="First/Last Navigation"
          sectionDescription="Enable first and last buttons for faster jumps across long page ranges."
          [formConfig]="firstLastDrawerFormConfig"
          [formValues]="firstLastFormValues()"
          (formValuesChange)="firstLastFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">First/Last On</h3>
              <ui-pagination
                [config]="firstLastOnConfig()"
                [size]="firstLastForm().size"
                (pageChange)="firstLastPage.set($event)"
                (pageSizeChange)="onFirstLastPageSizeChange($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">First/Last Off</h3>
              <ui-pagination
                [config]="firstLastOffConfig()"
                [size]="firstLastForm().size"
                (pageChange)="firstLastPage.set($event)"
                (pageSizeChange)="onFirstLastPageSizeChange($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Page Size Selector"
          sectionDescription="Page size selector lets users control density by changing records per page."
          [formConfig]="pageSizeSelectorDrawerFormConfig"
          [formValues]="pageSizeSelectorFormValues()"
          (formValuesChange)="pageSizeSelectorFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Selector On</h3>
              <ui-pagination
                [config]="pageSizeSelectorOnConfig()"
                [size]="pageSizeSelectorForm().size"
                (pageChange)="pageSizeSelectorPage.set($event)"
                (pageSizeChange)="onPageSizeSelectorChange($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Selector Off</h3>
              <ui-pagination
                [config]="pageSizeSelectorOffConfig()"
                [size]="pageSizeSelectorForm().size"
                (pageChange)="pageSizeSelectorPage.set($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Page Numbers"
          sectionDescription="Hide page numbers for compact previous/next navigation, or show them for direct page access."
          [formConfig]="pageNumbersDrawerFormConfig"
          [formValues]="pageNumbersFormValues()"
          (formValuesChange)="pageNumbersFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Numbers On</h3>
              <ui-pagination
                [config]="pageNumbersOnConfig()"
                [size]="pageNumbersForm().size"
                (pageChange)="pageNumbersPage.set($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Numbers Off</h3>
              <ui-pagination
                [config]="pageNumbersOffConfig()"
                [size]="pageNumbersForm().size"
                (pageChange)="pageNumbersPage.set($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Compare small, medium, and large pagination sizing with shared behavior and data options."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Small</h3>
              <ui-pagination
                [config]="smallConfig()"
                size="small"
                (pageChange)="smallPage.set($event)"
                (pageSizeChange)="onSizeSectionPageSizeChange($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Medium</h3>
              <ui-pagination
                [config]="mediumConfig()"
                size="medium"
                (pageChange)="mediumPage.set($event)"
                (pageSizeChange)="onSizeSectionPageSizeChange($event)"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Large</h3>
              <ui-pagination
                [config]="largeConfig()"
                size="large"
                (pageChange)="largePage.set($event)"
                (pageSizeChange)="onSizeSectionPageSizeChange($event)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Typical setup with page and page-size handling.
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test all pagination options in one place and inspect emitted page-change events.
          </p>
          <app-pagination-interactive />
        </section>
      </div>
    </div>
  `,
})
export class PaginationShowcaseComponent {
  overviewDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.overview;
  infoDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.info;
  firstLastDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.firstLast;
  pageSizeSelectorDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.pageSizeSelector;
  pageNumbersDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.pageNumbers;
  sizeDrawerFormConfig = PAGINATION_DRAWER_CONFIGS.size;

  overviewPage = signal(3);
  infoPage = signal(2);
  firstLastPage = signal(5);
  pageSizeSelectorPage = signal(1);
  pageNumbersPage = signal(50);
  smallPage = signal(2);
  mediumPage = signal(2);
  largePage = signal(2);

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    maxVisiblePages: 7,
    showPageNumbers: true,
    showFirstLast: false,
    showInfo: false,
    showPageSizeSelector: false,
  });

  infoFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    maxVisiblePages: 7,
    showPageNumbers: true,
    showFirstLast: false,
    showPageSizeSelector: false,
  });

  firstLastFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    totalPages: 20,
    totalItems: 200,
    pageSize: 10,
    maxVisiblePages: 7,
    showPageNumbers: true,
    showInfo: true,
    showPageSizeSelector: false,
  });

  pageSizeSelectorFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    maxVisiblePages: 7,
    showPageNumbers: true,
    showFirstLast: true,
    showInfo: true,
  });

  pageNumbersFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    totalPages: 100,
    totalItems: 1000,
    pageSize: 10,
    maxVisiblePages: 7,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: false,
  });

  sizeFormValues = signal<Record<string, unknown>>({
    totalPages: 10,
    totalItems: 100,
    pageSize: 10,
    maxVisiblePages: 7,
    showPageNumbers: true,
    showFirstLast: false,
    showInfo: false,
    showPageSizeSelector: false,
  });

  overviewForm = computed(() => this.toForm(this.overviewFormValues()));
  infoForm = computed(() => this.toForm(this.infoFormValues()));
  firstLastForm = computed(() => this.toForm(this.firstLastFormValues()));
  pageSizeSelectorForm = computed(() => this.toForm(this.pageSizeSelectorFormValues()));
  pageNumbersForm = computed(() => this.toForm(this.pageNumbersFormValues()));
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));

  overviewConfig = computed(() => this.createConfig(this.overviewForm(), this.overviewPage()));

  infoOnConfig = computed(() =>
    this.createConfig(this.infoForm(), this.infoPage(), { showInfo: true }),
  );
  infoOffConfig = computed(() =>
    this.createConfig(this.infoForm(), this.infoPage(), { showInfo: false }),
  );

  firstLastOnConfig = computed(() =>
    this.createConfig(this.firstLastForm(), this.firstLastPage(), { showFirstLast: true }),
  );
  firstLastOffConfig = computed(() =>
    this.createConfig(this.firstLastForm(), this.firstLastPage(), { showFirstLast: false }),
  );

  pageSizeSelectorOnConfig = computed(() =>
    this.createConfig(this.pageSizeSelectorForm(), this.pageSizeSelectorPage(), {
      showPageSizeSelector: true,
    }),
  );
  pageSizeSelectorOffConfig = computed(() =>
    this.createConfig(this.pageSizeSelectorForm(), this.pageSizeSelectorPage(), {
      showPageSizeSelector: false,
    }),
  );

  pageNumbersOnConfig = computed(() =>
    this.createConfig(this.pageNumbersForm(), this.pageNumbersPage(), { showPageNumbers: true }),
  );
  pageNumbersOffConfig = computed(() =>
    this.createConfig(this.pageNumbersForm(), this.pageNumbersPage(), { showPageNumbers: false }),
  );

  smallConfig = computed(() => this.createConfig(this.sizeForm(), this.smallPage()));
  mediumConfig = computed(() => this.createConfig(this.sizeForm(), this.mediumPage()));
  largeConfig = computed(() => this.createConfig(this.sizeForm(), this.largePage()));

  usageExample = `import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, type PaginationConfig } from 'ui';

@Component({
  selector: 'app-users-list',
  imports: [PaginationComponent],
  template: \`
    <ui-pagination
      [config]="paginationConfig()"
      size="medium"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    />
  \`,
})
export class UsersListComponent {
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(420);

  paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    pageSize: this.pageSize(),
    totalItems: this.totalItems(),
    totalPages: Math.ceil(this.totalItems() / this.pageSize()),
    showPageNumbers: true,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50, 100],
    maxVisiblePages: 7,
  }));

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }

  private loadData(): void {
    // fetch page data here
  }
}`;

  onOverviewPageSizeChange(size: number): void {
    this.overviewPage.set(1);
    this.updatePageSizeAndPages(this.overviewFormValues, size);
  }

  onInfoPageSizeChange(size: number): void {
    this.infoPage.set(1);
    this.updatePageSizeAndPages(this.infoFormValues, size);
  }

  onFirstLastPageSizeChange(size: number): void {
    this.firstLastPage.set(1);
    this.updatePageSizeAndPages(this.firstLastFormValues, size);
  }

  onPageSizeSelectorChange(size: number): void {
    this.pageSizeSelectorPage.set(1);
    this.updatePageSizeAndPages(this.pageSizeSelectorFormValues, size);
  }

  onSizeSectionPageSizeChange(size: number): void {
    this.smallPage.set(1);
    this.mediumPage.set(1);
    this.largePage.set(1);
    this.updatePageSizeAndPages(this.sizeFormValues, size);
  }

  private toForm(values: Record<string, unknown>): PaginationSectionForm {
    return {
      size: this.toSize(values['size']),
      totalPages: this.toNumber(values['totalPages'], 10),
      totalItems: this.toNumber(values['totalItems'], 100),
      pageSize: this.toNumber(values['pageSize'], 10),
      maxVisiblePages: this.toNumber(values['maxVisiblePages'], 7),
      showPageNumbers: this.toBoolean(values['showPageNumbers'], true),
      showFirstLast: this.toBoolean(values['showFirstLast'], false),
      showInfo: this.toBoolean(values['showInfo'], false),
      showPageSizeSelector: this.toBoolean(values['showPageSizeSelector'], false),
    };
  }

  private createConfig(
    form: PaginationSectionForm,
    page: number,
    overrides: Partial<PaginationConfig> = {},
  ): PaginationConfig {
    const totalPages = Math.max(1, form.totalPages);
    return {
      currentPage: Math.min(totalPages, Math.max(1, page)),
      totalPages,
      totalItems: Math.max(form.totalItems, form.pageSize),
      pageSize: form.pageSize,
      showPageNumbers: form.showPageNumbers,
      showFirstLast: form.showFirstLast,
      showInfo: form.showInfo,
      showPageSizeSelector: form.showPageSizeSelector,
      pageSizeOptions: [5, 10, 20, 50, 100],
      maxVisiblePages: form.maxVisiblePages,
      ...overrides,
    };
  }

  private updatePageSizeAndPages(
    formSignal: WritableSignal<Record<string, unknown>>,
    size: number,
  ): void {
    formSignal.update(values => {
      const totalItems = this.toNumber(values['totalItems'], 100);
      const totalPages = Math.max(1, Math.ceil(totalItems / size));
      return {
        ...values,
        pageSize: size,
        totalPages,
      };
    });
  }

  private toSize(value: unknown): Size {
    return value === 'small' || value === 'large' ? value : 'medium';
  }

  private toNumber(value: unknown, fallback: number): number {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return fallback;
    }
    return Math.max(1, Math.floor(numeric));
  }

  private toBoolean(value: unknown, fallback: boolean): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    return fallback;
  }
}
