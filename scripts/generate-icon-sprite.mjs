import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICON_SOURCE_DIR = path.join(ROOT, 'node_modules', '@fluentui', 'svg-icons', 'icons');
const SOURCE_ROOTS = [
  path.join(ROOT, 'apps'),
  path.join(ROOT, 'packages'),
];
const OUTPUT_SPRITE_FILE = path.join(ROOT, 'public', 'assets', 'icons', 'sprite.svg');
const OUTPUT_MANIFEST_TS = path.join(
  ROOT,
  'packages',
  'angular-ui',
  'src',
  'lib',
  'components',
  'icon',
  'generated',
  'icon-sprite-manifest.ts',
);
const OUTPUT_ICON_NAMES_TS = path.join(
  ROOT,
  'packages',
  'angular-ui',
  'src',
  'lib',
  'components',
  'icon',
  'generated',
  'icon-names.const.ts',
);
const OUTPUT_ICON_NAME_TYPE_TS = path.join(
  ROOT,
  'packages',
  'angular-ui',
  'src',
  'lib',
  'components',
  'icon',
  'generated',
  'icon-name.type.ts',
);

const TARGET_VARIANTS = ['regular', 'filled'];
const SOURCE_EXTENSIONS = new Set(['.ts', '.html', '.scss']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', 'coverage', '.angular', '.git']);
const IGNORE_FILE_SUFFIXES = new Set([
  path.join('components', 'icon', 'generated', 'icon-name.type.ts'),
  path.join('components', 'icon', 'generated', 'icon-names.const.ts'),
  path.join('components', 'icon', 'generated', 'icon-sprite-manifest.ts'),
]);
const DIRECTIONAL_ICON_SUFFIX_REGEX = /^(.*)_(ltr|rtl)$/;
const ANGLE_ROTATE_ICON_REGEX = /_rotate_(90|270)$/;
const ICON_VARIANT_PATTERN = /^(.+)_([0-9]+)_(regular|filled)\.svg$/;

function escapeRegex(source) {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getPublicIconName(iconName) {
  const directionalMatch = iconName.match(DIRECTIONAL_ICON_SUFFIX_REGEX);
  if (!directionalMatch) {
    return iconName;
  }
  return directionalMatch[1];
}

async function readAllIconNames() {
  const rootEntries = await fs.readdir(ICON_SOURCE_DIR, { withFileTypes: true });
  const iconNames = new Set();

  for (const entry of rootEntries) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.svg') {
      continue;
    }

    const match = entry.name.match(ICON_VARIANT_PATTERN);
    if (!match) {
      continue;
    }

    const iconName = getPublicIconName(match[1]);
    if (!iconName || ANGLE_ROTATE_ICON_REGEX.test(iconName)) {
      continue;
    }

    iconNames.add(iconName);
  }
  return iconNames;
}

async function walkFiles(dir, collector) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        await walkFiles(fullPath, collector);
      }
      continue;
    }
    const extension = path.extname(entry.name).toLowerCase();
    const normalizedPath = fullPath.replaceAll('\\', '/');
    const shouldIgnoreFile = Array.from(IGNORE_FILE_SUFFIXES).some(suffix =>
      normalizedPath.endsWith(suffix.replaceAll('\\', '/')),
    );
    if (SOURCE_EXTENSIONS.has(extension) && !shouldIgnoreFile) {
      collector.push(fullPath);
    }
  }
}

async function findUsedIcons(allIconNames) {
  const files = [];
  for (const sourceRoot of SOURCE_ROOTS) {
    await walkFiles(sourceRoot, files);
  }

  const escapedNames = Array.from(allIconNames).map(escapeRegex);
  const usageRegex = new RegExp(`['"\`](${escapedNames.join('|')})['"\`]`, 'g');
  const usedIcons = new Set();

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf8');
    let match = usageRegex.exec(content);
    while (match) {
      usedIcons.add(match[1]);
      match = usageRegex.exec(content);
    }
  }

  return usedIcons;
}

function extractSvgViewBox(svg, size) {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  return viewBoxMatch ? viewBoxMatch[1] : `0 0 ${size} ${size}`;
}

