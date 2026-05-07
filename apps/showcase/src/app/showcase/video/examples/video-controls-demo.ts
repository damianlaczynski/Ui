import { Component } from '@angular/core';
import { VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg';
const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '1080p', label: '1080p (HD)' },
  { value: '720p', label: '720p' },
  { value: '480p', label: '480p' },
];

@Component({
  selector: 'app-video-controls-demo',
  standalone: true,
  imports: [VideoComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1rem;align-items:start;max-width:56rem"
    >
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Browser controls</div>
        <ui-video [src]="src" [poster]="poster" [controls]="true" size="medium" />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Custom controls</div>
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
          [qualityOptions]="qualityOptions"
          size="medium"
        />
      </div>
    </div>
  `,
})
export class VideoControlsDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
  protected readonly qualityOptions = QUALITY_OPTIONS;
}
