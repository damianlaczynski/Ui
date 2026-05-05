import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SpinnerBasicExampleComponent } from './examples/spinner-basic-demo';
import { SpinnerLabelPositionsExampleComponent } from './examples/spinner-label-positions-demo';
import { SpinnerSaveActionExampleComponent } from './examples/spinner-save-action-demo';
import { SpinnerSectionLoaderExampleComponent } from './examples/spinner-section-loader-demo';
import { SpinnerSemanticsExampleComponent } from './examples/spinner-semantics-demo';
import meta from './spinner.showcase.meta.json';

const spinnerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SpinnerBasicExampleComponent,
  semantics: SpinnerSemanticsExampleComponent,
  labels: SpinnerLabelPositionsExampleComponent,
  save: SpinnerSaveActionExampleComponent,
  section: SpinnerSectionLoaderExampleComponent,
} as const;

export const SPINNER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${spinnerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(spinnerMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${spinnerMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SPINNER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: spinnerMeta.title,
  description: spinnerMeta.description,
  importCode: spinnerMeta.importCode,
  containerClass: spinnerMeta.containerClass,
  accessibility: spinnerMeta.accessibility,
  featureSections: spinnerMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: spinnerMeta.apiSections,
};
