import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DrawerActionsExampleComponent } from './examples/drawer-actions-demo';
import { DrawerBasicExampleComponent } from './examples/drawer-basic-demo';
import { DrawerBehaviorExampleComponent } from './examples/drawer-behavior-demo';
import { DrawerPositionsExampleComponent } from './examples/drawer-positions-demo';
import { DrawerSettingsPanelExampleComponent } from './examples/drawer-settings-panel-demo';
import { DrawerTypesExampleComponent } from './examples/drawer-types-demo';
import meta from './drawer.showcase.meta.json';

const drawerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: DrawerBasicExampleComponent,
  types: DrawerTypesExampleComponent,
  positions: DrawerPositionsExampleComponent,
  behavior: DrawerBehaviorExampleComponent,
  actions: DrawerActionsExampleComponent,
  settingsPanel: DrawerSettingsPanelExampleComponent
} as const;

export const DRAWER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${drawerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(drawerMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${drawerMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const DRAWER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: drawerMeta.title,
  description: drawerMeta.description,
  importCode: drawerMeta.importCode,
  containerClass: drawerMeta.containerClass,
  accessibility: drawerMeta.accessibility,
  featureSections: drawerMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: drawerMeta.apiSections
};
