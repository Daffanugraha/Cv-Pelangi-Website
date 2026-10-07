# Reference: Pengembangan Umum (Mode B)

Baca file ini kalau diminta menambah/mengubah fitur, halaman, komponen,
backend, atau database yang BUKAN hasil konversi dari `stitch-source/`.

## Urutan kerja standar

1. Data statis atau dari DB? → statis: taruh di `lib/data.ts`. Dinamis:
   tabel baru di `db/schema.sql` (pakai `CREATE TABLE IF NOT EXISTS`) +
   endpoint di `app/api/<nama>/route.ts` (`export const runtime = "nodejs"`
   kalau menyentuh `pg`, validasi input dengan `zod`).
2. Bikin komponen UI di `components/ui` atau `components/sections`.
3. Rakit jadi halaman di `app/<route>/page.tsx`, sambungkan ke `navLinks`
   kalau perlu muncul di menu.
4. Tambahkan animasi Framer Motion secukupnya (bukan wajib di semua elemen,
   dan hanya di Client Component).
5. Cek responsive di 3 breakpoint (375px / 768px / 1280px).
6. Update `README.md` kalau ada langkah setup baru (env var baru, dst).

## Aturan per bidang

- **Frontend**: Server Component secara default; `"use client"` HANYA kalau
  butuh state/event/animasi. Pakai komponen `ui/` yang sudah ada dulu.
- **Backend**: endpoint baru = 1 file `route.ts` per resource. Jangan pernah
  expose `DATABASE_URL`/kredensial ke client.
- **PostgreSQL**: struktur tabel HANYA lewat `db/schema.sql`, lalu
  `npm run db:migrate`. Query lewat helper `query()` di `lib/db.ts`, jangan
  bikin `Pool` baru di file lain.
- **CSS**: semua warna/radius/shadow/spacing custom di `tailwind.config.ts`.
  Referensi visual resmi: `stitch-source/cv_pelangi_uv/DESIGN.md`.
- **Deploy**: sudah siap Vercel (`vercel.json` ada). Env wajib:
  `DATABASE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.

## Yang TIDAK boleh dilakukan

- Jangan hardcode data sensitif (nomor WA asli, API key) langsung di kode —
  selalu lewat `.env` atau `lib/data.ts`.
- Jangan bikin sistem styling kedua (mis. CSS Modules terpisah) tanpa alasan
  kuat — konsisten satu sistem: Tailwind + token.
- Jangan hapus folder `stitch-source/` — itu referensi desain resmi client,
  dan jadi rujukan tiap kali konversi ulang atau ada revisi desain.
