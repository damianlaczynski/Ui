import { Component, computed, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  DividerComponent,
  DrawerComponent,
  TableOfContentComponent,
  type DrawerBackdrop,
  type DrawerModalType,
  type DrawerPosition,
  type DrawerType,
  type QuickAction,
} from 'ui';
import { SectionWithDrawerComponent } from '@shared/components/section-with-drawer';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { DRAWER_DRAWER_CONFIGS } from './drawer.showcase.config';
import { DrawerInteractiveComponent } from './drawer.interactive';

type DrawerSize = 'small' | 'medium' | 'large';

interface DrawerSectionForm {
  position: DrawerPosition;
  size: DrawerSize;
  closable: boolean;
  backdrop: DrawerBackdrop;
  type?: DrawerType;
  modalType?: DrawerModalType;
  showPrimaryAction: boolean;
  showSecondaryAction: boolean;
  showAdditionalActions: boolean;
}

@Component({
  selector: 'app-drawer-showcase',
  imports: [
    CommonModule,
    DrawerComponent,
    ButtonComponent,
    DividerComponent,
    TableOfContentComponent,
    SectionWithDrawerComponent,
    ShowcaseHeaderComponent,
    DrawerInteractiveComponent,
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
      <div class="showcase-content">
        <app-showcase-header title="Drawer" />
        <p class="showcase__description">
          Drawer displays a panel that slides in from screen edges. Use it for contextual forms,
          confirmations, or supporting content without leaving the current page.
        </p>

        <app-section-with-drawer
          sectionTitle="Overview"
          sectionDescription="Base drawer setup with position, size, closing behavior, backdrop mode, and action visibility."
          [formConfig]="overviewDrawerFormConfig"
          [formValues]="overviewFormValues()"
          (formValuesChange)="overviewFormValues.set($event)"
        >
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="overviewVisible.set(true)">Open Drawer</ui-button>
          </div>
          <ui-drawer
            title="Overview Drawer"
            bodyText="Use the Customize drawer to tune layout, behavior, and action buttons."
            [position]="overviewForm().position"
            [size]="overviewForm().size"
            [closable]="overviewForm().closable"
            [backdrop]="overviewForm().backdrop"
            [type]="overviewForm().type ?? 'overlay'"
            [modalType]="overviewForm().modalType ?? 'modal'"
            [primaryAction]="overviewPrimaryAction()"
            [secondaryAction]="overviewSecondaryAction()"
            [additionalActions]="overviewAdditionalActions()"
            [(visible)]="overviewVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Positions"
          sectionDescription="Drawer can slide from left, right, top, or bottom. Position buttons set the anchor; other options stay configurable."
          [formConfig]="positionsDrawerFormConfig"
          [formValues]="positionsFormValues()"
          (formValuesChange)="positionsFormValues.set($event)"
        >
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-button appearance="outline" (click)="openPositionDrawer('left')">Left</ui-button>
            <ui-button appearance="outline" (click)="openPositionDrawer('right')">Right</ui-button>
            <ui-button appearance="outline" (click)="openPositionDrawer('top')">Top</ui-button>
            <ui-button appearance="outline" (click)="openPositionDrawer('bottom')"
              >Bottom</ui-button
            >
          </div>
          <ui-drawer
            title="Position Drawer"
            bodyText="This drawer uses the selected position while preserving other section options."
            [position]="positionDrawerPosition()"
            [size]="positionsForm().size"
            [closable]="positionsForm().closable"
            [backdrop]="positionsForm().backdrop"
            [primaryAction]="positionsPrimaryAction()"
            [secondaryAction]="positionsSecondaryAction()"
            [additionalActions]="positionsAdditionalActions()"
            [(visible)]="positionDrawerVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Sizes"
          sectionDescription="Size controls drawer width or height depending on position: small, medium, and large."
          [formConfig]="sizesDrawerFormConfig"
          [formValues]="sizesFormValues()"
          (formValuesChange)="sizesFormValues.set($event)"
        >
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-button appearance="outline" (click)="openSizeDrawer('small')">Small</ui-button>
            <ui-button appearance="outline" (click)="openSizeDrawer('medium')">Medium</ui-button>
            <ui-button appearance="outline" (click)="openSizeDrawer('large')">Large</ui-button>
          </div>
          <ui-drawer
            title="Size Drawer"
            bodyText="This drawer uses the selected size while preserving other section options."
            [position]="sizesForm().position"
            [size]="sizeDrawerSize()"
            [closable]="sizesForm().closable"
            [backdrop]="sizesForm().backdrop"
            [primaryAction]="sizesPrimaryAction()"
            [secondaryAction]="sizesSecondaryAction()"
            [additionalActions]="sizesAdditionalActions()"
            [(visible)]="sizeDrawerVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Type & Modal"
          sectionDescription="Type: overlay (full screen) vs inline (within container). Modal type: modal blocks interaction, non-modal allows background interaction, alert cannot close via ESC or backdrop."
          [formConfig]="typeModalDrawerFormConfig"
          [formValues]="typeModalFormValues()"
          (formValuesChange)="typeModalFormValues.set($event)"
        >
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-button appearance="outline" (click)="typeModalVisible.set(true)">
              Open Drawer
            </ui-button>
          </div>
          <ui-drawer
            title="Type & Modal Drawer"
            bodyText="Try different type and modalType combinations. Alert mode: only the close button can close the drawer."
            [position]="typeModalForm().position"
            [size]="typeModalForm().size"
            [closable]="typeModalForm().closable"
            [backdrop]="typeModalForm().backdrop"
            [type]="typeModalForm().type ?? 'overlay'"
            [modalType]="typeModalForm().modalType ?? 'modal'"
            [primaryAction]="typeModalPrimaryAction()"
            [secondaryAction]="typeModalSecondaryAction()"
            [(visible)]="typeModalVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Behavior"
          sectionDescription="Compare backdrop and closable modes. Dynamic backdrop closes on outside click, static does not; non-closable disables X and ESC."
          [formConfig]="behaviorDrawerFormConfig"
          [formValues]="behaviorFormValues()"
          (formValuesChange)="behaviorFormValues.set($event)"
        >
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-button appearance="outline" (click)="behaviorDynamicVisible.set(true)">
              Closable + Dynamic
            </ui-button>
            <ui-button appearance="outline" (click)="behaviorStaticVisible.set(true)">
              Closable + Static
            </ui-button>
            <ui-button appearance="outline" (click)="behaviorLockedVisible.set(true)">
              Non-Closable + Static
            </ui-button>
          </div>

          <ui-drawer
            title="Closable with Dynamic Backdrop"
            bodyText="Click outside the drawer to close it."
            [position]="behaviorForm().position"
            [size]="behaviorForm().size"
            [closable]="true"
            backdrop="dynamic"
            [primaryAction]="behaviorDynamicPrimaryAction()"
            [secondaryAction]="behaviorDynamicSecondaryAction()"
            [(visible)]="behaviorDynamicVisible"
          />

          <ui-drawer
            title="Closable with Static Backdrop"
            bodyText="Backdrop click is ignored; close via X, ESC, or actions."
            [position]="behaviorForm().position"
            [size]="behaviorForm().size"
            [closable]="true"
            backdrop="static"
            [primaryAction]="behaviorStaticPrimaryAction()"
            [secondaryAction]="behaviorStaticSecondaryAction()"
            [(visible)]="behaviorStaticVisible"
          />

          <ui-drawer
            title="Non-Closable with Static Backdrop"
            bodyText="This drawer can only be closed by action buttons."
            [position]="behaviorForm().position"
            [size]="behaviorForm().size"
            [closable]="false"
            backdrop="static"
            [primaryAction]="behaviorLockedPrimaryAction()"
            [secondaryAction]="behaviorLockedSecondaryAction()"
            [(visible)]="behaviorLockedVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Actions"
          sectionDescription="Compare action layouts: primary+secondary, additional actions, and informational drawer without footer actions."
          [formConfig]="actionsDrawerFormConfig"
          [formValues]="actionsFormValues()"
          (formValuesChange)="actionsFormValues.set($event)"
        >
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ui-button appearance="outline" (click)="actionsBaseVisible.set(true)">
              Primary + Secondary
            </ui-button>
            <ui-button appearance="outline" (click)="actionsAdditionalVisible.set(true)">
              With Additional
            </ui-button>
            <ui-button appearance="outline" (click)="actionsNoneVisible.set(true)"
              >No Actions</ui-button
            >
          </div>

          <ui-drawer
            title="Standard Actions"
            bodyText="Typical confirmation drawer with primary and secondary actions."
            [position]="actionsForm().position"
            [size]="actionsForm().size"
            [closable]="true"
            backdrop="dynamic"
            [primaryAction]="actionsBasePrimaryAction()"
            [secondaryAction]="actionsBaseSecondaryAction()"
            [(visible)]="actionsBaseVisible"
          />

          <ui-drawer
            title="Multiple Actions"
            bodyText="Use additional actions for secondary command paths."
            [position]="actionsForm().position"
            [size]="actionsForm().size"
            [closable]="true"
            backdrop="dynamic"
            [primaryAction]="actionsAdditionalPrimaryAction()"
            [secondaryAction]="actionsAdditionalSecondaryAction()"
            [additionalActions]="actionsAdditionalActions()"
            [(visible)]="actionsAdditionalVisible"
          />

          <ui-drawer
            title="Information"
            bodyText="Informational drawer without action footer."
            [position]="actionsForm().position"
            [size]="actionsForm().size"
            [closable]="true"
            backdrop="dynamic"
            [(visible)]="actionsNoneVisible"
          />
        </app-section-with-drawer>

        <app-section-with-drawer
          sectionTitle="Custom Content"
          sectionDescription="Drawer supports projected content for richer layouts beyond plain body text."
          [formConfig]="customContentDrawerFormConfig"
          [formValues]="customContentFormValues()"
          (formValuesChange)="customContentFormValues.set($event)"
        >
          <div class="showcase__preview">
            <ui-button variant="primary" (click)="customContentVisible.set(true)">
              Open Custom Content Drawer
            </ui-button>
          </div>
          <ui-drawer
            title="Custom Content Drawer"
            [position]="customContentForm().position"
            [size]="customContentForm().size"
            [closable]="customContentForm().closable"
            [backdrop]="customContentForm().backdrop"
            [primaryAction]="customContentPrimaryAction()"
            [secondaryAction]="customContentSecondaryAction()"
            [additionalActions]="customContentAdditionalActions()"
            [(visible)]="customContentVisible"
          >
            <div style="padding: 16px 0;">
              <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Section Title</h3>
              <p style="margin: 0 0 16px 0; color: #616161;">
                Custom content can include structured text, lists, and nested components.
              </p>
              <ui-divider />
              <div style="margin-top: 16px;">
                <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Checklist</h4>
                <ul style="margin: 0; padding-left: 24px; color: #616161;">
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item</li>
                </ul>
              </div>
            </div>
          </ui-drawer>
        </app-section-with-drawer>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <p class="showcase__section__description">
            Configure drawer content, layout, behavior, and actions in real time, then inspect open,
            close, and backdrop events.
          </p>
          <app-drawer-interactive />
        </section>
      </div>
    </div>
  `,
})
export class DrawerShowcaseComponent {
  overviewDrawerFormConfig = DRAWER_DRAWER_CONFIGS.overview;
  positionsDrawerFormConfig = DRAWER_DRAWER_CONFIGS.positions;
  sizesDrawerFormConfig = DRAWER_DRAWER_CONFIGS.sizes;
  typeModalDrawerFormConfig = DRAWER_DRAWER_CONFIGS.typeModal;
  behaviorDrawerFormConfig = DRAWER_DRAWER_CONFIGS.behavior;
  actionsDrawerFormConfig = DRAWER_DRAWER_CONFIGS.actions;
  customContentDrawerFormConfig = DRAWER_DRAWER_CONFIGS.customContent;

  overviewFormValues = signal<Record<string, unknown>>({
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

  positionsFormValues = signal<Record<string, unknown>>({
    size: 'medium',
    closable: true,
    backdrop: 'dynamic',
    showPrimaryAction: true,
    showSecondaryAction: true,
    showAdditionalActions: false,
  });

  sizesFormValues = signal<Record<string, unknown>>({
    position: 'right',
    closable: true,
    backdrop: 'dynamic',
    showPrimaryAction: true,
    showSecondaryAction: true,
    showAdditionalActions: false,
  });

  typeModalFormValues = signal<Record<string, unknown>>({
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

  behaviorFormValues = signal<Record<string, unknown>>({
    position: 'right',
    size: 'medium',
  });

  actionsFormValues = signal<Record<string, unknown>>({
    position: 'right',
    size: 'medium',
  });

  customContentFormValues = signal<Record<string, unknown>>({
    position: 'right',
    size: 'medium',
    closable: true,
    backdrop: 'dynamic',
    showPrimaryAction: true,
    showSecondaryAction: true,
    showAdditionalActions: false,
  });

  overviewForm = computed(() => this.toForm(this.overviewFormValues()));
  positionsForm = computed(() => this.toForm(this.positionsFormValues()));
  sizesForm = computed(() => this.toForm(this.sizesFormValues()));
  typeModalForm = computed(() => this.toForm(this.typeModalFormValues()));
  behaviorForm = computed(() => this.toForm(this.behaviorFormValues()));
  actionsForm = computed(() => this.toForm(this.actionsFormValues()));
  customContentForm = computed(() => this.toForm(this.customContentFormValues()));

  overviewVisible = model(false);
  positionDrawerVisible = model(false);
  sizeDrawerVisible = model(false);
  typeModalVisible = model(false);
  behaviorDynamicVisible = model(false);
  behaviorStaticVisible = model(false);
  behaviorLockedVisible = model(false);
  actionsBaseVisible = model(false);
  actionsAdditionalVisible = model(false);
  actionsNoneVisible = model(false);
  customContentVisible = model(false);

  positionDrawerPosition = signal<DrawerPosition>('right');
  sizeDrawerSize = signal<DrawerSize>('medium');

  private closeOverview = (): void => this.overviewVisible.set(false);
  private closePositions = (): void => this.positionDrawerVisible.set(false);
  private closeSizes = (): void => this.sizeDrawerVisible.set(false);
  private closeTypeModal = (): void => this.typeModalVisible.set(false);
  private closeCustomContent = (): void => this.customContentVisible.set(false);
  private closeBehaviorDynamic = (): void => this.behaviorDynamicVisible.set(false);
  private closeBehaviorStatic = (): void => this.behaviorStaticVisible.set(false);
  private closeBehaviorLocked = (): void => this.behaviorLockedVisible.set(false);
  private closeActionsBase = (): void => this.actionsBaseVisible.set(false);
  private closeActionsAdditional = (): void => this.actionsAdditionalVisible.set(false);

  overviewPrimaryAction = computed(() =>
    this.resolvePrimaryAction(this.overviewForm(), this.closeOverview),
  );
  overviewSecondaryAction = computed(() =>
    this.resolveSecondaryAction(this.overviewForm(), this.closeOverview),
  );
  overviewAdditionalActions = computed(() =>
    this.resolveAdditionalActions(this.overviewForm(), this.closeOverview),
  );

  positionsPrimaryAction = computed(() =>
    this.resolvePrimaryAction(this.positionsForm(), this.closePositions),
  );
  positionsSecondaryAction = computed(() =>
    this.resolveSecondaryAction(this.positionsForm(), this.closePositions),
  );
  positionsAdditionalActions = computed(() =>
    this.resolveAdditionalActions(this.positionsForm(), this.closePositions),
  );

  sizesPrimaryAction = computed(() => this.resolvePrimaryAction(this.sizesForm(), this.closeSizes));
  sizesSecondaryAction = computed(() =>
    this.resolveSecondaryAction(this.sizesForm(), this.closeSizes),
  );
  sizesAdditionalActions = computed(() =>
    this.resolveAdditionalActions(this.sizesForm(), this.closeSizes),
  );

  typeModalPrimaryAction = computed(() =>
    this.resolvePrimaryAction(this.typeModalForm(), this.closeTypeModal),
  );
  typeModalSecondaryAction = computed(() =>
    this.resolveSecondaryAction(this.typeModalForm(), this.closeTypeModal),
  );

  customContentPrimaryAction = computed(() =>
    this.resolvePrimaryAction(this.customContentForm(), this.closeCustomContent, 'Apply'),
  );
  customContentSecondaryAction = computed(() =>
    this.resolveSecondaryAction(this.customContentForm(), this.closeCustomContent),
  );
  customContentAdditionalActions = computed(() =>
    this.resolveAdditionalActions(this.customContentForm(), this.closeCustomContent),
  );

  behaviorDynamicPrimaryAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.closeBehaviorDynamic(),
  });
  behaviorDynamicSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.closeBehaviorDynamic(),
  });
  behaviorStaticPrimaryAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.closeBehaviorStatic(),
  });
  behaviorStaticSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.closeBehaviorStatic(),
  });
  behaviorLockedPrimaryAction = signal<QuickAction>({
    label: 'Confirm',
    variant: 'primary',
    action: () => this.closeBehaviorLocked(),
  });
  behaviorLockedSecondaryAction = signal<QuickAction>({
    label: 'Back',
    variant: 'secondary',
    action: () => this.closeBehaviorLocked(),
  });
  actionsBasePrimaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => this.closeActionsBase(),
  });
  actionsBaseSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.closeActionsBase(),
  });
  actionsAdditionalPrimaryAction = signal<QuickAction>({
    label: 'Save',
    variant: 'primary',
    action: () => this.closeActionsAdditional(),
  });
  actionsAdditionalSecondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.closeActionsAdditional(),
  });
  actionsAdditionalActions = signal<QuickAction[]>([
    { label: 'Duplicate', appearance: 'outline', action: () => this.noopAction() },
    { label: 'Archive', appearance: 'subtle', action: () => this.noopAction() },
  ]);

  openPositionDrawer(position: DrawerPosition): void {
    this.positionDrawerPosition.set(position);
    this.positionDrawerVisible.set(true);
  }

  openSizeDrawer(size: DrawerSize): void {
    this.sizeDrawerSize.set(size);
    this.sizeDrawerVisible.set(true);
  }

  noopAction = (): void => {};

  resolvePrimaryAction(
    form: DrawerSectionForm,
    action: () => void,
    label = 'Save',
  ): QuickAction | null {
    if (!form.showPrimaryAction) {
      return null;
    }
    return { label, variant: 'primary', action };
  }

  resolveSecondaryAction(form: DrawerSectionForm, action: () => void): QuickAction | null {
    if (!form.showSecondaryAction) {
      return null;
    }
    return { label: 'Cancel', variant: 'secondary', action };
  }

  resolveAdditionalActions(form: DrawerSectionForm, action: () => void): QuickAction[] {
    if (!form.showAdditionalActions) {
      return [];
    }
    return [
      { label: 'Duplicate', appearance: 'outline', action: this.noopAction },
      { label: 'Archive', appearance: 'subtle', action },
    ];
  }

  private toForm(v: Record<string, unknown>): DrawerSectionForm {
    return {
      position: (v['position'] as DrawerPosition) ?? 'right',
      size: (v['size'] as DrawerSize) ?? 'medium',
      closable: v['closable'] === undefined ? true : !!v['closable'],
      backdrop: (v['backdrop'] as DrawerBackdrop) ?? 'dynamic',
      type: (v['type'] as DrawerType) ?? 'overlay',
      modalType: (v['modalType'] as DrawerModalType) ?? 'modal',
      showPrimaryAction: v['showPrimaryAction'] === undefined ? true : !!v['showPrimaryAction'],
      showSecondaryAction:
        v['showSecondaryAction'] === undefined ? true : !!v['showSecondaryAction'],
      showAdditionalActions:
        v['showAdditionalActions'] === undefined ? false : !!v['showAdditionalActions'],
    };
  }
}
