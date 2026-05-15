const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const watchesDir = path.join(__dirname, 'public', 'images', 'watches');

// Map: slug -> array of { url, filename }
// Using ONLY verified datocms-assets.com URLs that are known to work
const downloads = {
  'astronomia': [
    { url: 'https://www.datocms-assets.com/99008/1700065114-at802-40-bd-ua-a.webp', filename: 'astronomia-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1699573376-at802-40-bd-ub-a.webp', filename: 'astronomia-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1700065055-at120-40-ou-sd-b.webp', filename: 'astronomia-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1699632233-as912-30-aa-ab-a.webp', filename: 'astronomia-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1699632413-at100-40-ac-ab-b.webp', filename: 'astronomia-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1702053367-at102-40-ab-ub-abala.webp', filename: 'astronomia-6.webp' },
  ],
  'bugatti-chiron': [
    { url: 'https://www.datocms-assets.com/99008/1711636462-bu200-40-aa-aa-bbrua.webp', filename: 'bugatti-chiron-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711636782-chiron_black_chrome-1.webp', filename: 'bugatti-chiron-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711636553-bu200-21-ae-ab-a.webp', filename: 'bugatti-chiron-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711636484-bu200-20-ak-ab-b.webp', filename: 'bugatti-chiron-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1696967085-bu200-30-aa-aa-b.webp', filename: 'bugatti-chiron-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1721402074-bu800-40-ad-ub-abrua-2.webp', filename: 'bugatti-chiron-6.webp' },
  ],
  'casino-tourbillon': [
    { url: 'https://www.datocms-assets.com/99008/1756392648-ca100-40-aa-ac-a.webp', filename: 'casino-tourbillon-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1756322134-ca100-40-aa-ab-a.webp', filename: 'casino-tourbillon-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1756322180-ca100-30-aa-aa-a.webp', filename: 'casino-tourbillon-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1756322259-ca100-40-ab-ba-a.webp', filename: 'casino-tourbillon-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1777049667-casino-black-2026-vf.webp', filename: 'casino-tourbillon-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1777385678-casino_roulette_tourbillon_recolored-to-white-gold-copy.webp', filename: 'casino-tourbillon-6.webp' },
  ],
  'epic-x': [
    { url: 'https://www.datocms-assets.com/99008/1777486168-1697474566-ec360-20-ab-ab-abrua-copy.webp', filename: 'epic-x-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1719863825-epic-x-chrono-tourbillon-rg-black-2024_re-copy.webp', filename: 'epic-x-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1702050037-1-epicxskeleton-inspo.webp', filename: 'epic-x-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1702050161-2-epicxskeleton-inspo.webp', filename: 'epic-x-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1703270472-3-epicxskeleton-inspo.webp', filename: 'epic-x-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1714685128-1.webp', filename: 'epic-x-6.webp' },
  ],
  'twin-turbo': [
    { url: 'https://www.datocms-assets.com/99008/1697209527-tt200-40-ns-nk-a.webp', filename: 'twin-turbo-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697209519-tt200-21-ns-nk-a.webp', filename: 'twin-turbo-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697209535-tt210-29-aa-aa-a.webp', filename: 'twin-turbo-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697209541-tt200-40-bc-ac-a.webp', filename: 'twin-turbo-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1747357215-tt200-40-bc-ub-a.webp', filename: 'twin-turbo-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1747356966-tt200-21-ns-uc-a.webp', filename: 'twin-turbo-6.webp' },
  ],
  'billionaire': [
    { url: 'https://www.datocms-assets.com/99008/1703256927-1-billionaire-inspo.webp', filename: 'billionaire-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1703256944-2-billionaire-inspo.webp', filename: 'billionaire-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1703256912-3-billionaire-inspo.webp', filename: 'billionaire-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1713813068-billionaire-dual-toourbillon_internals_v09-f.webp', filename: 'billionaire-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1713813058-billionaire-dual-toourbillon_internals_v09-b.webp', filename: 'billionaire-5.webp' },
  ],
  'opera-godfather': [
    { url: 'https://www.datocms-assets.com/99008/1763054051-godfather-rg-red-rose-piano-1.webp', filename: 'opera-godfather-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1702061062-op110-21-ag-ab-a.webp', filename: 'opera-godfather-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1704908011-op110-40-ag-ad-abala.webp', filename: 'opera-godfather-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698168856-1-godfather.webp', filename: 'opera-godfather-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698168835-2-godfather.webp', filename: 'opera-godfather-5.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698266693-1-godfatherinspo.webp', filename: 'opera-godfather-6.webp' },
  ],
  'oil-pump': [
    { url: 'https://www.datocms-assets.com/99008/1724338706-oi100-40-aa-aa-a.webp', filename: 'oil-pump-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697475089-oi100-40-aa-ac-a.webp', filename: 'oil-pump-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1777998973-oi110-21-aa-aa-abala.webp', filename: 'oil-pump-3.webp' },
  ],
  'gotham-city': [
    { url: 'https://www.datocms-assets.com/99008/1697470702-billionaire_stills_soldier_v02.webp', filename: 'gotham-city-hero.webp' },
  ],
  'astronomia-solar': [
    { url: 'https://www.datocms-assets.com/99008/1697469301-at100-40-ac-sd-a.webp', filename: 'astronomia-solar-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697491814-at100-30-ac-sd-c.webp', filename: 'astronomia-solar-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697491927-at120-40-ad-sd-a.webp', filename: 'astronomia-solar-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638202-as310-21-as-aa-a.webp', filename: 'astronomia-solar-4.webp' },
  ],
  'epic-sf24': [
    { url: 'https://www.datocms-assets.com/99008/1697474617-es101-40-ab-ab-abala.webp', filename: 'epic-sf24-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698263467-es101-40-ns-lr-a.webp', filename: 'epic-sf24-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698263731-es101-20-ns-lh-a.webp', filename: 'epic-sf24-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1698265365-es101-20-ns-yr-a.webp', filename: 'epic-sf24-4.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638002-es802-20-bd-bd-a.webp', filename: 'epic-sf24-5.webp' },
  ],
  'fleurs-de-jardin': [
    { url: 'https://www.datocms-assets.com/99008/1697469249-af321-40-ba-af-a.webp', filename: 'fleurs-de-jardin-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1697490194-af321-30-bc-ua-a.webp', filename: 'fleurs-de-jardin-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1736539018-fleur_de_jardin_rainbow_cobra_af321-40-bd-ae-b.webp', filename: 'fleurs-de-jardin-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638402-af321-40-aa-aa-a.webp', filename: 'fleurs-de-jardin-4.webp' },
  ],
  'caviar-tourbillon': [
    { url: 'https://www.datocms-assets.com/99008/1697470702-billionaire_stills_soldier_v02.webp', filename: 'caviar-tourbillon-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1703256927-1-billionaire-inspo.webp', filename: 'caviar-tourbillon-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1703256944-2-billionaire-inspo.webp', filename: 'caviar-tourbillon-3.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638602-cv110-40-aa-aa-a.webp', filename: 'caviar-tourbillon-4.webp' },
  ],
  'astronomia-art-india': [
    { url: 'https://www.datocms-assets.com/99008/1699632456-at102-40-aa-ub-a.webp', filename: 'astronomia-art-india-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1702053367-at102-40-ab-ub-abala.webp', filename: 'astronomia-art-india-2.webp' },
  ],
  'brilliant-skeleton': [
    { url: 'https://www.datocms-assets.com/99008/1697469249-af321-40-ba-af-a.webp', filename: 'brilliant-skeleton-hero.webp' },
  ],
  'astronomia-clarity-dragon': [
    { url: 'https://www.datocms-assets.com/99008/1711638202-as310-21-as-aa-a.webp', filename: 'astronomia-clarity-dragon-hero.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638224-as310-21-as-aa-a_2.webp', filename: 'astronomia-clarity-dragon-2.webp' },
    { url: 'https://www.datocms-assets.com/99008/1711638235-as310-21-as-aa-a_3.webp', filename: 'astronomia-clarity-dragon-3.webp' },
  ],
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`  SKIP (exists): ${path.basename(dest)}`);
      resolve();
      return;
    }
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        console.log(`  FAIL (${response.statusCode}): ${url}`);
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        console.log(`  OK (${(stats.size / 1024).toFixed(0)}KB): ${path.basename(dest)}`);
        resolve();
      });
    });
    request.on('error', reject);
    request.setTimeout(15000, () => { request.destroy(); reject(new Error('timeout')); });
  });
}

async function main() {
  console.log('=== Downloading watch images locally ===\n');
  let total = 0, success = 0, failed = 0;

  for (const [slug, images] of Object.entries(downloads)) {
    console.log(`[${slug}]`);
    for (const img of images) {
      total++;
      const dest = path.join(watchesDir, img.filename);
      try {
        await downloadFile(img.url, dest);
        success++;
      } catch (err) {
        console.log(`  ERROR: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\n=== Done: ${success}/${total} downloaded, ${failed} failed ===`);
}

main();
