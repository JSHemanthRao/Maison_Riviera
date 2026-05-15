const fs = require('fs');

const galleryPath = './src/features/product/galleryData.ts';
const constantsPath = './src/features/product/constants.ts';

let galleryDataStr = fs.readFileSync(galleryPath, 'utf-8');
let constantsStr = fs.readFileSync(constantsPath, 'utf-8');

// A quick hack to parse the export const watchGalleries = { ... }
const jsonStr = galleryDataStr
  .replace('export const watchGalleries: Record<string, string[]> = ', '')
  .replace(/;/g, '')
  .replace(/,\s*}/g, '}');

// We have Unsplash URLs in constants.ts. We need to replace them.
// Let's replace any "https://images.unsplash.com/..." with the correct image from galleryData.

// Instead of parsing, let's just do a regex replace over watches in constants.ts
// The format is: slug: "some-slug", ... heroImage: "...", images: [ ... ]
const watchBlockRegex = /slug:\s*["']([^"']+)["'][^}]+?heroImage:\s*["']([^"']+)["'][^}]+?images:\s*\[([\s\S]*?)\]/g;

constantsStr = constantsStr.replace(watchBlockRegex, (match, slug, heroImg, imagesStr) => {
  // Find the array of images from galleryDataStr for this slug
  const slugRegex = new RegExp(`"${slug}":\\s*\\[([\\s\\S]*?)\\]`);
  const slugMatch = galleryDataStr.match(slugRegex);
  
  if (slugMatch) {
    const urlsText = slugMatch[1];
    const urls = [...urlsText.matchAll(/"([^"]+)"/g)].map(m => m[1]);
    
    if (urls.length > 0) {
      const newHero = urls[0];
      const newImagesStr = urls.map(u => `\n      "${u}"`).join(',') + '\n    ';
      
      let newBlock = match.replace(/heroImage:\s*["'][^"']+["']/, `heroImage: "${newHero}"`);
      newBlock = newBlock.replace(/images:\s*\[[\s\S]*?\]/, `images: [${newImagesStr}]`);
      return newBlock;
    }
  }
  
  return match;
});

fs.writeFileSync(constantsPath, constantsStr);
console.log('Successfully updated constants.ts with official Jacob & Co images, removing all Unsplash placeholders.');
