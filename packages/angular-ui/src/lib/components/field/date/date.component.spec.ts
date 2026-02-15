/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let fixture: ComponentFixture<DateComponent>;
  let component: DateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should parse date values without timezone shifting day', () => {
    fixture.componentRef.setInput('dateType', 'date');
    fixture.detectChanges();

    component.writeValue('2026-02-15');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(selected?.getFullYear()).toBe(2026);
    expect(selected?.getMonth()).toBe(1);
    expect(selected?.getDate()).toBe(15);
  });

  it('should parse month values explicitly as first day of month', () => {
    fixture.componentRef.setInput('dateType', 'month');
    fixture.detectChanges();

    component.writeValue('2026-02');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(selected?.getFullYear()).toBe(2026);
    expect(selected?.getMonth()).toBe(1);
    expect(selected?.getDate()).toBe(1);
  });

  it('should parse iso week values and set selectedWeek/selectedYear', () => {
    fixture.componentRef.setInput('dateType', 'week');
    fixture.detectChanges();

    component.writeValue('2026-W01');

    const selected = component.selectedDate();
    expect(selected).toBeTruthy();
    expect(component.selectedWeek()).toBe(1);
    expect(component.selectedYear()).toBe(2026);
  });

  it('should clear value for invalid week input', () => {
    fixture.componentRef.setInput('dateType', 'week');
    fixture.detectChanges();

    component.writeValue('2026-W99');

    expect(component.selectedDate()).toBeNull();
    expect(component.selectedWeek()).toBeNull();
    expect(component.selectedYear()).toBeNull();
    expect(component.value).toBe('');
  });
});
