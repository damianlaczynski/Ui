import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { FileBasicDemoComponent } from './examples/file-basic-demo';
import { FileFiltersLimitsDemoComponent } from './examples/file-filters-limits-demo';
import { FileFormDemoComponent } from './examples/file-form-demo';
import { FileLayoutDemoComponent } from './examples/file-layout-demo';
import { FileMultipleDemoComponent } from './examples/file-multiple-demo';
import { FileRequestPanelDemoComponent } from './examples/file-request-panel-demo';
import { FileStatesValidationDemoComponent } from './examples/file-states-validation-demo';
import meta from './file.showcase.meta.json';

const fileMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: FileBasicDemoComponent,
  layout: FileLayoutDemoComponent,
  filtersLimits: FileFiltersLimitsDemoComponent,
  multiple: FileMultipleDemoComponent,
  statesValidation: FileStatesValidationDemoComponent,
  form: FileFormDemoComponent,
  requestPanel: FileRequestPanelDemoComponent
} as const;

export const FILE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${fileMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(fileMeta.snippets).map(([key, file]) => [key, `/docs/components/snippets/${fileMeta.slug}/${file}`])
  ) as Record<string, string>)
};

export const FILE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: fileMeta.title,
  description: fileMeta.description,
  importCode: fileMeta.importCode,
  containerClass: fileMeta.containerClass,
  accessibility: fileMeta.accessibility,
  featureSections: fileMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: fileMeta.apiSections
};
