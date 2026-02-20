import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ALL_ICON_NAMES,
  IconComponent,
  IconName,
  SearchComponent,
  Size,
  TableOfContentComponent,
  ToastContainerComponent,
  ToastService,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { ICON_DRAWER_CONFIGS, ICON_VARIANTS } from './icon.showcase.config';
import { IconInteractiveComponent } from './icon.interactive';

const ICON_BROWSER_BATCH_SIZE = 96;

@Component({
  selector: 'app-icon-showcase',
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    SearchComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    IconInteractiveComponent,
    ToastContainerComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />

      <div class="showcase-content">
        <app-showcase-header title="Icon" />
        <p class="showcase__description">
          The Icon component renders Fluent SVG symbols from a sprite with automatic fallback across
          size and variant. It supports preset sizes (<code>small</code>, <code>medium</code>,
          <code>large</code>), optional <code>sizePx</code> override, accessibility labels, and
          auto-direction for RTL locales.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Matrix of common icons across every size and variant combination. Use the drawer to toggle labels for easier scanning."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (column of overviewColumns; track column.variant + column.size) {
                <div
                  class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header showcase__icons-matrix__cell--header-multi"
                >
                  <span>{{ column.variant | titlecase }}</span>
                  <span>{{ column.size | titlecase }}</span>
                </div>
              }
            </div>
            @for (iconName of overviewIcons; track iconName) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ iconName }}
                </div>
                @for (column of overviewColumns; track column.variant + column.size) {
                  <div class="showcase__icons-matrix__cell">
                    <div class="showcase__icon-showcase__icon-wrapper">
                      <ui-icon
                        [icon]="iconName"
                        [size]="column.size"
                        [variant]="column.variant"
                        [direction]="testDirection()"
                        [locale]="testLocale()"
                      />
                    </div>
                    @if (overviewForm().showLabels) {
                      <div class="showcase__icon-showcase__name">{{ iconName }}</div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Compare small, medium, and large icon sizes for a single icon and variant."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__icon-showcase__item">
                <div class="showcase__icon-showcase__icon-wrapper">
                  <ui-icon
                    [icon]="sizeForm().icon"
                    [size]="size"
                    [variant]="sizeForm().variant"
                    [direction]="testDirection()"
                    [locale]="testLocale()"
                  />
                </div>
                @if (sizeForm().showLabels) {
                  <div class="showcase__icon-showcase__name">{{ size | titlecase }}</div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variant"
          sectionDescription="Compare regular and filled variants for the selected icon and size."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of iconVariants; track variant) {
              <div class="showcase__icon-showcase__item">
                <div class="showcase__icon-showcase__icon-wrapper">
                  <ui-icon
                    [icon]="variantForm().icon"
                    [size]="variantForm().size"
                    [variant]="variant"
                    [direction]="testDirection()"
                    [locale]="testLocale()"
                  />
                </div>
                @if (variantForm().showLabels) {
                  <div class="showcase__icon-showcase__name">{{ variant | titlecase }}</div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Icon Browser"
          sectionDescription="Search through all available sprite icons. Click any icon to copy its name. Use the drawer to change preview size and variant for the browser grid."
          [formConfig]="browserDrawerFormConfig"
          [formValues]="browserFormValues()"
          (formValuesChange)="browserFormValues.set($event)"
        >
          <div class="showcase__icon-showcase__search">
            <ui-search
              placeholder="Search icons..."
              [(ngModel)]="searchQueryValue"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>

          <div class="showcase__icon-showcase__results">
            <p>
              Showing <strong>{{ visibleIcons().length }}</strong>
              <span> of {{ filteredIcons().length }} matching icons</span>
              @if (filteredIcons().length < browserIconNames.length) {
                <span> of {{ browserIconNames.length }} available icons</span>
              }
            </p>
          </div>

          <div class="showcase__icon-showcase__viewport">
            @if (filteredIcons().length > 0) {
              <div
                class="showcase__icon-showcase__grid"
                #scrollContainer
                (scroll)="onIconGridScroll($event)"
              >
                @for (iconName of visibleIcons(); track iconName) {
                  <button
                    type="button"
                    class="showcase__icon-showcase__item"
                    [title]="iconName"
                    (click)="copyIconName(iconName)"
                  >
                    <div class="showcase__icon-showcase__icon-wrapper">
                      <ui-icon
                        [icon]="iconName"
                        [size]="browserForm().size"
                        [variant]="browserForm().variant"
                        [direction]="testDirection()"
                        [locale]="testLocale()"
                      />
                    </div>
                    <div class="showcase__icon-showcase__name">{{ iconName }}</div>
                  </button>
                }
              </div>
            } @else {
              <div class="showcase__icon-showcase__empty">
                <p>No icons found matching "{{ searchQueryValue }}"</p>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section id="how-it-works" class="showcase__section">
          <h2 class="showcase__section__title">How It Works</h2>
          <p class="showcase__section__description">
            <code>ui-icon</code> resolves a best-match symbol in this order: locale-specific symbol,
            directional icon variant from the main icon set (<code>_ltr</code>/<code>_rtl</code>),
            then base icon symbol. It tries requested size/variant first and then fallback
            combinations. Direction can be forced via <code>[direction]</code>, locale can be
            overridden via <code>[locale]</code>. Icons are rendered only from sprite symbols.
          </p>
          <ul class="showcase__list">
            <li><code>icon</code>: icon name from Fluent set (required for rendering)</li>
            <li><code>size</code>: <code>small | medium | large</code> (maps to 16/20/24)</li>
            <li><code>sizePx</code>: custom pixel size override</li>
            <li><code>variant</code>: <code>regular | filled</code></li>
            <li><code>direction</code>: <code>ltr | rtl</code> forced direction override</li>
            <li><code>locale</code>: locale override for locale-specific symbols</li>
            <li><code>ariaLabel</code>: enables semantic icon mode (<code>role="img"</code>)</li>
          </ul>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with icon inputs in real time. Set icon name, size, variant, and optional
            pixel override.
          </p>
          <app-icon-interactive />
        </section>
      </div>
    </div>
    <ui-toast-container position="top-right"></ui-toast-container>
  `,
})
export class IconShowcaseComponent {
  readonly ALL_ICON_NAMES = ALL_ICON_NAMES as IconName[];
  readonly browserIconNames = this.ALL_ICON_NAMES;
  readonly localeQuickPick = ['ar', 'en', 'en-US', 'sr-Cyrl', 'sr-Latn', 'zh'];

  private toastService = inject(ToastService);
  private searchQuery = signal('');
  private visibleIconsCount = signal(ICON_BROWSER_BATCH_SIZE);
  private testDirectionState = signal<'auto' | 'ltr' | 'rtl'>('auto');
  private testLocaleState = signal('');

  sizes = SIZES;
  iconVariants = ICON_VARIANTS;

  overviewIcons: IconName[] = ['home', 'search', 'settings', 'info', 'checkmark', 'delete'];
  overviewColumns: Array<{ size: Size; variant: (typeof ICON_VARIANTS)[number] }> =
    ICON_VARIANTS.flatMap(variant => SIZES.map(size => ({ size, variant })));

  overviewDrawerFormConfig = ICON_DRAWER_CONFIGS.overview;
  sizeDrawerFormConfig = ICON_DRAWER_CONFIGS.size;
  variantDrawerFormConfig = ICON_DRAWER_CONFIGS.variant;
  browserDrawerFormConfig = ICON_DRAWER_CONFIGS.browser;

  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  get searchQueryValue(): string {
    return this.searchQuery();
  }
  set searchQueryValue(value: string) {
    this.searchQuery.set(value);
  }

  get testDirectionValue(): 'auto' | 'ltr' | 'rtl' {
    return this.testDirectionState();
  }
  set testDirectionValue(value: string) {
    if (value === 'ltr' || value === 'rtl') {
      this.testDirectionState.set(value);
      return;
    }
    this.testDirectionState.set('auto');
  }

  get testLocaleValue(): string {
    return this.testLocaleState();
  }
  set testLocaleValue(value: string) {
    this.testLocaleState.set(value ?? '');
  }

  testDirection = computed<'ltr' | 'rtl' | undefined>(() => {
    const value = this.testDirectionState();
    return value === 'auto' ? undefined : value;
  });

  testLocale = computed<string | undefined>(() => {
    const trimmed = this.testLocaleState().trim();
    return trimmed || undefined;
  });

  overviewFormValues = signal<Record<string, unknown>>({
    showLabels: true,
  });

  overviewForm = computed(() => {
    const values = this.overviewFormValues();
    return {
      showLabels: !!values['showLabels'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    sampleIcon: 'home',
    variant: 'regular',
    showLabels: true,
  });

  sizeForm = computed(() => {
    const values = this.sizeFormValues();
    return {
      icon: (values['sampleIcon'] as IconName) || ('home' as IconName),
      variant: values['variant'] as (typeof ICON_VARIANTS)[number],
      showLabels: !!values['showLabels'],
    };
  });

  variantFormValues = signal<Record<string, unknown>>({
    sampleIcon: 'home',
    size: 'medium',
    showLabels: true,
  });

  variantForm = computed(() => {
    const values = this.variantFormValues();
    return {
      icon: (values['sampleIcon'] as IconName) || ('home' as IconName),
      size: values['size'] as Size,
      showLabels: !!values['showLabels'],
    };
  });

  browserFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    variant: 'regular',
  });

  browserForm = computed(() => {
    const values = this.browserFormValues();
    return {
      size: values['size'] as Size,
      variant: values['variant'] as (typeof ICON_VARIANTS)[number],
    };
  });

  filteredIcons = computed<IconName[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.browserIconNames;
    }
    return this.browserIconNames.filter(iconName =>
      iconName.toLowerCase().includes(query),
    ) as IconName[];
  });

  visibleIcons = computed<IconName[]>(() =>
    this.filteredIcons().slice(0, this.visibleIconsCount()),
  );

  hasMoreVisibleIcons = computed<boolean>(
    () => this.visibleIcons().length < this.filteredIcons().length,
  );

  constructor() {
    effect(() => {
      this.searchQuery();
      this.visibleIconsCount.set(ICON_BROWSER_BATCH_SIZE);

      queueMicrotask(() => {
        const container = this.scrollContainer()?.nativeElement;
        if (container) {
          container.scrollTop = 0;
        }
      });
    });
  }

  loadMoreVisibleIcons(): void {
    this.visibleIconsCount.update(count => count + ICON_BROWSER_BATCH_SIZE);
  }

  onIconGridScroll(event: Event): void {
    const container = event.target as HTMLDivElement | null;
    if (!container || !this.hasMoreVisibleIcons()) {
      return;
    }

    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceToBottom <= 320) {
      this.loadMoreVisibleIcons();
    }
  }

  copyIconName(iconName: IconName): void {
    navigator.clipboard
      .writeText(iconName)
      .then(() => {
        this.toastService.success('Copied!', `Icon name "${iconName}" copied to clipboard`, {
          duration: 3000,
        });
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = iconName;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          this.toastService.success('Copied!', `Icon name "${iconName}" copied to clipboard`, {
            duration: 3000,
          });
        } catch {
          this.toastService.error('Failed to copy', 'Unable to copy icon name to clipboard');
        } finally {
          document.body.removeChild(textArea);
        }
      });
  }
}
