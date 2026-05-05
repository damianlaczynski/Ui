import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { MessageBarActionsExampleComponent } from './examples/message-bar-actions-demo';
import { MessageBarAppearanceExampleComponent } from './examples/message-bar-appearance-demo';
import { MessageBarBasicExampleComponent } from './examples/message-bar-basic-demo';
import { MessageBarLayoutExampleComponent } from './examples/message-bar-layout-demo';
import { MessageBarRichContentExampleComponent } from './examples/message-bar-rich-content-demo';
import { MessageBarVariantsExampleComponent } from './examples/message-bar-variants-demo';
import meta from './message-bar.showcase.meta.json';

const messageBarMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: MessageBarBasicExampleComponent,
  variants: MessageBarVariantsExampleComponent,
  appearance: MessageBarAppearanceExampleComponent,
  layout: MessageBarLayoutExampleComponent,
  actions: MessageBarActionsExampleComponent,
  richContent: MessageBarRichContentExampleComponent,
} as const;

export const MESSAGE_BAR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${messageBarMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(messageBarMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${messageBarMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const MESSAGE_BAR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: messageBarMeta.title,
  description: messageBarMeta.description,
  importCode: messageBarMeta.importCode,
  containerClass: messageBarMeta.containerClass,
  accessibility: messageBarMeta.accessibility,
  featureSections: messageBarMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: messageBarMeta.apiSections,
};
