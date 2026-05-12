import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ToolbarAllTypesDemoComponent } from './examples/toolbar-all-types-demo';
import { ToolbarBasicDemoComponent } from './examples/toolbar-basic-demo';
import { ToolbarEditorHeaderDemoComponent } from './examples/toolbar-editor-header-demo';
import { ToolbarGroupsDemoComponent } from './examples/toolbar-groups-demo';
import { ToolbarOverflowDemoComponent } from './examples/toolbar-overflow-demo';
import { ToolbarSizesOrientationDemoComponent } from './examples/toolbar-sizes-orientation-demo';
import { ToolbarSplitActionsDemoComponent } from './examples/toolbar-split-actions-demo';
import meta from './toolbar.showcase.meta.json';

const toolbarMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ToolbarBasicDemoComponent,
  groups: ToolbarGroupsDemoComponent,
  sizesOrientation: ToolbarSizesOrientationDemoComponent,
  splitActions: ToolbarSplitActionsDemoComponent,
  overflow: ToolbarOverflowDemoComponent,
  editorHeader: ToolbarEditorHeaderDemoComponent,
  allTypes: ToolbarAllTypesDemoComponent,
} as const;

export const TOOLBAR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${toolbarMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(toolbarMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${toolbarMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TOOLBAR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: toolbarMeta.title,
  description: toolbarMeta.description,
  importCode: toolbarMeta.importCode,
  containerClass: toolbarMeta.containerClass,
  accessibility: toolbarMeta.accessibility,
  featureSections: toolbarMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: toolbarMeta.apiSections,
};
