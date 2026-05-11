import type { GuideDocBlock, GuideDocCard, GuideDocPageConfig } from './guide-doc-page.models';

export function guideConfigToMarkdown(config: GuideDocPageConfig): string {
  return [
    `# ${config.title}`,
    '',
    config.description,
    ...config.sections.flatMap((section) => renderSectionMarkdown(section)),
    ''
  ].join('\n');
}

function renderSectionMarkdown(section: GuideDocPageConfig['sections'][number]): string[] {
  const parts = ['', `## ${section.title}`];

  if (section.description) {
    parts.push('', toPlainText(section.description));
  }

  for (const block of section.blocks) {
    parts.push(...renderBlockMarkdown(block));
  }

  return parts;
}

function renderBlockMarkdown(block: GuideDocBlock): string[] {
  switch (block.type) {
    case 'paragraph':
      return ['', toPlainText(block.content)];
    case 'list':
      return ['', ...block.items.map((item) => `- ${toPlainText(item)}`)];
    case 'note':
      return ['', toPlainText(block.content)];
    case 'code':
      return ['', '```ts', block.code.trim(), '```'];
    case 'cards':
      return block.cards.flatMap((card) => renderCardMarkdown(card));
    case 'links':
      return ['', ...block.links.map((link) => `- ${link.title}: ${link.description} (${link.routerLink})`)];
  }
}

function renderCardMarkdown(card: GuideDocCard): string[] {
  const parts = ['', `### ${card.title}`];

  if (card.eyebrow) {
    parts.push(toPlainText(card.eyebrow));
  }

  if (card.statusLabel) {
    parts.push(`Status: ${card.statusLabel}`);
  }

  if (card.description) {
    parts.push('', toPlainText(card.description));
  }

  if (card.code) {
    parts.push('', '```ts', card.code.trim(), '```');
  }

  if (card.items?.length) {
    parts.push('', ...card.items.map((item) => `- ${toPlainText(item)}`));
  }

  return parts;
}

function toPlainText(content: string): string {
  return content.replace(/`([^`]+)`/g, '$1').trim();
}
