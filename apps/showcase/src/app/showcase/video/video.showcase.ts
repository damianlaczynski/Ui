import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Size, TableOfContentComponent, VideoComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import {
  DEFAULT_VIDEO_SOURCE,
  QUALITY_OPTIONS,
  VIDEO_DRAWER_CONFIGS,
  VIDEO_SOURCE_PRESETS,
  type VideoSourcePreset,
  toVideoSize,
} from './video.showcase.config';
import { VideoInteractiveComponent } from './video.interactive';

type VideoSectionForm = {
  src: string;
  poster: string | undefined;
  controls: boolean;
  showPlayButton: boolean;
  showProgressBar: boolean;
  showVolumeButton: boolean;
  showFullscreenButton: boolean;
  showSpeedButton: boolean;
  showQualityButton: boolean;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  size: Size;
};

@Component({
  selector: 'app-video-showcase',
  imports: [
    CommonModule,
    VideoComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    VideoInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="Video" />
        <p class="showcase__description">
          Video component with configurable playback, controls, source presets, poster support, and
          size variants. Use drawers in each section to focus on specific option groups.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Complete player configuration in one place. Change source, poster, controls, playback behavior, and size."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Current Selection</h3>
              <ui-video
                [src]="overviewForm().src"
                [poster]="overviewForm().poster || ''"
                [controls]="overviewForm().controls"
                [showPlayButton]="overviewForm().showPlayButton"
                [showProgressBar]="overviewForm().showProgressBar"
                [showVolumeButton]="overviewForm().showVolumeButton"
                [showFullscreenButton]="overviewForm().showFullscreenButton"
                [showSpeedButton]="overviewForm().showSpeedButton"
                [showQualityButton]="overviewForm().showQualityButton"
                [qualityOptions]="overviewForm().showQualityButton ? qualityOptions : []"
                [autoplay]="overviewForm().autoplay"
                [loop]="overviewForm().loop"
                [muted]="overviewForm().muted"
                [size]="overviewForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Source & Poster"
          sectionDescription="Choose video source preset and toggle poster visibility."
          [formConfig]="sourceDrawerFormConfig"
          [formValues]="sourceFormValues()"
          (formValuesChange)="sourceFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">{{ selectedSourceLabel() }}</h3>
              <ui-video
                [src]="sourceForm().src"
                [poster]="sourceForm().poster || ''"
                [controls]="false"
                [showPlayButton]="true"
                [showProgressBar]="true"
                [showVolumeButton]="true"
                [showFullscreenButton]="true"
                [size]="sourceForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Control Elements"
          sectionDescription="Compare browser controls with custom control layout and toggle individual custom controls."
          [formConfig]="controlsDrawerFormConfig"
          [formValues]="controlsFormValues()"
          (formValuesChange)="controlsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Browser Controls</h3>
              <ui-video
                [src]="controlsForm().src"
                [poster]="controlsForm().poster || ''"
                [controls]="true"
                [autoplay]="controlsForm().autoplay"
                [loop]="controlsForm().loop"
                [muted]="controlsForm().muted"
                [size]="controlsForm().size"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Custom Controls</h3>
              <ui-video
                [src]="controlsForm().src"
                [poster]="controlsForm().poster || ''"
                [controls]="controlsForm().controls"
                [showPlayButton]="controlsForm().showPlayButton"
                [showProgressBar]="controlsForm().showProgressBar"
                [showVolumeButton]="controlsForm().showVolumeButton"
                [showFullscreenButton]="controlsForm().showFullscreenButton"
                [showSpeedButton]="controlsForm().showSpeedButton"
                [showQualityButton]="controlsForm().showQualityButton"
                [qualityOptions]="controlsForm().showQualityButton ? qualityOptions : []"
                [autoplay]="controlsForm().autoplay"
                [loop]="controlsForm().loop"
                [muted]="controlsForm().muted"
                [size]="controlsForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Playback"
          sectionDescription="Configure autoplay, loop, and muted behavior while keeping controls stable."
          [formConfig]="playbackDrawerFormConfig"
          [formValues]="playbackFormValues()"
          (formValuesChange)="playbackFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Playback Configuration</h3>
              <ui-video
                [src]="playbackForm().src"
                [poster]="playbackForm().poster || ''"
                [controls]="playbackForm().controls"
                [showPlayButton]="playbackForm().showPlayButton"
                [showProgressBar]="playbackForm().showProgressBar"
                [showVolumeButton]="playbackForm().showVolumeButton"
                [showFullscreenButton]="playbackForm().showFullscreenButton"
                [showSpeedButton]="playbackForm().showSpeedButton"
                [showQualityButton]="playbackForm().showQualityButton"
                [qualityOptions]="playbackForm().showQualityButton ? qualityOptions : []"
                [autoplay]="playbackForm().autoplay"
                [loop]="playbackForm().loop"
                [muted]="playbackForm().muted"
                [size]="playbackForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large player sizes with shared source, controls, and playback settings."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--vertical">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-video
                  [src]="sizeForm().src"
                  [poster]="sizeForm().poster || ''"
                  [controls]="sizeForm().controls"
                  [showPlayButton]="sizeForm().showPlayButton"
                  [showProgressBar]="sizeForm().showProgressBar"
                  [showVolumeButton]="sizeForm().showVolumeButton"
                  [showFullscreenButton]="sizeForm().showFullscreenButton"
                  [showSpeedButton]="sizeForm().showSpeedButton"
                  [showQualityButton]="sizeForm().showQualityButton"
                  [qualityOptions]="sizeForm().showQualityButton ? qualityOptions : []"
                  [autoplay]="sizeForm().autoplay"
                  [loop]="sizeForm().loop"
                  [muted]="sizeForm().muted"
                  [size]="size"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all video options in real time, inspect generated code, and observe
            player events in the log.
          </p>
          <app-video-interactive />
        </section>
      </div>
    </div>
  `,
})
export class VideoShowcaseComponent {
  sizes: Size[] = [...SIZES];
  qualityOptions = QUALITY_OPTIONS;

  overviewDrawerFormConfig = VIDEO_DRAWER_CONFIGS.overview;
  sourceDrawerFormConfig = VIDEO_DRAWER_CONFIGS.source;
  controlsDrawerFormConfig = VIDEO_DRAWER_CONFIGS.controls;
  playbackDrawerFormConfig = VIDEO_DRAWER_CONFIGS.playback;
  sizeDrawerFormConfig = VIDEO_DRAWER_CONFIGS.size;

  private sourcePresets = VIDEO_SOURCE_PRESETS;

  overviewFormValues = signal<Record<string, unknown>>({
    sourcePreset: DEFAULT_VIDEO_SOURCE.value,
    posterEnabled: true,
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

  sourceFormValues = signal<Record<string, unknown>>({
    sourcePreset: DEFAULT_VIDEO_SOURCE.value,
    posterEnabled: true,
    size: 'medium',
  });

  controlsFormValues = signal<Record<string, unknown>>({
    sourcePreset: DEFAULT_VIDEO_SOURCE.value,
    posterEnabled: true,
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

  playbackFormValues = signal<Record<string, unknown>>({
    sourcePreset: DEFAULT_VIDEO_SOURCE.value,
    posterEnabled: true,
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

  sizeFormValues = signal<Record<string, unknown>>({
    sourcePreset: DEFAULT_VIDEO_SOURCE.value,
    posterEnabled: true,
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
  });

  overviewForm = computed(() => this.toVideoForm(this.overviewFormValues()));
  sourceForm = computed(() => this.toVideoForm(this.sourceFormValues()));
  controlsForm = computed(() => this.toVideoForm(this.controlsFormValues()));
  playbackForm = computed(() => this.toVideoForm(this.playbackFormValues()));
  sizeForm = computed(() => this.toVideoForm(this.sizeFormValues()));

  selectedSourceLabel = computed(() => {
    const sourcePreset = this.sourceFormValues()['sourcePreset'];
    return this.getSourcePreset(sourcePreset).label;
  });

  private getSourcePreset(value: unknown): VideoSourcePreset {
    return this.sourcePresets.find(preset => preset.value === value) ?? DEFAULT_VIDEO_SOURCE;
  }

  private toVideoForm(values: Record<string, unknown>): VideoSectionForm {
    const source = this.getSourcePreset(values['sourcePreset']);
    const posterEnabled = values['posterEnabled'] !== false;

    return {
      src: source.src,
      poster: posterEnabled ? source.poster : undefined,
      controls: !!values['controls'],
      showPlayButton: values['showPlayButton'] !== false,
      showProgressBar: values['showProgressBar'] !== false,
      showVolumeButton: values['showVolumeButton'] !== false,
      showFullscreenButton: values['showFullscreenButton'] !== false,
      showSpeedButton: !!values['showSpeedButton'],
      showQualityButton: !!values['showQualityButton'],
      autoplay: !!values['autoplay'],
      loop: !!values['loop'],
      muted: !!values['muted'],
      size: toVideoSize(values['size']),
    };
  }
}
