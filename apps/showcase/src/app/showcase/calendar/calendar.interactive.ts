import { Component, computed, signal, viewChild } from '@angular/core';
import { CalendarComponent, CalendarDay, CalendarView } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { CALENDAR_SHOWCASE_CONFIG } from './calendar.showcase.config';

@Component({
  selector: 'app-calendar-interactive',
  imports: [CalendarComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-calendar
          [currentMonth]="currentMonth()"
          [selectedDate]="currentRangeSelection() ? null : selectedDate()"
          [startDate]="currentRangeSelection() ? rangeStartDate() : null"
          [endDate]="currentRangeSelection() ? rangeEndDate() : null"
          [hoveredDate]="currentRangeSelection() ? hoveredDate() : null"
          [calendarView]="currentCalendarView()"
          [size]="currentSize()"
          [showMonthYearPicker]="currentShowMonthYearPicker()"
          [min]="currentMin()"
          [max]="currentMax()"
          [isDayInHoverRangeFn]="currentRangeSelection() ? isDayInHoverRange.bind(this) : undefined"
          (dateSelect)="onDateSelect($event)"
          (dateHover)="onDateHover($event)"
          (dateLeave)="onDateLeave()"
          (monthSelect)="onMonthSelect($event)"
          (yearSelect)="onYearSelect($event)"
          (previousMonth)="shiftMonth(-1)"
          (nextMonth)="shiftMonth(1)"
          (previousYear)="shiftYear(-1)"
          (nextYear)="shiftYear(1)"
          (previousYearRange)="shiftYear(12 * -1)"
          (nextYearRange)="shiftYear(12)"
          (switchToMonthsView)="setView('months')"
          (switchToYearsView)="setView('years')"
          (switchToDaysView)="setView('days')"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class CalendarInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = CALENDAR_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    calendarView: 'days',
    size: 'medium',
    showMonthYearPicker: true,
    min: '',
    max: '',
    rangeSelection: false,
  });

  currentMonth = signal(new Date());
  selectedDate = signal<Date | null>(null);
  rangeStartDate = signal<Date | null>(null);
  rangeEndDate = signal<Date | null>(null);
  hoveredDate = signal<Date | null>(null);
  activeRangeSelection = signal<'start' | 'end' | null>(null);

  currentCalendarView = computed(() => this.values()['calendarView'] as CalendarView);
  currentSize = computed(() => this.values()['size'] as 'small' | 'medium' | 'large');
  currentShowMonthYearPicker = computed(() => this.values()['showMonthYearPicker'] as boolean);
  currentMin = computed(() => (this.values()['min'] as string) || '');
  currentMax = computed(() => (this.values()['max'] as string) || '');
  currentRangeSelection = computed(() => this.values()['rangeSelection'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    const wasRangeEnabled = this.currentRangeSelection();
    const isRangeEnabled = !!newValues['rangeSelection'];
    this.values.set(newValues);

    if (wasRangeEnabled && !isRangeEnabled) {
      this.rangeStartDate.set(null);
      this.rangeEndDate.set(null);
      this.hoveredDate.set(null);
      this.activeRangeSelection.set(null);
    }
  }

  onReset(): void {
    this.currentMonth.set(new Date());
    this.selectedDate.set(null);
    this.rangeStartDate.set(null);
    this.rangeEndDate.set(null);
    this.hoveredDate.set(null);
    this.activeRangeSelection.set(null);
  }

  onDateSelect(day: CalendarDay): void {
    if (this.currentRangeSelection()) {
      this.onRangeDateSelect(day);
      return;
    }

    this.selectedDate.set(day.date);
    this.showcase()?.logEvent('dateSelect', { date: day.date.toISOString().split('T')[0] });
  }

  onDateHover(day: CalendarDay): void {
    if (
      this.currentRangeSelection() &&
      !day.isDisabled &&
      this.rangeStartDate() &&
      !this.rangeEndDate()
    ) {
      this.hoveredDate.set(day.date);
    }
  }

  onDateLeave(): void {
    if (this.currentRangeSelection()) {
      this.hoveredDate.set(null);
    }
  }

  onMonthSelect(monthIndex: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(monthIndex);
    this.currentMonth.set(next);
    this.setView('days');
    this.showcase()?.logEvent('monthSelect', { monthIndex });
  }

  onYearSelect(year: number): void {
    const next = new Date(this.currentMonth());
    next.setFullYear(year);
    this.currentMonth.set(next);
    this.setView('months');
    this.showcase()?.logEvent('yearSelect', { year });
  }

  shiftMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + delta);
    this.currentMonth.set(next);
    this.showcase()?.logEvent(delta > 0 ? 'nextMonth' : 'previousMonth');
  }

  shiftYear(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setFullYear(next.getFullYear() + delta);
    this.currentMonth.set(next);
    const eventName =
      delta === 12 || delta === -12
        ? delta > 0
          ? 'nextYearRange'
          : 'previousYearRange'
        : delta > 0
          ? 'nextYear'
          : 'previousYear';
    this.showcase()?.logEvent(eventName);
  }

  setView(view: CalendarView): void {
    this.values.update(v => ({ ...v, calendarView: view }));
    this.showcase()?.logEvent('viewChange', { view });
  }

  isDayInHoverRange(day: CalendarDay): boolean {
    const start = this.rangeStartDate();
    const end = this.rangeEndDate();
    const hovered = this.hoveredDate();

    if (!start || end || !hovered) {
      return false;
    }

    const dateOnly = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
    const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const hoveredOnly = new Date(hovered.getFullYear(), hovered.getMonth(), hovered.getDate());
    const rangeStart = startOnly < hoveredOnly ? startOnly : hoveredOnly;
    const rangeEnd = startOnly < hoveredOnly ? hoveredOnly : startOnly;

    return dateOnly > rangeStart && dateOnly < rangeEnd;
  }

  private onRangeDateSelect(day: CalendarDay): void {
    const selected = day.date;
    const active = this.activeRangeSelection();

    if (active === 'start' || !this.rangeStartDate()) {
      this.rangeStartDate.set(selected);
      this.rangeEndDate.set(null);
      this.activeRangeSelection.set('end');
      this.showcase()?.logEvent('rangeStartSelect', {
        startDate: selected.toISOString().split('T')[0],
      });
      return;
    }

    if (active === 'end' && this.rangeStartDate()) {
      const start = this.rangeStartDate()!;
      if (selected < start) {
        this.rangeEndDate.set(start);
        this.rangeStartDate.set(selected);
      } else {
        this.rangeEndDate.set(selected);
      }
      this.activeRangeSelection.set(null);
      this.showcase()?.logEvent('rangeEndSelect', {
        startDate: this.rangeStartDate()?.toISOString().split('T')[0],
        endDate: this.rangeEndDate()?.toISOString().split('T')[0],
      });
    }
  }
}
