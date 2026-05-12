import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { RatingBasicExampleComponent } from './examples/rating-basic-demo';
import { RatingLabelsExampleComponent } from './examples/rating-labels-demo';
import { RatingListingSnapshotExampleComponent } from './examples/rating-listing-snapshot-demo';
import { RatingReviewFeedbackExampleComponent } from './examples/rating-review-feedback-demo';
import { RatingScaleExampleComponent } from './examples/rating-scale-demo';
import { RatingSizesStatesExampleComponent } from './examples/rating-sizes-states-demo';
import meta from './rating.showcase.meta.json';

const ratingMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: RatingBasicExampleComponent,
  sizes: RatingSizesStatesExampleComponent,
  scale: RatingScaleExampleComponent,
  labels: RatingLabelsExampleComponent,
  listing: RatingListingSnapshotExampleComponent,
  review: RatingReviewFeedbackExampleComponent,
} as const;

export const RATING_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${ratingMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(ratingMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${ratingMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const RATING_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: ratingMeta.title,
  description: ratingMeta.description,
  importCode: ratingMeta.importCode,
  containerClass: ratingMeta.containerClass,
  accessibility: ratingMeta.accessibility,
  featureSections: ratingMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: ratingMeta.apiSections,
};
