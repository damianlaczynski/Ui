import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { CarouselAutoplayDemoComponent } from './examples/carousel-autoplay-demo';
import { CarouselBasicDemoComponent } from './examples/carousel-basic-demo';
import { CarouselCustomTemplateDemoComponent } from './examples/carousel-custom-template-demo';
import { CarouselNavigationDemoComponent } from './examples/carousel-navigation-demo';
import { CarouselSizesDemoComponent } from './examples/carousel-sizes-demo';
import { CarouselWorkspaceHighlightsDemoComponent } from './examples/carousel-workspace-highlights-demo';
import meta from './carousel.showcase.meta.json';

const carouselMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: CarouselBasicDemoComponent,
  navigation: CarouselNavigationDemoComponent,
  autoplay: CarouselAutoplayDemoComponent,
  sizes: CarouselSizesDemoComponent,
  customTemplate: CarouselCustomTemplateDemoComponent,
  workspaceHighlights: CarouselWorkspaceHighlightsDemoComponent,
} as const;

export const CAROUSEL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/llms/${carouselMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(carouselMeta.snippets).map(([key, file]) => [
      key,
      `/llms/snippets/${carouselMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const CAROUSEL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: carouselMeta.title,
  description: carouselMeta.description,
  importCode: carouselMeta.importCode,
  containerClass: carouselMeta.containerClass,
  accessibility: carouselMeta.accessibility,
  featureSections: carouselMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: carouselMeta.apiSections,
};
