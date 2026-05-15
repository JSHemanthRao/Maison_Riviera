const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, 'src', 'components');
const appDir = path.join(__dirname, 'src', 'app');

const architecture = {
  server: [
    'CmsImage.tsx',
    'ContactForm.tsx',
    'Footer.tsx',
    'Navbar.tsx',
    'SpecsGrid.tsx',
    'StorySection.tsx',
    'WatchCard.tsx',
    'WatchGrid.tsx'
  ],
  client: [
    'DeferredProductGallery.tsx',
    'ProductGallery.tsx',
    'TransitionLink.tsx',
    'OptimizedVideo.tsx'
  ],
  islands: [
    'MobileMenu.tsx',
    'LenisProvider.tsx',
    'Preloader.tsx',
    'PageTransition.tsx',
    'NoiseOverlay.tsx',
    'CursorGlow.tsx',
    'CinematicEffects.tsx'
  ]
};

// Create directories
['server', 'client', 'islands', 'ui'].forEach(dir => {
  const dirPath = path.join(componentsDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Map of old imports to new imports
const importMap = {};

Object.entries(architecture).forEach(([dir, files]) => {
  files.forEach(file => {
    const oldPath = path.join(componentsDir, file);
    if (fs.existsSync(oldPath)) {
      const newPath = path.join(componentsDir, dir, file);
      
      // We will use git mv if possible, else fs.renameSync
      try {
        execSync(`git mv "src/components/${file}" "src/components/${dir}/${file}"`);
      } catch (e) {
        fs.renameSync(oldPath, newPath);
      }
      
      const componentName = file.replace('.tsx', '');
      importMap[`@/components/${componentName}`] = `@/components/${dir}/${componentName}`;
    }
  });
});

// Helper to update imports in a file
function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(importMap).forEach(([oldImport, newImport]) => {
    // Regex to match exact import path
    const regex = new RegExp(`['"]${oldImport}['"]`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `"${newImport}"`);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

// Recursively update imports in all files
function walk(dir) {
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

walk(path.join(__dirname, 'src'));

console.log('Architecture refactored successfully.');
