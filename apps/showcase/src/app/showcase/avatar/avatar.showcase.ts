import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent, TableOfContentComponent } from 'ui';
import type { Appearance, IconName, Variant } from 'ui';
import {
  APPEARANCES,
  SIZES,
  SHAPES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { AVATAR_DRAWER_CONFIGS } from './avatar.showcase.config';
import { AvatarInteractiveComponent } from './avatar.interactive';

const DEFAULT_IMAGE_URL = 'https://i.pravatar.cc/150?img=1';

@Component({
  selector: 'app-avatar-showcase',
  imports: [
    AvatarComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    AvatarInteractiveComponent,
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
        <app-showcase-header title="Avatar" />
        <p class="showcase__description">
          Avatar displays a user's identity through image, initials, or icon. Supports variants,
          appearances, sizes (small, medium, large), shapes (rounded, circular, square), and states
          like disabled or loading. Use in headers, user lists, or profile cards.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Matrix of all avatar combinations: variants (primary, secondary, etc.) and appearances (filled, tint, outline, subtle). Use Customize to switch content type (initials, image, name, icon) and toggle disabled or loading states."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-avatar
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="overviewForm().size"
                      [shape]="overviewForm().shape"
                      [image]="overviewContent().image"
                      [initials]="overviewContent().initials"
                      [name]="overviewContent().name"
                      [icon]="overviewContent().icon"
                      [disabled]="overviewForm().disabled"
                      [loading]="overviewForm().loading"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the fill style (filled, tint, outline, subtle) while variant sets the semantic color. Combine them for different contexts—e.g. filled primary for active user, outline secondary for inactive."
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="appearanceVariantFormValues()"
          (formValuesChange)="appearanceVariantFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-avatar
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [image]="appearanceVariantContent().image"
                      [initials]="appearanceVariantContent().initials"
                      [name]="appearanceVariantContent().name"
                      [icon]="appearanceVariantContent().icon"
                      [disabled]="appearanceVariantForm().disabled"
                      [loading]="appearanceVariantForm().loading"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three sizes: small (24px), medium (32px), large (48px). Choose based on context—small for compact lists, medium for headers, large for profile views."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-avatar
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [image]="sizeContent().image"
                [initials]="sizeContent().initials"
                [name]="sizeContent().name"
                [icon]="sizeContent().icon"
                [disabled]="sizeForm().disabled"
                [loading]="sizeForm().loading"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Shapes"
          sectionDescription="Rounded (default), circular (pill), or square. Circular is common for user avatars; square fits grid layouts."
          [formConfig]="shapeDrawerFormConfig"
          [formValues]="shapeFormValues()"
          (formValuesChange)="shapeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (shape of shapes; track shape) {
              <ui-avatar
                [variant]="shapeForm().variant"
                [appearance]="shapeForm().appearance"
                [size]="shapeForm().size"
                [shape]="shape"
                [image]="shapeContent().image"
                [initials]="shapeContent().initials"
                [name]="shapeContent().name"
                [icon]="shapeContent().icon"
                [disabled]="shapeForm().disabled"
                [loading]="shapeForm().loading"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal (default), Disabled (grayed out, non-interactive), and Loading (shows spinner while image or data loads). Use loading when fetching user data asynchronously."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <ui-avatar
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [image]="statesContent().image"
                [initials]="statesContent().initials"
                [name]="statesContent().name"
                [icon]="statesContent().icon"
                [disabled]="state.disabled"
                [loading]="state.loading"
              />
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Try all avatar options: content type (image, initials, name, icon), variant, appearance,
            size, shape. The avatar automatically derives initials from name when no image is
            provided.
          </p>
          <app-avatar-interactive />
        </section>
      </div>
    </div>
  `,
})
export class AvatarShowcaseComponent {
  variants = VARIANTS;
  appearances = APPEARANCES;
  sizes = SIZES;
  shapes = SHAPES;

  overviewDrawerFormConfig = AVATAR_DRAWER_CONFIGS.overview;
  appearanceVariantDrawerFormConfig = AVATAR_DRAWER_CONFIGS.appearanceVariant;
  sizeDrawerFormConfig = AVATAR_DRAWER_CONFIGS.size;
  shapeDrawerFormConfig = AVATAR_DRAWER_CONFIGS.shape;
  statesDrawerFormConfig = AVATAR_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, loading: false },
    { id: 'disabled', label: 'Disabled', disabled: true, loading: false },
    { id: 'loading', label: 'Loading', disabled: false, loading: true },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    contentType: 'initials',
    icon: '',
    disabled: false,
    loading: false,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      size: 'medium' as const,
      shape: 'rounded' as const,
      disabled: !!v['disabled'],
      loading: !!v['loading'],
    };
  });

  overviewContent = computed(() =>
    this.getContentProps(
      (this.overviewFormValues()['contentType'] as string) || 'initials',
      (this.overviewFormValues()['icon'] as string) || '',
    ),
  );

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    shape: 'rounded',
    contentType: 'initials',
    icon: '',
    disabled: false,
    loading: false,
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      size: (v['size'] as 'small' | 'medium' | 'large') || 'medium',
      shape: (v['shape'] as 'rounded' | 'circular' | 'square') || 'rounded',
      disabled: !!v['disabled'],
      loading: !!v['loading'],
    };
  });

  appearanceVariantContent = computed(() =>
    this.getContentProps(
      (this.appearanceVariantFormValues()['contentType'] as string) || 'initials',
      (this.appearanceVariantFormValues()['icon'] as string) || '',
    ),
  );

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'filled',
    shape: 'rounded',
    contentType: 'initials',
    icon: '',
    disabled: false,
    loading: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      variant: (v['variant'] as Variant) || 'secondary',
      appearance: (v['appearance'] as Appearance) || 'filled',
      shape: (v['shape'] as 'rounded' | 'circular' | 'square') || 'rounded',
      disabled: !!v['disabled'],
      loading: !!v['loading'],
    };
  });

  sizeContent = computed(() =>
    this.getContentProps(
      (this.sizeFormValues()['contentType'] as string) || 'initials',
      (this.sizeFormValues()['icon'] as string) || '',
    ),
  );

  shapeFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'filled',
    size: 'medium',
    contentType: 'initials',
    icon: '',
    disabled: false,
    loading: false,
  });

  shapeForm = computed(() => {
    const v = this.shapeFormValues();
    return {
      variant: (v['variant'] as Variant) || 'secondary',
      appearance: (v['appearance'] as Appearance) || 'filled',
      size: (v['size'] as 'small' | 'medium' | 'large') || 'medium',
      disabled: !!v['disabled'],
      loading: !!v['loading'],
    };
  });

  shapeContent = computed(() =>
    this.getContentProps(
      (this.shapeFormValues()['contentType'] as string) || 'initials',
      (this.shapeFormValues()['icon'] as string) || '',
    ),
  );

  statesFormValues = signal<Record<string, unknown>>({
    variant: 'secondary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    contentType: 'initials',
    icon: '',
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      variant: (v['variant'] as Variant) || 'secondary',
      appearance: (v['appearance'] as Appearance) || 'filled',
      size: (v['size'] as 'small' | 'medium' | 'large') || 'medium',
      shape: (v['shape'] as 'rounded' | 'circular' | 'square') || 'rounded',
    };
  });

  statesContent = computed(() =>
    this.getContentProps(
      (this.statesFormValues()['contentType'] as string) || 'initials',
      (this.statesFormValues()['icon'] as string) || '',
    ),
  );

  private getContentProps(
    contentType: string,
    icon: string,
  ): {
    image?: string;
    initials?: string;
    name?: string;
    icon?: IconName;
  } {
    switch (contentType) {
      case 'image':
        return { image: DEFAULT_IMAGE_URL };
      case 'initials':
        return { initials: 'JD', name: 'John Doe' };
      case 'name':
        return { name: 'John Doe' };
      case 'icon':
        return { icon: (icon || 'person') as IconName };
      default:
        return {};
    }
  }
}
