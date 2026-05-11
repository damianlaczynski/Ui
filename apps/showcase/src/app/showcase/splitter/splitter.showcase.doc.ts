import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SplitterBasicDemoComponent } from './examples/splitter-basic-demo';
import { SplitterConstraintsDemoComponent } from './examples/splitter-constraints-demo';
import { SplitterFixedPanelDemoComponent } from './examples/splitter-fixed-panel-demo';
import { SplitterKeyboardDemoComponent } from './examples/splitter-keyboard-demo';
import { SplitterNestedWorkspaceDemoComponent } from './examples/splitter-nested-workspace-demo';
import { SplitterVerticalDemoComponent } from './examples/splitter-vertical-demo';
import meta from './splitter.showcase.meta.json';

const splitterMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SplitterBasicDemoComponent,
  constraints: SplitterConstraintsDemoComponent,
  vertical: SplitterVerticalDemoComponent,
  fixedPanel: SplitterFixedPanelDemoComponent,
  nestedWorkspace: SplitterNestedWorkspaceDemoComponent,
  keyboard: SplitterKeyboardDemoComponent
} as const;

export const SPLITTER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${splitterMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(splitterMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${splitterMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const SPLITTER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: splitterMeta.title,
  description: splitterMeta.description,
  importCode: splitterMeta.importCode,
  containerClass: splitterMeta.containerClass,
  accessibility: splitterMeta.accessibility,
  featureSections: splitterMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: splitterMeta.apiSections
};
