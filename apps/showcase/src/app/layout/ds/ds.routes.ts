import { Routes } from '@angular/router';
import { AccordionShowcaseComponent } from '@showcase/accordion/accordion.showcase';
import { AvatarShowcaseComponent } from '@showcase/avatar/avatar.showcase';
import { ButtonShowcaseComponent } from '@showcase/button/button.showcase';
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
import { DropdownShowcaseComponent } from '@showcase/field/dropdown/dropdown.showcase';
import { NumberShowcaseComponent } from '@showcase/field/number/number.showcase';
import { PasswordShowcaseComponent } from '@showcase/field/password/password.showcase';
import { TextShowcaseComponent } from '@showcase/field/text/text.showcase';
import { EmailShowcaseComponent } from '@showcase/field/email/email.showcase';
import { SearchShowcaseComponent } from '@showcase/field/search/search.showcase';
import { TelShowcaseComponent } from '@showcase/field/tel/tel.showcase';
import { TextareaShowcaseComponent } from '@showcase/field/textarea/textarea.showcase';
import { UrlShowcaseComponent } from '@showcase/field/url/url.showcase';
import { TabsShowcaseComponent } from '@showcase/tabs/tabs.showcase';
import { SkeletonShowcaseComponent } from '@showcase/skeleton/skeleton.showcase';
import { SpeedDialShowcaseComponent } from '@showcase/speed-dial/speed-dial.showcase';
import { DialogShowcaseComponent } from '@showcase/dialog/dialog.showcase';
import { EmptyStateShowcaseComponent } from '@showcase/empty-state/empty-state.showcase';
import { ErrorStateShowcaseComponent } from '@showcase/error-state/error-state.showcase';
import { LoadingStateShowcaseComponent } from '@showcase/loading-state/loading-state.showcase';
import { MessageBarShowcaseComponent } from '@showcase/message-bar/message-bar.showcase';
import { MenuShowcaseComponent } from '@showcase/menu/menu.showcase';
import { TagShowcaseComponent } from '@showcase/tag/tag.showcase';
import { ProgressBarShowcaseComponent } from '@showcase/progress-bar/progress-bar.showcase';
import { StateContainerShowcaseComponent } from '@showcase/state-container/state-container.showcase';
import { SliderShowcaseComponent } from '@showcase/field/slider/slider.showcase';
import { RangeShowcaseComponent } from '@showcase/field/range/range.showcase';
import { DividerShowcaseComponent } from '@showcase/divider/divider.showcase';
import { BadgeShowcaseComponent } from '@showcase/badge/badge.showcase';
import { CardShowcaseComponent } from '@showcase/card/card.showcase';
import { CheckboxShowcaseComponent } from '@showcase/field/checkbox/checkbox.showcase';
import { ColorShowcaseComponent } from '@showcase/field/color/color.showcase';
import { SwitchShowcaseComponent } from '@showcase/field/switch/switch.showcase';
import { RadioButtonGroupShowcaseComponent } from '@showcase/field/radio-button-group/radio-button-group.showcase';
import { SplitterShowcaseComponent } from '@showcase/splitter/splitter.showcase';
import { ScrollPanelShowcaseComponent } from '@showcase/scroll-panel/scroll-panel.showcase';
import { ScrollContainerShowcaseComponent } from '@showcase/scroll-container/scroll-container.showcase';
import { SpinnerShowcaseComponent } from '@showcase/spinner/spinner.showcase';
import { FileShowcaseComponent } from '@showcase/field/file/file.showcase';
import { StepperShowcaseComponent } from '@showcase/field/stepper/stepper.showcase';
import { ToastShowcaseComponent } from '@showcase/toast/toast.showcase';
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
import { BreadcrumbShowcaseComponent } from '@showcase/breadcrumb/breadcrumb.showcase';
import { CarouselShowcaseComponent } from '@showcase/carousel/carousel.showcase';
import { DrawerShowcaseComponent } from '@showcase/drawer/drawer.showcase';
import { KbdShowcaseComponent } from '@showcase/kbd/kbd.showcase';
import { TooltipShowcaseComponent } from '@showcase/tooltip/tooltip.showcase';
import { RatingShowcaseComponent } from '@showcase/rating/rating.showcase';
import { VideoShowcaseComponent } from '@showcase/video/video.showcase';
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
    component: AvatarShowcaseComponent,
  },
  {
    path: 'badge',
    component: BadgeShowcaseComponent,
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbShowcaseComponent,
  },
  {
    path: 'button',
    component: ButtonShowcaseComponent,
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
    component: DialogShowcaseComponent,
  },
  {
    path: 'pagination',
    component: PaginationShowcaseComponent,
  },
  {
    path: 'divider',
    component: DividerShowcaseComponent,
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
    component: MessageBarShowcaseComponent,
  },
  {
    path: 'state-container',
    component: StateContainerShowcaseComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxShowcaseComponent,
  },
  {
    path: 'color',
    component: ColorShowcaseComponent,
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
    component: DropdownShowcaseComponent,
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
    component: SliderShowcaseComponent,
  },
  {
    path: 'range',
    component: RangeShowcaseComponent,
  },
  {
    path: 'switch',
    component: SwitchShowcaseComponent,
  },
  {
    path: 'text',
    component: TextShowcaseComponent,
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
    component: ProgressBarShowcaseComponent,
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
    component: SpinnerShowcaseComponent,
  },
  {
    path: 'stepper',
    component: StepperShowcaseComponent,
  },
  {
    path: 'skeleton',
    component: SkeletonShowcaseComponent,
  },
  {
    path: 'speed-dial',
    component: SpeedDialShowcaseComponent,
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
    component: ToastShowcaseComponent,
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
    component: DrawerShowcaseComponent,
  },
  {
    path: 'kbd',
    component: KbdShowcaseComponent,
  },
  {
    path: 'tooltip',
    component: TooltipShowcaseComponent,
  },
  {
    path: 'rating',
    component: RatingShowcaseComponent,
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
