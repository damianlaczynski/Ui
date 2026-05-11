import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ScrollContainerBasicDemoComponent } from './examples/scroll-container-basic-demo';
import { ScrollContainerCustomTemplateDemoComponent } from './examples/scroll-container-custom-template-demo';
import { ScrollContainerEventsDemoComponent } from './examples/scroll-container-events-demo';
import { ScrollContainerInboxPanelDemoComponent } from './examples/scroll-container-inbox-panel-demo';
import { ScrollContainerProgrammaticDemoComponent } from './examples/scroll-container-programmatic-demo';
import { ScrollContainerSelectionDemoComponent } from './examples/scroll-container-selection-demo';
import meta from './scroll-container.showcase.meta.json';

const scrollContainerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ScrollContainerBasicDemoComponent,
  selection: ScrollContainerSelectionDemoComponent,
  customTemplate: ScrollContainerCustomTemplateDemoComponent,
  programmatic: ScrollContainerProgrammaticDemoComponent,
  events: ScrollContainerEventsDemoComponent,
  inboxPanel: ScrollContainerInboxPanelDemoComponent
} as const;

export const SCROLL_CONTAINER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${scrollContainerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(scrollContainerMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${scrollContainerMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const SCROLL_CONTAINER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: scrollContainerMeta.title,
  description: scrollContainerMeta.description,
  importCode: scrollContainerMeta.importCode,
  containerClass: scrollContainerMeta.containerClass,
  accessibility: scrollContainerMeta.accessibility,
  featureSections: scrollContainerMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: scrollContainerMeta.apiSections
};
