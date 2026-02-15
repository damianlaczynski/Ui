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
import { TimePickerComponent } from '../../time-picker';
import {
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
  OverlayHandle,
  openConnectedOverlay,
} from '../../overlay/open-connected-overlay';

@Component({
  selector: 'ui-time',
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    TimePickerComponent,
  ],
  templateUrl: './time.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeComponent),
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
export class TimeComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  step = input<number | string>('');
  panelWidth = input<number>(220);
  use24HourFormat = input<boolean>(true);

  isOpen = signal<boolean>(false);
  selectedTime = signal<string>('');
  displayText = computed(() => this.selectedTime());

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;

  constructor() {
    super();

    effect(() => {
      const time = this.selectedTime();
      this.value = time;
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

  onTimeInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      return;
    }

    this.selectedTime.set(inputValue);
  }

  onTimeChange(timeStr: string): void {
    this.selectedTime.set(timeStr);
    this.closePanel(false);
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedTime.set('');
      super.writeValue('');
      return;
    }

    this.selectedTime.set(String(value));
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedTime.set('');
    super.clear();
  }

  openPanel(): void {
    if (this.isOpen()) {
      return;
    }

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
}
