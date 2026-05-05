import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { PaginationBasicExampleComponent } from './examples/pagination-basic-demo';
import { PaginationDensityExampleComponent } from './examples/pagination-density-demo';
import { PaginationFirstLastExampleComponent } from './examples/pagination-first-last-demo';
import { PaginationPageSizeExampleComponent } from './examples/pagination-page-size-demo';
import { PaginationResultsLayoutExampleComponent } from './examples/pagination-results-layout-demo';
import { PaginationWindowingExampleComponent } from './examples/pagination-windowing-demo';
import meta from './pagination.showcase.meta.json';

const paginationMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: PaginationBasicExampleComponent,
  windowing: PaginationWindowingExampleComponent,
  firstLast: PaginationFirstLastExampleComponent,
  pageSize: PaginationPageSizeExampleComponent,
  density: PaginationDensityExampleComponent,
  resultsLayout: PaginationResultsLayoutExampleComponent,
} as const;

export const PAGINATION_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${paginationMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(paginationMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${paginationMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const PAGINATION_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: paginationMeta.title,
  description: paginationMeta.description,
  importCode: paginationMeta.importCode,
  containerClass: paginationMeta.containerClass,
  accessibility: paginationMeta.accessibility,
  featureSections: paginationMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: paginationMeta.apiSections,
};
