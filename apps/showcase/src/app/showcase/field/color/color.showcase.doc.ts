import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ColorBasicExampleComponent } from './examples/color-basic-demo';
import { ColorBrandFormExampleComponent } from './examples/color-brand-form-demo';
import { ColorFormatsExampleComponent } from './examples/color-formats-demo';
import { ColorSurfaceOptionsExampleComponent } from './examples/color-surface-options-demo';
import { ColorThemePanelExampleComponent } from './examples/color-theme-panel-demo';
import { ColorToolsExampleComponent } from './examples/color-tools-demo';
import meta from './color.showcase.meta.json';

const colorMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ColorBasicExampleComponent,
  formats: ColorFormatsExampleComponent,
  surface: ColorSurfaceOptionsExampleComponent,
  tools: ColorToolsExampleComponent,
  brandForm: ColorBrandFormExampleComponent,
  themePanel: ColorThemePanelExampleComponent,
} as const;

export const COLOR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${colorMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(colorMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${colorMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const COLOR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: colorMeta.title,
  description: colorMeta.description,
  importCode: colorMeta.importCode,
  containerClass: colorMeta.containerClass,
  accessibility: colorMeta.accessibility,
  featureSections: colorMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: colorMeta.apiSections,
};
