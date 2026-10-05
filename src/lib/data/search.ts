export interface SearchCatalogItem {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon?: string;
  tag: string;
}

export const searchCatalog: SearchCatalogItem[] = [
  // 1. Layanan Jasa Finishing
  {
    title: "Hot Stamp Foil Gold & Silver",
    type: "Layanan Jasa",
    desc: "Finishing kilap emas, perak, rose gold berkecepatan tinggi",
    link: "/layanan?service=hotstamp",
    tag: "Layanan",
  },
  {
    title: "Spot UV Vernis Kilap",
    type: "Layanan Jasa",
    desc: "Efek kilau dimensi presisi tinggi pada logo dan teks kemasan",
    link: "/layanan?service=spotuv",
    tag: "Layanan",
  },
  {
    title: "Laminating Thermal Doff & Gloss",
    type: "Layanan Jasa",
    desc: "Pelapisan plastik BOPP termal tahan gores bebas gelembung",
    link: "/layanan?service=laminating",
    tag: "Layanan",
  },
  {
    title: "Laminating Window Mika Box",
    type: "Layanan Jasa",
    desc: "Perekatan jendela mika transparan presisi untuk box kue, makanan & kemasan",
    link: "/layanan?service=window",
    tag: "Layanan",
  },
  {
    title: "Cast and Cure Holographic",
    type: "Layanan Jasa",
    desc: "Efek pelangi mikro holografis modern tanpa mika plastik",
    link: "/layanan?service=castcure",
    tag: "Layanan",
  },
  {
    title: "Pond & Die-Cut Presisi Rel Kemasan",
    type: "Layanan Jasa",
    desc: "Potong die-cut presisi dan garis rel tekukan dus kemasan karton",
    link: "/layanan?service=pond",
    tag: "Layanan",
  },
  {
    title: "Micro Emboss Keamanan & Tekstur",
    type: "Layanan Jasa",
    desc: "Tekstur timbul mikro sub-milimeter anti pemalsuan & aksen eksklusif",
    link: "/layanan?service=microemboss",
    tag: "Layanan",
  },
  {
    title: "Emboss & Deboss Timbul 3D",
    type: "Layanan Jasa",
    desc: "Efek timbul 3D fisik atau tenggelam presisi pada cover buku & packaging",
    link: "/layanan?service=emboss",
    tag: "Layanan",
  },
  {
    title: "Transfer Metalized Paper Finishing",
    type: "Layanan Jasa",
    desc: "Transfer partikel foil metalik pengganti kertas metalized import",
    link: "/layanan?service=metalized",
    tag: "Layanan",
  },
  {
    title: "Transfer PET Film Prismatik",
    type: "Layanan Jasa",
    desc: "Proteksi maksimal anti keausan dengan pantulan spektrum pelangi mewah",
    link: "/layanan?service=transferpet",
    tag: "Layanan",
  },
  {
    title: "Cold Foil Inline Printing",
    type: "Layanan Jasa",
    desc: "Finishing foil inline berkecepatan tinggi dengan overprinting warna langsung",
    link: "/layanan?service=coldfoil",
    tag: "Layanan",
  },
  {
    title: "Rewinding Foil Roll Penyesuaian Core",
    type: "Layanan Jasa",
    desc: "Penggulungan master roll foil ke gulungan shaft spesifik mesin cetak",
    link: "/layanan?service=rewinding",
    tag: "Layanan",
  },
  {
    title: "Potong Foil (Slitting) Lebar Custom",
    type: "Layanan Jasa",
    desc: "Jasa pemotongan slitting roll stamping foil presisi sesuai area klise",
    link: "/layanan?service=potongfoil",
    tag: "Layanan",
  },

  // 2. Grosir Bahan Baku
  {
    title: "Bahan Baku Master Roll Foil",
    type: "Bahan Baku",
    desc: "Suplai roll foil stamping impor aneka ragam warna untuk percetakan",
    link: "/produk/bahan-baku?category=foil",
    tag: "Bahan Baku",
  },
  {
    title: "Plastik Film BOPP Laminasi",
    type: "Bahan Baku",
    desc: "Film thermal matte, glossy, dan soft touch velvet import pabrikan",
    link: "/produk/bahan-baku?category=opp",
    tag: "Bahan Baku",
  },
  {
    title: "Lem Wet Waterbase & Dry Thermal",
    type: "Bahan Baku",
    desc: "Lem laminasi food-grade daya rekat tinggi anti bau",
    link: "/produk/bahan-baku?category=lem",
    tag: "Bahan Baku",
  },
  {
    title: "Tinta & Varnish Spot UV LumineX",
    type: "Bahan Baku",
    desc: "Varnish UV ultra gloss 98 GU dan matte anti yellowing",
    link: "/produk/bahan-baku?category=spotuv",
    tag: "Bahan Baku",
  },

  // 3. Galeri Pengaplikasian Produk
  {
    title: "Galeri Pengaplikasian Produk Kemasan",
    type: "Galeri Produk",
    desc: "Portofolio sampel dus kosmetik, farmasi, rokok, dan kemasan makanan",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
  },
  {
    title: "Sampel Kemasan Kosmetik & Skincare",
    type: "Galeri Produk",
    desc: "Hasil finishing foil emas dan spot UV pada packaging kosmetik premium",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
  },
  {
    title: "Sampel Kemasan Farmasi & Obat",
    type: "Galeri Produk",
    desc: "Aplikasi cetak presisi standar industri farmasi bebas cacat register",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
  },
  {
    title: "Sampel Dus Kue & Food Packaging",
    type: "Galeri Produk",
    desc: "Laminasi thermal food-grade anti minyak dan jendela mika window patch",
    link: "/galeri/pengaplikasian-produk",
    tag: "Galeri",
  },

  // 4. Galeri Momen & Dokumentasi Kegiatan
  {
    title: "Galeri Momen & Kegiatan Pelangi UV",
    type: "Dokumentasi",
    desc: "Dokumentasi pameran SPE Surabaya, kebersamaan tim, dan rekam jejak",
    link: "/galeri/momen",
    tag: "Momen",
  },
  {
    title: "Surabaya Printing Expo 2025 (SPE)",
    type: "Dokumentasi",
    desc: "Dokumentasi booth pameran percetakan akbar Surabaya Printing Expo 2025",
    link: "/galeri/momen",
    tag: "Momen",
  },
  {
    title: "Surabaya Printing Expo 2024",
    type: "Dokumentasi",
    desc: "Konsultasi teknis foil dan finishing bersama ribuan mitra percetakan",
    link: "/galeri/momen",
    tag: "Momen",
  },
  {
    title: "Semarak Kemerdekaan HUT RI ke-79",
    type: "Dokumentasi",
    desc: "Keseruan lomba dan syukuran keluarga besar CV Pelangi UV Bizpark Sidoarjo",
    link: "/galeri/momen",
    tag: "Momen",
  },
  {
    title: "Employee Gathering 2023",
    type: "Dokumentasi",
    desc: "Rekreasi dan kebersamaan keluarga besar tim teknisi dan staf CV Pelangi UV",
    link: "/galeri/momen",
    tag: "Momen",
  },

  // 5. Kontak & Unduh Katalog
  {
    title: "Hubungi Kami & Konsultasi Spesifikasi",
    type: "Kontak",
    desc: "Konsultasi gratis, alamat workshop Bizpark Sidoarjo, dan nomor WhatsApp",
    link: "/kontak",
    tag: "Kontak",
  },
  {
    title: "Unduh Katalog Resmi CV Pelangi UV (PDF)",
    type: "Katalog",
    desc: "Download langsung file PDF spesifikasi lengkap layanan dan bahan baku",
    link: "/katalog/katalog-pelangi-uv.pdf",
    tag: "Unduh PDF",
  },
];
