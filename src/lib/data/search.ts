export interface SearchCatalogItem {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon?: string;
  tag: string;
  categoryGroup: "semua" | "layanan" | "bahan" | "artikel" | "karir" | "galeri" | "momen";
}

export const searchCategories = [
  { key: "semua", label: "Semua" },
  { key: "layanan", label: "Layanan" },
  { key: "bahan", label: "Bahan Baku" },
  { key: "artikel", label: "Artikel & Berita" },
  { key: "karir", label: "Karir" },
  { key: "galeri", label: "Galeri Produk" },
  { key: "momen", label: "Momen & Kegiatan" },
] as const;

export const searchCatalog: SearchCatalogItem[] = [
  // ==========================================
  // 1. LAYANAN JASA FINISHING
  // ==========================================
  {
    title: "Hot Stamp Foil Gold & Silver",
    type: "Layanan Jasa",
    desc: "Finishing kilap emas, perak, rose gold berkecepatan tinggi",
    link: "/layanan?service=hotstamp",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Spot UV Vernis Kilap",
    type: "Layanan Jasa",
    desc: "Efek kilau dimensi presisi tinggi pada logo dan teks kemasan",
    link: "/layanan?service=spotuv",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Laminating Thermal Doff & Gloss",
    type: "Layanan Jasa",
    desc: "Pelapisan plastik BOPP termal tahan gores bebas gelembung",
    link: "/layanan?service=laminating",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Laminating Window Mika Box",
    type: "Layanan Jasa",
    desc: "Perekatan jendela mika transparan presisi untuk box kue, makanan & kemasan",
    link: "/layanan?service=window",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Cast and Cure Holographic",
    type: "Layanan Jasa",
    desc: "Efek pelangi mikro holografis modern tanpa mika plastik",
    link: "/layanan?service=castcure",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Pond & Die-Cut Presisi Rel Kemasan",
    type: "Layanan Jasa",
    desc: "Potong die-cut presisi dan garis rel tekukan dus kemasan karton",
    link: "/layanan?service=pond",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Micro Emboss Keamanan & Tekstur",
    type: "Layanan Jasa",
    desc: "Tekstur timbul mikro sub-milimeter anti pemalsuan & aksen eksklusif",
    link: "/layanan?service=microemboss",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Emboss & Deboss Timbul 3D",
    type: "Layanan Jasa",
    desc: "Efek timbul 3D fisik atau tenggelam presisi pada cover buku & packaging",
    link: "/layanan?service=emboss",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Transfer Metalized Paper Finishing",
    type: "Layanan Jasa",
    desc: "Transfer partikel foil metalik pengganti kertas metalized import",
    link: "/layanan?service=metalized",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Transfer PET Film Prismatik",
    type: "Layanan Jasa",
    desc: "Proteksi maksimal anti keausan dengan pantulan spektrum pelangi mewah",
    link: "/layanan?service=transferpet",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Cold Foil Inline Printing",
    type: "Layanan Jasa",
    desc: "Finishing foil inline berkecepatan tinggi dengan overprinting warna langsung",
    link: "/layanan?service=coldfoil",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Rewinding Foil Roll Penyesuaian Core",
    type: "Layanan Jasa",
    desc: "Penggulungan master roll foil ke gulungan shaft spesifik mesin cetak",
    link: "/layanan?service=rewinding",
    tag: "Layanan",
    categoryGroup: "layanan",
  },
  {
    title: "Potong Foil (Slitting) Lebar Custom",
    type: "Layanan Jasa",
    desc: "Jasa pemotongan slitting roll stamping foil presisi sesuai area klise",
    link: "/layanan?service=potongfoil",
    tag: "Layanan",
    categoryGroup: "layanan",
  },

  // ==========================================
  // 2. GROSIR BAHAN BAKU
  // ==========================================
  {
    title: "Bahan Baku Master Roll Foil",
    type: "Bahan Baku",
    desc: "Suplai roll foil stamping impor aneka ragam warna untuk percetakan",
    link: "/produk/bahan-baku?category=foil",
    tag: "Bahan Baku",
    categoryGroup: "bahan",
  },
  {
    title: "Plastik Film BOPP Laminasi Thermal",
    type: "Bahan Baku",
    desc: "Film thermal matte, glossy, dan soft touch velvet import pabrikan",
    link: "/produk/bahan-baku?category=opp",
    tag: "Bahan Baku",
    categoryGroup: "bahan",
  },
  {
    title: "Lem Wet Waterbase & Dry Thermal",
    type: "Bahan Baku",
    desc: "Lem laminasi food-grade daya rekat tinggi anti bau kemasan",
    link: "/produk/bahan-baku?category=lem",
    tag: "Bahan Baku",
    categoryGroup: "bahan",
  },
  {
    title: "Tinta & Varnish Spot UV LumineX",
    type: "Bahan Baku",
    desc: "Varnish UV ultra gloss 98 GU dan matte anti yellowing",
    link: "/produk/bahan-baku?category=spotuv",
    tag: "Bahan Baku",
    categoryGroup: "bahan",
  },

  // ==========================================
  // 3. ARTIKEL, BERITA & BLOG
  // ==========================================
  {
    title: "Jual Mesin Pond Manual ML 930 dan ML 750",
    type: "Artikel & Berita",
    desc: "Solusi presisi baja tuang HT250 untuk produksi kemasan karton skala menengah hingga besar",
    link: "/blog/jual-mesin-pond-manual-ml-930-ml-750",
    tag: "Mesin",
    categoryGroup: "artikel",
  },
  {
    title: "Mesin Pond Otomatis Terbaik 2025 Oyang WH 1050SS",
    type: "Artikel & Berita",
    desc: "Feeding non-stop 7.500 lembar/jam dengan sensor optik otomatis presisi lipatan kemasan",
    link: "/blog/mesin-pond-otomatis-terbaik-oyang-wh1050ss",
    tag: "Mesin",
    categoryGroup: "artikel",
  },
  {
    title: "Mesin Laminating Otomatis Canggih YZFM-850SA",
    type: "Artikel & Berita",
    desc: "Pemanas elektromagnetik bebas gelembung dan delaminasi pada film thermal doff & gloss",
    link: "/blog/mesin-laminating-otomatis-yzfm-850sa",
    tag: "Mesin",
    categoryGroup: "artikel",
  },
  {
    title: "Perbedaan Spot UV vs Hot Stamp Foil pada Kemasan",
    type: "Artikel & Berita",
    desc: "Panduan taktis memadukan kilap timbul varnish UV dan kemilau metalik foil emas",
    link: "/blog/perbedaan-spot-uv-vs-hot-stamp-foil",
    tag: "Tips Finishing",
    categoryGroup: "artikel",
  },
  {
    title: "Panduan Memilih Lem Wet vs Dry untuk Kemasan Frozen Food",
    type: "Artikel & Berita",
    desc: "Standar ketahanan daya rekat lem food-grade pada suhu beku minus derajat celcius",
    link: "/blog/panduan-memilih-lem-wet-vs-dry-laminating",
    tag: "Bahan Baku",
    categoryGroup: "artikel",
  },
  {
    title: "Mengatasi Masalah Delaminasi Hot Stamping Foil",
    type: "Artikel & Berita",
    desc: "Trik kalibrasi suhu plat 90°C–115°C dan dwell time agar foil menempel rapat tanpa kerut",
    link: "/blog/mengatasi-masalah-delaminasi-hot-stamping-foil",
    tag: "Tips Finishing",
    categoryGroup: "artikel",
  },
  {
    title: "Pelangi UV Ikut Meriahkan Surabaya Printing Expo 2024",
    type: "Artikel & Berita",
    desc: "Dokumentasi kunjungan booth dan uji coba sampel finishing premium di Grand City Surabaya",
    link: "/blog/pelangi-uv-ikut-meriahkan-event-surabaya-printing-expo-2024",
    tag: "Kabar Perusahaan",
    categoryGroup: "artikel",
  },
  {
    title: "Revolusi Cast and Cure: Hologram Ramah Lingkungan",
    type: "Artikel & Berita",
    desc: "Varnish UV nano-embossing ramah lingkungan tanpa film plastik mika konvensional",
    link: "/blog/revolusi-efek-cast-and-cure-hologram-ramah-lingkungan",
    tag: "Tips Finishing",
    categoryGroup: "artikel",
  },
  {
    title: "Penerapan Micro Emboss untuk Kemasan Farmasi & Obat",
    type: "Artikel & Berita",
    desc: "Tekstur timbul sub-milimeter sebagai fitur otentikasi segel keamanan anti pemalsuan",
    link: "/blog/standar-keamanan-kemasan-farmasi-micro-emboss",
    tag: "Tips Finishing",
    categoryGroup: "artikel",
  },

  // ==========================================
  // 4. KARIR & LOWONGAN KERJA (PELANGI LIFE)
  // ==========================================
  {
    title: "Lowongan Admin Pajak & Keuangan",
    type: "Lowongan Karir",
    desc: "Posisi Full-Time Finance di Bizpark Sidoarjo, PPh, PPN e-Faktur, Brevet A & B",
    link: "/karir#admin-pajak",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Lowongan Checker Gudang & Logistik",
    type: "Lowongan Karir",
    desc: "Posisi Full-Time Warehouse, hitung lembaran plano cetakan, mutasi barang & sistem FIFO",
    link: "/karir#checker-gudang",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Lowongan Marketing Executive Percetakan",
    type: "Lowongan Karir",
    desc: "Posisi B2B Sales & Account Executive kemitraan percetakan & packaging se-Jawa Timur",
    link: "/karir#marketing-executive",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Lowongan Operator Mesin Finishing Cetak",
    type: "Lowongan Karir",
    desc: "Posisi Produksi operator mesin Spot UV, Hot Stamping Foil, & Thermal Laminating",
    link: "/karir#operator-mesin-finishing",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Lowongan Teknisi Maintenance Mesin Industri",
    type: "Lowongan Karir",
    desc: "Posisi Pemeliharaan elektro-mekanikal 35+ mesin finishing, inverter, & kelistrikan pabrik",
    link: "/karir#teknisi-maintenance",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Lowongan Admin Operasional & SPK Produksi",
    type: "Lowongan Karir",
    desc: "Posisi Kontrol Surat Perintah Kerja, jadwal mesin antrean finishing, & koordinasi logistik",
    link: "/karir#admin-operasional",
    tag: "Karir",
    categoryGroup: "karir",
  },
  {
    title: "Pelangi Life (Budaya Kerja & Video Kegiatan)",
    type: "Karir & Budaya",
    desc: "Lihat video reels keseruan kerja tim, workshop modern Bizpark, dan fasilitas pabrik Pelangi UV",
    link: "/karir#pelangi-life",
    tag: "Pelangi Life",
    categoryGroup: "karir",
  },

  // ==========================================
  // 5. GALERI PENGAPLIKASIAN PRODUK
  // ==========================================
  {
    title: "Galeri Pengaplikasian Produk Kemasan",
    type: "Galeri Produk",
    desc: "Portofolio sampel dus kosmetik, farmasi, rokok, dan kemasan makanan premium",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
    categoryGroup: "galeri",
  },
  {
    title: "Sampel Kemasan Kosmetik & Skincare",
    type: "Galeri Produk",
    desc: "Hasil finishing foil emas dan spot UV pada packaging kosmetik premium",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
    categoryGroup: "galeri",
  },
  {
    title: "Sampel Kemasan Farmasi & Obat",
    type: "Galeri Produk",
    desc: "Aplikasi cetak presisi standar industri farmasi bebas cacat register",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
    categoryGroup: "galeri",
  },
  {
    title: "Sampel Dus Kue & Food Packaging",
    type: "Galeri Produk",
    desc: "Laminasi thermal food-grade anti minyak dan jendela mika window patch",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
    categoryGroup: "galeri",
  },

  // ==========================================
  // 6. GALERI MOMEN & DOKUMENTASI KEGIATAN
  // ==========================================
  {
    title: "Galeri Momen & Dokumentasi Kegiatan",
    type: "Dokumentasi",
    desc: "Dokumentasi pameran SPE Surabaya, kebersamaan tim, dan rekam jejak Pelangi UV",
    link: "/galeri/momen",
    tag: "Momen",
    categoryGroup: "momen",
  },
  {
    title: "Surabaya Printing Expo 2025 (SPE)",
    type: "Dokumentasi",
    desc: "Dokumentasi booth pameran percetakan akbar Surabaya Printing Expo 2025 Grand City",
    link: "/galeri/momen?filter=expo2025",
    tag: "Momen",
    categoryGroup: "momen",
  },
  {
    title: "Surabaya Printing Expo 2024",
    type: "Dokumentasi",
    desc: "Konsultasi teknis foil dan finishing bersama ribuan mitra percetakan",
    link: "/galeri/momen?filter=expo2024",
    tag: "Momen",
    categoryGroup: "momen",
  },
  {
    title: "Semarak Kemerdekaan HUT RI ke-79",
    type: "Dokumentasi",
    desc: "Keseruan lomba dan syukuran keluarga besar CV Pelangi UV Bizpark Sidoarjo",
    link: "/galeri/momen?filter=hut79",
    tag: "Momen",
    categoryGroup: "momen",
  },
  {
    title: "Employee Gathering 2023",
    type: "Dokumentasi",
    desc: "Rekreasi dan kebersamaan keluarga besar tim teknisi dan staf CV Pelangi UV",
    link: "/galeri/momen?filter=gathering2023",
    tag: "Momen",
    categoryGroup: "momen",
  },

  // ==========================================
  // 7. KONTAK & UNDUH KATALOG
  // ==========================================
  {
    title: "Hubungi Kami & Konsultasi Spesifikasi",
    type: "Kontak",
    desc: "Konsultasi gratis, alamat workshop Bizpark Sidoarjo, dan nomor WhatsApp",
    link: "/kontak",
    tag: "Kontak",
    categoryGroup: "semua",
  },
  {
    title: "Unduh Katalog Resmi CV Pelangi UV (PDF)",
    type: "Katalog",
    desc: "Download langsung file PDF spesifikasi lengkap layanan dan bahan baku",
    link: "/katalog/katalog-pelangi-uv.pdf",
    tag: "Unduh PDF",
    categoryGroup: "semua",
  },
];
