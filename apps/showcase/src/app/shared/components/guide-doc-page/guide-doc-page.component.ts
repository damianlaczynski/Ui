import { RouterLink } from '@angular/router';
import { Component, computed, input, signal } from '@angular/core';
import { ButtonComponent, TableOfContentComponent } from 'ui';
import { highlightTypeScript } from '@shared/utils/showcase/code-highlight.util';
import {
  GuideDocBlock,
  GuideDocCard,
  GuideDocCodeBlock,
  GuideDocPageConfig,
} from './guide-doc-page.models';
import { ShowcaseDocHeaderComponent } from '../showcase-doc-header/showcase-doc-header.component';

@Component({
  selector: 'app-guide-doc-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TableOfContentComponent, ShowcaseDocHeaderComponent],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        headingSelector="h1, h2, h3, h4, h5, h6"
        variant="primary"
        appearance="subtle"
        [sticky]="true"
        [offsetTop]="20"
        [containerSelector]="'.' + config().containerClass"
        [minLevel]="1"
        [maxLevel]="3"
      />

      <div class="showcase-content">
        <div class="showcase-doc" [class]="'showcase-doc ' + config().containerClass">
          <app-showcase-doc-header
            [title]="config().title"
            [description]="config().description"
            [markdown]="pageMarkdown()"
          />

          @for (section of config().sections; track section.id) {
            <section class="showcase-doc__import-section" [id]="section.id">
              <h2 class="showcase-doc__section-title">{{ section.title }}</h2>

              @if (section.description) {
                <p
                  class="showcase-doc__section-description"
                  [innerHTML]="formatRichText(section.description)"
                ></p>
              }

              @for (block of section.blocks; track $index) {
                @switch (block.type) {
                  @case ('paragraph') {
                    <p
                      class="showcase-doc__section-description"
                      [innerHTML]="formatRichText(block.content)"
                    ></p>
                  }
                  @case ('list') {
                    <ul class="showcase-doc__api-related">
                      @for (item of block.items; track item) {
                        <li [innerHTML]="formatRichText(item)"></li>
                      }
                    </ul>
                  }
                  @case ('note') {
                    <div class="showcase-doc__api-notes">
                      <p [innerHTML]="formatRichText(block.content)"></p>
                    </div>
                  }
                  @case ('code') {
                    <div class="showcase-doc__example-code showcase-doc__example-code--expanded">
                      <div class="showcase-doc__example-code-actions">
                        <ui-button
                          variant="secondary"
                          appearance="outline"
                          [icon]="
                            copiedBlockId() === codeBlockId(section.id, $index)
                              ? 'checkmark'
                              : 'copy'
                          "
                          [ariaLabel]="
                            copiedBlockId() === codeBlockId(section.id, $index)
                              ? 'Copied'
                              : 'Copy code'
                          "
                          (click)="copyCode(codeBlockId(section.id, $index), block.code)"
                        />
                      </div>
                      <div class="showcase-doc__example-code-scroll">
                        <pre><code [innerHTML]="highlightCode(block)"></code></pre>
                      </div>
                    </div>
                  }
                  @case ('cards') {
                    <div
                      class="showcase__stack"
                      [class.showcase__grid]="block.layout === 'grid'"
                      [class.showcase__grid--large]="block.layout === 'grid'"
                    >
                      @for (card of block.cards; track card.id) {
                        <article class="showcase__card">
                          @if (card.eyebrow || card.statusLabel) {
                            <div class="showcase__item-head">
                              @if (card.eyebrow) {
                                <p class="showcase__meta">{{ card.eyebrow }}</p>
                              }
                              @if (card.statusLabel) {
                                <span
                                  class="showcase__status-pill"
                                  [class]="
                                    'showcase__status-pill showcase__status-pill--' +
                                    (card.statusTone ?? 'planned')
                                  "
                                >
                                  {{ card.statusLabel }}
                                </span>
                              }
                            </div>
                          }

                          <h3>{{ card.title }}</h3>

                          @if (card.description) {
                            <p [innerHTML]="formatRichText(card.description)"></p>
                          }

                          @if (card.code) {
                            <pre class="showcase__code"><code>{{ card.code }}</code></pre>
                          }

                          @if (card.items?.length) {
                            <ul class="showcase__list">
                              @for (item of card.items; track item) {
                                <li [innerHTML]="formatRichText(item)"></li>
                              }
                            </ul>
                          }
                        </article>
                      }
                    </div>
                  }
                  @case ('links') {
                    <div class="showcase__grid showcase__grid--large">
                      @for (link of block.links; track link.id) {
                        <a class="showcase__card-link" [routerLink]="link.routerLink">
                          <h3>{{ link.title }}</h3>
                          <p>{{ link.description }}</p>
                        </a>
                      }
                    </div>
                  }
                }
              }
            </section>
          }
        </div>
      </div>
    </div>
  `,
})
export class GuideDocPageComponent {
  readonly config = input.required<GuideDocPageConfig>();

  readonly copiedBlockId = signal<string | null>(null);

  readonly pageMarkdown = computed(() =>
    [
      `# ${this.config().title}`,
      '',
      this.config().description,
      ...this.config().sections.flatMap(section => this.renderSectionMarkdown(section)),
      '',
    ].join('\n'),
  );

  codeBlockId(sectionId: string, index: number): string {
    return `${sectionId}-code-${index}`;
  }

  highlightCode(block: GuideDocCodeBlock): string {
    return highlightTypeScript(block.code);
  }

  async copyCode(blockId: string, code: string): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      this.copiedBlockId.set(blockId);
      setTimeout(() => {
        if (this.copiedBlockId() === blockId) {
          this.copiedBlockId.set(null);
        }
      }, 1800);
    } catch {}
  }

  formatRichText(content: string): string {
    const escaped = content
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

    return escaped
      .replace(/`([^`]+)`/g, '<code class="showcase-doc__api-code">$1</code>')
      .replaceAll('\n', '<br />');
  }

  private renderSectionMarkdown(section: GuideDocPageConfig['sections'][number]): string[] {
    const parts = ['', `## ${section.title}`];

    if (section.description) {
      parts.push('', this.toPlainText(section.description));
    }

    for (const block of section.blocks) {
      parts.push(...this.renderBlockMarkdown(block));
    }

    return parts;
  }

  private renderBlockMarkdown(block: GuideDocBlock): string[] {
    switch (block.type) {
      case 'paragraph':
        return ['', this.toPlainText(block.content)];
      case 'list':
        return ['', ...block.items.map(item => `- ${this.toPlainText(item)}`)];
      case 'note':
        return ['', this.toPlainText(block.content)];
      case 'code':
        return ['', '```ts', block.code.trim(), '```'];
      case 'cards':
        return block.cards.flatMap(card => this.renderCardMarkdown(card));
      case 'links':
        return [
          '',
          ...block.links.map(link => `- ${link.title}: ${link.description} (${link.routerLink})`),
        ];
    }
  }

  private renderCardMarkdown(card: GuideDocCard): string[] {
    const parts = ['', `### ${card.title}`];

    if (card.eyebrow) {
      parts.push(this.toPlainText(card.eyebrow));
    }

    if (card.statusLabel) {
      parts.push(`Status: ${card.statusLabel}`);
    }

    if (card.description) {
      parts.push('', this.toPlainText(card.description));
    }

    if (card.code) {
      parts.push('', '```ts', card.code.trim(), '```');
    }

    if (card.items?.length) {
      parts.push('', ...card.items.map(item => `- ${this.toPlainText(item)}`));
    }

    return parts;
  }

  private toPlainText(content: string): string {
    return content.replace(/`([^`]+)`/g, '$1').trim();
  }
}
