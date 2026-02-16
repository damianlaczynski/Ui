import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SIZES, SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const SLIDER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Slider label',
    defaultValue: 'Volume',
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
    key: 'min',
    label: 'Min',
    type: 'number',
    description: 'Minimum value',
    defaultValue: 0,
    group: 'range',
  },
  {
    key: 'max',
    label: 'Max',
    type: 'number',
    description: 'Maximum value',
    defaultValue: 100,
    group: 'range',
  },
  {
    key: 'step',
    label: 'Step',
    type: 'number',
    description: 'Step increment',
    defaultValue: 1,
    group: 'range',
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
    key: 'vertical',
    label: 'Vertical',
    type: 'switch',
    description: 'Vertical orientation',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'showStepMarkers',
    label: 'Show Step Markers',
    type: 'switch',
    description: 'Display step markers on track',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'showMinMax',
    label: 'Show Min/Max',
    type: 'switch',
    description: 'Display min and max values',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'ariaValueText',
    label: 'ariaValueText',
    type: 'switch',
    description: 'Custom accessible value description',
    defaultValue: false,
    group: 'appearance',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Disable slider',
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

const SLIDER_FORM_CONTROLS = toDrawerFormControls(SLIDER_CONTROL_DEFS);

export const SLIDER_DRAWER_CONFIGS = createDrawerFormConfigs(SLIDER_FORM_CONTROLS, {
  basic: { excludeKeys: ['min', 'max', 'step'] },
  size: { excludeKey: 'size' },
  range: { excludeKeys: ['min', 'max', 'step'] },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
});

export const SLIDER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-slider',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'range',
      label: 'Range',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    { id: 'appearance', label: 'Appearance', icon: SHOWCASE_GROUP_ICONS['appearance'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(SLIDER_CONTROL_DEFS),
};
