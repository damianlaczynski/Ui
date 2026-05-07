import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TimeSpanBasicDemoComponent } from './examples/time-span-basic-demo';
import { TimeSpanPolicyPanelDemoComponent } from './examples/time-span-policy-panel-demo';
import { TimeSpanReactiveFormDemoComponent } from './examples/time-span-reactive-form-demo';
import { TimeSpanSizeVariantDemoComponent } from './examples/time-span-size-variant-demo';
import { TimeSpanStatesDemoComponent } from './examples/time-span-states-demo';
import { TimeSpanUnitPresetsDemoComponent } from './examples/time-span-unit-presets-demo';
import meta from './time-span.showcase.meta.json';

const timeSpanMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TimeSpanBasicDemoComponent,
  unitPresets: TimeSpanUnitPresetsDemoComponent,
  sizeVariant: TimeSpanSizeVariantDemoComponent,
  states: TimeSpanStatesDemoComponent,
  reactiveForm: TimeSpanReactiveFormDemoComponent,
  policyPanel: TimeSpanPolicyPanelDemoComponent,
} as const;

export const TIME_SPAN_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${timeSpanMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(timeSpanMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${timeSpanMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TIME_SPAN_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: timeSpanMeta.title,
  description: timeSpanMeta.description,
  importCode: timeSpanMeta.importCode,
  containerClass: timeSpanMeta.containerClass,
  accessibility: timeSpanMeta.accessibility,
  featureSections: timeSpanMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: timeSpanMeta.apiSections,
};
