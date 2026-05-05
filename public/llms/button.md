# Button

Button triggers user actions. It extends the standard button element with icons, semantic variants and appearances, sizes and shapes, loading state, and optional selection models while staying grounded in shared theming.

## Import
```ts
import { ButtonComponent } from 'ui';
```

## Basic actions
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-basic-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary">Submit</ui-button>
      <ui-button variant="secondary" appearance="outline">Cancel</ui-button>
    </div>
  `,
})
export class ButtonBasicExampleComponent {}
```

## Appearance and variant
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-appearance-variant-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%">
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="primary" appearance="filled" [fullWidth]="true"
          >Primary filled</ui-button
        >
        <ui-button variant="primary" appearance="tint" [fullWidth]="true">Primary tint</ui-button>
        <ui-button variant="primary" appearance="outline" [fullWidth]="true"
          >Primary outline</ui-button
        >
        <ui-button variant="primary" appearance="subtle" [fullWidth]="true"
          >Primary subtle</ui-button
        >
        <ui-button variant="primary" appearance="transparent" [fullWidth]="true"
          >Primary transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="secondary" appearance="filled" [fullWidth]="true"
          >Secondary filled</ui-button
        >
        <ui-button variant="secondary" appearance="tint" [fullWidth]="true"
          >Secondary tint</ui-button
        >
        <ui-button variant="secondary" appearance="outline" [fullWidth]="true"
          >Secondary outline</ui-button
        >
        <ui-button variant="secondary" appearance="subtle" [fullWidth]="true"
          >Secondary subtle</ui-button
        >
        <ui-button variant="secondary" appearance="transparent" [fullWidth]="true"
          >Secondary transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="success" appearance="filled" [fullWidth]="true"
          >Success filled</ui-button
        >
        <ui-button variant="success" appearance="tint" [fullWidth]="true">Success tint</ui-button>
        <ui-button variant="success" appearance="outline" [fullWidth]="true"
          >Success outline</ui-button
        >
        <ui-button variant="success" appearance="subtle" [fullWidth]="true"
          >Success subtle</ui-button
        >
        <ui-button variant="success" appearance="transparent" [fullWidth]="true"
          >Success transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="warning" appearance="filled" [fullWidth]="true"
          >Warning filled</ui-button
        >
        <ui-button variant="warning" appearance="tint" [fullWidth]="true">Warning tint</ui-button>
        <ui-button variant="warning" appearance="outline" [fullWidth]="true"
          >Warning outline</ui-button
        >
        <ui-button variant="warning" appearance="subtle" [fullWidth]="true"
          >Warning subtle</ui-button
        >
        <ui-button variant="warning" appearance="transparent" [fullWidth]="true"
          >Warning transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="danger" appearance="filled" [fullWidth]="true">Danger filled</ui-button>
        <ui-button variant="danger" appearance="tint" [fullWidth]="true">Danger tint</ui-button>
        <ui-button variant="danger" appearance="outline" [fullWidth]="true"
          >Danger outline</ui-button
        >
        <ui-button variant="danger" appearance="subtle" [fullWidth]="true">Danger subtle</ui-button>
        <ui-button variant="danger" appearance="transparent" [fullWidth]="true"
          >Danger transparent</ui-button
        >
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button variant="info" appearance="filled" [fullWidth]="true">Info filled</ui-button>
        <ui-button variant="info" appearance="tint" [fullWidth]="true">Info tint</ui-button>
        <ui-button variant="info" appearance="outline" [fullWidth]="true">Info outline</ui-button>
        <ui-button variant="info" appearance="subtle" [fullWidth]="true">Info subtle</ui-button>
        <ui-button variant="info" appearance="transparent" [fullWidth]="true"
          >Info transparent</ui-button
        >
      </div>
    </div>
  `,
})
export class ButtonAppearanceVariantExampleComponent {}
```

## Shapes
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-shapes-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" shape="rounded">Rounded</ui-button>
      <ui-button variant="primary" shape="square">Square</ui-button>
      <ui-button variant="primary" shape="circular" icon="heart" ariaLabel="Like" />
    </div>
  `,
})
export class ButtonShapesExampleComponent {}
```

