import { Component } from '@angular/core';
import { VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg';
const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '2160p', label: '2160p (4K)' },
  { value: '1080p', label: '1080p (HD)' },
  { value: '720p', label: '720p' },
];

@Component({
  selector: 'app-video-advanced-actions-demo',
  standalone: true,
  imports: [VideoComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:48rem">
      <ui-video
        [src]="src"
        [poster]="poster"
        [controls]="false"
        [showPlayButton]="true"
        [showProgressBar]="true"
        [showVolumeButton]="true"
        [showFullscreenButton]="true"
        [showSpeedButton]="true"
        [showQualityButton]="true"
        [showSkipButtons]="true"
        [showPictureInPictureButton]="true"
        [skipSeconds]="15"
        [qualityOptions]="qualityOptions"
        size="medium"
      />
    </div>
  `,
})
export class VideoAdvancedActionsDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
  protected readonly qualityOptions = QUALITY_OPTIONS;
}
