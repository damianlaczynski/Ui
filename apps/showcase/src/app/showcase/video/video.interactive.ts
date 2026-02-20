import { Component, computed, signal, viewChild } from '@angular/core';
import { Size, VideoComponent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { QUALITY_OPTIONS, VIDEO_SHOWCASE_CONFIG, toVideoSize } from './video.showcase.config';

@Component({
  selector: 'app-video-interactive',
  imports: [VideoComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-video
          [src]="currentSrc()"
          [poster]="currentPoster() || ''"
          [autoplay]="currentAutoplay()"
          [loop]="currentLoop()"
          [muted]="currentMuted()"
          [controls]="currentControls()"
          [showPlayButton]="currentShowPlayButton()"
          [showFullscreenButton]="currentShowFullscreenButton()"
          [showVolumeButton]="currentShowVolumeButton()"
          [showProgressBar]="currentShowProgressBar()"
          [showSpeedButton]="currentShowSpeedButton()"
          [showQualityButton]="currentShowQualityButton()"
          [qualityOptions]="currentQualityOptions()"
          [size]="currentSize()"
          (play)="onPlay()"
          (pause)="onPause()"
          (ended)="onEnded()"
          (timeUpdate)="onTimeUpdate($event)"
          (volumeChange)="onVolumeChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class VideoInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');
  private lastLoggedSecond = -1;

  showcaseConfig: ShowcaseConfig = VIDEO_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
    controls: false,
    showPlayButton: true,
    showProgressBar: true,
    showVolumeButton: true,
    showFullscreenButton: true,
    showSpeedButton: false,
    showQualityButton: false,
    autoplay: false,
    loop: false,
    muted: false,
    size: 'medium',
  });

  currentSrc = computed(() => this.values()['src'] as string);
  currentPoster = computed(() => {
    const poster = this.values()['poster'] as string;
    return poster || undefined;
  });
  currentControls = computed(() => !!this.values()['controls']);
  currentShowPlayButton = computed(() => !!this.values()['showPlayButton']);
  currentShowProgressBar = computed(() => !!this.values()['showProgressBar']);
  currentShowVolumeButton = computed(() => !!this.values()['showVolumeButton']);
  currentShowFullscreenButton = computed(() => !!this.values()['showFullscreenButton']);
  currentShowSpeedButton = computed(() => !!this.values()['showSpeedButton']);
  currentShowQualityButton = computed(() => !!this.values()['showQualityButton']);
  currentAutoplay = computed(() => !!this.values()['autoplay']);
  currentLoop = computed(() => !!this.values()['loop']);
  currentMuted = computed(() => !!this.values()['muted']);
  currentSize = computed(() => toVideoSize(this.values()['size']) as Size);
  currentQualityOptions = computed(() => (this.currentShowQualityButton() ? QUALITY_OPTIONS : []));

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.lastLoggedSecond = -1;
    this.showcase()?.logEvent('reset');
  }

  onPlay(): void {
    this.showcase()?.logEvent('play');
  }

  onPause(): void {
    this.showcase()?.logEvent('pause');
  }

  onEnded(): void {
    this.showcase()?.logEvent('ended');
  }

  onTimeUpdate(time: number): void {
    const second = Math.floor(time);
    if (second !== this.lastLoggedSecond) {
      this.lastLoggedSecond = second;
      this.showcase()?.logEvent('timeUpdate', { second });
    }
  }

  onVolumeChange(volume: number): void {
    this.showcase()?.logEvent('volumeChange', { volume: Math.round(volume * 100) });
  }
}
