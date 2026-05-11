import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, type DropdownItem } from 'ui';

const densityItems: DropdownItem[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

@Component({
  selector: 'app-dropdown-variants-states-example',
  imports: [FormsModule, DropdownComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:52rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-dropdown
          label="Filled"
          [items]="densityItems"
          inputVariant="filled"
          [(ngModel)]="filledValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Filled gray"
          [items]="densityItems"
          inputVariant="filled-gray"
          [(ngModel)]="grayValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Filled lighter"
          [items]="densityItems"
          inputVariant="filled-lighter"
          size="small"
          [(ngModel)]="lighterValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Underlined"
          [items]="densityItems"
          inputVariant="underlined"
          size="large"
          [(ngModel)]="underlinedValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-dropdown
          label="Required"
          placeholder="Pick a cadence"
          helpText="Shown when a selection is mandatory before save."
          [items]="densityItems"
          [required]="true"
          [(ngModel)]="requiredValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Readonly"
          [items]="densityItems"
          [readonly]="true"
          [(ngModel)]="readonlyValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-dropdown
          label="Disabled"
          [items]="densityItems"
          [disabled]="true"
          [(ngModel)]="disabledValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `
})
export class DropdownVariantsStatesExampleComponent {
  protected readonly densityItems = densityItems;
  protected filledValue = 'daily';
  protected grayValue = 'weekly';
  protected lighterValue = 'monthly';
  protected underlinedValue = 'daily';
  protected requiredValue = '';
  protected readonlyValue = 'weekly';
  protected disabledValue = 'monthly';
}
