-- ============================================================================
-- MODUL: LOWONGAN KERJA (Careers)
-- File: db/schemas/01_career_jobs.sql
-- Digunakan oleh:
--   - UI: /karir, /karir/[slug]
--   - API: /api/jobs, /api/admin/jobs
--   - Data store: career_jobs
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS career_jobs (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    division VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT 'Full-Time (WFO)',
    location VARCHAR(255) DEFAULT 'Bizpark C17-C19, Sidoarjo',
    qualifications JSONB DEFAULT '[]'::jsonb,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_career_jobs_is_open ON career_jobs(is_open);
CREATE INDEX IF NOT EXISTS idx_career_jobs_division ON career_jobs(division);

-- ============================================================================
-- QUERY: MENAMBAHKAN LOWONGAN KERJA BARU (INSERT / UPSERT)
-- ============================================================================
-- Jalankan query di bawah ini di SQL Editor Supabase untuk menambah posisi baru:

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
    'posisi-baru-slug', -- ID unik url-friendly (contoh: 'staff-desain-grafis', 'qc-inspector')
    'Staff Desain Grafis & Prepress', -- Nama jabatan lowongan
    'Prepress', -- Divisi ('Production', 'Operational', 'Marketing', 'Finance', dll)
    'Full-Time (WFO)', -- Tipe pekerjaan
    'Bizpark C17-C19, Sidoarjo', -- Lokasi kerja
    TRUE, -- TRUE = Dibuka, FALSE = Ditutup
    '[
      "Pendidikan minimal SMK / D3 Grafika, DKV, atau jurusan terkait.",
      "Usia maksimal 28 tahun.",
      "Menguasai Adobe Illustrator & CorelDraw untuk separasi warna plat finishing.",
      "Memahami alur kerja prepress Spot UV, Foil Stamping, dan pisau pond."
    ]'::jsonb,
    '[
      "Memeriksa kesiapan file desain cetak dari klien sebelum diproses ke mesin finishing.",
      "Membuat layout pisau pond dan kalkir film UV sesuai toleransi mikron mesin.",
      "Berkoordinasi dengan operator mesin dan admin SPK terkait spesifikasi teknis cetakan."
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
-- QUERY: MENGUBAH STATUS LOWONGAN (BUKA / TUTUP)
-- ============================================================================
-- Menutup lowongan (pelamar tidak bisa melamar lagi):
-- UPDATE career_jobs SET is_open = FALSE, updated_at = NOW() WHERE id = 'posisi-baru-slug';

-- Membuka kembali lowongan:
-- UPDATE career_jobs SET is_open = TRUE, updated_at = NOW() WHERE id = 'posisi-baru-slug';
