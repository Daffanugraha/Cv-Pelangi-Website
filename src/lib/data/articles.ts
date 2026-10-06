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
  id: "featured-ml930-ml750",
  slug: "jual-mesin-pond-manual-ml-930-ml-750",
  title: "Jual Mesin Pond Manual ML 930 dan ML 750 - Solusi Presisi untuk Produksi Percetakan Anda",
  category: "Mesin & Peralatan",
  categoryKey: "mesin-teknologi",
  date: "23 Okt 2025",
  readTime: "5 Menit Baca",
  views: "736 Views",
  commentsCount: "0 Komentar",
  author: "Admin Pelangi UV",
  desc: "Ketahui keunggulan konstruksi baja tuang berkekuatan tinggi, presisi pisau pond, dan efisiensi konsumsi daya mesin pond manual ML 930 & ML 750 untuk menekan scrap rate pada industri kemasan karton skala menengah hingga manufaktur besar.",
  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzmZ7Zm60qcltUqfUXnZWiG1p0tdNhcDYXDZ-mpniBnJZJ91Pk3pTKdEJ7Kogyo0C2hqk8VHwsxdP7C4OEIlki0UXnviV8KfUiUBb-g6g6yM-g3fwziEmQWUexAG1DsFzLVPI-M_4G-Sk0BKmxrkNWXtwq1A95Q2zKkvqxUjPJmYDJgi6MdX5gTqtnZtUIg5zPudYVaw6gNs7RAb-JRPeixxOJD5g4_3p6efhdBI2_oO4Gco2aHiZp",
  isFeatured: true,
  keyTakeaways: [
    "Konstruksi bodi monoblok baja tuang HT250 meredam getaran ekstrem saat tekanan beban potong maksimal.",
    "Sistem kopling elektromagnetik satu piringan memberikan pengereman instan saat sensor keselamatan mendeteksi objek asing.",
    "Toleransi register potong sangat presisi di angka ±0.15 mm untuk kemasan makanan dan farmasi.",
  ],
  content: [
    "Dalam lanskap industri percetakan dan pengemasan (packaging) modern di Indonesia, efisiensi serta akurasi proses die-cutting atau pond memegang peranan krusial terhadap kualitas produk akhir. Kegagalan akurasi garis potong (cut line) dan lipatan (creasing rule) dapat mengakibatkan tingkat afkir (scrap rate) yang tinggi.",
    "Mesin pond manual tipe platen ML 930 dan ML 750 yang dihadirkan oleh CV Pelangi UV dirancang khusus menjawab tantangan tersebut. Dibuat menggunakan paduan material baja tuang HT250 berkualitas tinggi, struktur rangka mesin mampu menahan tekanan kompresi hingga ratusan ton tanpa mengalami deformasi struktur mikroskopis.",
    "Fitur kopling elektromagnetik responsif menjamin keselamatan kerja operator secara optimal. Dilengkapi dengan dual safety bar dan sensor infra-merah di sekeliling area kerja platen, mesin akan berhenti seketika dalam hitungan milidetik jika tangan operator mendekati area berbahaya.",
    "CV Pelangi UV tidak hanya menyediakan unit mesin, namun juga didukung ketersediaan suku cadang asli di Kompleks Pergudangan Bizpark Waru Sidoarjo serta pelatihan teknisi operator langsung di workshop percetakan Anda.",
  ],
};

