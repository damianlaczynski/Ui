# Breadcrumb

Breadcrumb is a standalone navigation component driven by an array of items. It supports icons, semantic variant and appearance tokens, selected and disabled items, optional selection indicators, truncation for long labels, arrow-key focus mode, and overflow compression through an inline menu.

## Import
```ts
import { BreadcrumbComponent } from 'ui';
```

## Basic path navigation
```ts
import { Component, signal } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const FULL_PATH: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'workspace', label: 'Workspace', icon: 'folder' },
  { id: 'product', label: 'Product', icon: 'folder' },
  { id: 'settings', label: 'Settings', icon: 'settings', selected: true },
];

@Component({
  selector: 'app-breadcrumb-basic-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="path()"
        appearance="subtle"
        [responsiveOverflow]="false"
        (itemClick)="navigate($event)"
      />

      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Click an ancestor item to jump back to that level.
      </div>
    </div>
  `,
})
export class BreadcrumbBasicExampleComponent {
  protected readonly path = signal<Breadcrumb[]>(FULL_PATH);

  protected navigate(item: Breadcrumb): void {
    const index = FULL_PATH.findIndex(entry => entry.id === item.id);
    this.path.set(
      FULL_PATH.slice(0, index + 1).map((entry, currentIndex, arr) => ({
        ...entry,
        selected: currentIndex === arr.length - 1,
      })),
    );
  }
}
```

## Appearance, variant, and icons
```ts
import { Component } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const ITEMS: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'design-system', label: 'Design system', icon: 'grid' },
  { id: 'navigation', label: 'Navigation', icon: 'navigation' },
  { id: 'breadcrumb', label: 'Breadcrumb', icon: 'chevron_right', selected: true },
];

@Component({
  selector: 'app-breadcrumb-styles-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="items"
        appearance="subtle"
        variant="primary"
        [showIcons]="true"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="items"
        appearance="outline"
        variant="secondary"
        [showIcons]="false"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="items"
        appearance="filled"
        variant="info"
        [showIcons]="true"
        shape="circular"
        [responsiveOverflow]="false"
      />
    </div>
  `,
})
export class BreadcrumbStylesExampleComponent {
  protected readonly items = ITEMS;
}
```

## Selected, disabled, and indicators
```ts
import { Component } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

@Component({
  selector: 'app-breadcrumb-states-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="selectedItems"
        appearance="subtle"
        [showSelectionIndicator]="true"
        [responsiveOverflow]="false"
      />

      <ui-breadcrumb
        [items]="disabledItems"
        appearance="subtle"
        [showSelectionIndicator]="true"
        indicatorPosition="vertical"
        [responsiveOverflow]="false"
      />
    </div>
  `,
})
export class BreadcrumbStatesExampleComponent {
  protected readonly selectedItems: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'account', label: 'Account', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'shield', selected: true },
  ];

  protected readonly disabledItems: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'region', label: 'Restricted region', icon: 'globe', disabled: true },
    { id: 'details', label: 'Details', icon: 'info', selected: true },
  ];
}
```

## Overflow menu, truncation, and focus mode
```ts
import { Component } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

