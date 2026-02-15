/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let fixture: ComponentFixture<MonthComponent>;
  let component: MonthComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to month dateType', () => {
    expect(component.dateType()).toBe('month');
  });
});
