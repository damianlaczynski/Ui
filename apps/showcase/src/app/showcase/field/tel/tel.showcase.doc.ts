import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TelBasicDemoComponent } from './examples/tel-basic-demo';
import { TelContactFormDemoComponent } from './examples/tel-contact-form-demo';
import { TelLayoutDemoComponent } from './examples/tel-layout-demo';
import { TelStatesDemoComponent } from './examples/tel-states-demo';
import { TelSupportPanelDemoComponent } from './examples/tel-support-panel-demo';
import { TelValidationDemoComponent } from './examples/tel-validation-demo';
import meta from './tel.showcase.meta.json';

const telMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TelBasicDemoComponent,
  layout: TelLayoutDemoComponent,
  states: TelStatesDemoComponent,
  validation: TelValidationDemoComponent,
  contactForm: TelContactFormDemoComponent,
  supportPanel: TelSupportPanelDemoComponent,
} as const;

export const TEL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${telMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(telMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${telMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TEL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: telMeta.title,
  description: telMeta.description,
  importCode: telMeta.importCode,
  containerClass: telMeta.containerClass,
  accessibility: telMeta.accessibility,
  featureSections: telMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: telMeta.apiSections,
};
