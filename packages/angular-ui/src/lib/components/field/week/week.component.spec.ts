/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekComponent } from './week.component';

describe('WeekComponent', () => {
  let fixture: ComponentFixture<WeekComponent>;
  let component: WeekComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to week dateType', () => {
    expect(component.dateType()).toBe('week');
  });
});
