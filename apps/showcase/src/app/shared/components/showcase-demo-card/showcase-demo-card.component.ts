import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardAppearance, CardComponent } from 'ui';

@Component({
  selector: 'app-showcase-demo-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <ui-card
      [appearance]="appearance()"
      size="small"
      [attr.style]="fullHeight() ? 'height: 100%;' : null"
    >
      <div uiCardHeader class="showcase-demo-card__header">
        <div class="showcase-demo-card__head">
          <strong class="showcase-demo-card__title">{{ title() }}</strong>
          @if (subtitle()) {
            <span class="showcase-demo-card__subtitle">{{ subtitle() }}</span>
          }
        </div>
        @if (badge()) {
          <span class="showcase-demo-card__badge">{{ badge() }}</span>
        }
      </div>
      <div uiCardBody class="showcase-demo-card__body">
        <ng-content />
      </div>
    </ui-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .showcase-demo-card__header {
        padding: 12px 14px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .showcase-demo-card__head {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .showcase-demo-card__title {
        color: var(--color-neutral-foreground-rest);
        line-height: 1.35;
      }

      .showcase-demo-card__subtitle {
        font-size: 12px;
        color: var(--color-neutral-foreground3-rest);
        line-height: 1.3;
      }

      .showcase-demo-card__badge {
        border-radius: 999px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-brand-foreground-link-rest, #0f6cbd);
        background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
        white-space: nowrap;
      }

      .showcase-demo-card__body {
        padding: 8px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: var(--color-neutral-foreground2-rest);
      }

      .showcase-demo-card__body > p,
      .showcase-demo-card__body > ul {
        margin: 0;
      }

      .showcase-demo-card__body > ul {
        padding-inline-start: 18px;
      }
    `,
  ],
})
export class ShowcaseDemoCardComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  badge = input<string>('');
  appearance = input<CardAppearance>('outline');
  fullHeight = input<boolean>(true);
}
