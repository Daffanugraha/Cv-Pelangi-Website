export interface ProductItem {
  num: string;
  tag?: string;
  icon?: string;
  title: string;
  badges?: string[];
  desc: string;
  img: string;
  capacity?: string;
  href: string;
  waText?: string;
}

export const productsJasa: ProductItem[] = [
  {
    num: "01",
    tag: "Terlaris",
    icon: "filter_frames",
    title: "Laminating",
    badges: ["Doff Halus", "Gloss Bening", "Hologram", "Thermal 20-30 µm"],
    desc: "Pelapisan plastik film BOPP dan PET menggunakan metode thermal, dry, atau wet laminating. Melindungi cetakan dari gesekan, air, dan memberikan sentuhan velvet mewah.",
    img: "/images/layanan/laminating.jpg",
    capacity: "Kapasitas 114.000 cetakan/hari",
    href: "/layanan?service=laminating",
    waText: "Halo Tim Marketing CV Pelangi UV, saya mau tanya tentang layanan finishing: *Laminating*. Mohon info estimasi harga dan jadwal pengerjaan.",
  },
  {
    num: "02",
    tag: "Populer",
    icon: "auto_awesome",
    title: "Hot Print (Hot Stamp)",
    badges: ["Silver & Gold", "Warna-Warni", "Hologram", "Pigment Foil"],
    desc: "Pelapisan foil mewah pada permukaan cetak menggunakan suhu panas presisi dan tekanan tinggi. Menghasilkan aksen kilau tajam, elegan, serta anti kelupas untuk packaging premium.",
    img: "/images/layanan/bhs-cosmo-gold-foil.png",
    capacity: "Kapasitas s/d 120.000 cetakan/hari",
    href: "/layanan?service=hotstamp",
    waText: "Halo Tim Marketing CV Pelangi UV, saya mau tanya tentang layanan finishing: *Hot Stamp*. Mohon info estimasi harga dan jadwal pengerjaan.",
  },
  {
    num: "03",
    tag: "Presisi Tinggi",
    icon: "content_cut",
    title: "Pond (Die-Cut)",
    badges: ["Plong Otomatis Speed", "Plong Manual Presisi", "Rel Creasing", "Perforasi"],
    desc: "Pemotongan dan rel kurva pola kemasan karton dengan toleransi akurat. Menggunakan pisau die-cut kualitas tinggi agar lipatan box lurus sempurna tanpa retak pada tekukan.",
    img: "/images/layanan/pelangi-special-blend-box.png",
    capacity: "Kapasitas 34.000 lembar/hari",
    href: "/layanan?service=pond",
    waText: "Halo Tim Marketing CV Pelangi UV, saya mau tanya tentang layanan finishing: *Pond (Die-Cut)*. Mohon info estimasi harga dan jadwal pengerjaan.",
  },
  {
    num: "04",
    tag: "Efek Mewah",
    icon: "brush",
    title: "Spot UV",
    badges: ["Spot Gloss", "Spot Matte", "Tekstur Pasir", "Curing Presisi"],
    desc: "Pelapisan formula tinta ultra-violet khusus secara selektif pada area desain spesifik. Menghasilkan kontras kedalaman luar biasa dengan efek kilap bening cermin atau tekstur pasir taktil.",
    img: "/images/layanan/kawan-bold-packaging.png",
    capacity: "Kapasitas 174.000 cetakan/hari",
    href: "/layanan?service=spotuv",
    waText: "Halo Tim Marketing CV Pelangi UV, saya mau tanya tentang layanan finishing: *Spot UV*. Mohon info estimasi harga dan jadwal pengerjaan.",
  },
  {
    num: "05",
    tag: "Tekstur Taktil",
    icon: "view_in_ar",
    title: "Emboss & Deboss",
    badges: ["Emboss 3D Timbul", "Deboss Tenggelam", "Klise Jantan-Betina", "Presisi Mikron"],
    desc: "Pencetakan efek timbul 3D fisik (Emboss) maupun tenggelam (Deboss) pada lembar cetak menggunakan klise plat presisi untuk sensasi tekstur taktil yang kokoh dan berkarakter.",
    img: "/images/layanan/pelangi-uv-hologram-box.png",
    capacity: "Kapasitas 60.000 lembar/hari",
    href: "/layanan?service=emboss",
    waText: "Halo Tim Marketing CV Pelangi UV, saya mau tanya tentang layanan finishing: *Emboss & Deboss*. Mohon info estimasi harga dan jadwal pengerjaan.",
  },
];

export const productsBahan: ProductItem[] = [
  {
    num: "01",
    tag: "Bahan Impor",
    icon: "layers",
    title: "BOPP / Thermal Film",
    badges: ["Thermal Gloss", "Thermal Doff", "Soft-Touch Velvet", "Waterbase"],
    desc: "Plastik film laminating termal doff, glossy, soft-touch velvet, dan waterbase impor dengan daya rekat superior dan tahan sobek.",
    img: "/images/bahan-baku/bopp-thermal-film.png",
    capacity: "Lebar: 200 - 1200 mm",
    href: "/produk/bahan-baku#product-card-opp",
    waText: "Halo Tim Sales CV Pelangi UV, saya tertarik memesan roll Film BOPP Thermal. Mohon info ketersediaan stok dan harga grosir.",
  },
  {
    num: "02",
    tag: "Grade Industri",
    icon: "stars",
    title: "Foil Hot Stamping",
    badges: ["Gold & Silver", "Rose Gold", "Hologram Prismatik", "Pigment Foil"],
    desc: "Master roll foil aneka warna: Gold, Silver, Rose Gold, Hologram, Matte, dan Pigment Foil berkualitas tinggi untuk hasil tajam bebas rontok.",
    img: "/images/bahan-baku/foil-hot-stamping.png",
    capacity: "Panjang: 120m - 3000m",
    href: "/produk/bahan-baku#product-card-foil",
    waText: "Halo Tim Sales CV Pelangi UV, saya ingin tanya ketersediaan stok dan harga grosir Roll Stamping Foil.",
  },
  {
    num: "03",
    tag: "Food Safe",
    icon: "water_drop",
    title: "Lem Wet & Dry Laminating",
    badges: ["Waterbase Eco", "Daya Rekat Kuat", "Bebas Bau Kimia", "Cepat Kering"],
    desc: "Formula lem laminasi waterbase dan thermal superior tanpa bau kimia menyengat, bersertifikasi ramah pangan dan cepat kering.",
    img: "/images/bahan-baku/lem-wet-dry-laminating.png",
    capacity: "Kemasan: Pail 20kg & Drum",
    href: "/produk/bahan-baku#product-card-lem",
    waText: "Halo Tim Sales CV Pelangi UV, saya ingin memesan Lem Wet / Dry Laminating kemasan Pail/Drum.",
  },
  {
    num: "04",
    tag: "High Gloss",
    icon: "brush",
    title: "Tinta & Varnish Spot UV",
    badges: ["Gloss Bening Cermin", "Matte Halus", "Tekstur Pasir", "Anti-Kuning"],
    desc: "Varnish UV curing ultra kilap, daya rekat tinggi pada berbagai jenis kertas plano dan karton dupleks, tidak mudah menguning.",
    img: "/images/bahan-baku/tinta-varnish-spot-uv.png",
    capacity: "Kemasan: Can 5kg & 20kg",
    href: "/produk/bahan-baku#product-card-spotuv",
    waText: "Halo Tim Sales CV Pelangi UV, saya ingin memesan Tinta / Varnish Spot UV untuk percetakan.",
  },
];
