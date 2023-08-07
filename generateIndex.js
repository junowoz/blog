import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

async function createIndex() {
  const files = await fg('src/posts/**/*.md');
  const index = files.reduce((acc, filePath) => {
    const slug = path.basename(filePath).replace('.md', '');
    acc[slug] = filePath.replace('src/posts/', '');
    return acc;
  }, {});

  if (!fs.existsSync('src/posts')) {
    fs.mkdirSync('src/posts', { recursive: true });
  }

  fs.writeFileSync('src/posts/index.json', JSON.stringify(index, null, 2));
}

createIndex();