## Icons
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-icons-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" icon="save">Save</ui-button>
      <ui-button variant="secondary" appearance="outline" icon="edit">Edit</ui-button>
      <ui-button variant="secondary" appearance="subtle" icon="share">Share</ui-button>
      <ui-button variant="success" icon="checkmark">Done</ui-button>
      <ui-button variant="danger" appearance="outline" icon="delete">Delete</ui-button>
    </div>
  `,
})
export class ButtonIconsExampleComponent {}
```

## Icon-only
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-icon-only-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%">
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="primary"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="primary"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="primary"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="primary"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="primary"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
          shape="circular"
        ></ui-button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="secondary"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
        ></ui-button>
        <ui-button
          variant="secondary"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
        ></ui-button>
        <ui-button
          variant="secondary"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
        ></ui-button>
        <ui-button
          variant="secondary"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
        ></ui-button>
        <ui-button
          variant="secondary"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
        ></ui-button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="success"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="success"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="success"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="success"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="success"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
          shape="square"
        ></ui-button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="warning"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="warning"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="warning"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="warning"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
          shape="circular"
        ></ui-button>
        <ui-button
          variant="warning"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
          shape="circular"
        ></ui-button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="danger"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
        ></ui-button>
        <ui-button
          variant="danger"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
        ></ui-button>
        <ui-button
          variant="danger"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
        ></ui-button>
        <ui-button
          variant="danger"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
        ></ui-button>
        <ui-button
          variant="danger"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
        ></ui-button>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <ui-button
          variant="info"
          appearance="filled"
          icon="save"
          ariaLabel="Save"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="info"
          appearance="tint"
          icon="toilet"
          ariaLabel="Restroom"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="info"
          appearance="outline"
          icon="star"
          ariaLabel="Favorite"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="info"
          appearance="subtle"
          icon="home"
          ariaLabel="Home"
          size="large"
          shape="square"
        ></ui-button>
        <ui-button
          variant="info"
          appearance="transparent"
          icon="heart"
          ariaLabel="Like"
          size="large"
          shape="square"
        ></ui-button>
      </div>
    </div>
  `,
})
export class ButtonIconOnlyExampleComponent {}
```

## Sizes
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-sizes-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button size="small" variant="primary">Small</ui-button>
      <ui-button size="medium" variant="primary">Medium</ui-button>
      <ui-button size="large" variant="primary">Large</ui-button>
    </div>
  `,
})
export class ButtonSizesExampleComponent {}
```

## States and feedback
```ts
import { Component, signal } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-states-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" icon="save" (click)="save()" [loading]="loading()"
        >Save changes</ui-button
      >
      <ui-button variant="secondary" [loading]="true">Saving...</ui-button>
      <ui-button variant="secondary" [disabled]="true">Disabled</ui-button>
    </div>
  `,
})
export class ButtonStatesExampleComponent {
  loading = signal(false);

  save(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }
}
```

## Layout and selection
```ts
import { Component } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-other-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:22rem">
      <ui-button variant="primary" [fullWidth]="true">Full width</ui-button>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
        <ui-button variant="secondary" appearance="outline" [selected]="false" icon="star">
          Selectable off
        </ui-button>
        <ui-button
          variant="secondary"
          appearance="outline"
          [selectable]="true"
          [selected]="true"
          icon="star"
        >
          Selectable on
        </ui-button>
      </div>
    </div>
  `,
})
export class ButtonOtherExampleComponent {}
```

## Accessibility

### Accessible name
`ButtonComponent` renders a native `button`. The accessible name comes from projected content or the `text` input. Use `ariaLabel` when there is no suitable visible label (required for icon-only). The component does not translate strings, so pass localized `text`, `ariaLabel`, or projected content from your app.

### Keyboard
Focus uses the inner native button; the `ui-button` host is not an extra tab stop. Use `tabIndex` only to adjust order on the inner button; call `ButtonComponent.focus()` to focus it from code.

| Key | Action |
| --- | --- |
| Tab | Moves focus to or from the button. |
| Enter / Space | Activates the button when focused and not disabled or loading. |

### ARIA
| Input / state | Attribute |
| --- | --- |
| `ariaLabel` | `aria-label` |
| `selectable` and role is not `radio` | `aria-pressed` mirrors `selected` |
| `role` is `radio` | `aria-checked` from `ariaChecked` or `selected` |
| `disabled` | native `disabled` |
| `loading` | click ignored; no automatic `disabled` or `aria-busy`, combine with `disabled` if needed |
