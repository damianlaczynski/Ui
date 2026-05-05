import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SkeletonAnimationExampleComponent } from './examples/skeleton-animation-demo';
import { SkeletonBasicExampleComponent } from './examples/skeleton-basic-demo';
import { SkeletonCardShellExampleComponent } from './examples/skeleton-card-shell-demo';
import { SkeletonDetailPanelExampleComponent } from './examples/skeleton-detail-panel-demo';
import { SkeletonListShellExampleComponent } from './examples/skeleton-list-shell-demo';
import { SkeletonShapesExampleComponent } from './examples/skeleton-shapes-demo';
import meta from './skeleton.showcase.meta.json';

const skeletonMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SkeletonBasicExampleComponent,
  shapes: SkeletonShapesExampleComponent,
  animation: SkeletonAnimationExampleComponent,
  cardShell: SkeletonCardShellExampleComponent,
  listShell: SkeletonListShellExampleComponent,
  detailPanel: SkeletonDetailPanelExampleComponent,
} as const;

export const SKELETON_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${skeletonMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(skeletonMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${skeletonMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SKELETON_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: skeletonMeta.title,
  description: skeletonMeta.description,
  importCode: skeletonMeta.importCode,
  containerClass: skeletonMeta.containerClass,
  accessibility: skeletonMeta.accessibility,
  featureSections: skeletonMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: skeletonMeta.apiSections,
};
