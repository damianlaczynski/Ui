import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';

const UI_INPUT_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    description: 'Applied to all previews in the matrix',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'readonly',
    label: 'Readonly',
    type: 'switch',
    description: 'Applied to all previews in the matrix',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'error',
    label: 'Error',
    type: 'switch',
    description: 'Applies error styling to the wrapper',
    defaultValue: false,
    group: 'state',
  },
];

const UI_INPUT_FORM_CONTROLS = toDrawerFormControls(UI_INPUT_CONTROL_DEFS);

export const UI_INPUT_DRAWER_CONFIGS = createDrawerFormConfigs(UI_INPUT_FORM_CONTROLS, {
  overview: { excludeKeys: [] },
});
