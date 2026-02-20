import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AvatarComponent,
  ButtonComponent,
  CardAppearance,
  CardComponent,
  CardFocusMode,
  CardOnSelectionChangeEvent,
  CheckboxComponent,
  MenuComponent,
  MenuItem,
  Orientation,
  Size,
  TableOfContentComponent,
} from 'ui';

import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { CardInteractiveComponent } from './card.interactive';
import {
  CARD_APPEARANCES,
  CARD_DRAWER_CONFIGS,
  CARD_FOCUS_MODES,
  CARD_SIZES,
} from './card.showcase.config';

interface CardFormState {
  size: Size;
  orientation: Orientation;
  focusMode: CardFocusMode;
  interactive: boolean;
  selectable: boolean;
  checkbox: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    AvatarComponent,
    ButtonComponent,
    MenuComponent,
    CheckboxComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    CardInteractiveComponent,
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

      <div class="showcase-content card-showcase">
        <app-showcase-header title="Card" />
        <p class="showcase__description">
          Card groups related content and actions in one container. This showcase focuses on
          slot-based composition, focus modes, selection, and integration with existing ui-checkbox
          and ui-menu components.
        </p>

        <app-section-with-drawer
          sectionTitle="Appearance"
          sectionDescription="Appearance controls visual emphasis. Use filled by default, filled-alternative for slightly darker surfaces, outline for transparent surfaces with border, and subtle for minimal chrome."
          [formConfig]="appearanceDrawerFormConfig"
          [formValues]="appearanceFormValues()"
          (formValuesChange)="appearanceFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (appearance of appearances; track appearance) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ appearance | titlecase }}</h3>
                <ui-card
                  [appearance]="appearance"
                  [size]="appearanceForm().size"
                  [orientation]="appearanceForm().orientation"
                  [focusMode]="appearanceForm().focusMode"
                  [interactive]="appearanceForm().interactive"
                  [selectable]="appearanceForm().selectable"
                  [checkbox]="appearanceForm().checkbox"
                  [disabled]="appearanceForm().disabled"
                  ariaLabel="Project summary card"
                  (cardClick)="onCardClick('appearance')"
                  (selectionChange)="onCardSelectionChange('appearance', $event)"
                >
                  <div
                    uiCardPreview
                    class="card-showcase__preview card-showcase__preview--report"
                  ></div>

                  <div uiCardHeader class="card-showcase__header">
                    <div class="card-showcase__logo">PRJ</div>
                    <div class="card-showcase__header-text">
                      <h3 class="card-showcase__title">Q1 launch dashboard</h3>
                      <p class="card-showcase__subtitle">Product team - updated 15m ago</p>
                    </div>
                    <ui-menu
                      triggerVariant="button"
                      icon="more_horizontal"
                      appearance="subtle"
                      [menuItems]="cardMenuItems"
                      ariaLabel="More actions"
                      (menuItemClick)="onMenuAction('appearance', $event)"
                    />
                  </div>

                  <div uiCardBody class="card-showcase__body">
                    <p class="card-showcase__body-text">
                      Sprint burn-down is at 68%, with 3 blockers and 5 tasks waiting for review.
                    </p>
                    <div class="card-showcase__meta-row">
                      <span class="card-showcase__pill">3 blockers</span>
                      <span class="card-showcase__pill">5 reviews</span>
                      <span class="card-showcase__pill card-showcase__pill--good">On track</span>
                    </div>
                  </div>

                  <div uiCardFooter>
                    <ui-button
                      variant="primary"
                      appearance="filled"
                      icon="open"
                      (click)="onActionClick('appearance: open board')"
                    >
                      Open
                    </ui-button>
                    <ui-button
                      variant="secondary"
                      appearance="outline"
                      icon="share"
                      (click)="onActionClick('appearance: share update')"
                    >
                      Share
                    </ui-button>
                  </div>
                </ui-card>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Size"
          sectionDescription="Size changes card spacing and corner radius."
          [formConfig]="sizeDrawerFormConfig"
          [formValues]="sizeFormValues()"
          (formValuesChange)="sizeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (size of sizes; track size) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ size | titlecase }}</h3>
                <ui-card
                  [appearance]="sizeForm().appearance"
                  [size]="size"
                  [orientation]="sizeForm().orientation"
                  [focusMode]="sizeForm().focusMode"
                  [interactive]="sizeForm().interactive"
                  [selectable]="sizeForm().selectable"
                  [checkbox]="sizeForm().checkbox"
                  [disabled]="sizeForm().disabled"
                  ariaLabel="Automation card"
                  (cardClick)="onCardClick('size')"
                >
                  <div uiCardHeader class="card-showcase__header">
                    <div class="card-showcase__logo card-showcase__logo--alt">AUT</div>
                    <div class="card-showcase__header-text">
                      <h3 class="card-showcase__title">Incident runbook</h3>
                      <p class="card-showcase__subtitle">Ops workspace</p>
                    </div>
                  </div>

