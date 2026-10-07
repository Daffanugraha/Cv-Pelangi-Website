# Reference: Konversi Stitch → Next.js (Mode A)

Baca file ini setiap kali diminta "convert" / "pindahin" satu halaman dari
`stitch-source/` ke `src/app/`.

## 1. Baca source

- Buka `stitch-source/<nama_halaman>/code.html` dan `screen.png` (lihat
  visualnya dulu sebelum ngoding).
- Kalau ada `cv_pelangi_uv/DESIGN.md`, itu source-of-truth warna/tipografi/
  spacing — cek dulu sebelum menebak nilai apa pun.

## 2. Sinkronkan design token (sekali di awal project, skip kalau sudah ada)

- Ambil `colors`, `typography` (fontFamily/fontSize/lineHeight/letterSpacing),
  dan `spacing`/`borderRadius` dari `DESIGN.md` atau dari blok
  `<script id="tailwind-config">tailwind.config={...}</script>` di dalam
  `code.html` → masukkan ke `tailwind.config.ts` sebagai `theme.extend`.
- Jangan hardcode hex/px di komponen — selalu lewat token Tailwind ini.

## 3. Buang cruft khusus Stitch (JANGAN ikut ke-copy ke komponen React)

Hapus semua ini saat memindahkan markup:
- `<script src="https://cdn.tailwindcss.com">` dan `<script id="tailwind-config">` (sudah digantikan `tailwind.config.ts`)
- Semua atribut/kelas debug: `data-stitch-orig-opacity`, `stitch-anim-fade-in`,
  inline `style="width:1280px;...overflow:hidden;position:relative;"` di
  `<html>`/`<body>`
- Trik `<img ... onerror="(function(){...})()">` yang dipakai Stitch untuk
  nyuntik JavaScript — logic di dalamnya perlu diambil, tapi ditulis ulang
  sebagai kode React biasa, bukan tetap sebagai `onerror` hack.
- Duplikasi `<link>` Google Fonts / Material Symbols kalau sudah didaftarkan
  global di `layout.tsx`.

## 4. Pecah jadi komponen, bukan satu file raksasa

- `code.html` biasanya punya komentar pemisah section
  (`<!-- ===... -->  <!-- N. NAMA SECTION -->`) — pakai itu sebagai batas
  komponen.
- Cek dulu apakah section itu sudah punya padanan reusable:
  `Navbar`, `Footer`, `FloatingActions`, `Hero`, `CtaBanner`, `Testimonial`,
  `PageHeader`, `Advantages`, `FeaturedServices`, `ContactForm`, `StatCard`,
  `ProductCard`, `SectionTitle`, `Button`. **Pakai/extend yang sudah ada
  dulu** sebelum bikin komponen baru.
- Section unik untuk halaman itu saja → komponen baru di
  `src/components/sections/<NamaSection>.tsx`, diimpor oleh
  `src/app/<route>/page.tsx`.
- Untuk header/footer/chatbot secara khusus, jangan ambil dari `code.html`
  halaman ini — baca `references/global-components.md` dan pakai acuan dari
  beranda saja.

## 5. Konversi interaktivitas vanilla JS → React

`code.html` hasil Stitch sering punya `<script>` inline dengan
`addEventListener`, `onclick="window.fn()"`, atau `IntersectionObserver`
(contoh: modal search, slider testimoni, tab "Profil/Produk/Keunggulan",
counter angka naik). Untuk masing-masing:
- Ubah jadi Client Component (`"use client"` di baris pertama).
- Ganti `document.getElementById` + `addEventListener` dengan
  `useState`/`useRef`/`useEffect`.
- Ganti `onclick="window.namaFungsi()"` dengan handler React biasa
  (`onClick={() => setIndex(i)}`).
- Counter/animasi angka & fade-in on-scroll boleh tetap pakai
  `IntersectionObserver` di `useEffect`, ATAU disederhanakan pakai
  Framer Motion (`whileInView`) kalau perilakunya setara — pilih yang lebih
  ringkas, jangan bawa dua-duanya.
- Pertahankan fungsinya persis (search yang bisa filter, slider yang bisa
  next/prev, dst) — ini bukan cuma soal tampilan.

## 6. Gambar

- URL gambar dari Stitch biasanya placeholder `lh3.googleusercontent.com/
  aida-public/...`. Biarkan dulu sebagai `<img>` biasa (bukan `next/image`,
  karena domain itu belum tentu mau didaftarkan permanen) dan **kasih tahu
  user di akhir** bahwa gambar itu masih placeholder Stitch dan sebaiknya
  diganti aset asli di `public/`.

## 7. Sambungkan ke sistem yang ada

- Kalau halaman perlu tampil di menu → tambahkan entri ke `navLinks` di
  `src/lib/data.ts`, bukan hardcode di `Navbar.tsx`.
- Kalau kontennya harusnya dinamis (produk, blog, dst) → ikuti pola fallback
  yang sudah ada: baca dari Postgres lewat endpoint `app/api/`, fallback ke
  `lib/data.ts` kalau tabel kosong.
- Link internal antar section (`href="#tentang-kami"`) tetap anchor biasa;
  link antar halaman (`href="/kontak"`) pakai `next/link`.

## 8. Checklist sebelum bilang "selesai"

- [ ] Tidak ada sisa `<script src="cdn.tailwindcss.com">` atau atribut
      `data-stitch-*` di kode akhir
- [ ] Semua warna/font pakai token Tailwind, bukan hex/px hardcode
- [ ] Section interaktif (search, slider, counter) tetap berfungsi sebagai
      React state, sudah dites logic-nya (bukan cuma copy-paste JS lama)
- [ ] Mobile-first: class default utk mobile, `md:`/`lg:` di atasnya
- [ ] Dicek minimal di 3 lebar: 375px, 768px, 1280px
- [ ] `alt` text gambar & `aria-label` tombol dipertahankan (jangan hilang
      pas refactor ke React)
- [ ] Halaman baru sudah masuk `navLinks` kalau memang perlu ada di menu
- [ ] Header/footer/chatbot TIDAK diambil dari `code.html` halaman ini —
      tetap ikut acuan beranda (lihat `references/global-components.md`)
