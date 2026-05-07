import { Component, computed, signal, viewChild } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { CAROUSEL_SHOWCASE_CONFIG } from './carousel.showcase.config';

type CarouselSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-carousel-interactive',
  imports: [CarouselComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-carousel
          [items]="interactiveItems"
          [showControls]="currentShowControls()"
          [showIndicators]="currentShowIndicators()"
          [autoPlay]="currentAutoPlay()"
          [autoPlayInterval]="currentAutoPlayInterval()"
          [loop]="currentLoop()"
          (itemChange)="onItemChange($event)"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class CarouselInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = CAROUSEL_SHOWCASE_CONFIG;

  interactiveItems: CarouselItem[] = [
    {
      id: 'interactive-1',
      image: 'https://picsum.photos/800/400?random=31',
      title: 'Interactive Slide 1',
      description: 'Use controls to change carousel behavior in real time.',
    },
    {
      id: 'interactive-2',
      image: 'https://picsum.photos/800/400?random=32',
      title: 'Interactive Slide 2',
      description: 'Try auto-play, indicators, controls, and loop mode.',
    },
    {
      id: 'interactive-3',
      image: 'https://picsum.photos/800/400?random=33',
      title: 'Interactive Slide 3',
      description: 'Adjust size and interval to compare layout density.',
    },
  ];

  private values = signal<Record<string, unknown>>({
    size: 'medium',
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
  });

  currentShowControls = computed(() => !!this.values()['showControls']);
  currentShowIndicators = computed(() => !!this.values()['showIndicators']);
  currentAutoPlay = computed(() => !!this.values()['autoPlay']);
  currentAutoPlayInterval = computed(() => {
    const interval = Number(this.values()['autoPlayInterval']);
    if (Number.isNaN(interval)) {
      return 3000;
    }
    return Math.min(10000, Math.max(500, interval));
  });
  currentLoop = computed(() => !!this.values()['loop']);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.showcase()?.logEvent('reset');
  }

  onItemChange(event: { item: CarouselItem; index: number }): void {
    this.showcase()?.logEvent('itemChange', { id: event.item.id, index: event.index });
  }
}
