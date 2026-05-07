import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ErrorStateActionsDemoComponent } from './examples/error-state-actions-demo';
import { ErrorStateBasicDemoComponent } from './examples/error-state-basic-demo';
import { ErrorStateCustomContentDemoComponent } from './examples/error-state-custom-content-demo';
import { ErrorStateIconsSizesDemoComponent } from './examples/error-state-icons-sizes-demo';
import { ErrorStatePanelLayoutDemoComponent } from './examples/error-state-panel-layout-demo';
import { ErrorStateScenariosDemoComponent } from './examples/error-state-scenarios-demo';
import meta from './error-state.showcase.meta.json';

const errorStateMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: ErrorStateBasicDemoComponent,
  iconsSizes: ErrorStateIconsSizesDemoComponent,
  actions: ErrorStateActionsDemoComponent,
  customContent: ErrorStateCustomContentDemoComponent,
  scenarios: ErrorStateScenariosDemoComponent,
  panelLayout: ErrorStatePanelLayoutDemoComponent,
} as const;

export const ERROR_STATE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${errorStateMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(errorStateMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${errorStateMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const ERROR_STATE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: errorStateMeta.title,
  description: errorStateMeta.description,
  importCode: errorStateMeta.importCode,
  containerClass: errorStateMeta.containerClass,
  accessibility: errorStateMeta.accessibility,
  featureSections: errorStateMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: errorStateMeta.apiSections,
};
