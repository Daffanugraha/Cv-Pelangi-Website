export interface MomenPhoto {
  alt: string;
  caption: string;
  title: string;
  src: string;
  cardTitle: string;
  cardDesc: string;
}

export interface MomenAlbum {
  category: string;
  title: string;
  desc: string;
  photos: MomenPhoto[];
}

export interface MomenHighlight {
  filterKey: string;
  title: string;
  desc: string;
  img: string;
  caption: string;
  photos?: MomenPhoto[];
}

export const MOMEN_FILTERS = [
  { key: "all", label: "Semua Momen" },
  { key: "allinprintshanghai", label: "All in Print China (Shanghai)" },
  { key: "expo2026", label: "Surabaya Printing Expo 2026" },
  { key: "expo2025", label: "Printing Expo Surabaya 2025" },
  { key: "expo2024", label: "Surabaya Printing Expo 2024" },
  { key: "hut79", label: "HUT RI ke-79" },
  { key: "gathering2023", label: "Employee Gathering 2023" },
  { key: "expo2023", label: "Surabaya Printing Expo 2023" },
  { key: "momenpertama", label: "Momen Pertama" },
];

export const HERO_LOOPING_ITEMS = [
  "Studi Banding Global: All in Print China (Shanghai)",
  "Surabaya Printing Expo (SPE) 2026",
  "Pameran Industri Percetakan Nasional (SPE)",
  "Semangat Kebersamaan HUT RI ke-79",
  "Kegiatan Employee Gathering & Rekreasi Tim",
  "Surabaya Printing Expo (SPE) 2023",
  "Standarisasi Mutu Fasilitas Bengkel Modern",
  "Momen Pertama & Kilas Bersejarah Pelangi UV",
];

