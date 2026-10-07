export interface CareerJob {
  id: string;
  title: string;
  division: "Finance" | "Marketing" | "Operational" | "Production" | "Warehouse";
  type: string;
  location: string;
  isOpen: boolean;
  qualifications: string[];
  responsibilities: string[];
}

export interface PelangiLifeReel {
  id: string;
  title: string;
  tag: string;
  category: string;
  duration: string;
  views: string;
  likes: string;
  thumbnail: string;
  instagramUrl: string;
  videoSrc?: string;
  caption: string;
}

export const PELANGI_LIFE_REELS: PelangiLifeReel[] = [
  {
    id: "reel-1",
    title: "Keseharian & Dedikasi Operator Mesin Finishing",
    tag: "Operator Life",
    category: "Produksi",
    duration: "0:30",
    views: "36.2K",
    likes: "2.1K",
    thumbnail: "/images/instagram/DdIes18TbKg.jpg",
    instagramUrl: "https://www.instagram.com/p/DdIes18TbKg/",
    videoSrc: "/videos/reels/reel-DdIes18TbKg.mp4",
    caption: "Cita-cita kalian dulu apa guys? Intip keseharian dan dedikasi operator mesin finishing cetak presisi di CV Pelangi UV.",
  },
  {
    id: "reel-2",
    title: "Semarak Kemerdekaan di Pelangi UV",
    tag: "Kebersamaan Tim",
    category: "Pelangi Life",
    duration: "0:55",
    views: "2.5K",
    likes: "25",
    thumbnail: "/images/instagram/DcH_ukFzQaq.jpg",
    instagramUrl: "https://www.instagram.com/p/DcH_ukFzQaq/",
    videoSrc: "/videos/reels/reel-DcH_ukFzQaq.mp4",
    caption: "Semarak Kemerdekaan di Pelangi UV! Mengadakan berbagai lomba seru bersama seluruh tim untuk terus berkarya bersama.",
  },
  {
    id: "reel-3",
    title: "Satu Tim, Satu Semangat: Employee Gathering Pelangi UV",
    tag: "Team Gathering",
    category: "Pelangi Life",
    duration: "0:48",
    views: "3.1K",
    likes: "24",
    thumbnail: "/images/instagram/DcuZvbjTsu3.jpg",
    instagramUrl: "https://www.instagram.com/p/DcuZvbjTsu3/",
    videoSrc: "/videos/reels/reel-DcuZvbjTsu3.mp4",
    caption: "Satu Tim, Satu Semangat, Satu Cerita. Momen kebersamaan dan energi baru tim CV Pelangi UV & CV GRC Sukses Sejahtera.",
  },
  {
    id: "reel-4",
    title: "Ragam Solusi Finishing: Spot UV, Hot Foil & Emboss",
    tag: "Produk & Jasa",
    category: "Layanan",
    duration: "0:41",
    views: "29.4K",
    likes: "1.8K",
    thumbnail: "/images/instagram/DdiyORrzfGw.jpg",
    instagramUrl: "https://www.instagram.com/p/DdiyORrzfGw/",
    videoSrc: "/videos/reels/reel-DdiyORrzfGw.mp4",
    caption: "Pilihan lengkap finishing percetakan & packaging: Mulai dari Spot UV, Hot Foil Stamping, Laminasi Doff/Glossy, hingga Pond & Emboss presisi.",
  },
];

