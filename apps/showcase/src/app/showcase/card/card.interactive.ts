import { Component, computed, signal, viewChild } from '@angular/core';
import {
  AvatarComponent,
  ButtonComponent,
  CardAppearance,
  CardComponent,
  CardFocusMode,
  CardOnSelectionChangeEvent,
  Orientation,
  Size,
} from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { CARD_SHOWCASE_CONFIG } from './card.showcase.config';

@Component({
  selector: 'app-card-interactive',
  imports: [CardComponent, AvatarComponent, ButtonComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-card
          [appearance]="currentAppearance()"
          [orientation]="currentOrientation()"
          [focusMode]="currentFocusMode()"
          [interactive]="currentInteractive()"
          [selectable]="currentSelectable()"
          [checkbox]="currentCheckbox()"
          [disabled]="currentDisabled()"
          [selected]="selectedModel()"
          ariaLabel="Interactive card preview"
          (selectedChange)="selectedModel.set($event)"
          (cardClick)="onCardClick()"
          (selectionChange)="onSelectionChange($event)"
        >
          <div uiCardHeader class="card-interactive__header">
            <ui-avatar name="Jane Doe" size="small" />
            <div class="card-interactive__header-text">
              <strong>Product sync meeting</strong>
              <span>Today, 14:00 - 14:30</span>
            </div>
          </div>

          <p uiCardBody class="card-interactive__body">
            Agenda: review launch blockers, confirm owners, and align release timeline.
          </p>

          <div uiCardFooter class="card-interactive__footer">
            <ui-button variant="primary" appearance="filled" size="small">Join</ui-button>
            <ui-button variant="secondary" appearance="outline" size="small">Details</ui-button>
          </div>
        </ui-card>
      </div>
    </app-interactive-showcase>
  `,
  styles: [
    `
      .card-interactive__header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .card-interactive__header-text {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .card-interactive__header-text strong {
        font-size: 14px;
        line-height: 20px;
      }

      .card-interactive__header-text span {
        font-size: 12px;
        line-height: 16px;
        color: var(--color-neutral-foreground3-rest);
      }

      .card-interactive__body {
        margin: 0;
      }

      .card-interactive__footer {
        display: flex;
        gap: 8px;
      }
    `,
  ],
})
export class CardInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = CARD_SHOWCASE_CONFIG;

  selectedModel = signal(false);

  private values = signal<Record<string, unknown>>({
    appearance: 'filled',
    size: 'medium',
    orientation: 'vertical',
    focusMode: 'off',
    interactive: true,
    selectable: false,
    checkbox: false,
    disabled: false,
  });

  currentAppearance = computed(() => this.values()['appearance'] as CardAppearance);
  currentSize = computed(() => this.values()['size'] as Size);
  currentOrientation = computed(() => this.values()['orientation'] as Orientation);
  currentFocusMode = computed(() => this.values()['focusMode'] as CardFocusMode);
  currentInteractive = computed(() => this.values()['interactive'] as boolean);
  currentSelectable = computed(() => this.values()['selectable'] as boolean);
  currentCheckbox = computed(() => this.values()['checkbox'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.selectedModel.set(false);
  }

  onCardClick(): void {
    this.showcase()?.logEvent('cardClick');
  }

  onSelectionChange(event: CardOnSelectionChangeEvent): void {
    this.showcase()?.logEvent('selectionChange', { selected: event.data.selected });
  }
}
