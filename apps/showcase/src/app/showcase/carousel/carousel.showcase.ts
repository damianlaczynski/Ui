import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  AvatarComponent,
  ButtonComponent,
  CarouselComponent,
  CarouselItem,
  DateComponent,
  MenuComponent,
  MenuItem,
  SliderComponent,
  Tab,
  TableOfContentComponent,
  TabsComponent,
  TagComponent,
  TotpComponent,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { CarouselInteractiveComponent } from './carousel.interactive';
import { CAROUSEL_DRAWER_CONFIGS } from './carousel.showcase.config';

type CarouselSize = 'small' | 'medium' | 'large';
type ComponentSlideType =
  | 'button'
  | 'date'
  | 'slider'
  | 'totp'
  | 'tabs'
  | 'avatar'
  | 'menu'
  | 'tag';
type ComponentCarouselItem = CarouselItem & { componentType: ComponentSlideType };

interface CarouselSectionForm {
  size: CarouselSize;
  showControls: boolean;
  showIndicators: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  loop: boolean;
}

@Component({
  selector: 'app-carousel-showcase',
  imports: [
    CommonModule,
    CarouselComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ButtonComponent,
    DateComponent,
    SliderComponent,
    TotpComponent,
    TabsComponent,
    AvatarComponent,
    MenuComponent,
    TagComponent,
    CarouselInteractiveComponent,
  ],
  styles: [
    `
      .carousel-showcase-slide {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 280px;
        padding: 2rem;
        gap: 1.5rem;
      }

      .carousel-showcase-slide__title {
        margin: 0;
        font-size: 1.25rem;
      }

      .carousel-showcase-slide__content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }

      .carousel-showcase-slide__content--wide {
        width: 100%;
        min-width: 280px;
        max-width: 420px;
      }

      .carousel-showcase-slide__content--wide ui-slider {
        width: 100%;
      }
    `,
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
        <app-showcase-header title="Carousel" />
        <p class="showcase__description">
          Carousel displays slide-based content with optional controls, indicators, auto-play, loop
          mode, and custom templates. Use it for galleries, feature highlights, and step-by-step
          visual narratives.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core carousel setup. Use the Customize drawer to configure controls, indicators, autoplay, interval, loop mode, and size."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <ui-carousel
            [items]="basicItems"
            [showControls]="overviewForm().showControls"
            [showIndicators]="overviewForm().showIndicators"
            [autoPlay]="overviewForm().autoPlay"
            [autoPlayInterval]="overviewForm().autoPlayInterval"
            [loop]="overviewForm().loop"
            [size]="overviewForm().size"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large variants for compact UI, default layouts, and prominent hero usage."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            @for (size of sizes; track size) {
              <div class="showcase__preview-item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-carousel
                  [items]="basicItems"
                  [showControls]="sizeForm().showControls"
                  [showIndicators]="sizeForm().showIndicators"
                  [autoPlay]="sizeForm().autoPlay"
                  [autoPlayInterval]="sizeForm().autoPlayInterval"
                  [loop]="sizeForm().loop"
                  [size]="size"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Navigation Controls"
          sectionDescription="Compare carousel with and without navigation buttons while keeping shared behavior options synchronized."
          [formConfig]="controlsDrawerFormConfig"
          [formValues]="controlsFormValues()"
          (formValuesChange)="controlsFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">With Controls</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="true"
                [showIndicators]="controlsForm().showIndicators"
                [autoPlay]="controlsForm().autoPlay"
                [autoPlayInterval]="controlsForm().autoPlayInterval"
                [loop]="controlsForm().loop"
                [size]="controlsForm().size"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Without Controls</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="false"
                [showIndicators]="controlsForm().showIndicators"
                [autoPlay]="controlsForm().autoPlay"
                [autoPlayInterval]="controlsForm().autoPlayInterval"
                [loop]="controlsForm().loop"
                [size]="controlsForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Indicators"
          sectionDescription="Compare pagination indicators on and off with shared navigation and playback settings."
          [formConfig]="indicatorsDrawerFormConfig"
          [formValues]="indicatorsFormValues()"
          (formValuesChange)="indicatorsFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">With Indicators</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="indicatorsForm().showControls"
                [showIndicators]="true"
                [autoPlay]="indicatorsForm().autoPlay"
                [autoPlayInterval]="indicatorsForm().autoPlayInterval"
                [loop]="indicatorsForm().loop"
                [size]="indicatorsForm().size"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Without Indicators</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="indicatorsForm().showControls"
                [showIndicators]="false"
                [autoPlay]="indicatorsForm().autoPlay"
                [autoPlayInterval]="indicatorsForm().autoPlayInterval"
                [loop]="indicatorsForm().loop"
                [size]="indicatorsForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Auto Play"
          sectionDescription="Auto-play rotates slides at a fixed interval and is useful for passive content carousels."
          [formConfig]="autoPlayDrawerFormConfig"
          [formValues]="autoPlayFormValues()"
          (formValuesChange)="autoPlayFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Auto Play On</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="autoPlayForm().showControls"
                [showIndicators]="autoPlayForm().showIndicators"
                [autoPlay]="true"
                [autoPlayInterval]="autoPlayForm().autoPlayInterval"
                [loop]="autoPlayForm().loop"
                [size]="autoPlayForm().size"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Auto Play Off</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="autoPlayForm().showControls"
                [showIndicators]="autoPlayForm().showIndicators"
                [autoPlay]="false"
                [autoPlayInterval]="autoPlayForm().autoPlayInterval"
                [loop]="autoPlayForm().loop"
                [size]="autoPlayForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Loop Mode"
          sectionDescription="Loop mode wraps from the last slide back to the first. Disable it to stop at both edges."
          [formConfig]="loopDrawerFormConfig"
          [formValues]="loopFormValues()"
          (formValuesChange)="loopFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Loop On</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="loopForm().showControls"
                [showIndicators]="loopForm().showIndicators"
                [autoPlay]="loopForm().autoPlay"
                [autoPlayInterval]="loopForm().autoPlayInterval"
                [loop]="true"
                [size]="loopForm().size"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Loop Off</h3>
              <ui-carousel
                [items]="basicItems"
                [showControls]="loopForm().showControls"
                [showIndicators]="loopForm().showIndicators"
                [autoPlay]="loopForm().autoPlay"
                [autoPlayInterval]="loopForm().autoPlayInterval"
                [loop]="false"
                [size]="loopForm().size"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Overlay Content</h2>
          <p class="showcase__section__description">
            Slides with image, title, and description overlay for storytelling and marketing
            content.
          </p>
          <ui-carousel
            [items]="overlayItems"
            [showControls]="true"
            [showIndicators]="true"
            size="medium"
          />
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Custom Template</h2>
          <p class="showcase__section__description">
            Use <code>slideTemplate</code> to render arbitrary component content per slide.
          </p>
          <div class="showcase__preview">
            <ng-template #componentSlide let-item let-index="index">
              <div class="carousel-showcase-slide">
                <h3 class="carousel-showcase-slide__title">{{ item.title }}</h3>
                @switch (item.componentType) {
                  @case ('button') {
                    <div class="carousel-showcase-slide__content">
                      <ui-button variant="primary" appearance="filled" text="Primary" />
                      <ui-button variant="secondary" appearance="filled" text="Secondary" />
                      <ui-button variant="success" appearance="filled" text="Success" />
                      <ui-button variant="warning" appearance="filled" text="Warning" />
                      <ui-button variant="danger" appearance="filled" text="Danger" />
                      <ui-button variant="info" appearance="filled" text="Info" />
                    </div>
                  }
                  @case ('date') {
                    <div class="carousel-showcase-slide__content">
                      <ui-date label="Date" />
                    </div>
                  }
                  @case ('slider') {
                    <div
                      class="carousel-showcase-slide__content carousel-showcase-slide__content--wide"
                    >
                      <ui-slider label="Slider" [min]="0" [max]="100" />
                    </div>
                  }
                  @case ('totp') {
                    <div class="carousel-showcase-slide__content">
                      <ui-totp label="TOTP" />
                    </div>
                  }
                  @case ('tabs') {
                    <div
                      class="carousel-showcase-slide__content"
                      style="width: 100%; max-width: 360px;"
                    >
                      <ui-tabs
                        [tabs]="showcaseTabs"
                        [selectedTabId]="showcaseSelectedTabId()"
                        (tabChange)="onShowcaseTabChange($event)"
                      />
                    </div>
                  }
                  @case ('avatar') {
                    <div class="carousel-showcase-slide__content">
                      <ui-avatar name="John Doe" />
                      <ui-avatar initials="AB" />
                      <ui-avatar image="https://picsum.photos/64?random=61" />
                      <ui-avatar icon="person" />
                    </div>
                  }
                  @case ('menu') {
                    <div class="carousel-showcase-slide__content">
                      <ui-menu
                        triggerVariant="dropdown"
                        text="Dropdown"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                      <ui-menu
                        triggerVariant="split"
                        text="Split"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                      <ui-menu
                        triggerVariant="button"
                        text="Button"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                    </div>
                  }
                  @case ('tag') {
                    <div class="carousel-showcase-slide__content">
                      <ui-tag text="Tag 1" />
                      <ui-tag text="Tag 2" variant="primary" />
                      <ui-tag text="Remove" [dismissible]="true" (dismiss)="onTagDismiss()" />
                    </div>
                  }
                }
              </div>
            </ng-template>
            <ui-carousel
              [items]="componentShowcaseItems"
              [slideTemplate]="componentSlide"
              [showControls]="true"
              [showIndicators]="true"
              [loop]="true"
              [autoPlay]="true"
              size="large"
            />
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">Typical component usage with event handling.</p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test all carousel options in one place and inspect emitted events.
          </p>
          <app-carousel-interactive />
        </section>
      </div>
    </div>
  `,
})
export class CarouselShowcaseComponent {
  sizes: CarouselSize[] = ['small', 'medium', 'large'];

  overviewDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.size;
  controlsDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.controls;
  indicatorsDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.indicators;
  autoPlayDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.autoPlay;
  loopDrawerFormConfig = CAROUSEL_DRAWER_CONFIGS.loop;

  basicItems: CarouselItem[] = [
    {
      id: 'slide1',
      image: 'https://picsum.photos/800/400?random=41',
      title: 'First Slide',
      description: 'This is the first slide in the carousel.',
    },
    {
      id: 'slide2',
      image: 'https://picsum.photos/800/400?random=42',
      title: 'Second Slide',
      description: 'This is the second slide in the carousel.',
    },
    {
      id: 'slide3',
      image: 'https://picsum.photos/800/400?random=43',
      title: 'Third Slide',
      description: 'This is the third slide in the carousel.',
    },
    {
      id: 'slide4',
      image: 'https://picsum.photos/800/400?random=44',
      title: 'Fourth Slide',
      description: 'This is the fourth slide in the carousel.',
    },
  ];

  overlayItems: CarouselItem[] = [
    {
      id: 'overlay1',
      image: 'https://picsum.photos/800/400?random=45',
      title: 'Beautiful Landscape',
      description: 'Experience the beauty of nature with curated photography.',
    },
    {
      id: 'overlay2',
      image: 'https://picsum.photos/800/400?random=46',
      title: 'Urban Architecture',
      description: 'Discover modern cityscapes and architectural details.',
    },
    {
      id: 'overlay3',
      image: 'https://picsum.photos/800/400?random=47',
      title: 'Abstract Art',
      description: 'Explore creative compositions and visual experimentation.',
    },
  ];

  componentShowcaseItems: ComponentCarouselItem[] = [
    { id: 'btn', title: 'Button', componentType: 'button' },
    { id: 'date', title: 'Date', componentType: 'date' },
    { id: 'slider', title: 'Slider', componentType: 'slider' },
    { id: 'totp', title: 'TOTP', componentType: 'totp' },
    { id: 'tabs', title: 'Tabs', componentType: 'tabs' },
    { id: 'avatar', title: 'Avatar', componentType: 'avatar' },
    { id: 'menu', title: 'Menu', componentType: 'menu' },
    { id: 'tag', title: 'Tag', componentType: 'tag' },
  ];

  showcaseTabs: Tab[] = [
    { id: '1', label: 'Tab 1' },
    { id: '2', label: 'Tab 2' },
    { id: '3', label: 'Tab 3' },
  ];
  showcaseSelectedTabId = signal<string | number>('1');

  componentShowcaseMenuItems: MenuItem[] = [
    { id: '1', type: 'button', label: 'Option 1' },
    { id: '2', type: 'button', label: 'Option 2' },
    { id: '3', type: 'button', label: 'Option 3' },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
  });

  sizeFormValues = signal<Record<string, unknown>>({
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
  });

  controlsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
  });

  indicatorsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showControls: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
  });

  autoPlayFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showControls: true,
    showIndicators: true,
    autoPlayInterval: 3000,
    loop: true,
  });

  loopFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
  });

  overviewForm = computed(() => this.toForm(this.overviewFormValues()));
  sizeForm = computed(() => this.toForm(this.sizeFormValues()));
  controlsForm = computed(() => this.toForm(this.controlsFormValues()));
  indicatorsForm = computed(() => this.toForm(this.indicatorsFormValues()));
  autoPlayForm = computed(() => this.toForm(this.autoPlayFormValues()));
  loopForm = computed(() => this.toForm(this.loopFormValues()));

  usageExample = `import { CarouselComponent, type CarouselItem } from 'ui';

@Component({
  template: \`
    <ui-carousel
      [items]="items"
      [showControls]="true"
      [showIndicators]="true"
      [autoPlay]="false"
      [autoPlayInterval]="3000"
      [loop]="true"
      size="medium"
      (itemChange)="onItemChange($event)"
    />
  \`,
})
export class MyComponent {
  items: CarouselItem[] = [
    { id: '1', image: '/assets/slide-1.jpg', title: 'Slide 1' },
    { id: '2', image: '/assets/slide-2.jpg', title: 'Slide 2' },
  ];

  onItemChange(event: { item: CarouselItem; index: number }): void {
    console.log(event.item.id, event.index);
  }
}`;

  onShowcaseTabChange(tab: Tab): void {
    this.showcaseSelectedTabId.set(tab.id);
  }

  onTagDismiss(): void {}

  private toForm(v: Record<string, unknown>): CarouselSectionForm {
    return {
      size: (v['size'] as CarouselSize) ?? 'medium',
      showControls: !!v['showControls'],
      showIndicators: !!v['showIndicators'],
      autoPlay: !!v['autoPlay'],
      autoPlayInterval: this.normalizeInterval(v['autoPlayInterval']),
      loop: !!v['loop'],
    };
  }

  private normalizeInterval(value: unknown): number {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return 3000;
    }
    return Math.min(10000, Math.max(500, numeric));
  }
}
