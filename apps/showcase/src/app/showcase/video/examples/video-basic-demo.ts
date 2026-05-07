import { Component } from '@angular/core';
import { VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg';

@Component({
  selector: 'app-video-basic-demo',
  standalone: true,
  imports: [VideoComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:44rem">
      <ui-video [src]="src" [poster]="poster" [controls]="true" size="medium" />
    </div>
  `,
})
export class VideoBasicDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
}
