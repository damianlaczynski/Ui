import { Component } from '@angular/core';
import { VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg';

@Component({
  selector: 'app-video-size-demo',
  standalone: true,
  imports: [VideoComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:48rem">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Small</div>
        <ui-video [src]="src" [poster]="poster" [controls]="true" size="small" />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Medium</div>
        <ui-video [src]="src" [poster]="poster" [controls]="true" size="medium" />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:0.875rem;font-weight:600">Large</div>
        <ui-video [src]="src" [poster]="poster" [controls]="true" size="large" />
      </div>
    </div>
  `,
})
export class VideoSizeDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
}
