import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const docsRoot = fileURLToPath(new URL('../docs/', import.meta.url));
const processor = unified().use(remarkParse);
const errors = [];
let pageCount = 0;
let linkCount = 0;

async function checkLink(file, target) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(target)) return;

  let pathname;
  try {
    pathname = decodeURIComponent(target.split(/[?#]/, 1)[0]);
  } catch {
    errors.push(`${path.relative(docsRoot, file)}: invalid link ${target}`);
    return;
  }
  if (!pathname) return;

  const destination = path.resolve(path.dirname(file), pathname);
  const relative = path.relative(docsRoot, destination);
  if (path.isAbsolute(pathname) || relative.startsWith(`..${path.sep}`) || relative === '..') {
    errors.push(`${path.relative(docsRoot, file)}: use a relative link within docs/: ${target}`);
    return;
  }
  try {
    const info = await stat(destination);
    if (!info.isFile()) throw new Error('Link target is not a file');
  } catch {
    errors.push(`${path.relative(docsRoot, file)}: missing link target ${target}`);
  }
  linkCount++;
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (entry.name === 'meta.json') {
      try {
        const meta = JSON.parse(await readFile(file, 'utf8'));
        if (typeof meta.title !== 'string' || !meta.title.trim()) {
          errors.push(`${path.relative(docsRoot, file)}: title is required`);
        }
      } catch (error) {
        errors.push(`${path.relative(docsRoot, file)}: ${error.message}`);
      }
    }
    if (!/\.mdx?$/.test(entry.name)) continue;

    pageCount++;
    const markdown = await readFile(file, 'utf8');
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown);
    let data = {};
    try {
      data = frontmatter ? (parseYaml(frontmatter[1]) ?? {}) : {};
    } catch (error) {
      errors.push(`${path.relative(docsRoot, file)}: invalid frontmatter: ${error.message}`);
      continue;
    }
    const content = frontmatter ? markdown.slice(frontmatter[0].length) : markdown;
    for (const field of ['title', 'description']) {
      if (typeof data[field] !== 'string' || !data[field].trim()) {
        errors.push(`${path.relative(docsRoot, file)}: frontmatter ${field} is required`);
      }
    }
    const tree = processor.parse(content);
    const definitions = new Map();
    visit(tree, 'definition', (node) => definitions.set(node.identifier, node.url));
    const targets = [];
    visit(tree, (node) => {
      if (node.type === 'link' || node.type === 'image') targets.push(node.url);
      if (node.type === 'linkReference' || node.type === 'imageReference') {
        const url = definitions.get(node.identifier);
        if (url) targets.push(url);
      }
    });
    await Promise.all(targets.map((target) => checkLink(file, target)));
  }
}

await walk(docsRoot);
if (pageCount === 0) errors.push('No documentation pages found.');
if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pageCount} documentation pages and ${linkCount} local links.`);
}
