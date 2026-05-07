import { Component } from '@angular/core';
import { VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const VIDEO_POSTER =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg';

@Component({
  selector: 'app-video-playback-demo',
  standalone: true,
  imports: [VideoComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));gap:1rem;align-items:start;max-width:56rem"
    >
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Muted autoplay preview</div>
        <ui-video
          [src]="src"
          [poster]="poster"
          [controls]="false"
          [showPlayButton]="true"
          [showProgressBar]="true"
          [showVolumeButton]="true"
          [showFullscreenButton]="true"
          [autoplay]="true"
          [muted]="true"
          size="small"
        />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Looped background-style playback</div>
        <ui-video
          [src]="src"
          [poster]="poster"
          [controls]="false"
          [showPlayButton]="true"
          [showProgressBar]="true"
          [showVolumeButton]="false"
          [showFullscreenButton]="true"
          [autoplay]="true"
          [loop]="true"
          [muted]="true"
          size="small"
        />
      </div>
    </div>
  `,
})
export class VideoPlaybackDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
}
