import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(__dirname, '../src');
const fileExtensions = ['.ts', '.tsx'];

function processDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (fileExtensions.includes(path.extname(fullPath))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const updated = rewriteImports(content, fullPath);
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf-8');
        console.log(`🔧 Updated: ${path.relative(SRC_DIR, fullPath)}`);
      }
    }
  }
}

function rewriteImports(content: string, filePath: string): string {
  return content.replace(/from ['"](\.{1,2}\/[^'"]+)['"]/g, (_, importPath) => {
    const absImport = path.resolve(path.dirname(filePath), importPath);
    const relToSrc = path.relative(SRC_DIR, absImport).replace(/\\/g, '/');
    return `from '@/` + relToSrc + `'`;
  });
}

// Run it
processDirectory(SRC_DIR);