-- ============================================================================
-- MODUL: PENGATURAN SITUS & ANNOUNCEMENT BANNER (Site Settings)
-- File: db/schemas/07_site_settings.sql
-- Digunakan oleh:
--   - UI Global: Header Banner, Footer Info Kontak, WhatsApp floating button
--   - UI Admin: /admin/pengaturan
--   - API: /api/admin/settings
--   - Data store: site_settings
-- ============================================================================

CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
