import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

import { Variant, ExtendedSize, ContentPosition } from '../utils';

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  // Unified Design System
  variant = input<Variant>('primary');
  size = input<ExtendedSize>('medium');
  labelPosition = input<ContentPosition>('none');

  label = input<string>('');
  ariaLabel = input<string>('Loading');

  spinnerClasses = computed(() => {
    const classes = [];

    classes.push('spinner');
    classes.push(`spinner--${this.variant()}`);
    classes.push(`spinner--${this.size()}`);

    if (this.labelPosition() !== 'none') {
      classes.push(`spinner--label-${this.labelPosition()}`);
    }
    return classes.join(' ');
  });

  get labelClasses(): string {
    const sizeClass = ['extra-small', 'small'].includes(this.size()) ? 'small' : 'medium';
    return `spinner__label spinner__label--${sizeClass}`;
  }

  hasLabel = computed(() => this.labelPosition() !== 'none' && this.label().length > 0);
}
