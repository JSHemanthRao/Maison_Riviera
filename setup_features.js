const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, 'src');
const featuresDir = path.join(srcDir, 'features');
const productDir = path.join(featuresDir, 'product');

// Create directories
[
  featuresDir,
  productDir,
  path.join(productDir, 'components'),
  path.join(productDir, 'hooks'),
  path.join(productDir, 'utils')
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Split watches.ts into types.ts and constants.ts
const watchesFile = path.join(srcDir, 'data', 'watches.ts');
if (fs.existsSync(watchesFile)) {
  const content = fs.readFileSync(watchesFile, 'utf8');
  
  // Extract interfaces
  const typesMatch = content.match(/export interface [\s\S]+?(?=export const watches)/);
  if (typesMatch) {
    fs.writeFileSync(path.join(productDir, 'types.ts'), typesMatch[0]);
  }
  
  // Extract data and functions, prepend import for types
  const constantsMatch = content.match(/export const watches[\s\S]+/);
  if (constantsMatch) {
    const constantsContent = `import { Watch, Specification, StoryBlock } from "./types";\n\n` + constantsMatch[0];
    fs.writeFileSync(path.join(productDir, 'constants.ts'), constantsContent);
  }
  
  // Remove the old data dir if empty or just rename watches.ts
  fs.unlinkSync(watchesFile);
}

// 2. Move product components
const componentsToMove = {
  'server/WatchCard.tsx': 'components/WatchCard.tsx',
  'server/WatchGrid.tsx': 'components/WatchGrid.tsx',
  'server/SpecsGrid.tsx': 'components/SpecsGrid.tsx',
  'server/StorySection.tsx': 'components/StorySection.tsx',
  'client/ProductGallery.tsx': 'components/ProductGallery.tsx',
  'client/DeferredProductGallery.tsx': 'components/DeferredProductGallery.tsx'
};

const importReplacements = {
  '@/data/watches': '@/features/product/constants',
  // Types might have been imported from data/watches
};

Object.entries(componentsToMove).forEach(([oldRelPath, newRelPath]) => {
  const oldPath = path.join(srcDir, 'components', oldRelPath);
  if (fs.existsSync(oldPath)) {
    const newPath = path.join(productDir, newRelPath);
    try {
      fs.renameSync(oldPath, newPath);
    } catch (e) {
      console.error(e);
    }
    
    const componentName = newRelPath.split('/').pop().replace('.tsx', '');
    importReplacements[`@/components/${oldRelPath.replace('.tsx', '')}`] = `@/features/product/components/${componentName}`;
  }
});

// 3. Update imports in all files
function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(importReplacements).forEach(([oldImport, newImport]) => {
    const regex = new RegExp(`['"]${oldImport}['"]`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `"${newImport}"`);
      changed = true;
    }
  });
  
  // Special case for types
  if (content.includes('import') && content.includes('Watch') && content.includes('@/features/product/constants')) {
    // If the file imports 'Watch' from constants, we need to change it to import from types
    // This is a bit tricky with simple regex, let's just do a naive replace if we see { Watch } from constants
    if (/import.*{\s*Watch\s*}.*from.*@\/features\/product\/constants/.test(content)) {
       content = content.replace(/import.*{\s*Watch\s*}.*from.*@\/features\/product\/constants.*/g, 'import { Watch } from "@/features/product/types";');
       changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      updateImportsInFile(fullPath);
    }
  });
}

walk(srcDir);

console.log('Features architecture applied.');
