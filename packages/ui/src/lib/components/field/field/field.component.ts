import { Component, OnInit, OnDestroy, input, output, model, inject } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InputVariant, Size } from '../../utils';
import { getValidationErrorMessage, shouldShowValidationError } from './validation-helper';

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'toggle'
  | 'switch'
  | 'date'
  | 'time'
  | 'datetime'
  | 'datetime-local'
  | 'week'
  | 'month'
  | 'year'
  | 'file'
  | 'color'
  | 'range'
  | 'slider'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'radio-group'
  | 'radio-button-group';

@Component({
  selector: 'ui-field',
  templateUrl: './field.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  imports: [CommonModule],
})
export class FieldComponent implements ControlValueAccessor, OnInit, OnDestroy {
  protected ngControl = inject(NgControl, { optional: true, skipSelf: true });

  fieldType = input<FieldType>('text');
  inputVariant = input<InputVariant>('filled');
  label = input<string>('');
  placeholder = input<string>('');
  helpText = input<string>('');
  errorText = model<string>('');
  required = input<boolean>(false);
  disabled = model<boolean>(false);
  readonly = model<boolean>(false);
  size = input<Size>('medium');
  name = input<string>('');
  id = model<string | number>('');
  autocomplete = input<string | null>(null);
  showClearButton = input<boolean>(true);
  ariaLabel = input<string>('');
  ariaDescribedBy = input<string>('');
  autoValidation = input<boolean>(true);

  change = output<any>();
  focus = output<FocusEvent>();
  blur = output<FocusEvent>();
  keyup = output<KeyboardEvent>();
  keydown = output<KeyboardEvent>();

  value: any = '';
  protected _isFocused = false;

  private _statusChangesSubscription?: Subscription;
  private _valueChangesSubscription?: Subscription;
  private _manualErrorText: string | null = null;

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  fieldClasses(): string {
    const classes = ['field'];

    classes.push(`field--${this.size()}`);

    if (this.disabled()) {
      classes.push('field--disabled');
    }

    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = [`input-wrapper--${this.size()}`, `input-wrapper--${this.inputVariant()}`];

    if (this.disabled()) {
      classes.push('input-wrapper--disabled');
    }

    if (this.readonly()) {
      classes.push('input-wrapper--read-only');
    }

    if (this.errorText()) {
      classes.push('input-wrapper--error');
    }

    return classes.join(' ');
  }

  get labelClasses(): string {
    const classes = [`input-label--${this.size()}`];

    if (this.disabled()) {
      classes.push('input-label--disabled');
    }

    if (this.required()) {
      classes.push('input-label--required');
    }

    return classes.join(' ');
  }

  isFocused(): boolean {
    return this._isFocused;
  }

  getTabIndex(): number {
    return this.disabled() || this.readonly() ? -1 : 0;
  }

  ngOnInit(): void {
    if (!this.id()) {
      if (this.name()) {
        this.id.set(this.name());
      } else {
        this.id.set(this.generateFieldId());
      }
    }

    if (this.ngControl) {
      if (this.autoValidation()) {
        this.setupAutoValidation();
      }
    }

    const initialErrorText = this.errorText();
    if (initialErrorText && initialErrorText.trim().length > 0) {
      this._manualErrorText = initialErrorText;
    }
  }

  ngOnDestroy(): void {
    this._statusChangesSubscription?.unsubscribe();
    this._valueChangesSubscription?.unsubscribe();
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  onFocus(event: FocusEvent): void {
    this._isFocused = true;
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this.onTouched();
    this.blur.emit(event);

    const control = this.ngControl?.control;
    if (control) {
      this.updateValidationError(control);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyup.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  setReadOnlyState(isReadOnly: boolean): void {
    this.readonly.set(isReadOnly);
  }

  private generateFieldId(): string {
    return `field-${Math.random().toString(36).substr(2, 9)}`;
  }

  clear(): void {
    this.value = '';
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  private setupAutoValidation(): void {
    const control = this.ngControl?.control;
    if (!control) {
      return;
    }

    this.updateValidationError(control);

    this._statusChangesSubscription = control.statusChanges.subscribe(() => {
      this.updateValidationError(control);
    });

    this._valueChangesSubscription = control.valueChanges.subscribe(() => {
      this.updateValidationError(control);
    });
  }

  private updateValidationError(control: AbstractControl): void {
    if (!this.autoValidation()) {
      return;
    }

    const currentErrorText = this.errorText();

    if (this._manualErrorText !== null && currentErrorText === this._manualErrorText) {
      return;
    }

    if (shouldShowValidationError(control)) {
      const errorMessage = getValidationErrorMessage(
        control.errors,
        control,
        this.label() || undefined,
      );

      if (currentErrorText !== errorMessage) {
        this.errorText.set(errorMessage);
      }
    } else {
      if (this._manualErrorText === null || currentErrorText !== this._manualErrorText) {
        if (currentErrorText && currentErrorText.trim().length > 0) {
          this.errorText.set('');
        }
      }
    }
  }
}
