import { Component, input, output, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
//TODO: Add menu component back when it is implemented
//import { MenuComponent } from 'ui';
import type { MenuItem } from 'ui';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-showcase-header',
  standalone: true,
  //imports: [MenuComponent],
  template: `
    <header class="showcase__header">
      <div class="showcase__header__main">
        <h1 class="showcase__title showcase__header__title">{{ title() }}</h1>
      </div>
      <!-- @if (showActions()) {
        <div class="showcase__header__actions">
          <ui-menu
            variant="primary"
            appearance="tint"
            triggerVariant="split"
            text="Copy markdown"
            icon="copy"
            ariaLabel="Copy or share"
            [menuItems]="menuItems()"
            (primaryClick)="copyMarkdown()"
            (menuItemClick)="onMenuItemClick($event)"
          />
        </div>
      } -->
    </header>
  `,
})
export class ShowcaseHeaderComponent {
  private router = inject(Router);

  title = input.required<string>();
  showActions = input<boolean>(true);
  githubRepoUrl = input<string | undefined>(undefined);

  copied = output<void>();

  menuItems = computed<MenuItem[]>(() => [
    { id: 'github', label: 'Open in GitHub', icon: 'code' },
    { id: 'chatgpt', label: 'Open in ChatGPT', icon: 'chat' },
    { id: 'claude', label: 'Open in Claude', icon: 'sparkle' },
  ]);

  private effectiveGithubUrl = computed(() => this.githubRepoUrl() ?? environment.githubRepoUrl);

  private getMarkdown(): string {
    const t = this.title();
    const url =
      typeof window !== 'undefined' ? window.location.origin + this.router.url : this.router.url;
    return `[${t}](${url})`;
  }

  copyMarkdown(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.getMarkdown()).then(() => this.copied.emit());
  }

  onMenuItemClick(item: MenuItem): void {
    switch (item.id) {
      case 'github': {
        const url = this.effectiveGithubUrl();
        if (url && typeof window !== 'undefined') window.open(url, '_blank');
        break;
      }
      case 'chatgpt':
        if (typeof window !== 'undefined') window.open('https://chat.openai.com', '_blank');
        break;
      case 'claude':
        if (typeof window !== 'undefined') window.open('https://claude.ai', '_blank');
        break;
    }
  }
}
