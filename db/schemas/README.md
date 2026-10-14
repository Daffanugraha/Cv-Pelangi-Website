# Panduan Skema SQL Modular - CV Pelangi UV

Struktur skema database SQL telah dipisahkan per modul fitur agar rapi, modular, dan mudah dikelola sesuai dengan arsitektur kode Next.js (App Router, REST API, & Dashboard Admin).

---

## 📁 Struktur Pemisahan File SQL (`db/schemas/`)

| File SQL | Tabel Database | Modul Fitur Kode | API Route Terkait | Halaman UI Terkait |
|---|---|---|---|---|
| [`01_career_jobs.sql`](./01_career_jobs.sql) | `career_jobs` | Lowongan Kerja | `/api/jobs`<br>`/api/admin/jobs` | `/karir`<br>`/karir/[slug]`<br>`/admin/karir` |
| [`02_job_applicants.sql`](./02_job_applicants.sql) | `job_applicants` | Rekrutmen & Berkas CV Pelamar | `/api/career-apply`<br>`/api/career-apply/upload`<br>`/api/admin/applicants` | Modal Lamar Karir<br>`/admin/pelamar` |
| [`03_leads.sql`](./03_leads.sql) | `leads` | Formulir Konsultasi Klien | `/api/admin/leads` | Form Konsultasi Beranda<br>`/kontak`<br>`/admin/leads` |
| [`04_gallery_products.sql`](./04_gallery_products.sql) | `gallery_products` | Katalog Produk & Finishing | `/api/admin/gallery` | Showcase Beranda<br>`/galeri/produk`<br>`/admin/galeri` |
| [`05_momen_albums.sql`](./05_momen_albums.sql) | `momen_albums` | Dokumentasi Kegiatan & Event | `/api/momen`<br>`/api/admin/momen` | `/galeri/momen`<br>`/admin/momen` |
| [`06_blog_articles.sql`](./06_blog_articles.sql) | `blog_articles` | Berita & Edukasi Grafika | `/api/blog`<br>`/api/admin/blog` | `/blog`<br>`/blog/[slug]`<br>`/admin/blog` |
| [`07_site_settings.sql`](./07_site_settings.sql) | `site_settings` | Pengaturan Situs & Banner | `/api/admin/settings` | Header Banner, Jam Operasional<br>`/admin/pengaturan` |

---

## 🚀 Cara Menjalankan Query

1. **Secara Modular (Per Fitur)**:
   - Jika Anda hanya ingin meng-update atau membuat tabel tertentu (misal hanya blog atau lowongan kerja), cukup copy isi file terkait di atas dan paste ke **SQL Editor Supabase**.
2. **Secara Sekaligus (All-in-One)**:
   - Gunakan file master [`db/schema.sql`](../schema.sql) untuk menjalankan inisialisasi seluruh tabel sekaligus dalam 1 kali klik.

---

## 💼 Cara Menambah Lowongan Kerja (Job) via SQL

Tersedia file khusus untuk manipulasi data lowongan kerja:
1. **Mengisi Seluruh Lowongan Resmi (Seed)**:
   - File: [`db/seeds/01_seed_career_jobs.sql`](../seeds/01_seed_career_jobs.sql)
   - Berisi 6 data lowongan lengkap (Operator Mesin, Teknisi, Admin SPK, Pajak, Gudang, Marketing) beserta kualifikasi dan tanggung jawabnya.
2. **Menambah 1 Lowongan Baru (Template)**:
   - File: [`db/templates/add_new_job_template.sql`](../templates/add_new_job_template.sql)
   - Salin dan ubah judul serta kualifikasi sesuai kebutuhan, lalu jalankan di Supabase SQL Editor.
3. **Mengubah Status Lowongan (Buka / Tutup)**:
   - Tutup lowongan: `UPDATE career_jobs SET is_open = FALSE, updated_at = NOW() WHERE id = 'posisi-slug';`
   - Buka lowongan: `UPDATE career_jobs SET is_open = TRUE, updated_at = NOW() WHERE id = 'posisi-slug';`

