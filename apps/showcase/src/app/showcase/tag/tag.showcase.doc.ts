import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TagAppearanceVariantDemoComponent } from './examples/tag-appearance-variant-demo';
import { TagBasicDemoComponent } from './examples/tag-basic-demo';
import { TagDismissibleDemoComponent } from './examples/tag-dismissible-demo';
import { TagSelectableFiltersDemoComponent } from './examples/tag-selectable-filters-demo';
import { TagSizeShapeDemoComponent } from './examples/tag-size-shape-demo';
import { TagWorkspacePanelDemoComponent } from './examples/tag-workspace-panel-demo';
import meta from './tag.showcase.meta.json';

const tagMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TagBasicDemoComponent,
  appearanceVariant: TagAppearanceVariantDemoComponent,
  sizeShape: TagSizeShapeDemoComponent,
  selectableFilters: TagSelectableFiltersDemoComponent,
  dismissible: TagDismissibleDemoComponent,
  workspacePanel: TagWorkspacePanelDemoComponent
} as const;

export const TAG_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${tagMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(tagMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${tagMeta.slug}/${file}`])
  ) as Record<string, string>)
};

export const TAG_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: tagMeta.title,
  description: tagMeta.description,
  importCode: tagMeta.importCode,
  containerClass: tagMeta.containerClass,
  accessibility: tagMeta.accessibility,
  featureSections: tagMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: tagMeta.apiSections
};
