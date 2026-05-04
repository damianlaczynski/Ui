import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { NavComponent, NavNode, RadioButtonGroupComponent } from 'ui';
import { filter } from 'rxjs/operators';
import { SearchComponent } from 'ui';
import { FormsModule } from '@angular/forms';
import type { RadioButtonItem } from 'ui';

type SidebarViewMode = 'functional' | 'visual' | 'alphabetical';

@Component({
  selector: 'app-ds-sidebar',
  imports: [NavComponent, SearchComponent, RadioButtonGroupComponent, FormsModule],
  templateUrl: './ds-sidebar.component.html',
  host: {
    class: 'ds-sidebar-host',
  },
})
export class DsSidebarComponent {
  private readonly router = inject(Router);
  selectedItemId = signal<string | null>(null);
  private _searchQuery = signal<string>('');
  private _viewMode = signal<SidebarViewMode>('functional');

  get searchQuery(): string {
    return this._searchQuery();
  }

  set searchQuery(value: string) {
    this._searchQuery.set(value);
  }

  get viewMode(): SidebarViewMode {
    return this._viewMode();
  }

  set viewMode(value: SidebarViewMode) {
    this._viewMode.set(value);
  }

  readonly viewModeOptions: RadioButtonItem[] = [
    { id: 'functional', label: 'Functional', value: 'functional' },
    { id: 'visual', label: 'Visual', value: 'visual' },
    { id: 'alphabetical', label: 'A-Z', value: 'alphabetical' },
  ];

  private readonly componentsCatalog: NavNode[] = [
    { id: 'getting-started', label: 'Getting Started', icon: 'rocket' },
    { id: 'installation', label: 'Installation', icon: 'arrow_download' },
    { id: 'i18n', label: 'i18n', icon: 'location' },
    { id: 'roadmap', label: 'Roadmap', icon: 'timeline' },
    { id: 'accordion', label: 'Accordion', icon: 'slide_text' },
    { id: 'avatar', label: 'Avatar', icon: 'person' },
    { id: 'badge', label: 'Badge', icon: 'badge' },
    { id: 'breadcrumb', label: 'Breadcrumb', icon: 'arrow_routing' },
    { id: 'button', label: 'Button', icon: 'button' },
    { id: 'card', label: 'Card', icon: 'contact_card' },
    { id: 'carousel', label: 'Carousel', icon: 'arrow_circle_right' },
    { id: 'checkbox', label: 'Checkbox', icon: 'checkbox_checked' },
    { id: 'color', label: 'Color', icon: 'color' },
    { id: 'command-palette', label: 'Command Palette', icon: 'keyboard' },
    { id: 'data-grid', label: 'Data Grid', icon: 'table' },
    {
      id: 'date-and-time',
      label: 'Date and Time',
      icon: 'calendar_clock',
      hasChildren: true,
      children: [
        { id: 'datetime', label: 'Datetime', icon: 'calendar_clock' },
        { id: 'date', label: 'Date', icon: 'calendar' },
        { id: 'month', label: 'Month', icon: 'calendar_month' },
        { id: 'week', label: 'Week', icon: 'calendar_week_numbers' },
        { id: 'time', label: 'Time', icon: 'clock' },
        { id: 'time-picker', label: 'Time Picker', icon: 'clock' },
        { id: 'date-range', label: 'Date Range', icon: 'calendar_month' },
        { id: 'time-span', label: 'Time Span', icon: 'timer' },
        { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
      ],
    },
    { id: 'dialog', label: 'Dialog', icon: 'window' },
    { id: 'divider', label: 'Divider', icon: 'divider_tall' },
    { id: 'drawer', label: 'Drawer', icon: 'panel_left' },
    { id: 'dropdown', label: 'Dropdown', icon: 'apps_list' },
    { id: 'email', label: 'Email', icon: 'mail' },
    { id: 'file', label: 'File', icon: 'document' },
    { id: 'icon', label: 'Icon', icon: 'star' },
    { id: 'kbd', label: 'Kbd', icon: 'keyboard' },
    { id: 'menu', label: 'Menu', icon: 'group_list' },
    { id: 'message-bar', label: 'Message Bar', icon: 'alert_badge' },
    { id: 'nav', label: 'Nav', icon: 'navigation' },
    { id: 'node', label: 'Node', icon: 'circle' },
    { id: 'number', label: 'Number', icon: 'number_row' },
    { id: 'pagination', label: 'Pagination', icon: 'page_fit' },
    { id: 'password', label: 'Password', icon: 'password' },
    { id: 'progress-bar', label: 'Progress Bar', icon: 'spacebar' },
    { id: 'radio-button-group', label: 'Radio Button Group', icon: 'checkmark_circle' },
    { id: 'rating', label: 'Rating', icon: 'star' },
    { id: 'scroll-container', label: 'Scroll Container', icon: 'dual_screen_vertical_scroll' },
    { id: 'scroll-panel', label: 'Scroll Panel', icon: 'dual_screen_vertical_scroll' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'skeleton', label: 'Skeleton', icon: 'checkbox_indeterminate' },
    { id: 'slider', label: 'Slider', icon: 'arrow_maximize' },
    { id: 'speed-dial', label: 'Speed dial', icon: 'add_circle' },
    { id: 'range', label: 'Range', icon: 'arrow_bidirectional_left_right' },
    { id: 'spinner', label: 'Spinner', icon: 'replay' },
    { id: 'splitter', label: 'Splitter', icon: 'split_vertical' },
    {
      id: 'state',
      label: 'State',
      icon: 'database',
      hasChildren: true,
      children: [
        { id: 'empty-state', label: 'Empty State', icon: 'document_dismiss' },
        { id: 'error-state', label: 'Error State', icon: 'error_circle' },
        { id: 'loading-state', label: 'Loading State', icon: 'arrow_sync' },
        { id: 'state-container', label: 'State Container', icon: 'database' },
      ],
    },
    { id: 'stepper', label: 'Stepper', icon: 'timeline' },
    { id: 'switch', label: 'Switch', icon: 'tap_single' },
    { id: 'table-of-content', label: 'Table of Content', icon: 'list' },
    { id: 'tabs', label: 'Tabs', icon: 'tabs' },
    { id: 'tag', label: 'Tag', icon: 'tag' },
    { id: 'tel', label: 'Tel', icon: 'call' },
    { id: 'text', label: 'Text', icon: 'text_align_left' },
    { id: 'textarea', label: 'Textarea', icon: 'text_field' },
    { id: 'toast', label: 'Toast', icon: 'alert' },
    { id: 'toolbar', label: 'Toolbar', icon: 'navigation' },
    { id: 'totp', label: 'TOTP', icon: 'lock_closed' },
    { id: 'tree', label: 'Tree', icon: 'text_bullet_list_tree' },
    { id: 'tree-node', label: 'Tree Node', icon: 'rectangle_landscape' },
    { id: 'tooltip', label: 'Tooltip', icon: 'info' },
    { id: 'url', label: 'URL', icon: 'link' },
    { id: 'video', label: 'Video', icon: 'video' },
  ];

  private readonly itemById = new Map(this.componentsCatalog.map(item => [String(item.id), item]));

  private readonly baseNavItems = computed<NavNode[]>(() => {
    switch (this._viewMode()) {
      case 'visual':
        return this.buildVisualGroups();
      case 'alphabetical':
        return this.buildAlphabeticalList();
      case 'functional':
      default:
        return this.buildFunctionalGroups();
    }
  });

  filteredNavItems = computed<NavNode[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const source = this.baseNavItems();

    if (!query) {
      return source;
    }

    const result: NavNode[] = [];
    let currentHeader: NavNode | null = null;
    let sectionBuffer: NavNode[] = [];

    const flushSection = () => {
      if (sectionBuffer.length === 0) {
        return;
      }

      if (currentHeader) {
        result.push(currentHeader);
      }
      result.push(...sectionBuffer);
      sectionBuffer = [];
    };

    for (const item of source) {
      if (item.isSectionHeader) {
        flushSection();
        currentHeader = this.cloneNode(item);
        continue;
      }

      const filteredNode = this.filterNodeByQuery(item, query);
      if (filteredNode) {
        sectionBuffer.push(filteredNode);
      }
    }

    flushSection();
    return result;
  });

