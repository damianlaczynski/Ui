import { Component, computed, signal, viewChild } from '@angular/core';
import { Appearance, Size, ToastComponent, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { TOAST_SHOWCASE_CONFIG } from './toast.showcase.config';

@Component({
  selector: 'app-toast-interactive',
  imports: [ToastComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-toast
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [title]="currentTitle()"
          [message]="currentMessage()"
          [dismissible]="currentDismissible()"
          [showIcon]="currentShowIcon()"
          [showProgress]="currentShowProgress()"
          [visible]="true"
          (dismiss)="onDismiss()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class ToastInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = TOAST_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    title: 'Toast Title',
    message: 'This is a toast message.',
    variant: 'info',
    appearance: 'filled',
    size: 'medium',
    dismissible: true,
    showIcon: true,
    showProgress: false,
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentMessage = computed(() => this.values()['message'] as string);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentDismissible = computed(() => this.values()['dismissible'] as boolean);
  currentShowIcon = computed(() => this.values()['showIcon'] as boolean);
  currentShowProgress = computed(() => this.values()['showProgress'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onDismiss(): void {
    this.showcase()?.logEvent('dismiss', {
      title: this.currentTitle(),
      variant: this.currentVariant(),
    });
  }
}
