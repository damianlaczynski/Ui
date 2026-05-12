import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { AccordionAppearanceShapeExampleComponent } from './examples/accordion-appearance-shape-demo';
import { AccordionBasicExampleComponent } from './examples/accordion-basic-demo';
import { AccordionChevronIconsExampleComponent } from './examples/accordion-chevron-icons-demo';
import { AccordionIndicatorsExampleComponent } from './examples/accordion-indicators-demo';
import { AccordionQuickActionsExampleComponent } from './examples/accordion-quick-actions-demo';
import { AccordionSettingsFormExampleComponent } from './examples/accordion-settings-form-demo';
import meta from './accordion.showcase.meta.json';

const accordionMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: AccordionBasicExampleComponent,
  appearanceShape: AccordionAppearanceShapeExampleComponent,
  chevronsIcons: AccordionChevronIconsExampleComponent,
  indicators: AccordionIndicatorsExampleComponent,
  quickActions: AccordionQuickActionsExampleComponent,
  settingsForm: AccordionSettingsFormExampleComponent,
} as const;

export const ACCORDION_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${accordionMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(accordionMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${accordionMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const ACCORDION_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: accordionMeta.title,
  description: accordionMeta.description,
  importCode: accordionMeta.importCode,
  containerClass: accordionMeta.containerClass,
  accessibility: accordionMeta.accessibility,
  featureSections: accordionMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: accordionMeta.apiSections,
};
