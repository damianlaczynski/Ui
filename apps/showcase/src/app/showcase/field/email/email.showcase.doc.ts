import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { EmailBasicDemoComponent } from './examples/email-basic-demo';
import { EmailFormDemoComponent } from './examples/email-form-demo';
import { EmailInvitePanelDemoComponent } from './examples/email-invite-panel-demo';
import { EmailLayoutDemoComponent } from './examples/email-layout-demo';
import { EmailStatesDemoComponent } from './examples/email-states-demo';
import { EmailValidationDemoComponent } from './examples/email-validation-demo';
import meta from './email.showcase.meta.json';

const emailMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: EmailBasicDemoComponent,
  layout: EmailLayoutDemoComponent,
  validation: EmailValidationDemoComponent,
  states: EmailStatesDemoComponent,
  form: EmailFormDemoComponent,
  invitePanel: EmailInvitePanelDemoComponent,
} as const;

export const EMAIL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${emailMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(emailMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${emailMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const EMAIL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: emailMeta.title,
  description: emailMeta.description,
  importCode: emailMeta.importCode,
  containerClass: emailMeta.containerClass,
  accessibility: emailMeta.accessibility,
  featureSections: emailMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: emailMeta.apiSections,
};
