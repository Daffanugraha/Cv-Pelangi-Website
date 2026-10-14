-- ============================================================================
-- MODUL: KATALOG PRODUK & GALERI FINISHING (Gallery Products)
-- File: db/schemas/04_gallery_products.sql
-- Digunakan oleh:
--   - UI Klien: /galeri/produk, /galeri/pengaplikasian-produk, Showcase Beranda
--   - UI Admin: /admin/galeri
--   - API: /api/admin/gallery
--   - Data store: gallery_products
-- ============================================================================

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

CREATE INDEX IF NOT EXISTS idx_gallery_products_category ON gallery_products(category);
CREATE INDEX IF NOT EXISTS idx_gallery_products_featured ON gallery_products(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_products_order ON gallery_products(sort_order ASC);
