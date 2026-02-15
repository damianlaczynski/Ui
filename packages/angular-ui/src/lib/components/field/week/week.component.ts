import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { DateComponent, DateFieldType } from '../date/date.component';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent } from '../../calendar';
import { ButtonComponent } from '../../button';

@Component({
  selector: 'ui-week',
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    CalendarComponent,
    ButtonComponent,
  ],
  templateUrl: '../date/date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeekComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        width: 100%;
        display: block;
      }
    `,
  ],
})
export class WeekComponent extends DateComponent {
  override dateType = input<DateFieldType>('week');
}
