import type { DrawerBackdrop, DrawerModalType, DrawerPosition, DrawerType } from 'angular-ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

const DRAWER_POSITIONS: DrawerPosition[] = ['left', 'right', 'top', 'bottom'];
const DRAWER_SIZES = ['small', 'medium', 'large'] as const;
const DRAWER_BACKDROPS: DrawerBackdrop[] = ['dynamic', 'static'];
const DRAWER_TYPES: DrawerType[] = ['overlay', 'inline'];
const DRAWER_MODAL_TYPES: DrawerModalType[] = ['modal', 'non-modal', 'alert'];

const DRAWER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    description: 'Drawer title text',
    defaultValue: 'Drawer Title',
    placeholder: 'Enter drawer title',
    group: 'content',
    drawer: false,
  },
  {
    key: 'bodyText',
    label: 'Body Text',
    type: 'textarea',
    description: 'Drawer body text',
    defaultValue: 'This is a drawer component with configurable layout and actions.',
    placeholder: 'Enter drawer body text',
    rows: 3,
    group: 'content',
    drawer: false,
  },
  {
    key: 'position',
    label: 'Position',
    type: 'dropdown',
    options: toOptions([...DRAWER_POSITIONS]),
    description: 'Drawer slide-in position',
    defaultValue: 'right',
    group: 'appearance',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions([...DRAWER_SIZES]),
    description: 'Drawer size',
    defaultValue: 'medium',
    group: 'appearance',
  },
  {
    key: 'closable',
    label: 'Closable',
    type: 'switch',
    description: 'Allow closing via X button and ESC key',
    defaultValue: true,
    group: 'behavior',
  },
  {
    key: 'backdrop',
    label: 'Backdrop',
    type: 'dropdown',
    options: toOptions([...DRAWER_BACKDROPS]),
    description: 'Backdrop click behavior',
    defaultValue: 'dynamic',
    group: 'behavior',
  },
  {
    key: 'type',
    label: 'Type',
    type: 'dropdown',
    options: toOptions([...DRAWER_TYPES]),
    description: 'Overlay (full screen) or inline (within container)',
    defaultValue: 'overlay',
    group: 'behavior',
  },
  {
    key: 'modalType',
    label: 'Modal Type',
    type: 'dropdown',
    options: toOptions([...DRAWER_MODAL_TYPES]),
    description:
      'modal: block interaction, ESC/backdrop close. non-modal: allow background interaction. alert: only close button closes.',
    defaultValue: 'modal',
    group: 'behavior',
  },
  {
    key: 'showPrimaryAction',
    label: 'Primary Action',
    type: 'switch',
    description: 'Show primary action button',
    defaultValue: true,
    group: 'actions',
  },
  {
    key: 'showSecondaryAction',
    label: 'Secondary Action',
    type: 'switch',
    description: 'Show secondary action button',
    defaultValue: true,
    group: 'actions',
  },
  {
    key: 'showAdditionalActions',
    label: 'Additional Actions',
    type: 'switch',
    description: 'Show extra action buttons',
    defaultValue: false,
    group: 'actions',
  },
];

const ALL_CONTROLS = toDrawerFormControls(DRAWER_CONTROL_DEFS);

export const DRAWER_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_CONTROLS, {
  overview: { excludeKeys: [] },
  positions: { excludeKey: 'position' },
  sizes: { excludeKey: 'size' },
  typeModal: { excludeKeys: [] },
  behavior: {
    excludeKeys: [
      'closable',
      'backdrop',
      'showPrimaryAction',
      'showSecondaryAction',
      'showAdditionalActions',
    ],
  },
  actions: {
    excludeKeys: [
      'closable',
      'backdrop',
      'showPrimaryAction',
      'showSecondaryAction',
      'showAdditionalActions',
    ],
  },
  customContent: { excludeKeys: [] },
});

export const DRAWER_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-drawer',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'] },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: SHOWCASE_GROUP_ICONS['appearance'],
      expanded: true,
    },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'actions', label: 'Actions', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(DRAWER_CONTROL_DEFS),
};
