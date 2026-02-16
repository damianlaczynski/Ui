import { Component, forwardRef, input, model, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'ui-slider',
  imports: [CommonModule, FieldComponent],
  templateUrl: './slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent extends FieldComponent implements ControlValueAccessor, OnInit {
  @ViewChild('sliderInput') sliderInput!: ElementRef<HTMLInputElement>;

  // Component inputs
  valueModel = model<number>();

  // Slider-specific inputs
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  unit = input<string>('');
  formatValue = input<(value: number) => string>(value => value.toString());
  vertical = input<boolean>(false);
  ariaValueText = input<string | ((value: number) => string) | null>(null);
  showStepMarkers = input<boolean>(false);
  showMinMax = input<boolean>(false);

  protected _isDragging = false;

  get sliderClasses(): string {
    const classes = ['slider'];

    classes.push(`slider--${this.size()}`);

    if (this.disabled()) {
      classes.push('slider--disabled');
    }

    if (this.readonly()) {
      classes.push('slider--readonly');
    }

    if (this._isDragging) {
      classes.push('slider--dragging');
    }

    if (this.vertical()) {
      classes.push('slider--vertical');
    }

    return classes.join(' ');
  }

  getFillPercentage(): number {
    const range = this.max() - this.min();
    const valueOffset = this.currentValue - this.min();
    return (valueOffset / range) * 100;
  }

  getThumbPosition(): number {
    return this.getFillPercentage();
  }

  getAriaValueText(): string | null {
    const aria = this.ariaValueText();
    if (!aria) return null;
    if (typeof aria === 'function') return aria(this.currentValue);
    return aria;
  }

  getStepsPercent(): string | null {
    if (!this.showStepMarkers()) return null;
    const s = this.step();
    const minVal = this.min();
    const maxVal = this.max();
    if (s <= 0 || maxVal <= minVal) return null;
    const range = maxVal - minVal;
    const numSteps = Math.round(range / s);
    if (numSteps < 2) return null;
    return `${100 / numSteps}%`;
  }

  getSliderDirection(): string {
    return this.vertical() ? '0deg' : '90deg';
  }

  getVisualStyle(): Record<string, string> {
    const progress = `${this.getFillPercentage()}%`;
    const direction = this.getSliderDirection();
    const stepsPercent = this.getStepsPercent();
    const style: Record<string, string> = {
      '--slider-progress': progress,
      '--slider-direction': direction,
    };
    if (stepsPercent) {
      style['--slider-steps-percent'] = stepsPercent;
    }
    return style;
  }

  getThumbWrapperStyle(): Record<string, string> {
    const progress = `${this.getFillPercentage()}%`;
    const position = `clamp(var(--slider-thumb-radius), ${progress}, calc(100% - var(--slider-thumb-radius)))`;
    return this.vertical()
      ? { bottom: position, transform: 'translate(-50%, 50%)' }
      : { left: position, transform: 'translate(-50%, -50%)' };
  }

  get currentValue(): number {
    return this.valueModel() !== undefined && this.valueModel() !== null
      ? this.valueModel()!
      : this.value;
  }

  private setCurrentValue(value: number): void {
    if (this.valueModel() !== undefined && this.valueModel() !== null) {
      this.valueModel.set(value);
    } else {
      this.value = value;
    }
    this.onChange(value);
  }

  onSliderInput(event: Event): void {
    if (this.disabled() || this.readonly()) return;
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    if (isFinite(newValue) && !isNaN(newValue)) {
      this.setCurrentValue(newValue);
    }
  }

  onSliderChange(event: Event): void {
    if (this.disabled() || this.readonly()) return;
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    if (isFinite(newValue) && !isNaN(newValue)) {
      this.setCurrentValue(newValue);
      this.change.emit(newValue);
    }
  }

  onSliderKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
    }
  }

  override onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this._isDragging = false;
    this.onTouched();
    this.blur.emit(event);
  }

  onMouseDown(): void {
    if (!this.disabled() && !this.readonly()) {
      this._isDragging = true;
    }
  }

  onMouseUp(): void {
    this._isDragging = false;
  }

  // ControlValueAccessor methods
  override writeValue(value: unknown): void {
    if (value !== null && value !== undefined) {
      const numValue = typeof value === 'number' ? value : parseFloat(String(value));
      if (this.valueModel() !== undefined && this.valueModel() !== null) {
        this.valueModel.set(numValue);
      } else {
        this.value = numValue;
      }
    } else {
      const minValue = this.min();
      if (this.valueModel() !== undefined && this.valueModel() !== null) {
        this.valueModel.set(minValue);
      } else {
        this.value = minValue;
      }
    }
  }

  setValue(value: number): void {
    this.setCurrentValue(value);
    this.change.emit(value);
  }
}
