import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { WeekBasicDemoComponent } from './examples/week-basic-demo';
import { WeekConstraintsDemoComponent } from './examples/week-constraints-demo';
import { WeekFormatsDemoComponent } from './examples/week-formats-demo';
import { WeekPlanningPanelDemoComponent } from './examples/week-planning-panel-demo';
import { WeekReactiveFormDemoComponent } from './examples/week-reactive-form-demo';
import { WeekStatesDemoComponent } from './examples/week-states-demo';
import meta from './week.showcase.meta.json';

const weekMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: WeekBasicDemoComponent,
  formats: WeekFormatsDemoComponent,
  constraints: WeekConstraintsDemoComponent,
  states: WeekStatesDemoComponent,
  reactiveForm: WeekReactiveFormDemoComponent,
  planningPanel: WeekPlanningPanelDemoComponent,
} as const;

export const WEEK_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${weekMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(weekMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${weekMeta.slug}/${file}`]),
  ) as Record<string, string>),
};

export const WEEK_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: weekMeta.title,
  description: weekMeta.description,
  importCode: weekMeta.importCode,
  containerClass: weekMeta.containerClass,
  accessibility: weekMeta.accessibility,
  featureSections: weekMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: weekMeta.apiSections,
};
