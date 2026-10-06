export interface GalleryProduct {
  id: string;
  category: "kosmetik" | "makanan" | "buku" | "identity" | "paperbag";
  categoryLabel: string;
  title: string;
  desc: string;
  tag: string;
  badges: string[];
  finishing: string;
  material: string;
  notes: string;
  highlight: string;
  img: string;
}

export const DEFAULT_GALLERY_PRODUCTS: GalleryProduct[] = [
  {
    id: "prod-1",
    category: "kosmetik",
    categoryLabel: "Kemasan Kosmetik & Luxury",
    title: "Rigid Box Parfum Eksklusif",
    desc: "Thermal Doff Velvet halus bebas sidik jari berpadu Hot Stamping Rose Gold 12 Micron dan deboss tajam presisi.",
    tag: "Rose Gold Foil",
    badges: ["Velvet Soft Touch", "Hot Stamping 12μ", "Greyboard 1200gsm"],
    finishing: "Thermal Doff Velvet + Hot Stamping Rose Gold + Deboss",
    material: "Karton Greyboard 1200gsm + Art Paper 150gsm",
    notes: "Presisi register foil micro-align dengan daya lekat tahan gesek 100% tanpa flaking.",
    highlight: "Akurasi Register 0.1mm",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMLrJTlHhWWWl8TkrYzWHlml7k99aYf-juJUl5LAs_I1m614sMb50JjP7dgiGwK1zOyYfvepfsXKlKZBdKVHrUWGyovURyP2YJD64EaWWxDxPs3aPipltsAB_1p-I2OVCARpQcx94EVpqaMkhPVACSwFTub4k_JLrDt6ihiqvv6ylYZlOIA5EFJcvcKQtRJIDlfGIH2jKJhAku5ciAkpCdv9to98CwRt_uuiO7SAKIQxIvWevSVoW9",
  },
  {
    id: "prod-2",
    category: "kosmetik",
    categoryLabel: "Skincare Packaging",
    title: "Dus Serum 'Aurora Glow'",
    desc: "Tekstur taktil Spot UV Pasir berserat halus dipadukan tetesan kilau Spot UV Gloss cermin mewah.",
    tag: "Spot UV Pasir",
    badges: ["Spot UV Pasir", "Spot UV Gloss", "Ivory 350gsm"],
    finishing: "Kombinasi Spot UV Pasir Taktil & Spot UV Cermin Glossy",
    material: "Karton Ivory 350gsm Food-Grade Coating",
    notes: "Teknologi screen cylinder otomatis berkecepatan 3,500 lembar/jam dengan akurasi optical sensor.",
    highlight: "Optical Sensor Precision",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUgjn3xDX4WDvDKcZGjTzds0n0pctBOd6lj-RoXi6j18h6qNnt_cMKur-5p-6K7NNRf7YL49sikbxmb4FQ1dO3y1fSBxptgf9lidkuS-TvQpjhm6za5DIYw_T4YjyzfzdBqmAJpBrO_XGHl8w3JbdaCETaT0nGFloSAngDVFdQTlOKPeXUhEbDHIHTQAFeAWQAQTWc5vkoOQnL0Pf4G9igM5CUY-LUzW_dHAJfjOdzW9nRTs-P7vl",
  },
  {
    id: "prod-3",
    category: "buku",
    categoryLabel: "Buku & Hardcover Agenda",
    title: "Hardcover Agenda Korporat",
    desc: "Laminasi Doff Anti-Scratch anti-gores kuku dipertegas Hot Stamping Gold Brilliant dan Spot UV selektif.",
    tag: "Gold Foil Brilliant",
    badges: ["Anti-Scratch Doff", "Hot Stamp Gold", "Greyboard No.30"],
    finishing: "Hot Stamping Foil Gold Brilliant + Laminasi Doff Anti Gores",
    material: "Greyboard No. 30 (2.5mm) + Art Paper 150gsm Cover",
    notes: "Kekuatan daya rekat lem punggung PUR & foil panas hingga suhu 120°C tanpa kerut pada lipatan engsel buku.",
    highlight: "Tahan Lipat & Abrasi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUV4edDUXiRayyKMnaKnLW0HotEF4QY07s5iBeFS-wXhn6goKVHHwJq0CjI3ySyKZ2sKmUVRqvJmSxKKnDgZCNiwHQC9Zm7lUMW0--oQ1_eM3np1cBf5HzD5cjA2V7ZPTJmBVvD812Ph65byiMrOawZmC5XsTJDhuXQnuIuqymCgSdy4H3TpZ8HyyX4C-fmXoGkXnQSRVAxfnELt80FzbVWhMmFqk_-dswYLI6-6nJJDgPfUDVWXc",
  },
  {
    id: "prod-4",
    category: "makanan",
    categoryLabel: "Box Makanan & Minuman",
    title: "Packaging Dus Foodgrade 'Delice'",
    desc: "Mika bening BOPP 25 Micron bersertifikat food-safe tanpa gelembung lewat pond plong berkecepatan tinggi.",
    tag: "Window Food-Safe",
    badges: ["Window Lamination", "Waterbase Safe", "Foopak 310gsm"],
    finishing: "Window Lamination BOPP 25 Micron + Auto Die-Cutting",
    material: "Foopak Greaseproof Board 310gsm",
    notes: "Bahan bersertifikasi FDA aman bersentuhan langsung dengan makanan berminyak atau berlemak tinggi.",
    highlight: "FDA Certified Adhesive",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsu3nOaLEnilsSkuVXbBLHEQt4ewlmTFxTDv7ukJ9mt5Heq58yVtj2ZP3bVtbI1_iqlTyQ3aNRkasWbH62U8eboXmw8P6epZzmjNRxtP1O8Xp8tJ-kQzKeX_30gdbgp26lG7YCrG6eCltOCSrH9MlvSb7TjR2Cg5wnrzurWjVSzbo33o6oc2uYawnlIHvM4byteS5ROjiDxqH9bIjkyEteLNDqHwboIciNm47YyjblmwuXuFXOuAB-",
  },
  {
    id: "prod-5",
    category: "identity",
    categoryLabel: "Kartu Nama & Identity",
    title: "Business Card Cotton 360gsm",
    desc: "Sentuhan velvet 2 sisi tebal dengan sapuan edge gilding foil emas pada tepi kartu dan micro deboss tajam.",
    tag: "Edge Gilding Foil",
    badges: ["Edge Gilding", "Thermal Velvet", "Cotton 360gsm"],
    finishing: "Thermal Doff Velvet 2 Sisi + Edge Foil Gilding Emas",
    material: "Kertas Seni Cotton Extra White 360gsm",
    notes: "Proses pelapisan tepi kartu dengan mesin hot stamp rol hidrolik khusus untuk hasil cermin merata pada 4 sisi kartu.",
    highlight: "Hydraulic Hot-Edge",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuWCh0gVsNn5ZjdwTNVfC5tjHPwCNwCmhrIgf24XmiSREb1yO8FsQzHuCmA3BbMqvTetcSzK4_wkMniyfLJp5otWtWqkgisOowzLmkM4kwdeCcwIubuCIuzjq0GvzpXUiDF-8d8FKSQ4jt71e8xgJNxLmpd1lpCqoFdJVNLbDZXg3I_VfjX6cnhHeOT7e4XTjFu2EJmpJGNj9VuEZvmZXESIL3NsodT2qwJ59u8k8op02XmpuAXEP0",
  },
  {
    id: "prod-6",
    category: "paperbag",
    categoryLabel: "Shopping Bag & Merchandising",
    title: "Paper Bag Butik Doff & Spot UV",
    desc: "Daya lentur tinggi tanpa retak sudut lipatan berkat Thermal Doff 20μ dan aksen motif Spot UV mengkilap.",
    tag: "Doff + Spot UV",
    badges: ["Anti-Crack Crease", "Spot UV Monogram", "Art Carton 260gsm"],
    finishing: "Laminating Doff 20μ + Spot UV + Pond Creasing Anti-Pecah",
    material: "Art Carton 260gsm",
    notes: "Didesain khusus untuk menahan beban hingga 7kg dengan lekukan rel lipatan tajam tanpa pecah pigmen warna cetak.",
    highlight: "Kapasitas Beban 7kg",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXbtL37Qxnxv20fIemfwdE_haHFTrKB925zdKwtEIF3TPb0fXQfZOqt22JGajh9Dg774ark93kQxcyVwRmQxkkXYM6p8MTkclsxDHVPxZfVd4H-OXnjUyhX9hCNC4rdGTE75zeDHzEPLtxCJNoS-jVWcc5FscNjq8zy921ySFesyJpd8-8n7KjtxqtqZyl-yx07critNok5efbw7S-lVbLXRzAgOkIT6blV3HoZUHgYp1_4V2AryRF",
  },
];

