import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const DATE_CONTROL_DEFS: SharedControlDef[] = [
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

const ALL_CONTROLS = toDrawerFormControls(DATE_CONTROL_DEFS);

export const DATE_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
});

export const DATE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-date',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'], expanded: true },
  ],
  controls: toShowcaseControls(DATE_CONTROL_DEFS),
};
