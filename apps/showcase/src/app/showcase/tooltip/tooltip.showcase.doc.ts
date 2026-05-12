import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TooltipBasicExampleComponent } from './examples/tooltip-basic-demo';
import { TooltipDataTableExampleComponent } from './examples/tooltip-data-table-demo';
import { TooltipPositionsExampleComponent } from './examples/tooltip-positions-demo';
import { TooltipRelationshipExampleComponent } from './examples/tooltip-relationship-demo';
import { TooltipSizesExampleComponent } from './examples/tooltip-sizes-demo';
import { TooltipToolbarExampleComponent } from './examples/tooltip-toolbar-demo';
import meta from './tooltip.showcase.meta.json';

const tooltipMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TooltipBasicExampleComponent,
  positions: TooltipPositionsExampleComponent,
  sizes: TooltipSizesExampleComponent,
  relationship: TooltipRelationshipExampleComponent,
  toolbar: TooltipToolbarExampleComponent,
  table: TooltipDataTableExampleComponent,
} as const;

export const TOOLTIP_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${tooltipMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(tooltipMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${tooltipMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const TOOLTIP_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: tooltipMeta.title,
  description: tooltipMeta.description,
  importCode: tooltipMeta.importCode,
  containerClass: tooltipMeta.containerClass,
  accessibility: tooltipMeta.accessibility,
  featureSections: tooltipMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: tooltipMeta.apiSections,
};
