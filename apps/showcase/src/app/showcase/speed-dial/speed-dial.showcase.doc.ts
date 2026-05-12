import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { SpeedDialArcDemoComponent } from './examples/speed-dial-arc-demo';
import { SpeedDialBehaviorDemoComponent } from './examples/speed-dial-behavior-demo';
import { SpeedDialCircleDemoComponent } from './examples/speed-dial-circle-demo';
import { SpeedDialCoordinationDemoComponent } from './examples/speed-dial-coordination-demo';
import { SpeedDialLinearDemoComponent } from './examples/speed-dial-linear-demo';
import { SpeedDialWorkspaceDemoComponent } from './examples/speed-dial-workspace-demo';
import meta from './speed-dial.showcase.meta.json';

const speedDialMeta = meta as ShowcaseDocMeta;

const componentMap = {
  linear: SpeedDialLinearDemoComponent,
  circle: SpeedDialCircleDemoComponent,
  arc: SpeedDialArcDemoComponent,
  behavior: SpeedDialBehaviorDemoComponent,
  coordination: SpeedDialCoordinationDemoComponent,
  workspace: SpeedDialWorkspaceDemoComponent,
} as const;

export const SPEED_DIAL_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${speedDialMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(speedDialMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${speedDialMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const SPEED_DIAL_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: speedDialMeta.title,
  description: speedDialMeta.description,
  importCode: speedDialMeta.importCode,
  containerClass: speedDialMeta.containerClass,
  accessibility: speedDialMeta.accessibility,
  featureSections: speedDialMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: speedDialMeta.apiSections,
};
