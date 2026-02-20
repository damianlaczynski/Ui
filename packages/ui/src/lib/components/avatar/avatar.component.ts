import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { Variant, Appearance, Size, Shape, ExtendedSize } from '../utils';
import { IconComponent, IconName } from '../icon';
import { SpinnerComponent } from '../spinner';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  imports: [IconComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': 'ariaLabel() || (name() ? name() : "Avatar")',
  },
})
export class AvatarComponent {
  variant = input<Variant>('secondary');
  appearance = input<Appearance>('filled');
  size = input<Size>('medium');
  shape = input<Shape>('rounded');

  image = input<string | undefined>(undefined);
  initials = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  icon = input<IconName | undefined>(undefined);

  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  ariaLabel = input<string>();

  spinnerSize = computed<ExtendedSize>(() => {
    const sizeMap: Record<Size, ExtendedSize> = {
      small: 'extra-small',
      medium: 'small',
      large: 'medium',
    };
    return sizeMap[this.size()] ?? 'small';
  });

  displayInitials = computed<string>(() => {
    if (this.initials()) {
      return this.initials()!.toUpperCase().slice(0, 2);
    }
    if (this.name()) {
      const parts = this.name()!.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    return '';
  });

  hasImage = computed<boolean>(() => !!this.image());
  hasInitials = computed<boolean>(() => !!this.displayInitials());
  hasIcon = computed<boolean>(() => !!this.icon());

  avatarClasses = computed<string>(() => {
    const classes = ['avatar'];

    classes.push(`avatar--${this.variant()}`);
    classes.push(`avatar--${this.appearance()}`);
    classes.push(`avatar--${this.size()}`);
    classes.push(`avatar--${this.shape()}`);

    if (this.disabled()) {
      classes.push('avatar--disabled');
    }

    if (this.loading()) {
      classes.push('avatar--loading');
    }

    return classes.join(' ');
  });
}
