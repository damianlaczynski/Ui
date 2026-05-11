import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { IconBrowserDemoComponent } from './examples/icon-browser-demo';
import { IconOverviewDemoComponent } from './examples/icon-overview-demo';
import { IconSemanticDemoComponent } from './examples/icon-semantic-demo';
import { IconSizeDemoComponent } from './examples/icon-size-demo';
import { IconVariantDemoComponent } from './examples/icon-variant-demo';
import meta from './icon.showcase.meta.json';

const iconMeta = meta as ShowcaseDocMeta;

const componentMap = {
  overview: IconOverviewDemoComponent,
  size: IconSizeDemoComponent,
  variant: IconVariantDemoComponent,
  semantic: IconSemanticDemoComponent,
  browser: IconBrowserDemoComponent
} as const;

export const ICON_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${iconMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(iconMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${iconMeta.slug}/${file}`])
  ) as Record<string, string>)
};

export const ICON_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: iconMeta.title,
  description: iconMeta.description,
  importCode: iconMeta.importCode,
  containerClass: iconMeta.containerClass,
  accessibility: iconMeta.accessibility,
  featureSections: iconMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: iconMeta.apiSections
};
