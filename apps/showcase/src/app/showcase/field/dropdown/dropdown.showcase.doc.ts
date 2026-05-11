import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DropdownAsyncDataExampleComponent } from './examples/dropdown-async-data-demo';
import { DropdownBasicExampleComponent } from './examples/dropdown-basic-demo';
import { DropdownCompactPanelExampleComponent } from './examples/dropdown-compact-panel-demo';
import { DropdownCustomTemplateExampleComponent } from './examples/dropdown-custom-template-demo';
import { DropdownFormPatternExampleComponent } from './examples/dropdown-form-pattern-demo';
import { DropdownMultiTagsExampleComponent } from './examples/dropdown-multi-tags-demo';
import { DropdownSearchClearExampleComponent } from './examples/dropdown-search-clear-demo';
import { DropdownVariantsStatesExampleComponent } from './examples/dropdown-variants-states-demo';
import meta from './dropdown.showcase.meta.json';

const dropdownMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DropdownBasicExampleComponent,
  variantsStates: DropdownVariantsStatesExampleComponent,
  multiTags: DropdownMultiTagsExampleComponent,
  searchClear: DropdownSearchClearExampleComponent,
  compactPanel: DropdownCompactPanelExampleComponent,
  asyncData: DropdownAsyncDataExampleComponent,
  customTemplate: DropdownCustomTemplateExampleComponent,
  formPattern: DropdownFormPatternExampleComponent
} as const;

export const DROPDOWN_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${dropdownMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dropdownMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${dropdownMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const DROPDOWN_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dropdownMeta.title,
  description: dropdownMeta.description,
  importCode: dropdownMeta.importCode,
  containerClass: dropdownMeta.containerClass,
  accessibility: dropdownMeta.accessibility,
  featureSections: dropdownMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: dropdownMeta.apiSections
};
