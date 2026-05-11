import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TableOfContentAppearanceDemoComponent } from './examples/table-of-content-appearance-demo';
import { TableOfContentBasicDemoComponent } from './examples/table-of-content-basic-demo';
import { TableOfContentDocLayoutDemoComponent } from './examples/table-of-content-doc-layout-demo';
import { TableOfContentHeadingSelectorDemoComponent } from './examples/table-of-content-heading-selector-demo';
import { TableOfContentLevelsDemoComponent } from './examples/table-of-content-levels-demo';
import { TableOfContentStickyDemoComponent } from './examples/table-of-content-sticky-demo';
import meta from './table-of-content.showcase.meta.json';

const tableOfContentMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TableOfContentBasicDemoComponent,
  levels: TableOfContentLevelsDemoComponent,
  sticky: TableOfContentStickyDemoComponent,
  appearance: TableOfContentAppearanceDemoComponent,
  headingSelector: TableOfContentHeadingSelectorDemoComponent,
  docLayout: TableOfContentDocLayoutDemoComponent
} as const;

export const TABLE_OF_CONTENT_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${tableOfContentMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(tableOfContentMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${tableOfContentMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const TABLE_OF_CONTENT_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: tableOfContentMeta.title,
  description: tableOfContentMeta.description,
  importCode: tableOfContentMeta.importCode,
  containerClass: tableOfContentMeta.containerClass,
  accessibility: tableOfContentMeta.accessibility,
  featureSections: tableOfContentMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: tableOfContentMeta.apiSections
};
