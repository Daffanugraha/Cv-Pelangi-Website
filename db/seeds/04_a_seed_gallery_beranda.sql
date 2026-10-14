-- ============================================================================
-- SEED DATA: GALERI VIDEO REELS & SHOWCASE DI BERANDA (gallery_beranda_videos)
-- File: db/seeds/04_a_seed_gallery_beranda.sql
-- Keterangan:
--   Jalankan query ini di Supabase SQL Editor untuk mengisi video reels
--   dan showcase mesin beranda resmi CV Pelangi UV.
-- ============================================================================

INSERT INTO gallery_beranda_videos (
    id,
    shortcode,
    title,
    tag,
    category,
    duration,
    capacity,
    description,
    source,
    image_url,
    video_url,
    embed_url,
    sort_order,
    featured
) VALUES 
(
    'reel-1',
    'DdYdcznzLJY',
    'Apa Itu Cast & Cure? (Finishing Micro Emboss Hologram)',
    'Cast & Cure',
    'Finishing',
    '0:45 • Pelangi UV',
    'Edukasi Finishing',
    'Mau hasil cetak yang lebih mewah dan beda dari biasanya? Cobain finishing Cast & Cure dengan efek kilau hologram dan motif micro emboss khusus untuk packaging kosmetik, cover buku, dan label premium.',
    'Instagram Reels',
    '/images/instagram/DdYdcznzLJY.jpg',
    'https://www.instagram.com/reel/DdYdcznzLJY/',
    'https://www.instagram.com/reel/DdYdcznzLJY/embed/',
    0,
    TRUE
),
(
    'reel-2',
    'DdsU0jQTTiS',
    'Semua Kebutuhan Bahan Baku Finishing Cetak Ada di Pelangi UV',
    'Bahan Baku',
    'Finishing',
    '0:40 • Pelangi UV',
    'Grosir Material',
    'Bukan cuma hasil finishing yang harus bagus, bahan bakunya juga harus berkualitas! Tersedia OPP Thermal & Wet, Foil Hot Print, Lem Laminating, dan Tinta Spot UV berkualitas konsisten.',
    'Instagram Reels',
    '/images/instagram/DdsU0jQTTiS.jpg',
    'https://www.instagram.com/reel/DdsU0jQTTiS/',
    'https://www.instagram.com/reel/DdsU0jQTTiS/embed/',
    1,
    TRUE
),
(
    'reel-3',
    'DdiyORrzfGw',
    'Jasa Finishing Lengkap di Pelangi UV: Solusi Finishing Kemasan Anda',
    'Finishing Lengkap',
    'Finishing',
    '0:50 • Pelangi UV',
    'Solusi Percetakan',
    'Cetakan sudah jadi tapi masih kurang premium? Solusi lengkap finishing percetakan: Spot UV, Hot Print Foil Emas/Perak, Laminasi Doff/Glossy, Pond Otomatis, hingga Emboss & Deboss.',
    'Instagram Reels',
    '/images/instagram/DdiyORrzfGw.jpg',
    'https://www.instagram.com/reel/DdiyORrzfGw/',
    'https://www.instagram.com/reel/DdiyORrzfGw/embed/',
    2,
    TRUE
),
(
    'reel-4',
    'DckH2aLT3z4',
    'Workshop & Mesin Finishing Berkapasitas Besar di Sidoarjo',
    'Workshop & Mesin',
    'Finishing',
    '0:42 • Pelangi UV',
    'Kapasitas Industri',
    'Didukung lebih dari 35 unit mesin berkecepatan tinggi di Kompleks Pergudangan Bizpark Waru, Sidoarjo. Mampu melayani order finishing skala besar dengan lead time presisi.',
    'Instagram Reels',
    '/images/instagram/DckH2aLT3z4.jpg',
    'https://www.instagram.com/reel/DckH2aLT3z4/',
    'https://www.instagram.com/reel/DckH2aLT3z4/embed/',
    3,
    TRUE
),
(
    'reel-5',
    'Dce2j2cT5s1',
    'Presisi Mikron: Rahasia Hot Stamping Foil Rapi Tanpa Geser',
    'Presisi Foil',
    'Finishing',
    '0:48 • Pelangi UV',
    'Standar Kualitas',
    'Lihat bagaimana mesin automatic foil stamping kami bekerja dengan toleransi mikron, menghasilkan kilau tajam pada teks kecil dan ornamen rumit tanpa bleber.',
    'Instagram Reels',
    '/images/instagram/Dce2j2cT5s1.jpg',
    'https://www.instagram.com/reel/Dce2j2cT5s1/',
    'https://www.instagram.com/reel/Dce2j2cT5s1/embed/',
    4,
    TRUE
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    tag = EXCLUDED.tag,
    description = EXCLUDED.description,
    duration = EXCLUDED.duration,
    capacity = EXCLUDED.capacity,
    image_url = EXCLUDED.image_url,
    video_url = EXCLUDED.video_url,
    embed_url = EXCLUDED.embed_url,
    sort_order = EXCLUDED.sort_order,
    featured = EXCLUDED.featured;