export const MOMEN_HIGHLIGHTS: MomenHighlight[] = [
  {
    "filterKey": "allinprintshanghai",
    "title": "All in Print China — Shanghai",
    "desc": "Studi banding dan riset inovasi teknologi percetakan grafika global CV Pelangi UV pada pameran internasional bergengsi The 10th All in Print China di Shanghai New International Expo Centre (SNIEC).",
    "img": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-1.png",
    "caption": "Delegasi CV Pelangi UV membentangkan spanduk resmi di depan landmark The 10th All in Print China di Shanghai New International Expo Centre (SNIEC).",
    "photos": [
      {
        "alt": "All in Print China Shanghai - Delegasi Pelangi UV di SNIEC",
        "caption": "Delegasi CV Pelangi UV membentangkan spanduk resmi di depan landmark The 10th All in Print China di Shanghai New International Expo Centre (SNIEC).",
        "title": "All in Print China — Delegasi Pelangi UV di SNIEC Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-1.png",
        "cardTitle": "Landmark SNIEC All in Print China",
        "cardDesc": "Kehadiran delegasi Pelangi UV di pameran percetakan grafika terbesar Asia di Shanghai New International Expo Centre."
      },
      {
        "alt": "All in Print China Shanghai - Pelepasan & Pembentangan Spanduk Resmi",
        "caption": "Rombongan tim dan jajaran manajemen CV Pelangi UV membentangkan spanduk resmi perjalanan studi teknologi grafika ke Shanghai.",
        "title": "All in Print China — Spanduk Resmi Itinerary Shanghai Trip",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-2.png",
        "cardTitle": "Delegasi Resmi Itinerary Shanghai Trip",
        "cardDesc": "Pembentangan spanduk resmi delegasi CV Pelangi UV mengawali rangkaian eksplorasi teknologi cetak dunia."
      },
      {
        "alt": "All in Print China Shanghai - Keberangkatan Bandara Juanda",
        "caption": "Persiapan keberangkatan tim dari Bandara Internasional Juanda Surabaya menuju Shanghai untuk agenda studi banding industri.",
        "title": "All in Print China — Keberangkatan dari Bandara Juanda",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-3.png",
        "cardTitle": "Titik Keberangkatan Bandara Juanda",
        "cardDesc": "Momen pelepasan rombongan delegasi di Bandara Internasional Juanda bersiap menuju pameran global di Shanghai."
      },
      {
        "alt": "All in Print China Shanghai - Malam Keakraban Delegasi & Mitra",
        "caption": "Sesi foto bersama delegasi CV Pelangi UV dan mitra bisnis internasional di pelataran berarsitektur klasik Shanghai pada malam hari.",
        "title": "All in Print China — Ramah Tamah Malam Hari di Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-4.png",
        "cardTitle": "Malam Keakraban Mitra Internasional",
        "cardDesc": "Pertemuan hangat bersama mitra industri percetakan usai seharian meninjau pameran mesin finishing grafika."
      },
      {
        "alt": "All in Print China Shanghai - Kebersamaan Menjelajah Kota Shanghai",
        "caption": "Kebersamaan dan semangat kekeluargaan rombongan delegasi CV Pelangi UV menikmati suasana kota metropolitan Shanghai.",
        "title": "All in Print China — Eksplorasi Kota Metropolitan Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-5.png",
        "cardTitle": "Kebersamaan Rombongan Delegasi",
        "cardDesc": "Mempererat relasi dan kekompakan tim di sela-sela agenda padat riset inovasi percetakan global."
      }
    ]
  },
  {
    "filterKey": "expo2026",
    "title": "Surabaya Printing Expo (SPE) 2026",
    "desc": "Dokumentasi kehadiran booth CV Pelangi UV & CV GRC Sukses Sejahtera menampilkan solusi mesin industri grafika, vacuum pumps Becker, dan display material hot stamping foil berstandar ekspor di ajang akbar Surabaya Printing Expo 2026.",
    "img": "/images/momen/expo-2026/spe-2026-booth-utama.png",
    "caption": "Kemegahan instalasi booth resmi CV Pelangi UV & CV GRC Sukses Sejahtera menampilkan display inovasi industri dan material foil lengkap di SPE 2026.",
    "photos": [
      {
        "alt": "Surabaya Printing Expo 2026 - Stand Utama Pelangi UV & CV GRC",
        "caption": "Kemegahan instalasi booth resmi CV Pelangi UV & CV GRC Sukses Sejahtera menampilkan display inovasi industri dan material foil lengkap di SPE 2026.",
        "title": "SPE 2026 — Booth Resmi Pelangi UV & CV GRC Sukses Sejahtera",
        "src": "/images/momen/expo-2026/spe-2026-booth-utama.png",
        "cardTitle": "Stand Utama Pelangi UV & CV GRC",
        "cardDesc": "Instalasi booth modern memamerkan ragam solusi finishing kemasan komersial dan material foil premium."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Sinergi Tim Stand & Mitra Strategis",
        "caption": "Kekompakan tim profesional CV Pelangi UV bersama mitra strategis APRIL dan PT Ultima Solusi Paperindo menyambut pengunjung pameran.",
        "title": "SPE 2026 — Sinergi Tim Stand & Kolaborasi Mitra Strategis",
        "src": "/images/momen/expo-2026/spe-2026-tim-stand.png",
        "cardTitle": "Sinergi Tim & Mitra Stand",
        "cardDesc": "Kolaborasi solid tim CV Pelangi UV bersama principal industri grafika nasional menghadirkan layanan terpadu."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Konsultasi Teknis Spesifikasi Foil",
        "caption": "Edukasi dan konsultasi langsung mengenai variasi warna, ketahanan kilap, dan register hot stamping foil berstandar ekspor.",
        "title": "SPE 2026 — Konsultasi Teknis Spesifikasi Roll Foil",
        "src": "/images/momen/expo-2026/spe-2026-konsultasi-foil.png",
        "cardTitle": "Konsultasi Spesifikasi Foil",
        "cardDesc": "Penjelasan langsung karakter material foil emas, perak, dan hologram untuk kemasan produk."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Expo",
        "caption": "Display unit mesin industri grafika terintegrasi di booth pameran Surabaya Printing Expo 2026.",
        "title": "SPE 2026 — Expo",
        "src": "/images/momen/expo-2026/spe-2026-showcase-mesin.png",
        "cardTitle": "Expo",
        "cardDesc": "Dokumentasi instalasi unit mesin industri dan display teknologi grafika di booth pameran Surabaya Printing Expo."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Display Swatch Roll Foil Premium",
        "caption": "Presentasi etalase swatch roll foil dengan aneka gradasi warna metalik dan hologram untuk packaging eksklusif.",
        "title": "SPE 2026 — Showcase Swatch Roll Foil & Katalog Layanan",
        "src": "/images/momen/expo-2026/spe-2026-display-swatch-foil.png",
        "cardTitle": "Showcase Swatch Foil & Katalog",
        "cardDesc": "Deretan pilihan roll foil hot stamping berkualitas prima untuk menunjang nilai estetika kemasan."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Antusiasme Pengunjung Memadati Booth",
        "caption": "Tingginya antusiasme pelaku industri kemasan dan percetakan B2B memadati area booth CV Pelangi UV sepanjang pameran berlangsung.",
        "title": "SPE 2026 — Antusiasme Mitra B2B Memadati Booth",
        "src": "/images/momen/expo-2026/spe-2026-antusiasme-pengunjung.png",
        "cardTitle": "Antusiasme Pengunjung B2B",
        "cardDesc": "Ratusan pengunjung memadati booth untuk berkonsultasi seputar layanan finishing dan supply bahan baku."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Konsultasi Brosur Layanan & Media Display",
        "caption": "Pengunjung mempelajari brosur price list layanan dan melihat video demonstrasi mesin finishing cetak di layar monitor booth.",
        "title": "SPE 2026 — Konsultasi Brosur Layanan & Media Interaktif",
        "src": "/images/momen/expo-2026/spe-2026-konsultasi-brosur.png",
        "cardTitle": "Eksplorasi Brosur & Layanan",
        "cardDesc": "Pemberian informasi komprehensif melalui brosur teknis dan display visual proses finishing modern."
      }
    ]
  },
  {
    "filterKey": "expo2025",
    "title": "Printing Expo Surabaya 2025",
    "desc": "Dokumentasi keikutsertaan booth CV Pelangi UV & CV GRC Sukses Sejahtera memamerkan solusi cetak kemasan dan konsultasi teknis B2B di gelaran Printing Expo Surabaya 2025.",
    "img": "/images/momen/expo-2025/expo-2025-1.jpg",
    "caption": "Showcase kemasan ekspor dan konsultasi teknis bersama mitra percetakan grafika di ajang SPE 2025.",
    "photos": [
      {
        "alt": "Printing Expo Surabaya 2025 - Dokumentasi Booth & Showcase",
        "caption": "Showcase kemasan ekspor dan konsultasi teknis bersama mitra percetakan grafika di ajang SPE 2025.",
        "title": "Printing Expo Surabaya 2025 - Dokumentasi Booth & Showcase",
        "src": "/images/momen/expo-2025/expo-2025-1.jpg",
        "cardTitle": "Kompilasi Dokumentasi Booth",
        "cardDesc": "Dokumentasi keikutsertaan tim Pelangi UV & CV GRC Sukses Sejahtera di SPE 2025."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Foto Bersama Pengunjung",
        "caption": "Keceriaan tim pameran bersama mitra percetakan dan pengunjung profesional industri kemasan.",
        "title": "Printing Expo Surabaya 2025 - Sinergi Bersama Mitra",
        "src": "/images/momen/expo-2025/expo-2025-2.jpg",
        "cardTitle": "Foto Bersama Pengunjung Booth",
        "cardDesc": "Antusiasme trade visitor dan pelaku industri percetakan mengunjungi stand Pelangi UV."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Sampel Roll Foil Emas & Hologram",
        "caption": "Mitra percetakan berfoto bersama tim booth sembari memegang sampel roll foil cetak.",
        "title": "Printing Expo Surabaya 2025 - Pengenalan Bahan & Foil",
        "src": "/images/momen/expo-2025/expo-2025-3.jpg",
        "cardTitle": "Kunjungan Mitra & Sampel Foil",
        "cardDesc": "Penjelasan langsung aplikasi roll foil emas, hologram, dan standar finishing ekspor."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Tim Hospitality Stand",
        "caption": "Tim hospitality menyambut hangat setiap rekan industri grafika dan kemasan komersial.",
        "title": "Printing Expo Surabaya 2025 - Tim Hospitality Stand",
        "src": "/images/momen/expo-2025/expo-2025-4.jpg",
        "cardTitle": "Hospitality & Goodie Bag Mitra",
        "cardDesc": "Pelayanan ramah tim CV Pelangi UV membagikan sampel eksklusif kemasan."
      }
    ]
  },
  {
    "filterKey": "expo2024",
    "title": "Surabaya Printing Expo (SPE) 2024",
    "desc": "Konsultasi spesifikasi hot stamping foil, varnish UV, dan kemasan berstandar ekspor bersama para pelaku industri percetakan nasional di SPE 2024.",
    "img": "/images/momen/expo-2024/expo-2024-1.jpg",
    "caption": "Foto bersama seluruh tim representatif Pelangi UV di area booth pameran SPE 2024.",
    "photos": [
      {
        "alt": "Surabaya Printing Expo 2024 - Tim Berseragam Merah",
        "caption": "Foto bersama seluruh tim representatif Pelangi UV di area booth pameran SPE 2024.",
        "title": "SPE 2024 - Tim Solid Seragam Merah",
        "src": "/images/momen/expo-2024/expo-2024-1.jpg",
        "cardTitle": "Tim Stand CV Pelangi UV",
        "cardDesc": "Kekompakan tim profesional CV Pelangi UV berseragam merah menyambut insan percetakan."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Konsultasi Teknis Pengunjung",
        "caption": "Sesi temu tatap muka dan penjelasan detail teknis register finishing di meja konsultasi booth.",
        "title": "SPE 2024 - Konsultasi Teknis Finishing Cetak",
        "src": "/images/momen/expo-2024/expo-2024-2.jpg",
        "cardTitle": "Konsultasi Teknis Sampel",
        "cardDesc": "Diskusi mendalam spesifikasi varnish UV, hot stamping foil, dan kemasan bersama calon mitra."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Diskusi Kemitraan Strategis",
        "caption": "Diskusi santai dan produktif bersama principal rekanan industri percetakan nasional.",
        "title": "SPE 2024 - Temu Mitra & Jaringan Industri Grafika",
        "src": "/images/momen/expo-2024/expo-2024-3.jpg",
        "cardTitle": "Diskusi Kemitraan Strategis",
        "cardDesc": "Pertemuan bisnis B2B membahas supply chain bahan baku BOPP dan layanan finishing cetak."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Diskusi Solusi Kemasan Industri",
        "caption": "Tim representatif bertukar wawasan teknis seputar tren kemasan cetak masa depan.",
        "title": "SPE 2024 - Evaluasi Kebutuhan Finishing B2B",
        "src": "/images/momen/expo-2024/expo-2024-4.jpg",
        "cardTitle": "Pertemuan Solusi Cetak Kemasan",
        "cardDesc": "Menjawab ragam kebutuhan finishing cetak premium untuk klien skala industri percetakan."
      }
    ]
  },
  {
    "filterKey": "hut79",
    "title": "Semangat Kemerdekaan HUT RI ke-79",
    "desc": "Keseruan aneka perlombaan ketangkasan, tarik tambang, dan penganugerahan juara kemerdekaan keluarga besar CV Pelangi UV di workshop pabrik.",
    "img": "/images/momen/hut-79/hut-79-1.jpg",
    "caption": "Sorak sorai membahana saat tim divisi produksi bertanding tarik tambang memperingati HUT RI ke-79.",
    "photos": [
      {
        "alt": "HUT RI ke-79 - Lomba Tarik Tambang Pabrik",
        "caption": "Sorak sorai membahana saat tim divisi produksi bertanding tarik tambang memperingati HUT RI ke-79.",
        "title": "HUT RI ke-79 - Lomba Tarik Tambang Antar Tim",
        "src": "/images/momen/hut-79/hut-79-1.jpg",
        "cardTitle": "Lomba Tarik Tambang",
        "cardDesc": "Adu kekuatan dan kekompakan tim workshop dalam perlombaan tarik tambang di area gudang."
      },
      {
        "alt": "HUT RI ke-79 - Lomba Ketangkasan Kelompok",
        "caption": "Momen seru lomba konsentrasi tali dan botol yang disambut tawa hangat seluruh staf.",
        "title": "HUT RI ke-79 - Lomba Ketangkasan Kelompok",
        "src": "/images/momen/hut-79/hut-79-2.jpg",
        "cardTitle": "Keseruan Game Kekompakan",
        "cardDesc": "Permainan koordinasi tali kelompok menguji fokus, kebersamaan, dan tawa ceria antar karyawan."
      },
      {
        "alt": "HUT RI ke-79 - Komando & Semangat Juang",
        "caption": "Keluarga besar Pelangi UV memadati lantai workshop memberi dukungan penuh bagi tim lomba.",
        "title": "HUT RI ke-79 - Komando & Semangat Juang",
        "src": "/images/momen/hut-79/hut-79-3.jpg",
        "cardTitle": "Sorak Semangat Pemandu Acara",
        "cardDesc": "Antusiasme peserta lomba dipandu dengan penuh semangat oleh koordinator lapangan."
      },
      {
        "alt": "HUT RI ke-79 - Juara 1 Kategori Wanita",
        "caption": "Penyerahan sertifikat Juara 1 dan selempang apresiasi kepada tim srikandi CV Pelangi UV.",
        "title": "HUT RI ke-79 - Juara 1 Kategori Wanita",
        "src": "/images/momen/hut-79/hut-79-4.jpg",
        "cardTitle": "Pemenang Lomba Tim Putri",
        "cardDesc": "Apresiasi Juara 1 kategori wanita atas kekompakan luar biasa selama perlombaan kemerdekaan."
      },
      {
        "alt": "HUT RI ke-79 - Juara 1 Kategori Pria",
        "caption": "Senyum kebanggaan para jawara lomba 17 Agustus berfoto di depan rak bahan baku workshop.",
        "title": "HUT RI ke-79 - Juara 1 Kategori Pria",
        "src": "/images/momen/hut-79/hut-79-5.jpg",
        "cardTitle": "Pemenang Lomba Tim Putra",
        "cardDesc": "Penganugerahan piala bergilir dan sertifikat Juara 1 untuk tim kerja divisi putra."
      }
    ]
  },
  {
    "filterKey": "gathering2023",
    "title": "Employee Gathering 2023 — Pacet",
    "desc": "Kebersamaan dan outbound keluarga besar CV Pelangi UV & PT 3Pack di Villa Radissa Pacet bertema 'Etos Kerja, Motivasi & Kerja Keras Menjadi Yang Terbaik'.",
    "img": "/images/momen/gathering-2023/gathering-2023-1.jpg",
    "caption": "Keluarga besar CV Pelangi UV & PT 3Pack berkumpul dalam lingkaran apel pembukaan outbound di Pacet.",
    "photos": [
      {
        "alt": "Gathering 2023 - Apel Pembukaan di Lapangan Pacet",
        "caption": "Keluarga besar CV Pelangi UV & PT 3Pack berkumpul dalam lingkaran apel pembukaan outbound di Pacet.",
        "title": "Gathering 2023 - Apel Pembukaan di Lapangan Pacet",
        "src": "/images/momen/gathering-2023/gathering-2023-1.jpg",
        "cardTitle": "Apel Pembukaan Outbound",
        "cardDesc": "Formasi lingkaran besar seluruh staf mengawali kegiatan gathering di hamparan rumput terbuka."
      },
      {
        "alt": "Gathering 2023 - Yel-Yel 'Menjadi Yang Terbaik'",
        "caption": "Kompak menyuarakan tema gathering: Etos Kerja, Motivasi, dan Kerja Keras Menjadi Yang Terbaik.",
        "title": "Gathering 2023 - Gelora Semangat 'Menjadi Yang Terbaik'",
        "src": "/images/momen/gathering-2023/gathering-2023-2.jpg",
        "cardTitle": "Gelora Semangat 'Menjadi Yang Terbaik'",
        "cardDesc": "Penyampaian motivasi etos kerja dan komitmen kebersamaan di depan panggung utama Villa Radissa."
      },
      {
        "alt": "Gathering 2023 - Pengarahan Dinamika Regu",
        "caption": "Barisan ratusan karyawan berseragam oranye siap menuntaskan tantangan kekompakan tim.",
        "title": "Gathering 2023 - Pengarahan Dinamika Regu",
        "src": "/images/momen/gathering-2023/gathering-2023-3.jpg",
        "cardTitle": "Pengarahan Tim & Pembagian Regu",
        "cardDesc": "Seluruh peserta berbaris rapi mendengarkan panduan permainan team building dari instruktur."
      },
      {
        "alt": "Gathering 2023 - Ice Breaking & Sinergi Lintas Divisi",
        "caption": "Tawa riang menyatukan divisi administrasi, operator mesin, logistik, dan manajemen lapangan.",
        "title": "Gathering 2023 - Ice Breaking & Sinergi Lintas Divisi",
        "src": "/images/momen/gathering-2023/gathering-2023-4.jpg",
        "cardTitle": "Sesi Ice Breaking Antar Divisi",
        "cardDesc": "Permainan pemecah kejenuhan yang mencairkan suasana dan mempererat rasa persaudaraan."
      },
      {
        "alt": "Gathering 2023 - Spider Web Challenge",
        "caption": "Setiap anggota tim bahu membahu membantu rekannya melintasi celah jaring tanpa bersentuhan tali.",
        "title": "Gathering 2023 - Spider Web Challenge",
        "src": "/images/momen/gathering-2023/gathering-2023-5.jpg",
        "cardTitle": "Tantangan Jaring Laba-Laba",
        "cardDesc": "Aktivitas outbound spider web yang menguji strategi, kesabaran, dan saling percaya."
      },
      {
        "alt": "Gathering 2023 - Tantangan Titian Keseimbangan",
        "caption": "Dukungan penuh antar anggota kelompok saat menuntaskan tantangan titian kayu di taman villa.",
        "title": "Gathering 2023 - Tantangan Titian Keseimbangan",
        "src": "/images/momen/gathering-2023/gathering-2023-6.jpg",
        "cardTitle": "Uji Keseimbangan & Kepercayaan",
        "cardDesc": "Permainan simulasi keselamatan kerja dan ketenangan menghadapi tantangan lapangan."
      },
      {
        "alt": "Gathering 2023 - Ikrar Kebersamaan Tim",
        "caption": "Udara sejuk pegunungan mengiringi kekhidmatan dan kegembiraan seluruh insan CV Pelangi UV.",
        "title": "Gathering 2023 - Ikrar Kebersamaan Tim",
        "src": "/images/momen/gathering-2023/gathering-2023-7.jpg",
        "cardTitle": "Formasi Lingkaran Persatuan",
        "cardDesc": "Pemandangan aerial momen apel akbar di bawah kibaran bendera di lereng perbukitan Pacet."
      },
      {
        "alt": "Gathering 2023 - Panorama Asri Villa Radissa",
        "caption": "Keindahan alam Pacet menjadi saksi kenangan manis kebersamaan keluarga besar Pelangi UV.",
        "title": "Gathering 2023 - Panorama Asri Villa Radissa",
        "src": "/images/momen/gathering-2023/gathering-2023-8.jpg",
        "cardTitle": "Suasana Asri Villa Radissa Pacet",
        "cardDesc": "Lanskap hijau perbukitan yang menyegarkan pikiran dan memulihkan energi seluruh tim."
      },
      {
        "alt": "Gathering 2023 - Senam Pemanasan Bersama",
        "caption": "Peregangan tubuh serentak dengan penuh antusiasme di hamparan rumput hijau.",
        "title": "Gathering 2023 - Senam Pemanasan Bersama",
        "src": "/images/momen/gathering-2023/gathering-2023-9.jpg",
        "cardTitle": "Senam Pagi & Olah Raga Ceria",
        "cardDesc": "Gerakan pemanasan energik memompa stamina sebelum mengarungi rangkaian outbound."
      }
    ]
  },
  {
    "filterKey": "expo2023",
    "title": "Surabaya Printing Expo (SPE) 2023",
    "desc": "Partisipasi aktif CV Pelangi UV dalam pameran percetakan akbar SPE 2023 di Grand City Surabaya, memamerkan keunggulan laminating, spot UV, dan ragam material cetak.",
    "img": "/images/momen/expo-2023/expo-2023-1.jpg",
    "caption": "Tim Pelangi UV melayani pengunjung di depan display monitor informasi material finishing cetak.",
    "photos": [
      {
        "alt": "SPE 2023 - Etalase Produk Bahan Baku Finishing",
        "caption": "Tim Pelangi UV melayani pengunjung di depan display monitor informasi material finishing cetak.",
        "title": "SPE 2023 - Etalase Bahan Baku Finishing",
        "src": "/images/momen/expo-2023/expo-2023-1.jpg",
        "cardTitle": "Display Bahan Baku & Sampel",
        "cardDesc": "Memperkenalkan katalog thermal film, OPP waterbase, dan roll foil kepada calon mitra."
      },
      {
        "alt": "SPE 2023 - Booth C225 Pelangi UV",
        "caption": "Foto bersama seluruh delegasi pameran di bawah instalasi neon sign merah 'PELANGI UV'.",
        "title": "SPE 2023 - Booth C225 Pelangi UV",
        "src": "/images/momen/expo-2023/expo-2023-2.jpg",
        "cardTitle": "Stand Resmi Pameran C225",
        "cardDesc": "Kehadiran resmi CV Pelangi UV memamerkan layanan unggulan spot UV, waterbase, dan laminating."
      },
      {
        "alt": "SPE 2023 - Tim Representatif Berpengalaman",
        "caption": "Kekompakan tim representatif putri CV Pelangi UV siap mendampingi kebutuhan cetak mitra.",
        "title": "SPE 2023 - Tim Representatif Berpengalaman",
        "src": "/images/momen/expo-2023/expo-2023-3.jpg",
        "cardTitle": "Hospitality Tim Sales & CS",
        "cardDesc": "Pelayanan prima dan konsultasi profesional menyambut setiap pertanyaan pelaku percetakan."
      },
      {
        "alt": "SPE 2023 - Keceriaan di Balik Layar Booth",
        "caption": "Swafoto ceria di tengah padatnya arus pengunjung pameran Surabaya Printing Expo 2023.",
        "title": "SPE 2023 - Keceriaan di Balik Layar Booth",
        "src": "/images/momen/expo-2023/expo-2023-4.jpg",
        "cardTitle": "Keluarga Kerja yang Kompak",
        "cardDesc": "Suasana hangat dan penuh keceriaan tim pelaksana selama 4 hari gelaran pameran grafika."
      },
      {
        "alt": "SPE 2023 - Dedikasi Pelayanan Mitra Grafika",
        "caption": "Kekeluargaan dan sinergi tim pameran CV Pelangi UV menyukseskan gelaran akbar SPE 2023.",
        "title": "SPE 2023 - Dedikasi Pelayanan Mitra Grafika",
        "src": "/images/momen/expo-2023/expo-2023-5.jpg",
        "cardTitle": "Komitmen Layanan Terbaik",
        "cardDesc": "Semangat tinggi menghadirkan solusi finishing cetak terbaik bagi industri packaging Jawa Timur."
      },
      {
        "alt": "SPE 2023 - Delegasi Pelangi UV di Grand City",
        "caption": "Tim CV Pelangi UV mengabadikan momen di photowall pintu masuk pameran SPE 2023.",
        "title": "SPE 2023 - Delegasi Pelangi UV di Grand City",
        "src": "/images/momen/expo-2023/expo-2023-6.jpg",
        "cardTitle": "Photowall Pameran Grand City",
        "cardDesc": "Dokumentasi perwakilan tim di depan gerbang utama pameran Surabaya Printing Expo 2023."
      }
    ]
  },
  {
    "filterKey": "momenpertama",
    "title": "Momen Pertama Pelangi UV",
    "desc": "Kilas balik rekam jejak awal perjalanan CV Pelangi UV dari inisiasi bengkel sablon manual hingga berkembang melayani ribuan mitra industri kemasan se-Indonesia.",
    "img": "/images/momen/momen-pertama/momen-1.jpg",
    "caption": "Teknisi mengontrol parameter suhu dan tekanan pada mesin laminating lembaran cetak komersial.",
    "photos": [
      {
        "alt": "Momen Pertama - Pengoperasian Mesin Laminating",
        "caption": "Teknisi mengontrol parameter suhu dan tekanan pada mesin laminating lembaran cetak komersial.",
        "title": "Momen Pertama - Pengoperasian Mesin Laminating",
        "src": "/images/momen/momen-pertama/momen-1.jpg",
        "cardTitle": "Lini Laminating Modern",
        "cardDesc": "Pengoperasian mesin laminating thermal berkecepatan tinggi dengan bahan baku BOPP berkualitas."
      },
      {
        "alt": "Momen Pertama - Gathering Seragam Putih Karyawan",
        "caption": "Silaturahmi akbar seluruh jajaran staf dan teknisi CV Pelangi UV dalam balutan seragam putih.",
        "title": "Momen Pertama - Gathering Perintis Seragam Putih",
        "src": "/images/momen/momen-pertama/momen-2.jpg",
        "cardTitle": "Kekeluargaan Generasi Pertama",
        "cardDesc": "Foto bersama seluruh staf generasi awal bertema 'Professional Spirit & Smart' di lapangan terbuka."
      },
      {
        "alt": "Momen Pertama - Fasilitas Kompresor & Mesin Produksi",
        "caption": "Modernisasi fasilitas bengkel produksi untuk menjamin kestabilan tekanan operasional mesin finishing.",
        "title": "Momen Pertama - Fasilitas Kompresor & Mesin Produksi",
        "src": "/images/momen/momen-pertama/momen-3.jpg",
        "cardTitle": "Instalasi Mesin & Kompresor Pabrik",
        "cardDesc": "Penataan instalasi kompresor Jaguar ZLS dan rangkaian mesin finishing pendukung kapasitas produksi."
      },
      {
        "alt": "Momen Pertama - Tour Pelangi UV Family ke Bali",
        "caption": "Dokumentasi kebersamaan Tour Pelangi UV Family berlatar belakang Pura Ulun Danu Beratan, Bedugul, Bali.",
        "title": "Momen Pertama - Tour Pelangi UV Family ke Bali",
        "src": "/images/momen/momen-pertama/momen-4.jpg",
        "cardTitle": "Family Tour Bali (Ulun Danu Beratan)",
        "cardDesc": "Kenangan indah rekreasi bersama keluarga besar Pelangi UV di Danau Beratan Bedugul Bali (Februari 2022)."
      },
      {
        "alt": "Momen Pertama - Meja Kerja Laminasi Semi-Otomatis",
        "caption": "Dedikasi operator menjaga ketelitian hasil laminasi lembaran demi lembaran sejak era perintisan.",
        "title": "Momen Pertama - Meja Kerja Laminasi Semi-Otomatis",
        "src": "/images/momen/momen-pertama/momen-5.jpg",
        "cardTitle": "Langkah Awal Workshop Laminasi",
        "cardDesc": "Potret autentik ketelatenan operator generasi awal merapikan lembaran kertas hasil laminasi."
      },
      {
        "alt": "Momen Pertama - Meja Sablon Manual Spot UV Pertama",
        "caption": "Cikal bakal teknik spot UV Pelangi UV berakar dari ketelitian meja sablon manual berpresisi tinggi.",
        "title": "Momen Pertama - Meja Sablon Manual Spot UV Pertama",
        "src": "/images/momen/momen-pertama/momen-6.jpg",
        "cardTitle": "Meja Sablon Presisi Manual",
        "cardDesc": "Inisiasi bengkel kerja spot UV manual dengan meja kayu, screen sablon, dan rak pengeringan mandiri."
      },
      {
        "alt": "Momen Pertama - Tiga Pendiri & Teknisi Perintis",
        "caption": "Ketekunan para perintis memastikan mutu cetak terbaik yang menjadi fondasi reputasi Pelangi UV.",
        "title": "Momen Pertama - Tiga Pendiri & Teknisi Perintis",
        "src": "/images/momen/momen-pertama/momen-7.jpg",
        "cardTitle": "Kilas Balik Sosok Perintis",
        "cardDesc": "Potret bersejarah teknisi perintis memeriksa kepekatan dan ketepatan register cetak perdana."
      }
    ]
  }
];