export const CAREER_JOBS: CareerJob[] = [
  {
    id: "admin-pajak",
    title: "Admin Pajak & Keuangan",
    division: "Finance",
    type: "Full-Time (WFO)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal D3 / S1 Jurusan Pajak atau Akuntansi.",
      "Usia maksimal 35 tahun.",
      "Memiliki pengalaman kerja minimal 2 tahun di bidang perpajakan / akuntansi manufaktur.",
      "Memahami administrasi perpajakan (PPh 21, PPh 23, PPh Final, dan PPN e-Faktur).",
      "Menguasai Microsoft Excel tingkat menengah ke atas (VLOOKUP, Pivot, Rumus Logika).",
      "Memiliki sertifikat Brevet A & B menjadi nilai tambah.",
      "Mampu bekerja dengan tingkat ketelitian tinggi, jujur, dan berintegritas.",
    ],
    responsibilities: [
      "Mengumpulkan, mengatur, dan menyiapkan dokumen serta database perpajakan perusahaan.",
      "Menghitung, membayar, dan melaporkan SPT Masa dan Tahunan secara tepat waktu.",
      "Membuat perencanaan dan rekonsiliasi laporan keuangan terkait perpajakan.",
      "Memperbarui database pajak dan selalu up-to-date dengan regulasi pajak terbaru.",
      "Berkoordinasi dengan tim keuangan dan kantor pajak terkait verifikasi data.",
    ],
  },
  {
    id: "checker-gudang",
    title: "Checker Gudang & Logistik",
    division: "Warehouse",
    type: "Full-Time (WFO)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal SMA / SMK / D3 segala jurusan.",
      "Usia maksimal 30 tahun, kondisi fisik prima.",
      "Memiliki pengalaman kerja minimal 1 tahun sebagai checker gudang atau logistik percetakan/manufaktur.",
      "Teliti dalam menghitung jumlah lembaran plano kertas cetakan dan roll bahan baku.",
      "Mampu mengoperasikan hand pallet dan memahami sistem penataan barang FIFO.",
      "Terbiasa mencatat data mutasi barang masuk dan keluar dengan rapi.",
    ],
    responsibilities: [
      "Melakukan pengecekan fisik jumlah dan kondisi lembaran kertas cetakan yang masuk dari pelanggan percetakan.",
      "Memeriksa kesesuaian surat jalan antar-jemput barang dengan fisik lembaran sebelum diproses ke mesin finishing.",
      "Melakukan quality control akhir sebelum barang hasil finishing dimuat ke armada pengiriman.",
      "Membantu pengaturan stok roll foil, BOPP thermal film, dan lem di area rak gudang.",
    ],
  },
  {
    id: "marketing-executive",
    title: "Marketing & Account Executive Percetakan",
    division: "Marketing",
    type: "Full-Time (WFO & Field)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal D3 / S1 semua jurusan (diutamakan Komunikasi / Manajemen / Grafika).",
      "Usia maksimal 32 tahun.",
      "Memiliki pengalaman minimal 1–2 tahun di bidang sales B2B percetakan, packaging, atau agensi kreatif.",
      "Memiliki pemahaman dasar mengenai ragam finishing (Spot UV, Foil Stamping, Laminasi, Pond).",
      "Keahlian komunikasi, negosiasi, dan presentasi yang ramah dan solutif.",
      "Memiliki kendaraan pribadi dan SIM aktif.",
    ],
    responsibilities: [
      "Membangun dan memelihara hubungan kemitraan dengan percetakan, penerbit, dan brand packaging di Jawa Timur.",
      "Memberikan konsultasi teknis pemilihan jenis finishing yang tepat sesuai budget dan konsep desain klien.",
      "Menyusun kalkulasi estimasi penawaran harga finishing dan follow-up progress order.",
      "Mengantarkan Swatch Sample Kit fisik dan mempresentasikan portofolio finishing kepada calon mitra.",
    ],
  },
  {
    id: "operator-mesin-finishing",
    title: "Operator Mesin Finishing (Spot UV / Foil / Laminating)",
    division: "Production",
    type: "Full-Time (WFO)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal SMK Jurusan Grafika / Teknik Mesin / Otomotif / IPA.",
      "Usia maksimal 33 tahun.",
      "Memiliki pengalaman kerja minimal 1 tahun mengoperasikan mesin cetak offset / mesin finishing pasca-cetak.",
      "Mata awas, tidak buta warna, dan memiliki ketelitian mikron terhadap register posisi cetak.",
      "Disiplin terhadap SOP K3 pabrik dan target output lembaran harian.",
      "Bersedia bekerja dalam sistem shift jika diperlukan.",
    ],
    responsibilities: [
      "Mengoperasikan dan mengkalibrasi mesin Spot UV, Hot Stamp Foil, atau Thermal Laminating sesuai SPK produksi.",
      "Menyetel tekanan plat, kecepatan jalan kertas, dan suhu pemanas agar hasil cetak presisi dan tidak cacat.",
      "Melakukan pemeriksaan berkala terhadap kestabilan lem, ketebalan coating varnish, dan register foil.",
      "Menjaga kebersihan dan melakukan perawatan preventif harian pada mesin kerja.",
    ],
  },
  {
    id: "teknisi-maintenance",
    title: "Teknisi Maintenance Mesin Industri",
    division: "Operational",
    type: "Full-Time (WFO)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal SMK / D3 Teknik Elektro / Mekatronika / Teknik Mesin Industri.",
      "Usia maksimal 35 tahun.",
      "Berpengalaman minimal 2 tahun dalam pemeliharaan mesin industri cetak, motor listrik, dan inverter.",
      "Memahami rangkaian kelistrikan 3-phase, sistem kontrol PLC sederhana, hidrolik, dan pneumatik.",
      "Mampu membaca wiring diagram dan melakukan trouble-shooting mekanikal dengan cepat.",
    ],
    responsibilities: [
      "Melakukan pemeliharaan berkala (preventive maintenance) pada seluruh 35+ mesin finishing di workshop.",
      "Mendiagnosa dan mengatasi kendala teknis (troubleshooting) saat terjadi kendala operasional mesin.",
      "Memastikan ketersediaan suku cadang kritis dan pelumas mesin industri tetap aman.",
      "Mendukung optimalisasi efisiensi dan keamanan kelistrikan area pabrik.",
    ],
  },
  {
    id: "admin-operasional",
    title: "Admin Operasional & Surat Perintah Kerja (SPK)",
    division: "Operational",
    type: "Full-Time (WFO)",
    location: "Bizpark C17-C19, Sidoarjo",
    isOpen: true,
    qualifications: [
      "Pendidikan minimal D3 / S1 Manajemen, Administrasi, atau Grafika.",
      "Usia maksimal 28 tahun.",
      "Memiliki pengalaman kerja minimal 1 tahun di bidang administrasi produksi percetakan.",
      "Mahir Microsoft Office (Word, Excel) dan cepat beradaptasi dengan sistem software internal.",
      "Komunikatif, terbiasa berkoordinasi lintas divisi (marketing, gudang, dan operator pabrik).",
    ],
    responsibilities: [
      "Menerbitkan dan mengontrol Surat Perintah Kerja (SPK) finishing sesuai spesifikasi dari tim marketing.",
      "Memantau jadwal antrean lembaran plano per mesin agar proses finishing selesai tepat waktu.",
      "Mencatat data output lembaran harian dan membuat rekapitulasi efisiensi produksi.",
      "Mengkoordinasikan jadwal penjemputan dan pengiriman lembaran bersama tim driver armada Pelangi UV.",
    ],
  },
];
