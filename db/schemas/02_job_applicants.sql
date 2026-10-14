-- ============================================================================
-- MODUL: PELAMAR KERJA & PREVIEW CV (Recruitment / Applicants)
-- File: db/schemas/02_job_applicants.sql
-- Digunakan oleh:
--   - UI Pelamar: /karir (Modal Apply Karir & Fast-Track WA)
--   - UI Admin: /admin/pelamar (ApplicantCardItem, ApplicantDetailModal)
--   - API: /api/career-apply, /api/career-apply/upload, /api/admin/applicants
--   - Data store: job_applicants
-- ============================================================================

CREATE TABLE IF NOT EXISTS job_applicants (
    id VARCHAR(64) PRIMARY KEY,
    job_id VARCHAR(64) REFERENCES career_jobs(id) ON DELETE SET NULL,
    job_title VARCHAR(255) NOT NULL,
    
    -- Identitas & Pendidikan
    name VARCHAR(255) NOT NULL,
    birth_place_date VARCHAR(255),
    marital_status VARCHAR(50) DEFAULT 'Single',
    age VARCHAR(20),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    education VARCHAR(100),
    education_major VARCHAR(150),
    
    -- Pengalaman & Referensi
    has_experience VARCHAR(10) DEFAULT 'yes',
    experience TEXT,
    experience1 TEXT,
    experience2 TEXT,
    experience3 TEXT,
    reference1 TEXT,
    reference2 TEXT,
    reference_phone VARCHAR(100),
    reference_relation VARCHAR(100),
    
    -- Komitmen Kerja
    ready_no_work_no_pay VARCHAR(10) DEFAULT 'Ya',
    ready_overtime VARCHAR(10) DEFAULT 'Ya',
    expected_salary VARCHAR(100),
    expected_facilities TEXT,
    
    -- Evaluasi Diri & Skill
    three_weaknesses TEXT,
    three_strengths TEXT,
    five_skills TEXT,
    strengths TEXT,
    weaknesses TEXT,
    
    -- Portofolio & Berkas
    has_portfolio VARCHAR(10) DEFAULT 'no',
    portfolio_url TEXT,
    cv_url TEXT,
    file_name VARCHAR(255),
    
    -- Status Seleksi ('new', 'reviewed', 'interview', 'accepted', 'rejected')
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing untuk filter status dan performa query
CREATE INDEX IF NOT EXISTS idx_applicants_status ON job_applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON job_applicants(job_id);
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON job_applicants(created_at DESC);
