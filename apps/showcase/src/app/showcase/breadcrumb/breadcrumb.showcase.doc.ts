import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { BreadcrumbBasicExampleComponent } from './examples/breadcrumb-basic-demo';
import { BreadcrumbOverflowExampleComponent } from './examples/breadcrumb-overflow-demo';
import { BreadcrumbProjectHeaderExampleComponent } from './examples/breadcrumb-project-header-demo';
import { BreadcrumbStatesExampleComponent } from './examples/breadcrumb-states-demo';
import { BreadcrumbStylesExampleComponent } from './examples/breadcrumb-styles-demo';
import { BreadcrumbWorkspaceExampleComponent } from './examples/breadcrumb-workspace-demo';
import meta from './breadcrumb.showcase.meta.json';

const breadcrumbMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: BreadcrumbBasicExampleComponent,
  styles: BreadcrumbStylesExampleComponent,
  states: BreadcrumbStatesExampleComponent,
  overflow: BreadcrumbOverflowExampleComponent,
  workspace: BreadcrumbWorkspaceExampleComponent,
  header: BreadcrumbProjectHeaderExampleComponent,
} as const;

export const BREADCRUMB_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${breadcrumbMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(breadcrumbMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${breadcrumbMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const BREADCRUMB_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: breadcrumbMeta.title,
  description: breadcrumbMeta.description,
  importCode: breadcrumbMeta.importCode,
  containerClass: breadcrumbMeta.containerClass,
  accessibility: breadcrumbMeta.accessibility,
  featureSections: breadcrumbMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: breadcrumbMeta.apiSections,
};
