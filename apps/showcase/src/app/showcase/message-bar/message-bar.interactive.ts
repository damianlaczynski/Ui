import { Component, computed, signal, viewChild } from '@angular/core';
import { Appearance, IconName, MessageBarComponent, QuickAction, Size, Variant } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { MESSAGE_BAR_SHOWCASE_CONFIG } from './message-bar.showcase.config';

@Component({
  selector: 'app-message-bar-interactive',
  imports: [MessageBarComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview style="width: 100%;">
        <ui-message-bar
          [title]="currentTitle()"
          [message]="currentMessage()"
          [actions]="currentActions()"
          [icon]="currentIcon()"
          [variant]="currentVariant()"
          [appearance]="currentAppearance()"
          [size]="currentSize()"
          [multiline]="currentMultiline()"
          [showIcon]="currentShowIcon()"
          [dismissible]="currentDismissible()"
          (actionSelect)="onActionSelect($event)"
          (dismiss)="onDismiss()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class MessageBarInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = MESSAGE_BAR_SHOWCASE_CONFIG;

  private values = signal<Record<string, unknown>>({
    title: 'Heads up',
    message: 'This is a message bar with contextual information.',
    actionLabels: 'Review, Details',
    variant: 'info',
    appearance: 'tint',
    size: 'medium',
    multiline: true,
    showIcon: true,
    icon: '',
    dismissible: true,
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentMessage = computed(() => this.values()['message'] as string);
  currentActions = computed(() => this.toActions(this.values()['actionLabels'] as string));
  currentIcon = computed(() => (this.values()['icon'] as IconName) || undefined);
  currentVariant = computed(() => this.values()['variant'] as Variant);
  currentAppearance = computed(() => this.values()['appearance'] as Appearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentMultiline = computed(() => this.values()['multiline'] as boolean);
  currentShowIcon = computed(() => this.values()['showIcon'] as boolean);
  currentDismissible = computed(() => this.values()['dismissible'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  onActionSelect(action: QuickAction): void {
    this.showcase()?.logEvent('actionSelect', {
      label: action.label,
    });
  }

  onDismiss(): void {
    this.showcase()?.logEvent('dismiss', {
      variant: this.currentVariant(),
    });
  }

  private toActions(raw: string): QuickAction[] {
    return (raw ?? '')
      .split(',')
      .map(label => label.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map(label => ({
        label,
        action: () => {},
      }));
  }
}
