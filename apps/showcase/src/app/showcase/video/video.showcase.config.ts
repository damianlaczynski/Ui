import type { IconName, Size } from 'ui';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { createDrawerFormConfigs } from '@shared/utils/showcase/drawer-form-config.utils';
import {
  toDrawerFormControls,
  toOptions,
  toShowcaseControls,
  type SharedControlDef,
} from '@shared/utils/showcase/showcase-controls.utils';
import { SHOWCASE_GROUP_ICONS, SIZES } from '@shared/utils/showcase/component-options.utils';

export type VideoQualityOption = { value: string; label: string };

export type VideoSourcePreset = {
  value: string;
  label: string;
  src: string;
  poster?: string;
};

export const VIDEO_SOURCE_PRESETS: VideoSourcePreset[] = [
  {
    value: 'big-buck-bunny',
    label: 'Big Buck Bunny',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
  },
  {
    value: 'elephants-dream',
    label: 'Elephants Dream',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
  },
];

export const DEFAULT_VIDEO_SOURCE = VIDEO_SOURCE_PRESETS[0];

export const QUALITY_OPTIONS: VideoQualityOption[] = [
  { value: 'auto', label: 'Auto' },
  { value: '2160p', label: '2160p (4K)' },
  { value: '1440p', label: '1440p' },
  { value: '1080p', label: '1080p (HD)' },
  { value: '720p', label: '720p' },
  { value: '480p', label: '480p' },
  { value: '360p', label: '360p' },
];

const SOURCE_PRESET_OPTIONS = VIDEO_SOURCE_PRESETS.map(preset => ({
  value: preset.value,
  label: preset.label,
}));

const VIDEO_DRAWER_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'sourcePreset',
    label: 'Source Preset',
    type: 'dropdown',
    options: SOURCE_PRESET_OPTIONS,
    defaultValue: DEFAULT_VIDEO_SOURCE.value,
    group: 'source',
  },
  {
    key: 'posterEnabled',
    label: 'Use Poster',
    type: 'switch',
    defaultValue: true,
    group: 'source',
  },
  {
    key: 'controls',
    label: 'Browser Controls',
    type: 'switch',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'showPlayButton',
    label: 'Play Button',
    type: 'switch',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showProgressBar',
    label: 'Progress Bar',
    type: 'switch',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showVolumeButton',
    label: 'Volume Button',
    type: 'switch',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showFullscreenButton',
    label: 'Fullscreen Button',
    type: 'switch',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showSpeedButton',
    label: 'Speed Button',
    type: 'switch',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'showQualityButton',
    label: 'Quality Button',
    type: 'switch',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'autoplay',
    label: 'Autoplay',
    type: 'switch',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'loop',
    label: 'Loop',
    type: 'switch',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'muted',
    label: 'Muted',
    type: 'switch',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES),
    defaultValue: 'medium',
    group: 'appearance',
  },
];

const DRAWER_CONTROLS = toDrawerFormControls(VIDEO_DRAWER_CONTROL_DEFS);

const CONTROL_KEYS = [
  'controls',
  'showPlayButton',
  'showProgressBar',
  'showVolumeButton',
  'showFullscreenButton',
  'showSpeedButton',
  'showQualityButton',
];

const PLAYBACK_KEYS = ['autoplay', 'loop', 'muted'];

export const VIDEO_DRAWER_CONFIGS = createDrawerFormConfigs(DRAWER_CONTROLS, {
  overview: { excludeKeys: [] },
  source: { excludeKeys: [...CONTROL_KEYS, ...PLAYBACK_KEYS, 'size'] },
  controls: { excludeKeys: ['sourcePreset', 'posterEnabled', ...PLAYBACK_KEYS] },
  playback: { excludeKeys: ['sourcePreset', 'posterEnabled', ...CONTROL_KEYS] },
  size: { excludeKeys: ['size'] },
});

const VIDEO_SHOWCASE_CONTROL_DEFS: SharedControlDef[] = [
  {
    key: 'src',
    label: 'Video Source',
    type: 'text',
    description: 'URL of the video file',
    defaultValue: DEFAULT_VIDEO_SOURCE.src,
    placeholder: 'Enter video URL',
    group: 'source',
  },
  {
    key: 'poster',
    label: 'Poster Image',
    type: 'text',
    description: 'URL of the poster image',
    defaultValue: DEFAULT_VIDEO_SOURCE.poster ?? '',
    placeholder: 'Enter poster image URL',
    group: 'source',
  },
  {
    key: 'controls',
    label: 'Browser Controls',
    type: 'switch',
    description: 'Show default browser controls',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'showPlayButton',
    label: 'Show Play Button',
    type: 'switch',
    description: 'Show custom play and pause button',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showProgressBar',
    label: 'Show Progress Bar',
    type: 'switch',
    description: 'Show video progress bar',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showVolumeButton',
    label: 'Show Volume Button',
    type: 'switch',
    description: 'Show volume control button',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showFullscreenButton',
    label: 'Show Fullscreen Button',
    type: 'switch',
    description: 'Show fullscreen button',
    defaultValue: true,
    group: 'controls',
  },
  {
    key: 'showSpeedButton',
    label: 'Show Speed Button',
    type: 'switch',
    description: 'Show playback speed control',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'showQualityButton',
    label: 'Show Quality Button',
    type: 'switch',
    description: 'Show quality selection menu',
    defaultValue: false,
    group: 'controls',
  },
  {
    key: 'autoplay',
    label: 'Autoplay',
    type: 'switch',
    description: 'Start playing automatically',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'loop',
    label: 'Loop',
    type: 'switch',
    description: 'Loop the video',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'muted',
    label: 'Muted',
    type: 'switch',
    description: 'Mute the video',
    defaultValue: false,
    group: 'playback',
  },
  {
    key: 'size',
    label: 'Size',
    type: 'dropdown',
    options: toOptions(SIZES as string[]),
    description: 'Video player size',
    defaultValue: 'medium',
    group: 'appearance',
  },
];

export const VIDEO_SHOWCASE_CONFIG: ShowcaseConfig = {
  componentSelector: 'ui-video',
  controlGroups: [
    { id: 'source', label: 'Source', icon: 'video' as IconName, expanded: true },
    { id: 'controls', label: 'Controls', icon: SHOWCASE_GROUP_ICONS['state'] },
    { id: 'playback', label: 'Playback', icon: SHOWCASE_GROUP_ICONS['behavior'] },
    { id: 'appearance', label: 'Appearance', icon: SHOWCASE_GROUP_ICONS['appearance'] },
  ],
  controls: toShowcaseControls(VIDEO_SHOWCASE_CONTROL_DEFS),
};

export function toVideoSize(value: unknown): Size {
  if (value === 'small' || value === 'large') {
    return value;
  }
  return 'medium';
}
