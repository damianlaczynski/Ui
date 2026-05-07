import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { PasswordAutocompleteDemoComponent } from './examples/password-autocomplete-demo';
import { PasswordBasicDemoComponent } from './examples/password-basic-demo';
import { PasswordConfirmationDemoComponent } from './examples/password-confirmation-demo';
import { PasswordLayoutDemoComponent } from './examples/password-layout-demo';
import { PasswordResetPanelDemoComponent } from './examples/password-reset-panel-demo';
import { PasswordStrengthDemoComponent } from './examples/password-strength-demo';
import meta from './password.showcase.meta.json';

const passwordMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: PasswordBasicDemoComponent,
  layout: PasswordLayoutDemoComponent,
  autocomplete: PasswordAutocompleteDemoComponent,
  strength: PasswordStrengthDemoComponent,
  confirmation: PasswordConfirmationDemoComponent,
  resetPanel: PasswordResetPanelDemoComponent,
} as const;

export const PASSWORD_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${passwordMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(passwordMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${passwordMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const PASSWORD_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: passwordMeta.title,
  description: passwordMeta.description,
  importCode: passwordMeta.importCode,
  containerClass: passwordMeta.containerClass,
  accessibility: passwordMeta.accessibility,
  featureSections: passwordMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: passwordMeta.apiSections,
};
