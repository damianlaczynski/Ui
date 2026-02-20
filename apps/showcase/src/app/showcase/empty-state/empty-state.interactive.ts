import { Component, signal, computed, viewChild } from '@angular/core';
import { EmptyStateComponent, IconName, QuickAction, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { EMPTY_STATE_SHOWCASE_CONFIG } from './empty-state.showcase.config';

@Component({
  selector: 'app-empty-state-interactive',
  imports: [EmptyStateComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-empty-state
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
export class EmptyStateInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = EMPTY_STATE_SHOWCASE_CONFIG;

  actionClickCount = signal(0);

  private values = signal<Record<string, unknown>>({
    title: 'No items found',
    description: 'There are no items to display at this time.',
    icon: 'document',
    size: 'medium',
    showPrimary: false,
    showSecondary: false,
  });

  currentTitle = computed(() => (this.values()['title'] as string) || '');
  currentDescription = computed(() => (this.values()['description'] as string) || '');
  currentIcon = computed(() => {
    const icon = this.values()['icon'] as string;
    return icon ? (icon as IconName) : undefined;
  });
  currentSize = computed(() => (this.values()['size'] as Size) || 'medium');
  currentShowPrimary = computed(() => (this.values()['showPrimary'] as boolean) ?? false);
  currentShowSecondary = computed(() => (this.values()['showSecondary'] as boolean) ?? false);

  primaryAction = signal<QuickAction>({
    label: 'Add Item',
    variant: 'primary',
    icon: 'add',
    action: () => {
      this.actionClickCount.update(c => c + 1);
      this.showcase()?.logEvent('actionClick', { label: 'Add Item' });
    },
  });

  secondaryAction = signal<QuickAction>({
    label: 'Learn More',
    variant: 'secondary',
    action: () => {
      this.actionClickCount.update(c => c + 1);
      this.showcase()?.logEvent('actionClick', { label: 'Learn More' });
    },
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.actionClickCount.set(0);
  }
}
