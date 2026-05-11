import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { DataGridAdvancedConfigurationDemoComponent } from './examples/data-grid-advanced-configuration-demo';
import { DataGridBasicPresetDemoComponent } from './examples/data-grid-basic-preset-demo';
import { DataGridColumnFactoryDemoComponent } from './examples/data-grid-column-factory-demo';
import { DataGridExpandableRowsDemoComponent } from './examples/data-grid-expandable-rows-demo';
import { DataGridFilteringDemoComponent } from './examples/data-grid-filtering-demo';
import { DataGridFullFeaturedDemoComponent } from './examples/data-grid-full-featured-demo';
import { DataGridSelectionDemoComponent } from './examples/data-grid-selection-demo';
import { DataGridServerSideFeaturesDemoComponent } from './examples/data-grid-server-side-features-demo';
import { DataGridVirtualizationDemoComponent } from './examples/data-grid-virtualization-demo';
import meta from './data-grid.showcase.meta.json';

const dataGridMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basicPreset: DataGridBasicPresetDemoComponent,
  columnFactory: DataGridColumnFactoryDemoComponent,
  selection: DataGridSelectionDemoComponent,
  serverSideFeatures: DataGridServerSideFeaturesDemoComponent,
  virtualization: DataGridVirtualizationDemoComponent,
  filtering: DataGridFilteringDemoComponent,
  expandableRows: DataGridExpandableRowsDemoComponent,
  fullFeatured: DataGridFullFeaturedDemoComponent,
  advancedConfiguration: DataGridAdvancedConfigurationDemoComponent
} as const;

export const DATA_GRID_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${dataGridMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(dataGridMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${dataGridMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const DATA_GRID_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: dataGridMeta.title,
  description: dataGridMeta.description,
  importCode: dataGridMeta.importCode,
  containerClass: dataGridMeta.containerClass,
  accessibility: dataGridMeta.accessibility,
  featureSections: dataGridMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: dataGridMeta.apiSections
};