export const articlesData: ArticleItem[] = [
  {
    id: "art-1",
    slug: "mesin-pond-otomatis-terbaik-oyang-wh1050ss",
    title: "Mesin Pond Otomatis Terbaik 2025 Oyang WH 1050SS, Solusi Presisi untuk Produksi Kemasan Industri",
    category: "Mesin & Teknologi",
    categoryKey: "mesin-teknologi",
    date: "07/08/2025",
    readTime: "4 Menit Baca",
    views: "1.036 views",
    commentsCount: "2 Komentar",
    author: "Admin Pelangi UV",
    desc: "Eksplorasi kemampuan feeding berkecepatan 7.500 lembar/jam dengan register sensor optic otomatis yang menjamin akurasi lipatan kemasan tanpa geser milimeter sedikitpun.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzyVHW-5Zi0qqosAp0aEOt_l2gmKwW9LLxSpY70o6i14P0QLM3FHVcmOetwlyl2BDMl6Ajs0bawirxLFZ1HZitBikROPb1avep7O4mBGydoDrQDClD0SxoBXrFB79KUn3lgYojpLVLsxc5AX_-LQqXLIG3dczPHsDtaVtJrJFsHl6FNC6qjMcwhLxA3gnTjeYAt-PSfu_v0O49cp8RyEkPoHTil0s4ZNJlMLEBscJajZFvf8ggOS6e",
    keyTakeaways: [
      "Kapasitas produksi mencapai 7.500 lembar per jam untuk karton hingga 2000 gsm.",
      "Unit stripping otomatis memisahkan sisa limbah potongan kertas seketika.",
      "Layar sentuh PLC intuitif dengan penyimpanan ratusan profil job pisau pond.",
    ],
    content: [
      "Persaingan industri kemasan makanan, kosmetik, dan farmasi menuntut lead-time produksi yang semakin ketat. Mesin pond otomatis Oyang WH 1050SS hadir sebagai standar baru mesin die cutting berkecepatan tinggi.",
      "Dilengkapi dengan feeder pengumpan non-stop berteknologi 4 suction head dan 4 forwarding head, lembaran karton tebal maupun gelombang mikro (E-flute) dapat ditarik dengan stabil tanpa risiko double sheet.",
      "Sistem pemosisian register menggunakan sensor serat optik berkecepatan tinggi yang secara otomatis mengoreksi kemiringan lembaran kertas sebelum masuk ke stasiun pengepresan, memastikan register pisau pond selalu berada di toleransi kurang dari 0.1 mm.",
    ],
  },
  {
    id: "art-2",
    slug: "mesin-laminating-otomatis-yzfm-850sa",
    title: "Upgrade Produksi Jadi Lebih Cepat & Rapi? Kenalan dengan YZFM-850SA, Mesin Laminating Otomatis Canggih Ini!",
    category: "Mesin & Teknologi",
    categoryKey: "mesin-teknologi",
    date: "10/06/2025",
    readTime: "4 Menit Baca",
    views: "1.186 views",
    commentsCount: "4 Komentar",
    author: "Admin Pelangi UV",
    desc: "Sistem pemanas elektromagnetik presisi tinggi yang mencegah timbulnya gelembung pada film thermal doff dan gloss untuk kapasitas cetak skala massal harian.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA52_IT34kiOlEwJAOD-TpWxq5PyJzV1qmGmLJlPILEYoMyDgTlQiuJmVbc6sO1QJpU3mbqtdbQDlAw8r2Si3w10CPhuJxzk14JbNhg2ZmrSDesmPHXpFH59O4g8v2HG59DFDhXHAtmdWkkq1SfW9h3Ke8tTTcwQrDwykVHzHTeJTSE76l1eb6Y7TGt8tXL7qLSaOjiKnCOI788xBP7ExbXnWhXnh70T5ZZ3NG9vlAG6VwjQss05Hw4",
    keyTakeaways: [
      "Pemanasan elektromagnetik menghasilkan stabilitas temperatur ±1°C di seluruh permukaan rol.",
      "Pisau perforasi mikro dan rol penarik otomatis memotong lembaran tanpa bekas gerigi kasar.",
      "Daya rekat film thermal BOPP melekat sempurna tanpa efek delaminasi saat di-creasing.",
    ],
    content: [
      "Proses laminasi thermal doff dan glossy kerap menghadapi kendala gelembung udara halus serta perbedaan panas rol yang menyebabkan warna cetakan berubah pudar. Mesin laminasi otomatis YZFM-850SA memecahkan masalah ini dengan sistem pemanas elektromagnetik mutakhir.",
      "Rol baja berdiameter besar dengan lapisan krom cermin (super mirror chrome) memberikan distribusi tekanan yang merata ke seluruh penampang lembaran hingga lebar 850 mm.",
      "Hasil akhir laminasi terbukti bebas kerutan, sangat bening, dan siap untuk diproses lanjut ke tahapan Spot UV maupun Hot Stamping Foil tanpa mengalami delaminasi.",
    ],
  },
  {
    id: "art-3",
    slug: "perbedaan-spot-uv-vs-hot-stamp-foil",
    title: "Perbedaan Spot UV vs Hot Stamp Foil: Kapan Harus Menggunakan Keduanya pada Kemasan Kosmetik?",
    category: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "15/05/2025",
    readTime: "3 Menit Baca",
    views: "920 views",
    commentsCount: "1 Komentar",
    author: "Admin Pelangi UV",
    desc: "Panduan taktis memadukan efek kilap timbul varnish UV dengan kemilau metalik foil emas untuk mengangkat nilai jual kotak parfum & skincare retail modern.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkDzAZAzalZFA48uUtnkA5ZaMCFnOs6ICR2tN8kGvGINNSVdYvxEN-5tDZteWB5sUmUQJLjm1AHMtfXFzgsB6V45rhNRniSAVghZdLNqzSwxCmddjaDiRyxeYiwtRYaUZq5qIx0udf5UF98ynG3_gzJCJHUl0AJhvRqIfgwDSJG_hECmqnUeijVLudCGmzroUFxz9dLBI1wDd_bJN9g_cXlef2qlKW3DSyaU-b4MDDFycyrGeszWpc",
    keyTakeaways: [
      "Spot UV menonjolkan tekstur basah transparan tanpa mengubah warna pigmen dasar kemasan.",
      "Hot Stamping Foil memberikan refleksi logam emas, perak, atau hologram mewah dengan opasitas 100%.",
      "Kombinasi keduanya di atas kertas laminasi velvet/doff menciptakan kontras sentuhan premium kelas atas.",
    ],
    content: [
      "Di rak toko retail, kemasan kosmetik dan parfum hanya memiliki waktu 3 detik untuk menarik pandangan calon pembeli. Di sinilah teknik finishing pasca-cetak memegang peranan penentu.",
      "Spot UV bekerja dengan memberikan lapisan pernis bening berdaya kilap hingga 98 GU pada area tertentu seperti tipografi brand atau logo grafis.",
      "Sementara itu, Hot Stamp Foil menggunakan plat panas untuk mentransfer lembaran film foil berkilau metalik. Saat keduanya dipadukan secara harmonis di atas dasar kemasan matte, tercipta ilusi kedalaman visual dan kesan elegan yang sulit ditandingi.",
    ],
  },
  {
    id: "art-4",
    slug: "panduan-memilih-lem-wet-vs-dry-laminating",
    title: "Panduan Memilih Lem Wet vs Dry Thermal Lamination untuk Kemasan Makanan Frozen",
    category: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "28/04/2025",
    readTime: "5 Menit Baca",
    views: "845 views",
    commentsCount: "0 Komentar",
    author: "Admin Pelangi UV",
    desc: "Standar ketahanan daya rekat pada suhu minus derajat celcius tanpa resiko delaminasi dan bau zat kimia yang menyengat sesuai regulasi food-grade.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpn_oPhTJgun1rCebXLIFQ80eAKXnBlQapzTfxzkh1loitD3H9qyw8Dzm4WiVfMwuyR7OmKURgkjnXaCsPLAqRFZWI5Lhx5WpdbGfGeWvzTsDtFevuf7RKeyhIzwUycBOoIukLHXZq-Q0cL6p3XkNxiEZO1cqckn3c8QX4NejVDrHzshutVCvk4IDFdpLTOJ7KfILylxxTamDAk4fh_ld-ddJ7IcA3zWpo1iOdD9nZ2Mes_Y10Dvv",
    keyTakeaways: [
      "Kemasan frozen food memerlukan lem sintetis waterbase tanpa residu bau kimia menyengat.",
      "Kekuatan ikatan lem harus tetap elastis dan tidak getas pada kondisi beku freezer industri.",
      "Uji coba laboratorium menunjukkan ketahanan rekat prima terhadap kondensasi uap es.",
    ],
    content: [
      "Kemasan makanan beku (frozen food) menghadapi tantangan lingkungan yang keras: kelembapan tinggi, kondensasi es saat defrosting, serta suhu beku ekstrem hingga -20°C.",
      "Pemilihan lem laminasi yang salah akan menyebabkan film plastik mengelupas dari karton (delaminasi) dan merusak integritas kemasan produk.",
      "Pelangi UV merekomendasikan formulasi lem sintetis waterbase khusus berdaya penetrasi tinggi yang mampu mengikat serat karton tebal sekaligus mempertahankan elastisitas lapisan film dalam suhu sub-zero.",
    ],
  },
  {
    id: "art-5",
    slug: "mengatasi-masalah-delaminasi-hot-stamping-foil",
    title: "Mengatasi Masalah Delaminasi dan Kerutan saat Hot Stamping Foil pada Karton Tebal",
    category: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "12/03/2025",
    readTime: "4 Menit Baca",
    views: "1.410 views",
    commentsCount: "3 Komentar",
    author: "Admin Pelangi UV",
    desc: "Trik pengaturan suhu plat pemanas 90°C–115°C dan dwell time tekanan agar lapisan metalized melekat sempurna tanpa merusak kepadatan serat kertas.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK6S3250vxSxCa9_vXCgk34-2dGoNmZAcY-32Mn7eATEF9gsNlxUZgJnyMyxsQV3IHm4xZ5MSSEWq-VMO87p2mLItV8gULOEdhzVKuXDP9lS80UO2AL4YorXHm-K45X9dVE4IGpAZnAvw8ttLzdn0D9GZb0u62ajwxDgjRQkGeBdvV2yZTMnJ6aNjopuN9e3ZUK5d42m2gK6Kuhmb3baNEgK5x1blrOh7sau7U2BQhMy7QpqpGuMIo",
    keyTakeaways: [
      "Suhu transfer plat ideal berkisar antara 90°C hingga 115°C tergantung ketebalan karton.",
      "Tensioning roll foil yang terlalu kencang menyebabkan kerutan rambut pada tulisan tipis.",
      "Gunakan bahan baku foil dengan lapisan rilis cepat (easy-release layer) untuk detail mikro.",
    ],
    content: [
      "Keluhan umum pada proses stamping foil adalah tepi cetakan yang berserabut (flaking) atau foil yang tidak mau menempel rapat pada permukaan karton duplex/ivory tebal.",
      "Kuncinya terletak pada kalibrasi segitiga parameter stamping: suhu pemanas, tekanan hidrolik/mekanik, serta durasi kontak cetak (dwell time).",
      "Selain kalibrasi mesin, pemilihan mutu roll foil dari CV Pelangi UV yang dilengkapi release layer berspesifikasi tinggi menjamin garis halus teks 6pt sekalipun tetap tajam dan bersih.",
    ],
  },
  {
    id: "art-6",
    slug: "pelangi-uv-ikut-meriahkan-event-surabaya-printing-expo-2024",
    title: "Pelangi UV Ikut Meriahkan Event Surabaya Printing Expo 2024",
    category: "Kabar Perusahaan",
    categoryKey: "kabar-perusahaan",
    date: "18/02/2025",
    readTime: "3 Menit Baca",
    views: "680 views",
    commentsCount: "1 Komentar",
    author: "Admin Pelangi UV",
    desc: "Dokumentasi kunjungan booth dan uji coba langsung sampel finishing premium bersama para pelaku industri grafika dan packaging se-Jawa Timur.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hdV-RTsrfP0n1xaG4-VUt2RqLE813m730KepugadtmYjhQ_QZ7qe7_RayBZ2osjHKjv4EaXk2FoLnLExiFlNMTg_IP-fLFFxj8BML4PjvgowI_QrfVg-Q8b-32q_No8taRYhI-LV-CpnD6sh9ZozRMbQSqp89n1tjcvV0F8LmplobmDoHiIcB-UIVMj-HRsbQhAV4xIySisnyaXPqId_Ulld_t3J4yaXT1iWd_nG9og0JOInsU1X",
    keyTakeaways: [
      "Ratusan mitra percetakan mencoba langsung sampel Spot UV Drip-Off dan Sand Varnish.",
      "Konsultasi teknis mesin pond otomatis bersama tim engineer langsung di stan pameran.",
      "Komitmen Pelangi UV memperkuat ekosistem industri pasca-cetak di wilayah Indonesia Timur.",
    ],
    content: [
      "Pada ajang pameran akbar Surabaya Printing Expo (SPE) 2024 di Grand City Convention Hall, CV Pelangi UV kembali menjadi pusat perhatian para pelaku industri grafika regional dengan memamerkan puluhan inovasi efek finishing cetak pasca-cetak terkini.",
      "Booth Pelangi UV ramai dipadati pengunjung yang terdiri dari pemilik percetakan komersial, pabrik kemasan karton box, desainer packaging, hingga perwakilan industri farmasi dan F&B dari berbagai penjuru Jawa Timur dan Indonesia Timur.",
      "Antusiasme terbesar tertuju pada peluncuran katalog interaktif swatch finishing yang memperlihatkan perbedaan tekstur rabaan fisik antara Spot UV High Gloss 98 GU, Sand Texture Drip-off kasar, hingga kemilau Hot Stamping Foil Gold & Silver Hologram berdaya kilau spektakuler.",
      "Selain pameran sampel fisik, tim teknisi senior CV Pelangi UV juga membuka sesi konsultasi gratis seputar optimasi mesin pond otomatis, pemilihan formulasi lem laminating food-grade, serta teknik penanganan kendala delaminasi pada karton tebal.",
    ],
  },
  {
    id: "art-7",
    slug: "revolusi-efek-cast-and-cure-hologram-ramah-lingkungan",
    title: "Revolusi Efek Cast and Cure: Hologram Mikro Eco-Friendly Tanpa Film Plastik Konvensional",
    category: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "14/01/2025",
    readTime: "4 Menit Baca",
    views: "1.250 views",
    commentsCount: "0 Komentar",
    author: "Admin Pelangi UV",
    desc: "Teknologi varnish UV nano-embossing yang menciptakan kilau hologram pelangi tanpa menghasilkan sampah plastik mika yang sulit didaur ulang.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEXJFAl9U2vieevJ01JauKl40I9hLNDc5i3TTZqyEvvIW41iwDDFjqEAcFJaEvVNMni-SiTko0A_srel6JQicrO-3yESDr_guNXnlm9LgV5KXMgjXUmF2pga6mbsnfeb2719sGmHtCu6vYShpDi3WxN4ztLgGpcGiM2IHvs1Z_ue4fTzQZIQNZ7RloVgRaa1TqSnd1p-mKi-2C8TPeIWcu5jONFobG7u_HtU-L8BsstZWjwfmZJdMh",
    keyTakeaways: [
      "Mengurangi limbah film plastik hingga 100% karena menggunakan silinder embossing casting reusable.",
      "Efek kilau prisma holografis sulit ditiru oleh mesin percetakan rumahan konvensional.",
      "Proses curing ultra-violet instant menjamin kertas tetap datar bebas kerut.",
    ],
    content: [
      "Tuntutan pasar global terhadap kemasan ramah lingkungan (sustainable packaging) mendorong CV Pelangi UV menghadirkan teknologi Cast and Cure modern.",
      "Berbeda dengan laminasi mika hologram biasa yang meninggalkan lapisan plastik non-biodegradable, Cast and Cure hanya mencetak pola mikro pada cairan varnish bening yang langsung dikeringkan oleh sinar UV.",
      "Hasilnya adalah kemasan dengan estetika prismatik kelas atas yang tetap dapat didaur ulang secara optimal.",
    ],
  },
  {
    id: "art-8",
    slug: "standar-keamanan-kemasan-farmasi-micro-emboss",
    title: "Penerapan Micro Emboss & Rel Presisi untuk Mencegah Pemalsuan Obat dan Produk Farmasi",
    category: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "05/01/2025",
    readTime: "5 Menit Baca",
    views: "980 views",
    commentsCount: "2 Komentar",
    author: "Admin Pelangi UV",
    desc: "Mengapa industri farmasi dan kemasan rokok wajib mengadopsi tekstur timbul sub-milimeter sebagai fitur otentikasi segel keamanan visual.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzmZ7Zm60qcltUqfUXnZWiG1p0tdNhcDYXDZ-mpniBnJZJ91Pk3pTKdEJ7Kogyo0C2hqk8VHwsxdP7C4OEIlki0UXnviV8KfUiUBb-g6g6yM-g3fwziEmQWUexAG1DsFzLVPI-M_4G-Sk0BKmxrkNWXtwq1A95Q2zKkvqxUjPJmYDJgi6MdX5gTqtnZtUIg5zPudYVaw6gNs7RAb-JRPeixxOJD5g4_3p6efhdBI2_oO4Gco2aHiZp",
    keyTakeaways: [
      "Tekstur relief mikro di bawah 0.2 mm tidak dapat ditiru dengan mesin cetak offset biasa.",
      "Membantu verifikasi produk asli secara langsung lewat rabaan tangan konsumen.",
      "Dapat dikombinasikan dengan nomor seri klise pond otomatis untuk tracking batch.",
    ],
    content: [
      "Maraknya produk tiruan menuntut industri farmasi dan etiket cukai kemasan meningkatkan level keamanan fisik kemasannya.",
      "CV Pelangi UV menyediakan layanan Micro Emboss berpresisi tinggi dengan toleransi mikron yang mampu mencetak garis taktil ultra-halus.",
      "Tekstur timbul mikro ini menjadi benteng pertahanan pertama identitas orisinalitas produk di rak toko.",
    ],
  },
  {
    id: "art-9",
    slug: "tips-memaksimalkan-tata-letak-plano-cetak-hemat-biaya",
    title: "Tips Efisiensi Tata Letak Lembaran Plano Cetak: Hemat Ongkos Finishing Hingga 30%",
    category: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "20/12/2024",
    readTime: "4 Menit Baca",
    views: "1.520 views",
    commentsCount: "5 Komentar",
    author: "Admin Pelangi UV",
    desc: "Strategi pengaturan pola klise hot stamping dan area lembaran pond agar tidak membuang bahan baku karton mahal secara cuma-cuma.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzyVHW-5Zi0qqosAp0aEOt_l2gmKwW9LLxSpY70o6i14P0QLM3FHVcmOetwlyl2BDMl6Ajs0bawirxLFZ1HZitBikROPb1avep7O4mBGydoDrQDClD0SxoBXrFB79KUn3lgYojpLVLsxc5AX_-LQqXLIG3dczPHsDtaVtJrJFsHl6FNC6qjMcwhLxA3gnTjeYAt-PSfu_v0O49cp8RyEkPoHTil0s4ZNJlMLEBscJajZFvf8ggOS6e",
    keyTakeaways: [
      "Mengurangi jarak gripper dan margin buangan klise menghemat meteran roll foil.",
      "Penyesuaian arah serat kertas (grain direction) mencegah pecah tekukan saat pond.",
      "Layanan Free Slitting Pelangi UV memotong roll jumbo pas sesuai area silinder mesin.",
    ],
    content: [
      "Efisiensi biaya produksi kemasan sering kali ditentukan oleh kecermatan penataan layout desain pada lembaran kertas plano (65x100 atau 79x109 cm).",
      "Dengan mengelompokkan area foil dalam satu baris tarikan rol dan menyelaraskan garis tekukan rel dengan arah serat, biaya finishing per kemasan dapat ditekan secara signifikan.",
    ],
  },
  {
    id: "art-10",
    slug: "laminating-window-mika-standar-higienis-box-bakery",
    title: "Laminating Window Mika: Rahasia Kemasan Box Bakery Tampil Menarik dan Tetap Higienis",
    category: "Tips Finishing Cetak",
    categoryKey: "tips-finishing",
    date: "02/12/2024",
    readTime: "3 Menit Baca",
    views: "870 views",
    commentsCount: "1 Komentar",
    author: "Admin Pelangi UV",
    desc: "Perekatan jendela mika transparan food-grade otomatis berkecepatan 105.000 lembar/hari untuk melindungi kue basah dari debu luar.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA52_IT34kiOlEwJAOD-TpWxq5PyJzV1qmGmLJlPILEYoMyDgTlQiuJmVbc6sO1QJpU3mbqtdbQDlAw8r2Si3w10CPhuJxzk14JbNhg2ZmrSDesmPHXpFH59O4g8v2HG59DFDhXHAtmdWkkq1SfW9h3Ke8tTTcwQrDwykVHzHTeJTSE76l1eb6Y7TGt8tXL7qLSaOjiKnCOI788xBP7ExbXnWhXnh70T5ZZ3NG9vlAG6VwjQss05Hw4",
    keyTakeaways: [
      "Film mika 20-30 mikron berkejernihan tinggi tanpa efek kabut embun.",
      "Lem waterbase food-grade bersertifikasi aman untuk kontak pangan tidak langsung.",
      "Jendela mika presisi tidak mudah lepas saat box ditekuk dan ditumpuk.",
    ],
    content: [
      "Industri bakery dan kue premium mengandalkan visual keindahan produk di balik kemasan untuk memikat selera pembeli.",
      "Layanan Window Patching otomatis CV Pelangi UV memastikan film mika terpasang kokoh, rata, dan higienis tanpa noda lem yang mengotori tampilan luar dus.",
    ],
  },
  {
    id: "art-11",
    slug: "ekspansi-kapasitas-mesin-workshop-bizpark-sidoarjo",
    title: "Ekspansi Kapasitas Workshop Bizpark Sidoarjo: Siap Layani 200.000 Lembar Plano Per Hari",
    category: "Kabar Perusahaan",
    categoryKey: "kabar-perusahaan",
    date: "15/11/2024",
    readTime: "4 Menit Baca",
    views: "1.650 views",
    commentsCount: "4 Komentar",
    author: "Admin Pelangi UV",
    desc: "Penambahan lini mesin cetak otomatis dan armada logistik truk boks tertutup untuk mempercepat pengiriman bebas ongkir di seluruh wilayah Jawa Timur.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzmZ7Zm60qcltUqfUXnZWiG1p0tdNhcDYXDZ-mpniBnJZJ91Pk3pTKdEJ7Kogyo0C2hqk8VHwsxdP7C4OEIlki0UXnviV8KfUiUBb-g6g6yM-g3fwziEmQWUexAG1DsFzLVPI-M_4G-Sk0BKmxrkNWXtwq1A95Q2zKkvqxUjPJmYDJgi6MdX5gTqtnZtUIg5zPudYVaw6gNs7RAb-JRPeixxOJD5g4_3p6efhdBI2_oO4Gco2aHiZp",
    keyTakeaways: [
      "Total 35+ unit mesin otomatis dan semi-otomatis siap beroperasi multi-shift.",
      "Jangkauan antar-jemput gratis diperluas ke Surabaya, Sidoarjo, Gresik, Pasuruan, dan Malang.",
      "Dukungan teknisi standby untuk pengujian sampel finishing langsung di hari yang sama.",
    ],
    content: [
      "Menjawab tingginya permintaan industri manufaktur kemasan di kawasan Jawa Timur, CV Pelangi UV resmi menyelesaikan ekspansi workshop di Pergudangan Bizpark Blok C17-C19 Waru Sidoarjo.",
      "Dengan integrasi mesin generasi terbaru, waktu pengerjaan order skala ratusan ribu lembar kini dapat diselesaikan lebih cepat dengan standar presisi register mikron yang konsisten.",
    ],
  },
  {
    id: "art-12",
    slug: "teknik-transfer-metalized-paper-ramah-lingkungan",
    title: "Solusi Cerdas Pengganti Kertas Metalized Impor: Transfer Metalized Paper Berbiaya Efisien",
    category: "Bahan Baku & Material",
    categoryKey: "bahan-baku",
    date: "28/10/2024",
    readTime: "4 Menit Baca",
    views: "1.120 views",
    commentsCount: "2 Komentar",
    author: "Admin Pelangi UV",
    desc: "Bagaimana proses transfer partikel foil metalik langsung ke lembaran karton lokal mampu memangkas biaya bahan baku hingga 40%.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkDzAZAzalZFA48uUtnkA5ZaMCFnOs6ICR2tN8kGvGINNSVdYvxEN-5tDZteWB5sUmUQJLjm1AHMtfXFzgsB6V45rhNRniSAVghZdLNqzSwxCmddjaDiRyxeYiwtRYaUZq5qIx0udf5UF98ynG3_gzJCJHUl0AJhvRqIfgwDSJG_hECmqnUeijVLudCGmzroUFxz9dLBI1wDd_bJN9g_cXlef2qlKW3DSyaU-b4MDDFycyrGeszWpc",
    keyTakeaways: [
      "Hasil cetak sebanding dengan kertas metalized impor tanpa resiko stok kosong.",
      "Karton tetap lentur dan tidak mudah sobek saat proses pengeleman lipatan box.",
      "Pilihan efek Silver, Gold, hingga Rainbow Hologram yang siap dioverprint tinta offset.",
    ],
    content: [
      "Ketergantungan terhadap kertas metalized impor kerap memicu pembengkakan biaya akibat fluktuasi kurs dan biaya logistik pengiriman.",
      "Teknologi Transfer Metalized CV Pelangi UV memungkinkan transfer partikel aluminium ultra-tipis langsung ke permukaan duplex atau ivory lokal sebelum dicetak, menghasilkan efek cermin metalik sempurna dengan efisiensi biaya maksimal.",
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
