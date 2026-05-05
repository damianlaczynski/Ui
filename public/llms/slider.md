# Slider

Slider builds on the shared field system, so it supports labels, helper and error text, validation, disabled and readonly states, plus slider-specific features such as min/max ranges, step markers, vertical orientation, and formatted value text.

## Import
```ts
import { SliderComponent } from 'ui';
```

## Basic range selection
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:10rem';

@Component({
  selector: 'app-slider-basic-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:36rem;"
    >
      <div style="flex:1 1 16rem;min-width:14rem">
        <ui-slider
          label="Volume"
          helpText="Adjust the playback volume."
          [(ngModel)]="volume"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getVolumeAriaValueText"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p style="margin:0 0 0.35rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          Value
        </p>
        <p
          style="margin:0;font-size:1rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ volume }}%
        </p>
        <p style="margin:0.35rem 0 0;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ getVolumeAriaValueText(volume) }}
        </p>
      </div>
    </div>
  `,
})
export class SliderBasicExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected volume = 64;
  protected readonly getVolumeAriaValueText = (value: number) => `${value} percent volume`;
}
```

## Sizes and density
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:11rem';

@Component({
  selector: 'app-slider-sizes-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:42rem;"
    >
      <div
        style="flex:1 1 18rem;display:flex;min-width:16rem;max-width:30rem;flex-direction:column;gap:1rem"
      >
        <ui-slider
          label="Small"
          size="small"
          [(ngModel)]="smallValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-slider
          label="Medium"
          size="medium"
          [(ngModel)]="mediumValue"
          [ngModelOptions]="{ standalone: true }"
        />
        <ui-slider
          label="Large"
          size="large"
          [(ngModel)]="largeValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div style="display:grid;gap:0.4rem;font-size:0.875rem;line-height:1.35">
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Small</span>
            <strong style="font-weight:600">{{ smallValue }}</strong>
          </span>
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Medium</span>
            <strong style="font-weight:600">{{ mediumValue }}</strong>
          </span>
          <span
            style="display:flex;justify-content:space-between;gap:1rem;color:var(--color-neutral-foreground-rest)"
          >
            <span style="color:var(--color-neutral-foreground2-rest)">Large</span>
            <strong style="font-weight:600">{{ largeValue }}</strong>
          </span>
        </div>
      </div>
    </div>
  `,
})
export class SliderSizesExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected smallValue = 25;
  protected mediumValue = 50;
  protected largeValue = 75;
}
```

## Custom ranges and formatting
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem';

@Component({
  selector: 'app-slider-ranges-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:48rem;"
    >
      <div
        style="flex:1 1 18rem;display:flex;min-width:16rem;max-width:30rem;flex-direction:column;gap:1rem"
      >
        <ui-slider
          label="Rating"
          [min]="0"
          [max]="10"
          [step]="1"
          [(ngModel)]="rating"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getRatingText"
        />
        <ui-slider
          label="Discount"
          [min]="0"
          [max]="100"
          [step]="5"
          [(ngModel)]="discount"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getDiscountText"
        />
        <ui-slider
          label="Budget cap"
          [min]="5000"
          [max]="50000"
          [step]="2500"
          [showMinMax]="true"
          [formatValue]="formatCurrency"
          [(ngModel)]="budget"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Rating</span>
            <strong
              style="font-weight:600;color:var(--color-neutral-foreground-rest);font-variant-numeric:tabular-nums"
              >{{ rating }}/10</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Discount</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)"
              >{{ discount }}%</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Budget</span>
            <strong
              style="font-weight:600;color:var(--color-neutral-foreground-rest);font-variant-numeric:tabular-nums"
              >{{ formatCurrency(budget) }}</strong
            >
          </div>
          <div
            style="margin-top:0.25rem;padding-top:0.5rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest);border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            {{ getRatingText(rating) }}. {{ getDiscountText(discount) }}.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderRangesExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected rating = 7;
  protected discount = 20;
  protected budget = 20000;

  protected readonly formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  protected readonly getRatingText = (value: number) => `${value} out of 10`;
  protected readonly getDiscountText = (value: number) => `${value} percent discount`;
}
```

## Discrete steps and min/max labels
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:10rem';

@Component({
  selector: 'app-slider-steps-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:38rem;"
    >
      <div style="flex:1 1 17rem;min-width:14rem">
        <ui-slider
          label="Review score"
          [min]="0"
          [max]="12"
          [step]="3"
          [showStepMarkers]="true"
          [showMinMax]="true"
          [(ngModel)]="score"
          [ngModelOptions]="{ standalone: true }"
          helpText="Moves in discrete steps."
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p style="margin:0 0 0.35rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          Selected score
        </p>
        <p
          style="margin:0;font-size:1rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ score }}
        </p>
      </div>
    </div>
  `,
})
export class SliderStepsExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected score = 6;
}
```

## Vertical and readonly variants
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem';

@Component({
  selector: 'app-slider-vertical-example',
  standalone: true,
  imports: [FormsModule, SliderComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:flex-start;flex:1 1 auto">
        <div style="height:14rem">
          <ui-slider
            label="Mic gain"
            [vertical]="true"
            [min]="0"
            [max]="10"
            [step]="1"
            [showStepMarkers]="true"
            [(ngModel)]="gain"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>

        <div
          style="display:flex;flex-direction:column;gap:1rem;flex:1 1 14rem;min-width:14rem;max-width:18rem"
        >
          <ui-slider
            label="Readonly threshold"
            [min]="0"
            [max]="100"
            [readonly]="true"
            [(ngModel)]="readonlyValue"
            [ngModelOptions]="{ standalone: true }"
            helpText="Visible but locked in the current state."
          />
          <ui-slider
            label="Disabled threshold"
            [min]="0"
            [max]="100"
            [disabled]="true"
            [(ngModel)]="disabledValue"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Mic gain</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              gain
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Readonly</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              readonlyValue
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Disabled</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground2-rest)">{{
              disabledValue
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderVerticalExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected gain = 4;
  protected readonlyValue = 68;
  protected disabledValue = 40;
}
```

## Settings panel pattern
```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent, SwitchComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:11rem';

@Component({
  selector: 'app-slider-settings-panel-example',
  standalone: true,
  imports: [FormsModule, SliderComponent, SwitchComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem;"
    >
      <div
        style="flex:1 1 22rem;display:flex;min-width:16rem;max-width:34rem;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Notification settings</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Tune how strongly the system should notify account owners.
          </div>
        </div>

        <ui-slider
          label="Escalation threshold"
          [min]="0"
          [max]="100"
          [step]="5"
          [showMinMax]="true"
          [(ngModel)]="threshold"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getThresholdText"
          helpText="Higher values reduce low-priority alerts."
        />

        <ui-slider
          label="Reminder frequency"
          [min]="1"
          [max]="7"
          [step]="1"
          [showStepMarkers]="true"
          [showMinMax]="true"
          [formatValue]="formatDays"
          [(ngModel)]="reminderDays"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getReminderText"
        />

        <ui-switch
          label="Notify executive sponsors"
          [(ngModel)]="notifySponsors"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Threshold</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)"
              >{{ threshold }}%</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Reminder</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              formatDays(reminderDays)
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Sponsors</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              notifySponsors ? 'On' : 'Off'
            }}</strong>
          </div>
          <div
            style="margin-top:0.25rem;padding-top:0.5rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest);border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            {{ getThresholdText(threshold) }} · {{ getReminderText(reminderDays) }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderSettingsPanelExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected threshold = 65;
  protected reminderDays = 3;
  protected notifySponsors = true;

  protected readonly formatDays = (value: number) => `${value}d`;
  protected readonly getThresholdText = (value: number) => `${value} percent threshold`;
  protected readonly getReminderText = (value: number) => `Every ${value} days`;
}
```

## Accessibility

### Accessible name and value text
The slider uses `ariaLabel` when provided and otherwise falls back to the visible field label. Keep the label specific to the controlled setting, such as `Volume` or `Approval threshold`.

Use `ariaValueText` when the raw number is not descriptive enough, for example ratings, percentages, or formatted currency.

### Keyboard
| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowDown` | decreases value by one step |
| `ArrowRight` / `ArrowUp` | increases value by one step |
| `Home` | jumps to minimum |
| `End` | jumps to maximum |
| `Tab` | moves focus to or from the slider |

### Range semantics and state
The input exposes `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`. Readonly sliders leave the value visible without allowing edits; disabled sliders are removed from normal interaction.

| State | Attribute |
| --- | --- |
| current value | `aria-valuenow` |
| min / max | `aria-valuemin` and `aria-valuemax` |
| richer wording | `aria-valuetext` when provided |
| readonly | `aria-readonly="true"` |
