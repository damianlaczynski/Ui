import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { MonthBasicDemoComponent } from './examples/month-basic-demo';
import { MonthConstraintsDemoComponent } from './examples/month-constraints-demo';
import { MonthReactiveFormDemoComponent } from './examples/month-reactive-form-demo';
import { MonthReportingPanelDemoComponent } from './examples/month-reporting-panel-demo';
import { MonthSizeVariantDemoComponent } from './examples/month-size-variant-demo';
import { MonthStatesDemoComponent } from './examples/month-states-demo';
import meta from './month.showcase.meta.json';

const monthMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: MonthBasicDemoComponent,
  sizeVariant: MonthSizeVariantDemoComponent,
  constraints: MonthConstraintsDemoComponent,
  states: MonthStatesDemoComponent,
  reactiveForm: MonthReactiveFormDemoComponent,
  reportingPanel: MonthReportingPanelDemoComponent,
} as const;

export const MONTH_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${monthMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(monthMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${monthMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const MONTH_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: monthMeta.title,
  description: monthMeta.description,
  importCode: monthMeta.importCode,
  containerClass: monthMeta.containerClass,
  accessibility: monthMeta.accessibility,
  featureSections: monthMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: monthMeta.apiSections,
};
