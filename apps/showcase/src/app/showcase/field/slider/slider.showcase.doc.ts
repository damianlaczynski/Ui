import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SliderBasicExampleComponent } from './examples/slider-basic-demo';
import { SliderRangesExampleComponent } from './examples/slider-ranges-demo';
import { SliderSettingsPanelExampleComponent } from './examples/slider-settings-panel-demo';
import { SliderSizesExampleComponent } from './examples/slider-sizes-demo';
import { SliderStepsExampleComponent } from './examples/slider-steps-demo';
import { SliderVerticalExampleComponent } from './examples/slider-vertical-demo';
import meta from './slider.showcase.meta.json';

const sliderMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SliderBasicExampleComponent,
  sizes: SliderSizesExampleComponent,
  ranges: SliderRangesExampleComponent,
  steps: SliderStepsExampleComponent,
  vertical: SliderVerticalExampleComponent,
  settingsPanel: SliderSettingsPanelExampleComponent,
} as const;

export const SLIDER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${sliderMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(sliderMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${sliderMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SLIDER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: sliderMeta.title,
  description: sliderMeta.description,
  importCode: sliderMeta.importCode,
  containerClass: sliderMeta.containerClass,
  accessibility: sliderMeta.accessibility,
  featureSections: sliderMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: sliderMeta.apiSections,
};
