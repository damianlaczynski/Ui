import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  SIZES,
  INPUT_VARIANTS,
  CONTENT_POSITIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const FILE_MODES = ['area', 'inline'] as const;

const FILE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Upload File',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'helpText',
    label: 'Help Text',
    type: 'text',
    description: 'Helper text',
    defaultValue: '',
    placeholder: 'Enter help text',
    group: 'content',
    drawer: false,
  },
  {
    key: 'mode',
    label: 'Mode',
    type: 'dropdown',
    options: toOptions([...FILE_MODES]),
    defaultValue: 'area',
    group: 'appearance',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions([...INPUT_VARIANTS]),
    defaultValue: 'filled',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'labelPosition',
    label: 'Label Position',
    type: 'dropdown',
    options: toOptions([...CONTENT_POSITIONS]),
    defaultValue: 'above',
    group: 'appearance',
  },
  {
    key: 'multiple',
    label: 'Multiple',
    type: 'switch',
    description: 'Allow multiple files',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable field',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: 'switch',
    description: 'Read-only state',
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

const FILE_FORM_CONTROLS = toDrawerFormControls(FILE_CONTROL_DEFS);

export const FILE_DRAWER_CONFIGS = createDrawerFormConfigs(FILE_FORM_CONTROLS, {
  mode: { excludeKey: 'mode' },
  size: { excludeKey: 'size' },
  variant: { excludeKey: 'variant' },
  labelPosition: { excludeKey: 'labelPosition' },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
});

export const FILE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-file',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(FILE_CONTROL_DEFS),
};
