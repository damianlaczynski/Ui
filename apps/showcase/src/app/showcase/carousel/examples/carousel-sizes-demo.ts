import { Component } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'ui';

@Component({
  selector: 'app-carousel-sizes-demo',
  standalone: true,
  imports: [CarouselComponent],
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <strong style="font-size:0.875rem">Small</strong>
        <ui-carousel [items]="slides" size="small" [showControls]="false" />
      </div>

      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <strong style="font-size:0.875rem">Medium</strong>
        <ui-carousel [items]="slides" size="medium" [showControls]="false" />
      </div>

      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <strong style="font-size:0.875rem">Large</strong>
        <ui-carousel [items]="slides" size="large" [showControls]="false" />
      </div>
    </div>
  `,
})
export class CarouselSizesDemoComponent {
  protected readonly slides: CarouselItem[] = [
    {
      id: 'size-1',
      image: 'https://picsum.photos/seed/ui-carousel-size-1/1200/640',
      title: 'Compact strip',
      description: 'Small fits dense dashboards and side panels.',
    },
    {
      id: 'size-2',
      image: 'https://picsum.photos/seed/ui-carousel-size-2/1200/640',
      title: 'Balanced default',
      description: 'Medium is usually enough for mixed content and promo cards.',
    },
    {
      id: 'size-3',
      image: 'https://picsum.photos/seed/ui-carousel-size-3/1200/640',
      title: 'Hero treatment',
      description: 'Large is best when the carousel itself is the focal element.',
    },
  ];
}
