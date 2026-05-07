import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { StepperBasicExampleComponent } from './examples/stepper-basic-demo';
import { StepperLinearProgressExampleComponent } from './examples/stepper-linear-progress-demo';
import { StepperOnboardingWizardExampleComponent } from './examples/stepper-onboarding-wizard-demo';
import { StepperStepStatesExampleComponent } from './examples/stepper-step-states-demo';
import { StepperVerticalExampleComponent } from './examples/stepper-vertical-demo';
import meta from './stepper.showcase.meta.json';

const stepperMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: StepperBasicExampleComponent,
  linear: StepperLinearProgressExampleComponent,
  vertical: StepperVerticalExampleComponent,
  states: StepperStepStatesExampleComponent,
  wizard: StepperOnboardingWizardExampleComponent,
} as const;

export const STEPPER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${stepperMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(stepperMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${stepperMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const STEPPER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: stepperMeta.title,
  description: stepperMeta.description,
  importCode: stepperMeta.importCode,
  containerClass: stepperMeta.containerClass,
  accessibility: stepperMeta.accessibility,
  featureSections: stepperMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: stepperMeta.apiSections,
};
