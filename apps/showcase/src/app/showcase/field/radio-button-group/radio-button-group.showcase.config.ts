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

const RADIO_BUTTON_GROUP_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Group label',
    defaultValue: 'Choose an option',
    placeholder: 'Enter label',
    group: 'content',
  },
  {
    key: 'helpText',
    label: 'Help Text',
    type: 'text',
    description: 'Helper text',
    defaultValue: '',
    placeholder: 'Enter help text',
    group: 'content',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Color variant',
    defaultValue: 'secondary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style',
    defaultValue: 'outline',
    group: 'appearance',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'horizontal',
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
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'layout',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable group',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: 'switch',
    description: 'Make readonly',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'required',
    label: 'Required',
    type: 'switch',
    description: 'Mark as required',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_CONTROLS = toDrawerFormControls(RADIO_BUTTON_GROUP_CONTROL_DEFS);

export const RADIO_BUTTON_GROUP_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  appearance: { excludeKey: 'appearance' },
  variant: { excludeKey: 'variant' },
  orientation: { excludeKey: 'orientation' },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
});

export const RADIO_BUTTON_GROUP_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-radio-button-group',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(RADIO_BUTTON_GROUP_CONTROL_DEFS),
};
