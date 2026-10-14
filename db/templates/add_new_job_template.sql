-- ============================================================================
-- TEMPLATE: MENAMBAHKAN 1 LOWONGAN KERJA BARU
-- File: db/templates/add_new_job_template.sql
-- Petunjuk:
--   1. Ubah nilai 'id', 'title', 'division', 'qualifications', 'responsibilities'.
--   2. Copy & paste ke SQL Editor Supabase, lalu klik "RUN".
--   3. Lowongan akan langsung tampil di halaman /karir website.
-- ============================================================================

INSERT INTO career_jobs (
    id,
    title,
    division,
    type,
    location,
    is_open,
    qualifications,
    responsibilities
) VALUES (
    'posisi-baru-slug', -- ID unik (contoh: 'staff-desain-grafis', 'qc-inspector')
    'Staff Desain Grafis & Prepress', -- Judul lowongan kerja
    'Prepress', -- Divisi ('Production', 'Operational', 'Marketing', 'Finance', dll)
    'Full-Time (WFO)', -- Tipe pekerjaan ('Full-Time (WFO)', 'Part-Time', 'Magang / Internship')
    'Bizpark C17-C19, Sidoarjo', -- Lokasi penempatan kerja
    TRUE, -- Status: TRUE (Dibuka), FALSE (Ditutup)
    '[
      "Pendidikan minimal SMK / D3 Grafika, Desain Komunikasi Visual (DKV), atau jurusan relevan.",
      "Usia maksimal 28 tahun.",
      "Menguasai Adobe Illustrator, Photoshop, dan CorelDraw untuk pemisahan warna (separation) plat finishing.",
      "Memahami alur kerja prepress Spot UV, Foil Stamping, dan pembuatan pisau pond.",
      "Teliti, komunikatif, dan mampu bekerja dengan deadline ketat."
    ]'::jsonb,
    '[
      "Memeriksa kesiapan file desain cetak dari klien sebelum diproses ke mesin finishing.",
      "Membuat layout pisau pond dan film kalkir / plat UV sesuai toleransi mesin.",
      "Berkoordinasi dengan operator mesin dan admin SPK terkait spesifikasi teknis cetakan.",
      "Melakukan pengecekan proofing warna dan presisi register desain."
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    division = EXCLUDED.division,
    type = EXCLUDED.type,
    location = EXCLUDED.location,
    is_open = EXCLUDED.is_open,
    qualifications = EXCLUDED.qualifications,
    responsibilities = EXCLUDED.responsibilities,
    updated_at = CURRENT_TIMESTAMP;

-- ============================================================================
-- CONTOH CARA MENGUBAH STATUS LOWONGAN (BUKA / TUTUP):
-- ============================================================================
-- Untuk MENUTUP lowongan tertentu:
-- UPDATE career_jobs SET is_open = FALSE, updated_at = NOW() WHERE id = 'posisi-baru-slug';

-- Untuk MEMBUKA KEMBALI lowongan:
-- UPDATE career_jobs SET is_open = TRUE, updated_at = NOW() WHERE id = 'posisi-baru-slug';
