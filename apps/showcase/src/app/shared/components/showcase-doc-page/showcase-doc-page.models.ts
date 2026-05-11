import { Type } from '@angular/core';

export type ShowcaseDocAssetPaths = {
  markdown: string;
} & Record<string, string>;

export type ShowcaseDocApiColumnKind = 'text' | 'code' | 'type' | 'default';

export type ShowcaseDocApiTableBlock = {
  type: 'table';
  title: string;
  columns: string[];
  columnKinds: ShowcaseDocApiColumnKind[];
  rows: (string | null)[][];
};

export type ShowcaseDocApiNotesBlock = {
  type: 'notes';
  paragraphs: string[];
};

export type ShowcaseDocApiListBlock = {
  type: 'list';
  title: string;
  items: string[];
};

export type ShowcaseDocApiBlock = ShowcaseDocApiTableBlock | ShowcaseDocApiNotesBlock | ShowcaseDocApiListBlock;

export type ShowcaseDocApiSection = {
  title: string;
  lead?: string;
  blocks: ShowcaseDocApiBlock[];
};

export type ShowcaseDocAccessibilityBlock = {
  title: string;
  body: string;
};

export type ShowcaseDocFeatureConfig = {
  id: string;
  title: string;
  description: string;
  codeKey: string;
  component: Type<unknown>;
};

export type ShowcaseDocPageConfig = {
  title: string;
  description: string;
  importCode: string;
  containerClass: string;
  featureSections: ShowcaseDocFeatureConfig[];
  apiSections: ShowcaseDocApiSection[];
  accessibility: ShowcaseDocAccessibilityBlock[];
};