export const MOMEN_ALBUMS: MomenAlbum[] = [
  {
    "category": "allinprintshanghai",
    "title": "All in Print China — Shanghai",
    "desc": "Studi banding dan riset inovasi teknologi percetakan grafika global CV Pelangi UV pada pameran internasional bergengsi The 10th All in Print China di Shanghai New International Expo Centre (SNIEC).",
    "photos": [
      {
        "alt": "All in Print China Shanghai - Delegasi Pelangi UV di SNIEC",
        "caption": "Delegasi CV Pelangi UV membentangkan spanduk resmi di depan landmark The 10th All in Print China di Shanghai New International Expo Centre (SNIEC).",
        "title": "All in Print China — Delegasi Pelangi UV di SNIEC Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-1.png",
        "cardTitle": "Landmark SNIEC All in Print China",
        "cardDesc": "Kehadiran delegasi Pelangi UV di pameran percetakan grafika terbesar Asia di Shanghai New International Expo Centre."
      },
      {
        "alt": "All in Print China Shanghai - Pelepasan & Pembentangan Spanduk Resmi",
        "caption": "Rombongan tim dan jajaran manajemen CV Pelangi UV membentangkan spanduk resmi perjalanan studi teknologi grafika ke Shanghai.",
        "title": "All in Print China — Spanduk Resmi Itinerary Shanghai Trip",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-2.png",
        "cardTitle": "Delegasi Resmi Itinerary Shanghai Trip",
        "cardDesc": "Pembentangan spanduk resmi delegasi CV Pelangi UV mengawali rangkaian eksplorasi teknologi cetak dunia."
      },
      {
        "alt": "All in Print China Shanghai - Keberangkatan Bandara Juanda",
        "caption": "Persiapan keberangkatan tim dari Bandara Internasional Juanda Surabaya menuju Shanghai untuk agenda studi banding industri.",
        "title": "All in Print China — Keberangkatan dari Bandara Juanda",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-3.png",
        "cardTitle": "Titik Keberangkatan Bandara Juanda",
        "cardDesc": "Momen pelepasan rombongan delegasi di Bandara Internasional Juanda bersiap menuju pameran global di Shanghai."
      },
      {
        "alt": "All in Print China Shanghai - Malam Keakraban Delegasi & Mitra",
        "caption": "Sesi foto bersama delegasi CV Pelangi UV dan mitra bisnis internasional di pelataran berarsitektur klasik Shanghai pada malam hari.",
        "title": "All in Print China — Ramah Tamah Malam Hari di Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-4.png",
        "cardTitle": "Malam Keakraban Mitra Internasional",
        "cardDesc": "Pertemuan hangat bersama mitra industri percetakan usai seharian meninjau pameran mesin finishing grafika."
      },
      {
        "alt": "All in Print China Shanghai - Kebersamaan Menjelajah Kota Shanghai",
        "caption": "Kebersamaan dan semangat kekeluargaan rombongan delegasi CV Pelangi UV menikmati suasana kota metropolitan Shanghai.",
        "title": "All in Print China — Eksplorasi Kota Metropolitan Shanghai",
        "src": "/images/momen/all-in-print-shanghai/all-in-print-shanghai-5.png",
        "cardTitle": "Kebersamaan Rombongan Delegasi",
        "cardDesc": "Mempererat relasi dan kekompakan tim di sela-sela agenda padat riset inovasi percetakan global."
      }
    ]
  },
  {
    "category": "expo2026",
    "title": "Surabaya Printing Expo (SPE) 2026",
    "desc": "Dokumentasi kehadiran booth CV Pelangi UV & CV GRC Sukses Sejahtera menampilkan solusi mesin industri grafika, vacuum pumps Becker, dan display material hot stamping foil berstandar ekspor di ajang akbar Surabaya Printing Expo 2026.",
    "photos": [
      {
        "alt": "Surabaya Printing Expo 2026 - Stand Utama Pelangi UV & CV GRC",
        "caption": "Kemegahan instalasi booth resmi CV Pelangi UV & CV GRC Sukses Sejahtera menampilkan display inovasi industri dan material foil lengkap di SPE 2026.",
        "title": "SPE 2026 — Booth Resmi Pelangi UV & CV GRC Sukses Sejahtera",
        "src": "/images/momen/expo-2026/spe-2026-booth-utama.png",
        "cardTitle": "Stand Utama Pelangi UV & CV GRC",
        "cardDesc": "Instalasi booth modern memamerkan ragam solusi finishing kemasan komersial dan material foil premium."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Sinergi Tim Stand & Mitra Strategis",
        "caption": "Kekompakan tim profesional CV Pelangi UV bersama mitra strategis APRIL dan PT Ultima Solusi Paperindo menyambut pengunjung pameran.",
        "title": "SPE 2026 — Sinergi Tim Stand & Kolaborasi Mitra Strategis",
        "src": "/images/momen/expo-2026/spe-2026-tim-stand.png",
        "cardTitle": "Sinergi Tim & Mitra Stand",
        "cardDesc": "Kolaborasi solid tim CV Pelangi UV bersama principal industri grafika nasional menghadirkan layanan terpadu."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Konsultasi Teknis Spesifikasi Foil",
        "caption": "Edukasi dan konsultasi langsung mengenai variasi warna, ketahanan kilap, dan register hot stamping foil berstandar ekspor.",
        "title": "SPE 2026 — Konsultasi Teknis Spesifikasi Roll Foil",
        "src": "/images/momen/expo-2026/spe-2026-konsultasi-foil.png",
        "cardTitle": "Konsultasi Spesifikasi Foil",
        "cardDesc": "Penjelasan langsung karakter material foil emas, perak, dan hologram untuk kemasan produk."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Expo",
        "caption": "Display unit mesin industri grafika terintegrasi di booth pameran Surabaya Printing Expo 2026.",
        "title": "SPE 2026 — Expo",
        "src": "/images/momen/expo-2026/spe-2026-showcase-mesin.png",
        "cardTitle": "Expo",
        "cardDesc": "Dokumentasi instalasi unit mesin industri dan display teknologi grafika di booth pameran Surabaya Printing Expo."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Display Swatch Roll Foil Premium",
        "caption": "Presentasi etalase swatch roll foil dengan aneka gradasi warna metalik dan hologram untuk packaging eksklusif.",
        "title": "SPE 2026 — Showcase Swatch Roll Foil & Katalog Layanan",
        "src": "/images/momen/expo-2026/spe-2026-display-swatch-foil.png",
        "cardTitle": "Showcase Swatch Foil & Katalog",
        "cardDesc": "Deretan pilihan roll foil hot stamping berkualitas prima untuk menunjang nilai estetika kemasan."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Antusiasme Pengunjung Memadati Booth",
        "caption": "Tingginya antusiasme pelaku industri kemasan dan percetakan B2B memadati area booth CV Pelangi UV sepanjang pameran berlangsung.",
        "title": "SPE 2026 — Antusiasme Mitra B2B Memadati Booth",
        "src": "/images/momen/expo-2026/spe-2026-antusiasme-pengunjung.png",
        "cardTitle": "Antusiasme Pengunjung B2B",
        "cardDesc": "Ratusan pengunjung memadati booth untuk berkonsultasi seputar layanan finishing dan supply bahan baku."
      },
      {
        "alt": "Surabaya Printing Expo 2026 - Konsultasi Brosur Layanan & Media Display",
        "caption": "Pengunjung mempelajari brosur price list layanan dan melihat video demonstrasi mesin finishing cetak di layar monitor booth.",
        "title": "SPE 2026 — Konsultasi Brosur Layanan & Media Interaktif",
        "src": "/images/momen/expo-2026/spe-2026-konsultasi-brosur.png",
        "cardTitle": "Eksplorasi Brosur & Layanan",
        "cardDesc": "Pemberian informasi komprehensif melalui brosur teknis dan display visual proses finishing modern."
      }
    ]
  },
  {
    "category": "expo2025",
    "title": "Printing Expo Surabaya 2025",
    "desc": "Dokumentasi keikutsertaan booth CV Pelangi UV & CV GRC Sukses Sejahtera memamerkan solusi cetak kemasan dan konsultasi teknis B2B di gelaran Printing Expo Surabaya 2025.",
    "photos": [
      {
        "alt": "Printing Expo Surabaya 2025 - Dokumentasi Booth & Showcase",
        "caption": "Showcase kemasan ekspor dan konsultasi teknis bersama mitra percetakan grafika di ajang SPE 2025.",
        "title": "Printing Expo Surabaya 2025 - Dokumentasi Booth & Showcase",
        "src": "/images/momen/expo-2025/expo-2025-1.jpg",
        "cardTitle": "Kompilasi Dokumentasi Booth",
        "cardDesc": "Dokumentasi keikutsertaan tim Pelangi UV & CV GRC Sukses Sejahtera di SPE 2025."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Foto Bersama Pengunjung",
        "caption": "Keceriaan tim pameran bersama mitra percetakan dan pengunjung profesional industri kemasan.",
        "title": "Printing Expo Surabaya 2025 - Sinergi Bersama Mitra",
        "src": "/images/momen/expo-2025/expo-2025-2.jpg",
        "cardTitle": "Foto Bersama Pengunjung Booth",
        "cardDesc": "Antusiasme trade visitor dan pelaku industri percetakan mengunjungi stand Pelangi UV."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Sampel Roll Foil Emas & Hologram",
        "caption": "Mitra percetakan berfoto bersama tim booth sembari memegang sampel roll foil cetak.",
        "title": "Printing Expo Surabaya 2025 - Pengenalan Bahan & Foil",
        "src": "/images/momen/expo-2025/expo-2025-3.jpg",
        "cardTitle": "Kunjungan Mitra & Sampel Foil",
        "cardDesc": "Penjelasan langsung aplikasi roll foil emas, hologram, dan standar finishing ekspor."
      },
      {
        "alt": "Printing Expo Surabaya 2025 - Tim Hospitality Stand",
        "caption": "Tim hospitality menyambut hangat setiap rekan industri grafika dan kemasan komersial.",
        "title": "Printing Expo Surabaya 2025 - Tim Hospitality Stand",
        "src": "/images/momen/expo-2025/expo-2025-4.jpg",
        "cardTitle": "Hospitality & Goodie Bag Mitra",
        "cardDesc": "Pelayanan ramah tim CV Pelangi UV membagikan sampel eksklusif kemasan."
      }
    ]
  },
  {
    "category": "expo2024",
    "title": "Surabaya Printing Expo (SPE) 2024",
    "desc": "Konsultasi spesifikasi hot stamping foil, varnish UV, dan kemasan berstandar ekspor bersama para pelaku industri percetakan nasional di SPE 2024.",
    "photos": [
      {
        "alt": "Surabaya Printing Expo 2024 - Tim Berseragam Merah",
        "caption": "Foto bersama seluruh tim representatif Pelangi UV di area booth pameran SPE 2024.",
        "title": "SPE 2024 - Tim Solid Seragam Merah",
        "src": "/images/momen/expo-2024/expo-2024-1.jpg",
        "cardTitle": "Tim Stand CV Pelangi UV",
        "cardDesc": "Kekompakan tim profesional CV Pelangi UV berseragam merah menyambut insan percetakan."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Konsultasi Teknis Pengunjung",
        "caption": "Sesi temu tatap muka dan penjelasan detail teknis register finishing di meja konsultasi booth.",
        "title": "SPE 2024 - Konsultasi Teknis Finishing Cetak",
        "src": "/images/momen/expo-2024/expo-2024-2.jpg",
        "cardTitle": "Konsultasi Teknis Sampel",
        "cardDesc": "Diskusi mendalam spesifikasi varnish UV, hot stamping foil, dan kemasan bersama calon mitra."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Diskusi Kemitraan Strategis",
        "caption": "Diskusi santai dan produktif bersama principal rekanan industri percetakan nasional.",
        "title": "SPE 2024 - Temu Mitra & Jaringan Industri Grafika",
        "src": "/images/momen/expo-2024/expo-2024-3.jpg",
        "cardTitle": "Diskusi Kemitraan Strategis",
        "cardDesc": "Pertemuan bisnis B2B membahas supply chain bahan baku BOPP dan layanan finishing cetak."
      },
      {
        "alt": "Surabaya Printing Expo 2024 - Diskusi Solusi Kemasan Industri",
        "caption": "Tim representatif bertukar wawasan teknis seputar tren kemasan cetak masa depan.",
        "title": "SPE 2024 - Evaluasi Kebutuhan Finishing B2B",
        "src": "/images/momen/expo-2024/expo-2024-4.jpg",
        "cardTitle": "Pertemuan Solusi Cetak Kemasan",
        "cardDesc": "Menjawab ragam kebutuhan finishing cetak premium untuk klien skala industri percetakan."
      }
    ]
  },
  {
    "category": "hut79",
    "title": "Semangat Kemerdekaan HUT RI ke-79",
    "desc": "Keseruan aneka perlombaan ketangkasan, tarik tambang, dan penganugerahan juara kemerdekaan keluarga besar CV Pelangi UV di workshop pabrik.",
    "photos": [
      {
        "alt": "HUT RI ke-79 - Lomba Tarik Tambang Pabrik",
        "caption": "Sorak sorai membahana saat tim divisi produksi bertanding tarik tambang memperingati HUT RI ke-79.",
        "title": "HUT RI ke-79 - Lomba Tarik Tambang Antar Tim",
        "src": "/images/momen/hut-79/hut-79-1.jpg",
        "cardTitle": "Lomba Tarik Tambang",
        "cardDesc": "Adu kekuatan dan kekompakan tim workshop dalam perlombaan tarik tambang di area gudang."
      },
      {
        "alt": "HUT RI ke-79 - Lomba Ketangkasan Kelompok",
        "caption": "Momen seru lomba konsentrasi tali dan botol yang disambut tawa hangat seluruh staf.",
        "title": "HUT RI ke-79 - Lomba Ketangkasan Kelompok",
        "src": "/images/momen/hut-79/hut-79-2.jpg",
        "cardTitle": "Keseruan Game Kekompakan",
        "cardDesc": "Permainan koordinasi tali kelompok menguji fokus, kebersamaan, dan tawa ceria antar karyawan."
      },
      {
        "alt": "HUT RI ke-79 - Komando & Semangat Juang",
        "caption": "Keluarga besar Pelangi UV memadati lantai workshop memberi dukungan penuh bagi tim lomba.",
        "title": "HUT RI ke-79 - Komando & Semangat Juang",
        "src": "/images/momen/hut-79/hut-79-3.jpg",
        "cardTitle": "Sorak Semangat Pemandu Acara",
        "cardDesc": "Antusiasme peserta lomba dipandu dengan penuh semangat oleh koordinator lapangan."
      },
      {
        "alt": "HUT RI ke-79 - Juara 1 Kategori Wanita",
        "caption": "Penyerahan sertifikat Juara 1 dan selempang apresiasi kepada tim srikandi CV Pelangi UV.",
        "title": "HUT RI ke-79 - Juara 1 Kategori Wanita",
        "src": "/images/momen/hut-79/hut-79-4.jpg",
        "cardTitle": "Pemenang Lomba Tim Putri",
        "cardDesc": "Apresiasi Juara 1 kategori wanita atas kekompakan luar biasa selama perlombaan kemerdekaan."
      },
      {
        "alt": "HUT RI ke-79 - Juara 1 Kategori Pria",
        "caption": "Senyum kebanggaan para jawara lomba 17 Agustus berfoto di depan rak bahan baku workshop.",
        "title": "HUT RI ke-79 - Juara 1 Kategori Pria",
        "src": "/images/momen/hut-79/hut-79-5.jpg",
        "cardTitle": "Pemenang Lomba Tim Putra",
        "cardDesc": "Penganugerahan piala bergilir dan sertifikat Juara 1 untuk tim kerja divisi putra."
      }
    ]
  },
  {
    "category": "gathering2023",
    "title": "Employee Gathering 2023 — Pacet",
    "desc": "Kebersamaan dan outbound keluarga besar CV Pelangi UV & PT 3Pack di Villa Radissa Pacet bertema 'Etos Kerja, Motivasi & Kerja Keras Menjadi Yang Terbaik'.",
    "photos": [
      {
        "alt": "Gathering 2023 - Apel Pembukaan di Lapangan Pacet",
        "caption": "Keluarga besar CV Pelangi UV & PT 3Pack berkumpul dalam lingkaran apel pembukaan outbound di Pacet.",
        "title": "Gathering 2023 - Apel Pembukaan di Lapangan Pacet",
        "src": "/images/momen/gathering-2023/gathering-2023-1.jpg",
        "cardTitle": "Apel Pembukaan Outbound",
        "cardDesc": "Formasi lingkaran besar seluruh staf mengawali kegiatan gathering di hamparan rumput terbuka."
      },
      {
        "alt": "Gathering 2023 - Yel-Yel 'Menjadi Yang Terbaik'",
        "caption": "Kompak menyuarakan tema gathering: Etos Kerja, Motivasi, dan Kerja Keras Menjadi Yang Terbaik.",
        "title": "Gathering 2023 - Gelora Semangat 'Menjadi Yang Terbaik'",
        "src": "/images/momen/gathering-2023/gathering-2023-2.jpg",
        "cardTitle": "Gelora Semangat 'Menjadi Yang Terbaik'",
        "cardDesc": "Penyampaian motivasi etos kerja dan komitmen kebersamaan di depan panggung utama Villa Radissa."
      },
      {
        "alt": "Gathering 2023 - Pengarahan Dinamika Regu",
        "caption": "Barisan ratusan karyawan berseragam oranye siap menuntaskan tantangan kekompakan tim.",
        "title": "Gathering 2023 - Pengarahan Dinamika Regu",
        "src": "/images/momen/gathering-2023/gathering-2023-3.jpg",
        "cardTitle": "Pengarahan Tim & Pembagian Regu",
        "cardDesc": "Seluruh peserta berbaris rapi mendengarkan panduan permainan team building dari instruktur."
      },
      {
        "alt": "Gathering 2023 - Ice Breaking & Sinergi Lintas Divisi",
        "caption": "Tawa riang menyatukan divisi administrasi, operator mesin, logistik, dan manajemen lapangan.",
        "title": "Gathering 2023 - Ice Breaking & Sinergi Lintas Divisi",
        "src": "/images/momen/gathering-2023/gathering-2023-4.jpg",
        "cardTitle": "Sesi Ice Breaking Antar Divisi",
        "cardDesc": "Permainan pemecah kejenuhan yang mencairkan suasana dan mempererat rasa persaudaraan."
      },
      {
        "alt": "Gathering 2023 - Spider Web Challenge",
        "caption": "Setiap anggota tim bahu membahu membantu rekannya melintasi celah jaring tanpa bersentuhan tali.",
        "title": "Gathering 2023 - Spider Web Challenge",
        "src": "/images/momen/gathering-2023/gathering-2023-5.jpg",
        "cardTitle": "Tantangan Jaring Laba-Laba",
        "cardDesc": "Aktivitas outbound spider web yang menguji strategi, kesabaran, dan saling percaya."
      },
      {
        "alt": "Gathering 2023 - Tantangan Titian Keseimbangan",
        "caption": "Dukungan penuh antar anggota kelompok saat menuntaskan tantangan titian kayu di taman villa.",
        "title": "Gathering 2023 - Tantangan Titian Keseimbangan",
        "src": "/images/momen/gathering-2023/gathering-2023-6.jpg",
        "cardTitle": "Uji Keseimbangan & Kepercayaan",
        "cardDesc": "Permainan simulasi keselamatan kerja dan ketenangan menghadapi tantangan lapangan."
      },
      {
        "alt": "Gathering 2023 - Ikrar Kebersamaan Tim",
        "caption": "Udara sejuk pegunungan mengiringi kekhidmatan dan kegembiraan seluruh insan CV Pelangi UV.",
        "title": "Gathering 2023 - Ikrar Kebersamaan Tim",
        "src": "/images/momen/gathering-2023/gathering-2023-7.jpg",
        "cardTitle": "Formasi Lingkaran Persatuan",
        "cardDesc": "Pemandangan aerial momen apel akbar di bawah kibaran bendera di lereng perbukitan Pacet."
      },
      {
        "alt": "Gathering 2023 - Panorama Asri Villa Radissa",
        "caption": "Keindahan alam Pacet menjadi saksi kenangan manis kebersamaan keluarga besar Pelangi UV.",
        "title": "Gathering 2023 - Panorama Asri Villa Radissa",
        "src": "/images/momen/gathering-2023/gathering-2023-8.jpg",
        "cardTitle": "Suasana Asri Villa Radissa Pacet",
        "cardDesc": "Lanskap hijau perbukitan yang menyegarkan pikiran dan memulihkan energi seluruh tim."
      },
      {
        "alt": "Gathering 2023 - Senam Pemanasan Bersama",
        "caption": "Peregangan tubuh serentak dengan penuh antusiasme di hamparan rumput hijau.",
        "title": "Gathering 2023 - Senam Pemanasan Bersama",
        "src": "/images/momen/gathering-2023/gathering-2023-9.jpg",
        "cardTitle": "Senam Pagi & Olah Raga Ceria",
        "cardDesc": "Gerakan pemanasan energik memompa stamina sebelum mengarungi rangkaian outbound."
      }
    ]
  },
  {
    "category": "expo2023",
    "title": "Surabaya Printing Expo (SPE) 2023",
    "desc": "Partisipasi aktif CV Pelangi UV dalam pameran percetakan akbar SPE 2023 di Grand City Surabaya, memamerkan keunggulan laminating, spot UV, dan ragam material cetak.",
    "photos": [
      {
        "alt": "SPE 2023 - Etalase Produk Bahan Baku Finishing",
        "caption": "Tim Pelangi UV melayani pengunjung di depan display monitor informasi material finishing cetak.",
        "title": "SPE 2023 - Etalase Bahan Baku Finishing",
        "src": "/images/momen/expo-2023/expo-2023-1.jpg",
        "cardTitle": "Display Bahan Baku & Sampel",
        "cardDesc": "Memperkenalkan katalog thermal film, OPP waterbase, dan roll foil kepada calon mitra."
      },
      {
        "alt": "SPE 2023 - Booth C225 Pelangi UV",
        "caption": "Foto bersama seluruh delegasi pameran di bawah instalasi neon sign merah 'PELANGI UV'.",
        "title": "SPE 2023 - Booth C225 Pelangi UV",
        "src": "/images/momen/expo-2023/expo-2023-2.jpg",
        "cardTitle": "Stand Resmi Pameran C225",
        "cardDesc": "Kehadiran resmi CV Pelangi UV memamerkan layanan unggulan spot UV, waterbase, dan laminating."
      },
      {
        "alt": "SPE 2023 - Tim Representatif Berpengalaman",
        "caption": "Kekompakan tim representatif putri CV Pelangi UV siap mendampingi kebutuhan cetak mitra.",
        "title": "SPE 2023 - Tim Representatif Berpengalaman",
        "src": "/images/momen/expo-2023/expo-2023-3.jpg",
        "cardTitle": "Hospitality Tim Sales & CS",
        "cardDesc": "Pelayanan prima dan konsultasi profesional menyambut setiap pertanyaan pelaku percetakan."
      },
      {
        "alt": "SPE 2023 - Keceriaan di Balik Layar Booth",
        "caption": "Swafoto ceria di tengah padatnya arus pengunjung pameran Surabaya Printing Expo 2023.",
        "title": "SPE 2023 - Keceriaan di Balik Layar Booth",
        "src": "/images/momen/expo-2023/expo-2023-4.jpg",
        "cardTitle": "Keluarga Kerja yang Kompak",
        "cardDesc": "Suasana hangat dan penuh keceriaan tim pelaksana selama 4 hari gelaran pameran grafika."
      },
      {
        "alt": "SPE 2023 - Dedikasi Pelayanan Mitra Grafika",
        "caption": "Kekeluargaan dan sinergi tim pameran CV Pelangi UV menyukseskan gelaran akbar SPE 2023.",
        "title": "SPE 2023 - Dedikasi Pelayanan Mitra Grafika",
        "src": "/images/momen/expo-2023/expo-2023-5.jpg",
        "cardTitle": "Komitmen Layanan Terbaik",
        "cardDesc": "Semangat tinggi menghadirkan solusi finishing cetak terbaik bagi industri packaging Jawa Timur."
      },
      {
        "alt": "SPE 2023 - Delegasi Pelangi UV di Grand City",
        "caption": "Tim CV Pelangi UV mengabadikan momen di photowall pintu masuk pameran SPE 2023.",
        "title": "SPE 2023 - Delegasi Pelangi UV di Grand City",
        "src": "/images/momen/expo-2023/expo-2023-6.jpg",
        "cardTitle": "Photowall Pameran Grand City",
        "cardDesc": "Dokumentasi perwakilan tim di depan gerbang utama pameran Surabaya Printing Expo 2023."
      }
    ]
  },
  {
    "category": "momenpertama",
    "title": "Momen Pertama Pelangi UV",
    "desc": "Kilas balik rekam jejak awal perjalanan CV Pelangi UV dari inisiasi bengkel sablon manual hingga berkembang melayani ribuan mitra industri kemasan se-Indonesia.",
    "photos": [
      {
        "alt": "Momen Pertama - Pengoperasian Mesin Laminating",
        "caption": "Teknisi mengontrol parameter suhu dan tekanan pada mesin laminating lembaran cetak komersial.",
        "title": "Momen Pertama - Pengoperasian Mesin Laminating",
        "src": "/images/momen/momen-pertama/momen-1.jpg",
        "cardTitle": "Lini Laminating Modern",
        "cardDesc": "Pengoperasian mesin laminating thermal berkecepatan tinggi dengan bahan baku BOPP berkualitas."
      },
      {
        "alt": "Momen Pertama - Gathering Seragam Putih Karyawan",
        "caption": "Silaturahmi akbar seluruh jajaran staf dan teknisi CV Pelangi UV dalam balutan seragam putih.",
        "title": "Momen Pertama - Gathering Perintis Seragam Putih",
        "src": "/images/momen/momen-pertama/momen-2.jpg",
        "cardTitle": "Kekeluargaan Generasi Pertama",
        "cardDesc": "Foto bersama seluruh staf generasi awal bertema 'Professional Spirit & Smart' di lapangan terbuka."
      },
      {
        "alt": "Momen Pertama - Fasilitas Kompresor & Mesin Produksi",
        "caption": "Modernisasi fasilitas bengkel produksi untuk menjamin kestabilan tekanan operasional mesin finishing.",
        "title": "Momen Pertama - Fasilitas Kompresor & Mesin Produksi",
        "src": "/images/momen/momen-pertama/momen-3.jpg",
        "cardTitle": "Instalasi Mesin & Kompresor Pabrik",
        "cardDesc": "Penataan instalasi kompresor Jaguar ZLS dan rangkaian mesin finishing pendukung kapasitas produksi."
      },
      {
        "alt": "Momen Pertama - Tour Pelangi UV Family ke Bali",
        "caption": "Dokumentasi kebersamaan Tour Pelangi UV Family berlatar belakang Pura Ulun Danu Beratan, Bedugul, Bali.",
        "title": "Momen Pertama - Tour Pelangi UV Family ke Bali",
        "src": "/images/momen/momen-pertama/momen-4.jpg",
        "cardTitle": "Family Tour Bali (Ulun Danu Beratan)",
        "cardDesc": "Kenangan indah rekreasi bersama keluarga besar Pelangi UV di Danau Beratan Bedugul Bali (Februari 2022)."
      },
      {
        "alt": "Momen Pertama - Meja Kerja Laminasi Semi-Otomatis",
        "caption": "Dedikasi operator menjaga ketelitian hasil laminasi lembaran demi lembaran sejak era perintisan.",
        "title": "Momen Pertama - Meja Kerja Laminasi Semi-Otomatis",
        "src": "/images/momen/momen-pertama/momen-5.jpg",
        "cardTitle": "Langkah Awal Workshop Laminasi",
        "cardDesc": "Potret autentik ketelatenan operator generasi awal merapikan lembaran kertas hasil laminasi."
      },
      {
        "alt": "Momen Pertama - Meja Sablon Manual Spot UV Pertama",
        "caption": "Cikal bakal teknik spot UV Pelangi UV berakar dari ketelitian meja sablon manual berpresisi tinggi.",
        "title": "Momen Pertama - Meja Sablon Manual Spot UV Pertama",
        "src": "/images/momen/momen-pertama/momen-6.jpg",
        "cardTitle": "Meja Sablon Presisi Manual",
        "cardDesc": "Inisiasi bengkel kerja spot UV manual dengan meja kayu, screen sablon, dan rak pengeringan mandiri."
      },
      {
        "alt": "Momen Pertama - Tiga Pendiri & Teknisi Perintis",
        "caption": "Ketekunan para perintis memastikan mutu cetak terbaik yang menjadi fondasi reputasi Pelangi UV.",
        "title": "Momen Pertama - Tiga Pendiri & Teknisi Perintis",
        "src": "/images/momen/momen-pertama/momen-7.jpg",
        "cardTitle": "Kilas Balik Sosok Perintis",
        "cardDesc": "Potret bersejarah teknisi perintis memeriksa kepekatan dan ketepatan register cetak perdana."
      }
    ]
  }
];
