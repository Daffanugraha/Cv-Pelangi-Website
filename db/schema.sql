-- ============================================================================
-- CV PELANGI UV - DATABASE SCHEMA (PostgreSQL)
-- File: db/schema.sql
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL LOWONGAN KERJA (career_jobs)
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

-- 3. TABEL PELAMAR KERJA (job_applicants)
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
    
    -- Status Seleksi
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'reviewed', 'interview', 'accepted', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_applicants_status ON job_applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON job_applicants(job_id);
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON job_applicants(created_at DESC);

-- 4. TABEL FORMULIR KONSULTASI / LEADS (leads)
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    service VARCHAR(150),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'sample_sent', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL KATALOG PRODUK FINISHING (gallery_products)
CREATE TABLE IF NOT EXISTS gallery_products (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    technique VARCHAR(150),
    image_url TEXT NOT NULL,
    file_name VARCHAR(255),
    sort_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL MOMEN & ALBUM KEGIATAN (momen_albums)
CREATE TABLE IF NOT EXISTS momen_albums (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    event_date VARCHAR(100),
    location VARCHAR(255),
    photos JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABEL PENGATURAN SITUS (site_settings)
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
