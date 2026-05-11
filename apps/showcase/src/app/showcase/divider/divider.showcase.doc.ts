import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DividerAlignmentExampleComponent } from './examples/divider-alignment-demo';
import { DividerAuthSplitExampleComponent } from './examples/divider-auth-split-demo';
import { DividerBasicExampleComponent } from './examples/divider-basic-demo';
import { DividerOrientationExampleComponent } from './examples/divider-orientation-demo';
import { DividerPanelSectionsExampleComponent } from './examples/divider-panel-sections-demo';
import { DividerToolbarGroupingExampleComponent } from './examples/divider-toolbar-grouping-demo';
import meta from './divider.showcase.meta.json';

const dividerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DividerBasicExampleComponent,
  orientation: DividerOrientationExampleComponent,
  alignment: DividerAlignmentExampleComponent,
  authSplit: DividerAuthSplitExampleComponent,
  panelSections: DividerPanelSectionsExampleComponent,
  toolbarGrouping: DividerToolbarGroupingExampleComponent,
} as const;

export const DIVIDER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${dividerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dividerMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${dividerMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const DIVIDER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dividerMeta.title,
  description: dividerMeta.description,
  importCode: dividerMeta.importCode,
  containerClass: dividerMeta.containerClass,
  accessibility: dividerMeta.accessibility,
  featureSections: dividerMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: dividerMeta.apiSections,
};
