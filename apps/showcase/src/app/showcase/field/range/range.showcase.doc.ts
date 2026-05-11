import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { RangeBasicDemoComponent } from './examples/range-basic-demo';
import { RangeBoundsStepsDemoComponent } from './examples/range-bounds-steps-demo';
import { RangeFilterPanelDemoComponent } from './examples/range-filter-panel-demo';
import { RangeFormattingDemoComponent } from './examples/range-formatting-demo';
import { RangeReactiveFormDemoComponent } from './examples/range-reactive-form-demo';
import { RangeStatesDemoComponent } from './examples/range-states-demo';
import meta from './range.showcase.meta.json';

const rangeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: RangeBasicDemoComponent,
  boundsSteps: RangeBoundsStepsDemoComponent,
  formatting: RangeFormattingDemoComponent,
  states: RangeStatesDemoComponent,
  reactiveForm: RangeReactiveFormDemoComponent,
  filterPanel: RangeFilterPanelDemoComponent,
} as const;

export const RANGE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${rangeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(rangeMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${rangeMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const RANGE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: rangeMeta.title,
  description: rangeMeta.description,
  importCode: rangeMeta.importCode,
  containerClass: rangeMeta.containerClass,
  accessibility: rangeMeta.accessibility,
  featureSections: rangeMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: rangeMeta.apiSections,
};
