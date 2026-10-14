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
