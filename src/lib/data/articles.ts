export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tag?: string;
  categoryKey: "mesin-teknologi" | "tips-finishing" | "bahan-baku" | "kabar-perusahaan";
  date: string;
  readTime: string;
  views: string;
  commentsCount: string;
  author: string;
  desc: string;
  img: string;
  isFeatured?: boolean;
  technicalChips?: string[];
  content: string[];
  keyTakeaways?: string[];
}

export const blogCategories = [
  { key: "all", label: "Semua Kategori" },
  { key: "mesin-teknologi", label: "Mesin & Teknologi" },
  { key: "tips-finishing", label: "Tips Finishing Cetak" },
  { key: "bahan-baku", label: "Bahan Baku & Material" },
  { key: "kabar-perusahaan", label: "Kabar Perusahaan" },
] as const;

export const featuredArticle: ArticleItem = {
  id: "featured-spot-uv-kemasan",
  slug: "panduan-memilih-finishing-spot-uv-sand-texture-drip-off",
  title: "Panduan Memilih Finishing Spot UV, Sand Texture, dan Drip-Off untuk Kemasan Premium",
  category: "Tips Finishing Cetak",
  tag: "Tips Finishing Cetak",
  categoryKey: "tips-finishing",
  date: "18 Nov 2026",
  readTime: "5 Menit Baca",
  views: "1.420 Views",
  commentsCount: "3 Komentar",
  author: "Tim Teknis Pelangi UV",
  desc: "Ketahui perbedaan efek kilap Spot UV Gloss, tekstur pasir taktil Sand Varnish, serta kontras Drip-Off untuk mengangkat daya tarik kemasan produk di rak retail.",
  img: "/images/layanan/kawan-bold-packaging.png",
  isFeatured: true,
  keyTakeaways: [
    "Spot UV Gloss menonjolkan logo dan tipografi dengan kilap bening tinggi di atas dasar laminasi doff.",
    "Sand Texture memberikan sensasi rabaan berpasir halus yang tahan gores dan bebas bekas sidik jari.",
    "Kombinasi Spot UV dan Hot Stamping Foil menciptakan kontras visual mewah untuk kemasan kosmetik, F&B, dan rokok.",
  ],
  content: [
    "Di rak penjualan modern, kemasan produk hanya memiliki hitungan detik untuk menarik perhatian konsumen. Teknik finishing cetak pasca-cetak seperti Spot UV, Sand Texture, dan Drip-Off menjadi pembeda utama antara kemasan standar dengan kemasan kelas premium.",
    "Spot UV Gloss bekerja dengan melapisi area desain tertentu—seperti logo brand, ilustrasi utama, atau tipografi—menggunakan varnish ultra-violet bening yang langsung dikeringkan dengan lampu UV. Saat diaplikasikan di atas laminasi doff, kontras kilapnya langsung terlihat menonjol.",
    "Sementara itu, efek Sand Texture (tekstur pasir) menghadirkan permukaan matte berbutir halus yang elegan sekaligus melindungi kemasan dari goresan saat distribusi. Teknik ini sangat diminati untuk kemasan rokok, parfum, skincare, dan gift box eksklusif.",
    "Dengan kapasitas produksi hingga 174.000 cetakan per hari di pabrik Bizpark Waru Sidoarjo, CV Pelangi UV siap membantu pengujian sampel hingga produksi massal dengan register presisi tinggi.",
  ],
};

