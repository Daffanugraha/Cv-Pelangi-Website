<p align="center">
  <img src="public/images/logo.png" alt="CV Pelangi UV Logo" width="220" />
</p>

<h1 align="center">CV Pelangi UV — Official Company Platform & Enterprise Admin Hub</h1>

<p align="center">
  <em>"When Quality Be A Priority" — Solusi Industri Finishing Percetakan, Distribusi Bahan Baku Pasca-Cetak & Sistem Rekrutmen Sejak 2004</em>
</p>

<p align="center">
  <a href="https://cv-pelangi-website.vercel.app"><img src="https://img.shields.io/badge/Live_Site-cv--pelangi--website.vercel.app-red?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" /></a>
  <img src="https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Groq_AI-Qwen_/_Llama-F55036?style=for-the-badge&logo=fastapi&logoColor=white" alt="Groq AI" />
  <img src="https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p align="center">
  <a href="https://cv-pelangi-website.vercel.app"><strong>Kunjungi Website Live »</strong></a>
  &nbsp;•&nbsp;
  <a href="#-fitur-utama-platform">Fitur Utama</a>
  &nbsp;•&nbsp;
  <a href="#-sistem-keamanan--admin-portal">Keamanan & Admin</a>
  &nbsp;•&nbsp;
  <a href="#-arsitektur--tech-stack">Tech Stack</a>
  &nbsp;•&nbsp;
  <a href="#-struktur-direktori">Struktur Direktori</a>
  &nbsp;•&nbsp;
  <a href="#-cara-menjalankan-lokal">Instalasi Lokal</a>
  &nbsp;•&nbsp;
  <a href="#-panduan-deploy-ke-vercel">Deploy ke Vercel</a>
</p>

---

## 📌 Ringkasan Proyek (Overview)

**CV Pelangi UV** adalah platform web korporat enterprise dan portal operasional digital modern untuk industri finishing pasca-cetak (*print finishing*) di Indonesia. Berlokasi di kawasan strategis **Kompleks Pergudangan Bizpark Tambak Sawah, Waru - Sidoarjo**, sistem ini menggabungkan profil pabrik, katalog layanan finishing presisi mikron, etalase grosir bahan baku impor, portofolio interaktif, portal rekrutmen karir mandiri, asisten konsultasi AI berbasis Groq Cloud, serta **Dashboard Admin CMS** yang terlindungi dengan proteksi sesi ketat dan analitik pengunjung 100% rill (real-time).

Dibangun dengan arsitektur **Next.js 14 App Router**, TypeScript ketat (*strict type-safety*), Tailwind CSS, dan sistem persistensi adaptif (Serverless `/tmp` fallback + PostgreSQL opsional), platform ini dirancang untuk performa super cepat, ramah SEO, dan bebas dari kendala sistem file di cloud.

---

## 🌟 Fitur Utama Platform

### 1. 🎨 Showcase Jasa Finishing Lengkap (`/layanan`)
* **13+ Solusi Finishing Pasca-Cetak**: Spot UV Gloss & Doff, Spot UV Pasir Taktil, Hot Stamping Foil (Gold, Silver, Hologram, Rose Gold), Laminasi Thermal BOPP (Doff, Glossy, Soft-Touch Velvet, Anti-Scratch), Pond & Die-Cut Otomatis, Emboss/Deboss Relief, Window Lamination Mika, serta Cast & Cure Holografis.
* **Spesifikasi & Kapasitas Produksi**: Panduan ukuran plano maksimal (hingga 105 x 75 cm), toleransi gramatur kertas (150 - 600 GSM), kapasitas mesin 200.000+ lembar/hari, dan estimasi waktu pengerjaan (*lead time*).

### 2. 📦 Katalog Grosir Bahan Baku Pasca-Cetak (`/produk/bahan-baku`)
* **Pasokan Bahan Industri Langsung**: Roll Foil Stamping (panjang 120m standar hingga jumbo roll 3.000m), Thermal BOPP Film, Lem Laminating Berbasis Air & Pelarut, serta Tinta & Varnish UV.
* **Layanan Custom Slitting**: Layanan pemotongan lebar roll presisi tinggi (akurasi ±0.5 mm) disesuaikan dengan dimensi silinder mesin mitra percetakan.

