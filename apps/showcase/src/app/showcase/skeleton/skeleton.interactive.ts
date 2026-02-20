import { Component, computed, signal } from '@angular/core';
import { Shape, SkeletonComponent } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { SKELETON_SHOWCASE_CONFIG } from './skeleton.showcase.config';

@Component({
  selector: 'app-skeleton-interactive',
  imports: [SkeletonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="false"
      (valuesChange)="values.set($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-skeleton
          [shape]="currentShape()"
          [animated]="currentAnimated()"
          [width]="currentWidth()"
          [height]="currentHeight()"
          [borderRadius]="currentBorderRadius()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class SkeletonInteractiveComponent {
  showcaseConfig: ShowcaseConfig = SKELETON_SHOWCASE_CONFIG;

  values = signal<Record<string, unknown>>({
    shape: 'rounded',
    animated: true,
    width: '160px',
    height: '48px',
    borderRadius: '8px',
  });

  currentShape = computed(() => (this.values()['shape'] as Shape) ?? 'rounded');
  currentAnimated = computed(() => (this.values()['animated'] as boolean) ?? true);
  currentWidth = computed(() => (this.values()['width'] as string) ?? '160px');
  currentHeight = computed(() => (this.values()['height'] as string) ?? '48px');
  currentBorderRadius = computed(() => (this.values()['borderRadius'] as string) ?? '8px');

  onReset(): void {}
}
