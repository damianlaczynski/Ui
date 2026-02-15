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
  ICON_OPTIONS,
  SHOWCASE_GROUP_ICONS,
} from '@shared/utils/showcase/component-options.utils';

const ICON_VARIANTS = ['regular', 'filled'] as const;
const ICON_DIRECTIONS = ['auto', 'ltr', 'rtl'] as const;

const ICON_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'icon',
    label: 'Icon',
    type: 'text',
    description: 'Icon name from the Fluent icon set',
    defaultValue: 'home',
    placeholder: 'e.g. home',
    group: 'content',
    drawer: false,
  },
  {
    key: 'ariaLabel',
    label: 'Aria Label',
    type: 'text',
    description: 'Accessible label for semantic icon usage',
    defaultValue: '',
    placeholder: 'e.g. Settings icon',
    group: 'content',
    drawer: false,
  },
  {
    key: 'sampleIcon',
    label: 'Sample Icon',
    type: 'dropdown',
    options: ICON_OPTIONS.filter(option => option.value !== ''),
    description: 'Icon used in section previews',
    defaultValue: 'home',
    group: 'content',
    showcase: false,
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    description: 'Preset icon size',
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'variant',
    label: 'Variant',
    type: 'dropdown',
    options: toOptions([...ICON_VARIANTS]),
    description: 'Icon style variant',
    defaultValue: 'regular',
    group: 'appearance',
  },
  {
    key: 'direction',
    label: 'Direction',
    type: 'dropdown',
    options: toOptions([...ICON_DIRECTIONS]),
    description: 'Auto uses document/locale; ltr/rtl forces directional variant',
    defaultValue: 'auto',
    group: 'appearance',
  },
  {
    key: 'locale',
    label: 'Locale',
    type: 'text',
    description: 'Optional locale override for locale-specific symbols (e.g. ar, en-US)',
    defaultValue: '',
    placeholder: 'e.g. ar, en-US',
    group: 'appearance',
  },
  {
    key: 'sizePx',
    label: 'Size Px',
    type: 'number',
    description: 'Optional custom pixel size override',
    defaultValue: 0,
    min: 0,
    max: 128,
    step: 1,
    group: 'layout',
    drawer: false,
  },
  {
    key: 'rotate',
    label: 'Rotate',
    type: 'number',
    description: 'Optional icon rotation in degrees',
    defaultValue: 0,
    min: -360,
    max: 360,
    step: 5,
    group: 'layout',
  },
  {
    key: 'showLabels',
    label: 'Show Labels',
    type: 'switch',
    description: 'Display icon name labels',
    defaultValue: true,
    group: 'layout',
    showcase: false,
  },
];

const ALL_DRAWER_CONTROLS = toDrawerFormControls(ICON_CONTROL_DEFS);

export const ICON_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_DRAWER_CONTROLS, {
  overview: { excludeKeys: ['size', 'variant', 'sampleIcon'] },
  size: { excludeKey: 'size' },
  variant: { excludeKey: 'variant' },
  browser: { excludeKeys: ['sampleIcon', 'showLabels'] },
});

export const ICON_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-icon',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'layout', label: 'Layout', icon: SHOWCASE_GROUP_ICONS['layout'] },
  ],
  controls: toShowcaseControls(ICON_CONTROL_DEFS),
};

export { ICON_VARIANTS };
