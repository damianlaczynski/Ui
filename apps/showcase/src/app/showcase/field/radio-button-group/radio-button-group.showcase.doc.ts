import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { RadioButtonGroupBasicDemoComponent } from './examples/radio-button-group-basic-demo';
import { RadioButtonGroupIconsDemoComponent } from './examples/radio-button-group-icons-demo';
import { RadioButtonGroupLayoutDemoComponent } from './examples/radio-button-group-layout-demo';
import { RadioButtonGroupSettingsPanelDemoComponent } from './examples/radio-button-group-settings-panel-demo';
import { RadioButtonGroupStatesDemoComponent } from './examples/radio-button-group-states-demo';
import meta from './radio-button-group.showcase.meta.json';

const radioButtonGroupMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: RadioButtonGroupBasicDemoComponent,
  layout: RadioButtonGroupLayoutDemoComponent,
  icons: RadioButtonGroupIconsDemoComponent,
  states: RadioButtonGroupStatesDemoComponent,
  settingsPanel: RadioButtonGroupSettingsPanelDemoComponent,
} as const;

export const RADIO_BUTTON_GROUP_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${radioButtonGroupMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(radioButtonGroupMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${radioButtonGroupMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const RADIO_BUTTON_GROUP_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: radioButtonGroupMeta.title,
  description: radioButtonGroupMeta.description,
  importCode: radioButtonGroupMeta.importCode,
  containerClass: radioButtonGroupMeta.containerClass,
  accessibility: radioButtonGroupMeta.accessibility,
  featureSections: radioButtonGroupMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: radioButtonGroupMeta.apiSections,
};
