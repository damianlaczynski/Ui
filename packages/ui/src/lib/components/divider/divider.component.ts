import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Alignment, Orientation } from '../utils';

@Component({
  selector: 'ui-divider',
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  // Unified Design System
  orientation = input<Orientation>('horizontal');
  alignment = input<Alignment>('center');
  text = input<string>('');
  ariaLabel = input<string>('');

  get dividerClasses(): string {
    const classes = ['divider'];

    classes.push(`divider--${this.orientation()}`);
    classes.push(`divider--${this.alignment()}`);

    if (this.hasText()) {
      classes.push('divider--with-text');
    }

    return classes.join(' ');
  }

  hasText(): boolean {
    return this.text() !== '';
  }

  get ariaLabelText(): string {
    return this.ariaLabel() || (this.hasText() ? this.text() : 'divider');
  }
}
