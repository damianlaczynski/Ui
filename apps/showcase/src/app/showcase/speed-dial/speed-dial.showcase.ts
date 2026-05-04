import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MenuItem, SpeedDialComponent, TableOfContentComponent } from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';

@Component({
  selector: 'app-speed-dial-showcase',
  standalone: true,
  imports: [
    CommonModule,
    SpeedDialComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
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
      <div class="showcase-content speed-dial-showcase">
        <app-showcase-header title="Speed dial" />
        <p class="showcase__description">
          A floating action button that reveals related actions in a circular, linear, or arc
          layout. The trigger exposes <code>aria-haspopup</code>, <code>aria-expanded</code>, and
          <code>aria-controls</code> tied to a <code>role="menu"</code> list; each action uses
          <code>role="menuitem"</code> with an accessible label. Optional
          <code>autoCloseIdleMs</code> closes the menu after a timeout if no action is chosen. Only
          one dial stays open at a time by default (<code>coordinateWithOthers</code>); closed
          triggers stay under another dial&rsquo;s mask (stacking).
        </p>

        <app-section-with-drawer
          sectionTitle="Linear"
          sectionDescription="Triggers on the canvas edges: Up at the bottom center, Down at the top, Right on the left edge (actions open to the right), Left on the right edge (actions open to the left)."
          [formConfig]="[]"
          [formValues]="{}"
        >
          <div class="speed-dial-showcase__canvas speed-dial-showcase__canvas--linear">
            <div class="speed-dial-showcase__hub" aria-hidden="true">Linear</div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-up">
              <span class="speed-dial-showcase__slot-label">Up</span>
              <ui-speed-dial
                dialType="linear"
                direction="up"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Linear up"
                (show)="log('linear up: open')"
                (hide)="log('linear up: close')"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-down">
              <span class="speed-dial-showcase__slot-label">Down</span>
              <ui-speed-dial
                dialType="linear"
                direction="down"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Linear down"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-left">
              <span class="speed-dial-showcase__slot-label">Left</span>
              <ui-speed-dial
                dialType="linear"
                direction="left"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Linear left"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-right">
              <span class="speed-dial-showcase__slot-label">Right</span>
              <ui-speed-dial
                dialType="linear"
                direction="right"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Linear right"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Circle"
          sectionDescription="Full circle of actions around a single trigger in the center of the field."
          [formConfig]="[]"
          [formValues]="{}"
        >
          <div class="speed-dial-showcase__canvas speed-dial-showcase__canvas--circle">
            <ui-speed-dial
              dialType="circle"
              [radius]="72"
              [itemSizePx]="40"
              [gap]="6"
              [items]="baseItems()"
              [triggerButtonProps]="{ variant: 'primary', appearance: 'filled', shape: 'circular' }"
              ariaLabel="Radial actions"
            />
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Semi-circle"
          sectionDescription="Same edge placement as linear: half-circle opens from each side into the field."
          [formConfig]="[]"
          [formValues]="{}"
        >
          <div class="speed-dial-showcase__canvas speed-dial-showcase__canvas--semi">
            <div class="speed-dial-showcase__hub" aria-hidden="true">Semi</div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-down">
              <span class="speed-dial-showcase__slot-label">Down</span>
              <ui-speed-dial
                dialType="semi-circle"
                direction="down"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi down"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-up">
              <span class="speed-dial-showcase__slot-label">Up</span>
              <ui-speed-dial
                dialType="semi-circle"
                direction="up"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi up"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-left">
              <span class="speed-dial-showcase__slot-label">Left</span>
              <ui-speed-dial
                dialType="semi-circle"
                direction="left"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi left"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--linear-right">
              <span class="speed-dial-showcase__slot-label">Right</span>
              <ui-speed-dial
                dialType="semi-circle"
                direction="right"
                [radius]="60"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Semi right"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Quarter circle"
          sectionDescription="Four corners of one field: each trigger sits in a corner; the arc opens into that quadrant (up-left, up-right, down-left, down-right)."
          [formConfig]="[]"
          [formValues]="{}"
        >
          <div class="speed-dial-showcase__canvas speed-dial-showcase__canvas--quarter">
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--quarter-tl">
              <span class="speed-dial-showcase__slot-label">Down right</span>
              <ui-speed-dial
                dialType="quarter-circle"
                direction="down-right"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter down-right"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--quarter-tr">
              <span class="speed-dial-showcase__slot-label">Down left</span>
              <ui-speed-dial
                dialType="quarter-circle"
                direction="down-left"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter down-left"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--quarter-bl">
              <span class="speed-dial-showcase__slot-label">Up right</span>
              <ui-speed-dial
                dialType="quarter-circle"
                direction="up-right"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter up-right"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--quarter-br">
              <span class="speed-dial-showcase__slot-label">Up left</span>
              <ui-speed-dial
                dialType="quarter-circle"
                direction="up-left"
                [radius]="72"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Quarter up-left"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Mask, idle, tooltips"
          sectionDescription="Idle timeout, modal mask, and item tooltips on one board."
          [formConfig]="[]"
          [formValues]="{}"
        >
          <div class="speed-dial-showcase__canvas speed-dial-showcase__canvas--extras">
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--extra">
              <span class="speed-dial-showcase__slot-label">Idle 5s</span>
              <ui-speed-dial
                dialType="linear"
                direction="up"
                [autoCloseIdleMs]="5000"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="Auto-close idle"
                (hide)="log('idle: ' + $event.type)"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--extra">
              <span class="speed-dial-showcase__slot-label">Mask</span>
              <ui-speed-dial
                dialType="linear"
                direction="up"
                [mask]="true"
                [itemSizePx]="40"
                [gap]="6"
                [items]="baseItems()"
                [triggerButtonProps]="{
                  variant: 'primary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="With mask"
              />
            </div>
            <div class="speed-dial-showcase__slot speed-dial-showcase__slot--extra">
              <span class="speed-dial-showcase__slot-label">Tooltips</span>
              <ui-speed-dial
                dialType="linear"
                direction="up"
                [showTooltips]="true"
                [tooltipOptions]="{ tooltipPosition: 'left' }"
                [itemSizePx]="40"
                [gap]="6"
                [items]="labeledItems()"
                [triggerButtonProps]="{
                  variant: 'secondary',
                  appearance: 'filled',
                  shape: 'circular',
                }"
                ariaLabel="With tooltips"
              />
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Event log</h2>
          <p class="showcase__section__description">Recent showcase events.</p>
          <div class="event-log">
            @for (entry of eventLog(); track $index) {
              <div class="event-log-item">{{ entry }}</div>
            }
            @if (eventLog().length === 0) {
              <div class="event-log-empty">No events yet.</div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .showcase__option-section__box {
        overflow: visible;
      }

      .speed-dial-showcase {
        overflow: visible;
      }

      .speed-dial-showcase__canvas {
        position: relative;
        box-sizing: border-box;
        overflow: visible;
        border: 1px solid var(--color-neutral-stroke1-rest);
        border-radius: 8px;
        background: var(--color-neutral-background1-rest);
        box-shadow:
          0 1px 3px rgb(0 0 0 / 10%),
          inset 0 0 0 1px var(--color-neutral-stroke2-rest);
      }

      .speed-dial-showcase__canvas--linear,
      .speed-dial-showcase__canvas--semi {
        display: grid;
        grid-template-columns: minmax(88px, 1fr) auto minmax(88px, 1fr);
        grid-template-rows: minmax(112px, auto) minmax(160px, 1fr) minmax(112px, auto);
        grid-template-areas:
          '. edgeDown .'
          'edgeOpenRight hub edgeOpenLeft'
          '. edgeUp .';
        min-height: 420px;
        padding: 12px 28px 20px;
        align-items: center;
        justify-items: center;
      }

      .speed-dial-showcase__hub {
        grid-area: hub;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-neutral-foreground3-rest);
        user-select: none;
      }

      .speed-dial-showcase__slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        overflow: visible;
      }

      .speed-dial-showcase__slot-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--color-neutral-foreground3-rest);
        white-space: nowrap;
      }

      .speed-dial-showcase__slot--linear-up {
        grid-area: edgeUp;
        align-self: end;
        justify-self: center;
      }

      .speed-dial-showcase__slot--linear-down {
        grid-area: edgeDown;
        align-self: start;
        justify-self: center;
      }

      .speed-dial-showcase__slot--linear-right {
        grid-area: edgeOpenRight;
        justify-self: start;
        align-self: center;
      }

      .speed-dial-showcase__slot--linear-left {
        grid-area: edgeOpenLeft;
        justify-self: end;
        align-self: center;
      }

      .speed-dial-showcase__canvas--circle {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 380px;
        padding: 48px 32px;
      }

      .speed-dial-showcase__canvas--quarter {
        min-height: 440px;
        padding: 48px;
      }

      .speed-dial-showcase__slot--quarter-tl {
        position: absolute;
        top: 28px;
        left: 28px;
        align-items: flex-start;
      }

      .speed-dial-showcase__slot--quarter-tr {
        position: absolute;
        top: 28px;
        right: 28px;
        align-items: flex-end;
      }

      .speed-dial-showcase__slot--quarter-bl {
        position: absolute;
        bottom: 28px;
        left: 28px;
        align-items: flex-start;
      }

      .speed-dial-showcase__slot--quarter-br {
        position: absolute;
        bottom: 28px;
        right: 28px;
        align-items: flex-end;
      }

      .speed-dial-showcase__canvas--extras {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 28px 20px;
        min-height: 260px;
        padding: 28px 24px 32px;
        align-items: end;
        justify-items: center;
      }

      @media (min-width: 960px) {
        .speed-dial-showcase__canvas--extras {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: end;
        }
      }

      .speed-dial-showcase__slot--extra {
        min-height: 200px;
        justify-content: flex-end;
      }

      .event-log {
        max-height: 200px;
        overflow: auto;
        border-radius: 8px;
        border: 1px solid var(--color-neutral-stroke1-rest);
        padding: 12px;
        font-size: 13px;
        background: var(--color-neutral-background1-rest);
      }

      .event-log-item {
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-stroke2-rest);
      }

      .event-log-item:last-child {
        border-bottom: none;
      }

      .event-log-empty {
        color: var(--color-neutral-foreground3-rest);
      }
    `,
  ],
})
export class SpeedDialShowcaseComponent {
  eventLog = signal<string[]>([]);

  baseItems = signal<MenuItem[]>(this.buildBaseItems());
  labeledItems = signal<MenuItem[]>(this.buildLabeledItems());

  private buildBaseItems(): MenuItem[] {
    return [
      {
        id: 'edit',
        label: '',
        icon: 'edit',
        action: () => this.log('action: edit'),
      },
      {
        id: 'refresh',
        label: '',
        icon: 'arrow_sync',
        action: () => this.log('action: refresh'),
      },
      {
        id: 'delete',
        label: '',
        icon: 'delete',
        action: () => this.log('action: delete'),
      },
      {
        id: 'open',
        label: '',
        icon: 'open',
        action: () => this.log('action: open'),
      },
    ];
  }

  private buildLabeledItems(): MenuItem[] {
    return [
      {
        id: 'Add',
        label: '',
        icon: 'add',
        action: () => this.log('action: add'),
      },
      {
        id: 'Update',
        label: '',
        icon: 'arrow_sync',
        action: () => this.log('action: update'),
      },
      {
        id: 'Remove',
        label: '',
        icon: 'delete',
        action: () => this.log('action: remove'),
      },
    ];
  }

  log(message: string): void {
    this.eventLog.update(entries => [message, ...entries].slice(0, 12));
  }
}
