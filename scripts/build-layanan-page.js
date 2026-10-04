const fs = require('fs');
const path = require('path');

const htmlPath = 'D:/Website Pelangi/stitch_cv_pelangi_uv_redesign/produk_layanan_finishing_pelangi_uv_desktop/code.html';
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// 1. Extract <main> content
const mainStart = rawHtml.indexOf('<main');
const mainEnd = rawHtml.indexOf('</main>') + 7;
let mainHtml = rawHtml.substring(mainStart, mainEnd);

// Remove the outer <main ...> and </main> to wrap in React div or keep it
// 2. Extract modals after footer
const footerEnd = rawHtml.indexOf('</footer>') + 9;
const bodyEnd = rawHtml.indexOf('</body>');
let afterFooterHtml = rawHtml.substring(footerEnd, bodyEnd);

// 3. Extract <script id="services-dynamic-modal-script">
const script2Start = rawHtml.indexOf('<script id="services-dynamic-modal-script">');
const script2End = rawHtml.indexOf('</script>', script2Start);
const script2 = rawHtml.substring(script2Start + 43, script2End);

// 4. Extract <script id="hero-enhanced-search-script">
const script3Start = rawHtml.indexOf('<script id="hero-enhanced-search-script">');
const script3End = rawHtml.indexOf('</script>', script3Start);
const script3 = rawHtml.substring(script3Start + 41, script3End);

// 5. Extract <script id="services-carousel-auto-loop-script">
const script4Start = rawHtml.indexOf('<script id="services-carousel-auto-loop-script">');
const script4End = rawHtml.indexOf('</script>', script4Start);
const script4 = rawHtml.substring(script4Start + 48, script4End);

// 6. Extract <script id="service-pill-navigation-script">
let script5 = '';
const script5Start = rawHtml.indexOf('<script id="service-pill-navigation-script"');
if (script5Start !== -1) {
  const codeStart = rawHtml.indexOf('>', script5Start) + 1;
  const script5End = rawHtml.indexOf('</script>', codeStart);
  script5 = rawHtml.substring(codeStart, script5End);
}

// 7. Extract switchCatalogView script
let script6 = '';
const script6Marker = 'function switchCatalogView(view)';
const script6Start = rawHtml.indexOf(script6Marker);
if (script6Start !== -1) {
  const tagStart = rawHtml.lastIndexOf('<script', script6Start);
  const codeStart = rawHtml.indexOf('>', tagStart) + 1;
  const script6End = rawHtml.indexOf('</script>', codeStart);
  script6 = rawHtml.substring(codeStart, script6End);
}

// 8. Extract pricelist-dynamic-script
let script7 = '';
const script7Start = rawHtml.indexOf('<script id="pricelist-dynamic-script">');
if (script7Start !== -1) {
  const script7End = rawHtml.indexOf('</script>', script7Start);
  script7 = rawHtml.substring(script7Start + 38, script7End);
}

// 9. Extract openPricelistModal script
let script8 = '';
const script8Marker = 'function openPricelistModal()';
const script8Start = rawHtml.indexOf(script8Marker);
if (script8Start !== -1) {
  const tagStart = rawHtml.lastIndexOf('<script', script8Start);
  const codeStart = rawHtml.indexOf('>', tagStart) + 1;
  const script8End = rawHtml.indexOf('</script>', codeStart);
  script8 = rawHtml.substring(codeStart, script8End);
}

// Combine all executable JavaScript
const allInlineJs = `
${script2}

${script5}

${script6}

${script7}

${script8}

${script3}

${script4}
`;

console.log('Total combined JS length:', allInlineJs.length);
console.log('mainHtml length:', mainHtml.length);
console.log('afterFooterHtml length:', afterFooterHtml.length);

// Save extracted assets
fs.writeFileSync('D:/Website Pelangi/dumb/scripts/extracted-layanan-main.html', mainHtml);
fs.writeFileSync('D:/Website Pelangi/dumb/scripts/extracted-layanan-modals.html', afterFooterHtml);
fs.writeFileSync('D:/Website Pelangi/dumb/scripts/extracted-layanan-scripts.js', allInlineJs);
console.log('Extracted files saved successfully!');
