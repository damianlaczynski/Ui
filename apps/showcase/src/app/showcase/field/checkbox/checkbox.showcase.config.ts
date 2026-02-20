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
  SHAPES,
  CONTENT_POSITIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const CHECKBOX_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Checkbox label',
    defaultValue: 'Accept terms',
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
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions([...SHAPES]),
    defaultValue: 'rounded',
    group: 'appearance',
  },
  {
    key: 'labelPosition',
    label: 'Label Position',
    type: 'dropdown',
    options: toOptions([...CONTENT_POSITIONS]),
    defaultValue: 'after',
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
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable checkbox',
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

const CHECKBOX_FORM_CONTROLS = toDrawerFormControls(CHECKBOX_CONTROL_DEFS);

export const CHECKBOX_DRAWER_CONFIGS = createDrawerFormConfigs(CHECKBOX_FORM_CONTROLS, {
  shape: { excludeKey: 'shape' },
  size: { excludeKey: 'size' },
  labelPosition: { excludeKey: 'labelPosition' },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
  combinations: { excludeKeys: ['shape', 'size', 'labelPosition'] },
});

export const CHECKBOX_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-checkbox',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(CHECKBOX_CONTROL_DEFS),
};
