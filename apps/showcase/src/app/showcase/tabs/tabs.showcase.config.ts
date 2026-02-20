import type { Tab } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toOptions,
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
  type ControlOption,
} from '@shared/utils/showcase/showcase-controls.utils';
import {
  VARIANTS,
  APPEARANCES,
  SIZES,
  SHAPES,
  TABS_ORIENTATIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const TAB_SET_OPTIONS: ControlOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'extended', label: 'Extended (disabled, closable)' },
  { value: 'labelsOnly', label: 'Labels only' },
];

const TABS_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'tabSet',
    label: 'Tab set',
    type: 'dropdown',
    options: TAB_SET_OPTIONS,
    defaultValue: 'default',
    group: 'layout',
    description: 'Selects which tab data set is rendered in the preview.',
    drawer: false,
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions(VARIANTS),
    defaultValue: 'primary',
    group: 'appearance',
    description: 'Applies the semantic style variant for tabs.',
  },
  {
    key: 'appearance',
    label: 'Appearance',
    type: 'dropdown',
    options: toOptions(APPEARANCES),
    defaultValue: 'subtle',
    group: 'appearance',
    description: 'Controls visual emphasis level (for example subtle or filled).',
  },
  {
    key: 'shape',
    label: 'Shape',
    type: 'dropdown',
    options: toOptions(SHAPES),
    defaultValue: 'rounded',
    group: 'appearance',
    description: 'Defines corner style of tab items.',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
    description: 'Changes tab height and internal spacing.',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    type: 'dropdown',
    options: toOptions([...TABS_ORIENTATIONS]),
    defaultValue: 'horizontal',
    group: 'layout',
    description: 'Switches tab layout between horizontal and vertical.',
  },
  {
    key: 'showSelectionIndicator',
    label: 'Show Indicator',
    type: 'switch',
    defaultValue: true,
    group: 'appearance',
    description: 'Shows or hides the active-tab indicator.',
  },
  {
    key: 'fullWidth',
    label: 'Full width',
    type: 'switch',
    group: 'layout',
    description: 'Stretches tabs to fill the available horizontal space.',
    showcase: false,
  },
];

const TABS_FORM_CONTROLS = toDrawerFormControls(TABS_CONTROL_DEFS);

export const TABS_DRAWER_CONFIGS = createDrawerFormConfigs(TABS_FORM_CONTROLS, {
  appearance: { excludeKey: 'appearance' },
  variant: { excludeKey: 'variant' },
  size: { excludeKey: 'size' },
  shape: { excludeKey: 'shape' },
  orientation: { excludeKey: 'orientation' },
});

export { TABS_ORIENTATIONS } from '@shared/utils/showcase/component-options.utils';

export const DEFAULT_TABS: Tab[] = [
  { id: 't1', label: 'Overview', icon: 'book' },
  { id: 't2', label: 'Details', icon: 'document' },
  { id: 't3', label: 'Settings', icon: 'settings' },
];

export const EXTENDED_TABS: Tab[] = [
  { id: 'e1', label: 'Home', icon: 'home' },
  { id: 'e2', label: 'Disabled', icon: 'lock_closed', disabled: true },
  { id: 'e3', label: 'Closable', icon: 'dismiss', closable: true },
];

export const LABELS_ONLY_TABS: Tab[] = [
  { id: 'l1', label: 'Profile' },
  { id: 'l2', label: 'Notifications' },
  { id: 'l3', label: 'Security' },
];

export const TABS_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-tabs',
  controlGroups: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(TABS_CONTROL_DEFS),
};
