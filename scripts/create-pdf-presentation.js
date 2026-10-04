const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PRESENTATION_DIR = path.resolve('..', 'presentasi-pelangi-uv');
const HTML_OUTPUT_PATH = path.join(PRESENTATION_DIR, 'presentasi.html');
const PDF_OUTPUT_PATH = path.join(PRESENTATION_DIR, 'Presentasi-Website-Pelangi-UV.pdf');

// Chrome executable detection
const chromePaths = [
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const executablePath = chromePaths.find(p => fs.existsSync(p));

function getBase64Image(filename) {
  const filePath = path.join(PRESENTATION_DIR, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

const imgHero = getBase64Image('01-Beranda-Hero-Jasa-Finishing.png');
const imgLayanan = getBase64Image('03-Beranda-Layanan-Produk.png');
const imgGaleri = getBase64Image('04-Beranda-Galeri-Finishing.png');
const imgConveyor = getBase64Image('07-Bahan-Baku-Katalog-Conveyor.png');
const imgSample = getBase64Image('08-Bahan-Baku-Formulir-Sampel.png');
const imgKontak = getBase64Image('09-Kontak-Hero.png');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Presentasi Website CV Pelangi UV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #0F0F11;
      color: #E2E8F0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .slide {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      position: relative;
      background: #121215;
      padding: 24mm 24mm 20mm 24mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Ambient Glow Accents */
    .glow-red {
      position: absolute;
      top: -100px;
      right: -100px;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(246, 84, 86, 0.22) 0%, transparent 70%);
      pointer-events: none;
    }

    .glow-blue {
      position: absolute;
      bottom: -100px;
      left: -100px;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(23, 85, 235, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Top Navigation bar on Slide */
    .slide-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 12px;
      margin-bottom: 18px;
    }

    .brand-tag {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #FFFFFF;
    }

    .brand-logo-text span {
      color: #F65456;
    }

    .brand-badge {
      font-size: 11px;
      font-weight: 600;
      color: #A0AEC0;
      background: rgba(255, 255, 255, 0.06);
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .slide-page-number {
      font-size: 12px;
      font-weight: 700;
      color: #F65456;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* Main Content Layout: Left Visual, Right Explanation */
    .slide-body {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 22px;
      flex: 1;
      align-items: center;
    }

    /* Screenshot Container */
    .screenshot-frame {
      background: #18181C;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
      max-height: 135mm;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .screenshot-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Explanation Card */
    .explanation-panel {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(246, 84, 86, 0.12);
      color: #F65456;
      border: 1px solid rgba(246, 84, 86, 0.3);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      align-self: flex-start;
    }

    .slide-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.25;
      color: #FFFFFF;
      letter-spacing: -0.5px;
    }

    .function-box {
      background: rgba(255, 255, 255, 0.04);
      border-left: 3px solid #F65456;
      padding: 12px 14px;
      border-radius: 0 10px 10px 0;
    }

    .function-label {
      font-size: 11px;
      font-weight: 700;
      color: #F65456;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .function-desc {
      font-size: 13px;
      line-height: 1.55;
      color: #CBD5E0;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      font-size: 12px;
      line-height: 1.5;
      color: #A0AEC0;
    }

    .feature-item strong {
      color: #FFFFFF;
    }

    .feature-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #F65456;
      margin-top: 6px;
      flex-shrink: 0;
    }

    /* Footer of Slide */
    .slide-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 10px;
      font-size: 11px;
      color: #718096;
    }

    /* Cover Page Specific Styles */
    .cover-slide {
      background: radial-gradient(circle at 80% 20%, rgba(246, 84, 86, 0.16) 0%, #101014 60%);
      padding: 30mm 26mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cover-logo {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 26px;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: -0.8px;
    }

    .cover-logo span {
      color: #F65456;
    }

    .cover-tagline {
      font-size: 13px;
      color: #A0AEC0;
      padding-left: 12px;
      border-left: 2px solid #F65456;
    }

    .cover-main {
      max-width: 200mm;
    }

    .cover-badge {
      display: inline-block;
      background: rgba(246, 84, 86, 0.15);
      border: 1px solid rgba(246, 84, 86, 0.35);
      color: #F65456;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      padding: 6px 16px;
      border-radius: 999px;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .cover-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 42px;
      font-weight: 900;
      line-height: 1.15;
      color: #FFFFFF;
      letter-spacing: -1.2px;
      margin-bottom: 16px;
    }

    .cover-title span {
      background: linear-gradient(135deg, #FFFFFF 30%, #F65456 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 16px;
      line-height: 1.6;
      color: #CBD5E0;
      max-width: 170mm;
    }

    .cover-meta {
      display: flex;
      gap: 40px;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .meta-box h4 {
      font-size: 11px;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .meta-box p {
      font-size: 13px;
      font-weight: 600;
      color: #E2E8F0;
    }
  </style>
</head>
<body>

  <!-- ==================== SLIDE 1: COVER ==================== -->
  <div class="slide cover-slide">
    <div class="glow-red"></div>
    <div class="cover-header">
      <div class="cover-logo">PELANGI <span>UV</span></div>
      <div class="cover-tagline">When Quality Be A Priority • Solusi Finishing Percetakan</div>
    </div>

    <div class="cover-main">
      <div class="cover-badge">Dokumen Presentasi Fitur Website</div>
      <h1 class="cover-title">
        Panduan Visual &amp; Penjelasan Fungsi Halaman <span>CV Pelangi UV</span>
      </h1>
      <p class="cover-subtitle">
        Dokumen ini merangkum struktur desain, tata letak, fungsi strategis setiap bagian (*Ini Untuk Apa*), serta penyatuan sistem galeri terpadu untuk presentasi resmi.
      </p>
    </div>

    <div class="cover-meta">
      <div class="meta-box">
        <h4>Target Audiens</h4>
        <p>Manajemen, Klien Percetakan &amp; Mitra B2B</p>
      </div>
      <div class="meta-box">
        <h4>Cakupan Pembahasan</h4>
        <p>Beranda, Layanan Finishing, Galeri Terpadu, Katalog Bahan, &amp; Kontak</p>
      </div>
      <div class="meta-box">
        <h4>Tanggal Rilis</h4>
        <p>September 2026 • Versi Final</p>
      </div>
    </div>
  </div>

  <!-- ==================== SLIDE 2: BERANDA - HERO ==================== -->
  <div class="slide">
    <div class="glow-red"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 01 • Beranda Utama</div>
      </div>
      <div class="slide-page-number">01 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgHero}" alt="Hero Beranda">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Bagian 1: Hero &amp; Kredibilitas</div>
        <h2 class="slide-title">Pusat Jasa Finishing Pasca-Cetak</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa?</div>
          <div class="function-desc">
            Pintu masuk utama (*first impression*) untuk memperkenalkan reputasi pabrik dengan 35 mesin finishing berkecepatan tinggi kepada pemilik percetakan &amp; penerbit.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Video Background Otomatis:</strong> Memberikan impresi workshop modern yang nyata dan beroperasi aktif tanpa henti.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Statistik Unggulan:</strong> Menampilkan kapasitas kerja (ratusan ribu lembar/hari) untuk memvalidasi kemampuan suplai proyek besar.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Direct CTA Button:</strong> Tombol pintas konsultasi WhatsApp dan unduh profil legalitas usaha.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Struktur Halaman Utama (Homepage)</span>
    </div>
  </div>

  <!-- ==================== SLIDE 3: BERANDA - LAYANAN PRODUK ==================== -->
  <div class="slide">
    <div class="glow-blue"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 01 • Layanan Finishing</div>
      </div>
      <div class="slide-page-number">02 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgLayanan}" alt="Layanan Finishing">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Bagian 2: Layanan Jasa Finishing</div>
        <h2 class="slide-title">4 Pilar Layanan Jasa Pasca-Cetak</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa?</div>
          <div class="function-desc">
            Menjelaskan keunggulan teknik dari 4 jasa finishing unggulan agar calon klien memahami spesifikasi hasil cetak yang akan mereka dapatkan.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Spot UV Varnish:</strong> Efek kilau basah 98 GU kontras tinggi untuk mempertegas logo atau elemen desain kemasan.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Hot &amp; Cold Foil Stamping:</strong> Sentuhan logam emas, perak, &amp; hologram ornamen mewah untuk etiket dan hardbox.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Laminasi Doff &amp; Glossy:</strong> Lapisan pelindung anti-gores, waterproof, dan tahan lipat 90 derajat.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Pond &amp; Emboss Otomatis:</strong> Pemotongan presisi pisau rotari hingga 7.000 lembar/jam bebas meleset.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Katalog Layanan Jasa Finishing Cetak</span>
    </div>
  </div>

  <!-- ==================== SLIDE 4: GALERI TERPADU ==================== -->
  <div class="slide">
    <div class="glow-red"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 01 • Galeri Terpadu</div>
      </div>
      <div class="slide-page-number">03 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgGaleri}" alt="Galeri Terpadu">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Bagian 3: Galeri Terpadu (Disatukan)</div>
        <h2 class="slide-title">Galeri Portofolio &amp; Video Reels</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa? (Galeri Disatukan)</div>
          <div class="function-desc">
            <strong>Disatukan menjadi satu galeri terpadu</strong> agar pengunjung langsung melihat bukti fisik (*social proof*) hasil jadi kemasan sekaligus video proses kerja workshop dalam satu layar tanpa perlu berpindah sub-menu.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Hasil Nyata Kemasan:</strong> Menampilkan contoh kemasan kosmetik, skincare, farmasi, &amp; buku eksklusif.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Video Reels Edukasi:</strong> Menampilkan video reels proses kerja di mesin berkecepatan tinggi dan teknik finishing khusus (seperti Cast &amp; Cure micro-emboss).</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Satu Akses Terpadu:</strong> Menghilangkan kebingungan navigasi pengguna dengan menyatukan dokumentasi pengaplikasian dan momen workshop.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Penyatuan Galeri Portofolio Satu Pintu</span>
    </div>
  </div>

  <!-- ==================== SLIDE 5: KATALOG BAHAN BAKU CONVEYOR ==================== -->
  <div class="slide">
    <div class="glow-blue"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 02 • Katalog Bahan Baku</div>
      </div>
      <div class="slide-page-number">04 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgConveyor}" alt="Katalog Bahan Baku Conveyor">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Halaman 2: Bahan Baku Finishing</div>
        <h2 class="slide-title">Katalog Conveyor Bergerak Loop</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa?</div>
          <div class="function-desc">
            Platform grosir e-katalog untuk menyuplai kebutuhan bahan baku percetakan se-Indonesia: Film BOPP, Foil Stamping, Lem Wet/Dry, dan Spot UV.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Animasi Conveyor Berjalan Halus (*Zero Blank*):</strong> Kartu bergerak terus secara perlahan (*42 detik loop*) untuk memberikan pengalaman visual interaktif tanpa henti.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Pause on Hover:</strong> Animasi otomatis berhenti saat kursor diarahkan agar pengguna leluasa membaca teks dan mengklik tombol.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Pop-up Pricelist Spesifik:</strong> Ketika tombol diklik, modal menampilkan daftar item harga lengkap hanya untuk kategori yang dipilih.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Katalog Bahan Baku Berjalan (*1x3 Continuous Loop*)</span>
    </div>
  </div>

  <!-- ==================== SLIDE 6: FORMULIR MINTA SAMPEL ==================== -->
  <div class="slide">
    <div class="glow-red"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 02 • Formulir Sampel Bahan</div>
      </div>
      <div class="slide-page-number">05 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgSample}" alt="Formulir Sampel Bahan">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Fitur Penutup Katalog Bahan</div>
        <h2 class="slide-title">Formulir Sampel Bahan Gratis</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa?</div>
          <div class="function-desc">
            Menghilangkan keraguan calon mitra sebelum melakukan order massal roll/drum dengan mengirimkan contoh fisik bahan langsung ke alamat mereka.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Integrasi Terpadu:</strong> Menggantikan sistem konsultasi terpisah menjadi satu formulir sampel yang praktis dan tidak tumpang tindih.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Pilihan Checkbox Interaktif:</strong> Pemesan dapat memilih varian bahan yang ingin dicoba (BOPP Thermal, Hot/Cold Foil, Lem, atau Spot UV).</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Format WhatsApp Otomatis:</strong> Pesan tersusun rapi dengan nama pemohon, alamat, dan sampel pilihan, siap diproses tim sales.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Formulir Permintaan Sampel Fisik Gratis</span>
    </div>
  </div>

  <!-- ==================== SLIDE 7: KONTAK & TIM MARKETING ==================== -->
  <div class="slide">
    <div class="glow-blue"></div>
    <div class="slide-header">
      <div class="brand-tag">
        <div class="brand-logo-text">PELANGI <span>UV</span></div>
        <div class="brand-badge">Halaman 03 • Kontak &amp; Lokasi Pabrik</div>
      </div>
      <div class="slide-page-number">06 / 06</div>
    </div>

    <div class="slide-body">
      <div class="screenshot-frame">
        <img src="${imgKontak}" alt="Kontak & Tim Marketing">
      </div>
      <div class="explanation-panel">
        <div class="section-badge">Halaman 3: Kontak &amp; Tim Marketing</div>
        <h2 class="slide-title">Konsultasi Personal &amp; Lokasi</h2>

        <div class="function-box">
          <div class="function-label">Ini Untuk Apa?</div>
          <div class="function-desc">
            Saluran konversi utama untuk menghubungkan calon klien dan pemilik percetakan langsung dengan konsultan teknis CV Pelangi UV.
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Kartu Tim Konsultan:</strong> Menampilkan foto dan kontak WhatsApp sales executive resmi untuk membangun rasa percaya.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Peta Presisi Google Maps:</strong> Lokasi jelas workshop dan pergudangan Bizpark Waru Sidoarjo untuk kemudahan antar-jemput barang cetak.</div>
          </div>
          <div class="feature-item">
            <span class="feature-bullet"></span>
            <div><strong>Formulir RFQ (Permintaan Penawaran):</strong> Tempat klien mengunggah rincian spesifikasi cetak untuk mendapatkan kalkulasi harga resmi.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>Dokumen Presentasi CV Pelangi UV</span>
      <span>Halaman Kontak, Lokasi Pabrik, &amp; Tim Penjualan</span>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync(HTML_OUTPUT_PATH, htmlContent, 'utf-8');
console.log('Generated presentation HTML at:', HTML_OUTPUT_PATH);

async function convertHtmlToPdf() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('file:///' + HTML_OUTPUT_PATH.replace(/\\\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  await page.pdf({
    path: PDF_OUTPUT_PATH,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  });

  await browser.close();
  console.log('Successfully generated presentation PDF at:');
  console.log(PDF_OUTPUT_PATH);
}

convertHtmlToPdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