function extractSvgInner(svg) {
  const firstTagEnd = svg.indexOf('>');
  const lastSvgStart = svg.lastIndexOf('</svg>');
  if (firstTagEnd === -1 || lastSvgStart === -1 || firstTagEnd >= lastSvgStart) {
    return '';
  }
  return svg.slice(firstTagEnd + 1, lastSvgStart).trim();
}

async function buildSpriteData(iconNames, mode) {
  const symbols = [];
  const symbolMap = {};
  const iconNameMap = {};
  const directionalIconNameMap = {};
  const localeFolderMap = {};
  const availableSizes = new Set();

  const rootEntries = await fs.readdir(ICON_SOURCE_DIR, { withFileTypes: true });
  const shouldIncludeRootIcon = iconName => {
    if (ANGLE_ROTATE_ICON_REGEX.test(iconName)) {
      return false;
    }
    if (iconNames.has(iconName)) {
      return true;
    }
    const publicIconName = getPublicIconName(iconName);
    return iconNames.has(publicIconName);
  };

  for (const entry of rootEntries) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.svg') {
      continue;
    }

    const match = entry.name.match(ICON_VARIANT_PATTERN);
    if (!match) {
      continue;
    }

    const [, iconName, sizeString, variant] = match;
    const size = Number(sizeString);
    if (!Number.isFinite(size) || size <= 0 || !TARGET_VARIANTS.includes(variant)) {
      continue;
    }
    if (!shouldIncludeRootIcon(iconName)) {
      continue;
    }

    const filePath = path.join(ICON_SOURCE_DIR, entry.name);
    const symbolId = entry.name.slice(0, -4);
    try {
      const svg = await fs.readFile(filePath, 'utf8');
      const viewBox = extractSvgViewBox(svg, size);
      const inner = extractSvgInner(svg);
      if (!inner) {
        continue;
      }

      symbols.push(`<symbol id="${symbolId}" viewBox="${viewBox}">${inner}</symbol>`);
      symbolMap[symbolId] = true;
      availableSizes.add(size);

      const publicIconName = getPublicIconName(iconName);
      if (publicIconName) {
        iconNameMap[publicIconName] = true;
      }

      const directionalMatch = iconName.match(DIRECTIONAL_ICON_SUFFIX_REGEX);
      if (directionalMatch) {
        directionalIconNameMap[directionalMatch[1]] = true;
      }
    } catch {
      // Skip malformed or missing files.
    }
  }

  for (const entry of rootEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const folderName = entry.name;
    // Skip LTR and RTL folders. Already these icons are included in the root directory.
    if (folderName === 'LTR' || folderName === 'RTL') {
      continue;
    }

    const folderPath = path.join(ICON_SOURCE_DIR, folderName);
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    const normalizedLocaleFolder = folderName.toLowerCase();

    localeFolderMap[normalizedLocaleFolder] = true;

    for (const fileEntry of files) {
      if (!fileEntry.isFile() || path.extname(fileEntry.name).toLowerCase() !== '.svg') {
        continue;
      }

      const match = fileEntry.name.match(ICON_VARIANT_PATTERN);
      if (!match) {
        continue;
      }

      const [, , sizeString, variant] = match;
      const iconName = match[1];
      const size = Number(sizeString);
      if (!Number.isFinite(size) || size <= 0 || !TARGET_VARIANTS.includes(variant)) {
        continue;
      }
      if (!shouldIncludeRootIcon(iconName)) {
        continue;
      }

      const filePath = path.join(folderPath, fileEntry.name);
      const symbolBase = fileEntry.name.slice(0, -4);
      const symbolId = `locale-${normalizedLocaleFolder}-${symbolBase}`;

      try {
        const svg = await fs.readFile(filePath, 'utf8');
        const viewBox = extractSvgViewBox(svg, size);
        const inner = extractSvgInner(svg);
        if (!inner) {
          continue;
        }
        symbols.push(`<symbol id="${symbolId}" viewBox="${viewBox}">${inner}</symbol>`);
        symbolMap[symbolId] = true;
        availableSizes.add(size);
      } catch {
        // Skip malformed or missing files.
      }
    }
  }

  return {
    symbols,
    symbolMap,
    iconNameMap,
    directionalIconNameMap,
    localeFolderMap,
    availableSizes: Array.from(availableSizes).sort((a, b) => a - b),
  };
}

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function writeOutputs(
  symbols,
  symbolMap,
  iconNameMap,
  directionalIconNameMap,
  localeFolderMap,
  availableSizes,
  iconCount,
  mode,
) {
  const spriteSvg = [
    '<svg xmlns="http://www.w3.org/2000/svg">',
    ...symbols,
    '</svg>',
    '',
  ].join('\n');

  const manifestTs = `/* eslint-disable */
// Auto-generated by scripts/generate-icon-sprite.mjs
// Do not edit manually.

export const ICON_SPRITE_SYMBOLS: Record<string, true> = ${JSON.stringify(symbolMap, null, 2)};
export const ICON_SPRITE_ICON_NAMES: Record<string, true> = ${JSON.stringify(iconNameMap, null, 2)};
export const ICON_SPRITE_DIRECTIONAL_ICON_NAMES: Record<string, true> = ${JSON.stringify(directionalIconNameMap, null, 2)};
export const ICON_SPRITE_LOCALE_FOLDERS: Record<string, true> = ${JSON.stringify(localeFolderMap, null, 2)};
export const ICON_SPRITE_AVAILABLE_SIZES: number[] = ${JSON.stringify(availableSizes, null, 2)};

export const ICON_SPRITE_URL = '/assets/icons/sprite.svg';
`;
  const sortedIconNames = Object.keys(iconNameMap).sort();
  const iconNamesTs = [
    '/* eslint-disable */',
    '// Auto-generated by scripts/generate-icon-sprite.mjs',
    '// Do not edit manually.',
    '',
    'export const ALL_ICON_NAMES: string[] = [',
    ...sortedIconNames.map(iconName => `  '${iconName}',`),
    '];',
    '',
  ].join('\n');
  const iconNameTypeTs = sortedIconNames.length
    ? [
        '/* eslint-disable */',
        '// Auto-generated by scripts/generate-icon-sprite.mjs',
        '// Do not edit manually.',
        '',
        'export type IconName =',
        ...sortedIconNames.map(
          (iconName, index) =>
            `  | '${iconName}'${index === sortedIconNames.length - 1 ? ';' : ''}`,
        ),
        '',
      ].join('\n')
    : [
        '// Auto-generated by scripts/generate-icon-sprite.mjs',
        '// Do not edit manually.',
        '',
        'export type IconName = string;',
        '',
      ].join('\n');

  await ensureParentDir(OUTPUT_SPRITE_FILE);
  await ensureParentDir(OUTPUT_MANIFEST_TS);
  await ensureParentDir(OUTPUT_ICON_NAMES_TS);
  await ensureParentDir(OUTPUT_ICON_NAME_TYPE_TS);
  await fs.writeFile(OUTPUT_SPRITE_FILE, spriteSvg, 'utf8');
  await fs.writeFile(OUTPUT_MANIFEST_TS, manifestTs, 'utf8');
  await fs.writeFile(OUTPUT_ICON_NAMES_TS, iconNamesTs, 'utf8');
  await fs.writeFile(OUTPUT_ICON_NAME_TYPE_TS, iconNameTypeTs, 'utf8');

  console.log(
    `Icon sprite generated: ${symbols.length} symbols from ${iconCount} icon names (mode: ${mode}).`,
  );
}

async function main() {
  const allIconNames = await readAllIconNames();
  const mode = process.env.ICON_SPRITE_MODE === 'used' ? 'used' : 'all';
  const iconNames = mode === 'used' ? await findUsedIcons(allIconNames) : allIconNames;
  const { symbols, symbolMap, iconNameMap, directionalIconNameMap, localeFolderMap, availableSizes } =
    await buildSpriteData(iconNames, mode);
  await writeOutputs(
    symbols,
    symbolMap,
    iconNameMap,
    directionalIconNameMap,
    localeFolderMap,
    availableSizes,
    iconNames.size,
    mode,
  );
}

main().catch(error => {
  console.error('Failed to generate icon sprite:', error);
  process.exitCode = 1;
});
