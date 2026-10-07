# Reference: Komponen Global — Header, Footer, Chatbot

Baca file ini setiap kali menyentuh `Navbar.tsx`, `Footer.tsx`, atau
`FloatingActions.tsx` — baik saat konversi Stitch maupun pengembangan biasa.

`Navbar`, `Footer`, dan `FloatingActions` dipasang sekali di
`src/app/layout.tsx` dan otomatis tampil di SEMUA halaman. Supaya konsisten,
**source-of-truth desainnya selalu `stitch-source/beranda_pelangi_uv_desktop/
code.html`** — walaupun halaman lain (kontak, produk, galeri, blog) punya
markup header/footer sendiri di masing-masing `code.html`-nya, **abaikan
itu**. Jangan bikin versi header/footer/chatbot yang beda-beda per halaman.

## Navbar (`src/components/layout/Navbar.tsx`)

Ambil dari `<header>` di beranda:
- Logo + menu utama: Beranda, Tentang Kami, Perjalanan, dropdown **Produk**
  (Layanan Jasa Finishing, Bahan Baku Finishing), Partner, Kontak, dropdown
  **Galeri** (Pengaplikasian Produk, Momen), Blog.
- Tombol search (bisa jadi modal React aktif kalau user minta fitur cari
  jalan, atau dekoratif dulu kalau belum).
- Switcher bahasa ID/EN (boleh dekoratif dulu selama belum ada halaman EN).
- Dua CTA: "Unduh Katalog" (outline) + "Pesan Sekarang" (solid, mengarah ke
  `#pesan-sekarang` atau halaman kontak).
- Versi Navbar yang sudah ada di project saat ini masih generic/simplified —
  upgrade ke versi lengkap ini, jangan biarkan beda dari source beranda.

## Footer (`src/components/layout/Footer.tsx`)

Ambil dari `<footer>` di beranda:
- Garis atas gradient 3 warna (merah → kuning → hijau).
- Logo + tagline + badge kecil "Industrial Grade Precision".
- Kolom "Menu Utama", kolom "Produk", kolom kontak/lokasi.
- Heading tiap kolom pakai bullet dot kecil
  (`<span className="w-2 h-2 rounded-full bg-bracket-border" />`), bukan
  heading polos seperti versi yang sekarang ada di project.

## Chatbot (`src/components/layout/FloatingActions.tsx`)

Di beranda, ini **bukan cuma tombol bulat WhatsApp** — ini widget chatbot
custom (`id="chatbot-widget"`, fixed bottom-right, z-index tinggi) yang
terdiri dari:
- Tombol pemicu bulat (collapsed state).
- Panel popup ±360–380px × 500–520px saat dibuka, header pakai gradient
  `from-[#b1212b] via-[#e5a00d] to-[#008744]`, logo bulat + status dot
  online berkedip.
- Badan chat di bawah header (isi pesan/quick-reply) — baca lanjutan
  `code.html` di sekitar `id="chatbot-widget"` untuk detail body & action
  sebelum implementasi, jangan menebak.

Bangun ulang sebagai Client Component React dengan `useState` untuk
buka/tutup panel — **jangan** cuma tombol WA polos seperti versi yang ada
sekarang. Kalau ternyata scope yang diinginkan cuma tombol WA sederhana
(tanpa panel chat interaktif penuh), **tanya user dulu** sebelum
menyederhanakan; jangan diam-diam downgrade dari desain aslinya.