                  <p uiCardBody class="card-showcase__body">
                    If deployment fails, collect logs, notify on-call, and open an incident thread.
                  </p>

                  <div uiCardFooter class="card-showcase__mini-footer">
                    <span>Runs/day: 42</span>
                    <span>Success: 97%</span>
                  </div>
                </ui-card>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Orientation"
          sectionDescription="Orientation switches card anatomy between vertical and horizontal layout."
          [formConfig]="orientationDrawerFormConfig"
          [formValues]="orientationFormValues()"
          (formValuesChange)="orientationFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (orientation of orientations; track orientation) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ orientation | titlecase }}</h3>
                <ui-card
                  [appearance]="orientationForm().appearance"
                  [size]="orientationForm().size"
                  [orientation]="orientation"
                  [focusMode]="orientationForm().focusMode"
                  [interactive]="orientationForm().interactive"
                  [selectable]="orientationForm().selectable"
                  [checkbox]="orientationForm().checkbox"
                  [disabled]="orientationForm().disabled"
                  ariaLabel="Orientation demo card"
                >
                  <div
                    uiCardPreview
                    class="card-showcase__preview card-showcase__preview--logo"
                  ></div>

                  <div uiCardHeader class="card-showcase__header">
                    <div class="card-showcase__logo">DOC</div>
                    <div class="card-showcase__header-text">
                      <h3 class="card-showcase__title">Design handoff package</h3>
                      <p class="card-showcase__subtitle">4 screens ready for dev review</p>
                    </div>
                    <ui-menu
                      triggerVariant="button"
                      icon="more_horizontal"
                      appearance="subtle"
                      [menuItems]="cardMenuItems"
                      ariaLabel="More actions"
                      (menuItemClick)="onMenuAction('orientation', $event)"
                    />
                  </div>
                </ui-card>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Focus Mode"
          sectionDescription="Focus modes define keyboard navigation behavior for interactive content inside the card."
          [formConfig]="focusModeDrawerFormConfig"
          [formValues]="focusModeFormValues()"
          (formValuesChange)="focusModeFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            @for (mode of focusModes; track mode) {
              <div class="showcase__item">
                <h3 class="showcase__item__title">{{ mode }}</h3>
                <ui-card
                  [appearance]="focusModeForm().appearance"
                  [size]="focusModeForm().size"
                  [orientation]="focusModeForm().orientation"
                  [focusMode]="mode"
                  [interactive]="focusModeForm().interactive"
                  [selectable]="focusModeForm().selectable"
                  [checkbox]="focusModeForm().checkbox"
                  [disabled]="focusModeForm().disabled"
                  ariaLabel="Focusable card in mode {{ mode }}"
                  (cardClick)="onCardClick('focus mode')"
                >
                  <div uiCardHeader class="card-showcase__header">
                    <div class="card-showcase__logo">DOC</div>
                    <div class="card-showcase__header-text">
                      <h3 class="card-showcase__title">Release notes draft</h3>
                      <p class="card-showcase__subtitle">Mode: {{ mode }}</p>
                    </div>
                  </div>

                  <p uiCardBody class="card-showcase__body">
                    Use Enter to engage focus management, then navigate actions with Tab.
                  </p>

