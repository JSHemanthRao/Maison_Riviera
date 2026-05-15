const fs = require('fs');

const watches = [
  { slug: "astronomia-art-octopus-baguette", url: "https://jacobandco.com/timepieces/astronomia-art/octopus-rose-gold-baguette" },
  { slug: "bugatti-chiron-tourbillon-sapphire-crystal", url: "https://jacobandco.com/timepieces/bugatti-chiron-tourbillon" },
  { slug: "casino-tourbillon", url: "https://jacobandco.com/timepieces/casino-tourbillon" },
  { slug: "epic-x-chrono-tourbillon-baguette", url: "https://jacobandco.com/timepieces/epic-x-chrono-tourbillon" },
  { slug: "twin-turbo-furious", url: "https://jacobandco.com/timepieces/twin-turbo-furious" },
  { slug: "billionaire-timeless-treasure", url: "https://jacobandco.com/timepieces/billionaire-timeless-treasure" },
  { slug: "opera-godfather", url: "https://jacobandco.com/timepieces/opera-godfather" },
  { slug: "the-world-is-yours-mad-paris", url: "https://jacobandco.com/timepieces/the-world-is-yours-dual-time-zone" },
  { slug: "gotham-city", url: "https://jacobandco.com/timepieces/gotham-city" },
  { slug: "astronomia-solar", url: "https://jacobandco.com/timepieces/astronomia-solar" },
  { slug: "epic-sf24-tourbillon", url: "https://jacobandco.com/timepieces/epic-sf24" },
  { slug: "fleurs-de-jardin", url: "https://jacobandco.com/timepieces/fleurs-de-jardin" },
  { slug: "billionaire-double-tourbillon-angel-cut", url: "https://jacobandco.com/timepieces/billionaire-double-tourbillon" },
  { slug: "astronomia-art-india", url: "https://jacobandco.com/timepieces/astronomia-art-india" },
  { slug: "brilliant-skeleton", url: "https://jacobandco.com/timepieces/brilliant-skeleton" },
  { slug: "godfather-minute-repeater", url: "https://jacobandco.com/timepieces/opera-godfather-minute-repeater" },
  { slug: "astronomia-solar-icy-blue-baguette-sapphires", url: "https://jacobandco.com/timepieces/astronomia-solar-baguette" }
];

async function run() {
  const galleries = {};

  for (const watch of watches) {
    console.log(`Scraping ${watch.slug}...`);
    try {
      const res = await fetch(watch.url);
      const text = await res.text();
      
      // Match datocms-assets URLs
      const regex = /https:\/\/www\.datocms-assets\.com\/[a-zA-Z0-9\/_-]+(?:\.png|\.webp|\.jpg|\.jpeg)/g;
      const matches = text.match(regex);
      
      if (matches) {
        // Remove duplicates and query parameters
        let uniqueUrls = [...new Set(matches)];
        // Filter out tiny icons or irrelevant images based on naming if possible, but for now just take them
        // The watch pages usually have large images first
        
        // Take up to 6 images
        uniqueUrls = uniqueUrls.slice(0, 6);
        galleries[watch.slug] = uniqueUrls;
        console.log(`  Found ${uniqueUrls.length} images`);
      } else {
        console.log(`  No images found`);
        galleries[watch.slug] = [];
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      galleries[watch.slug] = [];
    }
    
    // Sleep slightly to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Generate galleryData.ts
  let tsContent = 'export const watchGalleries: Record<string, string[]> = {\n';
  for (const [slug, images] of Object.entries(galleries)) {
    // If we have no images, use an unsplash placeholder so it doesn't crash
    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80");
    }
    
    const formattedSlug = slug.replace(/-/g, '_');
    tsContent += `  "${formattedSlug}": [\n`;
    for (const img of images) {
      tsContent += `    "${img}",\n`;
    }
    tsContent += `  ],\n`;
    
    // Also include dash separated just in case
    tsContent += `  "${slug}": [\n`;
    for (const img of images) {
      tsContent += `    "${img}",\n`;
    }
    tsContent += `  ],\n`;
  }
  tsContent += '};\n';

  fs.writeFileSync('./src/features/product/galleryData.ts', tsContent);
  console.log('Successfully generated galleryData.ts');
}

run();
