import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  readonly scrollY = signal(0);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private container: Element | null = null;
  private listener = (): void => this.updateScrollY();

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    window.addEventListener('scroll', this.listener, { passive: true });
    this.updateScrollY();
  }

  register(container: Element): void {
    this.unregister();
    this.container = container;
    if (!this.isBrowser) {
      this.scrollY.set(0);
      return;
    }

    window.removeEventListener('scroll', this.listener);
    this.updateScrollY();
    container.addEventListener('scroll', this.listener, { passive: true });
  }

  unregister(): void {
    if (!this.isBrowser) {
      this.container = null;
      this.scrollY.set(0);
      return;
    }

    if (this.container) {
      this.container.removeEventListener('scroll', this.listener);
      this.container = null;
      window.addEventListener('scroll', this.listener, { passive: true });
    }
    this.updateScrollY();
  }

  scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.container) {
      this.container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private updateScrollY(): void {
    if (!this.isBrowser) {
      this.scrollY.set(0);
      return;
    }

    const y = this.container ? this.container.scrollTop : window.scrollY;
    this.scrollY.set(y);
  }
}