                  <div uiCardFooter>
                    <ui-button
                      variant="primary"
                      appearance="outline"
                      icon="open"
                      (click)="onActionClick('focus: open')"
                    >
                      Open
                    </ui-button>
                    <ui-button
                      variant="secondary"
                      appearance="outline"
                      icon="share"
                      (click)="onActionClick('focus: share')"
                    >
                      Share
                    </ui-button>
                  </div>
                </ui-card>
              </div>
            }
          </div>
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="States"
          sectionDescription="State presets for normal, selected, and disabled cards."
          [formConfig]="statesDrawerFormConfig"
          [formValues]="statesFormValues()"
          (formValuesChange)="statesFormValues.set($event)"
        >
          <div class="showcase__grid showcase__grid--large">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Selectable with projected checkbox</h3>
              <ui-card
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
                [focusMode]="statesForm().focusMode"
                [interactive]="true"
                [selectable]="true"
                [selected]="selectedWithProjectedCheckbox()"
                ariaLabelledBy="card-title-selection"
                (selectionChange)="onProjectedSelectableChange($event)"
              >
                <ui-checkbox
                  uiCardCheckbox
                  [label]="''"
                  [size]="statesForm().size"
                  ariaLabel="Select design handoff"
                  [ngModel]="selectedWithProjectedCheckbox()"
                  [ngModelOptions]="{ standalone: true }"
                  (click)="$event.stopPropagation()"
                  (change)="onProjectedCheckboxChange($event)"
                />

                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__logo">UI</div>
                  <div class="card-showcase__header-text">
                    <h3 id="card-title-selection" class="card-showcase__title">Design handoff</h3>
                    <p class="card-showcase__subtitle">12 assets ready</p>
                  </div>
                </div>

                <p uiCardBody class="card-showcase__body">
                  Card surface and checkbox keep the same selection state.
                </p>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Selected preset</h3>
              <ui-card
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
                [focusMode]="statesForm().focusMode"
                [interactive]="true"
                [selected]="true"
                ariaLabel="Selected card"
              >
                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__logo">SEL</div>
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Selected state</h3>
                    <p class="card-showcase__subtitle">Visible selected styling</p>
                  </div>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Disabled preset</h3>
              <ui-card
                [appearance]="statesForm().appearance"
                [size]="statesForm().size"
                [orientation]="statesForm().orientation"
                [focusMode]="statesForm().focusMode"
                [interactive]="true"
                [selectable]="true"
                [checkbox]="true"
                [disabled]="true"
                ariaLabel="Disabled card"
              >
                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__logo">OFF</div>
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Disabled state</h3>
                    <p class="card-showcase__subtitle">No interaction available</p>
                  </div>
                </div>
              </ui-card>
            </div>
          </div>
        </app-section-with-drawer>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Real-world templates</h2>
          <p class="showcase__section__description">
            Practical card examples for common product surfaces: product, informational, invitation,
            notification, user profile, and photo cards.
          </p>
          <div class="showcase__grid showcase__grid--large card-showcase__templates">
            <div class="showcase__item">
              <h3 class="showcase__item__title">Product card</h3>
              <ui-card appearance="filled" [interactive]="true" ariaLabel="Product card">
                <div
                  uiCardPreview
                  class="card-showcase__preview card-showcase__preview--product"
                ></div>

                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Noise canceling headphones</h3>
                    <p class="card-showcase__subtitle">$249 - In stock</p>
                  </div>
                  <ui-menu
                    triggerVariant="button"
                    icon="more_horizontal"
                    appearance="outline"
                    [menuItems]="cardMenuItems"
                    ariaLabel="More product actions"
                    (menuItemClick)="onMenuAction('template product', $event)"
                  />
                </div>

                <div uiCardBody class="card-showcase__body">
                  <p class="card-showcase__body-text">
                    Adaptive ANC, 40h battery, low-latency mode.
                  </p>
                  <p class="card-showcase__stat-line">Rating: 4.8/5 from 1,294 reviews</p>
                </div>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template product: add to cart')"
                  >
                    Add to cart
                  </ui-button>
                  <ui-button
                    variant="secondary"
                    appearance="outline"
                    (click)="onActionClick('template product: compare')"
                  >
                    Compare
                  </ui-button>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Informational card</h3>
              <ui-card appearance="outline" [interactive]="true" ariaLabel="Informational card">
                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__logo card-showcase__logo--info">INF</div>
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Planned maintenance</h3>
                    <p class="card-showcase__subtitle">Sunday, 02:00-03:30 UTC</p>
                  </div>
                </div>

                <p uiCardBody class="card-showcase__body">
                  Analytics and exports will be in read-only mode during the maintenance window.
                </p>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template info: details')"
                  >
                    View details
                  </ui-button>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Invitation card</h3>
              <ui-card
                appearance="filled-alternative"
                [interactive]="true"
                ariaLabel="Invitation card"
              >
                <div
                  uiCardPreview
                  class="card-showcase__preview card-showcase__preview--invite"
                ></div>

                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Team offsite invitation</h3>
                    <p class="card-showcase__subtitle">Thu, Mar 19 - City Hall</p>
                  </div>
                </div>

                <div uiCardBody class="card-showcase__body">
                  <p class="card-showcase__body-text">
                    Product, design, and engineering planning day. RSVP by Monday.
                  </p>
                  <div class="card-showcase__meta-row">
                    <span class="card-showcase__pill">24 invited</span>
                    <span class="card-showcase__pill">15 confirmed</span>
                  </div>
                </div>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template invite: accept')"
                  >
                    Accept
                  </ui-button>
                  <ui-button
                    variant="secondary"
                    appearance="outline"
                    (click)="onActionClick('template invite: decline')"
                  >
                    Decline
                  </ui-button>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Notification card</h3>
              <ui-card appearance="outline" [interactive]="true" ariaLabel="Notification card">
                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__logo card-showcase__logo--warning">ALR</div>
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Build pipeline failed</h3>
                    <p class="card-showcase__subtitle">2 minutes ago - api-gateway</p>
                  </div>
                  <ui-menu
                    triggerVariant="button"
                    icon="more_horizontal"
                    appearance="subtle"
                    [menuItems]="cardMenuItems"
                    ariaLabel="More notification actions"
                    (menuItemClick)="onMenuAction('template notification', $event)"
                  />
                </div>

                <p uiCardBody class="card-showcase__body">
                  Coverage dropped below threshold after commit 3f2a1d. Check failed tests and
                  rerun.
                </p>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template notification: investigate')"
                  >
                    Investigate
                  </ui-button>
                  <ui-button
                    variant="secondary"
                    appearance="outline"
                    (click)="onActionClick('template notification: mute')"
                  >
                    Mute
                  </ui-button>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">User profile card</h3>
              <ui-card
                appearance="filled-alternative"
                [interactive]="true"
                ariaLabel="User profile card"
              >
                <div uiCardHeader class="card-showcase__header card-showcase__header">
                  <ui-avatar name="Adriana Nowak" variant="primary" appearance="filled" />
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Adriana Nowak</h3>
                    <p class="card-showcase__subtitle card-showcase__subtitle--role">
                      Senior Product Designer
                    </p>
                  </div>
                  <ui-menu
                    triggerVariant="button"
                    icon="more_horizontal"
                    appearance="subtle"
                    [menuItems]="cardMenuItems"
                    ariaLabel="More profile actions"
                    (menuItemClick)="onMenuAction('template user', $event)"
                  />
                </div>

                <p uiCardBody class="card-showcase__body">
                  Leads discovery workshops, coordinates design reviews, and mentors the interface
                  guild.
                </p>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template user: message')"
                  >
                    Message
                  </ui-button>
                  <ui-button
                    variant="secondary"
                    appearance="outline"
                    (click)="onActionClick('template user: view profile')"
                  >
                    View profile
                  </ui-button>
                </div>
              </ui-card>
            </div>

            <div class="showcase__item">
              <h3 class="showcase__item__title">Photo card (1:1)</h3>
              <ui-card appearance="outline" [interactive]="true" ariaLabel="Square photo card">
                <div uiCardHeader class="card-showcase__header">
                  <div class="card-showcase__header-text">
                    <h3 class="card-showcase__title">Photo highlight</h3>
                    <p class="card-showcase__subtitle">
                      Square crop, cover fit, full-bleed preview.
                    </p>
                  </div>
                  <ui-menu
                    triggerVariant="button"
                    icon="more_horizontal"
                    appearance="subtle"
                    [menuItems]="cardMenuItems"
                    ariaLabel="More photo actions"
                    (menuItemClick)="onMenuAction('template photo', $event)"
                  />
                </div>

                <div uiCardBody class="card-showcase__body card-showcase__body--media">
                  <div class="card-showcase__media-1x1">
                    <img
                      class="card-showcase__image-1x1"
                      src="https://picsum.photos/640/640?random=31"
                      alt="Coastal landscape at sunset"
                    />
                  </div>
                </div>

                <div uiCardFooter>
                  <ui-button
                    variant="primary"
                    appearance="filled"
                    (click)="onActionClick('template photo: open gallery')"
                  >
                    Open gallery
                  </ui-button>
                  <ui-button
                    variant="secondary"
                    appearance="outline"
                    (click)="onActionClick('template photo: save')"
                  >
                    Save
                  </ui-button>
                </div>
              </ui-card>
            </div>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Event log</h2>
          <p class="showcase__section__description">
            Interaction events from cards, actions, and menu items.
          </p>
          <div class="event-log">
            @for (entry of eventLog(); track entry) {
              <div class="event-log-item">{{ entry }}</div>
            }
            @if (eventLog().length === 0) {
              <div class="event-log-empty">No events yet.</div>
            }
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Test Card props live: appearance, size, orientation, focus mode, interactivity, and
            selection behavior.
          </p>
          <app-card-interactive />
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .card-showcase__preview {
        width: 100%;
        min-height: 140px;
        border-radius: 4px;
      }

      .card-showcase__preview--report {
        background:
          linear-gradient(135deg, rgb(227 241 255) 0%, rgb(200 225 252) 100%),
          repeating-linear-gradient(
            180deg,
            transparent,
            transparent 14px,
            rgb(255 255 255 / 55%) 14px,
            rgb(255 255 255 / 55%) 16px
          );
      }

      .card-showcase__preview--logo {
        background: linear-gradient(135deg, rgb(245 247 250) 0%, rgb(223 228 234) 100%);
        min-height: 96px;
      }

      .card-showcase__preview--product {
        background:
          radial-gradient(circle at 20% 20%, rgb(255 255 255 / 60%) 0, transparent 28%),
          linear-gradient(150deg, rgb(238 245 255) 0%, rgb(211 226 250) 45%, rgb(188 206 238) 100%);
      }

      .card-showcase__preview--invite {
        background:
          linear-gradient(125deg, rgb(254 241 226) 0%, rgb(249 219 182) 100%),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 16px,
            rgb(255 255 255 / 45%) 16px,
            rgb(255 255 255 / 45%) 18px
          );
      }

      .card-showcase__image-1x1 {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card-showcase__header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .card-showcase [uiCardHeader] {
        padding: var(--card-padding) var(--card-padding);
      }

      .card-showcase [uiCardBody] {
        padding-inline: var(--card-padding);
      }

      .card-showcase [uiCardBody]:last-child {
        padding-bottom: var(--card-padding);
      }

      .card-showcase [uiCardFooter] {
        padding: var(--card-padding) var(--card-padding);
      }

      .card-showcase__header--center {
        align-items: center;
      }

      .card-showcase__header-text {
        min-width: 0;
        flex: 1;
      }

      .card-showcase__title {
        margin: 0;
        font-size: 14px;
        line-height: 20px;
      }

      .card-showcase__subtitle {
        margin: 2px 0 0;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-neutral-foreground3-rest);
      }

      .card-showcase__subtitle--role {
        font-weight: 600;
      }

      .card-showcase__body {
        margin: 0;
      }

      .card-showcase__body-text {
        margin: 0;
      }

      .card-showcase__body--media {
        padding-inline: 0 !important;
      }

      .card-showcase__media-1x1 {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
      }

      .card-showcase__meta-row {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .card-showcase__pill {
        border-radius: 999px;
        padding: 2px 8px;
        font-size: 11px;
        line-height: 16px;
        background: var(--color-neutral-background3-rest);
        color: var(--color-neutral-foreground2-rest);
      }

      .card-showcase__pill--good {
        background: rgb(218 242 221);
        color: rgb(14 92 25);
      }

      .card-showcase__stat-line {
        margin: 8px 0 0;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-neutral-foreground3-rest);
      }

      .card-showcase__mini-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-neutral-foreground3-rest);
      }

      .card-showcase__logo {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        color: var(--color-neutral-foreground-on-brand);
        background: var(--color-brand-primary);
        flex-shrink: 0;
      }

      .card-showcase__logo--alt {
        background: var(--color-shared-blue-foreground);
      }

      .card-showcase__logo--info {
        background: rgb(5 74 142);
      }

      .card-showcase__logo--warning {
        background: rgb(143 47 22);
      }

      .card-showcase__templates .showcase__item > ui-card {
        height: 100%;
      }
    `,
  ],
})
export class CardShowcaseComponent {
  appearances = CARD_APPEARANCES;
  sizes = CARD_SIZES;
  focusModes = CARD_FOCUS_MODES;
  orientations: Orientation[] = ['horizontal', 'vertical'];

  appearanceDrawerFormConfig = CARD_DRAWER_CONFIGS.appearance;
  sizeDrawerFormConfig = CARD_DRAWER_CONFIGS.size;
  orientationDrawerFormConfig = CARD_DRAWER_CONFIGS.orientation;
  focusModeDrawerFormConfig = CARD_DRAWER_CONFIGS.focusMode;
  statesDrawerFormConfig = CARD_DRAWER_CONFIGS.states;

  appearanceFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    orientation: 'vertical',
    focusMode: 'off',
    interactive: true,
    selectable: false,
    checkbox: false,
    disabled: false,
  });

  sizeFormValues = signal<Record<string, unknown>>({
    appearance: 'filled',
    orientation: 'vertical',
    focusMode: 'off',
    interactive: true,
    disabled: false,
  });

  orientationFormValues = signal<Record<string, unknown>>({
    appearance: 'filled',
    size: 'medium',
    focusMode: 'off',
    interactive: true,
    disabled: false,
  });

  focusModeFormValues = signal<Record<string, unknown>>({
    appearance: 'filled',
    size: 'medium',
    orientation: 'vertical',
    interactive: true,
    disabled: false,
  });

  statesFormValues = signal<Record<string, unknown>>({
    appearance: 'filled',
    size: 'medium',
    orientation: 'vertical',
    focusMode: 'off',
  });

  appearanceForm = computed(() => this.toCardForm(this.appearanceFormValues()));
  sizeForm = computed(() => this.toCardForm(this.sizeFormValues()));
  orientationForm = computed(() => this.toCardForm(this.orientationFormValues()));
  focusModeForm = computed(() => this.toCardForm(this.focusModeFormValues()));
  statesForm = computed(() => this.toCardForm(this.statesFormValues()));

  selectedWithProjectedCheckbox = signal<boolean>(true);
  eventLog = signal<string[]>([]);

  cardMenuItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'open' },
    { id: 'duplicate', label: 'Duplicate', icon: 'copy' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];

  onCardClick(context: string): void {
    this.pushLog(`${context}: card click`);
  }

  onActionClick(context: string): void {
    this.pushLog(context);
  }

  onMenuAction(context: string, item: MenuItem): void {
    this.pushLog(`${context}: ${item.label}`);
  }

  onCardSelectionChange(context: string, event: CardOnSelectionChangeEvent): void {
    this.pushLog(`${context}: ${event.data.selected ? 'selected' : 'unselected'}`);
  }

  onProjectedSelectableChange(event: CardOnSelectionChangeEvent): void {
    this.selectedWithProjectedCheckbox.set(event.data.selected);
    this.pushLog(`projected: ${event.data.selected ? 'selected' : 'unselected'}`);
  }

  onProjectedCheckboxChange(value: boolean): void {
    this.selectedWithProjectedCheckbox.set(!!value);
    this.pushLog(`projected checkbox: ${value ? 'selected' : 'unselected'}`);
  }

  private toCardForm(v: Record<string, unknown>): CardFormState & { appearance: CardAppearance } {
    return {
      appearance: (v['appearance'] as CardAppearance) ?? 'filled',
      size: (v['size'] as Size) ?? 'medium',
      orientation: (v['orientation'] as Orientation) ?? 'vertical',
      focusMode: (v['focusMode'] as CardFocusMode) ?? 'off',
      interactive: (v['interactive'] as boolean) ?? true,
      selectable: (v['selectable'] as boolean) ?? false,
      checkbox: (v['checkbox'] as boolean) ?? false,
      disabled: (v['disabled'] as boolean) ?? false,
    };
  }

  private pushLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const next = [`[${timestamp}] ${message}`, ...this.eventLog()];
    this.eventLog.set(next.slice(0, 12));
  }
}
