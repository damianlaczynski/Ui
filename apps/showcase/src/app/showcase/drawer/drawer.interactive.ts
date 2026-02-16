import { Component, computed, model, signal, viewChild } from '@angular/core';
import {
  ButtonComponent,
  DrawerComponent,
  type DrawerBackdrop,
  type DrawerModalType,
  type DrawerPosition,
  type DrawerType,
  type QuickAction,
} from 'angular-ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { DRAWER_SHOWCASE_CONFIG } from './drawer.showcase.config';

type DrawerSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-drawer-interactive',
  imports: [ButtonComponent, DrawerComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      #showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="onValuesChange($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        <ui-button variant="primary" (click)="openDrawer()">Open Interactive Drawer</ui-button>
        <ui-drawer
          [title]="currentTitle()"
          [bodyText]="currentBodyText()"
          [position]="currentPosition()"
          [size]="currentSize()"
          [closable]="currentClosable()"
          [backdrop]="currentBackdrop()"
          [type]="currentType()"
          [modalType]="currentModalType()"
          [primaryAction]="primaryAction()"
          [secondaryAction]="secondaryAction()"
          [additionalActions]="additionalActions()"
          [(visible)]="visible"
          (close)="onDrawerClose()"
          (backdropClick)="onBackdropClick()"
        />
      </div>
    </app-interactive-showcase>
  `,
})
export class DrawerInteractiveComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  showcaseConfig: ShowcaseConfig = DRAWER_SHOWCASE_CONFIG;
  visible = model(false);

  private values = signal<Record<string, unknown>>({
    title: 'Drawer Title',
    bodyText: 'This is a drawer component with configurable layout and actions.',
    position: 'right',
    size: 'medium',
    closable: true,
    backdrop: 'dynamic',
    type: 'overlay',
    modalType: 'modal',
    showPrimaryAction: true,
    showSecondaryAction: true,
    showAdditionalActions: false,
  });

  currentTitle = computed(() => this.values()['title'] as string);
  currentBodyText = computed(() => this.values()['bodyText'] as string);
  currentPosition = computed(() => this.values()['position'] as DrawerPosition);
  currentSize = computed(() => this.values()['size'] as DrawerSize);
  currentClosable = computed(() => this.values()['closable'] as boolean);
  currentBackdrop = computed(() => this.values()['backdrop'] as DrawerBackdrop);
  currentType = computed(() => (this.values()['type'] as DrawerType) ?? 'overlay');
  currentModalType = computed(() => (this.values()['modalType'] as DrawerModalType) ?? 'modal');
  currentShowPrimaryAction = computed(() => this.values()['showPrimaryAction'] as boolean);
  currentShowSecondaryAction = computed(() => this.values()['showSecondaryAction'] as boolean);
  currentShowAdditionalActions = computed(() => this.values()['showAdditionalActions'] as boolean);

  primaryAction = computed<QuickAction | null>(() => {
    if (!this.currentShowPrimaryAction()) {
      return null;
    }
    return {
      label: 'Save',
      variant: 'primary',
      action: () => this.visible.set(false),
    };
  });

  secondaryAction = computed<QuickAction | null>(() => {
    if (!this.currentShowSecondaryAction()) {
      return null;
    }
    return {
      label: 'Cancel',
      variant: 'secondary',
      action: () => this.visible.set(false),
    };
  });

  additionalActions = computed<QuickAction[]>(() => {
    if (!this.currentShowAdditionalActions()) {
      return [];
    }
    return [
      {
        label: 'Duplicate',
        appearance: 'outline',
        action: () => this.showcase()?.logEvent('additionalAction', { label: 'Duplicate' }),
      },
      {
        label: 'Archive',
        appearance: 'subtle',
        action: () => this.showcase()?.logEvent('additionalAction', { label: 'Archive' }),
      },
    ];
  });

  onValuesChange(newValues: Record<string, unknown>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  openDrawer(): void {
    this.visible.set(true);
    this.showcase()?.logEvent('open', {
      position: this.currentPosition(),
      size: this.currentSize(),
    });
  }

  onDrawerClose(): void {
    this.showcase()?.logEvent('close', {
      backdrop: this.currentBackdrop(),
      closable: this.currentClosable(),
    });
  }

  onBackdropClick(): void {
    this.showcase()?.logEvent('backdropClick', { backdrop: this.currentBackdrop() });
  }
}
