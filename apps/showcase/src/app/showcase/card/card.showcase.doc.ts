import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { CardBasicDemoComponent } from './examples/card-basic-demo';
import { CardCompositionDemoComponent } from './examples/card-composition-demo';
import { CardFloatingActionsDemoComponent } from './examples/card-floating-actions-demo';
import { CardFocusModeDemoComponent } from './examples/card-focus-mode-demo';
import { CardSelectionDemoComponent } from './examples/card-selection-demo';
import { CardSurfacesDemoComponent } from './examples/card-surfaces-demo';
import meta from './card.showcase.meta.json';

const cardMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: CardBasicDemoComponent,
  surfaces: CardSurfacesDemoComponent,
  focusMode: CardFocusModeDemoComponent,
  selection: CardSelectionDemoComponent,
  floatingActions: CardFloatingActionsDemoComponent,
  composition: CardCompositionDemoComponent,
} as const;

export const CARD_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${cardMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(cardMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${cardMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const CARD_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: cardMeta.title,
  description: cardMeta.description,
  importCode: cardMeta.importCode,
  containerClass: cardMeta.containerClass,
  accessibility: cardMeta.accessibility,
  featureSections: cardMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: cardMeta.apiSections,
};
