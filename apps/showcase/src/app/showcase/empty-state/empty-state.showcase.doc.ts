import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { EmptyStateActionsDemoComponent } from './examples/empty-state-actions-demo';
import { EmptyStateBasicDemoComponent } from './examples/empty-state-basic-demo';
import { EmptyStateCustomContentDemoComponent } from './examples/empty-state-custom-content-demo';
import { EmptyStateIconsSizesDemoComponent } from './examples/empty-state-icons-sizes-demo';
import { EmptyStateListLayoutDemoComponent } from './examples/empty-state-list-layout-demo';
import { EmptyStateScenariosDemoComponent } from './examples/empty-state-scenarios-demo';
import meta from './empty-state.showcase.meta.json';

const emptyStateMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: EmptyStateBasicDemoComponent,
  iconsSizes: EmptyStateIconsSizesDemoComponent,
  actions: EmptyStateActionsDemoComponent,
  customContent: EmptyStateCustomContentDemoComponent,
  scenarios: EmptyStateScenariosDemoComponent,
  listLayout: EmptyStateListLayoutDemoComponent,
} as const;

export const EMPTY_STATE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${emptyStateMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(emptyStateMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${emptyStateMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const EMPTY_STATE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: emptyStateMeta.title,
  description: emptyStateMeta.description,
  importCode: emptyStateMeta.importCode,
  containerClass: emptyStateMeta.containerClass,
  accessibility: emptyStateMeta.accessibility,
  featureSections: emptyStateMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: emptyStateMeta.apiSections,
};
