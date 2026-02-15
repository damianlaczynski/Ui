import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const WEEK_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(size => ({ value: size, label: size })),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'displayFormat',
    label: 'Display Format',
    type: 'dropdown',
    options: [
      { value: 'date-range', label: 'Date Range (6-12 Jan 2026)' },
      { value: 'week-year', label: 'Week/Year (1/2026)' },
      { value: 'iso', label: 'ISO (2026-W01)' },
    ],
    defaultValue: 'date-range',
    group: 'appearance',
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

const ALL_CONTROLS = toDrawerFormControls(WEEK_CONTROL_DEFS);

export const WEEK_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
});

export const WEEK_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-week',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'], expanded: true },
  ],
  controls: toShowcaseControls(WEEK_CONTROL_DEFS),
};
