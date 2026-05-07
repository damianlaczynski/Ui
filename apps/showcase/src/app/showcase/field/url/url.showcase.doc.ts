import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { UrlBasicDemoComponent } from './examples/url-basic-demo';
import { UrlLayoutDemoComponent } from './examples/url-layout-demo';
import { UrlLinkPanelDemoComponent } from './examples/url-link-panel-demo';
import { UrlProfileFormDemoComponent } from './examples/url-profile-form-demo';
import { UrlStatesDemoComponent } from './examples/url-states-demo';
import { UrlValidationDemoComponent } from './examples/url-validation-demo';
import meta from './url.showcase.meta.json';

const urlMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: UrlBasicDemoComponent,
  layout: UrlLayoutDemoComponent,
  states: UrlStatesDemoComponent,
  validation: UrlValidationDemoComponent,
  profileForm: UrlProfileFormDemoComponent,
  linkPanel: UrlLinkPanelDemoComponent,
} as const;

export const URL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${urlMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(urlMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${urlMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const URL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: urlMeta.title,
  description: urlMeta.description,
  importCode: urlMeta.importCode,
  containerClass: urlMeta.containerClass,
  accessibility: urlMeta.accessibility,
  featureSections: urlMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: urlMeta.apiSections,
};
