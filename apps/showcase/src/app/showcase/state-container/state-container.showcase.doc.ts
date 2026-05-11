import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { StateContainerBasicCycleDemoComponent } from './examples/state-container-basic-cycle-demo';
import { StateContainerCustomTemplatesDemoComponent } from './examples/state-container-custom-templates-demo';
import { StateContainerDataTemplateDemoComponent } from './examples/state-container-data-template-demo';
import { StateContainerEmptyInitialDemoComponent } from './examples/state-container-empty-initial-demo';
import { StateContainerListLayoutDemoComponent } from './examples/state-container-list-layout-demo';
import { StateContainerOverlayDemoComponent } from './examples/state-container-overlay-demo';
import meta from './state-container.showcase.meta.json';

const stateContainerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basicCycle: StateContainerBasicCycleDemoComponent,
  emptyInitial: StateContainerEmptyInitialDemoComponent,
  overlay: StateContainerOverlayDemoComponent,
  customTemplates: StateContainerCustomTemplatesDemoComponent,
  listLayout: StateContainerListLayoutDemoComponent,
  dataTemplate: StateContainerDataTemplateDemoComponent
} as const;

export const STATE_CONTAINER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${stateContainerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(stateContainerMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${stateContainerMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const STATE_CONTAINER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: stateContainerMeta.title,
  description: stateContainerMeta.description,
  importCode: stateContainerMeta.importCode,
  containerClass: stateContainerMeta.containerClass,
  accessibility: stateContainerMeta.accessibility,
  featureSections: stateContainerMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: stateContainerMeta.apiSections
};
