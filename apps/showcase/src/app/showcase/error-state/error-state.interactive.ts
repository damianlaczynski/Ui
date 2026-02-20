import { Component, signal, computed, viewChild } from '@angular/core';
import { ErrorStateComponent, IconName, QuickAction, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { ERROR_STATE_SHOWCASE_CONFIG } from './error-state.showcase.config';

@Component({
  selector: 'app-error-state-interactive',
  imports: [ErrorStateComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-error-state
          [title]="currentTitle()"
          [description]="currentDescription()"
          [icon]="currentIcon()"
          [size]="currentSize()"
          [primaryAction]="currentShowPrimary() ? primaryAction() : null"
          [secondaryAction]="currentShowSecondary() ? secondaryAction() : null"
        />
        <p style="margin-top: 12px; text-align: center;">
          Action clicks: <strong>{{ actionClickCount() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class ErrorStateInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = ERROR_STATE_SHOWCASE_CONFIG;

  actionClickCount = signal(0);

  private values = signal<Record<string, unknown>>({
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again later.',
    icon: 'error_circle',
    size: 'medium',
    showPrimary: false,
    showSecondary: false,
  });

  currentTitle = computed(() => (this.values()['title'] as string) || '');
  currentDescription = computed(() => (this.values()['description'] as string) || '');
  currentIcon = computed(() => {
    const icon = this.values()['icon'] as string;
    return (icon || 'error_circle') as IconName;
  });
  currentSize = computed(() => (this.values()['size'] as Size) || 'medium');
  currentShowPrimary = computed(() => (this.values()['showPrimary'] as boolean) ?? false);
  currentShowSecondary = computed(() => (this.values()['showSecondary'] as boolean) ?? false);

  primaryAction = signal<QuickAction>({
    label: 'Try Again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => {
      this.actionClickCount.update(c => c + 1);
      this.showcase()?.logEvent('actionClick', { label: 'Try Again' });
    },
  });

  secondaryAction = signal<QuickAction>({
    label: 'Contact Support',
    variant: 'secondary',
    action: () => {
      this.actionClickCount.update(c => c + 1);
      this.showcase()?.logEvent('actionClick', { label: 'Contact Support' });
    },
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.actionClickCount.set(0);
  }
}
