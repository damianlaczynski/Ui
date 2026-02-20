import type { CommandPaletteItem } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS } from '@shared/utils/showcase/component-options.utils';

export type CommandPaletteDataset = 'basic' | 'grouped' | 'icons' | 'disabled' | 'custom';
export type PlaceholderPreset = 'default' | 'search' | 'actions';
export type EmptyTextPreset = 'default' | 'noMatches' | 'tryKeyword';

export const COMMAND_PALETTE_DATASET_OPTIONS = [
  { value: 'basic', label: 'Basic' },
  { value: 'grouped', label: 'Grouped' },
  { value: 'icons', label: 'With icons' },
  { value: 'disabled', label: 'With disabled items' },
  { value: 'custom', label: 'Keyword heavy' },
] as const;

export const PLACEHOLDER_PRESET_OPTIONS = [
  { value: 'default', label: 'Type a command or search...' },
  { value: 'search', label: 'Search commands...' },
  { value: 'actions', label: 'What would you like to do?' },
] as const;

export const EMPTY_TEXT_PRESET_OPTIONS = [
  { value: 'default', label: 'No commands found' },
  { value: 'noMatches', label: 'No matching actions found' },
  { value: 'tryKeyword', label: 'Try another keyword' },
] as const;

const MAX_RESULT_OPTIONS = [
  { value: 5, label: '5' },
  { value: 8, label: '8' },
  { value: 12, label: '12' },
];

export const PLACEHOLDER_PRESETS: Record<PlaceholderPreset, string> = {
  default: 'Type a command or search...',
  search: 'Search commands...',
  actions: 'What would you like to do?',
};

export const EMPTY_TEXT_PRESETS: Record<EmptyTextPreset, string> = {
  default: 'No commands found',
  noMatches: 'No matching actions found',
  tryKeyword: 'Try another keyword',
};

type CommandPaletteSeed = Omit<CommandPaletteItem, 'action'>;

const COMMAND_DATASETS: Record<CommandPaletteDataset, CommandPaletteSeed[]> = {
  basic: [
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'Navigate to the main dashboard',
      keywords: ['dashboard', 'home'],
    },
    {
      id: 'projects',
      label: 'View Projects',
      description: 'Browse all projects',
      keywords: ['projects', 'workspace'],
    },
    {
      id: 'settings',
      label: 'Open Settings',
      description: 'Configure application settings',
      keywords: ['settings', 'preferences'],
    },
    {
      id: 'help',
      label: 'Show Help',
      description: 'Open help and documentation',
      keywords: ['help', 'docs'],
    },
  ],
  grouped: [
    {
      id: 'nav-dashboard',
      label: 'Dashboard',
      description: 'Go to main dashboard',
      group: 'Navigation',
      keywords: ['home', 'dashboard'],
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      description: 'Browse projects',
      group: 'Navigation',
      keywords: ['projects', 'list'],
    },
    {
      id: 'action-new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      group: 'Actions',
      keywords: ['new', 'create'],
    },
    {
      id: 'action-export',
      label: 'Export Data',
      description: 'Export current data',
      group: 'Actions',
      keywords: ['export', 'download'],
    },
    {
      id: 'tool-shortcuts',
      label: 'Keyboard Shortcuts',
      description: 'Show keyboard shortcuts',
      group: 'Tools',
      keywords: ['shortcuts', 'keyboard'],
    },
  ],
  icons: [
    {
      id: 'icon-dashboard',
      label: 'Dashboard',
      description: 'Navigate to dashboard',
      icon: 'apps',
      keywords: ['dashboard', 'home'],
    },
    {
      id: 'icon-projects',
      label: 'Projects',
      description: 'Manage projects',
      icon: 'folder',
      keywords: ['projects', 'files'],
    },
    {
      id: 'icon-users',
      label: 'Users',
      description: 'User management',
      icon: 'person',
      keywords: ['users', 'people'],
    },
    {
      id: 'icon-settings',
      label: 'Settings',
      description: 'Application settings',
      icon: 'settings',
      keywords: ['settings', 'preferences'],
    },
    {
      id: 'icon-alerts',
      label: 'Notifications',
      description: 'View notifications',
      icon: 'alert',
      keywords: ['alerts', 'notifications'],
    },
  ],
  disabled: [
    {
      id: 'enabled-action',
      label: 'Enabled Action',
      description: 'This action is available',
      keywords: ['enabled', 'available'],
    },
    {
      id: 'disabled-action',
      label: 'Disabled Action',
      description: 'This action is currently unavailable',
      disabled: true,
      keywords: ['disabled', 'locked'],
    },
    {
      id: 'quick-export',
      label: 'Export Report',
      description: 'Export current report',
      keywords: ['export', 'report'],
    },
    {
      id: 'premium-feature',
      label: 'Premium Feature',
      description: 'Requires premium subscription',
      disabled: true,
      keywords: ['premium', 'paid'],
    },
  ],
  custom: [
    {
      id: 'quick-format',
      label: 'Format Document',
      description: 'Auto-format current document',
      keywords: ['code', 'format', 'beautify'],
    },
    {
      id: 'quick-save',
      label: 'Save All',
      description: 'Save all open documents',
      keywords: ['save', 'persist', 'store'],
    },
    {
      id: 'quick-build',
      label: 'Build Project',
      description: 'Compile and build project',
      keywords: ['compile', 'build', 'make'],
    },
    {
      id: 'quick-deploy',
      label: 'Deploy Application',
      description: 'Deploy to production environment',
      keywords: ['deploy', 'publish', 'release'],
    },
    {
      id: 'quick-test',
      label: 'Run Tests',
      description: 'Execute all test suites',
      keywords: ['test', 'qa', 'verify'],
    },
  ],
};

