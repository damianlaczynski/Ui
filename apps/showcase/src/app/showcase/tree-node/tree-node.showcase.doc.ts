import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TreeNodeBasicDemoComponent } from './examples/tree-node-basic-demo';
import { TreeNodeBehaviorDemoComponent } from './examples/tree-node-behavior-demo';
import { TreeNodeContentTemplateDemoComponent } from './examples/tree-node-content-template-demo';
import { TreeNodeDragDropDemoComponent } from './examples/tree-node-drag-drop-demo';
import { TreeNodeQuickActionsDemoComponent } from './examples/tree-node-quick-actions-demo';
import { TreeNodeRecursiveDemoComponent } from './examples/tree-node-recursive-demo';
import { TreeNodeStatesDemoComponent } from './examples/tree-node-states-demo';
import meta from './tree-node.showcase.meta.json';

const treeNodeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TreeNodeBasicDemoComponent,
  behavior: TreeNodeBehaviorDemoComponent,
  states: TreeNodeStatesDemoComponent,
  contentTemplate: TreeNodeContentTemplateDemoComponent,
  quickActions: TreeNodeQuickActionsDemoComponent,
  recursive: TreeNodeRecursiveDemoComponent,
  dragDrop: TreeNodeDragDropDemoComponent
} as const;

export const TREE_NODE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${treeNodeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(treeNodeMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${treeNodeMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const TREE_NODE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: treeNodeMeta.title,
  description: treeNodeMeta.description,
  importCode: treeNodeMeta.importCode,
  containerClass: treeNodeMeta.containerClass,
  accessibility: treeNodeMeta.accessibility,
  featureSections: treeNodeMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: treeNodeMeta.apiSections
};
