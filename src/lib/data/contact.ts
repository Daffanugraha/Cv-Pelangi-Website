export interface MarketingMember {
  name: string;
  role: string;
  phoneDisplay: string;
  phoneRaw: string;
  prefillText: string;
  imgSrc: string;
  focus: string;
  scopeTag: string;
}

export const marketingTeam: MarketingMember[] = [
  {
    name: "Nurul Islamiyah",
    role: "Marketing",
    phoneDisplay: "0822-3101-9363",
    phoneRaw: "6282231019363",
    prefillText:
      "Halo Bu Nurul Islamiyah, saya ingin konsultasi mengenai kebutuhan finishing cetak di CV Pelangi UV.",
    imgSrc:
      "/images/team/nurul-islamiyah.webp",
    focus:
      "Finishing Cetak, Uji Coba Efek Spot UV & Foil, serta Rekomendasi Bahan Percetakan.",
    scopeTag: "Finishing Cetak & Sampel Swatch",
  },
  {
    name: "Fathia Rizky",
    role: "Marketing",
    phoneDisplay: "0852-1154-3430",
    phoneRaw: "6285211543430",
    prefillText:
      "Halo Mbak Fathia Rizky, saya ingin minta simulasi harga dan info jadwal finishing.",
    imgSrc:
      "/images/team/fathia-rizky.webp",
    focus:
      "Kalkulasi Penawaran Cepat, Penjadwalan Jemput Plano, dan Tracking Order Kemasan.",
    scopeTag: "Estimasi Penawaran & Jadwal Order",
  },
  {
    name: "Aris Waluyo",
    role: "Marketing",
    phoneDisplay: "0818-0372-7671",
    phoneRaw: "6281803727671",
    prefillText:
      "Halo Pak Aris Waluyo, saya ingin menanyakan ketersediaan bahan baku roll OPP dan lem finishing.",
    imgSrc:
      "/images/team/aris-waluyo.webp",
    focus:
      "Grosir Roll OPP, Lem Wet/Waterbased, Foil Stamping, dan Spesifikasi Teknis Mesin.",
    scopeTag: "Grosir Bahan Baku & Roll OPP",
  },
];

export interface ContactTestimonial {
  type: "image" | "whatsapp" | "technical";
  badge: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  partnershipBadge: string;
  // type === 'image'
  img?: string;
  overlayTitle?: string;
  overlayDesc?: string;
  // type === 'whatsapp'
  contactName?: string;
  contactStatus?: string;
  contactIcon?: string;
  chatMessages?: { from: "sales" | "client"; text: string; time: string }[];
  // type === 'technical'
  cardTag?: string;
  cardTitle?: string;
  cardDesc?: string;
  metrics?: { label: string; val: string; color: string }[];
}

