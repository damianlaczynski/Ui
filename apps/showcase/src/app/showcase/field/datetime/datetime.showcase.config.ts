import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const DATETIME_STEPS = [
  { value: 60, label: '1 min' },
  { value: 300, label: '5 min' },
  { value: 900, label: '15 min' },
] as const;

const DATETIME_CONTROL_DEFS: SharedControlDef[] = [
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
    options: DATETIME_STEPS.map(step => ({ value: step.value, label: step.label })),
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'required',
    label: 'Required',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(DATETIME_CONTROL_DEFS);

export const DATETIME_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
});

export const DATETIME_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-datetime',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    {
      id: 'behavior',
      label: 'Behavior',
      icon: SHOWCASE_GROUP_ICONS['behavior'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'], expanded: true },
  ],
  controls: toShowcaseControls(DATETIME_CONTROL_DEFS),
};
