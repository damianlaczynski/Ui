import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  IconComponent,
  CarouselComponent,
  CarouselItem,
  CardComponent,
  IconName,
  SearchComponent,
  DateComponent,
  SliderComponent,
  TotpComponent,
  TabsComponent,
  Tab,
  AvatarComponent,
  MenuComponent,
  TagComponent,
  MenuItem,
  TextComponent,
  EmailComponent,
  NumberComponent,
  CheckboxComponent,
  SwitchComponent,
  BadgeComponent,
  SpinnerComponent,
  BreadcrumbComponent,
  TextareaComponent,
  RadioGroupComponent,
  RadioItem,
  RatingComponent,
  PaginationComponent,
  SkeletonComponent,
  AccordionComponent,
} from 'ui';

interface ShowcaseComponent {
  id: string;
  name: string;
  icon: IconName;
}

interface RoadmapPreviewItem {
  id: string;
  title: string;
  timeframe: string;
  summary: string;
  status: 'done' | 'active' | 'next';
}

const ALL_SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  { id: 'accordion', name: 'Accordion', icon: 'slide_text' },
  { id: 'avatar', name: 'Avatar', icon: 'person' },
  { id: 'badge', name: 'Badge', icon: 'badge' },
  { id: 'breadcrumb', name: 'Breadcrumb', icon: 'arrow_routing' },
  { id: 'button', name: 'Button', icon: 'button' },
  { id: 'calendar', name: 'Calendar', icon: 'calendar_month' },
  { id: 'card', name: 'Card', icon: 'contact_card' },
  { id: 'carousel', name: 'Carousel', icon: 'arrow_circle_right' },
  { id: 'checkbox', name: 'Checkbox', icon: 'checkbox_checked' },
  { id: 'color', name: 'Color', icon: 'color' },
  { id: 'command-palette', name: 'Command Palette', icon: 'keyboard' },
  { id: 'data-grid', name: 'Data Grid', icon: 'table' },
  { id: 'date', name: 'Date', icon: 'calendar' },
  { id: 'datetime', name: 'Datetime', icon: 'calendar_clock' },
  { id: 'month', name: 'Month', icon: 'calendar_month' },
  { id: 'week', name: 'Week', icon: 'calendar_week_numbers' },
  { id: 'date-range', name: 'Date Range', icon: 'calendar_month' },
  { id: 'dialog', name: 'Dialog', icon: 'window' },
  { id: 'divider', name: 'Divider', icon: 'divider_tall' },
  { id: 'dropdown', name: 'Dropdown', icon: 'apps_list' },
  { id: 'drawer', name: 'Drawer', icon: 'panel_left' },
  { id: 'email', name: 'Email', icon: 'mail' },
  { id: 'empty-state', name: 'Empty State', icon: 'document_dismiss' },
  { id: 'error-state', name: 'Error State', icon: 'error_circle' },
  { id: 'file', name: 'File', icon: 'document' },
  { id: 'icon', name: 'Icon', icon: 'star' },
  { id: 'kbd', name: 'Kbd', icon: 'keyboard' },
  { id: 'loading-state', name: 'Loading State', icon: 'arrow_sync' },
  { id: 'message-bar', name: 'Message Bar', icon: 'alert_badge' },
  { id: 'menu', name: 'Menu', icon: 'group_list' },
  { id: 'nav', name: 'Nav', icon: 'navigation' },
  { id: 'node', name: 'Node', icon: 'circle' },
  { id: 'number', name: 'Number', icon: 'number_row' },
  { id: 'pagination', name: 'Pagination', icon: 'page_fit' },
  { id: 'password', name: 'Password', icon: 'password' },
  { id: 'progress-bar', name: 'Progress Bar', icon: 'spacebar' },
  { id: 'radio', name: 'Radio', icon: 'checkmark_circle' },
  { id: 'rating', name: 'Rating', icon: 'star' },
  { id: 'scroll-container', name: 'Scroll Container', icon: 'dual_screen_vertical_scroll' },
  { id: 'scroll-panel', name: 'Scroll Panel', icon: 'dual_screen_vertical_scroll' },
  { id: 'search', name: 'Search', icon: 'search' },
  { id: 'skeleton', name: 'Skeleton', icon: 'checkbox_indeterminate' },
  { id: 'slider', name: 'Slider', icon: 'arrow_maximize' },
  { id: 'spinner', name: 'Spinner', icon: 'replay' },
  { id: 'splitter', name: 'Splitter', icon: 'split_vertical' },
  { id: 'state-container', name: 'State Container', icon: 'database' },
  { id: 'stepper', name: 'Stepper', icon: 'timeline' },
  { id: 'switch', name: 'Switch', icon: 'tap_single' },
  { id: 'table-of-content', name: 'Table of Content', icon: 'list' },
  { id: 'tabs', name: 'Tabs', icon: 'tabs' },
  { id: 'tag', name: 'Tag', icon: 'tag' },
  { id: 'tel', name: 'Tel', icon: 'call' },
  { id: 'text', name: 'Text', icon: 'text_align_left' },
  { id: 'textarea', name: 'Textarea', icon: 'text_field' },
  { id: 'time', name: 'Time', icon: 'clock' },
  { id: 'time-picker', name: 'Time Picker', icon: 'clock' },
  { id: 'time-span', name: 'Time Span', icon: 'timer' },
  { id: 'toast', name: 'Toast', icon: 'alert' },
  { id: 'toolbar', name: 'Toolbar', icon: 'navigation' },
  { id: 'tooltip', name: 'Tooltip', icon: 'info' },
  { id: 'totp', name: 'TOTP', icon: 'lock_closed' },
  { id: 'tree', name: 'Tree', icon: 'text_bullet_list_tree' },
  { id: 'tree-node', name: 'Tree Node', icon: 'rectangle_landscape' },
  { id: 'url', name: 'URL', icon: 'link' },
  { id: 'video', name: 'Video', icon: 'video' },
];

