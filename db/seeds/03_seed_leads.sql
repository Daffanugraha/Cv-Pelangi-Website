-- ============================================================================
-- SEED DATA: FORMULIR KONSULTASI & PROSPEK KLIEN (leads)
-- File: db/seeds/03_seed_leads.sql
-- Keterangan:
--   Jalankan query ini di Supabase SQL Editor untuk mengisi sampel data
--   prospek / pesan konsultasi klien B2B ke dalam tabel leads.
-- ============================================================================

INSERT INTO leads (
    id,
    name,
    company,
    phone,
    email,
    service,
    message,
    status,
    created_at
) VALUES 
(
    'lead_001',
    'Gunawan Wibisono',
    'PT Sinar Grafika Abadi Surabaya',
    '081234567890',
    'gunawan@sinargrafika.co.id',
    'Layanan Jasa Finishing > Spot UV Selektif (Spot UV Pasir & Gloss)',
    '[Kuantitas: 10.000 lembar plano] [Bahan: Ivory 350gsm] Mohon info estimasi penawaran harga finishing kombinasi spot UV pasir untuk dus skincare dan kesiapan jadwal produksi.',
    'new',
    NOW() - INTERVAL '2 hours'
),
(
    'lead_002',
    'Rina Wijaya',
    'CV Surya Packaging Malang',
    '081398765432',
    'rina.packaging@gmail.com',
    'Bahan Baku > Roll Stamping Foil (Hot Print Foil Emas & Rose Gold)',
    '[Kuantitas: 25 Roll] [Bahan: Foil 12 Micron] Memerlukan sampel swatch roll foil emas 12 micron dan info harga grosir roll per karton.',
    'contacted',
    NOW() - INTERVAL '1 day'
),
(
    'lead_003',
    'Fandi Ahmad',
    'Kopi Nusantara Roastery Sidoarjo',
    '085612348899',
    'fandi@kopinusantara.id',
    'Layanan Jasa Finishing > Pond & Die-Cut / Creasing (Emboss 3D)',
    '[Kuantitas: 5.000 pcs] [Bahan: Kraft Paper Laminated] Ingin konsultasi pembuatan hardbox hampers kopi dan ketepatan rel pond agar karton tebal tidak retak.',
    'sample_sent',
    NOW() - INTERVAL '3 days'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    company = EXCLUDED.company,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    service = EXCLUDED.service,
    message = EXCLUDED.message,
    status = EXCLUDED.status;
