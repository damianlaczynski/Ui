import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DatetimeBasicDemoComponent } from './examples/datetime-basic-demo';
import { DatetimeConstraintsDemoComponent } from './examples/datetime-constraints-demo';
import { DatetimeReactiveFormDemoComponent } from './examples/datetime-reactive-form-demo';
import { DatetimeSchedulingPanelDemoComponent } from './examples/datetime-scheduling-panel-demo';
import { DatetimeStatesDemoComponent } from './examples/datetime-states-demo';
import { DatetimeStepFormatDemoComponent } from './examples/datetime-step-format-demo';
import meta from './datetime.showcase.meta.json';

const datetimeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DatetimeBasicDemoComponent,
  stepFormat: DatetimeStepFormatDemoComponent,
  constraints: DatetimeConstraintsDemoComponent,
  states: DatetimeStatesDemoComponent,
  reactiveForm: DatetimeReactiveFormDemoComponent,
  schedulingPanel: DatetimeSchedulingPanelDemoComponent,
} as const;

export const DATETIME_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${datetimeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(datetimeMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${datetimeMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const DATETIME_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: datetimeMeta.title,
  description: datetimeMeta.description,
  importCode: datetimeMeta.importCode,
  containerClass: datetimeMeta.containerClass,
  accessibility: datetimeMeta.accessibility,
  featureSections: datetimeMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: datetimeMeta.apiSections,
};