export const FILTER_TABS = [
  { key: "all", label: "Semua Produk" },
  { key: "kosmetik", label: "Kemasan Kosmetik & Luxury" },
  { key: "makanan", label: "Box Makanan & Minuman" },
  { key: "buku", label: "Buku & Hardcover Agenda" },
  { key: "identity", label: "Kartu Nama & Identity" },
  { key: "paperbag", label: "Paper Bag" },
];

export const EDUCATIONAL_SLIDES = [
  {
    category: "Kosmetik & Skincare Luxury",
    headline: "Proteksi Sidik Jari & Kemewahan Sentuhan Pertama",
    desc: "Produk kecantikan dan wewangian premium bersaing langsung di meja rias dan display toko. Konsumen menilai kemewahan dari sentuhan fisik sebelum membuka isi kemasan.",
    recommendations: [
      {
        title: "Thermal Doff Velvet (Soft-Touch)",
        text: "Menghilangkan silau lampu toko dan 100% bebas bercak minyak sidik jari.",
      },
      {
        title: "Hot Stamping Foil (Rose Gold / 24K)",
        text: "Ketajaman garis tipografi hingga 0.2mm tanpa rontok pada sudut lipatan.",
      },
      {
        title: "Spot UV Pasir & Emboss Timbal Balik",
        text: "Menciptakan efek taktil berdimensi yang sulit dipalsukan kompetitor tiruan.",
      },
    ],
    technicalSpec: {
      standard: "Uji Gesek Sutherland (ASTM D5264) > 500 strokes",
      register: "± 0.1 mm Optical Micro-Registration",
      durability: "Tahan goresan kuku & paparan alkohol ringan",
    },
  },
  {
    category: "Makanan, Minuman & Farmasi",
    headline: "Standar Higienitas Food-Grade & Tahan Suhu Dingin",
    desc: "Kemasan pangan dan obat-obatan mewajibkan lapisan yang tidak berbau kimia tajam, anti-lemak minyak, dan lolos sertifikasi kontak pangan regulasi BPOM & FDA.",
    recommendations: [
      {
        title: "Window Patching Film BOPP Food-Safe",
        text: "Mika jendela jernih bebas kabut tanpa gelembung untuk visibilitas produk di dalam.",
      },
      {
        title: "Lem Waterbased & Hotmelt Non-Toxic",
        text: "Formula ramah pangan tanpa migrasi senyawa kimia ke produk makanan beku/hangat.",
      },
      {
        title: "Pond Plong Presisi (Auto Die-Cut)",
        text: "Kunci lidah dus rapat sempurna untuk menjaga kesegaran dan mencegah kontaminasi debu.",
      },
    ],
    technicalSpec: {
      standard: "FDA 21 CFR 175.300 & Bebas Senyawa Benzena",
      register: "± 0.2 mm Kecepatan 4.500 lembar/jam",
      durability: "Tahan suhu chiller -18°C hingga kelembaban 90% RH",
    },
  },
  {
    category: "Buku, Agenda & Annual Report",
    headline: "Ketahanan Engsel Lipat & Kekuatan Punggung Jilid",
    desc: "Hardcover buku tahunan dan agenda eksekutif sering dibuka-tutup ratusan kali. Finishing harus lentur pada lipatan engsel tanpa timbul retakan putih.",
    recommendations: [
      {
        title: "Laminasi Doff Anti-Scratch",
        text: "Permukaan doff khusus yang tahan gesekan kuku, meja kerja, dan tumpukan buku.",
      },
      {
        title: "Foil Panas Suhu Terkalibrasi 120°C",
        text: "Penempelan foil emas/perak yang menembus serat kain linen atau art paper tebal.",
      },
      {
        title: "Daya Rekat Lem Punggung PUR Prima",
        text: "Mencegah lembaran cover terlepas dari karton greyboard tebal No. 30 (2.5mm).",
      },
    ],
    technicalSpec: {
      standard: "Uji Tekuk Lipatan ISO 5626 > 1.000 kali bolak-balik",
      register: "Presisi garis punggung buku 0.15 mm",
      durability: "Garansi tidak pecah retak pada engsel hingga 5 tahun",
    },
  },
  {
    category: "Kartu Nama & Brand Identity",
    headline: "Wibawa Profesional Lewat Detail Sapuan Tepi Kartu",
    desc: "Kartu nama premium adalah perwakilan reputasi direksi dan pemilik bisnis saat diserahkan langsung. Detail tepian kartu berbicara tentang standar kualitas tertinggi.",
    recommendations: [
      {
        title: "Edge Foil Gilding Hidrolik 4 Sisi",
        text: "Sapuan foil cermin berkilau pada tepi tumpukan kertas tebal 360gsm–600gsm.",
      },
      {
        title: "Deboss Micro-Depth Presisi",
        text: "Cekungan logo tegas ke dalam serat kertas cotton tanpa merusak bagian belakang.",
      },
      {
        title: "Double-Side Velvet Lamination",
        text: "Dua sisi sentuhan beludru mewah yang kokoh dan tidak melengkung di dompet.",
      },
    ],
    technicalSpec: {
      standard: "Hydraulic Pressure 15 Ton Thermal Block",
      register: "Akurasi tepi potong ± 0.05 mm",
      durability: "Foil tepi tahan gesekan dompet tanpa rontok",
    },
  },
  {
    category: "Shopping Bag & Paper Bag Retail",
    headline: "Daya Lentur Garis Pond & Kapasitas Beban Maksimal",
    desc: "Paper bag butik eksklusif harus mampu menahan beban belanjaan tanpa robek di sudut lipatan bawah atau pada lubang tali gantungan.",
    recommendations: [
      {
        title: "Rel Creasing Pond Anti-Pecah",
        text: "Tekanan pisau pond terkalibrasi agar pigmen warna tinta cetak tidak pecah di lekukan.",
      },
      {
        title: "Laminasi Thermal Doff 20 Micron",
        text: "Lapisan pelindung elastis yang memperkuat daya tahan serat kertas art carton 260g.",
      },
      {
        title: "Aksen Spot UV Pattern Monogram",
        text: "Kilau pola logo brand yang berkilau elegan saat tas bergerak di bawah pencahayaan mall.",
      },
    ],
    technicalSpec: {
      standard: "Uji Kekuatan Beban Tarik Dinamis hingga 8.5 kg",
      register: "Akurasi rel pond lipatan 0.1 mm",
      durability: "Tahan rintik air hujan & kelembaban tinggi",
    },
  },
];
