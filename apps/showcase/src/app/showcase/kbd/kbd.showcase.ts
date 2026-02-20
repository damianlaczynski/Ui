import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KbdComponent, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { SIZES } from '@shared/utils/showcase/component-options.utils';
import { KBD_DRAWER_CONFIGS } from './kbd.showcase.config';
import { KbdInteractiveComponent } from './kbd.interactive';

const KBD_APPEARANCES = ['default', 'filled'] as const;

@Component({
  selector: 'app-kbd-showcase',
  standalone: true,
  imports: [
    KbdComponent,
    CommonModule,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    TableOfContentComponent,
    KbdInteractiveComponent,
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
        <app-showcase-header title="Kbd" />
        <p class="showcase__description">
          The Kbd component displays keyboard keys in a styled format. It supports size variants
          (small, medium, large) and appearance (default, filled). Use for keyboard shortcuts,
          navigation instructions, or documentation.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Overview</h2>
          <p class="showcase__section__description">
            Complete matrix of size and appearance combinations.
          </p>
          <div class="showcase__option-section__box">
            <div class="showcase__icons-matrix showcase__icons-matrix--3-cols">
              <div class="showcase__icons-matrix__row showcase__icons-matrix__row--header">
                <div
                  class="showcase__icons-matrix__cell showcase__icons-matrix__cell--corner"
                ></div>
                @for (size of sizes; track size) {
                  <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--header">
                    {{ size | titlecase }}
                  </div>
                }
              </div>
              @for (appearance of appearances; track appearance) {
                <div class="showcase__icons-matrix__row">
                  <div class="showcase__icons-matrix__cell showcase__icons-matrix__cell--label">
                    {{ appearance | titlecase }}
                  </div>
                  @for (size of sizes; track size) {
                    <div class="showcase__icons-matrix__cell">
                      <ui-kbd text="Enter" [size]="size" [appearance]="appearance" />
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Three size options: small, medium (default), and large. Size affects padding and font dimensions. Choose based on context—small for inline text, large for prominent shortcuts."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__kbd-row">
            @for (size of sizes; track size) {
              <ui-kbd [text]="sizeForm().text" [size]="size" [appearance]="sizeForm().appearance" />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Default (white background) or filled (subtle gray background). Appearance affects visual weight in different contexts."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid showcase__kbd-row">
            @for (appearance of appearances; track appearance) {
              <ui-kbd
                [text]="appearanceForm().text"
                [size]="appearanceForm().size"
                [appearance]="appearance"
              />
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Common Shortcuts"
          sectionDescription="Examples of keyboard shortcuts using the Kbd component. Use the Customize drawer to adjust size and appearance."
          [formConfig]="shortcutsDrawerFormConfig"
          [formValues]="shortcutsFormValues()"
          (formValuesChange)="shortcutsFormValues.set($event)"
        >
          <div class="showcase__shortcuts">
            @for (shortcut of shortcuts; track shortcut.label) {
              <div class="showcase__shortcut-row">
                <span>{{ shortcut.label }}:</span>
                <ui-kbd
                  [text]="shortcut.keys[0]"
                  [size]="shortcutsForm().size"
                  [appearance]="shortcutsForm().appearance"
                />
                <span>+</span>
                <ui-kbd
                  [text]="shortcut.keys[1]"
                  [size]="shortcutsForm().size"
                  [appearance]="shortcutsForm().appearance"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Navigation Keys"
          sectionDescription="Arrow keys and navigation keys. Use the Customize drawer to adjust size and appearance."
          [formConfig]="navigationDrawerFormConfig"
          [formValues]="navigationFormValues()"
          (formValuesChange)="navigationFormValues.set($event)"
        >
          <div class="showcase__grid showcase__kbd-row">
            @for (key of navigationKeys; track key) {
              <ui-kbd
                [text]="key"
                [size]="navigationForm().size"
                [appearance]="navigationForm().appearance"
              />
            }
          </div>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all Kbd options in real time. Change text, size, and appearance to see
            how the component renders in different contexts.
          </p>
          <app-kbd-interactive />
        </section>
      </div>
    </div>
  `,
})
export class KbdShowcaseComponent {
  sizes = SIZES;
  appearances = [...KBD_APPEARANCES];

  shortcuts = [
    { label: 'Copy', keys: ['Ctrl', 'C'] },
    { label: 'Paste', keys: ['Ctrl', 'V'] },
    { label: 'Undo', keys: ['Ctrl', 'Z'] },
    { label: 'Save', keys: ['Ctrl', 'S'] },
    { label: 'Select All', keys: ['Ctrl', 'A'] },
    { label: 'Find', keys: ['Ctrl', 'F'] },
  ];

  navigationKeys = ['↑', '↓', '←', '→', 'Home', 'End', 'Page Up', 'Page Down'];

  sizeDrawerFormConfig = KBD_DRAWER_CONFIGS.size;
  appearanceDrawerFormConfig = KBD_DRAWER_CONFIGS.appearance;
  shortcutsDrawerFormConfig = KBD_DRAWER_CONFIGS.shortcuts;
  navigationDrawerFormConfig = KBD_DRAWER_CONFIGS.navigation;

  sizeFormValues = signal<Record<string, unknown>>({
    text: 'Ctrl',
    appearance: 'default',
  });
  sizeForm = computed(() => this.toKbdForm(this.sizeFormValues()));

  appearanceFormValues = signal<Record<string, unknown>>({
    text: 'Enter',
    size: 'medium',
  });
  appearanceForm = computed(() => this.toKbdForm(this.appearanceFormValues()));

  shortcutsFormValues = signal<Record<string, unknown>>({
    size: 'small',
    appearance: 'default',
  });
  shortcutsForm = computed(() => this.toKbdForm(this.shortcutsFormValues()));

  navigationFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    appearance: 'default',
  });
  navigationForm = computed(() => this.toKbdForm(this.navigationFormValues()));

  private toKbdForm(v: Record<string, unknown>) {
    return {
      text: (v['text'] as string) || 'Enter',
      size: ((v['size'] as string) || 'medium') as Size,
      appearance: ((v['appearance'] as string) || 'default') as 'default' | 'filled',
    };
  }
}
