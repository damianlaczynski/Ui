import { Component, computed, signal, viewChild } from '@angular/core';
import { PaginationComponent, PaginationConfig, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { PAGINATION_SHOWCASE_CONFIG } from './pagination.showcase.config';

@Component({
  selector: 'app-pagination-interactive',
  imports: [PaginationComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-pagination
          [config]="interactiveConfig()"
          [size]="currentSize()"
          (pageChange)="onPageChange($event)"
          (pageSizeChange)="onPageSizeChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class PaginationInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = PAGINATION_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
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

  private currentPage = signal<number>(1);
  private currentPageSize = signal<number>(10);

  currentSize = computed(() => this.asSize(this.values()['size']));

  interactiveConfig = computed<PaginationConfig>(() => {
    const values = this.values();
    const totalPages = this.toNumber(values['totalPages'], 10);
    const totalItems = this.toNumber(values['totalItems'], 100);
    const maxVisiblePages = this.toNumber(values['maxVisiblePages'], 7);
    const showPageNumbers = this.toBoolean(values['showPageNumbers'], true);
    const showFirstLast = this.toBoolean(values['showFirstLast'], false);
    const showInfo = this.toBoolean(values['showInfo'], false);
    const showPageSizeSelector = this.toBoolean(values['showPageSizeSelector'], false);

    const pageSize = this.toNumber(this.currentPageSize(), this.toNumber(values['pageSize'], 10));
    const normalizedPage = Math.min(totalPages, Math.max(1, this.currentPage()));

    return {
      currentPage: normalizedPage,
      totalPages,
      totalItems,
      pageSize,
      showPageNumbers,
      showFirstLast,
      showInfo,
      showPageSizeSelector,
      pageSizeOptions: [5, 10, 20, 50, 100],
      maxVisiblePages,
    };
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);

    const pageSize = this.toNumber(newValues['pageSize'], 10);
    this.currentPageSize.set(pageSize);

    const totalPages = this.toNumber(newValues['totalPages'], 10);
    const requestedPage = this.toNumber(newValues['currentPage'], this.currentPage());
    this.currentPage.set(Math.min(totalPages, Math.max(1, requestedPage)));
  }

  onReset(): void {
    this.showcase()?.logEvent('reset');
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.showcase()?.logEvent('pageChange', { page });
  }

  onPageSizeChange(size: number): void {
    this.currentPageSize.set(size);
    this.currentPage.set(1);
    this.showcase()?.logEvent('pageSizeChange', { pageSize: size, currentPage: 1 });
  }

  private asSize(value: unknown): Size {
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
