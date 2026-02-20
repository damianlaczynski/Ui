import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DrawerComponent, RadioButtonGroupComponent, SwitchComponent } from 'ui';
import type { RadioButtonItem } from 'ui';
import type { SectionDrawerFormControl } from './section-with-drawer.types';

@Component({
  selector: 'app-section-with-drawer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    DrawerComponent,
    RadioButtonGroupComponent,
    SwitchComponent,
  ],
  template: `
    <div class="showcase__section">
      <div class="showcase__section__header-row">
        <h2 class="showcase__section__title" [id]="sectionHeadingId()">{{ sectionTitle() }}</h2>
        <ui-button
          variant="secondary"
          appearance="outline"
          icon="settings"
          (click)="drawerVisible.set(true)"
          ariaLabel="Open props"
        >
          Customize
        </ui-button>
      </div>
      @if (sectionDescription()) {
        <p class="showcase__section__description">{{ sectionDescription() }}</p>
      }
      <div class="showcase__option-section__box">
        <ng-content />
      </div>
      <div class="showcase__drawer-wrapper--transparent-backdrop">
        <ui-drawer
          [title]="drawerTitle() || sectionTitle()"
          bodyText=""
          position="right"
          backdrop="dynamic"
          size="medium"
          [(visible)]="drawerVisible"
        >
          <form class="showcase__form">
            @for (control of formConfig(); track control.key) {
              @if (control.type === 'dropdown' && control.options) {
                <div class="showcase__form-field">
                  <ui-radio-button-group
                    [id]="fieldId(control.key)"
                    [name]="control.key"
                    [label]="control.label"
                    [items]="toRadioItems(control.options)"
                    [ngModel]="formValues()[control.key]"
                    (ngModelChange)="onControlChange(control.key, $event)"
                    variant="primary"
                    appearance="outline"
                  />
                </div>
              }
              @if (control.type === 'switch') {
                <div class="showcase__form-field showcase__form-field--row">
                  <ui-switch
                    [id]="fieldId(control.key)"
                    [name]="control.key"
                    [ngModel]="formValues()[control.key]"
                    (ngModelChange)="onControlChange(control.key, $event)"
                  />
                  <label class="showcase__form-label" [for]="fieldId(control.key)">{{
                    control.label
                  }}</label>
                </div>
              }
            }
          </form>
        </ui-drawer>
      </div>
    </div>
  `,
})
export class SectionWithDrawerComponent {
  sectionTitle = input.required<string>();
  sectionDescription = input<string>('');
  drawerTitle = input<string>('');
  formConfig = input.required<SectionDrawerFormControl[]>();
  formValues = input.required<Record<string, unknown>>();

  formValuesChange = output<Record<string, unknown>>();

  drawerVisible = model(false);

  sectionHeadingId(): string {
    const sectionSlug = this.slugify(this.sectionTitle());
    return `${sectionSlug || 'untitled'}`;
  }

  fieldId(key: string): string {
    return `${this.sectionHeadingId()}-form-${key}`;
  }

  toRadioItems(options: { value: string | number | boolean; label: string }[]): RadioButtonItem[] {
    return options.map((opt, i) => ({
      id: typeof opt.value === 'boolean' ? i : opt.value,
      label: opt.label,
      value: opt.value,
    }));
  }

  onControlChange(key: string, value: unknown): void {
    this.formValuesChange.emit({ ...this.formValues(), [key]: value });
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
