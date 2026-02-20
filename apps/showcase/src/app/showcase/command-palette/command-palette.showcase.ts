import { Component, computed, signal } from '@angular/core';
import {
  ButtonComponent,
  CommandPaletteComponent,
  CommandPaletteItem,
  KbdComponent,
  TableOfContentComponent,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import {
  buildCommandPaletteItems,
  buildUngroupedItems,
  COMMAND_PALETTE_DATASET_OPTIONS,
  COMMAND_PALETTE_DRAWER_CONFIGS,
  EMPTY_TEXT_PRESETS,
  PLACEHOLDER_PRESETS,
  type CommandPaletteDataset,
  type EmptyTextPreset,
  type PlaceholderPreset,
} from './command-palette.showcase.config';
import { CommandPaletteInteractiveComponent } from './command-palette.interactive';

@Component({
  selector: 'app-command-palette-showcase',
  imports: [
    ButtonComponent,
    CommandPaletteComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    KbdComponent,
    CommandPaletteInteractiveComponent,
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
        <app-showcase-header title="Command Palette" />
        <p class="showcase__description">
          The Command Palette provides a searchable action launcher with keyboard navigation,
          grouping, disabled states, and keyword-based matching.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Switch dataset, result limit, and disabled items to preview common command palette scenarios."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__preview">
            <div class="showcase__button-row">
              <ui-button variant="primary" (click)="overviewVisible.set(true)">
                Open {{ overviewForm().datasetLabel }} Palette
              </ui-button>
            </div>

            <ui-command-palette
              [(visible)]="overviewVisible"
              [items]="overviewItems()"
              placeholder="Type a command or search..."
              emptyText="No commands found"
              [maxResults]="overviewForm().maxResults"
              (commandExecuted)="onCommandExecuted('Overview', $event)"
              (closed)="onPaletteClosed('Overview')"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Grouping"
          sectionDescription="Compare grouped commands against the same command list without group headers."
          [formConfig]="groupingDrawerFormConfig"
          [formValues]="groupingFormValues()"
          (formValuesChange)="groupingFormValues.set($event)"
        >
          <div class="showcase__preview">
            <div class="showcase__button-row">
              <ui-button variant="primary" appearance="outline" (click)="groupedVisible.set(true)">
                Open Grouped List
              </ui-button>
              <ui-button variant="secondary" appearance="outline" (click)="flatVisible.set(true)">
                Open Flat List
              </ui-button>
            </div>

            <ui-command-palette
              [(visible)]="groupedVisible"
              [items]="groupedItems()"
              placeholder="Search grouped commands..."
              emptyText="No commands found"
              [maxResults]="groupingForm().maxResults"
              (commandExecuted)="onCommandExecuted('Grouping', $event)"
              (closed)="onPaletteClosed('Grouping')"
            />

            <ui-command-palette
              [(visible)]="flatVisible"
              [items]="flatItems()"
              placeholder="Search flat commands..."
              emptyText="No commands found"
              [maxResults]="groupingForm().maxResults"
              (commandExecuted)="onCommandExecuted('Flat', $event)"
              (closed)="onPaletteClosed('Flat')"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Options"
          sectionDescription="Adjust placeholder text, empty state text, result limit, and disabled commands."
          [formConfig]="optionsDrawerFormConfig"
          [formValues]="optionsFormValues()"
          (formValuesChange)="optionsFormValues.set($event)"
        >
          <div class="showcase__preview">
            <div class="showcase__button-row">
              <ui-button variant="primary" (click)="optionsVisible.set(true)">
                Open Configured Palette
              </ui-button>
            </div>

            <ui-command-palette
              [(visible)]="optionsVisible"
              [items]="optionsItems()"
              [placeholder]="optionsForm().placeholder"
              [emptyText]="optionsForm().emptyText"
              [maxResults]="optionsForm().maxResults"
              (commandExecuted)="onCommandExecuted('Options', $event)"
              (closed)="onPaletteClosed('Options')"
            />
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Keyboard Navigation</h2>
          <p class="showcase__section__description">
            The command palette supports full keyboard navigation for command discovery and
            execution.
          </p>
          <div class="showcase__shortcuts">
            <div class="showcase__shortcut-row">
              <ui-kbd text="Up" />
              <span>/</span>
              <ui-kbd text="Down" />
              <span>Move selection between command items</span>
            </div>
            <div class="showcase__shortcut-row">
              <ui-kbd text="Enter" />
              <span>Execute the currently selected command</span>
            </div>
            <div class="showcase__shortcut-row">
              <ui-kbd text="Esc" />
              <span>Close the command palette</span>
            </div>
          </div>
          @if (lastEvent()) {
            <p class="showcase__feedback"><strong>Last event:</strong> {{ lastEvent() }}</p>
          }
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Try all command palette options in real time and inspect emitted events.
          </p>
          <app-command-palette-interactive />
        </section>
      </div>
    </div>
  `,
})
export class CommandPaletteShowcaseComponent {
  overviewVisible = signal(false);
  groupedVisible = signal(false);
  flatVisible = signal(false);
  optionsVisible = signal(false);

  lastEvent = signal('');

  overviewDrawerFormConfig = COMMAND_PALETTE_DRAWER_CONFIGS.overview;
  groupingDrawerFormConfig = COMMAND_PALETTE_DRAWER_CONFIGS.grouping;
  optionsDrawerFormConfig = COMMAND_PALETTE_DRAWER_CONFIGS.options;

  overviewFormValues = signal<Record<string, unknown>>({
    dataset: 'basic',
    maxResults: 8,
    includeDisabled: false,
  });

  groupingFormValues = signal<Record<string, unknown>>({
    maxResults: 8,
    includeDisabled: false,
  });

  optionsFormValues = signal<Record<string, unknown>>({
    maxResults: 8,
    includeDisabled: false,
    placeholderPreset: 'actions',
    emptyTextPreset: 'noMatches',
  });

  overviewForm = computed(() => {
    const values = this.overviewFormValues();
    const dataset = (values['dataset'] as CommandPaletteDataset) || 'basic';
    return {
      dataset,
      datasetLabel:
        COMMAND_PALETTE_DATASET_OPTIONS.find(o => o.value === dataset)?.label || 'Basic',
      maxResults: Number(values['maxResults']) || 8,
      includeDisabled: !!values['includeDisabled'],
    };
  });

  groupingForm = computed(() => {
    const values = this.groupingFormValues();
    return {
      maxResults: Number(values['maxResults']) || 8,
      includeDisabled: !!values['includeDisabled'],
    };
  });

  optionsForm = computed(() => {
    const values = this.optionsFormValues();
    const placeholderPreset = (values['placeholderPreset'] as PlaceholderPreset) || 'default';
    const emptyTextPreset = (values['emptyTextPreset'] as EmptyTextPreset) || 'default';

    return {
      maxResults: Number(values['maxResults']) || 8,
      includeDisabled: !!values['includeDisabled'],
      placeholder: PLACEHOLDER_PRESETS[placeholderPreset],
      emptyText: EMPTY_TEXT_PRESETS[emptyTextPreset],
    };
  });

  overviewItems = computed(() =>
    buildCommandPaletteItems(
      this.overviewForm().dataset,
      this.overviewForm().includeDisabled,
      item => {
        this.lastEvent.set(`Action: ${item.label}`);
      },
    ),
  );

  groupedItems = computed(() =>
    buildCommandPaletteItems('grouped', this.groupingForm().includeDisabled, item => {
      this.lastEvent.set(`Action: ${item.label}`);
    }),
  );

  flatItems = computed(() =>
    buildUngroupedItems(this.groupingForm().includeDisabled, item => {
      this.lastEvent.set(`Action: ${item.label}`);
    }),
  );

  optionsItems = computed(() =>
    buildCommandPaletteItems('custom', this.optionsForm().includeDisabled, item => {
      this.lastEvent.set(`Action: ${item.label}`);
    }),
  );

  onCommandExecuted(section: string, command: CommandPaletteItem): void {
    this.lastEvent.set(`${section}: executed "${command.label}"`);
  }

  onPaletteClosed(section: string): void {
    this.lastEvent.set(`${section}: palette closed`);
  }
}
