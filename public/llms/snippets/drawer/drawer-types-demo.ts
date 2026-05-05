import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-types-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        <ui-button appearance="outline" (click)="overlayVisible.set(true)"
          >Overlay drawer</ui-button
        >
        <ui-button appearance="outline" (click)="inlineVisible.set(true)">Inline drawer</ui-button>
      </div>

      <div
        style="display:flex;flex-direction:row;align-items:stretch;gap:1rem;min-height:28rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);overflow:hidden"
      >
        <div
          style="flex:1;min-width:0;max-width:22rem;font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest);display:flex;flex-direction:column;gap:0.75rem"
        >
          <p style="margin:0">
            This bordered region represents part of a page. Inline mode keeps the panel inside the
            host layout — it needs enough height and a horizontal row so the panel can sit beside
            the narrative copy.
          </p>
          <p style="margin:0">
            The overlay variant is rendered below, outside this card, spanning the full viewport.
          </p>
        </div>
        <div
          style="display:flex;align-items:stretch;justify-content:flex-end;flex-shrink:0;min-height:0"
        >
          <ui-drawer
            title="Inline panel"
            type="inline"
            position="right"
            size="medium"
            [(visible)]="inlineVisible"
            [primaryAction]="closeInlineAction()"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.75rem;color:var(--color-neutral-foreground-rest);font-size:0.875rem;line-height:1.55"
            >
              <p style="margin:0">
                Use inline drawers for filters, contextual review, or stacked tools that should feel
                anchored to the workspace instead of masking the whole app.
              </p>
              <p style="margin:0">
                When you need a focused task that blocks the rest of the UI, prefer an overlay
                drawer.
              </p>
            </div>
          </ui-drawer>
        </div>
      </div>

      <ui-drawer
        title="Overlay panel"
        bodyText="Overlay mode pauses the chrome behind the panel and is ideal for confirmations, multi-step edits, or transient forms."
        type="overlay"
        [(visible)]="overlayVisible"
        [primaryAction]="closeOverlayAction()"
      />
    </div>
  `,
})
export class DrawerTypesExampleComponent {
  protected readonly overlayVisible = model(false);
  protected readonly inlineVisible = model(false);

  protected readonly closeInlineAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.inlineVisible.set(false),
  });

  protected readonly closeOverlayAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.overlayVisible.set(false),
  });
}
