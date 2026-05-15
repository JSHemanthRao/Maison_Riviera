const fs = require('fs');
const path = './src/features/product/constants.ts';
let content = fs.readFileSync(path, 'utf8');

const updates = [
  { name: "Oil Pump", url: "https://images.jacobandco.com/products/oil-pump-rose-gold.webp" },
  { name: "Gotham City", url: "https://images.jacobandco.com/products/gotham-city.webp" },
  { name: "Astronomia Solar", url: "https://images.jacobandco.com/products/astronomia-solar.webp" },
  { name: "Fleurs de Jardin", url: "https://images.jacobandco.com/products/fleurs-de-jardin.webp" },
  { name: "Billionaire Double Tourbillon Angel Cut", url: "https://images.jacobandco.com/products/billionaire-double-tourbillon-angel-cut.webp" },
  { name: "Brilliant Skeleton", url: "https://images.jacobandco.com/products/brilliant-skeleton.webp" },
  { name: "Astronomia Solar Icy Blue Baguette Sapphires", url: "https://images.jacobandco.com/products/astronomia-solar-icy-blue-baguette-sapphires.webp" }
];

updates.forEach(update => {
  const nameRegex = new RegExp(`name:\\s*"${update.name}",[\\s\\S]*?heroImage:\\s*"(.*?)"`, 'g');
  content = content.replace(nameRegex, (match, p1) => match.replace(p1, update.url));
  
  const imagesRegex = new RegExp(`name:\\s*"${update.name}",[\\s\\S]*?images:\\s*\\[\\s*"(.*?)"`, 'g');
  content = content.replace(imagesRegex, (match, p1) => match.replace(p1, update.url));
});

fs.writeFileSync(path, content, 'utf8');
console.log('Images updated successfully.');
