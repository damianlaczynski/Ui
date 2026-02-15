import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';
import {
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';

const TIME_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: SIZES.map(size => ({ value: size, label: size })),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    defaultValue: 'Select time',
    group: 'appearance',
  },
  {
    key: 'required',
    label: 'Required',
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
];

export const TIME_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-time',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    {
      id: 'state',
      label: 'State',
      icon: SHOWCASE_GROUP_ICONS['state'],
      expanded: true,
    },
  ],
  controls: toShowcaseControls(TIME_CONTROL_DEFS),
};
