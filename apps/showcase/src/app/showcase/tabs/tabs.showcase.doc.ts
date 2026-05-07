import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TabsAppearanceLayoutDemoComponent } from './examples/tabs-appearance-layout-demo';
import { TabsBasicDemoComponent } from './examples/tabs-basic-demo';
import { TabsOptionsDemoComponent } from './examples/tabs-options-demo';
import { TabsOrientationDemoComponent } from './examples/tabs-orientation-demo';
import { TabsOverflowDemoComponent } from './examples/tabs-overflow-demo';
import { TabsWorkspacePanelDemoComponent } from './examples/tabs-workspace-panel-demo';
import meta from './tabs.showcase.meta.json';

const tabsMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TabsBasicDemoComponent,
  appearanceLayout: TabsAppearanceLayoutDemoComponent,
  orientation: TabsOrientationDemoComponent,
  options: TabsOptionsDemoComponent,
  overflow: TabsOverflowDemoComponent,
  workspacePanel: TabsWorkspacePanelDemoComponent,
} as const;

export const TABS_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${tabsMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(tabsMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${tabsMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TABS_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: tabsMeta.title,
  description: tabsMeta.description,
  importCode: tabsMeta.importCode,
  containerClass: tabsMeta.containerClass,
  accessibility: tabsMeta.accessibility,
  featureSections: tabsMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: tabsMeta.apiSections,
};
