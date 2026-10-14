-- ============================================================================
-- MODUL: GALERI MOMEN & DOKUMENTASI KEGIATAN (Momen Albums)
-- File: db/schemas/05_momen_albums.sql
-- Digunakan oleh:
--   - UI Klien: /galeri/momen
--   - UI Admin: /admin/momen
--   - API: /api/momen, /api/admin/momen
--   - Data store: momen_albums
-- ============================================================================

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

CREATE INDEX IF NOT EXISTS idx_momen_albums_category ON momen_albums(category);
CREATE INDEX IF NOT EXISTS idx_momen_albums_order ON momen_albums(sort_order ASC);
