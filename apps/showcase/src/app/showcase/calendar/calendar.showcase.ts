import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { CalendarComponent, CalendarDay, CalendarView, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { CALENDAR_DRAWER_CONFIGS } from './calendar.showcase.config';
import { CalendarInteractiveComponent } from './calendar.interactive';

@Component({
  selector: 'app-calendar-showcase',
  imports: [
    CalendarComponent,
    TableOfContentComponent,
    TitleCasePipe,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    CalendarInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="Calendar" />
        <p class="showcase__description">
          Calendar component for single-date and range selection with days, months, and years views.
          It supports size variants, min/max constraints, and month/year navigation controls.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Three calendar views: days, months, and years. Use the Customize drawer to adjust size and month/year picker visibility."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Days View</h3>
              <ui-calendar
                [currentMonth]="overviewCurrentMonth()"
                [selectedDate]="overviewSelectedDate()"
                [calendarView]="'days'"
                [size]="overviewForm().size"
                [showMonthYearPicker]="overviewForm().showMonthYearPicker"
                (dateSelect)="setSelectedDate(overviewSelectedDate, $event)"
                (previousMonth)="shiftMonth(overviewCurrentMonth, -1)"
                (nextMonth)="shiftMonth(overviewCurrentMonth, 1)"
                (switchToMonthsView)="setCalendarView(overviewCalendarView, 'months')"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Months View</h3>
              <ui-calendar
                [currentMonth]="overviewCurrentMonth()"
                [selectedDate]="overviewSelectedDate()"
                [calendarView]="'months'"
                [size]="overviewForm().size"
                (monthSelect)="selectMonth(overviewCurrentMonth, overviewCalendarView, $event)"
                (previousYear)="shiftYear(overviewCurrentMonth, -1)"
                (nextYear)="shiftYear(overviewCurrentMonth, 1)"
                (switchToYearsView)="setCalendarView(overviewCalendarView, 'years')"
                (switchToDaysView)="setCalendarView(overviewCalendarView, 'days')"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Years View</h3>
              <ui-calendar
                [currentMonth]="overviewCurrentMonth()"
                [selectedDate]="overviewSelectedDate()"
                [calendarView]="'years'"
                [size]="overviewForm().size"
                (yearSelect)="selectYear(overviewCurrentMonth, overviewCalendarView, $event)"
                (previousYearRange)="shiftYear(overviewCurrentMonth, -12)"
                (nextYearRange)="shiftYear(overviewCurrentMonth, 12)"
                (switchToMonthsView)="setCalendarView(overviewCalendarView, 'months')"
              />
            </div>
          </div>
          <div class="showcase__form-output">
            <p>
              <strong>Selected Date:</strong>
              {{ overviewSelectedDate() ? overviewSelectedDate()!.toLocaleDateString() : 'None' }}
            </p>
            <p>
              <strong>Current Month:</strong>
              {{
                overviewCurrentMonth().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </p>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Small, medium, and large size variants. Use the Customize drawer to toggle month/year picker visibility."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-calendar
                  [currentMonth]="sizeCurrentMonth()"
                  [selectedDate]="sizeSelectedDate()"
                  [calendarView]="'days'"
                  [size]="size"
                  [showMonthYearPicker]="sizeForm().showMonthYearPicker"
                  (dateSelect)="setSelectedDate(sizeSelectedDate, $event)"
                  (previousMonth)="shiftMonth(sizeCurrentMonth, -1)"
                  (nextMonth)="shiftMonth(sizeCurrentMonth, 1)"
                  (switchToMonthsView)="setCalendarView(sizeCalendarView, 'months')"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Min/Max Constraints"
          sectionDescription="Limit selectable days with minimum and maximum date constraints. Use the Customize drawer to change range presets."
          [formConfig]="constraintsDrawerFormConfig"
          [formValues]="constraintsFormValues()"
          (formValuesChange)="constraintsFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Constrained Calendar</h3>
              <ui-calendar
                [currentMonth]="constraintsCurrentMonth()"
                [selectedDate]="constraintsSelectedDate()"
                [calendarView]="'days'"
                [size]="constraintsForm().size"
                [showMonthYearPicker]="constraintsForm().showMonthYearPicker"
                [min]="constraintsForm().min"
                [max]="constraintsForm().max"
                (dateSelect)="setSelectedDate(constraintsSelectedDate, $event)"
                (previousMonth)="shiftMonth(constraintsCurrentMonth, -1)"
                (nextMonth)="shiftMonth(constraintsCurrentMonth, 1)"
                (switchToMonthsView)="setCalendarView(constraintsCalendarView, 'months')"
              />
              <div class="showcase__form-output">
                <p><strong>Min Date:</strong> {{ constraintsForm().min || 'None' }}</p>
                <p><strong>Max Date:</strong> {{ constraintsForm().max || 'None' }}</p>
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Date Range Selection"
          sectionDescription="Select start and end dates with hover preview between range boundaries."
          [formConfig]="rangeDrawerFormConfig"
          [formValues]="rangeFormValues()"
          (formValuesChange)="rangeFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Range Mode</h3>
              <ui-calendar
                [currentMonth]="rangeCurrentMonth()"
                [selectedDate]="null"
                [startDate]="rangeStartDate()"
                [endDate]="rangeEndDate()"
                [hoveredDate]="rangeHoveredDate()"
                [calendarView]="'days'"
                [size]="rangeForm().size"
                [showMonthYearPicker]="rangeForm().showMonthYearPicker"
                [isDayInHoverRangeFn]="isDayInHoverRange.bind(this)"
                (dateSelect)="onRangeDateSelect($event)"
                (dateHover)="onRangeDateHover($event)"
                (dateLeave)="onRangeDateLeave()"
                (previousMonth)="shiftMonth(rangeCurrentMonth, -1)"
                (nextMonth)="shiftMonth(rangeCurrentMonth, 1)"
                (switchToMonthsView)="setCalendarView(rangeCalendarView, 'months')"
              />
              <div class="showcase__form-output">
                <p>
                  <strong>Start Date:</strong>
                  {{ rangeStartDate() ? rangeStartDate()!.toLocaleDateString() : 'None' }}
                </p>
                <p>
                  <strong>End Date:</strong>
                  {{ rangeEndDate() ? rangeEndDate()!.toLocaleDateString() : 'None' }}
                </p>
              </div>
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Month/Year Picker"
          sectionDescription="Compare days view behavior with month/year picker enabled and disabled."
          [formConfig]="monthYearPickerDrawerFormConfig"
          [formValues]="monthYearPickerFormValues()"
          (formValuesChange)="monthYearPickerFormValues.set($event)"
        >
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Picker Enabled</h3>
              <ui-calendar
                [currentMonth]="monthYearPickerCurrentMonth()"
                [selectedDate]="monthYearPickerSelectedDate()"
                [calendarView]="'days'"
                [size]="monthYearPickerForm().size"
                [showMonthYearPicker]="true"
                (dateSelect)="setSelectedDate(monthYearPickerSelectedDate, $event)"
                (previousMonth)="shiftMonth(monthYearPickerCurrentMonth, -1)"
                (nextMonth)="shiftMonth(monthYearPickerCurrentMonth, 1)"
                (switchToMonthsView)="setCalendarView(monthYearPickerCalendarView, 'months')"
              />
            </div>
            <div class="showcase__item">
              <h3 class="showcase__item__title">Picker Disabled</h3>
              <ui-calendar
                [currentMonth]="monthYearPickerCurrentMonth()"
                [selectedDate]="monthYearPickerSelectedDate()"
                [calendarView]="'days'"
                [size]="monthYearPickerForm().size"
                [showMonthYearPicker]="false"
                (dateSelect)="setSelectedDate(monthYearPickerSelectedDate, $event)"
                (previousMonth)="shiftMonth(monthYearPickerCurrentMonth, -1)"
                (nextMonth)="shiftMonth(monthYearPickerCurrentMonth, 1)"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with view switching, size, month/year picker, constraints, and range
            selection in real time. Navigation and selection events are captured in the event log.
          </p>
          <app-calendar-interactive />
        </section>
      </div>
    </div>
  `,
})
export class CalendarShowcaseComponent {
  sizes = [...SIZES];

  overviewDrawerFormConfig = CALENDAR_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = CALENDAR_DRAWER_CONFIGS.size;
  constraintsDrawerFormConfig = CALENDAR_DRAWER_CONFIGS.constraints;
  rangeDrawerFormConfig = CALENDAR_DRAWER_CONFIGS.range;
  monthYearPickerDrawerFormConfig = CALENDAR_DRAWER_CONFIGS.monthYearPicker;

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showMonthYearPicker: true,
  });
  sizeFormValues = signal<Record<string, unknown>>({
    showMonthYearPicker: true,
  });
  constraintsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showMonthYearPicker: true,
    min: '2024-01-01',
    max: '2024-12-31',
  });
  rangeFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    showMonthYearPicker: true,
  });
  monthYearPickerFormValues = signal<Record<string, unknown>>({
    size: 'medium',
  });

  overviewForm = computed(() => this.toCalendarForm(this.overviewFormValues()));
  sizeForm = computed(() => this.toCalendarForm(this.sizeFormValues()));
  constraintsForm = computed(() => this.toCalendarForm(this.constraintsFormValues()));
  rangeForm = computed(() => this.toCalendarForm(this.rangeFormValues()));
  monthYearPickerForm = computed(() => this.toCalendarForm(this.monthYearPickerFormValues()));

  overviewCurrentMonth = signal(new Date());
  overviewSelectedDate = signal<Date | null>(null);
  overviewCalendarView = signal<CalendarView>('days');

  sizeCurrentMonth = signal(new Date());
  sizeSelectedDate = signal<Date | null>(null);
  sizeCalendarView = signal<CalendarView>('days');

  constraintsCurrentMonth = signal(new Date());
  constraintsSelectedDate = signal<Date | null>(null);
  constraintsCalendarView = signal<CalendarView>('days');

  rangeCurrentMonth = signal(new Date());
  rangeStartDate = signal<Date | null>(null);
  rangeEndDate = signal<Date | null>(null);
  rangeHoveredDate = signal<Date | null>(null);
  rangeActiveSelection = signal<'start' | 'end' | null>(null);
  rangeCalendarView = signal<CalendarView>('days');

  monthYearPickerCurrentMonth = signal(new Date());
  monthYearPickerSelectedDate = signal<Date | null>(null);
  monthYearPickerCalendarView = signal<CalendarView>('days');

  setSelectedDate(target: WritableSignal<Date | null>, day: CalendarDay): void {
    target.set(day.date);
  }

  shiftMonth(target: WritableSignal<Date>, delta: number): void {
    const next = new Date(target());
    next.setMonth(next.getMonth() + delta);
    target.set(next);
  }

  shiftYear(target: WritableSignal<Date>, delta: number): void {
    const next = new Date(target());
    next.setFullYear(next.getFullYear() + delta);
    target.set(next);
  }

  setCalendarView(target: WritableSignal<CalendarView>, view: CalendarView): void {
    target.set(view);
  }

  selectMonth(
    monthTarget: WritableSignal<Date>,
    viewTarget: WritableSignal<CalendarView>,
    monthIndex: number,
  ): void {
    const next = new Date(monthTarget());
    next.setMonth(monthIndex);
    monthTarget.set(next);
    viewTarget.set('days');
  }

  selectYear(
    monthTarget: WritableSignal<Date>,
    viewTarget: WritableSignal<CalendarView>,
    year: number,
  ): void {
    const next = new Date(monthTarget());
    next.setFullYear(year);
    monthTarget.set(next);
    viewTarget.set('months');
  }

  onRangeDateSelect(day: CalendarDay): void {
    const selectedDate = day.date;
    const activeSelection = this.rangeActiveSelection();

    if (activeSelection === 'start' || !this.rangeStartDate()) {
      this.rangeStartDate.set(selectedDate);
      this.rangeEndDate.set(null);
      this.rangeActiveSelection.set('end');
      return;
    }

    if (activeSelection === 'end' && this.rangeStartDate()) {
      if (selectedDate < this.rangeStartDate()!) {
        this.rangeEndDate.set(this.rangeStartDate());
        this.rangeStartDate.set(selectedDate);
      } else {
        this.rangeEndDate.set(selectedDate);
      }
      this.rangeActiveSelection.set(null);
    }
  }

  onRangeDateHover(day: CalendarDay): void {
    if (!day.isDisabled && this.rangeStartDate() && !this.rangeEndDate()) {
      this.rangeHoveredDate.set(day.date);
    }
  }

  onRangeDateLeave(): void {
    this.rangeHoveredDate.set(null);
  }

  isDayInHoverRange(day: CalendarDay): boolean {
    const start = this.rangeStartDate();
    const end = this.rangeEndDate();
    const hovered = this.rangeHoveredDate();

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

  private toCalendarForm(v: Record<string, unknown>) {
    return {
      size: (v['size'] as 'small' | 'medium' | 'large') ?? 'medium',
      showMonthYearPicker:
        v['showMonthYearPicker'] === undefined ? true : !!v['showMonthYearPicker'],
      min: (v['min'] as string) ?? '',
      max: (v['max'] as string) ?? '',
    };
  }
}
