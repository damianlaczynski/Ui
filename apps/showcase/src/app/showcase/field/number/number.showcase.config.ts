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

const NUMBER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Quantity',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    description: 'Placeholder text',
    defaultValue: 'Enter number…',
    placeholder: 'Enter placeholder',
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
    key: 'min',
    label: 'Min',
    type: 'number',
    description: 'Minimum value',
    defaultValue: 0,
    group: 'range',
    drawer: false,
  },
  {
    key: 'max',
    label: 'Max',
    type: 'number',
    description: 'Maximum value',
    defaultValue: 100,
    group: 'range',
    drawer: false,
  },
  {
    key: 'step',
    label: 'Step',
    type: 'number',
    description: 'Step increment',
    defaultValue: 1,
    group: 'range',
    drawer: false,
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions([...INPUT_VARIANTS]),
    description: 'Input variant',
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

const NUMBER_FORM_CONTROLS = toDrawerFormControls(NUMBER_CONTROL_DEFS);

export const NUMBER_DRAWER_CONFIGS = createDrawerFormConfigs(NUMBER_FORM_CONTROLS, {
  size: { excludeKey: 'size' },
  variant: { excludeKey: 'variant' },
  labelPosition: { excludeKey: 'labelPosition' },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
  stepper: { excludeKeys: [] },
});

export const NUMBER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-number',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'range',
      label: 'Range',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
    },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(NUMBER_CONTROL_DEFS),
};
