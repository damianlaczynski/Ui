/**
 * Boolean Filter Component
 *
 * Component for rendering boolean filter dropdown
 */

import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../field/dropdown/dropdown.component';
import { DataGridFilterTemplateContext } from '../../models/data-grid-config.model';

@Component({
  selector: 'ui-boolean-filter',

  imports: [FormsModule, DropdownComponent],
  template: `
    <ui-dropdown
      [items]="context().parameters || []"
      [size]="size()"
      [ngModel]="context().filterValue"
      (ngModelChange)="context().onValueChange($event)"
      [clearable]="true"
      [placeholder]="context().placeholder"
    />
  `,
})
export class BooleanFilterComponent {
  context = input.required<DataGridFilterTemplateContext>();
  size = input<'small' | 'medium' | 'large'>('medium');
}
