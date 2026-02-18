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
  ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const BREADCRUMB_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    defaultValue: 'primary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    defaultValue: 'subtle',
    group: 'appearance',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'layout',
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
    key: 'showIcons',
    label: 'Show Icons',
    type: 'switch',
    defaultValue: true,
    group: 'appearance',
  },
  {
    key: 'showIndicator',
    label: 'Show Indicator',
    type: 'switch',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'indicatorPosition',
    label: 'Indicator Position',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'horizontal',
    group: 'appearance',
  },
  {
    key: 'focusMode',
    label: 'Focus Mode',
    type: 'dropdown',
    options: [
      { value: 'tab', label: 'Tab' },
      { value: 'arrow', label: 'Arrow' },
    ],
    defaultValue: 'tab',
    group: 'layout',
  },
  {
    key: 'responsiveOverflow',
    label: 'Responsive Overflow',
    type: 'switch',
    defaultValue: true,
    group: 'layout',
  },
  {
    key: 'truncateLength',
    label: 'Truncate Length',
    type: 'number',
    defaultValue: 0,
    min: 0,
    description: '0 = no truncation',
    group: 'layout',
  },
  {
    key: 'maxDisplayedItems',
    label: 'Max Displayed Items',
    type: 'number',
    defaultValue: 0,
    min: 0,
    description: '0 = auto/responsive',
    group: 'layout',
  },
];

const ALL_CONTROLS = toDrawerFormControls(BREADCRUMB_CONTROL_DEFS);

export const BREADCRUMB_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: ['appearance', 'variant', 'size', 'shape'] },
  appearanceVariant: { excludeKeys: ['appearance', 'variant'] },
  icons: { excludeKeys: ['appearance', 'variant', 'showIcons'] },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  states: { excludeKeys: ['showIndicator', 'indicatorPosition'] },
  selectionIndicators: { excludeKeys: ['appearance', 'variant'] },
});

export const BREADCRUMB_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-breadcrumb',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(BREADCRUMB_CONTROL_DEFS),
};
