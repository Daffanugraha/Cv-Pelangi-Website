-- ============================================================================
-- MODUL: GALERI PENGAPLIKASIAN PRODUK & KEMASAN (Product Finishing Showcase)
-- File: db/schemas/04_b_gallery_produk.sql
-- Digunakan oleh:
--   - UI: /galeri/pengaplikasian-produk, /galeri/produk, Modal Swatch Kit
--   - API: /api/admin/gallery (type='produk')
--   - Data store: gallery_products
-- ============================================================================

CREATE TABLE IF NOT EXISTS gallery_products (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'kosmetik', 'makanan', 'buku', 'identity', 'paperbag', 'rokok'
    category_label VARCHAR(150), -- 'Kemasan Kosmetik & Luxury', 'Hardbox & Buku Eksklusif', dll
    technique VARCHAR(255), -- Kombinasi teknik finishing
    tag VARCHAR(100),
    description TEXT,
    badges JSONB DEFAULT '[]'::jsonb,
    material TEXT,
    notes TEXT,
    highlight VARCHAR(150),
    paper_suitability TEXT,
    result_characteristics TEXT,
    alternative_option TEXT,
    image_url TEXT NOT NULL,
    file_name VARCHAR(255),
    object_position VARCHAR(50) DEFAULT 'center',
    sort_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_products_category ON gallery_products(category);
CREATE INDEX IF NOT EXISTS idx_gallery_products_featured ON gallery_products(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_products_order ON gallery_products(sort_order ASC);

-- ============================================================================
-- QUERY: MENAMBAHKAN PRODUK PENGAPLIKASIAN FINISHING BARU
-- ============================================================================
-- INSERT INTO gallery_products (
--     id, title, category, category_label, technique, tag, description,
--     badges, material, notes, highlight, paper_suitability,
--     result_characteristics, alternative_option, image_url, sort_order, featured
-- ) VALUES (
--     'prod-baru-1',
--     'Kemasan Karton Gold Foil Hologram',
--     'kosmetik',
--     'Kemasan Kosmetik & Luxury',
--     'Thermal Doff + Hot Stamp Gold Hologram',
--     'Gold Hologram Foil',
--     'Hasil cetak packaging kosmetik dengan pantulan kilau spektrum warna pelangi yang elegan.',
--     '["Thermal Doff", "Gold Hologram", "Ivory 350gsm"]'::jsonb,
--     'Karton Ivory 350gsm Food-Grade',
--     'Foil menempel kuat dan tidak mudah rontok saat proses pond atau pengeleman lipatan.',
--     'Akurasi Mikron Pisau Pond',
--     'Ideal pada kertas ivory bergramatur 300 - 350 gsm.',
--     'Permukaan doff halus berpadu kontras dengan kilau emas hologram memukau.',
--     'Bisa ditambahkan aksen Spot UV timbul pada area logo merk.',
--     '/images/layanan/hot-stamping-foil.png',
--     1,
--     TRUE
-- );
