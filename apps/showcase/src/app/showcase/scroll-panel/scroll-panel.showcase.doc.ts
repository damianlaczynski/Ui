import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ScrollPanelBasicDemoComponent } from './examples/scroll-panel-basic-demo';
import { ScrollPanelEventsDemoComponent } from './examples/scroll-panel-events-demo';
import { ScrollPanelInboxLayoutDemoComponent } from './examples/scroll-panel-inbox-layout-demo';
import { ScrollPanelOrientationDemoComponent } from './examples/scroll-panel-orientation-demo';
import { ScrollPanelProgrammaticDemoComponent } from './examples/scroll-panel-programmatic-demo';
import { ScrollPanelScrollbarBehaviorDemoComponent } from './examples/scroll-panel-scrollbar-behavior-demo';
import meta from './scroll-panel.showcase.meta.json';

const scrollPanelMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ScrollPanelBasicDemoComponent,
  orientation: ScrollPanelOrientationDemoComponent,
  scrollbarBehavior: ScrollPanelScrollbarBehaviorDemoComponent,
  programmatic: ScrollPanelProgrammaticDemoComponent,
  events: ScrollPanelEventsDemoComponent,
  inboxLayout: ScrollPanelInboxLayoutDemoComponent,
} as const;

export const SCROLL_PANEL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${scrollPanelMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(scrollPanelMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${scrollPanelMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SCROLL_PANEL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: scrollPanelMeta.title,
  description: scrollPanelMeta.description,
  importCode: scrollPanelMeta.importCode,
  containerClass: scrollPanelMeta.containerClass,
  accessibility: scrollPanelMeta.accessibility,
  featureSections: scrollPanelMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: scrollPanelMeta.apiSections,
};