### 3. 🖼️ Galeri Portofolio & Dokumentasi Kegiatan (`/galeri`)
* **Pengaplikasian Produk Interaktif (`/galeri/pengaplikasian-produk`)**: Koleksi hasil cetak nyata kemasan rokok, skincare luxury, box bakery food-grade, buku hardcover, dan kartu nama premium. Dilengkapi modal inspeksi foto beresolusi tinggi dan sistem navigasi pagination dinamis (`1 2 3 ... N`).
* **Galeri Album Momen (`/galeri/momen`)**: Dokumentasi aktivitas workshop, ekspansi mesin, serta kegiatan kebersamaan tim CV Pelangi UV.

### 4. 💼 Portal Karir & Rekrutmen Mandiri (`/karir`)
* **Daftar Lowongan Pekerjaan Aktif**: Posisi Operator Mesin Pond, Operator Spot UV/Foil, Desainer Grafis Pre-Press, Staff QC, hingga Logistik.
* **Formulir Aplikasi Multi-Tahap Terintegrasi**: Pengisian biodata, riwayat pengalaman kerja, kontak referensi kerja, asesmen kepribadian & kesiapan kerja, serta unggah berkas CV/Resume (PDF/Doc) langsung ke server.

### 5. 📰 Portal Edukasi & Blog Percetakan (`/blog`)
* **Artikel Teknis Industri Percetakan**: Panduan teknis pengeleman lipatan box, standar kemasan pangan bersertifikat, teknik transfer metalized paper, dan inovasi mesin modern.
* **Pencarian Cerdas & Kategori**: Filter instan berdasarkan Mesin & Teknologi, Tips Finishing, Bahan Baku, dan Kabar Perusahaan.

### 6. 🤖 Pelangi AI Assistant 2.0 (`/api/chat`)
* **Didukung Mesin AI Groq Cloud**: Menggunakan model cerdas ultra-cepat (`qwen/qwen3.8-27b` / `llama3-70b-8192`) dengan latensi inferensi di bawah 1 detik.
* **Domain Knowledge Khusus Percetakan**: AI dirancang khusus menjawab pertanyaan seputar finishing cetak, bahan baku, gramatur kertas, dan estimasi pengerjaan.
* **Guardrail & Validasi Konteks**: Secara otomatis menolak dan mengarahkan kembali pertanyaan di luar topik percetakan (seperti teka-teki umum atau matematika acak).
* **Direct Kontak Tim Marketing**: Menghubungkan calon pelanggan langsung ke WhatsApp representatif resmi marketing (Bu Nurul Islamiyah, Mbak Fathia Rizky, Pak Aris Waluyo).

---

## 🛡️ Sistem Keamanan & Admin Portal (`/admin`)

Portal Admin dirancang khusus untuk operasional staf internal dengan standar keamanan dan kebersihan kode yang ketat:

