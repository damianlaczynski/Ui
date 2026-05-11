import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SwitchBasicExampleComponent } from './examples/switch-basic-demo';
import { SwitchHelperValidationExampleComponent } from './examples/switch-helper-validation-demo';
import { SwitchLabelPositionsExampleComponent } from './examples/switch-label-positions-demo';
import { SwitchNotificationPanelExampleComponent } from './examples/switch-notification-panel-demo';
import { SwitchPreferencesFormExampleComponent } from './examples/switch-preferences-form-demo';
import { SwitchSizesStatesExampleComponent } from './examples/switch-sizes-states-demo';
import meta from './switch.showcase.meta.json';

const switchMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: SwitchBasicExampleComponent,
  positions: SwitchLabelPositionsExampleComponent,
  sizesStates: SwitchSizesStatesExampleComponent,
  validation: SwitchHelperValidationExampleComponent,
  preferences: SwitchPreferencesFormExampleComponent,
  notificationPanel: SwitchNotificationPanelExampleComponent
} as const;

export const SWITCH_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${switchMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(switchMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${switchMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const SWITCH_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: switchMeta.title,
  description: switchMeta.description,
  importCode: switchMeta.importCode,
  containerClass: switchMeta.containerClass,
  accessibility: switchMeta.accessibility,
  featureSections: switchMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: switchMeta.apiSections
};