@Component({
  selector: 'app-breadcrumb-overflow-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.875rem;font-weight:600">Hidden middle items in overflow menu</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          This keeps the start and current location visible while intermediate levels move into the
          overflow menu.
        </div>
      </div>
      <ui-breadcrumb
        [items]="longPath"
        appearance="subtle"
        [showIcons]="true"
        [maxDisplayedItems]="4"
        [responsiveOverflow]="false"
      />

      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.875rem;font-weight:600">Resizable container with truncation</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Shrink the frame to force a tighter layout, then use arrow keys to move across visible
          items.
        </div>
      </div>
      <div
        style="width:20rem;min-width:14rem;max-width:100%;overflow:hidden;resize:horizontal;padding:0.75rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem"
      >
        <ui-breadcrumb
          [items]="longPath"
          appearance="subtle"
          [showIcons]="true"
          [responsiveOverflow]="true"
          [truncateLength]="18"
          focusMode="arrow"
        />
      </div>
    </div>
  `,
})
export class BreadcrumbOverflowExampleComponent {
  protected readonly longPath: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'clients', label: 'Enterprise clients', icon: 'people' },
    { id: 'europe', label: 'Europe region accounts', icon: 'globe' },
    { id: 'contracts', label: 'Long-running renewal contracts', icon: 'document' },
    { id: 'current', label: 'Final approval checklist', icon: 'checkmark_circle', selected: true },
  ];
}
```

## Workspace navigation pattern
```ts
import { Component, signal } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const FULL_WORKSPACE_PATH: Breadcrumb[] = [
  { id: 'root', label: 'Workspace', icon: 'grid' },
  { id: 'teams', label: 'Engineering', icon: 'people' },
  { id: 'platform', label: 'Platform', icon: 'folder' },
  { id: 'release', label: 'Release coordination', icon: 'calendar' },
  { id: 'docs', label: 'Runbooks', icon: 'book', selected: true },
];

@Component({
  selector: 'app-breadcrumb-workspace-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="path()"
        appearance="transparent"
        [showIcons]="true"
        [responsiveOverflow]="false"
        (itemClick)="navigate($event)"
      />

      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Runbooks</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Operational procedures, rollback notes, and escalation paths for the platform team.
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbWorkspaceExampleComponent {
  protected readonly path = signal<Breadcrumb[]>(FULL_WORKSPACE_PATH);

  protected navigate(item: Breadcrumb): void {
    const index = FULL_WORKSPACE_PATH.findIndex(entry => entry.id === item.id);
    this.path.set(
      FULL_WORKSPACE_PATH.slice(0, index + 1).map((entry, currentIndex, arr) => ({
        ...entry,
        selected: currentIndex === arr.length - 1,
      })),
    );
  }
}
```

## Project header composition
```ts
import { Component } from '@angular/core';
import { BreadcrumbComponent, ButtonComponent, type Breadcrumb } from 'ui';

@Component({
  selector: 'app-breadcrumb-project-header-example',
  standalone: true,
  imports: [BreadcrumbComponent, ButtonComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="items"
        appearance="subtle"
        [showIcons]="true"
        [showSelectionIndicator]="true"
        [responsiveOverflow]="false"
      />

      <div style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap">
        <div style="display:flex;flex-direction:column;gap:0.35rem;min-width:16rem">
          <div style="font-size:1rem;font-weight:600">Migration plan review</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Final content pass before the May release freeze. 3 approvals still pending.
          </div>
        </div>

        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <ui-button type="button" variant="secondary" appearance="outline">Share</ui-button>
          <ui-button type="button" variant="primary">Open board</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbProjectHeaderExampleComponent {
  protected readonly items: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'programs', label: 'Programs', icon: 'briefcase' },
    { id: 'migration', label: 'Migration', icon: 'arrow_swap' },
    { id: 'review', label: 'Review', icon: 'clipboard_task', selected: true },
  ];
}
```

## Accessibility

### Navigation landmark
The component renders a `nav` with an aria label. Keep that label specific when several navigation landmarks exist on the same page.

| Element | Behavior |
| --- | --- |
| root container | `nav` landmark |
| `ariaLabel` | labels the landmark |
| current item | exposed within the same navigation path |

### Keyboard
Use the default tab model unless roving arrow focus solves a real product need.

| Focus mode | Keys |
| --- | --- |
| `tab` | normal `Tab` order across interactive items |
| `arrow` | `ArrowLeft`, `ArrowRight`, `Home`, `End` |
| overflow menu | follows the menu component keyboard model |

### Current page, disabled items, and overflow
Selected items render with `aria-current="page"` so assistive technology can identify the current location in the path. Disabled items stay visible for orientation but should not behave like active navigation targets.

| State | Attribute / behavior |
| --- | --- |
| current page | `aria-current="page"` |
| disabled item | non-interactive presentation |
| overflowed middle items | moved into an inline menu |
