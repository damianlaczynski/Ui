import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Shape, SkeletonComponent, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SkeletonInteractiveComponent } from './skeleton.interactive';
import { SKELETON_DRAWER_CONFIGS, SKELETON_SHAPES } from './skeleton.showcase.config';

type SkeletonSizePreset = { label: string; width: string; height: string };
type SkeletonPatternLine = { width: string };

@Component({
  selector: 'app-skeleton-showcase',
  imports: [
    CommonModule,
    SkeletonComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    SkeletonInteractiveComponent,
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
        <app-showcase-header title="Skeleton" />
        <p class="showcase__description">
          The Skeleton component provides lightweight loading placeholders for text, avatars, cards,
          and list items. It supports shape, animation, dimensions, and border radius so you can
          match the expected content structure.
        </p>

        <app-section-with-drawer
          sectionTitle="Shape"
          sectionDescription="Shape controls the silhouette of each placeholder. Use rounded for text/media blocks, circular for avatars, and square for strict geometric placeholders."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ shape | titlecase }}</h3>
                <ui-skeleton
                  [shape]="shape"
                  [animated]="shapeForm().animated"
                  [width]="shapeForm().width"
                  [height]="shapeForm().height"
                  [borderRadius]="shapeForm().borderRadius"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Animation"
          sectionDescription="Animated skeletons indicate active loading while static placeholders fit calmer surfaces. Use the drawer to tune shape and dimensions for both variants."
          [formConfig]="animationDrawerFormConfig"
          [formValues]="animationFormValues()"
          (formValuesChange)="animationFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Animated</h3>
              <ui-skeleton
                [shape]="animationForm().shape"
                [animated]="true"
                [width]="animationForm().width"
                [height]="animationForm().height"
                [borderRadius]="animationForm().borderRadius"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Static</h3>
              <ui-skeleton
                [shape]="animationForm().shape"
                [animated]="false"
                [width]="animationForm().width"
                [height]="animationForm().height"
                [borderRadius]="animationForm().borderRadius"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Size presets help represent common loading targets such as icons, avatars, and media blocks. Use the drawer to adjust shape and animation across all presets."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (preset of sizePresets; track preset.label) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ preset.label }}</h3>
                <ui-skeleton
                  [shape]="sizeForm().shape"
                  [animated]="sizeForm().animated"
                  [width]="preset.width"
                  [height]="preset.height"
                  [borderRadius]="sizeForm().borderRadius"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Text & Layout Patterns"
          sectionDescription="Reusable skeleton arrangements for text, cards, and list items. Keep structure close to final content to reduce layout shift during loading."
          [formConfig]="patternsDrawerFormConfig"
          [formValues]="patternsFormValues()"
          (formValuesChange)="patternsFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Text Lines</h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                @for (line of textPatternLines; track line.width) {
                  <ui-skeleton
                    [shape]="patternsForm().shape"
                    [animated]="patternsForm().animated"
                    [width]="line.width"
                    height="16px"
                    [borderRadius]="patternsForm().borderRadius"
                  />
                }
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Card</h3>
              <div
                style="display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid var(--color-neutral-stroke-rest); border-radius: 8px;"
              >
                <ui-skeleton
                  [shape]="patternsForm().shape"
                  [animated]="patternsForm().animated"
                  width="100%"
                  height="180px"
                  [borderRadius]="patternsForm().borderRadius"
                />
                <ui-skeleton
                  [shape]="patternsForm().shape"
                  [animated]="patternsForm().animated"
                  width="70%"
                  height="24px"
                  [borderRadius]="patternsForm().borderRadius"
                />
                <ui-skeleton
                  [shape]="patternsForm().shape"
                  [animated]="patternsForm().animated"
                  width="100%"
                  height="14px"
                  [borderRadius]="patternsForm().borderRadius"
                />
              </div>
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">List</h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                @for (item of listPatternItems; track item) {
                  <div
                    style="display: flex; gap: 12px; align-items: center; padding: 12px; border: 1px solid var(--color-neutral-stroke-rest); border-radius: 4px;"
                  >
                    <ui-skeleton
                      shape="circular"
                      [animated]="patternsForm().animated"
                      width="40px"
                      height="40px"
                    />
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                      <ui-skeleton
                        [shape]="patternsForm().shape"
                        [animated]="patternsForm().animated"
                        width="40%"
                        height="16px"
                        [borderRadius]="patternsForm().borderRadius"
                      />
                      <ui-skeleton
                        [shape]="patternsForm().shape"
                        [animated]="patternsForm().animated"
                        width="80%"
                        height="12px"
                        [borderRadius]="patternsForm().borderRadius"
                      />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all skeleton options in real time. Change shape, animation, dimensions,
            and border radius to model your final loading UI.
          </p>
          <app-skeleton-interactive />
        </section>
      </div>
    </div>
  `,
})
export class SkeletonShowcaseComponent {
  shapes: Shape[] = [...SKELETON_SHAPES];

  sizePresets: SkeletonSizePreset[] = [
    { label: 'Small (24px)', width: '24px', height: '24px' },
    { label: 'Medium (48px)', width: '48px', height: '48px' },
    { label: 'Large (96px)', width: '96px', height: '96px' },
    { label: 'Hero (220x120)', width: '220px', height: '120px' },
  ];

  textPatternLines: SkeletonPatternLine[] = [{ width: '100%' }, { width: '92%' }, { width: '78%' }];

  listPatternItems = [1, 2, 3];

  shapeDrawerFormConfig = SKELETON_DRAWER_CONFIGS.shape;
  animationDrawerFormConfig = SKELETON_DRAWER_CONFIGS.animation;
  sizeDrawerFormConfig = SKELETON_DRAWER_CONFIGS.size;
  patternsDrawerFormConfig = SKELETON_DRAWER_CONFIGS.patterns;

  shapeFormValues = signal<Record<string, unknown>>({
    animated: true,
    width: '120px',
    height: '120px',
    borderRadius: '8px',
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      animated: (v['animated'] as boolean) ?? true,
      width: (v['width'] as string) ?? '120px',
      height: (v['height'] as string) ?? '120px',
      borderRadius: (v['borderRadius'] as string) ?? '8px',
    };
  });

  animationFormValues = signal<Record<string, unknown>>({
    shape: 'rounded',
    width: '220px',
    height: '96px',
    borderRadius: '8px',
  });

  animationForm = computed(() => {
    const v = this.animationFormValues();
    return {
      shape: (v['shape'] as Shape) ?? 'rounded',
      width: (v['width'] as string) ?? '220px',
      height: (v['height'] as string) ?? '96px',
      borderRadius: (v['borderRadius'] as string) ?? '8px',
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    shape: 'circular',
    animated: true,
    borderRadius: '8px',
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      shape: (v['shape'] as Shape) ?? 'circular',
      animated: (v['animated'] as boolean) ?? true,
      borderRadius: (v['borderRadius'] as string) ?? '8px',
    };
  });

  patternsFormValues = signal<Record<string, unknown>>({
    shape: 'rounded',
    animated: true,
    borderRadius: '8px',
  });

  patternsForm = computed(() => {
    const v = this.patternsFormValues();
    return {
      shape: (v['shape'] as Shape) ?? 'rounded',
      animated: (v['animated'] as boolean) ?? true,
      borderRadius: (v['borderRadius'] as string) ?? '8px',
    };
  });
}
