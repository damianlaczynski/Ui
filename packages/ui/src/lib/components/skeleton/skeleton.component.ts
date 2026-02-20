import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shape } from '../utils';

@Component({
  selector: 'ui-skeleton',
  templateUrl: './skeleton.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  // Unified Design System
  shape = input<Shape>('rounded');
  animated = input<boolean>(true);
  width = input<string>('100%');
  height = input<string>('20px');
  borderRadius = input<string>('');

  skeletonClasses = computed(() => {
    const classes = ['skeleton', `skeleton--${this.shape()}`];
    if (this.animated()) classes.push('skeleton--animated');
    return classes.join(' ');
  });

  skeletonStyles = computed(() => {
    const styles: Record<string, string> = {
      width: this.width(),
      height: this.height(),
    };

    if (this.borderRadius()) {
      styles['border-radius'] = this.borderRadius();
    } else if (this.shape() === 'circular') {
      styles['border-radius'] = '9999px';
    } else if (this.shape() === 'square') {
      styles['border-radius'] = '0';
    }

    return styles;
  });
}
