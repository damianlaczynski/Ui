import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { AvatarAppearanceExampleComponent } from './examples/avatar-appearance-demo';
import { AvatarBasicExampleComponent } from './examples/avatar-basic-demo';
import { AvatarLayoutExampleComponent } from './examples/avatar-layout-demo';
import { AvatarProfileHeaderExampleComponent } from './examples/avatar-profile-header-demo';
import { AvatarStatesExampleComponent } from './examples/avatar-states-demo';
import { AvatarWorkspaceStripExampleComponent } from './examples/avatar-workspace-strip-demo';
import meta from './avatar.showcase.meta.json';

const avatarMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: AvatarBasicExampleComponent,
  appearance: AvatarAppearanceExampleComponent,
  layout: AvatarLayoutExampleComponent,
  states: AvatarStatesExampleComponent,
  strip: AvatarWorkspaceStripExampleComponent,
  profile: AvatarProfileHeaderExampleComponent,
} as const;

export const AVATAR_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${avatarMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(avatarMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${avatarMeta.slug}/${file}`,
    ]),
  ) as Record<string, string>),
};

export const AVATAR_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: avatarMeta.title,
  description: avatarMeta.description,
  importCode: avatarMeta.importCode,
  containerClass: avatarMeta.containerClass,
  accessibility: avatarMeta.accessibility,
  featureSections: avatarMeta.featureSections.map(section => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap],
  })),
  apiSections: avatarMeta.apiSections,
};
