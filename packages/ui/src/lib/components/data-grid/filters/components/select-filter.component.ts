/**
 * Select Filter Component
 *
 * Component for rendering select/multi-select filter dropdown
 */

import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../../field/dropdown/dropdown.component';
import { DataGridFilterTemplateContext } from '../../models/data-grid-config.model';

@Component({
  selector: 'ui-select-filter',

  imports: [FormsModule, DropdownComponent],
  template: `
    <ui-dropdown
      inputVariant="filled-gray"
      [items]="context().parameters || []"
      [mode]="'multi'"
      [size]="size()"
      [ngModel]="context().filterValue"
      (ngModelChange)="context().onValueChange($event)"
      [clearable]="true"
      [placeholder]="context().placeholder"
    />
  `,
})
export class SelectFilterComponent {
  context = input.required<DataGridFilterTemplateContext>();
  size = input<'small' | 'medium' | 'large'>('medium');
}
