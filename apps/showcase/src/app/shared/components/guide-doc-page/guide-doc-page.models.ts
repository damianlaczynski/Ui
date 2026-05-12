export type GuideDocCardStatusTone = 'shipped' | 'in-progress' | 'planned';

export type GuideDocParagraphBlock = {
  type: 'paragraph';
  content: string;
};

export type GuideDocListBlock = {
  type: 'list';
  items: string[];
};

export type GuideDocNoteBlock = {
  type: 'note';
  content: string;
};

export type GuideDocCodeBlock = {
  type: 'code';
  code: string;
};

export type GuideDocCard = {
  id: string;
  title: string;
  description?: string;
  eyebrow?: string;
  code?: string;
  items?: string[];
  statusLabel?: string;
  statusTone?: GuideDocCardStatusTone;
};

export type GuideDocCardsBlock = {
  type: 'cards';
  layout?: 'stack' | 'grid';
  cards: GuideDocCard[];
};

export type GuideDocLinkCard = {
  id: string;
  title: string;
  description: string;
  routerLink: string;
};

export type GuideDocLinksBlock = {
  type: 'links';
  links: GuideDocLinkCard[];
};

export type GuideDocBlock =
  | GuideDocParagraphBlock
  | GuideDocListBlock
  | GuideDocNoteBlock
  | GuideDocCodeBlock
  | GuideDocCardsBlock
  | GuideDocLinksBlock;

export type GuideDocSection = {
  id: string;
  title: string;
  description?: string;
  blocks: GuideDocBlock[];
};

export type GuideDocPageConfig = {
  title: string;
  description: string;
  containerClass: string;
  markdownAssetPath?: string;
  sections: GuideDocSection[];
};
