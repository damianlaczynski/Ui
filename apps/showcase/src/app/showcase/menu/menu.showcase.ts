import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MenuComponent,
  MenuListComponent,
  MenuItem,
  MenuSection,
  TableOfContentComponent,
  Variant,
  Appearance,
  Size,
  Shape,
  IconName,
} from 'ui';
import {
  APPEARANCES,
  SIZES,
  SHAPES,
  VARIANTS,
} from '@shared/utils/showcase/component-options.utils';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { MENU_DRAWER_CONFIGS } from './menu.showcase.config';
import { MenuInteractiveComponent } from './menu.interactive';

@Component({
  selector: 'app-menu-showcase',
  imports: [
    MenuComponent,
    MenuListComponent,
    CommonModule,
    FormsModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    MenuInteractiveComponent,
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
        <app-showcase-header title="Menu" />
        <p class="showcase__description">
          Menu combines a trigger button with a dropdown list. Use triggerVariant="dropdown"
          (trigger with chevron), triggerVariant="split" (primary action + dropdown), or
          triggerVariant="button" (single button without chevron). Supports variant, appearance,
          size, shape, and states. ui-menu-list renders the list for overlay and submenu.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Matrix of menu trigger combinations: variants and appearances. Use Customize to switch text, icon, and toggle disabled and selected across all menus."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-menu
                      triggerVariant="dropdown"
                      [text]="overviewForm().text"
                      [icon]="overviewForm().icon"
                      [menuItems]="overviewMenuItems"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="overviewForm().size"
                      [shape]="overviewForm().shape"
                      [disabled]="overviewForm().disabled"
                      [selected]="overviewForm().selected"
                      (menuItemClick)="onItemClick($event)"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Trigger Variant"
          sectionDescription="dropdown (trigger with chevron), split (primary action + dropdown), or button (single button without chevron). Split shows both a primary action and a dropdown for secondary options."
          [formConfig]="triggerVariantDrawerFormConfig"
          [formValues]="triggerVariantFormValues()"
          (formValuesChange)="triggerVariantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (tv of triggerVariants; track tv) {
              <ui-menu
                [triggerVariant]="tv"
                [text]="triggerVariantForm().text"
                [icon]="triggerVariantForm().icon"
                [menuItems]="triggerVariantMenuItems"
                [variant]="triggerVariantForm().variant"
                [appearance]="triggerVariantForm().appearance"
                [size]="triggerVariantForm().size"
                [shape]="triggerVariantForm().shape"
                [disabled]="triggerVariantForm().disabled"
                [selected]="triggerVariantForm().selected"
                (menuItemClick)="onItemClick($event)"
                (primaryClick)="handleAction(tv + ' primary')"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance & Variant"
          sectionDescription="Appearance controls the fill style (filled, tint, outline, subtle) while variant sets the semantic color. Combine them for different contexts and hierarchy."
          [formConfig]="appearanceVariantDrawerFormConfig"
          [formValues]="appearanceVariantFormValues()"
          (formValuesChange)="appearanceVariantFormValues.set($event)"
        >
          <div class="showcase__icons-matrix">
            <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
              <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"></div>
              @for (variant of variants; track variant) {
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                  {{ variant | titlecase }}
                </div>
              }
            </div>
            @for (appearance of appearances; track appearance) {
              <div class="showcase__icons-matrix__row">
                <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                  {{ appearance | titlecase }}
                </div>
                @for (variant of variants; track variant) {
                  <div class="showcase__icons-matrix__cell">
                    <ui-menu
                      [triggerVariant]="appearanceVariantForm().triggerVariant"
                      [text]="appearanceVariantForm().text"
                      [icon]="appearanceVariantForm().icon"
                      [menuItems]="overviewMenuItems"
                      [variant]="variant"
                      [appearance]="appearance"
                      [size]="appearanceVariantForm().size"
                      [shape]="appearanceVariantForm().shape"
                      [disabled]="appearanceVariantForm().disabled"
                      [selected]="appearanceVariantForm().selected"
                      (menuItemClick)="onItemClick($event)"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three sizes: small, medium (default), and large. Size affects trigger button padding and font, as well as menu list item spacing."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <ui-menu
                [triggerVariant]="sizeForm().triggerVariant"
                [text]="sizeForm().text"
                [icon]="sizeForm().icon"
                [menuItems]="overviewMenuItems"
                [variant]="sizeForm().variant"
                [appearance]="sizeForm().appearance"
                [size]="size"
                [shape]="sizeForm().shape"
                [disabled]="sizeForm().disabled"
                [selected]="sizeForm().selected"
                (menuItemClick)="onItemClick($event)"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal (default), Disabled (trigger grayed out), and Selected (highlighted). Use selected for active menu context."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <ui-menu
                [triggerVariant]="statesForm().triggerVariant"
                [text]="statesForm().text"
                [icon]="statesForm().icon"
                [menuItems]="overviewMenuItems"
                [variant]="statesForm().variant"
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [shape]="statesForm().shape"
                [disabled]="state.disabled"
                [selected]="state.selected"
                (menuItemClick)="onItemClick($event)"
              />
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">ui-menu-list (lista)</h2>
          <p class="showcase__section__description">
            Lista pozycji menu: sekcje File, Edit, View, ikony, skróty, split, submenu.
          </p>
          <div class="showcase__preview">
            <ui-menu-list
              [sections]="editorMenuSections"
              [size]="'medium'"
              [variant]="'primary'"
              [appearance]="'subtle'"
              (itemClick)="onItemClick($event)"
              (submenuClick)="onSubmenuClick($event)"
            />
          </div>
          @if (lastAction) {
            <p class="showcase__section__feedback">
              <strong>Ostatnia akcja:</strong> {{ lastAction }}
            </p>
          }
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Trigger menu i split</h2>
          <p class="showcase__section__description">
            ui-menu z triggerVariant="dropdown" lub triggerVariant="split", text / ikona. CDK
            Overlay – pozycjonowanie i zachowanie przy overflow.
          </p>
          <div class="showcase__preview showcase__preview--integrations">
            <ui-menu
              triggerVariant="dropdown"
              text="File"
              [menuItems]="fileMenuItems"
              [size]="'medium'"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              text="Edit (z submenu)"
              [menuItems]="nestedSubmenuItems"
              icon="edit"
              variant="secondary"
              appearance="subtle"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="split"
              text="Save"
              [menuItems]="saveMenuItems"
              variant="primary"
              (primaryClick)="handleAction('Zapisz')"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="split"
              text="Export"
              [menuItems]="exportMenuItems"
              icon="arrow_download"
              (primaryClick)="handleAction('Export')"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="rowContextMenuItems"
              icon="more_horizontal"
              size="small"
              [ariaLabel]="'Menu'"
              (menuItemClick)="onItemClick($event)"
            />
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="editorMenuItemsFlat"
              icon="more_vertical"
              size="small"
              [ariaLabel]="'Menu'"
              (menuItemClick)="onItemClick($event)"
            />
          </div>
          <p class="showcase__section__description" style="margin-top: 1rem;">
            Menu w kontenerze z overflow – overlay renderuje się poza kontenerem.
          </p>
          <div class="showcase__preview showcase__preview--overflow">
            <ui-menu
              triggerVariant="dropdown"
              text="Menu w overflow"
              [menuItems]="fileMenuItems"
              (menuItemClick)="onItemClick($event)"
            />
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Try all menu options: trigger variant (dropdown, split, button), text, icon, variant,
            appearance, size, shape. Toggle disabled and selected. Events (menuItemClick,
            primaryClick, menuOpened, menuClosed) are logged below.
          </p>
          <app-menu-interactive />
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__section__feedback {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: var(--color-neutral-background2-rest, #fafafa);
        border-radius: 4px;
        font-size: 14px;
      }
      .showcase__preview--integrations {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      .showcase__preview--overflow {
        overflow: hidden;
        height: 100px;
        border: 2px dashed var(--color-neutral-stroke-rest, #d1d1d1);
        position: relative;
        border-radius: 4px;
      }
      .showcase__preview--overflow ui-menu {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
      }
    `,
  ],
})
export class MenuShowcaseComponent {
  lastAction = '';

  variants: Variant[] = VARIANTS;
  appearances: Appearance[] = APPEARANCES;
  sizes: Size[] = SIZES;
  shapes: Shape[] = SHAPES;
  triggerVariants = ['dropdown', 'split', 'button'] as const;

  overviewDrawerFormConfig = MENU_DRAWER_CONFIGS.overview;
  triggerVariantDrawerFormConfig = MENU_DRAWER_CONFIGS.triggerVariant;
  appearanceVariantDrawerFormConfig = MENU_DRAWER_CONFIGS.appearanceVariant;
  sizeDrawerFormConfig = MENU_DRAWER_CONFIGS.size;
  statesDrawerFormConfig = MENU_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, selected: false },
    { id: 'selected', label: 'Selected', disabled: false, selected: true },
    { id: 'disabled', label: 'Disabled', disabled: true, selected: false },
  ];

  overviewMenuItems: MenuItem[] = [
    { id: 'new', label: 'New', icon: 'document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
  ];

  triggerVariantMenuItems: MenuItem[] = [
    { id: 'opt1', label: 'Option 1' },
    { id: 'opt2', label: 'Option 2' },
  ];

  overviewFormValues = signal<Record<string, unknown>>({
    text: 'Open',
    icon: '',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selected: false,
  });

  overviewForm = computed(() => {
    const v = this.overviewFormValues();
    return {
      text: (v['text'] as string) ?? 'Open',
      icon: (v['icon'] as IconName) || undefined,
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
      selected: !!v['selected'],
    };
  });

  triggerVariantFormValues = signal<Record<string, unknown>>({
    text: 'Menu',
    icon: '',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selected: false,
  });

  triggerVariantForm = computed(() => {
    const v = this.triggerVariantFormValues();
    return {
      text: (v['text'] as string) ?? 'Menu',
      icon: (v['icon'] as IconName) || undefined,
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
      selected: !!v['selected'],
    };
  });

  appearanceVariantFormValues = signal<Record<string, unknown>>({
    triggerVariant: 'dropdown',
    text: 'Open',
    icon: '',
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selected: false,
  });

  appearanceVariantForm = computed(() => {
    const v = this.appearanceVariantFormValues();
    return {
      triggerVariant:
        (v['triggerVariant'] as 'dropdown' | 'split' | 'button' | undefined) ?? 'dropdown',
      text: (v['text'] as string) ?? 'Open',
      icon: (v['icon'] as IconName) || undefined,
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
      selected: !!v['selected'],
    };
  });

  sizeFormValues = signal<Record<string, unknown>>({
    triggerVariant: 'dropdown',
    text: 'Open',
    icon: '',
    variant: 'primary',
    appearance: 'filled',
    shape: 'rounded',
    disabled: false,
    selected: false,
  });

  sizeForm = computed(() => {
    const v = this.sizeFormValues();
    return {
      text: (v['text'] as string) ?? 'Open',
      icon: (v['icon'] as IconName) || undefined,
      triggerVariant:
        (v['triggerVariant'] as 'dropdown' | 'split' | 'button' | undefined) ?? 'dropdown',
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'filled',
      shape: (v['shape'] as Shape) ?? 'rounded',
      disabled: !!v['disabled'],
      selected: !!v['selected'],
    };
  });

  statesFormValues = signal<Record<string, unknown>>({
    triggerVariant: 'dropdown',
    text: 'Open',
    icon: '',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded',
  });

  statesForm = computed(() => {
    const v = this.statesFormValues();
    return {
      text: (v['text'] as string) ?? 'Open',
      icon: (v['icon'] as IconName) || undefined,
      triggerVariant:
        (v['triggerVariant'] as 'dropdown' | 'split' | 'button' | undefined) ?? 'dropdown',
      variant: (v['variant'] as Variant) ?? 'primary',
      appearance: (v['appearance'] as Appearance) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      shape: (v['shape'] as Shape) ?? 'rounded',
    };
  });

  fileMenuItems: MenuItem[] = [
    { id: 'new', label: 'New', icon: 'document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'close', label: 'Close', icon: 'dismiss' },
  ];

  saveMenuItems: MenuItem[] = [
    { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { id: 'save-as', label: 'Save As...', icon: 'save', shortcut: 'Ctrl+Shift+S' },
    { id: 'save-all', label: 'Save All', icon: 'save', shortcut: 'Ctrl+Alt+S' },
  ];

  exportMenuItems: MenuItem[] = [
    { id: 'pdf', label: 'Export as PDF', icon: 'document' },
    { id: 'docx', label: 'Export as Word', icon: 'document' },
    { id: 'xlsx', label: 'Export as Excel', icon: 'document' },
    { id: 'csv', label: 'Export as CSV', icon: 'document' },
  ];

  rowContextMenuItems: MenuItem[] = [
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'duplicate', label: 'Duplicate', icon: 'document' },
    { id: 'delete', label: 'Delete', icon: 'delete', disabled: true },
  ];

  nestedSubmenuItems: MenuItem[] = [
    {
      id: 'file',
      label: 'File',
      icon: 'document',
      submenuItems: [
        { id: 'file-new', label: 'New', icon: 'document', shortcut: 'Ctrl+N' },
        { id: 'file-open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
        { id: 'file-save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
        { id: 'file-close', label: 'Close', icon: 'dismiss' },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'edit',
      submenuItems: [
        { id: 'edit-cut', label: 'Cut', icon: 'document', shortcut: 'Ctrl+X' },
        { id: 'edit-copy', label: 'Copy', icon: 'document', shortcut: 'Ctrl+C' },
        { id: 'edit-paste', label: 'Paste', icon: 'document', shortcut: 'Ctrl+V' },
        { id: 'edit-delete', label: 'Delete', icon: 'delete', shortcut: 'Del' },
      ],
    },
    {
      id: 'view',
      label: 'View',
      icon: 'document',
      submenuItems: [
        { id: 'view-zoom-in', label: 'Zoom In', icon: 'document', shortcut: 'Ctrl++' },
        { id: 'view-zoom-out', label: 'Zoom Out', icon: 'document', shortcut: 'Ctrl+-' },
        { id: 'view-reset', label: 'Reset Zoom', icon: 'document', shortcut: 'Ctrl+0' },
      ],
    },
  ];

  editorMenuSections: MenuSection[] = [
    {
      header: 'File',
      items: [
        {
          id: 'file-new',
          label: 'New',
          icon: 'document',
          shortcut: 'Ctrl+N',
          submenuItems: [
            {
              id: 'new-text',
              label: 'Text File',
              icon: 'document',
              action: () => this.handleAction('New → Text File'),
            },
            {
              id: 'new-folder',
              label: 'Folder',
              icon: 'folder',
              action: () => this.handleAction('New → Folder'),
            },
            {
              id: 'new-project',
              label: 'Project',
              icon: 'document',
              action: () => this.handleAction('New → Project'),
            },
          ],
        },
        {
          id: 'file-open',
          label: 'Open',
          icon: 'folder',
          shortcut: 'Ctrl+O',
          action: () => this.handleAction('Open'),
        },
        {
          id: 'file-recent',
          label: 'Open Recent',
          icon: 'folder',
          submenuItems: [
            {
              id: 'recent-1',
              label: 'Report.docx',
              icon: 'document',
              action: () => this.handleAction('Open Report.docx'),
            },
            {
              id: 'recent-2',
              label: 'Budget.xlsx',
              icon: 'document',
              action: () => this.handleAction('Open Budget.xlsx'),
            },
            {
              id: 'recent-3',
              label: 'Slides.pptx',
              icon: 'document',
              action: () => this.handleAction('Open Slides.pptx'),
            },
          ],
        },
        {
          id: 'file-save',
          label: 'Save',
          icon: 'save',
          shortcut: 'Ctrl+S',
          action: () => this.handleAction('Save'),
        },
        {
          id: 'file-doc',
          type: 'split',
          label: 'Report.docx',
          icon: 'document',
          shortcut: 'Ctrl+1',
          action: () => this.handleAction('Open Report.docx'),
          submenuAction: () => this.handleAction('Submenu: Report.docx'),
          submenuItems: [
            {
              id: 'doc-open',
              label: 'Open',
              icon: 'document',
              action: () => this.handleAction('Open Report.docx'),
            },
            {
              id: 'doc-location',
              label: 'Open File Location',
              icon: 'folder',
              action: () => this.handleAction('Open location'),
            },
            {
              id: 'doc-copy',
              label: 'Copy path',
              icon: 'document',
              action: () => this.handleAction('Copy path'),
            },
          ],
        },
        {
          id: 'file-sheet',
          type: 'split',
          label: 'Budget.xlsx',
          icon: 'document',
          shortcut: 'Ctrl+2',
          action: () => this.handleAction('Open Budget.xlsx'),
          submenuAction: () => this.handleAction('Submenu: Budget.xlsx'),
          submenuItems: [
            {
              id: 'sheet-open',
              label: 'Open',
              icon: 'document',
              action: () => this.handleAction('Open Budget.xlsx'),
            },
            {
              id: 'sheet-export',
              label: 'Export',
              icon: 'arrow_download',
              action: () => this.handleAction('Export Budget'),
            },
          ],
        },
        {
          id: 'file-close',
          label: 'Close',
          icon: 'dismiss',
          action: () => this.handleAction('Close'),
        },
      ],
      divider: true,
    },
    {
      header: 'Edit',
      items: [
        {
          id: 'edit-undo',
          label: 'Undo',
          icon: 'document',
          shortcut: 'Ctrl+Z',
          action: () => this.handleAction('Undo'),
        },
        { id: 'edit-redo', label: 'Redo', icon: 'document', shortcut: 'Ctrl+Y', disabled: true },
        {
          id: 'edit-cut',
          label: 'Cut',
          icon: 'document',
          shortcut: 'Ctrl+X',
          action: () => this.handleAction('Cut'),
        },
        {
          id: 'edit-copy',
          label: 'Copy',
          icon: 'document',
          shortcut: 'Ctrl+C',
          action: () => this.handleAction('Copy'),
        },
        {
          id: 'edit-paste',
          label: 'Paste',
          icon: 'document',
          shortcut: 'Ctrl+V',
          action: () => this.handleAction('Paste'),
          selected: true,
        },
        {
          id: 'edit-find',
          label: 'Find',
          icon: 'document',
          submenuItems: [
            {
              id: 'find-file',
              label: 'Find in File',
              icon: 'document',
              shortcut: 'Ctrl+F',
              action: () => this.handleAction('Find in File'),
            },
            {
              id: 'find-project',
              label: 'Find in Project',
              icon: 'document',
              shortcut: 'Ctrl+Shift+F',
              action: () => this.handleAction('Find in Project'),
            },
            {
              id: 'find-replace',
              label: 'Replace',
              icon: 'document',
              shortcut: 'Ctrl+H',
              action: () => this.handleAction('Replace'),
            },
          ],
        },
      ],
      divider: true,
    },
    {
      header: 'View',
      items: [
        {
          id: 'view-zoom-in',
          label: 'Zoom In',
          icon: 'document',
          shortcut: 'Ctrl++',
          action: () => this.handleAction('Zoom In'),
        },
        {
          id: 'view-zoom-out',
          label: 'Zoom Out',
          icon: 'document',
          shortcut: 'Ctrl+-',
          action: () => this.handleAction('Zoom Out'),
        },
        {
          id: 'view-reset',
          label: 'Reset Zoom',
          icon: 'document',
          shortcut: 'Ctrl+0',
          disabled: true,
        },
      ],
    },
  ];

  get editorMenuItemsFlat(): MenuItem[] {
    return this.editorMenuSections.flatMap(s => s.items);
  }

  onItemClick(item: MenuItem): void {
    this.lastAction = `Klik: ${item.label}`;
  }

  onSubmenuClick(item: MenuItem): void {
    this.lastAction = `Submenu: ${item.label}`;
  }

  handleAction(action: string): void {
    this.lastAction = action;
  }
}
