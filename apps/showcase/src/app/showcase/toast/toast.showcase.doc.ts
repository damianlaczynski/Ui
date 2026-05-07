import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { ToastActionsExampleComponent } from './examples/toast-actions-demo';
import { ToastAppearanceExampleComponent } from './examples/toast-appearance-demo';
import { ToastBasicExampleComponent } from './examples/toast-basic-demo';
import { ToastOptionsExampleComponent } from './examples/toast-options-demo';
import { ToastServiceExampleComponent } from './examples/toast-service-demo';
import { ToastSizesExampleComponent } from './examples/toast-sizes-demo';
import { ToastStickyExampleComponent } from './examples/toast-sticky-demo';
import { ToastVariantsExampleComponent } from './examples/toast-variants-demo';
import meta from './toast.showcase.meta.json';

const toastMeta = meta as ShowcaseDocMeta;

const componentMap = {
  service: ToastServiceExampleComponent,
  basic: ToastBasicExampleComponent,
  variants: ToastVariantsExampleComponent,
  appearance: ToastAppearanceExampleComponent,
  sizes: ToastSizesExampleComponent,
  options: ToastOptionsExampleComponent,
  sticky: ToastStickyExampleComponent,
  actions: ToastActionsExampleComponent,
} as const;

export const TOAST_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${toastMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(toastMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${toastMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TOAST_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: toastMeta.title,
  description: toastMeta.description,
  importCode: toastMeta.importCode,
  containerClass: toastMeta.containerClass,
  accessibility: toastMeta.accessibility,
  featureSections: toastMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: toastMeta.apiSections,
};
