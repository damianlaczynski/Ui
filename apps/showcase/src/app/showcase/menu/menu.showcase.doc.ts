import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { MenuBasicDemoComponent } from './examples/menu-basic-demo';
import { MenuContextActionsDemoComponent } from './examples/menu-context-actions-demo';
import { MenuOverflowDemoComponent } from './examples/menu-overflow-demo';
import { MenuSectionsShortcutsDemoComponent } from './examples/menu-sections-shortcuts-demo';
import { MenuSubmenuDemoComponent } from './examples/menu-submenu-demo';
import { MenuTriggerVariantsDemoComponent } from './examples/menu-trigger-variants-demo';
import { MenuWorkspaceHeaderDemoComponent } from './examples/menu-workspace-header-demo';
import meta from './menu.showcase.meta.json';

const menuMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: MenuBasicDemoComponent,
  triggerVariants: MenuTriggerVariantsDemoComponent,
  sectionsShortcuts: MenuSectionsShortcutsDemoComponent,
  submenu: MenuSubmenuDemoComponent,
  contextActions: MenuContextActionsDemoComponent,
  overflow: MenuOverflowDemoComponent,
  workspaceHeader: MenuWorkspaceHeaderDemoComponent,
} as const;

export const MENU_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${menuMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(menuMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${menuMeta.slug}/${file}`]),
  ) as Record<string, string>),
};

export const MENU_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: menuMeta.title,
  description: menuMeta.description,
  importCode: menuMeta.importCode,
  containerClass: menuMeta.containerClass,
  accessibility: menuMeta.accessibility,
  featureSections: menuMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: menuMeta.apiSections,
};
