import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { CommandPaletteBasicDemoComponent } from './examples/command-palette-basic-demo';
import { CommandPaletteEmptyResultsDemoComponent } from './examples/command-palette-empty-results-demo';
import { CommandPaletteGroupingDemoComponent } from './examples/command-palette-grouping-demo';
import { CommandPaletteOptionsDemoComponent } from './examples/command-palette-options-demo';
import { CommandPaletteWorkspaceDemoComponent } from './examples/command-palette-workspace-demo';
import meta from './command-palette.showcase.meta.json';

const commandPaletteMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: CommandPaletteBasicDemoComponent,
  grouping: CommandPaletteGroupingDemoComponent,
  options: CommandPaletteOptionsDemoComponent,
  emptyResults: CommandPaletteEmptyResultsDemoComponent,
  workspace: CommandPaletteWorkspaceDemoComponent,
} as const;

export const COMMAND_PALETTE_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${commandPaletteMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(commandPaletteMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${commandPaletteMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const COMMAND_PALETTE_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: commandPaletteMeta.title,
  description: commandPaletteMeta.description,
  importCode: commandPaletteMeta.importCode,
  containerClass: commandPaletteMeta.containerClass,
  accessibility: commandPaletteMeta.accessibility,
  featureSections: commandPaletteMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: commandPaletteMeta.apiSections,
};
