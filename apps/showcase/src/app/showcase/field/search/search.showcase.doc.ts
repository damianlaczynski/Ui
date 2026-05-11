import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SearchBasicDemoComponent } from './examples/search-basic-demo';
import { SearchFilterBarDemoComponent } from './examples/search-filter-bar-demo';
import { SearchLayoutDemoComponent } from './examples/search-layout-demo';
import { SearchResultsPanelDemoComponent } from './examples/search-results-panel-demo';
import { SearchStatesDemoComponent } from './examples/search-states-demo';
import { SearchValidationDemoComponent } from './examples/search-validation-demo';
import meta from './search.showcase.meta.json';

const searchMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SearchBasicDemoComponent,
  layout: SearchLayoutDemoComponent,
  states: SearchStatesDemoComponent,
  validation: SearchValidationDemoComponent,
  filterBar: SearchFilterBarDemoComponent,
  resultsPanel: SearchResultsPanelDemoComponent,
} as const;

export const SEARCH_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${searchMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(searchMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${searchMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SEARCH_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: searchMeta.title,
  description: searchMeta.description,
  importCode: searchMeta.importCode,
  containerClass: searchMeta.containerClass,
  accessibility: searchMeta.accessibility,
  featureSections: searchMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: searchMeta.apiSections,
};
