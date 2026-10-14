-- ============================================================================
-- MODUL: ARTIKEL BLOG & EDUKASI GRAFIKA (Blog Articles)
-- File: db/schemas/06_blog_articles.sql
-- Digunakan oleh:
--   - UI Pembaca: /blog, /blog/[slug], Widget Berita Terkini di Beranda
--   - UI Admin: /admin/blog
--   - API: /api/blog, /api/admin/blog
--   - Data store: blog_articles
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_articles (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    category_key VARCHAR(100),
    date VARCHAR(50),
    read_time VARCHAR(50),
    views VARCHAR(50),
    comments_count VARCHAR(50),
    author VARCHAR(100) DEFAULT 'Admin Pelangi UV',
    description TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    key_takeaways JSONB DEFAULT '[]'::jsonb,
    content JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_created_at ON blog_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_articles(is_featured);
