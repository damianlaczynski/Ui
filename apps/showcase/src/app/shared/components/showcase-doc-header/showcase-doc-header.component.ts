import { Component, input } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-showcase-doc-header',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <header class="showcase-doc__header">
      <div class="showcase-doc__header-top">
        <h1 class="showcase-doc__title">{{ title() }}</h1>
        <ui-button icon="copy" variant="secondary" appearance="outline" (click)="copyMarkdown()"
          >Copy Markdown</ui-button
        >
      </div>
      <p class="showcase-doc__description">{{ description() }}</p>
    </header>
  `,
})
export class ShowcaseDocHeaderComponent {
  title = input.required<string>();
  description = input.required<string>();
  markdown = input.required<string>();

  async copyMarkdown(): Promise<void> {
    await this.copy(this.markdown());
  }

  private async copy(value: string): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  }
}
