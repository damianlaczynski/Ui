import type { ContentPosition } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
  ICON_OPTIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const BADGE_ICON_POSITIONS: ContentPosition[] = ['before', 'after'];

const BADGE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    description: 'Badge label text',
    defaultValue: 'Badge',
    placeholder: 'Enter badge text',
    group: 'content',
  },
  {
    key: 'ariaLabel',
    label: 'Aria Label',
    type: 'text',
    description: 'Accessible label for screen readers',
    defaultValue: '',
    placeholder: 'Enter aria label',
    group: 'content',
  },
  {
    key: 'icon',
    label: 'Icon',
    type: 'dropdown',
    options: ICON_OPTIONS,
    description: 'Icon name',
    defaultValue: '',
    group: 'content',
  },
  {
    key: 'iconPosition',
    label: 'Icon Position',
    type: 'dropdown',
    options: toOptions(BADGE_ICON_POSITIONS),
    description: 'Position of icon relative to text',
    defaultValue: 'before',
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Color variant',
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style',
    defaultValue: 'filled',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'layout',
  },
];

const ALL_CONTROLS = toDrawerFormControls(BADGE_CONTROL_DEFS);

export const BADGE_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant'] },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  icons: { excludeKeys: ['appearance', 'variant', 'icon'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  iconPosition: { excludeKey: 'iconPosition' },
});

export const BADGE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-badge',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(BADGE_CONTROL_DEFS),
};
