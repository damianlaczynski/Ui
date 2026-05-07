import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

const CAROUSEL_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    description: 'Carousel size',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'layout',
  },
  {
    key: 'showControls',
    label: 'Show Controls',
    type: 'switch',
    description: 'Show previous and next buttons',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'showIndicators',
    label: 'Show Indicators',
    type: 'switch',
    description: 'Show slide indicators',
    defaultValue: true,
    group: 'options',
  },
  {
    key: 'autoPlay',
    label: 'Auto Play',
    type: 'switch',
    description: 'Automatically advance slides',
    defaultValue: false,
    group: 'behavior',
  },
  {
    key: 'autoPlayInterval',
    label: 'Interval (ms)',
    type: 'number',
    description: 'Time between auto-play transitions',
    defaultValue: 3000,
    min: 500,
    max: 10000,
    step: 500,
    group: 'behavior',
  },
  {
    key: 'loop',
    label: 'Loop',
    type: 'switch',
    description: 'Continue from end to start',
    defaultValue: true,
    group: 'behavior',
  },
];

const ALL_CONTROLS = toDrawerFormControls(CAROUSEL_CONTROL_DEFS);

export const CAROUSEL_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
  controls: { excludeKey: 'showControls' },
  indicators: { excludeKey: 'showIndicators' },
  autoPlay: { excludeKey: 'autoPlay' },
  loop: { excludeKey: 'loop' },
});

export const CAROUSEL_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-carousel',
  controlGroups: [
    {
      id: 'layout',
      label: 'Layout',
      icon: SHOWCASE_GROUP_ICONS['layout'],
      expanded: true,
    },
    { id: 'options', label: 'Options', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(CAROUSEL_CONTROL_DEFS),
};
