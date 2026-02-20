import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { Size } from '../utils';
import { IconName } from '../icon';

@Component({
  selector: 'ui-action-button',
  template: `
    <!-- Action button -->
    <button
      type="button"
      class="field__action"
      (click)="onClick($event)"
      (mousedown)="onMouseDown($event)"
      tabindex="-1"
    >
      <ui-icon [icon]="icon()" [size]="size()" [variant]="variant()" />
    </button>
  `,
  imports: [IconComponent],
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
  size = input<Size>('medium');
  icon = input<IconName>('dismiss');
  variant = input<'regular' | 'filled'>('regular');
  click = output<void>();
  mousedown = output<MouseEvent>();

  onClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit(event);
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.mousedown.emit(event);
  }
}
