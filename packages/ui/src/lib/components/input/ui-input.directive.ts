import {
  Directive,
  ElementRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InputVariant, Size } from '../utils';

@Directive({
  selector: 'input[uiInput], textarea[uiInput]',
  standalone: true,
  host: {
    class: 'input',
  },
})
export class UiInputDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);

  uiInputAppearance = input<InputVariant>('filled');
  uiInputSize = input<Size>('medium');
  uiInputError = input<boolean>(false);

  private wrapper: HTMLElement | null = null;
  private createdWrapper = false;
  private observer: MutationObserver | null = null;

  constructor() {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }
        this.mount();
        this.syncObserver();
      },
      { injector: this.injector },
    );

    effect(
      () => {
        this.uiInputAppearance();
        this.uiInputSize();
        this.uiInputError();
        this.updateWrapperClasses();
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    if (this.createdWrapper && this.wrapper?.parentNode) {
      const el = this.elementRef.nativeElement;
      const parent = this.wrapper.parentNode as Node;
      parent.insertBefore(el, this.wrapper);
      parent.removeChild(this.wrapper);
    }
    this.wrapper = null;
    this.createdWrapper = false;
  }

  private mount(): void {
    const el = this.elementRef.nativeElement;
    if (el.parentElement?.classList.contains('input-wrapper')) {
      this.wrapper = el.parentElement;
      this.createdWrapper = false;
      this.updateWrapperClasses();
      return;
    }

    const parent = el.parentNode as Node | null;
    if (!parent) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';
    parent.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    this.wrapper = wrapper;
    this.createdWrapper = true;
    this.updateWrapperClasses();
  }

  private syncObserver(): void {
    const el = this.elementRef.nativeElement;
    this.observer = new MutationObserver(() => this.updateWrapperClasses());
    this.observer.observe(el, { attributes: true, attributeFilter: ['disabled', 'readonly'] });
  }

  private updateWrapperClasses(): void {
    const el = this.elementRef.nativeElement;
    const w = this.wrapper;
    if (!w) {
      return;
    }

    w.className = [
      'input-wrapper',
      `input-wrapper--${this.uiInputSize()}`,
      `input-wrapper--${this.uiInputAppearance()}`,
    ].join(' ');

    if (this.uiInputError()) {
      w.classList.add('input-wrapper--error');
    }
    if (el.disabled) {
      w.classList.add('input-wrapper--disabled');
    }
    if (el.readOnly) {
      w.classList.add('input-wrapper--read-only');
    }
  }
}
