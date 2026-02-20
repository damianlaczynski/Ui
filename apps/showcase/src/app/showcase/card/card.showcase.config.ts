import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import type { CardAppearance, CardFocusMode, Size } from 'ui';
import {
  SIZES,
  ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';

export const CARD_APPEARANCES: CardAppearance[] = [
  'filled',
  'filled-alternative',
  'outline',
  'subtle',
];
export const CARD_SIZES: Size[] = [...SIZES];
export const CARD_FOCUS_MODES: CardFocusMode[] = ['off', 'no-tab', 'tab-exit', 'tab-only'];

const CARD_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(CARD_APPEARANCES),
    defaultValue: 'filled',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(CARD_SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...ORIENTATIONS]),
    defaultValue: 'vertical',
    group: 'layout',
  },
  {
    key: 'focusMode',
    label: 'Focus mode',
    type: 'dropdown',
    options: toOptions(CARD_FOCUS_MODES),
    defaultValue: 'off',
    group: 'behavior',
  },
  {
    key: 'interactive',
    label: 'Interactive',
    type: 'switch',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'selectable',
    label: 'Selectable',
    type: 'switch',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'checkbox',
    label: 'Checkbox',
    type: 'switch',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'disabled',
    label: 'Disabled',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
];

const CARD_FORM_CONTROLS = toDrawerFormControls(CARD_CONTROL_DEFS);

export const CARD_DRAWER_CONFIGS = createDrawerFormConfigs(CARD_FORM_CONTROLS, {
  appearance: { excludeKey: 'appearance' },
  size: { excludeKey: 'size' },
  orientation: { excludeKey: 'orientation' },
  focusMode: { excludeKey: 'focusMode' },
  states: { excludeKeys: ['interactive', 'selectable', 'checkbox', 'disabled'] },
});

export const CARD_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-card',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(CARD_CONTROL_DEFS),
};
