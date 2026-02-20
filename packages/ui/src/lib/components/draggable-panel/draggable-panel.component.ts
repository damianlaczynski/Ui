import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

export interface PanelPosition {
  x: number;
  y: number;
}

/**
 * Draggable Panel Component - Fluent 2 Design System
 *
 * Reużywalny komponent panelu, który można przeciągać.
 * Używany dla minimap, properties panel, search panel itp.
 */
@Component({
  selector: 'ui-draggable-panel',

  imports: [IconComponent],
  template: `
    <div
      class="draggable-panel"
      [class.draggable-panel--collapsed]="collapsed()"
      [class.draggable-panel--dragging]="isDragging()"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
      [style.width.px]="collapsed() ? null : width()"
    >
      <!-- Header (drag handle) -->
      <div class="draggable-panel__header" (mousedown)="onHeaderMouseDown($event)">
        <span class="draggable-panel__title">{{ title() }}</span>
        <div class="draggable-panel__actions">
          @if (collapsible()) {
            <button
              type="button"
              class="draggable-panel__action"
              (click)="toggleCollapse()"
              [title]="collapsed() ? 'Rozwiń' : 'Zwiń'"
            >
              <ui-icon [icon]="collapsed() ? 'chevron_up' : 'chevron_down'" size="small" />
            </button>
          }
          @if (closable()) {
            <button
              type="button"
              class="draggable-panel__action"
              (click)="close.emit()"
              title="Zamknij"
            >
              <ui-icon icon="dismiss" size="small" />
            </button>
          }
        </div>
      </div>

      <!-- Content -->
      @if (!collapsed()) {
        <div class="draggable-panel__content">
          <ng-content />
        </div>
      }
    </div>
  `,
  styles: [
    `
      .draggable-panel {
        position: absolute;
        background: var(--color-neutral-background-rest);
        border: 1px solid var(--color-neutral-stroke-rest);
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        z-index: 60;
        user-select: none;
        min-width: 120px;

        &--collapsed {
          width: auto !important;
        }

        &--dragging {
          opacity: 0.9;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        &__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: var(--color-neutral-background2-rest);
          border-bottom: 1px solid var(--color-neutral-stroke-rest);
          cursor: grab;

          &:active {
            cursor: grabbing;
          }
        }

        &__title {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-neutral-foreground-rest);
        }

        &__actions {
          display: flex;
          gap: 4px;
        }

        &__action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: var(--color-neutral-foreground3-rest);
          transition:
            background 0.1s ease,
            color 0.1s ease;

          &:hover {
            background: var(--color-neutral-background-hover);
            color: var(--color-neutral-foreground-rest);
          }

          &:active {
            background: var(--color-neutral-background-pressed);
          }
        }

        &__content {
          max-height: 400px;
          overflow: auto;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggablePanelComponent implements OnInit {
  private readonly elementRef = inject(ElementRef);

  title = input<string>('Panel');
  initialPosition = input<PanelPosition>({ x: 12, y: 12 });
  width = input<number>(200);
  collapsible = input<boolean>(true);
  closable = input<boolean>(false);
  initialCollapsed = input<boolean>(false);

  close = output<void>();
  positionChange = output<PanelPosition>();
  collapsedChange = output<boolean>();

  position = signal<PanelPosition>({ x: 12, y: 12 });
  collapsed = signal(false);
  isDragging = signal(false);

  private dragStart = { x: 0, y: 0 };
  private positionStart = { x: 0, y: 0 };

  ngOnInit(): void {
    this.position.set(this.initialPosition());
    this.collapsed.set(this.initialCollapsed());
  }

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
    this.collapsedChange.emit(this.collapsed());
  }

  onHeaderMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;

    event.preventDefault();
    this.isDragging.set(true);
    this.dragStart = { x: event.clientX, y: event.clientY };
    this.positionStart = { ...this.position() };
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging()) return;

    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;

    const newPosition = {
      x: Math.max(0, this.positionStart.x + dx),
      y: Math.max(0, this.positionStart.y + dy),
    };

    this.position.set(newPosition);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
      this.positionChange.emit(this.position());
    }
  }
}
