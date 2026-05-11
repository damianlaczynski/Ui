import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TotpAppearanceDemoComponent } from './examples/totp-appearance-demo';
import { TotpBasicDemoComponent } from './examples/totp-basic-demo';
import { TotpDigitsDemoComponent } from './examples/totp-digits-demo';
import { TotpStatesDemoComponent } from './examples/totp-states-demo';
import { TotpValidationDemoComponent } from './examples/totp-validation-demo';
import { TotpVerificationPanelDemoComponent } from './examples/totp-verification-panel-demo';
import meta from './totp.showcase.meta.json';

const totpMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TotpBasicDemoComponent,
  digits: TotpDigitsDemoComponent,
  appearance: TotpAppearanceDemoComponent,
  states: TotpStatesDemoComponent,
  validation: TotpValidationDemoComponent,
  verificationPanel: TotpVerificationPanelDemoComponent,
} as const;

export const TOTP_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${totpMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(totpMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${totpMeta.slug}/${file}`]),
  ) as Record<string, string>),
};

export const TOTP_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: totpMeta.title,
  description: totpMeta.description,
  importCode: totpMeta.importCode,
  containerClass: totpMeta.containerClass,
  accessibility: totpMeta.accessibility,
  featureSections: totpMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: totpMeta.apiSections,
};
