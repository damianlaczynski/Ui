import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { CheckboxBasicExampleComponent } from './examples/checkbox-basic-demo';
import { CheckboxFilterGroupExampleComponent } from './examples/checkbox-filter-group-demo';
import { CheckboxLabelPositionsExampleComponent } from './examples/checkbox-label-positions-demo';
import { CheckboxPermissionsPanelExampleComponent } from './examples/checkbox-permissions-panel-demo';
import { CheckboxShapesExampleComponent } from './examples/checkbox-shapes-demo';
import { CheckboxStatesExampleComponent } from './examples/checkbox-states-demo';
import meta from './checkbox.showcase.meta.json';

const checkboxMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: CheckboxBasicExampleComponent,
  positions: CheckboxLabelPositionsExampleComponent,
  shapes: CheckboxShapesExampleComponent,
  states: CheckboxStatesExampleComponent,
  filters: CheckboxFilterGroupExampleComponent,
  permissions: CheckboxPermissionsPanelExampleComponent,
} as const;

export const CHECKBOX_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${checkboxMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(checkboxMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${checkboxMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const CHECKBOX_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: checkboxMeta.title,
  description: checkboxMeta.description,
  importCode: checkboxMeta.importCode,
  containerClass: checkboxMeta.containerClass,
  accessibility: checkboxMeta.accessibility,
  featureSections: checkboxMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: checkboxMeta.apiSections,
};
