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

const TOTP_DIGIT_COUNTS = [4, 6, 8];

const TOTP_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Verification Code',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    description: 'Placeholder text',
    defaultValue: 'Enter code',
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
    key: 'digitsCount',
    label: 'Digits Count',
    type: 'dropdown',
    options: TOTP_DIGIT_COUNTS.map(d => ({ value: d.toString(), label: d.toString() })),
    description: 'Number of digit inputs',
    defaultValue: '6',
    group: 'appearance',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions([...INPUT_VARIANTS]),
    description: 'Input visual style',
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

const TOTP_FORM_CONTROLS = toDrawerFormControls(TOTP_CONTROL_DEFS);

export const TOTP_DRAWER_CONFIGS = createDrawerFormConfigs(TOTP_FORM_CONTROLS, {
  digitsCount: { excludeKey: 'digitsCount' },
  size: { excludeKey: 'size' },
  variants: { excludeKey: 'variant' },
  labelPosition: { excludeKey: 'labelPosition' },
  states: { excludeKeys: ['disabled', 'readonly', 'required'] },
  combinations: { excludeKeys: ['variant', 'size'] },
});

export const TOTP_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-totp',
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
  controls: toShowcaseControls(TOTP_CONTROL_DEFS),
};
