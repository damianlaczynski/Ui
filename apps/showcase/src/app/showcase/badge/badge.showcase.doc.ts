import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { BadgeAppearanceVariantDemoComponent } from './examples/badge-appearance-variant-demo';
import { BadgeBasicDemoComponent } from './examples/badge-basic-demo';
import { BadgeCompositionDemoComponent } from './examples/badge-composition-demo';
import { BadgeCountsDemoComponent } from './examples/badge-counts-demo';
import { BadgeIconsDemoComponent } from './examples/badge-icons-demo';
import { BadgeSizeShapeDemoComponent } from './examples/badge-size-shape-demo';
import meta from './badge.showcase.meta.json';

const badgeMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: BadgeBasicDemoComponent,
  appearanceVariant: BadgeAppearanceVariantDemoComponent,
  sizeShape: BadgeSizeShapeDemoComponent,
  icons: BadgeIconsDemoComponent,
  counts: BadgeCountsDemoComponent,
  composition: BadgeCompositionDemoComponent,
} as const;

export const BADGE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${badgeMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(badgeMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${badgeMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const BADGE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: badgeMeta.title,
  description: badgeMeta.description,
  importCode: badgeMeta.importCode,
  containerClass: badgeMeta.containerClass,
  accessibility: badgeMeta.accessibility,
  featureSections: badgeMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: badgeMeta.apiSections,
};
