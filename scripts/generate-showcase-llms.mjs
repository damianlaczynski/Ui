import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const outputDir = join(rootDir, 'public', 'llms');
const snippetsOutputDir = join(outputDir, 'snippets');

const showcases = [
  loadShowcaseMeta('button'),
  loadShowcaseMeta('toast'),
];

mkdirSync(outputDir, { recursive: true });
mkdirSync(snippetsOutputDir, { recursive: true });

for (const showcase of showcases) {
  const snippetDir = join(snippetsOutputDir, showcase.slug);
  mkdirSync(snippetDir, { recursive: true });

  const docs = {};
  for (const [key, fileName] of Object.entries(showcase.snippets)) {
    const sourcePath = join(showcase.sourceDir, fileName);
    const raw = readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
    docs[key] = raw;
    cpSync(sourcePath, join(snippetDir, fileName));
  }

  writeFileSync(join(outputDir, `${showcase.slug}.md`), renderMarkdown(showcase, docs), 'utf8');
}

function trimDoc(source) {
  return source.trim();
}

function renderMarkdown(showcase, docs) {
  const parts = [`# ${showcase.title}`, '', showcase.intro];

  parts.push('', '## Import');
  parts.push('```ts');
  parts.push(trimDoc(showcase.importCode));
  parts.push('```');

  for (const section of showcase.featureSections) {
    parts.push('', `## ${section.title}`);
    parts.push('```ts');
    parts.push(trimDoc(docs[section.codeKey]));
    parts.push('```');
  }

  if (showcase.accessibility?.length) {
    parts.push('', '## Accessibility');
    for (const block of showcase.accessibility) {
      parts.push('', `### ${block.title}`);
      parts.push(block.body);
    }
  }

  parts.push('');
  return parts.join('\n');
}

function loadShowcaseMeta(slug) {
  const showcaseDir = join(rootDir, 'apps/showcase/src/app/showcase', slug);
  const metaPath = join(showcaseDir, `${slug}.showcase.meta.json`);
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  return {
    ...meta,
    sourceDir: join(showcaseDir, 'examples'),
  };
}
