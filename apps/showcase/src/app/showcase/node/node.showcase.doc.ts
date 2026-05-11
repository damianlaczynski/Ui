import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { NodeAppearanceVariantDemoComponent } from './examples/node-appearance-variant-demo';
import { NodeBasicDemoComponent } from './examples/node-basic-demo';
import { NodeCustomContentDemoComponent } from './examples/node-custom-content-demo';
import { NodeDragDropDemoComponent } from './examples/node-drag-drop-demo';
import { NodeQuickActionsDemoComponent } from './examples/node-quick-actions-demo';
import { NodeSelectionBehaviorDemoComponent } from './examples/node-selection-behavior-demo';
import { NodeSizeShapeDemoComponent } from './examples/node-size-shape-demo';
import meta from './node.showcase.meta.json';

const nodeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: NodeBasicDemoComponent,
  appearanceVariant: NodeAppearanceVariantDemoComponent,
  sizeShape: NodeSizeShapeDemoComponent,
  selectionBehavior: NodeSelectionBehaviorDemoComponent,
  customContent: NodeCustomContentDemoComponent,
  quickActions: NodeQuickActionsDemoComponent,
  dragDrop: NodeDragDropDemoComponent
} as const;

export const NODE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${nodeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(nodeMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${nodeMeta.slug}/${file}`])
  ) as Record<string, string>)
};

export const NODE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: nodeMeta.title,
  description: nodeMeta.description,
  importCode: nodeMeta.importCode,
  containerClass: nodeMeta.containerClass,
  accessibility: nodeMeta.accessibility,
  featureSections: nodeMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: nodeMeta.apiSections
};
