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
}

export const MOMEN_FILTERS = [
  { key: "all", label: "Semua Momen" },
  { key: "expo2025", label: "Printing Expo Surabaya 2025" },
  { key: "expo2024", label: "Surabaya Printing Expo 2024" },
  { key: "hut79", label: "HUT RI ke-79" },
  { key: "gathering2023", label: "Employee Gathering 2023" },
  { key: "expo2023", label: "Surabaya Printing Expo 2023" },
  { key: "momenpertama", label: "Momen Pertama" },
];

export const HERO_LOOPING_ITEMS = [
  "Pameran Industri Percetakan Nasional (SPE)",
  "Semangat Kebersamaan HUT RI ke-79",
  "Kegiatan Employee Gathering & Rekreasi Tim",
  "Surabaya Printing Expo (SPE) 2023",
  "Standarisasi Mutu Fasilitas Bengkel Modern",
  "Momen Pertama & Kilas Bersejarah Pelangi UV",
];

export const MOMEN_HIGHLIGHTS: MomenHighlight[] = [
  {
    filterKey: "expo2025",
    title: "Printing Expo Surabaya 2025",
    desc: "Dokumentasi booth pameran CV Pelangi UV menyambut ratusan mitra industri percetakan dan kemasan ekspor se-Indonesia di gelaran Printing Expo Surabaya 2025.",
    img: "/images/expo-2025/expo-2025-1.jpg",
    caption: "Dokumentasi booth pameran CV Pelangi UV pada gelaran Printing Expo Surabaya 2025.",
  },
  {
    filterKey: "expo2024",
    title: "Surabaya Printing Expo 2024",
    desc: "Konsultasi teknis spesifikasi hot stamp foil emas, drip-off varnish, dan ragam kemasan bersertifikasi standar ekspor bersama mitra percetakan nasional.",
    img: "/images/expo-2024/expo-2024-1.jpg",
    caption: "Konsultasi langsung ragam spesifikasi foil hot stamp untuk packaging ekspor dengan pengunjung B2B industri percetakan nasional.",
  },
  {
    filterKey: "hut79",
    title: "HUT Republik Indonesia 79th",
    desc: "Dokumentasi perayaan dan semarak kemerdekaan HUT Republik Indonesia ke-79 keluarga besar CV Pelangi UV.",
    img: "/images/hut-79/hut-79-5.jpg",
    caption: "HUT Republik Indonesia 79th",
  },
  {
    filterKey: "gathering2023",
    title: "Employee Gathering 2023",
    desc: "Kebersamaan dan rekreasi keluarga besar CV Pelangi UV sebagai bentuk apresiasi atas dedikasi tanpa henti seluruh tim teknisi, operator, dan manajemen.",
    img: "/images/gathering-2023/gathering-2023-1.jpg",
    caption: "Keseruan dan kebersamaan keluarga besar CV Pelangi UV dalam Employee Gathering 2023.",
  },
  {
    filterKey: "expo2023",
    title: "Surabaya Printing Expo 2023",
    desc: "Partisipasi aktif CV Pelangi UV dalam pameran percetakan akbar SPE 2023 di Grand City Surabaya, memamerkan keunggulan finishing cetak presisi tinggi.",
    img: "/images/expo-2023/expo-2023-1.jpg",
    caption: "Partisipasi aktif CV Pelangi UV dalam pameran percetakan akbar Surabaya Printing Expo 2023.",
  },
  {
    filterKey: "momenpertama",
    title: "Momen Pertama Pelangi UV",
    desc: "Kilas balik rekam jejak awal perjalanan CV Pelangi UV dari inisiasi bengkel pertama hingga berkembang melayani ribuan mitra percetakan se-Indonesia.",
    img: "/images/momen-pertama/momen-1.jpg",
    caption: "Momen Pertama — Rekam jejak awal dedikasi dan perjalanan CV Pelangi UV dalam industri finishing percetakan.",
  },
];

