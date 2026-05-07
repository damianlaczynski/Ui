import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ProgressBarBasicExampleComponent } from './examples/progress-bar-basic-demo';
import { ProgressBarSizesExampleComponent } from './examples/progress-bar-sizes-demo';
import { ProgressBarStatesExampleComponent } from './examples/progress-bar-states-demo';
import { ProgressBarTaskFlowExampleComponent } from './examples/progress-bar-task-flow-demo';
import { ProgressBarUploadQueueExampleComponent } from './examples/progress-bar-upload-queue-demo';
import { ProgressBarVariantsExampleComponent } from './examples/progress-bar-variants-demo';
import meta from './progress-bar.showcase.meta.json';

const progressBarMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ProgressBarBasicExampleComponent,
  states: ProgressBarStatesExampleComponent,
  sizes: ProgressBarSizesExampleComponent,
  variants: ProgressBarVariantsExampleComponent,
  uploadQueue: ProgressBarUploadQueueExampleComponent,
  taskFlow: ProgressBarTaskFlowExampleComponent,
} as const;

export const PROGRESS_BAR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${progressBarMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(progressBarMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${progressBarMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const PROGRESS_BAR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: progressBarMeta.title,
  description: progressBarMeta.description,
  importCode: progressBarMeta.importCode,
  containerClass: progressBarMeta.containerClass,
  accessibility: progressBarMeta.accessibility,
  featureSections: progressBarMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: progressBarMeta.apiSections,
};
