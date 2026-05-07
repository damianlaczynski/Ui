import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DateRangeBasicDemoComponent } from './examples/date-range-basic-demo';
import { DateRangeBookingPanelDemoComponent } from './examples/date-range-booking-panel-demo';
import { DateRangeConstraintsDemoComponent } from './examples/date-range-constraints-demo';
import { DateRangeReactiveFormDemoComponent } from './examples/date-range-reactive-form-demo';
import { DateRangeSeparatorPreviewDemoComponent } from './examples/date-range-separator-preview-demo';
import { DateRangeStatesDemoComponent } from './examples/date-range-states-demo';
import meta from './date-range.showcase.meta.json';

const dateRangeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DateRangeBasicDemoComponent,
  separatorPreview: DateRangeSeparatorPreviewDemoComponent,
  constraints: DateRangeConstraintsDemoComponent,
  states: DateRangeStatesDemoComponent,
  reactiveForm: DateRangeReactiveFormDemoComponent,
  bookingPanel: DateRangeBookingPanelDemoComponent,
} as const;

export const DATE_RANGE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${dateRangeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dateRangeMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${dateRangeMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const DATE_RANGE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dateRangeMeta.title,
  description: dateRangeMeta.description,
  importCode: dateRangeMeta.importCode,
  containerClass: dateRangeMeta.containerClass,
  accessibility: dateRangeMeta.accessibility,
  featureSections: dateRangeMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: dateRangeMeta.apiSections,
};
