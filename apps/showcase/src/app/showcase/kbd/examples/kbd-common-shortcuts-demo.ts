import { Component } from '@angular/core';
import { KbdComponent } from 'ui';

@Component({
  selector: 'app-kbd-common-shortcuts-demo',
  standalone: true,
  imports: [KbdComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:28rem">
      @for (shortcut of shortcuts; track shortcut.label) {
        <div
          style="display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <span style="font-size:0.875rem">{{ shortcut.label }}</span>
          <div style="display:flex;gap:0.375rem;align-items:center;flex-wrap:wrap">
            @for (key of shortcut.keys; track key) {
              <ui-kbd [text]="key" appearance="filled" />
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class KbdCommonShortcutsDemoComponent {
  protected readonly shortcuts = [
    { label: 'Copy selection', keys: ['Ctrl', 'C'] },
    { label: 'Paste clipboard', keys: ['Ctrl', 'V'] },
    { label: 'Undo last action', keys: ['Ctrl', 'Z'] },
    { label: 'Search in page', keys: ['Ctrl', 'F'] },
  ];
}
