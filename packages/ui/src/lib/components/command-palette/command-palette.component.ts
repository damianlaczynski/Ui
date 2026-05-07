import {
  Component,
  input,
  output,
  model,
  HostListener,
  computed,
  signal,
  effect,
  inject,
} from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../field/search';
import { EmptyStateComponent } from '../empty-state';
import { IconComponent, IconName } from '../icon';
import { UiI18nService } from '../../i18n';

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  keywords?: string[];
  action: () => void;
  disabled?: boolean;
  group?: string;
}

export interface CommandPaletteGroup {
  id: string;
  label: string;
  items: CommandPaletteItem[];
}

@Component({
  selector: 'ui-command-palette',
  templateUrl: './command-palette.component.html',
  imports: [A11yModule, FormsModule, SearchComponent, EmptyStateComponent, IconComponent],
})
export class CommandPaletteComponent {
  private static readonly CLOSE_FALLBACK_MS = 320;
  private static readonly BACKDROP_EXIT = 'fadeOut';
  private static readonly CONTENT_EXIT = new Set(['scaleOut']);

  private readonly i18n = inject(UiI18nService);
  private readonly rendered = signal(false);
  readonly isClosing = signal(false);
  private closeFallbackTimer: ReturnType<typeof setTimeout> | null = null;

  visible = model<boolean>(false);
  items = input<CommandPaletteItem[]>([]);
  placeholder = input<string>('');
  emptyText = input<string>('');
  emptyDescription = input<string>('');
  maxResults = input<number>(10);

  // Outputs
  commandExecuted = output<CommandPaletteItem>();
  closed = output<void>();

  // Internal state
  _searchQuery = signal<string>('');
  private _selectedIndex = signal<number>(0);

