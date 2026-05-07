import { Component, signal } from '@angular/core';
import { EmptyStateComponent, type QuickAction } from 'ui';

@Component({
  selector: 'app-empty-state-actions-demo',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:0 0 28rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-empty-state
          title="No team members"
          description="Invite people to collaborate or import users from another workspace."
          icon="people"
          [primaryAction]="inviteAction"
          [secondaryAction]="importAction"
        />
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Last action
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No action yet.' }}
        </div>
      </div>
    </div>
  `,
})
export class EmptyStateActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly inviteAction: QuickAction = {
    label: 'Invite people',
    variant: 'primary',
    icon: 'person_add',
    action: () => this.lastAction.set('Invite people'),
  };

  protected readonly importAction: QuickAction = {
    label: 'Import users',
    variant: 'secondary',
    icon: 'send',
    action: () => this.lastAction.set('Import users'),
  };
}
