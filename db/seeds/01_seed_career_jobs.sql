-- ============================================================================
-- SEED DATA: MENAMBAHKAN DATA LOWONGAN KERJA (career_jobs)
-- File: db/seeds/01_seed_career_jobs.sql
-- Keterangan:
--   Jalankan query ini di Supabase SQL Editor untuk mengisi atau mengupdate
--   seluruh data lowongan kerja resmi CV Pelangi UV.
-- ============================================================================

INSERT INTO career_jobs (
    id,
    title,
    division,
    type,
    location,
    is_open,
    qualifications,
    responsibilities
) VALUES 
(
    'operator-mesin-finishing',
    'Operator Mesin Finishing (Spot UV / Foil / Laminating)',
    'Production',
    'Full-Time (WFO)',
    'Bizpark C17-C19, Sidoarjo',
    TRUE,
    '[
      "Pendidikan minimal SMK Jurusan Grafika / Teknik Mesin / Otomotif / IPA.",
      "Usia maksimal 33 tahun.",
      "Memiliki pengalaman kerja minimal 1 tahun mengoperasikan mesin cetak offset / mesin finishing pasca-cetak.",
      "Mata awas, tidak buta warna, dan memiliki ketelitian mikron terhadap register posisi cetak.",
      "Disiplin terhadap SOP K3 pabrik dan target output lembaran harian.",
      "Bersedia bekerja dalam sistem shift jika diperlukan."
    ]'::jsonb,
    '[
      "Mengoperasikan dan mengkalibrasi mesin Spot UV, Hot Stamp Foil, atau Thermal Laminating sesuai SPK produksi.",
      "Menyetel tekanan plat, kecepatan jalan kertas, dan suhu pemanas agar hasil cetak presisi dan tidak cacat.",
      "Melakukan pemeriksaan berkala terhadap kestabilan lem, ketebalan coating varnish, dan register foil.",
      "Menjaga kebersihan dan melakukan perawatan preventif harian pada mesin kerja."
    ]'::jsonb
),
(
    'teknisi-maintenance',
    'Teknisi Maintenance Mesin Industri',
    'Operational',
    'Full-Time (WFO)',
    'Bizpark C17-C19, Sidoarjo',
    TRUE,
    '[
      "Pendidikan minimal SMK / D3 Teknik Elektro / Mekatronika / Teknik Mesin Industri.",
      "Usia maksimal 35 tahun.",
      "Berpengalaman minimal 2 tahun dalam pemeliharaan mesin industri cetak, motor listrik, dan inverter.",
      "Memahami rangkaian kelistrikan 3-phase, sistem kontrol PLC sederhana, hidrolik, dan pneumatik.",
      "Mampu membaca wiring diagram dan melakukan trouble-shooting mekanikal dengan cepat."
    ]'::jsonb,
    '[
      "Melakukan pemeliharaan berkala (preventive maintenance) pada seluruh 35+ mesin finishing di workshop.",
      "Mendiagnosa dan mengatasi kendala teknis (troubleshooting) saat terjadi kendala operasional mesin.",
      "Memastikan ketersediaan suku cadang kritis dan pelumas mesin industri tetap aman.",
      "Mendukung optimalisasi efisiensi dan keamanan kelistrikan area pabrik."
    ]'::jsonb
),
(
    'admin-operasional',
    'Admin Operasional & Surat Perintah Kerja (SPK)',
    'Operational',
    'Full-Time (WFO)',
    'Bizpark C17-C19, Sidoarjo',
    TRUE,
    '[
      "Pendidikan minimal D3 / S1 Manajemen, Administrasi, atau Grafika.",
      "Usia maksimal 28 tahun.",
      "Memiliki pengalaman kerja minimal 1 tahun di bidang administrasi produksi percetakan.",
      "Mahir Microsoft Office (Word, Excel) dan cepat beradaptasi dengan sistem software internal.",
      "Komunikatif, terbiasa berkoordinasi lintas divisi (marketing, gudang, dan operator pabrik)."
    ]'::jsonb,
    '[
      "Menerbitkan dan mengontrol Surat Perintah Kerja (SPK) finishing sesuai spesifikasi dari tim marketing.",
      "Memantau jadwal antrean lembaran plano per mesin agar proses finishing selesai tepat waktu.",
      "Mencatat data output lembaran harian dan membuat rekapitulasi efisiensi produksi.",
      "Mengkoordinasikan jadwal penjemputan dan pengiriman lembaran bersama tim driver armada Pelangi UV."
    ]'::jsonb
),
(
    'admin-pajak',
    'Admin Pajak & Keuangan',
    'Finance',
    'Full-Time (WFO)',
    'Bizpark C17-C19, Sidoarjo',
    FALSE,
    '[
      "Pendidikan minimal D3 / S1 Jurusan Pajak atau Akuntansi.",
      "Usia maksimal 35 tahun.",
      "Memiliki pengalaman kerja minimal 2 tahun di bidang perpajakan / akuntansi manufaktur.",
      "Memahami administrasi perpajakan (PPh 21, PPh 23, PPh Final, dan PPN e-Faktur).",
      "Menguasai Microsoft Excel tingkat menengah ke atas (VLOOKUP, Pivot, Rumus Logika).",
      "Memiliki sertifikat Brevet A & B menjadi nilai tambah.",
      "Mampu bekerja dengan tingkat ketelitian tinggi, jujur, dan berintegritas."
    ]'::jsonb,
    '[
      "Mengumpulkan, mengatur, dan menyiapkan dokumen serta database perpajakan perusahaan.",
      "Menghitung, membayar, dan melaporkan SPT Masa dan Tahunan secara tepat waktu.",
      "Membuat perencanaan dan rekonsiliasi laporan keuangan terkait perpajakan.",
      "Memperbarui database pajak dan selalu up-to-date dengan regulasi pajak terbaru.",
      "Berkoordinasi dengan tim keuangan dan kantor pajak terkait verifikasi data."
    ]'::jsonb
),
(
    'checker-gudang',
    'Checker Gudang & Logistik',
    'Warehouse',
    'Full-Time (WFO)',
    'Bizpark C17-C19, Sidoarjo',
    FALSE,
    '[
      "Pendidikan minimal SMA / SMK / D3 segala jurusan.",
      "Usia maksimal 30 tahun, kondisi fisik prima.",
      "Memiliki pengalaman kerja minimal 1 tahun sebagai checker gudang atau logistik percetakan/manufaktur.",
      "Teliti dalam menghitung jumlah lembaran plano kertas cetakan dan roll bahan baku.",
      "Mampu mengoperasikan hand pallet dan memahami sistem penataan barang FIFO.",
      "Terbiasa mencatat data mutasi barang masuk dan keluar dengan rapi."
    ]'::jsonb,
    '[
      "Melakukan pengecekan fisik jumlah dan kondisi lembaran kertas cetakan yang masuk dari pelanggan percetakan.",
      "Memeriksa kesesuaian surat jalan antar-jemput barang dengan fisik lembaran sebelum diproses ke mesin finishing.",
      "Melakukan quality control akhir sebelum barang hasil finishing dimuat ke armada pengiriman.",
      "Membantu pengaturan stok roll foil, BOPP thermal film, dan lem di area rak gudang."
    ]'::jsonb
),
(
    'marketing-executive',
    'Marketing & Account Executive Percetakan',
    'Marketing',
    'Full-Time (WFO & Field)',
    'Bizpark C17-C19, Sidoarjo',
    FALSE,
    '[
      "Pendidikan minimal D3 / S1 semua jurusan (diutamakan Komunikasi / Manajemen / Grafika).",
      "Usia maksimal 32 tahun.",
      "Memiliki pengalaman minimal 1–2 tahun di bidang sales B2B percetakan, packaging, atau agensi kreatif.",
      "Memiliki pemahaman dasar mengenai ragam finishing (Spot UV, Foil Stamping, Laminasi, Pond).",
      "Keahlian komunikasi, negosiasi, dan presentasi yang ramah dan solutif.",
      "Memiliki kendaraan pribadi dan SIM aktif."
    ]'::jsonb,
    '[
      "Membangun dan memelihara hubungan kemitraan dengan percetakan, penerbit, dan brand packaging di Jawa Timur.",
      "Memberikan konsultasi teknis pemilihan jenis finishing yang tepat sesuai budget dan konsep desain klien.",
      "Menyusun kalkulasi estimasi penawaran harga finishing dan follow-up progress order.",
      "Mengantarkan Swatch Sample Kit fisik dan mempresentasikan portofolio finishing kepada calon mitra."
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    division = EXCLUDED.division,
    type = EXCLUDED.type,
    location = EXCLUDED.location,
    is_open = EXCLUDED.is_open,
    qualifications = EXCLUDED.qualifications,
    responsibilities = EXCLUDED.responsibilities,
    updated_at = CURRENT_TIMESTAMP;
