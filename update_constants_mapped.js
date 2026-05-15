const fs = require('fs');

const galleryPath = './src/features/product/galleryData.ts';
const constantsPath = './src/features/product/constants.ts';

let galleryDataStr = fs.readFileSync(galleryPath, 'utf-8');
let constantsStr = fs.readFileSync(constantsPath, 'utf-8');

// The scrape script used these exact slugs:
const mapToGallery = {
  "astronomia": "astronomia-art-octopus-baguette",
  "bugatti-chiron": "bugatti-chiron-tourbillon-sapphire-crystal",
  "casino": "casino-tourbillon",
  "epic-x": "epic-x-chrono-tourbillon-baguette",
  "twin-turbo": "twin-turbo-furious",
  "billionaire-timeless": "billionaire-timeless-treasure",
  "opera-godfather": "opera-godfather",
  "the-world-is-yours": "the-world-is-yours-mad-paris",
  "gotham-city": "gotham-city",
  "astronomia-solar": "astronomia-solar",
  "epic-sf24": "epic-sf24-tourbillon",
  "fleurs-de-jardin": "fleurs-de-jardin",
  "billionaire-double": "billionaire-double-tourbillon-angel-cut",
  "astronomia-art-india": "astronomia-art-india",
  "brilliant-skeleton": "brilliant-skeleton",
  "godfather-minute-repeater": "godfather-minute-repeater",
  "astronomia-solar-baguette": "astronomia-solar-icy-blue-baguette-sapphires"
};

// Regex to find each watch block
const watchBlockRegex = /slug:\s*["']([^"']+)["'][^}]+?heroImage:\s*["']([^"']+)["'][^}]+?images:\s*\[([\s\S]*?)\]/g;

constantsStr = constantsStr.replace(watchBlockRegex, (match, slug, heroImg, imagesStr) => {
  const gallerySlug = mapToGallery[slug];
  
  if (gallerySlug) {
    // Find the array of images from galleryDataStr for this gallerySlug
    const slugRegex = new RegExp(`"${gallerySlug}":\\s*\\[([\\s\\S]*?)\\]`);
    const slugMatch = galleryDataStr.match(slugRegex);
    
    if (slugMatch) {
      const urlsText = slugMatch[1];
      const urls = [...urlsText.matchAll(/"([^"]+)"/g)].map(m => m[1]);
      
      if (urls.length > 0) {
        // Find the first valid datocms image
        const newHero = urls[0];
        const newImagesStr = urls.map(u => `\n      "${u}"`).join(',') + '\n    ';
        
        let newBlock = match.replace(/heroImage:\s*["'][^"']+["']/, `heroImage: "${newHero}"`);
        newBlock = newBlock.replace(/images:\s*\[[\s\S]*?\]/, `images: [${newImagesStr}]`);
        return newBlock;
      }
    }
  }
  
  return match;
});

fs.writeFileSync(constantsPath, constantsStr);
console.log('Successfully mapped specific slugs to update constants.ts with Jacob & Co images!');
