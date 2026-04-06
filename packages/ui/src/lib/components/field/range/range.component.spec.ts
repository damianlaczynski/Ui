/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let fixture: ComponentFixture<RangeComponent>;
  let component: RangeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default track min 0 and max 100', () => {
    expect(component.min()).toBe(0);
    expect(component.max()).toBe(100);
  });

  it('should write and read value via ControlValueAccessor', () => {
    component.writeValue({ min: 20, max: 80 });
    expect(component.lowValue()).toBe(20);
    expect(component.highValue()).toBe(80);
  });

  it('should use full span when writeValue receives null', () => {
    component.writeValue(null);
    expect(component.lowValue()).toBe(0);
    expect(component.highValue()).toBe(100);
  });

  it('should update on lower input event when not readonly', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.value = '30';
    lower.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lowValue()).toBe(30);
  });

  it('should emit change on lower change event', () => {
    let emitted: { min: number; max: number } | undefined;
    component.change.subscribe((v: { min: number; max: number }) => (emitted = v));
    component.writeValue({ min: 10, max: 90 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(emitted).toEqual({ min: 10, max: 90 });
  });

  it('should not update when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    component.writeValue({ min: 20, max: 80 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.value = '50';
    lower.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lowValue()).toBe(20);
  });

  it('should compute thumb percentages from endpoints', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 25, max: 75 });
    fixture.detectChanges();
    expect(component.leftThumbPercent()).toBe(25);
    expect(component.rightThumbPercent()).toBe(75);
  });

  it('should keep left endpoint fixed when moving right endpoint past it (sorted model only)', () => {
    component.writeValue({ min: 20, max: 80 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    const upper = inputs[1] as HTMLInputElement;
    upper.value = '10';
    upper.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(lower.value).toBe('20');
    expect(upper.value).toBe('10');
    expect(component.lowValue()).toBe(10);
    expect(component.highValue()).toBe(20);
  });
});
