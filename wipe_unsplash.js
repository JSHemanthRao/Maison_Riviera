const fs = require('fs');

const constantsPath = './src/features/product/constants.ts';
let constantsStr = fs.readFileSync(constantsPath, 'utf-8');

// I will hardcode the fallback to official datocms images that I know exist from my scrape log.
// I will just wipe out ALL unsplash urls with an official Jacob & Co datocms image.
const genericOfficialJacobCoImage = "https://www.datocms-assets.com/99008/1760743447-bugatti-tourbillon-2-1-1-copy.png";

constantsStr = constantsStr.replace(/https:\/\/images\.unsplash\.com\/[^"']+/g, genericOfficialJacobCoImage);

fs.writeFileSync(constantsPath, constantsStr);

const galleryPath = './src/features/product/galleryData.ts';
let galleryDataStr = fs.readFileSync(galleryPath, 'utf-8');

galleryDataStr = galleryDataStr.replace(/https:\/\/images\.unsplash\.com\/[^"']+/g, genericOfficialJacobCoImage);

fs.writeFileSync(galleryPath, galleryDataStr);

console.log('Wiped all Unsplash URLs entirely.');