### 1. 🔒 Proteksi Total Rute Admin via Next.js Edge Middleware
* Seluruh rute admin (`/admin/dashboard`, `/admin/karir`, `/admin/pelamar`, `/admin/blog`, `/admin/galeri`, `/admin/momen`, `/admin/leads`, `/admin/pengaturan`) diproteksi penuh oleh **Next.js Middleware ([`src/middleware.ts`](file:///D:/Website%20Pelangi/Cv-Pelangi-Website/src/middleware.ts))**.
* Akses langsung ke rute admin tanpa otorisasi login akan langsung dialihkan secara otomatis ke halaman login `/admin` (*HTTP 307 Redirect*).

### 2. ⏱️ Batas Sesi Login Otomatis 2 Jam (Auto-Logout)
* Token autentikasi menggunakan stempel waktu bertanda tangan dengan durasi aktif tepat **2 Jam (7.200 detik)**.
* Jika pengguna tidak aktif atau sesi melewati 2 jam, sistem secara otomatis menghanguskan sesi, menghapus cookie login, dan menendang pengguna kembali ke halaman login.
* Dilengkapi *watchdog* interval di sisi antarmuka ([`AdminShell.tsx`](file:///D:/Website%20Pelangi/Cv-Pelangi-Website/src/app/admin/AdminShell.tsx)) yang memverifikasi keaktifan sesi ke `/api/admin/auth/check`.

### 3. 🔐 Tampilan Login Bersih & Tanpa Kebocoran Kredensial
* Halaman login `/admin` sepenuhnya bersih: tidak ada tombol autofill, tidak ada teks pembocor password, dan dilengkapi fitur sensor intip kata sandi (*toggle eye visibility*).

### 4. 📊 Statistik Pengunjung 100% Rill (Live Tracking)
* Pelacak analitik otomatis ([`VisitorTracker.tsx`](file:///D:/Website%20Pelangi/Cv-Pelangi-Website/src/components/analytics/VisitorTracker.tsx)) mencatat setiap kunjungan halaman asli dan pengunjung unik (*unique visitor ID*) secara real-time.
* **Bebas dari data palsu (0 mock seed)**: Total Tayangan, Pengunjung Unik, Rata-Rata Harian, Grafik Batang (rentang 7, 14, 30 hari), Halaman Paling Sering Dilihat, Segmentasi Perangkat (Mobile, Desktop, Tablet), dan Sumber Rujukan (Google, Direct, WhatsApp, Instagram) mencerminkan trafik aktual.

### 5. 🛠️ Manajemen Konten CMS Lengkap
* **Kelola Pelamar Kerja (`/admin/pelamar`)**: Tinjau berkas masuk, verifikasi pengalaman dan referensi, ubah status lamaran (*Baru, Ditinjau, Wawancara, Diterima, Ditolak*), serta unduh CV pelamar.
* **Kelola Lowongan Karir (`/admin/karir`)**: Tambah posisi baru, ubah syarat kualifikasi, tutup atau buka status lowongan.
* **Kelola Artikel Berita (`/admin/blog`)**: Tambah, edit, dan hapus artikel dengan sistem penyimpanan adaptif aman dari error `EROFS` di Vercel.
* **Kelola Galeri & Momen (`/admin/galeri`, `/admin/momen`)**: Unggah foto portofolio dan album dokumentasi acara.
* **Kelola Pesan Prospek (`/admin/leads`)**: Pantau pesan masuk dari formulir penawaran dan hubungi pelanggan via WhatsApp.
* **Pengaturan Hotline & Website (`/admin/pengaturan`)**: Kelola nomor hotline WhatsApp, banner pengumuman, dan jam operasional pabrik.

---

## 🛠️ Arsitektur & Tech Stack

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router) | Server Components, Edge Middleware, Route Handlers, dan Optimasi Gambar |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Pengetikan statis ketat (*strict type-safety*) di seluruh komponen & API |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utilitas CSS modern dengan token desain resmi CV Pelangi UV |
| **Animasi** | [Framer Motion 11](https://www.framer.com/motion/) | Transisi halaman halus, akordeon, modal inspeksi, dan efek mikro |
| **AI Engine** | [Groq Cloud](https://groq.com/) (`qwen/qwen3.8-27b`) | Model inferensi bahasa alami ultra-cepat untuk chatbot konsultasi cetak |
| **Database** | File-based JSON + [PostgreSQL](https://www.postgresql.org/) (`pg`) | Dual-persistence: fallback instan di lokal/Vercel `/tmp` + sinkronisasi PostgreSQL jika `DATABASE_URL` terkonfigurasi |
| **Ikon & Font** | Material Symbols & Google Fonts | *Plus Jakarta Sans*, *Inter*, dan *Material Symbols Outlined* |
| **Hosting & CI/CD**| [Vercel](https://vercel.com/) | Deployment otomatis dari branch `main` GitHub, Global Edge CDN |

---

## 📁 Struktur Direktori

```bash
Cv-Pelangi-Website/
├── data/
│   └── admin/                 # Berkas data JSON lokal (analytics, applicants, blog, jobs, gallery, momen)
├── public/
│   ├── images/                # Logo resmi, katalog bahan, dan aset grafis
│   ├── uploads/               # Direktori berkas unggahan admin dan pelamar
│   └── videos/                # Video profil operasional workshop Bizpark
├── src/
│   ├── app/                   # Next.js 14 App Router
│   │   ├── admin/             # Portal Admin
│   │   │   ├── blog/          # CMS Berita & Artikel
│   │   │   ├── dashboard/     # Dasbor Analitik Statistik Pengunjung Rill
│   │   │   ├── galeri/        # Manajemen Portofolio Produk
│   │   │   ├── karir/         # Manajemen Lowongan Kerja
│   │   │   ├── leads/         # Manajemen Pesan Calon Klien
│   │   │   ├── momen/         # Manajemen Album Momen Kegiatan
│   │   │   ├── pelamar/       # Review Berkas Kandidat Pelamar
│   │   │   ├── pengaturan/    # Pengaturan Hotline & Situs
│   │   │   ├── AdminShell.tsx # Layout Shell Admin dengan Watchdog Sesi 2 Jam
│   │   │   └── page.tsx       # Halaman Login Admin Terproteksi
│   │   ├── api/               # API Route Handlers
│   │   │   ├── admin/         # API Endpoint CRUD Admin (Auth, Analytics, Blog, Jobs, Applicants, dll.)
│   │   │   ├── analytics/     # API Tracker Kunjungan Pengunjung Real-Time
│   │   │   ├── career-apply/  # API Pengiriman Lamaran Kerja & Upload CV
│   │   │   └── chat/          # API Chatbot AI Berbasis Groq
│   │   ├── blog/              # Halaman Publik Blog & Detail Artikel ([slug])
│   │   ├── galeri/            # Halaman Publik Portofolio & Momen
│   │   ├── karir/             # Halaman Publik Karir & Form Lamar Kerja
│   │   ├── kontak/            # Halaman Kontak & Tim Marketing
│   │   ├── layanan/           # Halaman Solusi Finishing Cetak
│   │   ├── produk/            # Halaman Grosir Foil & Bahan Baku
│   │   ├── layout.tsx         # Root Layout dengan Pelacak VisitorTracker
│   │   └── page.tsx           # Halaman Beranda Utama
│   ├── components/            # Komponen Modular (Admin, Layout, Sections, UI)
│   ├── context/               # React Context (LanguageContext ID/EN)
│   ├── lib/                   # Modul Backend (admin/auth, admin/session, admin/analytics, admin/db, db/postgres)
│   └── middleware.ts          # Next.js Edge Middleware Proteksi Akses Admin
├── tailwind.config.ts         # Konfigurasi Tema Tailwind
├── tsconfig.json              # Konfigurasi Compiler TypeScript
└── package.json               # Dependensi Proyek
```

---

## 🚀 Cara Menjalankan Lokal

### 1. Prasyarat Sistem
* **Node.js**: Versi `18.17.0` atau yang lebih baru
* **npm** atau **yarn**

### 2. Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/Daffanugraha/Cv-Pelangi-Website.git
cd Cv-Pelangi-Website

# 2. Pasang dependensi
npm install

# 3. Konfigurasi file environment (.env.local)
cp .env.example .env.local  # atau buat manual
```

### 3. Pengaturan Environment Variables (`.env.local`)
Tambahkan konfigurasi berikut ke dalam file `.env.local`:

```env
# Kunci API Asisten Chatbot AI (Groq Cloud)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=qwen/qwen3.8-27b

# Kredensial Login Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# (Opsional) Koneksi PostgreSQL jika ingin sinkronisasi cloud database
DATABASE_URL=
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser Anda di: **[http://localhost:3000](http://localhost:3000)**  
Portal Admin dapat diakses di: **[http://localhost:3000/admin](http://localhost:3000/admin)**

### 5. Memverifikasi Build Produksi
```bash
npm run build
npm run start
```

---

## ☁️ Panduan Deploy ke Vercel

Platform ini sudah dioptimasi 100% untuk lingkungan **Vercel Serverless**:

1. Pastikan seluruh perubahan kode sudah di-commit dan di-push ke branch `main` di GitHub.
2. Buka **[Vercel Dashboard](https://vercel.com/dashboard)** dan hubungkan repository `Daffanugraha/Cv-Pelangi-Website`.
3. Masukkan variabel environment di menu **Project Settings » Environment Variables**:
   * `GROQ_API_KEY`: Kunci API Groq Anda
   * `GROQ_MODEL`: `qwen/qwen3.8-27b`
   * `ADMIN_USERNAME`: Username admin (contoh: `admin`)
   * `ADMIN_PASSWORD`: Password admin pilihan Anda
   * `DATABASE_URL`: *(Opsional jika menggunakan Supabase/Neon)*
4. Tekan **Deploy**. Vercel akan otomatis melakukan build produksi (`npm run build`) dan menayangkan website dengan HTTPS aman secara instan.

---

<p align="center">
  Dikelola &amp; Dikembangkan untuk <strong>CV Pelangi UV</strong> &bull; Kompleks Pergudangan Bizpark Tambak Sawah Blok C17-C19, Waru - Sidoarjo.<br />
  Hak Cipta &copy; 2026 CV Pelangi UV. Seluruh Hak Dilindungi.
</p>
