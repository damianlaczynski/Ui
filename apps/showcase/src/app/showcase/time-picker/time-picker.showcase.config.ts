import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';

export const TIME_PICKER_STEPS = [60, 300, 900, 1800] as const;

const TIME_PICKER_STEP_OPTIONS = [
  { value: 60, label: '1 min' },
  { value: 300, label: '5 min' },
  { value: 900, label: '15 min' },
  { value: 1800, label: '30 min' },
];

const TIME_PICKER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(size => ({ value: size, label: size })),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'step',
    label: 'Step',
    type: 'dropdown',
    options: TIME_PICKER_STEP_OPTIONS,
    defaultValue: 60,
    group: 'behavior',
  },
  {
    key: 'use24HourFormat',
    label: '24-Hour Format',
    type: 'switch',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'inline',
    label: 'Inline',
    type: 'switch',
    defaultValue: false,
    group: 'layout',
  },
  {
    key: 'showLabel',
    label: 'Show Label',
    type: 'switch',
    defaultValue: false,
    group: 'layout',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(TIME_PICKER_CONTROL_DEFS);

export const TIME_PICKER_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
  format: { excludeKey: 'use24HourFormat' },
  size: { excludeKey: 'size' },
  step: { excludeKey: 'step' },
  inlineLabel: { excludeKeys: ['inline', 'showLabel'] },
  state: { excludeKey: 'disabled' },
});

export const TIME_PICKER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-time-picker',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'], expanded: true },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(TIME_PICKER_CONTROL_DEFS),
};
