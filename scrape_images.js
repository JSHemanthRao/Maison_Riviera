async function run() {
  try {
    const res = await fetch('https://jacobandco.com/timepieces/astronomia-tourbillon');
    const text = await res.text();
    const matches = text.match(/https:\/\/www\.datocms-assets\.com\/[^\"]+(?:\.png|\.webp|\.jpg)/g);
    console.log(matches ? [...new Set(matches)].slice(0, 5) : 'No datocms assets found');
  } catch (err) {
    console.error(err);
  }
}
run();
