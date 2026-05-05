# Color Picker

Color Picker builds on the shared field system, so it supports labels, helper and error text, validation hooks, disabled and readonly states, and Angular forms integration. It adds color-specific features such as HEX, RGB, and HSL output, alpha control, an optional eye dropper, a connected picker panel, and native color input fallback on mobile.

## Import
```ts
import { ColorComponent } from 'ui';
```

## Basic color input
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-basic-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-color
        label="Brand primary"
        helpText="Used for buttons, links, and highlighted states."
        [(ngModel)]="primary"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
      />

      <ui-color
        label="Accent fill"
        helpText="Supports alpha for badges and subtle fills."
        [(ngModel)]="accent"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
        [showAlpha]="true"
      />
    </div>
  `,
})
export class ColorBasicExampleComponent {
  protected primary = '#0F6CBD';
  protected accent = '#C239B31F';
}
```

## Output formats
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-formats-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <ui-color
        label="HEX token"
        format="hex"
        [(ngModel)]="hexValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="RGB output"
        format="rgb"
        [(ngModel)]="rgbValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="HSL output"
        format="hsl"
        [(ngModel)]="hslValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorFormatsExampleComponent {
  protected hexValue = '#4F6BED';
  protected rgbValue = 'rgb(15, 123, 95)';
  protected hslValue = 'hsl(32, 100%, 50%)';
}
```

## Variants and density
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-surface-options-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <ui-color
        label="Filled default"
        inputVariant="filled"
        size="medium"
        [(ngModel)]="filledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Filled lighter compact"
        inputVariant="filled-lighter"
        size="small"
        [(ngModel)]="compactValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Underlined prominent"
        inputVariant="underlined"
        size="large"
        [(ngModel)]="prominentValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorSurfaceOptionsExampleComponent {
  protected filledValue = '#0F6CBD';
  protected compactValue = '#EAA300';
  protected prominentValue = '#C239B3';
}
```

## Alpha and picker tools
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-tools-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  template: `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:44rem">
      <ui-color
        label="With alpha"
        helpText="Useful for overlays and subtle surfaces."
        [showAlpha]="true"
        [(ngModel)]="alphaValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Without eye dropper"
        helpText="Keeps the field simpler in locked-down workflows."
        [showEyeDropper]="false"
        [(ngModel)]="simpleValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Readonly token"
        helpText="Visible but not editable in this state."
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorToolsExampleComponent {
  protected alphaValue = '#0F6CBDCC';
  protected simpleValue = '#7A5CFA';
  protected readonlyValue = '#107C10';
}
```

## Brand token form
```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-brand-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, ColorComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <form
        [formGroup]="form"
        style="flex:1 1 22rem;display:flex;min-width:16rem;max-width:34rem;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-color
          label="Primary brand"
          helpText="Default buttons and active states."
          formControlName="primary"
          format="hex"
        />

        <ui-color
          label="Secondary brand"
          helpText="Supporting emphasis and secondary tokens."
          formControlName="secondary"
          format="hex"
        />

        <ui-color
          label="Accent overlay"
          helpText="Used for highlighted backgrounds and data accents."
          formControlName="accent"
          format="hex"
          [showAlpha]="true"
        />
      </form>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4">
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Primary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{ form.controls.primary.getRawValue() }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Secondary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{ form.controls.secondary.getRawValue() }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Accent</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{ form.controls.accent.getRawValue() }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ColorBrandFormExampleComponent {
  protected readonly form = new FormGroup({
    primary: new FormControl('#0F6CBD', { nonNullable: true }),
    secondary: new FormControl('#107C10', { nonNullable: true }),
    accent: new FormControl('#C239B31F', { nonNullable: true }),
  });
}
```

## Theme settings panel
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, ColorComponent } from 'ui';

@Component({
  selector: 'app-color-theme-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, ColorComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Dashboard theme</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure a compact theme set for cards, charts, and callout surfaces.
        </div>
      </div>

      <ui-color
        label="Header accent"
        [(ngModel)]="headerAccent"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
      />

      <ui-color
        label="Data highlight"
        [(ngModel)]="dataHighlight"
        [ngModelOptions]="{ standalone: true }"
        format="rgb"
      />

      <ui-color
        label="Overlay tint"
        [(ngModel)]="overlayTint"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
        [showAlpha]="true"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="headerAccent"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">Header</span>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="dataHighlight"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">Data</span>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center">
          <span
            style="width:0.875rem;height:0.875rem;border-radius:999px"
            [style.background]="overlayTint"
          ></span>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">Overlay</span>
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background1-rest)"
      >
        <ui-button type="button" variant="primary">Save theme</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Reset to defaults</ui-button>
      </div>
    </div>
  `,
})
export class ColorThemePanelExampleComponent {
  protected headerAccent = '#0F6CBD';
  protected dataHighlight = 'rgb(216, 59, 1)';
  protected overlayTint = '#00000066';
}
```

## Accessibility

### Accessible name
The text trigger input uses the shared field accessible name chain, so `ariaLabel` overrides the visible label and the label remains the default naming source. When there is no visible label, provide an explicit accessible name.

| Source | Accessible name |
| --- | --- |
| `ariaLabel` | explicit accessible name |
| visible `label` | default fallback |
| format preview | supplemental only, not the name |

### Descriptions and errors
Helper text and error text are wired into `aria-describedby` through the shared field wrapper. The trigger also exposes `aria-expanded`, `aria-haspopup="dialog"`, and `aria-controls` when the custom picker panel is used.

| Trigger state | Attribute |
| --- | --- |
| helper or error text | `aria-describedby` |
| open picker | `aria-expanded="true"` |
| connected panel | `aria-controls` |
| picker relationship | `aria-haspopup="dialog"` |

### Picker panel
The overlay picker renders as a dialog and traps focus while open. Keep it as a lightweight editing surface for the current field value rather than a complex multi-step workflow.
