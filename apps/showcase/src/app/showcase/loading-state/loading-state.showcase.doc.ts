import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { LoadingStateBasicDemoComponent } from './examples/loading-state-basic-demo';
import { LoadingStateCardOverlayDemoComponent } from './examples/loading-state-card-overlay-demo';
import { LoadingStateCustomContentDemoComponent } from './examples/loading-state-custom-content-demo';
import { LoadingStateFullscreenDemoComponent } from './examples/loading-state-fullscreen-demo';
import { LoadingStateListOverlayDemoComponent } from './examples/loading-state-list-overlay-demo';
import { LoadingStateMessagingDemoComponent } from './examples/loading-state-messaging-demo';
import { LoadingStatePanelLayoutDemoComponent } from './examples/loading-state-panel-layout-demo';
import meta from './loading-state.showcase.meta.json';

const loadingStateMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: LoadingStateBasicDemoComponent,
  messaging: LoadingStateMessagingDemoComponent,
  customContent: LoadingStateCustomContentDemoComponent,
  cardOverlay: LoadingStateCardOverlayDemoComponent,
  listOverlay: LoadingStateListOverlayDemoComponent,
  fullscreen: LoadingStateFullscreenDemoComponent,
  panelLayout: LoadingStatePanelLayoutDemoComponent,
} as const;

export const LOADING_STATE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${loadingStateMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(loadingStateMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${loadingStateMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const LOADING_STATE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: loadingStateMeta.title,
  description: loadingStateMeta.description,
  importCode: loadingStateMeta.importCode,
  containerClass: loadingStateMeta.containerClass,
  accessibility: loadingStateMeta.accessibility,
  featureSections: loadingStateMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: loadingStateMeta.apiSections,
};
