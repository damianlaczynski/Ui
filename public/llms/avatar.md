# Avatar

Supply `image` when you have a URL, `initials` for explicit letters, or `name` to derive up to two characters. Without those, set `icon` or accept the default person glyph. `loading` swaps content for a spinner while `ariaLabel` or `name` feeds the required accessible name on the `img` role host.

## Import
```ts
import { AvatarComponent } from 'ui';
```

## Image, initials, name, or icon
```ts
import { Component } from '@angular/core';
import { AvatarComponent } from 'ui';

@Component({
  selector: 'app-avatar-basic-example',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar
          image="https://i.pravatar.cc/150?img=12"
          name="River Chen"
        />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">image</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar initials="MK" ariaLabel="Morgan Kelly" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">initials</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar name="Wei Zhang" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">name</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar icon="building" ariaLabel="Northwind workspace" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">icon</span>
      </div>
    </div>
  `,
})
export class AvatarBasicExampleComponent {}
```

## Variant and appearance
```ts
import { Component } from '@angular/core';
import { AvatarComponent } from 'ui';

@Component({
  selector: 'app-avatar-appearance-example',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
      <ui-avatar variant="primary" appearance="filled" name="Active lane" />
      <ui-avatar variant="secondary" appearance="outline" name="Shared account" />
      <ui-avatar variant="success" appearance="tint" name="Verified bot" />
      <ui-avatar variant="warning" appearance="subtle" name="Trial seat" />
    </div>
  `,
})
export class AvatarAppearanceExampleComponent {}
```

## Size and shape
```ts
import { Component } from '@angular/core';
import { AvatarComponent, Shape, Size } from 'ui';

@Component({
  selector: 'app-avatar-layout-example',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end">
        @for (size of sizes; track size) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-avatar [size]="size" name="Sam Rowe" />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{ size }}</span>
          </div>
        }
      </div>
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;padding-top:0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
      >
        @for (shape of shapes; track shape) {
          <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
            <ui-avatar [shape]="shape" name="Jamie P." />
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">{{ shape }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class AvatarLayoutExampleComponent {
  protected readonly sizes: Size[] = ['small', 'medium', 'large'];

  protected readonly shapes: Shape[] = ['rounded', 'circular', 'square'];
}
```

## Disabled and loading
```ts
import { Component } from '@angular/core';
import { AvatarComponent } from 'ui';

@Component({
  selector: 'app-avatar-states-example',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar image="https://i.pravatar.cc/150?img=5" name="Available collaborator" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">default</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar name="Seat locked" [disabled]="true" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">disabled</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:center">
        <ui-avatar name="Syncing portrait" image="https://i.pravatar.cc/150?img=8" [loading]="true" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">loading</span>
      </div>
    </div>
  `,
})
export class AvatarStatesExampleComponent {}
```

## Collaborator strip
```ts
import { Component } from '@angular/core';
import { AvatarComponent, ButtonComponent } from 'ui';

@Component({
  selector: 'app-avatar-workspace-strip-example',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;justify-content:space-between;width:100%;max-width:42rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
    >
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem">
        <span style="font-size:0.8125rem;font-weight:600">Design review</span>
        <span
          style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);padding:0 0.35rem"
        >
          ·
        </span>
        <div style="display:flex;align-items:center">
          <ui-avatar size="small" shape="circular" image="https://i.pravatar.cc/150?img=3" name="Ana Costa" />
          <ui-avatar
            style="margin-left:-0.35rem"
            size="small"
            shape="circular"
            name="Leo Hart"
            initials="LH"
          />
          <ui-avatar
            style="margin-left:-0.35rem"
            size="small"
            shape="circular"
            name="Priya Nair"
            initials="PN"
          />
        </div>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">+4</span>
      </div>
      <ui-button type="button" variant="secondary" appearance="outline">Join room</ui-button>
    </div>
  `,
})
export class AvatarWorkspaceStripExampleComponent {}
```

## Profile header
```ts
import { Component } from '@angular/core';
import { AvatarComponent, ButtonComponent } from 'ui';

@Component({
  selector: 'app-avatar-profile-header-example',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem"
    >
      <ui-avatar
        size="large"
        shape="circular"
        image="https://i.pravatar.cc/150?img=15"
        name="Nadia Ibrahim"
      />
      <div style="flex:1;min-width:12rem;display:flex;flex-direction:column;gap:0.2rem">
        <span style="font-size:1rem;font-weight:600">Nadia Ibrahim</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Program manager · Berlin
        </span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last active today · 14 direct reports in directory
        </span>
      </div>
      <ui-button type="button" variant="primary">Message</ui-button>
    </div>
  `,
})
export class AvatarProfileHeaderExampleComponent {}
```

## Accessibility

### Accessible name
The host is `role="img"`. Provide `ariaLabel`, or `name` (also used for initials), or rely on i18n fallback text. When only `initials` are shown, set `ariaLabel` if those letters are not enough to identify the person or workspace.

### Photograph
Inner `<img>` uses an empty `alt` because the host carries the name; avoid duplicating long descriptions on both layers.

### Busy and disabled
`loading` sets `aria-busy="true"`. `disabled` sets `aria-disabled="true"` while the surface stays in the tree for layout continuity.
