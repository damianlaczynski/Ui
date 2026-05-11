import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TextBasicExampleComponent } from './examples/text-basic-demo';
import { TextLabelClearExampleComponent } from './examples/text-label-clear-demo';
import { TextProfileFormExampleComponent } from './examples/text-profile-form-demo';
import { TextStatesValidationExampleComponent } from './examples/text-states-validation-demo';
import { TextVariantsExampleComponent } from './examples/text-variants-demo';
import meta from './text.showcase.meta.json';

const textMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TextBasicExampleComponent,
  variants: TextVariantsExampleComponent,
  labelClear: TextLabelClearExampleComponent,
  statesValidation: TextStatesValidationExampleComponent,
  profileForm: TextProfileFormExampleComponent,
} as const;

export const TEXT_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${textMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(textMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${textMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TEXT_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: textMeta.title,
  description: textMeta.description,
  importCode: textMeta.importCode,
  containerClass: textMeta.containerClass,
  accessibility: textMeta.accessibility,
  featureSections: textMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: textMeta.apiSections,
};
