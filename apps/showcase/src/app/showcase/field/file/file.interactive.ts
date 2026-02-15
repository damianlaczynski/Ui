import { Component, signal, computed, viewChild } from '@angular/core';
import { FileComponent, FileComponentMode, InputVariant, Size } from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { FILE_SHOWCASE_CONFIG } from './file.showcase.config';

@Component({
  selector: 'app-file-interactive',
  imports: [FileComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-file
          [label]="currentLabel()"
          [mode]="currentMode()"
          [inputVariant]="currentVariant()"
          [size]="currentSize()"
          [multiple]="currentMultiple()"
          [disabled]="currentDisabled()"
          [readonly]="currentReadonly()"
          [required]="currentRequired()"
          [helpText]="currentHelpText()"
          (fileSelect)="onFileSelect($event)"
        />
        <p style="margin-top: 12px;">
          Current value: <strong>{{ getCurrentValuePreview() }}</strong>
        </p>
      </div>
    </app-interactive-showcase>
  `,
})
export class FileInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = FILE_SHOWCASE_CONFIG;
  currentValue = signal<string>('');

  private values = signal<Record<string, unknown>>({
    label: 'Upload File',
    helpText: '',
    mode: 'area',
    variant: 'filled',
    size: 'medium',
    multiple: false,
    disabled: false,
    readonly: false,
    required: false,
  });

  currentLabel = computed(() => this.values()['label'] as string);
  currentHelpText = computed(() => this.values()['helpText'] as string);
  currentMode = computed(() => this.values()['mode'] as FileComponentMode);
  currentVariant = computed(() => this.values()['variant'] as InputVariant);
  currentSize = computed(() => this.values()['size'] as Size);
  currentMultiple = computed(() => this.values()['multiple'] as boolean);
  currentDisabled = computed(() => this.values()['disabled'] as boolean);
  currentReadonly = computed(() => this.values()['readonly'] as boolean);
  currentRequired = computed(() => this.values()['required'] as boolean);
  getCurrentValuePreview(): string {
    const source = (this as unknown as { currentValue?: unknown }).currentValue;
    const value = typeof source === 'function' ? (source as () => unknown)() : source;

    if (value === null || value === undefined || value === '') {
      return 'Not set';
    }

    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    this.currentValue.set('');
  }

  onFileSelect(files: File[]): void {
    const names = files.map(file => file.name).join(', ');
    this.currentValue.set(names);
    this.showcase()?.logEvent('fileSelect', { count: files.length });
  }
}
