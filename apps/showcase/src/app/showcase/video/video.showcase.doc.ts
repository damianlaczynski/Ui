import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { VideoAdvancedActionsDemoComponent } from './examples/video-advanced-actions-demo';
import { VideoBasicDemoComponent } from './examples/video-basic-demo';
import { VideoControlsDemoComponent } from './examples/video-controls-demo';
import { VideoMediaPanelDemoComponent } from './examples/video-media-panel-demo';
import { VideoPlaybackDemoComponent } from './examples/video-playback-demo';
import { VideoSizeDemoComponent } from './examples/video-size-demo';
import meta from './video.showcase.meta.json';

const videoMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: VideoBasicDemoComponent,
  controls: VideoControlsDemoComponent,
  playback: VideoPlaybackDemoComponent,
  size: VideoSizeDemoComponent,
  advancedActions: VideoAdvancedActionsDemoComponent,
  mediaPanel: VideoMediaPanelDemoComponent,
} as const;

export const VIDEO_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${videoMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(videoMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${videoMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const VIDEO_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: videoMeta.title,
  description: videoMeta.description,
  importCode: videoMeta.importCode,
  containerClass: videoMeta.containerClass,
  accessibility: videoMeta.accessibility,
  featureSections: videoMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: videoMeta.apiSections,
};