export const contactTestimonials: ContactTestimonial[] = [
  {
    type: "image",
    img: "/images/layanan/hot-stamp.jpg",
    badge: "Kunjungan Tatap Muka",
    overlayTitle: "Kunjungan Langsung Showroom",
    overlayDesc:
      '"Review swatch sampel box rigid & hot stamping gold foil langsung bersama sales representative."',
    quote:
      '"Sangat terbantu oleh tim marketing Pelangi UV yang proaktif datang langsung membawa swatch sample, bantu kalkulasi foil dan spot UV sesuai budget cetakan kami. Komunikasi via WhatsApp sangat responsif dan armada jemputan cetak plano selalu tepat waktu tiba di pabrik kami."',
    initials: "HR",
    author: "Bpk. H. Rachmat",
    role: "Owner PT Grafika Mandiri — Surabaya",
    partnershipBadge: "Klien Kemitraan 5+ Tahun",
  },
  {
    type: "whatsapp",
    badge: "Obrolan WhatsApp Riil",
    contactName: "Sales CV Pelangi UV",
    contactStatus: "Online • Fast Response",
    contactIcon: "support_agent",
    chatMessages: [
      {
        from: "sales",
        text: "Pak Hendra, sampel Roll Foil Gold Brilliant & Lem OPP sudah kami kirim via armada ya. Siang ini tiba di workshop Malang 👍",
        time: "09:14",
      },
      {
        from: "client",
        text: "Mantap terima kasih mas! Kualitas foilnya nempel presisi banget di box parfum kita. Repeat order 20 roll lagi ya untuk minggu ini!",
        time: "09:28",
      },
      {
        from: "sales",
        text: "Siap Pak Hendra, PO kami proses langsung, armada kirim besok pagi!",
        time: "09:30",
      },
    ],
    quote:
      '"Pelayanan jemput cetak plano bebas ongkir ke Malang sangat menghemat biaya operasional kami. Tim marketing selalu cepat update pengiriman bahan baku roll OPP dan foil gold, stok selalu aman tidak pernah bikin mesin kami nganggur."',
    initials: "HW",
    author: "Bpk. Hendra Wijaya",
    role: "Owner Prima Offset — Malang",
    partnershipBadge: "Klien Kemitraan 4+ Tahun",
  },
  {
    type: "image",
    img: "/images/layanan/hot-stamp.jpg",
    badge: "Presisi & Bebas Gelembung",
    overlayTitle: "Kunjungan & Pendampingan Pelanggan",
    overlayDesc:
      '"Inspeksi ketajaman register foil emas dan lapisan doff anti-gores pada lembaran cetak massal."',
    quote:
      '"Kualitas laminating doff velvet dan hot stamping gold-nya konsisten tidak pernah meleset. Kalau ada deadline mendesak, tim PIC Pelangi UV selalu sigap membantu koordinasi jadwal lembur dan penjemputan bahan sehingga komitmen kami ke brand kosmetik selalu terjaga."',
    initials: "CD",
    author: "Ibu Cynthia Dewi",
    role: "Production Head CV Aneka Grafika — Sidoarjo",
    partnershipBadge: "Klien Kemitraan 3+ Tahun",
  },
  {
    type: "whatsapp",
    badge: "Koordinasi Armada Gratis",
    contactName: "Logistik & Armada Pelangi UV",
    contactStatus: "Dispatched • Kendaraan Standby",
    contactIcon: "local_shipping",
    chatMessages: [
      {
        from: "sales",
        text: "Selamat pagi Bu Dewi & Pak Fajar, armada box kami sudah standby di loading dock Bizpark untuk jemput 15.000 lembar plano cetakan hari ini. Jam 14.00 langsung masuk proses Spot UV.",
        time: "08:05",
      },
      {
        from: "client",
        text: "Wah cepat sekali responnya! Surat jalan dan palet plano sudah kami siapkan di pos barat ya mas. Terima kasih tim Pelangi UV!",
        time: "08:12",
      },
      {
        from: "sales",
        text: "Baik, driver kami langsung merapat ke pos barat. Estimasi tiba di pabrik Pelangi UV jam 10.30 WIB 🙏",
        time: "08:15",
      },
    ],
    quote:
      '"Katalog swatch fisik dikirim cepat ke pabrik kami, tim sales sangat menguasai detail teknis tiap jenis finishing box kosmetik & farmasi. Penjemputan plano dengan truk box tertutup membuat lembaran cetak aman dari cuaca dan debu."',
    initials: "FR",
    author: "Bpk. Fajar Ramadhan",
    role: "Procurement Manager PT Sinar Indah Pack",
    partnershipBadge: "Klien Kemitraan 2+ Tahun",
  },
  {
    type: "technical",
    badge: "Pendampingan Teknis",
    cardTag: "Problem Solved 100%",
    cardTitle: "Konsultasi Setting Mesin & Lem OPP",
    cardDesc:
      "Bimbingan teknis langsung dari formulasi lem waterbased, pengaturan temperatur roll silinder, hingga uji rekat gramatur 310g.",
    metrics: [
      { label: "Masalah Gelembung:", val: "Tuntas 0% Reject", color: "text-emerald-400" },
      { label: "Efisiensi Kecepatan:", val: "Naik +35% Oplah", color: "text-amber-400" },
      { label: "Dukungan Bahan:", val: "Ready Stock 24 Jam", color: "text-white" },
    ],
    quote:
      '"Konsultasi teknis lem wet laminating dan film OPP sangat solutif. Masalah lem menggelembung di mesin lama kami tuntas setelah dibimbing tim teknis Pelangi UV. Suplai bahan kimia dan lem drum selalu konsisten. Kemitraan terpercaya!"',
    initials: "IS",
    author: "Bpk. Irwan Santoso",
    role: "Owner CV Mahkota Grafika — Mojokerto",
    partnershipBadge: "Klien Kemitraan 3+ Tahun",
  },
];
