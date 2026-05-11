import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { NumberBasicDemoComponent } from './examples/number-basic-demo';
import { NumberBudgetFormDemoComponent } from './examples/number-budget-form-demo';
import { NumberSizeVariantDemoComponent } from './examples/number-size-variant-demo';
import { NumberStatesValidationDemoComponent } from './examples/number-states-validation-demo';
import { NumberStepRangesDemoComponent } from './examples/number-step-ranges-demo';
import meta from './number.showcase.meta.json';

const numberMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: NumberBasicDemoComponent,
  stepRanges: NumberStepRangesDemoComponent,
  sizeVariant: NumberSizeVariantDemoComponent,
  statesValidation: NumberStatesValidationDemoComponent,
  budgetForm: NumberBudgetFormDemoComponent
} as const;

export const NUMBER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${numberMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(numberMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${numberMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const NUMBER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: numberMeta.title,
  description: numberMeta.description,
  importCode: numberMeta.importCode,
  containerClass: numberMeta.containerClass,
  accessibility: numberMeta.accessibility,
  featureSections: numberMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: numberMeta.apiSections
};
