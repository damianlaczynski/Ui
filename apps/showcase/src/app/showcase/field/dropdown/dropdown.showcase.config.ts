import type { DropdownItem } from 'ui';
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
  DROPDOWN_MODES,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const DROPDOWN_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'label',
    label: 'Label',
    type: 'text',
    description: 'Field label',
    defaultValue: 'Select Option',
    placeholder: 'Enter label',
    group: 'content',
    drawer: false,
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    description: 'Placeholder text',
    defaultValue: 'Choose...',
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
    key: 'mode',
    label: 'Mode',
    type: 'dropdown',
    options: toOptions([...DROPDOWN_MODES]),
    defaultValue: 'single',
    group: 'behavior',
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
    key: 'searchable',
    label: 'Searchable',
    type: 'switch',
    description: 'Enable search',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'clearable',
    label: 'Clearable',
    type: 'switch',
    description: 'Show clear button',
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
    key: 'required',
    label: 'Required',
    type: 'switch',
    description: 'Mark as required',
    defaultValue: false,
    group: 'state',
  },
];

const DROPDOWN_FORM_CONTROLS = toDrawerFormControls(DROPDOWN_CONTROL_DEFS);

export const DROPDOWN_DRAWER_CONFIGS = createDrawerFormConfigs(DROPDOWN_FORM_CONTROLS, {
  overview: { excludeKeys: ['variant', 'size'] },
  variant: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  mode: { excludeKey: 'mode' },
  states: { excludeKeys: ['disabled', 'required'] },
});

export { INPUT_VARIANTS as DROPDOWN_INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
export { DROPDOWN_MODES } from '@shared/utils/showcase/component-options.utils';

export const DROPDOWN_BASIC_ITEMS: DropdownItem[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4', disabled: true },
  { value: '5', label: 'Option 5' },
];

export const DROPDOWN_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-dropdown',
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
  controls: toShowcaseControls(DROPDOWN_CONTROL_DEFS),
};