const COMMAND_PALETTE_DRAWER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'dataset',
    label: 'Dataset',
    type: 'dropdown',
    options: [...COMMAND_PALETTE_DATASET_OPTIONS],
    defaultValue: 'basic',
    group: 'content',
  },
  {
    key: 'maxResults',
    label: 'Max results',
    type: 'dropdown',
    options: MAX_RESULT_OPTIONS,
    defaultValue: 8,
    group: 'behavior',
  },
  {
    key: 'includeDisabled',
    label: 'Include disabled',
    type: 'switch',
    description: 'Show disabled commands',
    defaultValue: false,
    group: 'state',
  },
  {
    key: 'placeholderPreset',
    label: 'Placeholder',
    type: 'dropdown',
    options: [...PLACEHOLDER_PRESET_OPTIONS],
    defaultValue: 'default',
    group: 'behavior',
  },
  {
    key: 'emptyTextPreset',
    label: 'Empty text',
    type: 'dropdown',
    options: [...EMPTY_TEXT_PRESET_OPTIONS],
    defaultValue: 'default',
    group: 'behavior',
  },
];

const COMMAND_PALETTE_INTERACTIVE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'dataset',
    label: 'Dataset',
    type: 'dropdown',
    options: [...COMMAND_PALETTE_DATASET_OPTIONS],
    defaultValue: 'basic',
    group: 'content',
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    defaultValue: 'Type a command or search...',
    placeholder: 'Type a command or search...',
    group: 'content',
  },
  {
    key: 'emptyText',
    label: 'Empty text',
    type: 'text',
    defaultValue: 'No commands found',
    placeholder: 'No commands found',
    group: 'content',
  },
  {
    key: 'maxResults',
    label: 'Max results',
    type: 'number',
    defaultValue: 8,
    description: 'Maximum number of visible matches',
    group: 'behavior',
  },
  {
    key: 'includeDisabled',
    label: 'Include disabled',
    type: 'switch',
    defaultValue: false,
    group: 'state',
  },
];

const ALL_DRAWER_CONTROLS = toDrawerFormControls(COMMAND_PALETTE_DRAWER_CONTROL_DEFS);

export const COMMAND_PALETTE_DRAWER_CONFIGS = createDrawerFormConfigs(ALL_DRAWER_CONTROLS, {
  overview: { excludeKeys: ['placeholderPreset', 'emptyTextPreset'] },
  grouping: { excludeKeys: ['dataset', 'placeholderPreset', 'emptyTextPreset'] },
  options: { excludeKey: 'dataset' },
});

export const COMMAND_PALETTE_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-command-palette',
  controlGroups: [
    { id: 'content', label: 'Content', icon: SHOWCASE_GROUP_ICONS['content'], expanded: true },
    { id: 'behavior', label: 'Behavior', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'state', label: 'State', icon: SHOWCASE_GROUP_ICONS['state'] },
  ],
  controls: toShowcaseControls(COMMAND_PALETTE_INTERACTIVE_CONTROL_DEFS),
};

export function buildCommandPaletteItems(
  dataset: CommandPaletteDataset,
  includeDisabled: boolean,
  onAction: (item: CommandPaletteSeed) => void,
): CommandPaletteItem[] {
  return COMMAND_DATASETS[dataset]
    .filter(item => includeDisabled || !item.disabled)
    .map(item => ({
      ...item,
      action: () => onAction(item),
    }));
}

export function buildUngroupedItems(
  includeDisabled: boolean,
  onAction: (item: CommandPaletteSeed) => void,
): CommandPaletteItem[] {
  return COMMAND_DATASETS.grouped
    .map(({ group, ...item }) => item)
    .filter(item => includeDisabled || !item.disabled)
    .map(item => ({
      ...item,
      action: () => onAction(item),
    }));
}
