# Pagination

Pagination is best when users move through a known page model such as admin tables, search results, logs, and archives. This component supports compact prev and next navigation, numbered page windows with ellipsis compression, optional first and last jumps, and a page size selector powered by the shared dropdown.

## Import
```ts
import { PaginationComponent, type PaginationConfig } from 'ui';
```

## Basic page navigation
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-basic-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:44rem"
    >
      <div style="flex:1 1 22rem;min-width:18rem">
        <ui-pagination [config]="paginationConfig()" (pageChange)="currentPage.set($event)" />
      </div>

      <div
        style="min-width:13rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          State
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.375rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Current page</span>
            <strong>{{ currentPage() }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Total pages</span>
            <strong>{{ config.totalPages }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Total items</span>
            <strong>{{ config.totalItems }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaginationBasicExampleComponent {
  protected readonly currentPage = signal(3);

  protected readonly config: PaginationConfig = {
    currentPage: 3,
    totalPages: 12,
    totalItems: 234,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: false,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    ...this.config,
    currentPage: this.currentPage(),
  }));
}
```

## Page number window and ellipsis
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-windowing-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          Use a shorter visible window and ellipsis compression when the dataset is large enough
          that showing every page button would become noise.
        </div>
        <ui-pagination [config]="compactWindowConfig()" (pageChange)="currentPage.set($event)" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          A wider window is useful when pagination is one of the primary exploration controls in a
          data-heavy screen.
        </div>
        <ui-pagination [config]="wideWindowConfig()" (pageChange)="currentPage.set($event)" />
      </div>
    </div>
  `,
})
export class PaginationWindowingExampleComponent {
  protected readonly currentPage = signal(18);

  private readonly baseConfig: PaginationConfig = {
    currentPage: 18,
    totalPages: 48,
    totalItems: 960,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: false,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly compactWindowConfig = computed<PaginationConfig>(() => ({
    ...this.baseConfig,
    currentPage: this.currentPage(),
    maxVisiblePages: 5,
  }));

  protected readonly wideWindowConfig = computed<PaginationConfig>(() => ({
    ...this.baseConfig,
    currentPage: this.currentPage(),
    maxVisiblePages: 6,
  }));
}
```

## First and last jumps
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-first-last-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <ui-pagination
        [config]="withJumpConfig()"
        size="medium"
        (pageChange)="currentPage.set($event)"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:12rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Why use this
          </span>
          <span style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)">
            Faster jumps make sense when users routinely move across distant pages, such as audit
            logs or archived records.
          </span>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:8rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Current page
          </span>
          <strong style="font-size:0.9375rem">{{ currentPage() }}</strong>
        </div>
      </div>
    </div>
  `,
})
export class PaginationFirstLastExampleComponent {
  protected readonly currentPage = signal(27);

  private readonly config: PaginationConfig = {
    currentPage: 27,
    totalPages: 80,
    totalItems: 1600,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly withJumpConfig = computed<PaginationConfig>(() => ({
    ...this.config,
    currentPage: this.currentPage(),
  }));
}
```

## Page size selector
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-page-size-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Results explorer</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Let users change page size when they need to trade scan speed against row density.
        </div>
      </div>

      <ui-pagination
        [config]="paginationConfig()"
        (pageChange)="currentPage.set($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">Page</span>
          <strong>{{ currentPage() }}</strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Per page</span
          >
          <strong>{{ pageSize() }}</strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Total pages</span
          >
          <strong>{{ totalPages() }}</strong>
        </div>
      </div>
    </div>
  `,
})
export class PaginationPageSizeExampleComponent {
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(20);
  private readonly totalItems = 486;

  protected readonly totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize()));

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: this.totalPages(),
    totalItems: this.totalItems,
    pageSize: this.pageSize(),
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50, 100],
  }));

  protected onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
```

## Sizes and density
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-density-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          Small works in dense tables, medium is the default for most views, and large is better
          when pagination needs more touch room.
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.875rem">
        <ui-pagination [config]="config()" size="small" (pageChange)="currentPage.set($event)" />
        <ui-pagination [config]="config()" size="medium" (pageChange)="currentPage.set($event)" />
        <ui-pagination [config]="config()" size="large" (pageChange)="currentPage.set($event)" />
      </div>
    </div>
  `,
})
export class PaginationDensityExampleComponent {
  protected readonly currentPage = signal(4);

  protected readonly config = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: 14,
    totalItems: 280,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: false,
    showInfo: false,
    showPageSizeSelector: false,
  }));
}
```

## Results layout pattern
```ts
import { Component, computed, signal } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

type ResultRow = {
  title: string;
  owner: string;
  status: string;
};

const allRows: ResultRow[] = Array.from({ length: 57 }, (_, index) => ({
  title: `Quarterly report ${index + 1}`,
  owner: ['Ava Lopez', 'Nina Woods', 'Theo Murphy'][index % 3],
  status: ['Ready', 'Needs review', 'Draft'][index % 3],
}));

@Component({
  selector: 'app-pagination-results-layout-example',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-end;justify-content:space-between"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Reports</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Pair pagination with a real list so users can see scan rhythm, item count, and page
            changes in context.
          </div>
        </div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ visibleRows().length }} rows on this page
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;overflow:hidden"
      >
        @for (row of visibleRows(); track row.title) {
          <div
            style="display:flex;flex-wrap:wrap;gap:0.5rem 1rem;align-items:center;justify-content:space-between;padding:0.875rem 1rem;background:var(--color-neutral-background1-rest);border-bottom:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:12rem">
              <strong style="font-size:0.875rem">{{ row.title }}</strong>
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                {{ row.owner }}
              </span>
            </div>
            <span
              style="padding:0.125rem 0.5rem;border-radius:999px;background:var(--color-neutral-background3-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >
              {{ row.status }}
            </span>
          </div>
        }
      </div>

      <ui-pagination
        [config]="paginationConfig()"
        (pageChange)="currentPage.set($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />
    </div>
  `,
})
export class PaginationResultsLayoutExampleComponent {
  protected readonly currentPage = signal(2);
  protected readonly pageSize = signal(10);
  private readonly rows = allRows;

  protected readonly totalPages = computed(() => Math.ceil(this.rows.length / this.pageSize()));

  protected readonly visibleRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.rows.slice(start, start + this.pageSize());
  });

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: this.totalPages(),
    totalItems: this.rows.length,
    pageSize: this.pageSize(),
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50],
  }));

  protected onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
```

## Accessibility

### Navigation and current page
Pagination is a navigation pattern made of regular interactive controls rather than a single composite widget. The current numbered page button exposes `aria-current="page"` so assistive technology can identify the active slice.

| Element / state | Accessibility behavior |
| --- | --- |
| current page button | `aria-current="page"` |
| first / previous / next / last | explicit i18n-backed `aria-label` values |
| disabled jump buttons | native button disabled state |

### Keyboard
Pagination follows standard button and dropdown keyboard behavior. No extra roving or custom key model is added on top.

| Element | Keyboard behavior |
| --- | --- |
| numbered buttons | standard button keyboard support |
| previous / next / first / last | standard button keyboard support |
| page size selector | follows `DropdownComponent` keyboard behavior |

### Range info and page size selector
The optional range text gives screen-reader and sighted users the same dataset context, for example `Showing 41-50 of 200`. When the page size selector is enabled, its accessible behavior comes from the shared dropdown, so it should still be treated as a real field rather than decorative chrome.
