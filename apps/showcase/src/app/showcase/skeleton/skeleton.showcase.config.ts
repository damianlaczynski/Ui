import type { Shape } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHAPES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const WIDTHS = ['80px', '120px', '160px', '220px', '100%'] as const;
const HEIGHTS = ['12px', '16px', '24px', '48px', '80px', '120px'] as const;
const BORDER_RADII = ['0px', '4px', '8px', '16px', '9999px'] as const;

export const SKELETON_SHAPES: Shape[] = [...SHAPES];
export const SKELETON_WIDTH_OPTIONS = toOptions([...WIDTHS]);
export const SKELETON_HEIGHT_OPTIONS = toOptions([...HEIGHTS]);
export const SKELETON_BORDER_RADIUS_OPTIONS = toOptions([...BORDER_RADII]);

const SKELETON_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions([...SKELETON_SHAPES]),
    defaultValue: 'rounded',
    group: 'appearance',
  },
  {
    key: 'animated',
    label: 'Animated',
    type: 'switch',
    defaultValue: true,
    group: 'appearance',
  },
  {
    key: 'width',
    label: 'Width',
    type: 'dropdown',
    options: SKELETON_WIDTH_OPTIONS,
    defaultValue: '160px',
    group: 'layout',
  },
  {
    key: 'height',
    label: 'Height',
    type: 'dropdown',
    options: SKELETON_HEIGHT_OPTIONS,
    defaultValue: '48px',
    group: 'layout',
  },
  {
    key: 'borderRadius',
    label: 'Border Radius',
    type: 'dropdown',
    options: SKELETON_BORDER_RADIUS_OPTIONS,
    defaultValue: '8px',
    group: 'layout',
  },
];

const SKELETON_FORM_CONTROLS = toDrawerFormControls(SKELETON_CONTROL_DEFS);

export const SKELETON_DRAWER_CONFIGS = createDrawerFormConfigs(SKELETON_FORM_CONTROLS, {
  shape: { excludeKey: 'shape' },
  animation: { excludeKey: 'animated' },
  size: { excludeKeys: ['width', 'height'] },
  patterns: { excludeKeys: ['width', 'height'] },
});

export const SKELETON_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-skeleton',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(SKELETON_CONTROL_DEFS),
};
