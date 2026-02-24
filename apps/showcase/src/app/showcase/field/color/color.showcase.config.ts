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

const COLOR_FORMATS = ['hex', 'rgb', 'hsl'] as const;

const COLOR_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Pick a color',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    description: 'Placeholder text',
    defaultValue: 'Select color',
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
    key: 'format',
    label: 'Format',
    type: 'dropdown',
    options: toOptions([...COLOR_FORMATS]),
    defaultValue: 'hex',
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
    key: 'showAlpha',
    label: 'Show Alpha',
    type: 'switch',
    description: 'Show alpha channel',
    defaultValue: false,
    group: 'features',
  },
  {
    key: 'showEyeDropper',
    label: 'Show Eye Dropper',
    type: 'switch',
    description: 'Show eye dropper tool',
    defaultValue: true,
    group: 'features',
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

const COLOR_FORM_CONTROLS = toDrawerFormControls(COLOR_CONTROL_DEFS);

export const COLOR_DRAWER_CONFIGS = createDrawerFormConfigs(COLOR_FORM_CONTROLS, {
  format: { excludeKey: 'format' },
  variant: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  labelPosition: { excludeKey: 'labelPosition' },
  features: { excludeKeys: ['showAlpha', 'showEyeDropper'] },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
});

export const COLOR_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-color',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'features', label: 'Features', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(COLOR_CONTROL_DEFS),
};
