import { Routes } from '@angular/router';
import { AccordionShowcaseComponent } from '@showcase/accordion/accordion.showcase';
import {
  AVATAR_DOC_ASSET_PATHS,
  AVATAR_DOC_PAGE_CONFIG,
} from '@showcase/avatar/avatar.showcase.doc';
import {
  BUTTON_DOC_ASSET_PATHS,
  BUTTON_DOC_PAGE_CONFIG,
} from '@showcase/button/button.showcase.doc';
import { CalendarShowcaseComponent } from '@showcase/calendar/calendar.showcase';
import { CommandPaletteShowcaseComponent } from '@showcase/command-palette/command-palette.showcase';
import { TimeShowcaseComponent } from '@showcase/time/time.showcase';
import { TimePickerShowcaseComponent } from '@showcase/time-picker/time-picker.showcase';
import { DateShowcaseComponent } from '@showcase/field/date/date.showcase';
import { DatetimeShowcaseComponent } from '@showcase/field/datetime/datetime.showcase';
import { MonthShowcaseComponent } from '@showcase/field/month/month.showcase';
import { TimeSpanShowcaseComponent } from '@showcase/field/time-span/time-span.showcase';
import { WeekShowcaseComponent } from '@showcase/field/week/week.showcase';
import { DateRangeShowcaseComponent } from '@showcase/field/date-range/date-range.showcase';
import {
  DROPDOWN_DOC_ASSET_PATHS,
  DROPDOWN_DOC_PAGE_CONFIG,
} from '@showcase/field/dropdown/dropdown.showcase.doc';
import { NumberShowcaseComponent } from '@showcase/field/number/number.showcase';
import { PasswordShowcaseComponent } from '@showcase/field/password/password.showcase';
import { TEXT_DOC_ASSET_PATHS, TEXT_DOC_PAGE_CONFIG } from '@showcase/field/text/text.showcase.doc';
import { EmailShowcaseComponent } from '@showcase/field/email/email.showcase';
import { SearchShowcaseComponent } from '@showcase/field/search/search.showcase';
import { TelShowcaseComponent } from '@showcase/field/tel/tel.showcase';
import { TextareaShowcaseComponent } from '@showcase/field/textarea/textarea.showcase';
import { UrlShowcaseComponent } from '@showcase/field/url/url.showcase';
import {
  SWITCH_DOC_ASSET_PATHS,
  SWITCH_DOC_PAGE_CONFIG,
} from '@showcase/field/switch/switch.showcase.doc';
import { TabsShowcaseComponent } from '@showcase/tabs/tabs.showcase';
import {
  SKELETON_DOC_ASSET_PATHS,
  SKELETON_DOC_PAGE_CONFIG,
} from '@showcase/skeleton/skeleton.showcase.doc';
import {
  DIALOG_DOC_ASSET_PATHS,
  DIALOG_DOC_PAGE_CONFIG,
} from '@showcase/dialog/dialog.showcase.doc';
import { EmptyStateShowcaseComponent } from '@showcase/empty-state/empty-state.showcase';
import { ErrorStateShowcaseComponent } from '@showcase/error-state/error-state.showcase';
import { LoadingStateShowcaseComponent } from '@showcase/loading-state/loading-state.showcase';
import {
  MESSAGE_BAR_DOC_ASSET_PATHS,
  MESSAGE_BAR_DOC_PAGE_CONFIG,
} from '@showcase/message-bar/message-bar.showcase.doc';
import { MenuShowcaseComponent } from '@showcase/menu/menu.showcase';
import { TagShowcaseComponent } from '@showcase/tag/tag.showcase';
import {
  PROGRESS_BAR_DOC_ASSET_PATHS,
  PROGRESS_BAR_DOC_PAGE_CONFIG,
} from '@showcase/progress-bar/progress-bar.showcase.doc';
import { StateContainerShowcaseComponent } from '@showcase/state-container/state-container.showcase';
import {
  SLIDER_DOC_ASSET_PATHS,
  SLIDER_DOC_PAGE_CONFIG,
} from '@showcase/field/slider/slider.showcase.doc';
import {
  DIVIDER_DOC_ASSET_PATHS,
  DIVIDER_DOC_PAGE_CONFIG,
} from '@showcase/divider/divider.showcase.doc';
import { BadgeShowcaseComponent } from '@showcase/badge/badge.showcase';
import { CardShowcaseComponent } from '@showcase/card/card.showcase';
import {
  CHECKBOX_DOC_ASSET_PATHS,
  CHECKBOX_DOC_PAGE_CONFIG,
} from '@showcase/field/checkbox/checkbox.showcase.doc';
import {
  COLOR_DOC_ASSET_PATHS,
  COLOR_DOC_PAGE_CONFIG,
} from '@showcase/field/color/color.showcase.doc';
import { RadioButtonGroupShowcaseComponent } from '@showcase/field/radio-button-group/radio-button-group.showcase';
import { SplitterShowcaseComponent } from '@showcase/splitter/splitter.showcase';
import { ScrollPanelShowcaseComponent } from '@showcase/scroll-panel/scroll-panel.showcase';
import { ScrollContainerShowcaseComponent } from '@showcase/scroll-container/scroll-container.showcase';
import {
  SPINNER_DOC_ASSET_PATHS,
  SPINNER_DOC_PAGE_CONFIG,
} from '@showcase/spinner/spinner.showcase.doc';
import { FileShowcaseComponent } from '@showcase/field/file/file.showcase';
import {
  STEPPER_DOC_ASSET_PATHS,
  STEPPER_DOC_PAGE_CONFIG,
} from '@showcase/field/stepper/stepper.showcase.doc';
import { TOAST_DOC_ASSET_PATHS, TOAST_DOC_PAGE_CONFIG } from '@showcase/toast/toast.showcase.doc';
import { TotpShowcaseComponent } from '@showcase/field/totp/totp.showcase';
import { NavShowcaseComponent } from '@showcase/nav/nav.showcase';
import { NodeShowcaseComponent } from '@showcase/node/node.showcase';
import { TreeShowcaseComponent } from '@showcase/tree/tree.showcase';
import { TreeNodeShowcaseComponent } from '@showcase/tree-node/tree-node.showcase';
import { DataGridShowcaseComponent } from '@showcase/data-grid/data-grid.showcase';
import { PaginationShowcaseComponent } from '@showcase/pagination/pagination.showcase';
import { ToolbarShowcaseComponent } from '@showcase/toolbar/toolbar.showcase';
import { IconShowcaseComponent } from '@showcase/icon/icon.showcase';
import { TableOfContentShowcaseComponent } from '@showcase/table-of-content/table-of-content.showcase';
import {
  BREADCRUMB_DOC_ASSET_PATHS,
  BREADCRUMB_DOC_PAGE_CONFIG,
} from '@showcase/breadcrumb/breadcrumb.showcase.doc';
import { CarouselShowcaseComponent } from '@showcase/carousel/carousel.showcase';
import {
  DRAWER_DOC_ASSET_PATHS,
  DRAWER_DOC_PAGE_CONFIG,
} from '@showcase/drawer/drawer.showcase.doc';
import { KbdShowcaseComponent } from '@showcase/kbd/kbd.showcase';
import {
  TOOLTIP_DOC_ASSET_PATHS,
  TOOLTIP_DOC_PAGE_CONFIG,
} from '@showcase/tooltip/tooltip.showcase.doc';
import {
  RATING_DOC_ASSET_PATHS,
  RATING_DOC_PAGE_CONFIG,
} from '@showcase/rating/rating.showcase.doc';
import { VideoShowcaseComponent } from '@showcase/video/video.showcase';
import { ShowcaseDocPageComponent } from '@shared/components/showcase-doc-page/showcase-doc-page.component';
import { GettingStartedComponent } from '../../pages/docs/getting-started/getting-started.component';
import { InstallationComponent } from '../../pages/docs/installation/installation.component';
import { I18nComponent } from '../../pages/docs/i18n/i18n.component';
import { RoadmapComponent } from '../../pages/docs/roadmap/roadmap.component';

