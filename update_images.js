
const fs = require("fs");
const path = require("path");

const constantsPath = "c:\\Sharvex\\JacobandCo2\\src\\features\\product\\constants.ts";
let content = fs.readFileSync(constantsPath, "utf-8");

const watches = [
  "astronomia", "bugatti-chiron", "casino-tourbillon", "epic-x", 
  "twin-turbo", "billionaire", "opera-godfather", "oil-pump", 
  "gotham-city", "astronomia-solar", "epic-sf24", "fleurs-de-jardin", 
  "caviar-tourbillon", "astronomia-art-india", "brilliant-skeleton", 
  "astronomia-clarity-dragon"
];

for (const w of watches) {
  // We need to match the object block. But a simpler way:
  // we know the structure has slug: "..." then heroImage: "..." and images: [...]
  // Lets use a regex that matches the whole watch block
  const regex = new RegExp(`slug: "${w}",[\\s\\S]*?heroImage:\\s*".*?",[\\s\\S]*?images:\\s*\\[[\\s\\S]*?\\],`, "g");
  
  content = content.replace(regex, (match) => {
    let replaced = match.replace(/heroImage:\s*".*?"/, `heroImage: "/images/watches/${w}-hero.webp"`);
    
    const newImagesStr = `images: [\n      "/images/watches/${w}-hero.webp",\n      "/images/watches/${w}-2.webp",\n      "/images/watches/${w}-3.webp",\n      "/images/watches/${w}-4.webp",\n      "/images/watches/${w}-5.webp",\n      "/images/watches/${w}-6.webp"\n    ],`;
    
    replaced = replaced.replace(/images:\s*\[[\s\S]*?\],/, newImagesStr);
    
    // Also replace story image fallbacks if they exist
    replaced = replaced.replace(/image:\s*"\/[a-zA-Z0-9.\/-]*"/g, `image: "/images/watches/${w}-hero.webp"`);
    
    return replaced;
  });
}

fs.writeFileSync(constantsPath, content);
console.log("constants.ts updated");

// Update galleryData.ts
const galleryPath = "c:\\Sharvex\\JacobandCo2\\src\\features\\product\\galleryData.ts";
let galleryContent = fs.readFileSync(galleryPath, "utf-8");

// we just replace the whole file since it is literally just a map
// we can generate it
let newGallery = `export const watchGalleries: Record<string, string[]> = {\n`;
for (const w of watches) {
    const arr = `[\n    "/images/watches/${w}-hero.webp",\n    "/images/watches/${w}-2.webp",\n    "/images/watches/${w}-3.webp",\n    "/images/watches/${w}-4.webp",\n    "/images/watches/${w}-5.webp",\n    "/images/watches/${w}-6.webp"\n  ]`;
    newGallery += `  "${w}": ${arr},\n`;
    newGallery += `  "${w.replace(/-/g, "_")}": ${arr},\n`;
}
newGallery += `};\n`;

fs.writeFileSync(galleryPath, newGallery);
console.log("galleryData.ts updated");

