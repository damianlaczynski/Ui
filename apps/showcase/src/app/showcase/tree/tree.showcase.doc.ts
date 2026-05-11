import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TreeBasicDemoComponent } from './examples/tree-basic-demo';
import { TreeContentTemplateDemoComponent } from './examples/tree-content-template-demo';
import { TreeDeepStructureDemoComponent } from './examples/tree-deep-structure-demo';
import { TreeDragDropDemoComponent } from './examples/tree-drag-drop-demo';
import { TreeInteractionDemoComponent } from './examples/tree-interaction-demo';
import { TreeQuickActionsDemoComponent } from './examples/tree-quick-actions-demo';
import meta from './tree.showcase.meta.json';

const treeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TreeBasicDemoComponent,
  interaction: TreeInteractionDemoComponent,
  deepStructure: TreeDeepStructureDemoComponent,
  contentTemplate: TreeContentTemplateDemoComponent,
  quickActions: TreeQuickActionsDemoComponent,
  dragDrop: TreeDragDropDemoComponent
} as const;

export const TREE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${treeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(treeMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${treeMeta.slug}/${file}`])
  ) as Record<string, string>)
};

export const TREE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: treeMeta.title,
  description: treeMeta.description,
  importCode: treeMeta.importCode,
  containerClass: treeMeta.containerClass,
  accessibility: treeMeta.accessibility,
  featureSections: treeMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: treeMeta.apiSections
};
