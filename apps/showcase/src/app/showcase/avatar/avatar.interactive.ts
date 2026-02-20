import { Component, signal, computed, viewChild } from '@angular/core';
import { Appearance, AvatarComponent, IconName, Shape, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { AVATAR_SHOWCASE_CONFIG } from './avatar.showcase.config';

@Component({
  selector: 'app-avatar-interactive',
  imports: [AvatarComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-avatar
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [shape]="currentShape()"
          [image]="currentImage()"
          [initials]="currentInitials()"
          [name]="currentName()"
          [icon]="currentIcon()"
          [disabled]="currentDisabled()"
          [loading]="currentLoading()"
          [ariaLabel]="currentAriaLabel()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class AvatarInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = AVATAR_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    contentType: 'initials',
    image: 'https://i.pravatar.cc/150?img=1',
    initials: 'JD',
    name: 'John Doe',
    icon: '',
    variant: 'secondary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    loading: false,
  });

  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentShape = computed(() => this.values()['shape'] as Shape);
  currentImage = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'image' ? (this.values()['image'] as string) : undefined;
  });
  currentInitials = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'initials' ? (this.values()['initials'] as string) : undefined;
  });
  currentName = computed(() => {
    const contentType = this.values()['contentType'];
    return contentType === 'name' ? (this.values()['name'] as string) : undefined;
  });
  currentIcon = computed(() => {
    const contentType = this.values()['contentType'];
    const icon = this.values()['icon'];
    return contentType === 'icon' && icon ? (icon as IconName) : undefined;
  });
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentLoading = computed(() => this.values()['loading'] as boolean);
  currentAriaLabel = computed(() => {
    const name = this.currentName();
    const initials = this.currentInitials();
    return name || initials || 'Avatar';
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}
}
