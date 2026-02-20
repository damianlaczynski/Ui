import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileComponent, FileComponentMode, InputVariant, Size } from 'ui';
import { TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { JsonPipe } from '@angular/common';
import { SIZES, INPUT_VARIANTS } from '@shared/utils/showcase/component-options.utils';
import { FILE_DRAWER_CONFIGS } from './file.showcase.config';
import { FileInteractiveComponent } from './file.interactive';

const FILE_MODES: FileComponentMode[] = ['area', 'inline'];

@Component({
  selector: 'app-file-showcase',
  imports: [
    FileComponent,
    ReactiveFormsModule,
    CommonModule,
    JsonPipe,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    FileInteractiveComponent,
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
        <app-showcase-header title="File Input" />
        <p class="showcase__description">
          The File Input component allows users to upload files. It supports area and inline modes,
          drag and drop, multiple files, accept types, size limits, and various input variants. Use
          for document uploads, image selection, or any file input scenario.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Basic Usage</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Upload File" />
            </div>
            <div class="showcase__item">
              <ui-file
                label="Upload File (Inline Mode)"
                [mode]="'inline'"
                placeholder="Click to select a file"
              />
            </div>
          </div>
        </section>

        <app-section-with-drawer
          sectionTitle="Modes"
          sectionDescription="Area mode (default) shows a drag-and-drop zone. Inline mode displays a compact input-like trigger. Choose based on space and UX requirements."
          [formConfig]="modeDrawerFormConfig"
          [formValues]="modeFormValues()"
          (formValuesChange)="modeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (mode of modes; track mode) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ mode | titlecase }} Mode</h3>
                <ui-file
                  [label]="mode === 'area' ? 'Drag & Drop Area' : 'Inline File Input'"
                  [mode]="mode"
                  [inputVariant]="modeForm().variant"
                  [size]="modeForm().size"
                  [disabled]="modeForm().disabled"
                  [readonly]="modeForm().readonly"
                  [required]="modeForm().required"
                  [uploadText]="mode === 'area' ? 'Click to upload or drag and drop' : ''"
                  [placeholder]="mode === 'inline' ? 'Click to select a file' : ''"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Sizes"
          sectionDescription="Three size options: small, medium (default), and large. Size affects the upload area or input height."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-file
                  [label]="size"
                  [size]="size"
                  [inputVariant]="sizeForm().variant"
                  [mode]="sizeForm().mode"
                  [disabled]="sizeForm().disabled"
                  [readonly]="sizeForm().readonly"
                  [required]="sizeForm().required"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Variants"
          sectionDescription="Input visual style: filled, filled-gray, filled-lighter, or underlined. Applies to inline mode; area mode uses its own styling."
          [formConfig]="variantDrawerFormConfig"
          [formValues]="variantFormValues()"
          (formValuesChange)="variantFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (variant of inputVariants; track variant) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ variant }}</h3>
                <ui-file
                  [label]="variant"
                  [mode]="'inline'"
                  [inputVariant]="variant"
                  [size]="variantForm().size"
                  [disabled]="variantForm().disabled"
                  [readonly]="variantForm().readonly"
                  [required]="variantForm().required"
                  placeholder="Click to select"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="Normal, disabled, readonly, and required states. Use the Customize drawer to adjust mode, size, and variant across all examples."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid">
            @for (state of statePresets; track state.id) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ state.label }}</h3>
                <ui-file
                  [label]="state.label"
                  [mode]="statesForm().mode"
                  [inputVariant]="statesForm().variant"
                  [size]="statesForm().size"
                  [disabled]="state.disabled"
                  [readonly]="state.readonly"
                  [required]="state.required"
                />
              </div>
            }
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Multiple Files</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Upload Multiple Files"
                [multiple]="true"
                uploadText="Click to upload or drag and drop multiple files"
                uploadHint="PDF, DOC, DOCX files up to 10MB"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Accept Types</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Images Only"
                accept="image/*"
                uploadText="Upload images"
                uploadHint="PNG, JPG, GIF up to 5MB"
              />
            </div>
            <div class="showcase__item">
              <ui-file
                label="Documents Only"
                accept=".pdf,.doc,.docx"
                uploadText="Upload documents"
                uploadHint="PDF, DOC, DOCX files"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">File Size Limit</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file label="Max 5MB" [maxSize]="5 * 1024 * 1024" uploadHint="Files up to 5MB" />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Max Files Limit</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-file
                label="Max 3 Files"
                [multiple]="true"
                [maxFiles]="3"
                uploadHint="Maximum 3 files"
              />
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Form Integration</h2>
          <form [formGroup]="fileForm" class="showcase__form">
            <ui-file
              label="Avatar"
              formControlName="avatar"
              accept="image/*"
              helpText="Upload your profile picture"
            />
            <ui-file
              label="Documents"
              formControlName="documents"
              [multiple]="true"
              accept=".pdf,.doc,.docx"
              helpText="Upload supporting documents"
              [maxSize]="10 * 1024 * 1024"
            />
            <div class="showcase__form-output">
              <h4>Form Values:</h4>
              <pre>{{ fileForm.value | json }}</pre>
            </div>
          </form>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Experiment with all file input options in real time. Change label, mode, variant, size,
            toggle multiple and states. The component emits fileSelect events—check the event log to
            see interactions.
          </p>
          <app-file-interactive />
        </section>
      </div>
    </div>
  `,
})
export class FileShowcaseComponent {
  modes = FILE_MODES;
  sizes = SIZES;
  inputVariants = INPUT_VARIANTS;

  modeDrawerFormConfig = FILE_DRAWER_CONFIGS.mode;
  sizeDrawerFormConfig = FILE_DRAWER_CONFIGS.size;
  variantDrawerFormConfig = FILE_DRAWER_CONFIGS.variant;
  statesDrawerFormConfig = FILE_DRAWER_CONFIGS.states;

  statePresets = [
    { id: 'normal', label: 'Normal', disabled: false, readonly: false, required: false },
    { id: 'disabled', label: 'Disabled', disabled: true, readonly: false, required: false },
    { id: 'readonly', label: 'Read-only', disabled: false, readonly: true, required: false },
    { id: 'required', label: 'Required', disabled: false, readonly: false, required: true },
  ];

  fileForm = new FormGroup({
    avatar: new FormControl<File | null>(null),
    documents: new FormControl<File[] | null>(null),
  });

  modeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  modeForm = computed(() => this.toFileForm(this.modeFormValues()));

  sizeFormValues = signal<Record<string, unknown>>({
    variant: 'filled',
    mode: 'area',
    disabled: false,
    readonly: false,
    required: false,
  });
  sizeForm = computed(() => this.toFileForm(this.sizeFormValues()));

  variantFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    disabled: false,
    readonly: false,
    required: false,
  });
  variantForm = computed(() => this.toFileForm(this.variantFormValues()));

  statesFormValues = signal<Record<string, unknown>>({
    mode: 'area',
    variant: 'filled',
    size: 'medium',
  });
  statesForm = computed(() => this.toFileForm(this.statesFormValues()));

  private toFileForm(v: Record<string, unknown>) {
    return {
      mode: (v['mode'] as FileComponentMode) ?? 'area',
      variant: (v['variant'] as InputVariant) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      disabled: !!v['disabled'],
      readonly: !!v['readonly'],
      required: !!v['required'],
    };
  }
}