export const dsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'getting-started',
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
  },
  {
    path: 'installation',
    component: InstallationComponent,
  },
  {
    path: 'i18n',
    component: I18nComponent,
  },
  {
    path: 'roadmap',
    component: RoadmapComponent,
  },
  {
    path: 'accordion',
    component: AccordionShowcaseComponent,
  },
  {
    path: 'avatar',
    component: ShowcaseDocPageComponent,
    data: {
      config: AVATAR_DOC_PAGE_CONFIG,
      assetPaths: AVATAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'badge',
    component: BadgeShowcaseComponent,
  },
  {
    path: 'breadcrumb',
    component: ShowcaseDocPageComponent,
    data: {
      config: BREADCRUMB_DOC_PAGE_CONFIG,
      assetPaths: BREADCRUMB_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'button',
    component: ShowcaseDocPageComponent,
    data: {
      config: BUTTON_DOC_PAGE_CONFIG,
      assetPaths: BUTTON_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'calendar',
    component: CalendarShowcaseComponent,
  },
  {
    path: 'card',
    component: CardShowcaseComponent,
  },
  {
    path: 'command-palette',
    component: CommandPaletteShowcaseComponent,
  },
  {
    path: 'data-grid',
    component: DataGridShowcaseComponent,
  },
  {
    path: 'dialog',
    component: ShowcaseDocPageComponent,
    data: {
      config: DIALOG_DOC_PAGE_CONFIG,
      assetPaths: DIALOG_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'pagination',
    component: PaginationShowcaseComponent,
  },
  {
    path: 'divider',
    component: ShowcaseDocPageComponent,
    data: {
      config: DIVIDER_DOC_PAGE_CONFIG,
      assetPaths: DIVIDER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'empty-state',
    component: EmptyStateShowcaseComponent,
  },
  {
    path: 'error-state',
    component: ErrorStateShowcaseComponent,
  },
  {
    path: 'loading-state',
    component: LoadingStateShowcaseComponent,
  },
  {
    path: 'message-bar',
    component: ShowcaseDocPageComponent,
    data: {
      config: MESSAGE_BAR_DOC_PAGE_CONFIG,
      assetPaths: MESSAGE_BAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'state-container',
    component: StateContainerShowcaseComponent,
  },
  {
    path: 'checkbox',
    component: ShowcaseDocPageComponent,
    data: {
      config: CHECKBOX_DOC_PAGE_CONFIG,
      assetPaths: CHECKBOX_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'color',
    component: ShowcaseDocPageComponent,
    data: {
      config: COLOR_DOC_PAGE_CONFIG,
      assetPaths: COLOR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'date',
    component: DateShowcaseComponent,
  },
  {
    path: 'datetime',
    component: DatetimeShowcaseComponent,
  },
  {
    path: 'month',
    component: MonthShowcaseComponent,
  },
  {
    path: 'date-range',
    component: DateRangeShowcaseComponent,
  },
  {
    path: 'dropdown',
    component: ShowcaseDocPageComponent,
    data: {
      config: DROPDOWN_DOC_PAGE_CONFIG,
      assetPaths: DROPDOWN_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'number',
    component: NumberShowcaseComponent,
  },
  {
    path: 'password',
    component: PasswordShowcaseComponent,
  },
  {
    path: 'radio-button-group',
    component: RadioButtonGroupShowcaseComponent,
  },
  {
    path: 'slider',
    component: ShowcaseDocPageComponent,
    data: {
      config: SLIDER_DOC_PAGE_CONFIG,
      assetPaths: SLIDER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'switch',
    component: ShowcaseDocPageComponent,
    data: {
      config: SWITCH_DOC_PAGE_CONFIG,
      assetPaths: SWITCH_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'text',
    component: ShowcaseDocPageComponent,
    data: {
      config: TEXT_DOC_PAGE_CONFIG,
      assetPaths: TEXT_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'email',
    component: EmailShowcaseComponent,
  },
  {
    path: 'search',
    component: SearchShowcaseComponent,
  },
  {
    path: 'tel',
    component: TelShowcaseComponent,
  },
  {
    path: 'textarea',
    component: TextareaShowcaseComponent,
  },
  {
    path: 'toolbar',
    component: ToolbarShowcaseComponent,
  },
  {
    path: 'url',
    component: UrlShowcaseComponent,
  },
  {
    path: 'tabs',
    component: TabsShowcaseComponent,
  },
  {
    path: 'menu',
    component: MenuShowcaseComponent,
  },
  {
    path: 'nav',
    component: NavShowcaseComponent,
  },
  {
    path: 'node',
    component: NodeShowcaseComponent,
  },
  {
    path: 'tree',
    component: TreeShowcaseComponent,
  },
  {
    path: 'tree-node',
    component: TreeNodeShowcaseComponent,
  },
  {
    path: 'progress-bar',
    component: ShowcaseDocPageComponent,
    data: {
      config: PROGRESS_BAR_DOC_PAGE_CONFIG,
      assetPaths: PROGRESS_BAR_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'scroll-panel',
    component: ScrollPanelShowcaseComponent,
  },
  {
    path: 'scroll-container',
    component: ScrollContainerShowcaseComponent,
  },
  {
    path: 'splitter',
    component: SplitterShowcaseComponent,
  },
  {
    path: 'spinner',
    component: ShowcaseDocPageComponent,
    data: {
      config: SPINNER_DOC_PAGE_CONFIG,
      assetPaths: SPINNER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'stepper',
    component: ShowcaseDocPageComponent,
    data: {
      config: STEPPER_DOC_PAGE_CONFIG,
      assetPaths: STEPPER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'skeleton',
    component: ShowcaseDocPageComponent,
    data: {
      config: SKELETON_DOC_PAGE_CONFIG,
      assetPaths: SKELETON_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'tag',
    component: TagShowcaseComponent,
  },
  {
    path: 'time',
    component: TimeShowcaseComponent,
  },
  {
    path: 'time-picker',
    component: TimePickerShowcaseComponent,
  },
  {
    path: 'time-span',
    component: TimeSpanShowcaseComponent,
  },
  {
    path: 'week',
    component: WeekShowcaseComponent,
  },
  {
    path: 'toast',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOAST_DOC_PAGE_CONFIG,
      assetPaths: TOAST_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'file',
    component: FileShowcaseComponent,
  },
  {
    path: 'totp',
    component: TotpShowcaseComponent,
  },
  {
    path: 'icon',
    component: IconShowcaseComponent,
  },
  {
    path: 'table-of-content',
    component: TableOfContentShowcaseComponent,
  },
  {
    path: 'carousel',
    component: CarouselShowcaseComponent,
  },
  {
    path: 'drawer',
    component: ShowcaseDocPageComponent,
    data: {
      config: DRAWER_DOC_PAGE_CONFIG,
      assetPaths: DRAWER_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'kbd',
    component: KbdShowcaseComponent,
  },
  {
    path: 'tooltip',
    component: ShowcaseDocPageComponent,
    data: {
      config: TOOLTIP_DOC_PAGE_CONFIG,
      assetPaths: TOOLTIP_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'rating',
    component: ShowcaseDocPageComponent,
    data: {
      config: RATING_DOC_PAGE_CONFIG,
      assetPaths: RATING_DOC_ASSET_PATHS,
    },
  },
  {
    path: 'video',
    component: VideoShowcaseComponent,
  },
  {
    path: '**',
    redirectTo: 'getting-started',
  },
];
