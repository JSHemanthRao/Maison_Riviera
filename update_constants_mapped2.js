const fs = require('fs');

const galleryPath = './src/features/product/galleryData.ts';
const constantsPath = './src/features/product/constants.ts';

let galleryDataStr = fs.readFileSync(galleryPath, 'utf-8');
let constantsStr = fs.readFileSync(constantsPath, 'utf-8');

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

for (const [constSlug, gallerySlug] of Object.entries(mapToGallery)) {
  const slugRegex = new RegExp(`"${gallerySlug}":\\s*\\[([\\s\\S]*?)\\]`);
  const slugMatch = galleryDataStr.match(slugRegex);
  
  if (slugMatch) {
    const urlsText = slugMatch[1];
    const urls = [...urlsText.matchAll(/"([^"]+)"/g)].map(m => m[1]);
    
    if (urls.length > 0) {
      const newHero = urls[0];
      const newImagesStr = urls.map(u => `\n      "${u}"`).join(',') + '\n    ';
      
      // Target the block for this specific slug
      // We know slug: "astronomia",
      const slugIndex = constantsStr.indexOf(`slug: "${constSlug}"`);
      if (slugIndex !== -1) {
        const nextWatchIndex = constantsStr.indexOf(`slug: "`, slugIndex + 10);
        let blockStr = nextWatchIndex !== -1 
          ? constantsStr.substring(slugIndex, nextWatchIndex) 
          : constantsStr.substring(slugIndex);
          
        blockStr = blockStr.replace(/heroImage:\s*["'][^"']+["']/, `heroImage: "${newHero}"`);
        blockStr = blockStr.replace(/images:\s*\[[\s\S]*?\]/, `images: [${newImagesStr}]`);
        
        constantsStr = nextWatchIndex !== -1
          ? constantsStr.substring(0, slugIndex) + blockStr + constantsStr.substring(nextWatchIndex)
          : constantsStr.substring(0, slugIndex) + blockStr;
      }
    }
  }
}

// Ensure there are absolutely NO unsplash urls remaining in constants.ts
if (constantsStr.includes('unsplash.com')) {
  console.log('WARNING: Some Unsplash links still remain!');
} else {
  console.log('SUCCESS: All Unsplash links replaced.');
}

fs.writeFileSync(constantsPath, constantsStr);
