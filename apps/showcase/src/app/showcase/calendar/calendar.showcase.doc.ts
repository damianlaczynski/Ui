import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { CalendarBasicDemoComponent } from './examples/calendar-basic-demo';
import { CalendarBookingPanelDemoComponent } from './examples/calendar-booking-panel-demo';
import { CalendarConstraintsDemoComponent } from './examples/calendar-constraints-demo';
import { CalendarRangeDemoComponent } from './examples/calendar-range-demo';
import { CalendarSizePickerDemoComponent } from './examples/calendar-size-picker-demo';
import { CalendarViewsDemoComponent } from './examples/calendar-views-demo';
import meta from './calendar.showcase.meta.json';

const calendarMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: CalendarBasicDemoComponent,
  views: CalendarViewsDemoComponent,
  sizePicker: CalendarSizePickerDemoComponent,
  constraints: CalendarConstraintsDemoComponent,
  range: CalendarRangeDemoComponent,
  bookingPanel: CalendarBookingPanelDemoComponent,
} as const;

export const CALENDAR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${calendarMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(calendarMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${calendarMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const CALENDAR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: calendarMeta.title,
  description: calendarMeta.description,
  importCode: calendarMeta.importCode,
  containerClass: calendarMeta.containerClass,
  accessibility: calendarMeta.accessibility,
  featureSections: calendarMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: calendarMeta.apiSections,
};
