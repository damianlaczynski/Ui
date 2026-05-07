import { ShowcaseDocApiSection } from './showcase-doc-page.models';

export type ShowcaseDocMetaSection = {
  id: string;
  title: string;
  description: string;
  codeKey: string;
  componentKey: string;
};

export type ShowcaseDocMetaAccessibility = {
  title: string;
  body: string;
};

export type ShowcaseDocMeta = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  importCode: string;
  containerClass: string;
  snippets: Record<string, string>;
  featureSections: ShowcaseDocMetaSection[];
  accessibility: ShowcaseDocMetaAccessibility[];
  apiSections: ShowcaseDocApiSection[];
};
