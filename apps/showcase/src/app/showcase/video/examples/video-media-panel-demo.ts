import { Component } from '@angular/core';
import { ButtonComponent, MessageBarComponent, TagComponent, VideoComponent } from 'ui';

const VIDEO_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_POSTER = 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg';

@Component({
  selector: 'app-video-media-panel-demo',
  standalone: true,
  imports: [ButtonComponent, MessageBarComponent, TagComponent, VideoComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:56rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Training clip</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Video is most useful when it appears inside a real media or learning surface with
            surrounding context.
          </div>
        </div>

        <ui-video
          [src]="src"
          [poster]="poster"
          [controls]="false"
          [showPlayButton]="true"
          [showProgressBar]="true"
          [showVolumeButton]="true"
          [showFullscreenButton]="true"
          size="medium"
        />

        <ui-message-bar
          title="Playback note"
          message="Use custom controls only when the surrounding product needs them. Browser controls are still the safest default for generic playback."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Learning" appearance="filled" variant="secondary" />
          <ui-tag text="Video playback" appearance="subtle" variant="info" />
          <ui-tag text="Ready to share" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Suggested actions
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
            <ui-button type="button" variant="primary">Open lesson</ui-button>
            <ui-button type="button" appearance="subtle">Copy link</ui-button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class VideoMediaPanelDemoComponent {
  protected readonly src = VIDEO_SRC;
  protected readonly poster = VIDEO_POSTER;
}
