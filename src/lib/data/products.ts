export interface ProductItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
  capacity: string;
  href?: string;
  serviceKey?: string;
  priceStarting?: string;
}

export interface ServicePricelistItem {
  no: number;
  variant: string;
  unit: string;
  note: string;
}

export interface ServiceDetailPricelist {
  key: string;
  name: string;
  icon: string;
  desc: string;
  capacity: string;
  speed: string;
  startingPrice: string;
  waText: string;
  pricelist: ServicePricelistItem[];
}

export const servicesPricelistData: Record<string, ServiceDetailPricelist> = {
  laminating: {
    key: "laminating",
    name: "Laminating (Doff & Gloss)",
    icon: "filter_frames",
    desc: "Pelapisan plastik film BOPP dan PET menggunakan metode thermal, dry, atau wet laminating. Melindungi cetakan dari gesekan, basah, minyak, dan meningkatkan rigiditas serta kekayaan warna lembaran kemasan.",
    capacity: "5 Mesin Otomatis & 2 Semi-Otomatis",
    speed: "Kapasitas 114.000 cetakan/hari",
    startingPrice: "Mulai Rp 0,163 / cm²",
    waText: "Halo CV Pelangi UV, saya membutuhkan jasa Laminating (Doff / Gloss / Hologram). Mohon kalkulasi estimasi biayanya.",
    pricelist: [
      { no: 1, variant: "Laminating Doff Halus", unit: "Rp 0,24 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 2, variant: "Laminating Gloss Bening", unit: "Rp 0,163 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 3, variant: "Laminating Hologram Optik", unit: "Rp 0,31 / cm²", note: "Minimal Order Rp 300.000" },
    ],
  },
  hotstamp: {
    key: "hotstamp",
    name: "Hot Print (Hot Stamping Foil)",
    icon: "auto_awesome",
    desc: "Pelapisan foil dekoratif mewah pada permukaan kertas cetakan menggunakan pemanas klise bertekanan tinggi. Menghasilkan aksen kilau berkilau tinggi, tidak mudah pudar, dan presisi di setiap detail tepi desain packaging.",
    capacity: "5 Mesin Otomatis & 4 Manual",
    speed: "Kapasitas s/d 120.000 cetakan/hari",
    startingPrice: "Mulai Rp 1,08 / cm²",
    waText: "Halo CV Pelangi UV, saya ingin konsultasi harga dan jadwal produksi untuk Layanan Hot Print / Hot Stamping Foil.",
    pricelist: [
      { no: 1, variant: "Hot Stamp Silver", unit: "Rp 1,08 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 2, variant: "Hot Stamp Gold", unit: "Rp 1,08 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 3, variant: "Hot Stamp Warna-Warni", unit: "Rp 1,7 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 4, variant: "Hot Stamp Hologram Prismatik", unit: "Rp 2 / cm²", note: "Minimal Order Rp 300.000" },
    ],
  },
  pond: {
    key: "pond",
    name: "Pond / Die Cutting",
    icon: "content_cut",
    desc: "Proses plong pemotongan bentuk kurva, garis rel tekukan (creasing), dan perforasi pada kertas maupun karton tebal kemasan agar presisi saat dirakit menjadi box jadi tanpa risiko retak.",
    capacity: "1 Mesin Otomatis & 1 Manual Presisi",
    speed: "Kapasitas 34.000 lembar/hari",
    startingPrice: "Rp 80 / lembar",
    waText: "Halo CV Pelangi UV, saya ingin order jasa Pond (Die-Cut) untuk pemotongan lembar cetakan / box karton.",
    pricelist: [
      { no: 1, variant: "Plong Otomatis (High Speed Die-Cut)", unit: "Rp 80 / lembar", note: "Minimal Order Rp 500.000" },
      { no: 2, variant: "Plong Manual Presisi", unit: "Rp 80 / lembar", note: "Minimal Order Rp 200.000" },
    ],
  },
  spotuv: {
    key: "spotuv",
    name: "Spot UV (Gloss & Pasir)",
    icon: "brush",
    desc: "Proses pelapisan selective coating dengan curing UV solvent-based roller coating berpresisi tinggi. Menghasilkan kontras kilau optik cermin, matte lembut, ataupun efek butiran tekstur pasir taktil yang elegan.",
    capacity: "5 Mesin Otomatis & 3 Manual",
    speed: "Kapasitas 174.000 cetakan/hari",
    startingPrice: "Mulai Rp 0,22 / cm²",
    waText: "Halo CV Pelangi UV, saya ingin memesan jasa Spot UV (Gloss / Matte / Pasir) untuk lembar cetakan saya.",
    pricelist: [
      { no: 1, variant: "Spot UV Gloss", unit: "Rp 0,22 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 2, variant: "Spot UV Matte", unit: "Rp 0,25 / cm²", note: "Minimal Order Rp 300.000" },
      { no: 3, variant: "Spot UV Pasir / Sand Texture", unit: "Rp 0,25 / cm²", note: "Minimal Order Rp 300.000" },
    ],
  },
  emboss: {
    key: "emboss",
    name: "Emboss & Deboss",
    icon: "view_in_ar",
    desc: "Pencetakan efek timbul 3D fisik (Emboss) maupun tenggelam (Deboss) pada lembar cetak menggunakan klise plat presisi jantan-betina untuk menghasilkan sensasi tekstur taktil yang kokoh dan berkarakter.",
    capacity: "2 Mesin Otomatis & 1 Mesin Manual",
    speed: "Kapasitas 60.000 lembar/hari",
    startingPrice: "Mulai Rp 90 / lembar",
    waText: "Halo CV Pelangi UV, saya ingin konsultasi pengerjaan jasa Emboss & Deboss untuk cover buku / packaging.",
    pricelist: [
      { no: 1, variant: "Emboss Manual", unit: "Rp 90 / lembar", note: "Minimal Order Rp 200.000" },
      { no: 2, variant: "Emboss Otomatis", unit: "Rp 100 / lembar", note: "Minimal Order Rp 300.000" },
    ],
  },
};

export const productsJasa: ProductItem[] = [
  {
    num: "01",
    tag: "Terlaris",
    title: "Laminating (Doff & Gloss)",
    desc: "Pelapisan plastik film BOPP termal dan wet berkualitas prima untuk proteksi anti gores, kelembaban, dan sentuhan premium (velvet doff/glossy).",
    img: "/images/layanan/laminating.jpg",
    capacity: "114k/hari",
    serviceKey: "laminating",
    priceStarting: "Mulai Rp 0,163 / cm²",
  },
  {
    num: "02",
    tag: "Populer",
    title: "Hot Print (Hot Stamping Foil)",
    desc: "Finishing foil dekoratif mewah dengan suhu dan tekanan tinggi. Menghasilkan aksen kilau Gold, Silver, Hologram berpresisi tajam anti-kelupas.",
    img: "/images/layanan/hot-stamp.jpg",
    capacity: "120k/hari",
    serviceKey: "hotstamp",
    priceStarting: "Mulai Rp 1,08 / cm²",
  },
  {
    num: "03",
    tag: "Presisi Tinggi",
    title: "Pond / Die Cutting",
    desc: "Pemotongan pola kurva (plong), garis rel tekukan (creasing), dan perforasi pada karton kemasan dengan pisau presisi agar box lipat rapi tanpa retak.",
    img: "/images/layanan/laminating-window.jpg",
    capacity: "34k/hari",
    serviceKey: "pond",
    priceStarting: "Rp 80 / lembar",
  },
  {
    num: "04",
    tag: "Efek Mewah",
    title: "Spot UV (Gloss & Pasir)",
    desc: "Lapisan coating UV selektif berpresisi mikron. Memberikan efek kontras kilau cermin tinggi, matte lembut, atau tekstur pasir taktil mewah pada logo dan kemasan.",
    img: "/images/layanan/spot-uv.jpg",
    capacity: "174k/hari",
    serviceKey: "spotuv",
    priceStarting: "Mulai Rp 0,22 / cm²",
  },
  {
    num: "05",
    tag: "Tekstur Taktil",
    title: "Emboss & Deboss",
    desc: "Efek timbul 3D fisik (Emboss) atau tenggelam (Deboss) menggunakan master klise plat presisi jantan-betina untuk menghasilkan sensasi tekstur taktil yang kokoh.",
    img: "/images/layanan/micro-emboss.png",
    capacity: "60k/hari",
    serviceKey: "emboss",
    priceStarting: "Mulai Rp 90 / lembar",
  },
];

export const productsBahan: ProductItem[] = [
  {
    num: "01",
    tag: "",
    title: "BOPP / Thermal Film",
    desc: "Plastik film laminating termal doff, glossy, soft-touch velvet, dan waterbase impor dengan daya rekat superior dan tahan sobek.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Ux6pj5Ckh1wckXqpgyZ1YVqpt8dlkr2eBzdoFeqj4iYtacQpmmcIGeogtYXmWj-r2bVt_Lu2HUP90T9Hbt25Vn2pgbsRyzxJrEiLRCGDker_oAg1JelsQuKA1WMWYR8-MDuczbWHcP6lw2wPaIpxcms9VmRCWUMrY7DVncdcaMb7hlnMFUwS5WvzWMsgjtAfV_dutj8HEjsW2Of_pjErALLV-Ci0Kc7JZkVP--OM_dccwPNFf66",
    capacity: "Lebar: 200 - 1200 mm",
    href: "/produk/bahan-baku#product-card-opp",
  },
  {
    num: "02",
    tag: "",
    title: "Foil Hot Stamping",
    desc: "Master roll foil aneka warna: Gold, Silver, Rose Gold, Hologram, Matte, dan Pigment Foil berkualitas tinggi untuk hasil tajam bebas rontok.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
    capacity: "Panjang: 120m - 3000m",
    href: "/produk/bahan-baku#product-card-foil",
  },
  {
    num: "03",
    tag: "",
    title: "Lem Wet & Dry Laminating",
    desc: "Formula lem laminasi waterbase dan thermal superior tanpa bau kimia menyengat, bersertifikasi ramah pangan dan cepat kering.",
    img: "/images/bahan-baku/lem-wet-dry-laminating.png",
    capacity: "Kemasan: Pail 20kg & Drum",
    href: "/produk/bahan-baku#product-card-lem",
  },
  {
    num: "04",
    tag: "",
    title: "Tinta & Varnish Spot UV",
    desc: "Varnish UV curing ultra kilap, daya rekat tinggi pada berbagai jenis kertas plano dan karton dupleks, tidak mudah menguning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOi1hE4Dqgo49O2h9jOTn-AyANPdL6T0NuWM4e-m-0REUBnbYzggUtjhNoBXkBXGAyFKFJkvDb5j-ZxRGedSTrzluf0tRf6YCx6DgPAu2UMORgFkqIsTMT7YZIXdVY8abvIE-J6G5GIoV9rbWNrylbmUy1YqBfsuDji_0KcukxsGMLgvWGT7radoAtspu2yT1O6GSHqj9gtJxaaCG5b6XiPVZwH4NH0WRYXJtLu5Dwd2tCQnv8-bG",
    capacity: "Kemasan: Can 5kg & 20kg",
    href: "/produk/bahan-baku#product-card-spotuv",
  },
];
