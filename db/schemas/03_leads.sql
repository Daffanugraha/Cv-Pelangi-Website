-- ============================================================================
-- MODUL: PROSPEK & KONSULTASI (Leads / Inquiries)
-- File: db/schemas/03_leads.sql
-- Digunakan oleh:
--   - UI Klien: Form Konsultasi di Beranda & Halaman Kontak (/kontak)
--   - UI Admin: /admin/leads
--   - API: /api/admin/leads
--   - Data store: leads
-- ============================================================================

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

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