  // Computed filtered and grouped results
  filteredItems = computed<CommandPaletteItem[]>(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const allItems = this.items();

    if (!query) {
      return allItems.slice(0, this.maxResults());
    }

    const scored = allItems.map(item => {
      const label = item.label.toLowerCase();
      const description = item.description?.toLowerCase() || '';
      const keywords = item.keywords?.join(' ').toLowerCase() || '';
      const searchableText = `${label} ${description} ${keywords}`;

      // Calculate relevance score
      let score = 0;
      const queryWords = query.split(' ');

      for (const word of queryWords) {
        if (label.startsWith(word)) {
          score += 10; // Exact prefix match
        } else if (label.includes(word)) {
          score += 5; // Contains in label
        } else if (description.includes(word)) {
          score += 3; // Contains in description
        } else if (keywords.includes(word)) {
          score += 2; // Contains in keywords
        } else if (searchableText.includes(word)) {
          score += 1; // Fuzzy match
        }
      }

      return { item, score };
    });

    return scored
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.maxResults())
      .map(result => result.item);
  });

  groupedItems = computed<CommandPaletteGroup[]>(() => {
    const filtered = this.filteredItems();
    const groups: { [key: string]: CommandPaletteItem[] } = {};

    // Group items by group property or 'default'
    filtered.forEach(item => {
      const groupId = item.group || 'default';
      if (!groups[groupId]) {
        groups[groupId] = [];
      }
      groups[groupId].push(item);
    });

    // Convert to array format
    return Object.entries(groups).map(([groupId, items]) => ({
      id: groupId,
      label: groupId === 'default' ? '' : groupId,
      items,
    }));
  });

  shouldRender = computed(() => this.rendered());

  backdropClasses = computed(() =>
    [
      'command-palette__backdrop',
      this.isClosing() ? 'command-palette__backdrop--closing' : '',
    ].join(' '),
  );

  frameClasses = computed(() =>
    ['command-palette__frame', this.isClosing() ? 'command-palette__frame--closing' : ''].join(' '),
  );

  surfaceClasses = computed(() => 'command-palette__surface');

  constructor() {
    effect(() => {
      this.filteredItems();
      this.setFirstSelectableIndex();
    });

    effect(() => {
      const visible = this.visible();
      if (visible) {
        this.clearCloseFallback();
        this.isClosing.set(false);
        this.rendered.set(true);
        return;
      }

      if (!this.rendered() || this.isClosing()) {
        return;
      }

      this.isClosing.set(true);
      if (this.prefersReducedMotion()) {
        this.finalizeClose();
        return;
      }

      this.closeFallbackTimer = setTimeout(() => {
        this.finalizeClose();
      }, CommandPaletteComponent.CLOSE_FALLBACK_MS);
    });
  }

  // Keyboard navigation
  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent): void {
    if (!this.visible() || this.isClosing()) return;
    event.preventDefault();
    this.moveSelection(1);
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent): void {
    if (!this.visible() || this.isClosing()) return;
    event.preventDefault();
    this.moveSelection(-1);
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (!this.visible() || this.isClosing()) return;
    event.preventDefault();
    this.executeSelectedCommand();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (!this.visible() || this.isClosing()) return;
    event.preventDefault();
    this.close();
  }

  // Methods
  open(): void {
    if (!this.visible()) {
      this.visible.set(true);
      this._searchQuery.set('');
      this.setFirstSelectableIndex();
    }
  }

  close(): void {
    if (!this.visible()) {
      return;
    }
    this.visible.set(false);
    this.closed.emit();
  }

  onBackdropMouseDown(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onBackdropAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing()) {
      return;
    }
    if (event.animationName !== CommandPaletteComponent.BACKDROP_EXIT) {
      return;
    }
    this.finalizeClose();
  }

  onSurfaceAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || !this.isClosing()) {
      return;
    }
    if (!CommandPaletteComponent.CONTENT_EXIT.has(event.animationName)) {
      return;
    }
    this.finalizeClose();
  }

  onSearchChange(query: string): void {
    this._searchQuery.set(query);
    this.setFirstSelectableIndex();
  }

  onItemClick(item: CommandPaletteItem): void {
    if (item.disabled) return;
    this.executeCommand(item);
  }

  onItemFocus(item: CommandPaletteItem): void {
    if (item.disabled) {
      return;
    }
    const idx = this.filteredItems().findIndex(i => i.id === item.id);
    if (idx >= 0) {
      this._selectedIndex.set(idx);
    }
  }

  private executeSelectedCommand(): void {
    const items = this.filteredItems();
    const selectedItem = items[this._selectedIndex()];
    if (selectedItem && !selectedItem.disabled) {
      this.executeCommand(selectedItem);
    }
  }

  private executeCommand(item: CommandPaletteItem): void {
    item.action();
    this.commandExecuted.emit(item);
    this.close();
  }

  isItemSelected(item: CommandPaletteItem): boolean {
    const items = this.filteredItems();
    return items[this._selectedIndex()] === item;
  }

  selectedItemId(): string | null {
    const selectedItem = this.filteredItems()[this._selectedIndex()];
    return selectedItem ? this.itemId(selectedItem) : null;
  }

  itemId(item: CommandPaletteItem): string {
    return `command-palette-item-${this.toDomToken(item.id)}`;
  }

  groupHeaderId(group: CommandPaletteGroup): string {
    return `command-palette-group-${this.toDomToken(group.id)}`;
  }

  trackByItemId(_index: number, item: CommandPaletteItem): string {
    return item.id;
  }

  trackByGroupId(_index: number, group: CommandPaletteGroup): string {
    return group.id;
  }

  private setFirstSelectableIndex(): void {
    const firstSelectableIndex = this.filteredItems().findIndex(item => !item.disabled);
    this._selectedIndex.set(firstSelectableIndex >= 0 ? firstSelectableIndex : 0);
  }

  private moveSelection(direction: 1 | -1): void {
    const enabledIndices = this.filteredItems()
      .map((item, index) => (!item.disabled ? index : -1))
      .filter(index => index >= 0);

    if (enabledIndices.length === 0) {
      this._selectedIndex.set(0);
      return;
    }

    const currentIndex = this._selectedIndex();

    if (direction > 0) {
      const nextIndex = enabledIndices.find(index => index > currentIndex);
      this._selectedIndex.set(nextIndex ?? enabledIndices[0]);
    } else {
      const previousIndex = [...enabledIndices].reverse().find(index => index < currentIndex);
      this._selectedIndex.set(previousIndex ?? enabledIndices[enabledIndices.length - 1]);
    }

    this.syncFocusToSelectedAfterArrow();
  }

  private syncFocusToSelectedAfterArrow(): void {
    if (!this.visible() || this.isClosing() || typeof document === 'undefined') {
      return;
    }
    const active = document.activeElement;
    if (!active?.closest('.command-palette__body')) {
      return;
    }
    const id = this.selectedItemId();
    if (!id) {
      return;
    }
    queueMicrotask(() => {
      if (!this.visible() || this.isClosing()) {
        return;
      }
      document.getElementById(id)?.focus({ preventScroll: true });
    });
  }

  private toDomToken(value: string): string {
    return value.replace(/[^a-zA-Z0-9-_]/g, '-');
  }

  getPlaceholderText(): string {
    return (
      this.placeholder().trim() ||
      this.i18n.t('commandPalette.placeholder', 'Type a command or search...')
    );
  }

  getEmptyText(): string {
    return this.emptyText().trim() || this.i18n.t('commandPalette.emptyText', 'No commands found');
  }

  getEmptyDescription(): string {
    return (
      this.emptyDescription().trim() ||
      this.i18n.t(
        'commandPalette.emptyDescription',
        'Try a different search term or adjust your filters.',
      )
    );
  }

  getDialogAriaLabel(): string {
    return this.i18n.t('commandPalette.dialogAriaLabel', 'Command palette');
  }

  getResultsAriaLabel(): string {
    return this.i18n.t('commandPalette.resultsAriaLabel', 'Command results');
  }

  private prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private clearCloseFallback(): void {
    if (this.closeFallbackTimer) {
      clearTimeout(this.closeFallbackTimer);
      this.closeFallbackTimer = null;
    }
  }

  private finalizeClose(): void {
    this.clearCloseFallback();
    if (!this.rendered()) {
      return;
    }
    this.isClosing.set(false);
    this.rendered.set(false);
  }
}