  navItems = computed<NavNode[]>(() => {
    return this.filteredNavItems().map(item => this.buildNavNode(item));
  });

  constructor() {
    this.syncSelectedItemFromUrl(this.router.url);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.syncSelectedItemFromUrl(event.urlAfterRedirects);
    });
  }

  private buildFunctionalGroups(): NavNode[] {
    return [
      ...this.section('documentation', 'Documentation', [
        'getting-started',
        'installation',
        'i18n',
        'roadmap',
      ]),
      ...this.section('form-controls', 'Form Controls', [
        'checkbox',
        'color',
        'date-and-time',
        'dropdown',
        'email',
        'file',
        'number',
        'password',
        'radio-button-group',
        'rating',
        'search',
        'slider',
        'range',
        'switch',
        'tel',
        'text',
        'textarea',
        'totp',
        'url',
      ]),
      ...this.section('navigation', 'Navigation', [
        'menu',
        'speed-dial',
        'nav',
        'tabs',
        'toolbar',
        'breadcrumb',
        'stepper',
      ]),
      ...this.section('layout', 'Layout', [
        'accordion',
        'card',
        'dialog',
        'divider',
        'drawer',
        'scroll-container',
        'scroll-panel',
        'splitter',
      ]),
      ...this.section('feedback', 'Feedback', [
        'message-bar',
        'progress-bar',
        'skeleton',
        'spinner',
        'toast',
      ]),
      ...this.section('data-display', 'Data Display', [
        'data-grid',
        'icon',
        'kbd',
        'node',
        'pagination',
        'state',
        'table-of-content',
        'tooltip',
        'tree',
        'tree-node',
        'avatar',
      ]),
      ...this.section('actions-media', 'Actions & Media', [
        'button',
        'tag',
        'carousel',
        'command-palette',
        'video',
      ]),
    ];
  }

  private buildVisualGroups(): NavNode[] {
    return [
      ...this.section('text-inputs', 'Text Inputs', [
        'text',
        'textarea',
        'email',
        'password',
        'search',
        'url',
        'tel',
        'totp',
        'number',
      ]),
      ...this.section('choice-selection', 'Choice & Selection', [
        'checkbox',
        'radio-button-group',
        'switch',
        'slider',
        'range',
        'rating',
        'dropdown',
        'date-and-time',
      ]),
      ...this.section('surface-layout', 'Surfaces & Layout', [
        'accordion',
        'card',
        'dialog',
        'drawer',
        'divider',
        'splitter',
        'scroll-container',
        'scroll-panel',
      ]),
      ...this.section('navigation-structures', 'Navigation Structures', [
        'menu',
        'speed-dial',
        'nav',
        'tabs',
        'toolbar',
        'breadcrumb',
        'stepper',
        'table-of-content',
        'pagination',
      ]),
      ...this.section('status-feedback', 'Status & Feedback', [
        'state',
        'progress-bar',
        'spinner',
        'skeleton',
        'toast',
        'message-bar',
      ]),
      ...this.section('data-specialized', 'Data & Specialized', [
        'data-grid',
        'tree',
        'tree-node',
        'node',
        'icon',
        'kbd',
        'tooltip',
        'badge',
        'tag',
        'avatar',
        'button',
        'color',
        'carousel',
        'video',
        'file',
        'command-palette',
        'getting-started',
        'installation',
        'i18n',
        'roadmap',
      ]),
    ];
  }

  private buildAlphabeticalList(): NavNode[] {
    const items = this.componentsCatalog
      .map(item => this.cloneNode(item))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ id: 'alphabetical-header', isSectionHeader: true, label: 'A-Z' }, ...items];
  }

  private section(sectionId: string, label: string, ids: string[]): NavNode[] {
    const items = ids
      .map(id => this.getCatalogItem(id))
      .filter((item): item is NavNode => !!item)
      .map(item => this.cloneNode(item));

    if (items.length === 0) {
      return [];
    }

    return [{ id: `${sectionId}-header`, isSectionHeader: true, label }, ...items];
  }

  private getCatalogItem(id: string): NavNode | null {
    return this.itemById.get(id) ?? null;
  }

  private cloneNode(node: NavNode): NavNode {
    return {
      ...node,
      children: node.children?.map(child => this.cloneNode(child)),
    };
  }

  private filterNodeByQuery(item: NavNode, query: string): NavNode | null {
    const labelMatch = item.label.toLowerCase().includes(query);

    if (!item.children?.length) {
      return labelMatch ? this.cloneNode(item) : null;
    }

    const matchedChildren = item.children
      .map(child => this.filterNodeByQuery(child, query))
      .filter((child): child is NavNode => !!child);

    if (labelMatch || matchedChildren.length > 0) {
      return {
        ...this.cloneNode(item),
        children: matchedChildren.length > 0 ? matchedChildren : item.children,
      };
    }

    return null;
  }

  private syncSelectedItemFromUrl(url: string): void {
    const activeId = this.getLastPrimarySegment(url);
    if (!activeId) {
      this.selectedItemId.set(null);
      return;
    }

    const match = this.findNavItemById(activeId, this.componentsCatalog);
    this.selectedItemId.set(match ? (match.id as string) : null);
  }

  private findNavItemById(id: string, items: NavNode[]): NavNode | null {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }

      if (item.children?.length) {
        const childMatch = this.findNavItemById(id, item.children);
        if (childMatch) {
          return childMatch;
        }
      }
    }

    return null;
  }

  private getLastPrimarySegment(url: string): string | null {
    try {
      const tree = this.router.parseUrl(url);
      const primarySegments: UrlSegment[] = tree.root.children['primary']?.segments ?? [];
      if (primarySegments.length === 0) {
        return null;
      }
      return primarySegments[primarySegments.length - 1].path;
    } catch {
      const normalized = url.split(/[?#]/)[0].replace(/\/+$/, '');
      const parts = normalized.split('/').filter(Boolean);
      return parts.length > 0 ? parts[parts.length - 1] : null;
    }
  }

  private buildNavNode(item: NavNode): NavNode {
    if (item.isSectionHeader || item.isDivider) {
      return item;
    }

    const itemId = String(item.id);
    const hasChildren = !!(item.children && item.children.length > 0);

    return {
      ...item,
      selected: this.selectedItemId() === itemId,
      onClick: hasChildren ? undefined : () => this.navigateToItem(itemId),
      children: item.children?.map(child => this.buildNavNode(child)),
    };
  }

  private navigateToItem(itemId: string): void {
    this.selectedItemId.set(itemId);
    this.router.navigate(['docs', itemId]);
  }
}
