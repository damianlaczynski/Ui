import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { APPEARANCES, SIZES, VARIANTS } from '@shared/utils/showcase/component-options.utils';

const UI_BUTTON_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    description: 'Color variant (shapes section)',
    defaultValue: 'secondary',
    group: 'appearance',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    description: 'Visual style (shapes section)',
    defaultValue: 'outline',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    description: 'Size (shapes section)',
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Native disabled attribute styling',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'loading',
    label: 'Loading',
    type: 'switch',
    description: 'Applies loading visual state',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'selected',
    label: 'Selected',
    type: 'switch',
    description: 'Selected / pressed visual state',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'fullWidth',
    label: 'Full width',
    type: 'switch',
    description: 'Stretch to container width',
    defaultValue: false,
    group: 'state',
  },
];

const UI_BUTTON_FORM_CONTROLS = toDrawerFormControls(UI_BUTTON_CONTROL_DEFS);

export const UI_BUTTON_DRAWER_CONFIGS = createDrawerFormConfigs(UI_BUTTON_FORM_CONTROLS, {
  overview: { excludeKeys: ['variant', 'appearance', 'size'] },
  shapes: { excludeKeys: ['loading', 'selected', 'fullWidth'] },
});
