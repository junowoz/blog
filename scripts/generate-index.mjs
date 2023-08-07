import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'src/posts');
const indexFile = path.join(process.cwd(), 'src/posts/index.ts');

// Recursive function to get all markdown files in a directory
function getMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.filter(file => !file.isDirectory()).map(file => path.join(dir, file.name));
  const directories = entries.filter(file => file.isDirectory());
  for (const directory of directories) {
    files.push(...getMarkdownFiles(path.join(dir, directory.name)));
  }
  return files.filter(file => path.extname(file) === '.md');
}

// Get all markdown files in the posts directory
const mdFiles = getMarkdownFiles(postsDir);

// Generate the index object
const index = mdFiles.reduce((acc, file) => {
  const slug = path.basename(file, '.md');
  const relativePath = path.relative(postsDir, file).replace(/\\/g, '/');
  return `${acc}\t'${slug}': import('./${relativePath}'),\n`;
}, '');

// Generate the index.ts file content
const content = `import type { PostModule } from '$lib/types';\n\n` +
  `export const index: Record<string, Promise<PostModule>> = {\n${index}};\n`;

// Write the index.ts file
fs.writeFileSync(indexFile, content);
