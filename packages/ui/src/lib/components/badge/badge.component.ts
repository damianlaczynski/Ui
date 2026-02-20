import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Variant, Appearance, Size, Shape, ContentPosition } from '../utils';
import { IconComponent, IconName } from '../icon';

@Component({
  selector: 'ui-badge',
  templateUrl: './badge.component.html',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  variant = input<Variant>('primary');
  size = input<Size>('medium');
  appearance = input<Appearance>('filled');
  shape = input<Shape>('rounded');
  iconPosition = input<ContentPosition>('before');
  text = input.required<string>();
  icon = input<IconName | undefined>(undefined);
  ariaLabel = input<string>('');

  get badgeClasses(): string {
    const classes = ['badge'];

    classes.push(`badge--${this.variant()}`);
    classes.push(`badge--${this.size()}`);
    classes.push(`badge--${this.appearance()}`);
    classes.push(`badge--${this.shape()}`);

    if (this.icon()) {
      classes.push(`badge--icon-${this.iconPosition()}`);
    }

    return classes.join(' ');
  }
}
