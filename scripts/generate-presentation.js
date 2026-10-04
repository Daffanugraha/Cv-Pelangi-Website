const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const OUTPUT_DIR = path.resolve('..', 'presentasi-pelangi-uv');

// Ensure output directory exists outside dumb
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Locate Chrome or Edge
const chromePaths = [
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = chromePaths.find(p => fs.existsSync(p));
if (!executablePath) {
  console.error('No suitable Chrome or Edge browser found!');
  process.exit(1);
}

console.log('Using browser:', executablePath);
console.log('Output folder:', OUTPUT_DIR);

const pagesToCapture = [
  {
    name: '01-Beranda',
    url: 'http://localhost:3000/',
    slides: [
      { name: '01-Beranda-Hero-Jasa-Finishing', selector: '#beranda' },
      { name: '02-Beranda-Tentang-Kami', selector: '#tentang-kami' },
      { name: '03-Beranda-Layanan-Produk', selector: '#produk' },
      { name: '04-Beranda-Galeri-Finishing', selector: '#galeri' },
    ]
  },
  {
    name: '02-Katalog-Bahan-Baku',
    url: 'http://localhost:3000/produk/bahan-baku',
    slides: [
      { name: '05-Bahan-Baku-Hero-Pencarian', selector: '#hero-bahan-baku' },
      { name: '06-Bahan-Baku-Standar-Mutu', selector: '#standar-mutu-bahan' },
      { name: '07-Bahan-Baku-Katalog-Conveyor', selector: '#katalog-material' },
      { name: '08-Bahan-Baku-Formulir-Sampel', selector: '#form-sample-gratis' },
    ]
  },
  {
    name: '03-Kontak-Dan-Marketing',
    url: 'http://localhost:3000/kontak',
    slides: [
      { name: '09-Kontak-Hero', selector: 'main > div > section:first-of-type' },
      { name: '10-Kontak-Tim-Sales-Marketing', selector: '#tim-marketing' },
      { name: '11-Kontak-Lokasi-Pabrik-Warehouse', selector: '#lokasi-pabrik' },
    ]
  }
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2, // Retina 2x resolution for presentation-grade crispness
    },
  });

  const page = await browser.newPage();

  // Emulate print media for clean PDF rendering
  for (const pageConfig of pagesToCapture) {
    console.log(`\nNavigating to: ${pageConfig.url} (${pageConfig.name})`);
    
    await page.goto(pageConfig.url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait 2s for all animations, fonts and lazy images to settle
    await new Promise(r => setTimeout(r, 2500));

    // 1. Take Full Page Screenshot (Retina 2x resolution)
    const fullPngPath = path.join(OUTPUT_DIR, `${pageConfig.name}-FullPage.png`);
    console.log(`Saving full page screenshot: ${fullPngPath}`);
    await page.screenshot({
      path: fullPngPath,
      fullPage: true,
      type: 'png',
    });

    // 2. Export page to Presentation PDF
    const pdfPath = path.join(OUTPUT_DIR, `${pageConfig.name}.pdf`);
    console.log(`Saving PDF: ${pdfPath}`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '12mm',
        right: '12mm',
      },
    });

    // 3. Capture individual section slides
    if (pageConfig.slides) {
      for (const slide of pageConfig.slides) {
        try {
          const el = await page.$(slide.selector);
          if (el) {
            const slidePng = path.join(OUTPUT_DIR, `${slide.name}.png`);
            await el.screenshot({ path: slidePng, type: 'png' });
            console.log(`  -> Captured Slide: ${slide.name}.png`);
          }
        } catch (e) {
          // If selector not found, continue
        }
      }
    }
  }

  await browser.close();
  console.log('\nAll screenshots and PDFs have been successfully generated in:');
  console.log(OUTPUT_DIR);
}

run().catch(err => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
