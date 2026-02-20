import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  DividerComponent,
  DropdownComponent,
  TableOfContentComponent,
  TextComponent,
  ToolbarComponent,
  type DropdownItem,
  type MenuItem,
  type Size,
  type ToolbarGroup,
  type ToolbarItem,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { ToolbarInteractiveComponent } from './toolbar.interactive';
import { TOOLBAR_DRAWER_CONFIGS } from './toolbar.showcase.config';

type Orientation = 'horizontal' | 'vertical';

interface ToolbarSectionForm {
  size: Size;
  orientation: Orientation;
  useGroups: boolean;
  withLabels: boolean;
  disabled: boolean;
  selected: boolean;
  overflow: boolean;
}

@Component({
  selector: 'app-toolbar-showcase',
  imports: [
    CommonModule,
    ToolbarComponent,
    DropdownComponent,
    TextComponent,
    DividerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    ToolbarInteractiveComponent,
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
        <app-showcase-header title="Toolbar" />
        <p class="showcase__description">
          Toolbar organizes action buttons into a compact row or column. It supports sizing,
          orientation, grouping, split items, selected states, and composition with other controls.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Core toolbar setup with orientation, size, labels, grouped rendering, overflow mode, and item states."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <ui-toolbar
            [items]="overviewForm().useGroups ? [] : overviewItems()"
            [groups]="overviewForm().useGroups ? overviewGroups() : []"
            [size]="overviewForm().size"
            [orientation]="overviewForm().orientation"
            [overflow]="overviewForm().overflow"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Label Buttons"
          sectionDescription="Show icon+label buttons for explicit actions. Disable and selected flags can be toggled to validate behavior consistency."
          [formConfig]="labelsDrawerFormConfig"
          [formValues]="labelsFormValues()"
          (formValuesChange)="labelsFormValues.set($event)"
        >
          <ui-toolbar
            [items]="labeledItems()"
            [size]="labelsForm().size"
            [orientation]="labelsForm().orientation"
            [overflow]="labelsForm().overflow"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Grouped Toolbar"
          sectionDescription="Groups split actions into logical clusters and inject dividers automatically between groups."
          [formConfig]="groupedDrawerFormConfig"
          [formValues]="groupedFormValues()"
          (formValuesChange)="groupedFormValues.set($event)"
        >
          <ui-toolbar
            [groups]="groupedItems()"
            [size]="groupedForm().size"
            [orientation]="groupedForm().orientation"
            [overflow]="groupedForm().overflow"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Compare normal, selected, and disabled variants with the same layout settings to validate state rendering."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__preview showcase__preview--column">
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Normal</h3>
              <ui-toolbar
                [items]="stateItems('normal')"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Selected</h3>
              <ui-toolbar
                [items]="stateItems('selected')"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__item__title">Disabled</h3>
              <ui-toolbar
                [items]="stateItems('disabled')"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Composition"
          sectionDescription="Toolbar can be composed with dropdowns and text inputs to build editor-like action rows."
          [formConfig]="compositionDrawerFormConfig"
          [formValues]="compositionFormValues()"
          (formValuesChange)="compositionFormValues.set($event)"
        >
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <ui-toolbar
              [items]="compositionItems()"
              [size]="compositionForm().size"
              [orientation]="compositionForm().orientation"
              [overflow]="compositionForm().overflow"
            />
            <ui-divider orientation="vertical" />
            <ui-dropdown
              [items]="fontSizeItems"
              [placeholder]="'Font Size'"
              [size]="compositionForm().size"
              style="width: 120px;"
            />
            <ui-dropdown
              [items]="fontFamilyItems"
              [placeholder]="'Font'"
              [size]="compositionForm().size"
              style="width: 150px;"
            />
            <ui-text
              [placeholder]="'Find...'"
              [size]="compositionForm().size"
              style="width: 160px;"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="All Item Types"
          sectionDescription="Toolbar supports button, divider, toggle, split, and custom item types in one sequence."
          [formConfig]="itemTypesDrawerFormConfig"
          [formValues]="itemTypesFormValues()"
          (formValuesChange)="itemTypesFormValues.set($event)"
        >
          <ui-toolbar
            [items]="allTypesItems()"
            [size]="itemTypesForm().size"
            [orientation]="itemTypesForm().orientation"
            [overflow]="itemTypesForm().overflow"
          />
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test toolbar options live. Change layout, labels, grouped rendering, and states while
            inspecting emitted click events.
          </p>
          <app-toolbar-interactive />
        </section>
      </div>
    </div>
  `,
})
export class ToolbarShowcaseComponent {
  overviewDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.overview;
  labelsDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.labels;
  groupedDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.grouped;
  statesDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.states;
  compositionDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.composition;
  itemTypesDrawerFormConfig = TOOLBAR_DRAWER_CONFIGS.itemTypes;

  fontSizeItems: DropdownItem[] = [
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '24', label: '24' },
  ];

  fontFamilyItems: DropdownItem[] = [
    { value: 'arial', label: 'Arial' },
    { value: 'calibri', label: 'Calibri' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'verdana', label: 'Verdana' },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    useGroups: false,
    withLabels: false,
    disabled: false,
    selected: false,
    overflow: false,
  });

  labelsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    withLabels: true,
    disabled: false,
    selected: false,
    overflow: false,
  });

  groupedFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    withLabels: false,
    disabled: false,
    selected: false,
    overflow: false,
  });

  statesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    disabled: false,
    selected: false,
  });

  compositionFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    withLabels: false,
    disabled: false,
    overflow: false,
  });

  itemTypesFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'horizontal',
    disabled: false,
    overflow: false,
  });

  overviewForm = computed(() => this.toForm(this.overviewFormValues()));
  labelsForm = computed(() => this.toForm(this.labelsFormValues()));
  groupedForm = computed(() => this.toForm(this.groupedFormValues()));
  statesForm = computed(() => this.toForm(this.statesFormValues()));
  compositionForm = computed(() => this.toForm(this.compositionFormValues()));
  itemTypesForm = computed(() => this.toForm(this.itemTypesFormValues()));

  overviewItems = computed(() => this.createItems(this.overviewForm()));

  overviewGroups = computed<ToolbarGroup[]>(() => [
    { id: 'file', items: this.createItems(this.overviewForm(), FILE_ITEMS) },
    { id: 'format', items: this.createItems(this.overviewForm(), FORMAT_ITEMS) },
  ]);

  labeledItems = computed(() => this.createItems(this.labelsForm(), FILE_ITEMS));

  groupedItems = computed<ToolbarGroup[]>(() => [
    { id: 'file', items: this.createItems(this.groupedForm(), FILE_ITEMS) },
    { id: 'edit', items: this.createItems(this.groupedForm(), EDIT_ITEMS) },
    { id: 'format', items: this.createItems(this.groupedForm(), FORMAT_ITEMS) },
  ]);

  compositionItems = computed(() => this.createItems(this.compositionForm(), FORMAT_ITEMS));

  allTypesItems = computed<ToolbarItem[]>(() => {
    const form = this.itemTypesForm();
    return [
      {
        id: 'button-default',
        label: 'Button',
        icon: 'document_add',
        disabled: form.disabled,
        tooltip: 'Default button item',
      },
      { id: 'divider-1', type: 'divider' },
      {
        id: 'toggle-bold',
        type: 'toggle',
        label: 'Toggle',
        icon: 'text_bold',
        selected: form.selected,
        disabled: form.disabled,
        tooltip: 'Toggle item',
      },
      {
        id: 'split-save',
        type: 'split',
        label: 'Save',
        icon: 'save',
        disabled: form.disabled,
        variant: 'primary',
        menuItems: this.getSplitMenuItems('save') as MenuItem[],
      },
      { id: 'divider-2', type: 'divider' },
      { id: 'custom-slot', type: 'custom' },
    ];
  });

  stateItems(mode: 'normal' | 'selected' | 'disabled'): ToolbarItem[] {
    const form = this.statesForm();
    return this.createItems(
      {
        ...form,
        withLabels: true,
        selected: mode === 'selected' ? true : form.selected,
        disabled: mode === 'disabled' ? true : form.disabled,
      },
      FORMAT_ITEMS,
    );
  }

  private toForm(v: Record<string, unknown>): ToolbarSectionForm {
    return {
      size: (v['size'] as Size) ?? 'medium',
      orientation: (v['orientation'] as Orientation) ?? 'horizontal',
      useGroups: !!v['useGroups'],
      withLabels: !!v['withLabels'],
      disabled: !!v['disabled'],
      selected: !!v['selected'],
      overflow: !!v['overflow'],
    };
  }

  private createItems(
    form: ToolbarSectionForm,
    source: Array<{ id: string; label: string; icon: ToolbarItem['icon'] }> = FORMAT_ITEMS,
  ): ToolbarItem[] {
    return source.map((item, index) => ({
      id: item.id,
      label: form.withLabels ? item.label : undefined,
      icon: item.icon,
      tooltip: item.label,
      type: form.selected ? 'toggle' : 'button',
      selected: form.selected ? index === 0 : false,
      disabled: form.disabled ? index % 3 === 2 : false,
    }));
  }

  private getSplitMenuItems(prefix: 'save'): MenuItem[] {
    return [
      { id: `${prefix}-as`, label: 'Save As...' },
      { id: `${prefix}-copy`, label: 'Save a Copy' },
      { id: `${prefix}-all`, label: 'Save All' },
    ];
  }
}

const FILE_ITEMS = [
  { id: 'new', label: 'New', icon: 'document_add' as const },
  { id: 'open', label: 'Open', icon: 'folder_open' as const },
  { id: 'save', label: 'Save', icon: 'save' as const },
  { id: 'print', label: 'Print', icon: 'print' as const },
];

const EDIT_ITEMS = [
  { id: 'undo', label: 'Undo', icon: 'arrow_undo' as const },
  { id: 'redo', label: 'Redo', icon: 'arrow_redo' as const },
  { id: 'cut', label: 'Cut', icon: 'cut' as const },
  { id: 'copy', label: 'Copy', icon: 'copy' as const },
  { id: 'paste', label: 'Paste', icon: 'clipboard_paste' as const },
];

const FORMAT_ITEMS = [
  { id: 'bold', label: 'Bold', icon: 'text_bold' as const },
  { id: 'italic', label: 'Italic', icon: 'text_italic' as const },
  { id: 'underline', label: 'Underline', icon: 'text_underline' as const },
  { id: 'strikethrough', label: 'Strikethrough', icon: 'text_strikethrough' as const },
];
