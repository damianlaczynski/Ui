/**
 * Text Filter Component
 *
 * Component for rendering text filter input
 */

import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from '../../../field/text/text.component';
import { DataGridFilterTemplateContext } from '../../models/data-grid-config.model';

@Component({
  selector: 'ui-text-filter',

  imports: [FormsModule, TextComponent],
  template: `
    <ui-text
      [placeholder]="context().placeholder"
      [size]="size()"
      [inputVariant]="'filled-gray'"
      [ngModel]="context().filterValue"
      (ngModelChange)="context().onValueChange($event)"
    />
  `,
})
export class TextFilterComponent {
  context = input.required<DataGridFilterTemplateContext>();
  size = input<'small' | 'medium' | 'large'>('medium');
}
