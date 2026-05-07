import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DateBasicDemoComponent } from './examples/date-basic-demo';
import { DateBookingPanelDemoComponent } from './examples/date-booking-panel-demo';
import { DateConstraintsDemoComponent } from './examples/date-constraints-demo';
import { DateReactiveFormDemoComponent } from './examples/date-reactive-form-demo';
import { DateSizeVariantDemoComponent } from './examples/date-size-variant-demo';
import { DateStatesDemoComponent } from './examples/date-states-demo';
import meta from './date.showcase.meta.json';

const dateMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DateBasicDemoComponent,
  sizeVariant: DateSizeVariantDemoComponent,
  constraints: DateConstraintsDemoComponent,
  states: DateStatesDemoComponent,
  reactiveForm: DateReactiveFormDemoComponent,
  bookingPanel: DateBookingPanelDemoComponent,
} as const;

export const DATE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${dateMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dateMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${dateMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const DATE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dateMeta.title,
  description: dateMeta.description,
  importCode: dateMeta.importCode,
  containerClass: dateMeta.containerClass,
  accessibility: dateMeta.accessibility,
  featureSections: dateMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: dateMeta.apiSections,
};
