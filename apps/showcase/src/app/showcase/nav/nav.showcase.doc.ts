import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { NavAppearanceDemoComponent } from './examples/nav-appearance-demo';
import { NavBasicDemoComponent } from './examples/nav-basic-demo';
import { NavContentTemplateDemoComponent } from './examples/nav-content-template-demo';
import { NavDeepTreeDemoComponent } from './examples/nav-deep-tree-demo';
import { NavQuickActionsDemoComponent } from './examples/nav-quick-actions-demo';
import { NavSectionsDemoComponent } from './examples/nav-sections-demo';
import meta from './nav.showcase.meta.json';

const navMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: NavBasicDemoComponent,
  appearance: NavAppearanceDemoComponent,
  deepTree: NavDeepTreeDemoComponent,
  sections: NavSectionsDemoComponent,
  contentTemplate: NavContentTemplateDemoComponent,
  quickActions: NavQuickActionsDemoComponent,
} as const;

export const NAV_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${navMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(navMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${navMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const NAV_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: navMeta.title,
  description: navMeta.description,
  importCode: navMeta.importCode,
  containerClass: navMeta.containerClass,
  accessibility: navMeta.accessibility,
  featureSections: navMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: navMeta.apiSections,
};
