import { Component, computed, signal, viewChild } from '@angular/core';
import { ButtonComponent, CommandPaletteComponent, CommandPaletteItem } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import {
  COMMAND_PALETTE_SHOWCASE_CONFIG,
  type CommandPaletteDataset,
  buildCommandPaletteItems,
} from './command-palette.showcase.config';

@Component({
  selector: 'app-command-palette-interactive',
  imports: [ButtonComponent, CommandPaletteComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview class="showcase__preview">
        <div class="showcase__button-row">
          <ui-button variant="primary" (click)="openPalette()">Open Command Palette</ui-button>
        </div>

        <ui-command-palette
          [(visible)]="visible"
          [items]="items()"
          [placeholder]="currentPlaceholder()"
          [emptyText]="currentEmptyText()"
          [maxResults]="currentMaxResults()"
          (commandExecuted)="onCommandExecuted($event)"
          (closed)="onPaletteClosed()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class CommandPaletteInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = COMMAND_PALETTE_SHOWCASE_CONFIG;

  visible = signal(false);

  private values = signal<Record<string, unknown>>({
    dataset: 'basic',
    placeholder: 'Type a command or search...',
    emptyText: 'No commands found',
    maxResults: 8,
    includeDisabled: false,
  });

  currentDataset = computed(() => this.values()['dataset'] as CommandPaletteDataset);
  currentPlaceholder = computed(
    () => (this.values()['placeholder'] as string) ?? 'Type a command or search...',
  );
  currentEmptyText = computed(() => (this.values()['emptyText'] as string) ?? 'No commands found');
  currentMaxResults = computed(() => Number(this.values()['maxResults']) || 8);
  currentIncludeDisabled = computed(() => !!this.values()['includeDisabled']);

  items = computed(() =>
    buildCommandPaletteItems(this.currentDataset(), this.currentIncludeDisabled(), item => {
      this.showcase()?.logEvent('action', { id: item.id, label: item.label });
    }),
  );

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.visible.set(false);
  }

  openPalette(): void {
    this.visible.set(true);
    this.showcase()?.logEvent('open');
  }

  onCommandExecuted(item: CommandPaletteItem): void {
    this.showcase()?.logEvent('commandExecuted', { id: item.id, label: item.label });
  }

  onPaletteClosed(): void {
    this.showcase()?.logEvent('closed');
  }
}