export const MOMEN_ALBUMS: MomenAlbum[] = [
  {
    category: "expo2025",
    title: "Printing Expo Surabaya 2025",
    desc: "Dokumentasi kehadiran booth CV Pelangi UV dan interaksi tim bersama mitra percetakan di ajang Printing Expo Surabaya 2025.",
    photos: [
      {
        alt: "Booth Printing Expo Surabaya 2025",
        caption: "Dokumentasi booth pameran CV Pelangi UV pada gelaran Printing Expo Surabaya 2025.",
        title: "Printing Expo Surabaya 2025 - Booth Pelangi UV",
        src: "/images/expo-2025/expo-2025-1.jpg",
        cardTitle: "Booth CV Pelangi UV",
        cardDesc: "Printing Expo Surabaya 2025",
      },
      {
        alt: "Konsultasi Mitra Printing Expo Surabaya 2025",
        caption: "Antusiasme mitra percetakan dan industri kemasan mengunjungi booth CV Pelangi UV di SPE 2025.",
        title: "Konsultasi Mitra Percetakan SPE 2025",
        src: "/images/expo-2025/expo-2025-2.jpg",
        cardTitle: "Konsultasi Mitra Percetakan",
        cardDesc: "Printing Expo Surabaya 2025",
      },
      {
        alt: "Display Sampel Finishing SPE 2025",
        caption: "Display portofolio sampel hasil aplikasi finishing spot UV, foil, dan kemasan cetak berstandar ekspor.",
        title: "Display Portofolio Sampel SPE 2025",
        src: "/images/expo-2025/expo-2025-3.jpg",
        cardTitle: "Display Portofolio Sampel",
        cardDesc: "Printing Expo Surabaya 2025",
      },
      {
        alt: "Tim Stand CV Pelangi UV SPE 2025",
        caption: "Kebersamaan tim CV Pelangi UV menyambut pengunjung dan mitra industri kemasan di ajang Printing Expo 2025.",
        title: "Tim Stand CV Pelangi UV SPE 2025",
        src: "/images/expo-2025/expo-2025-4.jpg",
        cardTitle: "Tim Stand CV Pelangi UV",
        cardDesc: "Printing Expo Surabaya 2025",
      },
    ],
  },
  {
    category: "expo2024",
    title: "Surabaya Printing Expo (SPE) 2024",
    desc: "Dokumentasi keikutsertaan booth CV Pelangi UV dalam pameran percetakan akbar Surabaya Printing Expo 2024.",
    photos: [
      {
        alt: "Surabaya Printing Expo 2024 - Stand Pelangi UV",
        caption: "Surabaya Printing Expo 2024",
        title: "Surabaya Printing Expo 2024 - Foto 1",
        src: "/images/expo-2024/expo-2024-1.jpg",
        cardTitle: "Booth CV Pelangi UV",
        cardDesc: "Surabaya Printing Expo 2024",
      },
      {
        alt: "Surabaya Printing Expo 2024 - Konsultasi Pengunjung",
        caption: "Surabaya Printing Expo 2024",
        title: "Surabaya Printing Expo 2024 - Foto 2",
        src: "/images/expo-2024/expo-2024-2.jpg",
        cardTitle: "Konsultasi Mitra Percetakan",
        cardDesc: "Surabaya Printing Expo 2024",
      },
      {
        alt: "Surabaya Printing Expo 2024 - Display Sampel",
        caption: "Surabaya Printing Expo 2024",
        title: "Surabaya Printing Expo 2024 - Foto 3",
        src: "/images/expo-2024/expo-2024-3.jpg",
        cardTitle: "Display Portofolio & Sampel",
        cardDesc: "Surabaya Printing Expo 2024",
      },
      {
        alt: "Surabaya Printing Expo 2024 - Tim Pelangi UV",
        caption: "Surabaya Printing Expo 2024",
        title: "Surabaya Printing Expo 2024 - Foto 4",
        src: "/images/expo-2024/expo-2024-4.jpg",
        cardTitle: "Tim Stand CV Pelangi UV",
        cardDesc: "Surabaya Printing Expo 2024",
      },
    ],
  },
  {
    category: "hut79",
    title: "Semangat Kemerdekaan HUT RI ke-79",
    desc: "Momen semarak peringatan kemerdekaan Republik Indonesia ke-79 bersama keluarga besar dan seluruh staf CV Pelangi UV.",
    photos: [
      {
        alt: "HUT Republik Indonesia 79th",
        caption: "HUT Republik Indonesia 79th",
        title: "HUT Republik Indonesia 79th - Kompak Berseragam Merah",
        src: "/images/hut-79/hut-79-1.jpg",
        cardTitle: "Kompak Berseragam Merah",
        cardDesc: "Semangat nasionalisme dan kebersamaan seluruh tim kerja merayakan hari kemerdekaan.",
      },
      {
        alt: "HUT Republik Indonesia 79th",
        caption: "HUT Republik Indonesia 79th",
        title: "HUT Republik Indonesia 79th - Lomba Semarak Kemerdekaan",
        src: "/images/hut-79/hut-79-2.jpg",
        cardTitle: "Lomba Semarak Kemerdekaan",
        cardDesc: "Keseruan lomba dan keakraban mempererat kerja sama antar divisi produksi.",
      },
      {
        alt: "HUT Republik Indonesia 79th",
        caption: "HUT Republik Indonesia 79th",
        title: "HUT Republik Indonesia 79th - Tradisi Syukuran & Doa Bersama",
        src: "/images/hut-79/hut-79-3.jpg",
        cardTitle: "Tradisi Syukuran & Doa Bersama",
        cardDesc: "Wujud rasa syukur atas dedikasi berkarya dan doa demi keselamatan kerja bersama.",
      },
      {
        alt: "HUT Republik Indonesia 79th",
        caption: "HUT Republik Indonesia 79th",
        title: "HUT Republik Indonesia 79th - Apresiasi Insan Berdedikasi",
        src: "/images/hut-79/hut-79-4.jpg",
        cardTitle: "Apresiasi Insan Berdedikasi",
        cardDesc: "Pemberian apresiasi atas dedikasi dan kontribusi prima seluruh tim dalam produksi.",
      },
      {
        alt: "HUT Republik Indonesia 79th",
        caption: "HUT Republik Indonesia 79th",
        title: "HUT Republik Indonesia 79th - Foto Bersama Tim Pelangi",
        src: "/images/hut-79/hut-79-5.jpg",
        cardTitle: "Foto Bersama Seluruh Tim",
        cardDesc: "Dokumentasi kebersamaan keluarga besar CV Pelangi UV pada puncak HUT RI ke-79.",
      },
    ],
  },
  {
    category: "gathering2023",
    title: "Employee Gathering 2023",
    desc: "Apresiasi kebersamaan, liburan bersama, dan penguatan kekompakan tim CV Pelangi UV di Employee Gathering 2023.",
    photos: [
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 1",
        src: "/images/gathering-2023/gathering-2023-1.jpg",
        cardTitle: "Keluarga Besar Pelangi UV",
        cardDesc: "Pelepasan penat kerja dan silaturahmi akbar tahunan bersama seluruh keluarga karyawan.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 2",
        src: "/images/gathering-2023/gathering-2023-2.jpg",
        cardTitle: "Sinergi & Team Building",
        cardDesc: "Aktivitas outbound membangun rasa percaya dan kekompakan lintas bagian kerja pabrik.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 3",
        src: "/images/gathering-2023/gathering-2023-3.jpg",
        cardTitle: "Apresiasi Karyawan Berprestasi",
        cardDesc: "Penyerahan penghargaan khusus bagi staf dan operator dengan loyalitas terbaik.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 4",
        src: "/images/gathering-2023/gathering-2023-4.jpg",
        cardTitle: "Gala Dinner & Hiburan Bersama",
        cardDesc: "Malam ramah tamah hangat bertabur canda tawa dan doorprize menarik untuk tim.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 5",
        src: "/images/gathering-2023/gathering-2023-5.jpg",
        cardTitle: "Semangat Optimisme Bersama",
        cardDesc: "Penyampaian komitmen arah perkembangan perusahaan menuju standar finishing cetak unggul.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 6",
        src: "/images/gathering-2023/gathering-2023-6.jpg",
        cardTitle: "Keseruan Wahana Rekreasi",
        cardDesc: "Suasana ceria menikmati fasilitas liburan bersama keluarga dan rekan sejawat.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 7",
        src: "/images/gathering-2023/gathering-2023-7.jpg",
        cardTitle: "Doa Syukur Perjalanan Bisnis",
        cardDesc: "Momen hening memanjatkan doa bersama untuk kelancaran kemitraan dan keselamatan kerja.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 8",
        src: "/images/gathering-2023/gathering-2023-8.jpg",
        cardTitle: "Kenangan Manis di Destinasi Wisata",
        cardDesc: "Berfoto ria mengabadikan pemandangan indah sebagai penyegar energi sebelum kembali berkarya.",
      },
      {
        alt: "Employee Gathering 2023",
        caption: "Employee Gathering 2023",
        title: "Employee Gathering 2023 - Foto 9",
        src: "/images/gathering-2023/gathering-2023-9.jpg",
        cardTitle: "Satu Tekad Menyambut Masa Depan",
        cardDesc: "Foto penutup penuh kehangatan sebagai simbol persatuan keluarga besar CV Pelangi UV.",
      },
    ],
  },
  {
    category: "expo2023",
    title: "Surabaya Printing Expo (SPE) 2023",
    desc: "Partisipasi aktif CV Pelangi UV dalam pameran percetakan akbar SPE 2023 di Grand City Surabaya.",
    photos: [
      {
        alt: "Surabaya Printing Expo 2023 - Foto 1",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Stand Pelangi UV",
        src: "/images/expo-2023/expo-2023-1.jpg",
        cardTitle: "Stand Pameran CV Pelangi UV",
        cardDesc: "Surabaya Printing Expo 2023 Grand City",
      },
      {
        alt: "Surabaya Printing Expo 2023 - Foto 2",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Konsultasi Finishing",
        src: "/images/expo-2023/expo-2023-2.jpg",
        cardTitle: "Konsultasi Teknis Pengunjung",
        cardDesc: "Surabaya Printing Expo 2023",
      },
      {
        alt: "Surabaya Printing Expo 2023 - Foto 3",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Display Sampel Foil",
        src: "/images/expo-2023/expo-2023-3.jpg",
        cardTitle: "Showcase Swatch Foil & Spot UV",
        cardDesc: "Surabaya Printing Expo 2023",
      },
      {
        alt: "Surabaya Printing Expo 2023 - Foto 4",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Diskusi Mitra Industri",
        src: "/images/expo-2023/expo-2023-4.jpg",
        cardTitle: "Diskusi Mitra Cetak Jawa Timur",
        cardDesc: "Surabaya Printing Expo 2023",
      },
      {
        alt: "Surabaya Printing Expo 2023 - Foto 5",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Antusiasme Booth",
        src: "/images/expo-2023/expo-2023-5.jpg",
        cardTitle: "Kunjungan Pelaku Usaha Kemasan",
        cardDesc: "Surabaya Printing Expo 2023",
      },
      {
        alt: "Surabaya Printing Expo 2023 - Foto 6",
        caption: "Surabaya Printing Expo 2023",
        title: "Surabaya Printing Expo 2023 - Tim Representatif",
        src: "/images/expo-2023/expo-2023-6.jpg",
        cardTitle: "Tim Sales & Marketing Stand",
        cardDesc: "Surabaya Printing Expo 2023",
      },
    ],
  },
  {
    category: "momenpertama",
    title: "Momen Pertama Pelangi UV",
    desc: "Kilas balik rekam jejak awal perjalanan CV Pelangi UV dari inisiasi bengkel pertama hingga berkembang melayani ribuan mitra percetakan se-Indonesia.",
    photos: [
      {
        alt: "Momen Pertama 1",
        caption: "Momen Pertama 1",
        title: "Momen Pertama 1",
        src: "/images/momen-pertama/momen-1.jpg",
        cardTitle: "Kilas Balik Pendirian",
        cardDesc: "Awal dedikasi merintis layanan finishing percetakan dengan komitmen mutu tinggi.",
      },
      {
        alt: "Momen Pertama 2",
        caption: "Momen Pertama 2",
        title: "Momen Pertama 2",
        src: "/images/momen-pertama/momen-2.jpg",
        cardTitle: "Semangat Juang Tim Pertama",
        cardDesc: "Fondasi kebersamaan para perintis yang bekerja dengan dedikasi pantang menyerah.",
      },
      {
        alt: "Momen Pertama 3",
        caption: "Momen Pertama 3",
        title: "Momen Pertama 3",
        src: "/images/momen-pertama/momen-3.jpg",
        cardTitle: "Workshop & Fasilitas Awal",
        cardDesc: "Dokumentasi penataan lini kerja pertama percetakan dan finishing presisi.",
      },
      {
        alt: "Momen Pertama 4",
        caption: "Momen Pertama 4",
        title: "Momen Pertama 4",
        src: "/images/momen-pertama/momen-4.jpg",
        cardTitle: "Operasional Mesin Perdana",
        cardDesc: "Momen bersejarah uji coba mesin finishing perdana dengan standar kualitas ketat.",
      },
      {
        alt: "Momen Pertama 5",
        caption: "Momen Pertama 5",
        title: "Momen Pertama 5",
        src: "/images/momen-pertama/momen-5.jpg",
        cardTitle: "Komitmen Mutu & Presisi",
        cardDesc: "Konsistensi ketelitian register dan kerapian hasil cetak sejak lembar pertama.",
      },
      {
        alt: "Momen Pertama 6",
        caption: "Momen Pertama 6",
        title: "Momen Pertama 6",
        src: "/images/momen-pertama/momen-6.jpg",
        cardTitle: "Keakraban Keluarga Besar",
        cardDesc: "Sinergi hangat penuh kekeluargaan yang terus mengakar hingga 2 dekade kemudian.",
      },
      {
        alt: "Momen Pertama 7",
        caption: "Momen Pertama 7",
        title: "Momen Pertama 7",
        src: "/images/momen-pertama/momen-7.jpg",
        cardTitle: "Jejak Langkah Bersejarah",
        cardDesc: "Tonggak awal perjalanan yang mengantarkan CV Pelangi UV dipercaya lebih dari 1.500 mitra.",
      },
    ],
  },
];