@Component({
  selector: 'app-landing',
  imports: [
    ButtonComponent,
    IconComponent,
    CarouselComponent,
    CardComponent,
    SearchComponent,
    DateComponent,
    SliderComponent,
    TotpComponent,
    TabsComponent,
    AvatarComponent,
    MenuComponent,
    TagComponent,
    TextComponent,
    EmailComponent,
    NumberComponent,
    CheckboxComponent,
    SwitchComponent,
    BadgeComponent,
    SpinnerComponent,
    BreadcrumbComponent,
    TextareaComponent,
    RadioGroupComponent,
    RatingComponent,
    PaginationComponent,
    SkeletonComponent,
    AccordionComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  private readonly themeService = inject(ThemeService);

  readonly version = '1.0.0';
  readonly currentYear = new Date().getFullYear();
  readonly githubUrl = 'https://github.com/DamianLaczynski/ui';
  readonly npmUrl = 'https://www.npmjs.com/';
  readonly roadmapPreview: RoadmapPreviewItem[] = [
    {
      id: 'stability',
      title: 'Core stability',
      timeframe: 'Q1 2026',
      summary: 'Foundation for Fluent tokens, docs structure and baseline accessibility.',
      status: 'done',
    },
    {
      id: 'dx',
      title: 'Developer experience',
      timeframe: 'Q2 2026',
      summary: 'Better guides, richer API examples and stronger test coverage.',
      status: 'active',
    },
    {
      id: 'advanced',
      title: 'Advanced components',
      timeframe: 'Q3 2026',
      summary: 'Data-heavy patterns and layout primitives for enterprise applications.',
      status: 'next',
    },
  ];

  searchQuery = signal('');
  readonly showcaseComponents = signal<ShowcaseComponent[]>(ALL_SHOWCASE_COMPONENTS);
  readonly filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.showcaseComponents();
    return this.showcaseComponents().filter(
      c => c.name.toLowerCase().includes(query) || c.id.toLowerCase().includes(query),
    );
  });

  readonly carouselItems = signal<CarouselItem[]>([
    { id: 'btn', title: 'Button', componentType: 'button' },
    { id: 'inputs', title: 'Inputs', componentType: 'inputs' },
    { id: 'slider', title: 'Slider', componentType: 'slider' },
    { id: 'totp', title: 'TOTP', componentType: 'totp' },
    { id: 'tabs', title: 'Tabs', componentType: 'tabs' },
    { id: 'avatar', title: 'Avatar', componentType: 'avatar' },
    { id: 'menu', title: 'Menu', componentType: 'menu' },
    { id: 'tag', title: 'Tag', componentType: 'tag' },
    { id: 'checkbox', title: 'Checkbox', componentType: 'checkbox' },
    { id: 'switch', title: 'Switch', componentType: 'switch' },
    { id: 'badge', title: 'Badge', componentType: 'badge' },
    { id: 'spinner', title: 'Spinner', componentType: 'spinner' },
    { id: 'breadcrumb', title: 'Breadcrumb', componentType: 'breadcrumb' },
    { id: 'search', title: 'Search', componentType: 'search' },
    { id: 'textarea', title: 'Textarea', componentType: 'textarea' },
    { id: 'radio', title: 'Radio', componentType: 'radio' },
    { id: 'rating', title: 'Rating', componentType: 'rating' },
    { id: 'pagination', title: 'Pagination', componentType: 'pagination' },
    { id: 'skeleton', title: 'Skeleton', componentType: 'skeleton' },
    { id: 'card', title: 'Card', componentType: 'card' },
    { id: 'accordion', title: 'Accordion', componentType: 'accordion' },
  ]);

  readonly carouselTabs: Tab[] = [
    { id: '1', label: 'Tab 1' },
    { id: '2', label: 'Tab 2' },
    { id: '3', label: 'Tab 3' },
  ];
  carouselSelectedTabId = signal<string | number>('1');
  carouselAutoPlay = true;
  carouselCheckbox1 = false;
  carouselCheckbox2 = true;
  carouselSwitch1 = false;

  readonly carouselMenuItems: MenuItem[] = [
    { id: '1', type: 'button', label: 'Option 1' },
    { id: '2', type: 'button', label: 'Option 2' },
    { id: '3', type: 'button', label: 'Option 3' },
  ];

  readonly carouselBreadcrumbItems = [
    { id: '1', label: 'Home' },
    { id: '2', label: 'Documents' },
    { id: '3', label: 'Current' },
  ];

  readonly carouselRadioItems: RadioItem[] = [
    { id: '1', label: 'Option 1', value: '1' },
    { id: '2', label: 'Option 2', value: '2' },
    { id: '3', label: 'Option 3', value: '3' },
  ];
  carouselRadioValue = '1';

  carouselRating = 3;
  carouselSearchQuery = '';
  readonly carouselSkeletonListItems = [1, 2, 3];

  carouselPaginationConfig = {
    currentPage: 2,
    totalPages: 5,
    totalItems: 50,
    pageSize: 10,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50],
    showPageNumbers: true,
    maxVisiblePages: 3,
    showFirstLast: true,
    showInfo: true,
  };

  readonly router = inject(Router);

  onCarouselPageChange(page: number): void {
    this.carouselPaginationConfig = { ...this.carouselPaginationConfig, currentPage: page };
  }

  onCarouselTabChange(tab: Tab): void {
    this.carouselSelectedTabId.set(tab.id);
  }

  onTagDismiss(): void {}

  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateToComponents(): void {
    this.router.navigate(['/docs']);
  }

  navigateToGettingStarted(): void {
    this.router.navigate(['/docs/getting-started']);
  }

  navigateToRoadmap(): void {
    this.router.navigate(['/docs/roadmap']);
  }

  navigateToComponent(componentId: string): void {
    this.router.navigate(['/docs', componentId]);
  }

  getRoadmapStatusLabel(status: RoadmapPreviewItem['status']): string {
    const labels: Record<RoadmapPreviewItem['status'], string> = {
      done: 'Delivered',
      active: 'In progress',
      next: 'Next up',
    };
    return labels[status];
  }

  getShowcaseId(item: CarouselItem): string {
    const idMap: Record<string, string> = {
      btn: 'button',
      inputs: 'text',
      slider: 'slider',
      totp: 'totp',
      tabs: 'tabs',
      avatar: 'avatar',
      menu: 'menu',
      tag: 'tag',
      checkbox: 'checkbox',
      switch: 'switch',
      badge: 'badge',
      spinner: 'spinner',
      breadcrumb: 'breadcrumb',
      search: 'search',
      textarea: 'textarea',
      radio: 'radio',
      rating: 'rating',
      pagination: 'pagination',
      skeleton: 'skeleton',
      card: 'card',
      accordion: 'accordion',
    };
    return idMap[item.id] ?? item.id;
  }
}
