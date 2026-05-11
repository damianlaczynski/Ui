import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TimeBasicDemoComponent } from './examples/time-basic-demo';
import { TimeReactiveFormDemoComponent } from './examples/time-reactive-form-demo';
import { TimeSchedulingPanelDemoComponent } from './examples/time-scheduling-panel-demo';
import { TimeSizeVariantDemoComponent } from './examples/time-size-variant-demo';
import { TimeStatesDemoComponent } from './examples/time-states-demo';
import { TimeStepFormatDemoComponent } from './examples/time-step-format-demo';
import meta from './time.showcase.meta.json';

const timeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TimeBasicDemoComponent,
  stepFormat: TimeStepFormatDemoComponent,
  sizeVariant: TimeSizeVariantDemoComponent,
  states: TimeStatesDemoComponent,
  reactiveForm: TimeReactiveFormDemoComponent,
  schedulingPanel: TimeSchedulingPanelDemoComponent,
} as const;

export const TIME_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${timeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(timeMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${timeMeta.slug}/${file}`]),
  ) as Record<string, string>),
};

export const TIME_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: timeMeta.title,
  description: timeMeta.description,
  importCode: timeMeta.importCode,
  containerClass: timeMeta.containerClass,
  accessibility: timeMeta.accessibility,
  featureSections: timeMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: timeMeta.apiSections,
};
