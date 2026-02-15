import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const MONTH_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(size => ({ value: size, label: size })),
    defaultValue: 'medium',
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

const ALL_CONTROLS = toDrawerFormControls(MONTH_CONTROL_DEFS);

export const MONTH_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
});

export const MONTH_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-month',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'], expanded: true },
  ],
  controls: toShowcaseControls(MONTH_CONTROL_DEFS),
};
