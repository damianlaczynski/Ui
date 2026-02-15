import {
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  NgZone,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent, CalendarDay, CalendarView } from '../../calendar';
import {
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
  OverlayHandle,
  openConnectedOverlay,
} from '../../overlay/open-connected-overlay';
import { ButtonComponent } from '../../button';
import { IconName } from '../../icon';

export type DateFieldType = 'date' | 'month' | 'week';

interface CalendarWeek {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  year: number;
  isSelected: boolean;
}

@Component({
  selector: 'ui-date',
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    CalendarComponent,
    ButtonComponent,
  ],
  templateUrl: './date.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class DateComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  dateType = input<DateFieldType>('date');
  min = input<string>('');
  max = input<string>('');
  panelWidth = input<number>(300);

  isOpen = signal<boolean>(false);
  currentMonth = signal<Date>(new Date());
  selectedDate = signal<Date | null>(null);
  calendarView = signal<CalendarView>('days');
  selectedWeek = signal<number | null>(null);
  selectedYear = signal<number | null>(null);

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;

  displayText = computed(() => {
    const date = this.selectedDate();
    const type = this.dateType();

    if (!date) {
      return '';
    }

    if (type === 'month') {
      return this.formatMonth(date);
    }

    if (type === 'week') {
      return this.formatWeek(date);
    }

    return this.formatDate(date);
  });

  calendarWeeks = computed(() => this.generateCalendarWeeks());

  constructor() {
    super();

    effect(() => {
      const date = this.selectedDate();
      const type = this.dateType();

      if (!date) {
        this.value = '';
      } else if (type === 'month') {
        this.value = this.toISOMonth(date);
      } else if (type === 'week') {
        this.value = this.toISOWeek(date);
      } else {
        this.value = this.toISODate(date);
      }

      this.onChange(this.value);
    });
  }

  override ngOnDestroy(): void {
    this.overlayHandle?.destroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (this.isOpen()) {
      this.closePanel(false);
    } else {
      this.openPanel();
    }
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);

    if (
      shouldFocusTrigger &&
      this.triggerElement?.nativeElement &&
      document.contains(this.triggerElement.nativeElement)
    ) {
      try {
        setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
      } catch {
        // no-op
      }
    }
  }

  onDateInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      return;
    }

    const parsedDate = this.parseDateFromInput(inputValue);
    if (parsedDate) {
      this.selectedDate.set(parsedDate);
    }
  }

  onCalendarDateSelect(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }

    this.selectedDate.set(day.date);
    if (this.dateType() === 'date') {
      this.closePanel(false);
    }
  }

  onCalendarMonthSelect(monthIndex: number): void {
    const newDate = new Date(this.currentMonth());
    newDate.setMonth(monthIndex);

    if (this.dateType() === 'month') {
      this.selectedDate.set(newDate);
      this.closePanel(false);
    } else {
      this.currentMonth.set(newDate);
      this.calendarView.set('days');
    }
  }

  onCalendarYearSelect(year: number): void {
    const newDate = new Date(this.currentMonth());
    newDate.setFullYear(year);
    this.currentMonth.set(newDate);
    this.calendarView.set('months');
  }

  selectWeek(week: CalendarWeek): void {
    this.selectedWeek.set(week.weekNumber);
    this.selectedYear.set(week.year);
    this.selectedDate.set(week.startDate);
    this.closePanel(false);
  }

  onCalendarSwitchToMonthsView(): void {
    this.calendarView.set('months');
  }

  onCalendarSwitchToYearsView(): void {
    this.calendarView.set('years');
  }

  onCalendarSwitchToDaysView(): void {
    this.calendarView.set('days');
  }

  onCalendarPreviousMonth(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextMonth(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarPreviousYear(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() - 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextYear(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() + 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarPreviousYearRange(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() - 12);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextYearRange(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() + 12);
    this.currentMonth.set(newMonth);
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth.set(today);
    this.selectedDate.set(today);

    if (this.dateType() === 'week') {
      this.selectedWeek.set(this.getWeekNumber(today));
      this.selectedYear.set(today.getFullYear());
    }

    this.closePanel(false);
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedDate.set(null);
      super.writeValue('');
      return;
    }

    this.selectedDate.set(new Date(String(value)));
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedDate.set(null);
    this.selectedWeek.set(null);
    this.selectedYear.set(null);
    super.clear();
  }

  openPanel(): void {
    if (this.isOpen()) {
      return;
    }

    if (this.selectedDate()) {
      this.currentMonth.set(new Date(this.selectedDate()!));
    }

    this.calendarView.set(this.dateType() === 'month' ? 'months' : 'days');

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.triggerElement,
      template: this.panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
        width: this.panelWidth(),
        hasBackdrop: false,
      },
      onClose: focusTrigger => {
        if (focusTrigger) {
          this.closePanel(true);
        } else {
          setTimeout(() => this.closePanel(false), 0);
        }
      },
    });

    this.isOpen.set(true);
  }

  getIcon(): IconName {
    if (this.dateType() === 'month') {
      return 'calendar_month';
    }
    if (this.dateType() === 'week') {
      return 'calendar_week_numbers';
    }
    return 'calendar';
  }

  private parseDateFromInput(inputValue: string): Date | null {
    const isoDate = new Date(inputValue);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    const datePatterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
      /(\d{1,2})-(\d{1,2})-(\d{4})/,
    ];

    for (const pattern of datePatterns) {
      const match = inputValue.match(pattern);
      if (!match) {
        continue;
      }

      if (pattern === datePatterns[0] || pattern === datePatterns[2]) {
        const month = parseInt(match[1], 10) - 1;
        const day = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        return new Date(year, month, day);
      }

      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }

    return null;
  }

  private generateCalendarWeeks(): CalendarWeek[] {
    const currentYear = this.currentMonth().getFullYear();
    const weeks: CalendarWeek[] = [];
    const firstDay = new Date(currentYear, 0, 1);
    const lastDay = new Date(currentYear, 11, 31);
    const currentDate = new Date(firstDay);
    const dayOfWeek = currentDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + daysToMonday);

    while (currentDate <= lastDay || currentDate.getFullYear() === currentYear) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const weekNumber = this.getWeekNumber(weekStart);
      const isSelected = this.selectedWeek() === weekNumber && this.selectedYear() === currentYear;

      weeks.push({
        weekNumber,
        startDate: weekStart,
        endDate: weekEnd,
        year: currentYear,
        isSelected,
      });

      currentDate.setDate(currentDate.getDate() + 7);
      if (currentDate.getFullYear() > currentYear) {
        break;
      }
    }

    return weeks;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private formatMonth(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  private formatWeek(date: Date): string {
    const week = this.getWeekNumber(date);
    return `Week ${week}, ${date.getFullYear()}`;
  }

  private toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toISOMonth(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  private toISOWeek(date: Date): string {
    const week = this.getWeekNumber(date);
    return `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
