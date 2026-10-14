-- ============================================================================
-- MODUL: GALERI BERANDA (Video Reels & Mesin Finishing Beranda)
-- File: db/schemas/04_a_gallery_beranda.sql
-- Digunakan oleh:
--   - UI: Showcase Video Reels & Mesin di Halaman Utama (Beranda /)
--   - API: /api/instagram, /api/admin/gallery (type='beranda')
--   - Data store: gallery_beranda_videos (atau tabel gallery_beranda)
-- ============================================================================

CREATE TABLE IF NOT EXISTS gallery_beranda_videos (
    id VARCHAR(64) PRIMARY KEY,
    shortcode VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Finishing',
    tag VARCHAR(100),
    description TEXT,
    duration VARCHAR(50),
    capacity VARCHAR(100),
    source VARCHAR(100) DEFAULT 'Instagram Reels',
    image_url TEXT NOT NULL,
    video_url TEXT,
    embed_url TEXT,
    is_real BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_beranda_featured ON gallery_beranda_videos(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_beranda_order ON gallery_beranda_videos(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_beranda_tag ON gallery_beranda_videos(tag);

-- ============================================================================
-- QUERY: MENAMBAHKAN VIDEO REELS / SHOWCASE BERANDA BARU
-- ============================================================================
-- INSERT INTO gallery_beranda_videos (
--     id, shortcode, title, tag, description, duration, capacity, source,
--     image_url, video_url, embed_url, sort_order, featured
-- ) VALUES (
--     'reel-baru-1',
--     'ABC123xyz',
--     'Proses Spot UV Vernish Cepat Presisi',
--     'Spot UV',
--     'Review proses coating vernish spot UV berkecepatan 6.000 lembar per jam di workshop CV Pelangi UV.',
--     '0:45 • Pelangi UV',
--     'Solusi Percetakan',
--     'Instagram Reels',
--     '/images/instagram/sample.jpg',
--     'https://www.instagram.com/reel/ABC123xyz/',
--     'https://www.instagram.com/reel/ABC123xyz/embed/',
--     1,
--     TRUE
-- );