export const articlesData: ArticleItem[] = [
  {
    id: "art-spe-2026",
    slug: "cv-pelangi-uv-surabaya-printing-expo-2026",
    title: "CV Pelangi UV Hadir di Surabaya Printing Expo 2026: Pamerkan Inovasi Finishing & Swatch Foil Terbaru",
    category: "Kabar Perusahaan",
    tag: "Kabar Perusahaan",
    categoryKey: "kabar-perusahaan",
    date: "10 Nov 2026",
    readTime: "3 Menit Baca",
    views: "1.280 Views",
    commentsCount: "4 Komentar",
    author: "Admin Pelangi UV",
    desc: "Dokumentasi partisipasi CV Pelangi UV di Surabaya Printing Expo 2026 bersama pelaku industri percetakan dan packaging se-Jawa Timur dan Indonesia Timur.",
    img: "/images/momen/expo-2026/spe-2026-booth-utama.png",
    keyTakeaways: [
      "Pengunjung booth dapat meraba langsung katalog sampel Spot UV, Sand Texture, Cast & Cure, hingga Hot Stamping Foil.",
      "Sesi konsultasi teknis gratis untuk efisiensi bahan baku BOPP film, roll foil, dan lem laminating industri.",
      "Memperkuat kemitraan jangka panjang dengan percetakan offset dan manufaktur kemasan di Jawa Timur.",
    ],
    content: [
      "CV Pelangi UV kembali berpartisipasi dalam ajang Surabaya Printing Expo (SPE) 2026 dengan menghadirkan beragam inovasi layanan finishing cetak dan koleksi bahan baku grafika terlengkap.",
      "Sepanjang pameran, booth CV Pelangi UV ramai dikunjungi pemilik percetakan komersial, pabrik kemasan karton, desainer packaging, hingga perwakilan brand F&B dan farmasi yang ingin melihat langsung hasil akhir finishing premium.",
      "Salah satu sorotan utama di booth adalah display swatch Hot Stamping Foil warna-warni, efek hologram Cast & Cure 3D, serta sampel kemasan dengan kombinasi Spot UV dan Emboss 3D presisi.",
      "Melalui pameran ini, CV Pelangi UV menegaskan komitmennya sebagai pusat jasa finishing cetak dan distributor bahan baku terpercaya sejak 2004 di Bizpark Sidoarjo.",
    ],
  },
  {
    id: "art-mesin-aoer-pond-foil",
    slug: "presisi-mesin-pond-hot-foil-otomatis-aoer",
    title: "Presisi Tinggi dengan Mesin Pond & Hot Foil Otomatis AOER untuk Produksi Kemasan Skala Industri",
    category: "Mesin & Teknologi",
    tag: "Mesin & Teknologi",
    categoryKey: "mesin-teknologi",
    date: "02 Nov 2026",
    readTime: "4 Menit Baca",
    views: "1.145 Views",
    commentsCount: "2 Komentar",
    author: "Tim Teknis Pelangi UV",
    desc: "Mengintip performa lini mesin pond die-cutting dan hot foil stamping otomatis berkecepatan tinggi di pabrik CV Pelangi UV untuk akurasi lipatan tanpa geser.",
    img: "/images/layanan/pond-die-cut.png",
    keyTakeaways: [
      "Kecepatan produksi stabil hingga ribuan lembar per jam dengan register presisi untuk karton tebal.",
      "Sensor optik otomatis menjaga posisi lembar kertas agar garis potong dan rel creasing selalu lurus sempurna.",
      "Menekan tingkat afkir (scrap rate) pada order kemasan makanan, farmasi, dan kosmetik skala besar.",
    ],
    content: [
      "Dalam produksi kemasan karton massal, ketepatan garis potong (die-cut) dan garis lipatan (creasing) menentukan kelancaran proses perakitan box di lini pengemasan klien. Sedikit pergeseran saja dapat membuat kemasan sulit dilipat atau pecah di bagian sudut.",
      "Untuk menjawab kebutuhan lead-time cepat dan presisi tinggi, pabrik CV Pelangi UV mengoperasikan lini mesin pond dan hot stamping otomatis AOER dengan sistem pengumpan kertas stabil serta kontrol kecepatan digital.",
      "Setiap lembaran karton duplex maupun ivory melewati kalibrasi register otomatis sebelum masuk ke area tekanan pisau pond, menghasilkan potongan bersih, lipatan presisi, dan kualitas yang konsisten dari lembar pertama hingga lembar ke-100.000.",
    ],
  },
  {
    id: "art-mesin-laminating-tiancen",
    slug: "teknologi-mesin-laminating-thermal-tiancen-kecepatan-tinggi",
    title: "Teknologi Mesin Laminating Thermal Kecepatan Tinggi Tiancen: Bebas Gelembung & Rapi Maksimal",
    category: "Mesin & Teknologi",
    tag: "Mesin & Teknologi",
    categoryKey: "mesin-teknologi",
    date: "24 Okt 2026",
    readTime: "4 Menit Baca",
    views: "1.090 Views",
    commentsCount: "2 Komentar",
    author: "Tim Teknis Pelangi UV",
    desc: "Bagaimana sistem pemanas presisi dan pemotong otomatis pada mesin laminating industri CV Pelangi UV menjaga hasil film doff & glossy tetap bening tanpa kerut.",
    img: "/images/layanan/laminating.jpg",
    keyTakeaways: [
      "Distribusi panas rol yang merata mencegah munculnya gelembung udara halus pada film BOPP thermal.",
      "Kapasitas produksi laminating mencapai 114.000 cetakan per hari untuk memenuhi deadline ketat.",
      "Permukaan hasil laminasi siap diproses lanjut ke tahap Spot UV, Hot Stamping Foil, maupun Pond.",
    ],
    content: [
      "Kendala yang paling sering ditemui pada proses laminating konvensional adalah timbulnya gelembung udara mikro, permukaan kurang rata, atau film yang mengelupas saat kemasan ditekuk.",
      "Di pabrik CV Pelangi UV, proses laminating thermal doff, glossy, hingga soft-touch velvet didukung oleh mesin laminating otomatis kecepatan tinggi Tiancen dengan kontrol suhu dan tekanan rol digital.",
      "Dengan pemisahan lembaran otomatis yang rapi dan daya rekat film BOPP yang merata hingga ke tepi kertas, hasil laminating menjadi jauh lebih jernih, kuat, dan siap melanjutkan ke proses finishing berikutnya tanpa risiko delaminasi.",
    ],
  },
  {
    id: "art-spot-uv-vs-hot-stamp",
    slug: "perbedaan-spot-uv-vs-hot-stamp-foil-kemasan",
    title: "Perbedaan Spot UV vs Hot Stamping Foil: Kapan Harus Memadukan Keduanya pada Kemasan?",
    category: "Tips Finishing Cetak",
    tag: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "15 Okt 2026",
    readTime: "4 Menit Baca",
    views: "980 Views",
    commentsCount: "1 Komentar",
    author: "Admin Pelangi UV",
    desc: "Panduan praktis memadukan kilap transparan varnish Spot UV dengan kemilau metalik Hot Stamping Foil emas & perak untuk kemasan kosmetik dan gift box.",
    img: "/images/layanan/bhs-cosmo-gold-foil.png",
    keyTakeaways: [
      "Spot UV menonjolkan efek kilap transparan tanpa mengubah warna cetak dasar pada kemasan.",
      "Hot Stamping Foil menghadirkan pantulan logam emas, perak, rose gold, atau hologram dengan opasitas penuh.",
      "Memadukan keduanya di atas laminasi doff menciptakan kontras visual dan tekstur yang sangat premium.",
    ],
    content: [
      "Banyak pemilik brand dan desainer kemasan sering bingung menentukan apakah lebih cocok menggunakan Spot UV, Hot Stamping Foil, atau menggabungkan keduanya sekaligus.",
      "Spot UV sangat ideal untuk menonjolkan pola latar belakang, motif grafis, atau teks sekunder dengan kilap bening yang elegan. Sementara Hot Stamping Foil bekerja dengan mentransfer lapisan metalik menggunakan plat panas sehingga logo utama memantulkan cahaya seperti logam asli.",
      "Untuk kemasan parfum, skincare, sarung premium, maupun kotak kue eksklusif, kombinasi laminasi doff + logo Hot Stamping Gold + aksen motif Spot UV terbukti paling efektif meningkatkan persepsi nilai produk.",
    ],
  },
  {
    id: "art-bopp-thermal-film",
    slug: "mengenal-perbedaan-film-bopp-thermal-doff-glossy-velvet",
    title: "Mengenal Perbedaan Film BOPP Thermal Doff, Glossy, dan Soft-Touch Velvet untuk Laminating",
    category: "Bahan Baku & Material",
    tag: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "05 Okt 2026",
    readTime: "4 Menit Baca",
    views: "915 Views",
    commentsCount: "1 Komentar",
    author: "Tim Bahan Baku Pelangi UV",
    desc: "Panduan memilih ketebalan dan jenis roll film BOPP thermal impor agar sesuai dengan karakter warna cetakan, daya tahan gesek, dan kebutuhan finishing lanjutan.",
    img: "/images/bahan-baku/bopp-thermal-film.png",
    keyTakeaways: [
      "BOPP Glossy memperkuat saturasi warna cerah dan ideal untuk brosur, katalog, serta box makanan.",
      "BOPP Doff memberikan tampilan elegan tanpa silau lampu dan menjadi dasar terbaik untuk Spot UV.",
      "CV Pelangi UV menyediakan stok grosir roll BOPP lebar 200–1200 mm lengkap dengan layanan Free Slitting.",
    ],
    content: [
      "Pemilihan jenis plastik film BOPP sangat memengaruhi hasil akhir dan daya tahan kemasan terhadap air, minyak, maupun gesekan selama pengiriman.",
      "Film BOPP Thermal Glossy membuat warna cetak tampak lebih hidup dan mengilap, sedangkan BOPP Thermal Doff meredam pantulan cahaya sehingga memberi kesan mewah dan modern. Untuk segmen ultra-premium, tersedia pula Soft-Touch Velvet dengan sensasi sentuhan selembut beludru.",
      "Sebagai distributor bahan baku percetakan di Sidoarjo, CV Pelangi UV menyediakan roll BOPP thermal dan waterbase dalam berbagai ukuran lebar yang dapat dipotong sesuai spesifikasi mesin percetakan Anda.",
    ],
  },
  {
    id: "art-lem-wet-dry-frozen",
    slug: "panduan-memilih-lem-wet-dry-laminating-food-grade",
    title: "Panduan Memilih Lem Wet & Dry Laminating Food-Grade untuk Kemasan Makanan dan Frozen Food",
    category: "Bahan Baku & Material",
    tag: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "22 Sep 2026",
    readTime: "5 Menit Baca",
    views: "865 Views",
    commentsCount: "0 Komentar",
    author: "Tim Bahan Baku Pelangi UV",
    desc: "Standar pemilihan lem waterbase bebas bau menyengat yang tetap lentur dan rekat kuat menghadapi kelembapan freezer serta kondensasi es pada kemasan makanan.",
    img: "/images/bahan-baku/lem-wet-dry-laminating.png",
    keyTakeaways: [
      "Kemasan makanan memerlukan lem laminasi waterbase yang aman dan bebas residu bau kimia menyengat.",
      "Daya rekat lem harus tetap elastis dan tidak getas saat kemasan disimpan di suhu beku.",
      "Tersedia kemasan pail 20 kg hingga drum industri siap kirim dari gudang Bizpark Sidoarjo.",
    ],
    content: [
      "Kemasan makanan beku (frozen food) dan produk kuliner menghadapi tantangan suhu dingin ekstrem serta kelembapan tinggi akibat kondensasi uap air.",
      "Jika menggunakan lem laminating yang tidak sesuai spesifikasi, lapisan film plastik mudah terkelupas (delaminasi) di bagian lipatan box atau menimbulkan aroma kimia yang mengganggu produk pangan.",
      "CV Pelangi UV menyediakan formulasi lem wet & dry laminating waterbase berdaya penetrasi tinggi yang cepat kering, bebas bau menyengat, dan menjaga ikatan film tetap kokoh pada karton duplex maupun ivory.",
    ],
  },
  {
    id: "art-cast-and-cure",
    slug: "efek-cast-and-cure-hologram-3d-ramah-lingkungan",
    title: "Efek Cast & Cure 3D Hologram: Kilau Prismatik Ramah Lingkungan Tanpa Limbah Film Plastik",
    category: "Tips Finishing Cetak",
    tag: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "10 Sep 2026",
    readTime: "4 Menit Baca",
    views: "1.210 Views",
    commentsCount: "2 Komentar",
    author: "Tim Teknis Pelangi UV",
    desc: "Mengenal teknologi nano-embossing varnish UV Cast & Cure yang menciptakan efek hologram pelangi memukau sekaligus tetap mudah didaur ulang.",
    img: "/images/layanan/cast-and-cure.png",
    keyTakeaways: [
      "Tidak meninggalkan lapisan plastik mika pada kertas sehingga kemasan tetap ramah lingkungan dan mudah didaur ulang.",
      "Pola hologram 3D dapat diaplikasikan secara penuh maupun selektif pada area desain tertentu.",
      "Efektif menjadi fitur pembeda visual sekaligus pengaman anti-pemalsuan pada kemasan ritel.",
    ],
    content: [
      "Tren kemasan berkelanjutan (sustainable packaging) mendorong banyak brand mencari alternatif efek hologram yang tidak menambah limbah plastik laminasi.",
      "Melalui teknologi Cast & Cure di CV Pelangi UV, pola hologram mikro dicetak langsung ke atas lapisan varnish UV bening menggunakan film casting yang dapat digunakan ulang, lalu langsung dikeringkan dengan sinar ultra-violet.",
      "Hasilnya adalah kilau prismatik 3D yang tajam, elegan, dan ramah lingkungan—cocok untuk kemasan kosmetik, obat-obatan, suplemen, hingga kemasan edisi terbatas.",
    ],
  },
  {
    id: "art-hot-stamping-delaminasi",
    slug: "mengatasi-delaminasi-kerutan-hot-stamping-foil",
    title: "Tips Mengatasi Delaminasi & Kerutan saat Hot Stamping Foil pada Karton Duplex dan Ivory Tebal",
    category: "Tips Finishing Cetak",
    tag: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "28 Agu 2026",
    readTime: "4 Menit Baca",
    views: "1.340 Views",
    commentsCount: "3 Komentar",
    author: "Tim Teknis Pelangi UV",
    desc: "Trik kalibrasi suhu plat pemanas, tekanan, dan pemilihan tipe release layer roll foil agar teks halus maupun blok besar menempel sempurna tanpa rontok.",
    img: "/images/bahan-baku/foil-hot-stamping.png",
    keyTakeaways: [
      "Sesuaikan suhu plat antara 95°C–115°C mengikuti gramasi kertas dan jenis laminasi dasar.",
      "Atur tegangan (tension) gulungan foil agar tidak terlalu kencang dan menimbulkan garis kerut.",
      "Gunakan roll Hot Stamping Foil grade industri dengan lapisan release cepat untuk detail teks kecil.",
    ],
    content: [
      "Masalah paling umum pada proses hot stamping adalah pinggiran foil yang berserabut, hasil blok tidak rata, atau tulisan tipis yang terputus di atas permukaan karton tebal.",
      "Kunci keberhasilan hot stamping terletak pada keseimbangan tiga parameter utama: suhu plat klise, tekanan pres, dan durasi kontak (dwell time), ditambah kecocokan spesifikasi roll foil dengan jenis kertas atau laminasi yang dipakai.",
      "CV Pelangi UV menyediakan layanan jasa Hot Stamp berkapasitas hingga 120.000 cetakan/hari sekaligus grosir master roll foil aneka warna (Gold, Silver, Rose Gold, Hologram, dan Pigment Foil) siap potong sesuai kebutuhan mesin.",
    ],
  },
  {
    id: "art-micro-emboss-farmasi",
    slug: "penerapan-micro-emboss-emboss-3d-kemasan-farmasi-kosmetik",
    title: "Penerapan Micro Emboss & Emboss 3D untuk Kemasan Farmasi, Kosmetik, dan Anti-Pemalsuan",
    category: "Tips Finishing Cetak",
    tag: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "14 Agu 2026",
    readTime: "4 Menit Baca",
    views: "945 Views",
    commentsCount: "1 Komentar",
    author: "Tim Teknis Pelangi UV",
    desc: "Mengapa tekstur timbul presisi mikron menjadi standar keamanan sekaligus penegas karakter mewah pada kemasan obat, parfum, dan produk bermerek.",
    img: "/images/layanan/micro-emboss.png",
    keyTakeaways: [
      "Relief tekstur sub-milimeter sangat sulit ditiru oleh percetakan ilegal sehingga melindungi keaslian produk.",
      "Emboss 3D menggunakan klise jantan-betina presisi agar kontur logo timbul tajam tanpa merobek serat kertas.",
      "Dapat dikombinasikan langsung dengan Hot Stamping Foil dalam satu alur produksi yang akurat.",
    ],
    content: [
      "Selain mempercantik tampilan, tekstur timbul (Emboss) dan Micro Emboss kini banyak dimanfaatkan sebagai fitur otentikasi fisik untuk mencegah pemalsuan produk farmasi, skincare, maupun kemasan bermerek lainnya.",
      "Dengan teknologi klise presisi dan mesin bertekanan stabil, CV Pelangi UV mampu menghasilkan efek emboss 3D dan micro emboss yang tajam, tegas saat diraba, dan presisi mengikuti garis cetak.",
      "Konsumen dapat langsung merasakan kualitas dan keaslian kemasan sejak pertama kali memegang produk Anda.",
    ],
  },
  {
    id: "art-window-mika-bakery",
    slug: "laminating-window-mika-kemasan-box-bakery-higienis",
    title: "Laminating Window Mika: Solusi Kemasan Box Bakery dan Makanan agar Menarik dan Tetap Higienis",
    category: "Tips Finishing Cetak",
    tag: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "01 Agu 2026",
    readTime: "3 Menit Baca",
    views: "890 Views",
    commentsCount: "1 Komentar",
    author: "Admin Pelangi UV",
    desc: "Pemasangan jendela mika transparan otomatis yang jernih, kokoh, dan higienis untuk memperlihatkan keindahan produk kue dan makanan di dalam dus.",
    img: "/images/layanan/laminating-window.png",
    keyTakeaways: [
      "Mika bening berkualitas tinggi menampilkan produk di dalam box dengan jelas tanpa efek buram.",
      "Perekatan otomatis dengan lem food-safe menjaga tepi jendela tetap bersih bebas belepotan lem.",
      "Kokoh dan tidak mudah lepas meski box dilipat, ditumpuk, atau dikirim jarak jauh.",
    ],
    content: [
      "Pada bisnis bakery, pastry, dan oleh-oleh khas daerah, tampilan makanan yang terlihat langsung dari luar kemasan mampu meningkatkan minat beli secara drastis.",
      "Layanan Laminating Window (Window Patching) di CV Pelangi UV merekatkan film mika transparan secara otomatis dengan posisi presisi di balik lubang die-cut dus kemasan.",
      "Produk Anda tetap terlindungi dari debu dan sentuhan langsung sekaligus tampil menggugah selera di etalase toko.",
    ],
  },
  {
    id: "art-transfer-metalized",
    slug: "kertas-transfer-metalized-free-slitting-efisiensi-biaya",
    title: "Kertas Transfer Metalized & Free Slitting Roll: Efisiensi Biaya Produksi Kemasan hingga 40%",
    category: "Bahan Baku & Material",
    tag: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "18 Jul 2026",
    readTime: "4 Menit Baca",
    views: "1.080 Views",
    commentsCount: "2 Komentar",
    author: "Tim Bahan Baku Pelangi UV",
    desc: "Solusi cerdas menggantikan kertas metalized impor yang mahal dengan teknologi transfer metalized dan pemotongan roll pas ukuran mesin di CV Pelangi UV.",
    img: "/images/layanan/kertas-transfer.png",
    keyTakeaways: [
      "Efek cermin metalik Silver, Gold, hingga Hologram langsung pada karton lokal tanpa bergantung pada stok impor.",
      "Karton tetap mudah dilipat, direkatkan, dan dicetak offset dengan ketajaman warna optimal.",
      "Layanan Free Slitting dan Rewinding membantu percetakan memangkas sisa buangan roll bahan baku.",
    ],
    content: [
      "Fluktuasi harga dan waktu tunggu kertas metalized impor sering menjadi kendala bagi pabrik kemasan saat mengejar jadwal peluncuran produk klien.",
      "Teknologi Kertas Transfer Metalized di CV Pelangi UV memungkinkan partikel metalik ditransfer secara merata ke atas karton duplex atau ivory lokal, menghasilkan kilau metalik premium dengan biaya jauh lebih hemat.",
      "Selain itu, untuk kebutuhan bahan baku roll foil dan BOPP film, CV Pelangi UV juga menyediakan layanan Free Slitting & Rewinding sehingga setiap roll dipotong presisi mengikuti lebar area kerja mesin Anda.",
    ],
  },
];

export function getAllArticles(): ArticleItem[] {
  return [featuredArticle, ...articlesData];
}

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return getAllArticles().find(
    (a) => a.slug === slug || a.id === slug
  );
}

export function getTopicHighlights(): ArticleItem[] {
  const all = getAllArticles();
  const topicMap: Record<string, ArticleItem> = {};

  for (const item of all) {
    if (!topicMap[item.categoryKey]) {
      topicMap[item.categoryKey] = item;
    } else if (item.isFeatured && !topicMap[item.categoryKey].isFeatured) {
      topicMap[item.categoryKey] = item;
    }
  }

  return Object.values(topicMap);
}
