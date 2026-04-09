import {
  Directive,
  ElementRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Appearance, Shape, Size, Variant } from '../utils';

@Directive({
  selector: 'button[uiButton]',
  standalone: true,
  host: {
    '[class]': 'hostClasses()',
    '[style.width]': 'widthStyle()',
  },
})
export class UiButtonDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);

  uiButtonVariant = input<Variant>('secondary');
  uiButtonAppearance = input<Appearance>('filled');
  uiButtonSize = input<Size>('medium');
  uiButtonShape = input<Shape>('rounded');
  uiButtonLoading = input(false);
  uiButtonSelected = input(false);
  uiButtonFullWidth = input(false);

  private readonly disabledFromDom = signal(false);
  private observer: MutationObserver | null = null;

  protected readonly hostClasses = computed(() => {
    const classes = ['button'];
    classes.push(`button--${this.uiButtonVariant()}`);
    classes.push(`button--${this.uiButtonAppearance()}`);
    classes.push(`button--${this.uiButtonSize()}`);
    classes.push(`button--${this.uiButtonShape()}`);

    if (this.disabledFromDom()) {
      classes.push('button--disabled');
    }
    if (this.uiButtonLoading()) {
      classes.push('button--loading');
    }
    if (this.uiButtonSelected()) {
      classes.push('button--selected');
    }
    if (this.uiButtonFullWidth()) {
      classes.push('button--full-width');
    }

    return classes.join(' ');
  });

  protected readonly widthStyle = computed(() => (this.uiButtonFullWidth() ? '100%' : null));

  constructor() {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }
        this.syncDisabledFromDom();
        this.observer = new MutationObserver(() => this.syncDisabledFromDom());
        this.observer.observe(this.elementRef.nativeElement, {
          attributes: true,
          attributeFilter: ['disabled'],
        });
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private syncDisabledFromDom(): void {
    const el = this.elementRef.nativeElement;
    this.disabledFromDom.set(el.disabled || el.hasAttribute('disabled'));
  }
}
