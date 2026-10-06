export interface MaterialPriceItem {
  id: string;
  name: string;
  spec?: string;
  unit: string;
  price: string;
  priceNumber: number;
  minOrder?: string;
  stockStatus?: "ready" | "limited" | "preorder";
}

export interface MaterialCategory {
  id: string;
  num: string;
  tag: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  specsHighlight: string[];
  startingPrice: string;
  img: string;
  popularVariants: string[];
  features: { icon: string; title: string; desc: string }[];
  items: MaterialPriceItem[];
}

export const materialQualityPillars = [
  {
    icon: "verified_user",
    title: "Grade A+ Formulasi Murni",
    desc: "Perlakuan corona (dyne level ≥ 42 dynes/cm) terstandarisasi. Daya rekat luar biasa kuat, mencegah delaminasi dan tidak membuat tinta mengelupas.",
  },
  {
    icon: "auto_awesome",
    title: "Kilau & Transparansi Optik Tinggi",
    desc: "Foil stamping dengan refleksi metalik cermin 100% serta film laminasi crystal clear berkejernihan tinggi tanpa efek kabut (haze) atau gelembung.",
  },
  {
    icon: "security",
    title: "Anti-Scratch & Tahan Lipatan",
    desc: "Lapisan pelindung elastis tahan goresan ekstrem, tahan lembap, anti-sidik jari, serta tidak retak/pecah saat proses pond, creasing, maupun lipat 90 derajat.",
  },
  {
    icon: "speed",
    title: "Stabilitas Mesin Berkecepatan Tinggi",
    desc: "Formula kimia lem dan film dirancang khusus agar tidak meleleh berlebih pada silinder panas, bebas residu lengket, dan tidak membuat mesin macet (zero jam).",
  },
];

export const b2bServicePerks = [
  {
    icon: "content_cut",
    title: "Free Slitting Custom Width",
    desc: "Bebas biaya potong belah roll jumbo dengan akurasi presisi pisau rotari ±0.5 mm sesuai kebutuhan lebar silinder mesin cetak Anda.",
  },
  {
    icon: "local_shipping",
    title: "Antar-Jemput Gratis Se-Jawa Timur",
    desc: "Armada pengiriman langsung melayani Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, dan Malang dengan jadwal rutin setiap hari kerja.",
  },
  {
    icon: "inventory_2",
    title: "Paket Swatch Sample Gratis",
    desc: "Kami kirimkan paket lembar contoh fisik (sample swatch) film BOPP, aneka warna foil, dan lem uji lab langsung ke workshop percetakan Anda.",
  },
  {
    icon: "warehouse",
    title: "Ready Stock Pergudangan Bizpark",
    desc: "Stok puluhan ribu roll dan drum selalu tersedia di Kompleks Pergudangan Bizpark Waru Sidoarjo untuk menjamin kepastian suplai produksi Anda.",
  },
];

export const rawMaterialCategories: MaterialCategory[] = [
  {
    id: "opp",
    num: "01",
    tag: "Film Lamination",
    title: "Oriented Poly Propylene (OPP)",
    shortDesc:
      "Lapisan pelindung anti-gores, waterproof, anti-minyak, dan pengunci pigmen warna cetakan agar tidak luntur serta mempertegas estetika kemasan fisik.",
    fullDesc:
      "Oriented Poly Propylene (OPP) adalah film laminasi berkualitas tinggi berdaya rekat superior dengan nilai perlakuan korona (corona dyne) 38–42+ dyne. Lapisan ini melindungi cetakan dari goresan, cairan, debu, dan kerutan saat proses pengeleman lipat karton maupun cetakan promosi masal.",
    specsHighlight: [
      "Ketebalan: 12 mic - 30 mic",
      "Corona Dyne: ≥ 42 dynes/cm",
      "Lebar Roll: 200 mm - 1200 mm (Free Slitting)",
      "Varian: Thermal & Waterbase",
    ],
    startingPrice: "Rp 41.100",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Ux6pj5Ckh1wckXqpgyZ1YVqpt8dlkr2eBzdoFeqj4iYtacQpmmcIGeogtYXmWj-r2bVt_Lu2HUP90T9Hbt25Vn2pgbsRyzxJrEiLRCGDker_oAg1JelsQuKA1WMWYR8-MDuczbWHcP6lw2wPaIpxcms9VmRCWUMrY7DVncdcaMb7hlnMFUwS5WvzWMsgjtAfV_dutj8HEjsW2Of_pjErALLV-Ci0Kc7JZkVP--OM_dccwPNFf66",
    popularVariants: [
      "Thermal Glossy & Doff 18 mic",
      "Glossy & Doff Waterbase 12-15 mic",
      "PET Metalize & BOPP Glossy 20 mic",
    ],
    features: [
      {
        icon: "touch_app",
        title: "Pilihan Velvet & Doff Mat",
        desc: "Sentuhan beludru lembut mewah tanpa sidik jari dan tanpa efek pantulan menyilaukan.",
      },
      {
        icon: "water_drop",
        title: "Perlindungan Maksimal",
        desc: "Kertas tahan percikan air, minyak, serta tidak menggelembung saat dilipat.",
      },
      {
        icon: "bolt",
        title: "Daya Rekat Cepat",
        desc: "Lapisan EVA melting point presisi melekat sempurna tanpa merusak register warna cetak.",
      },
    ],
    items: [
      { id: "opp-01", name: "Thermall Glossy 18 mic", unit: "Roll", price: "Rp 56.000", priceNumber: 56000, stockStatus: "ready" },
      { id: "opp-02", name: "Thermall Doff 18 mic", unit: "Roll", price: "Rp 57.000", priceNumber: 57000, stockStatus: "ready" },
      { id: "opp-03", name: "Thermal Glossy 3000m", unit: "Roll Jumbo", price: "Rp 56.000", priceNumber: 56000, stockStatus: "ready" },
      { id: "opp-04", name: "Thermal Glossy 4000m", unit: "Roll Jumbo", price: "Rp 52.000", priceNumber: 52000, stockStatus: "ready" },
      { id: "opp-05", name: "Thermal Doff 4000m", unit: "Roll Jumbo", price: "Rp 53.000", priceNumber: 53000, stockStatus: "ready" },
      { id: "opp-06", name: "Glossy Waterbase 12 mic", unit: "Roll", price: "Rp 46.500", priceNumber: 46500, stockStatus: "ready" },
      { id: "opp-07", name: "Doff Waterbase 15 mic", unit: "Roll", price: "Rp 49.000", priceNumber: 49000, stockStatus: "ready" },
      { id: "opp-08", name: "Glossy Waterbase 12 mic (Spek Khusus)", unit: "Roll", price: "Rp 49.500", priceNumber: 49500, stockStatus: "ready" },
      { id: "opp-09", name: "PET Metalize", unit: "Roll", price: "Rp 73.100", priceNumber: 73100, stockStatus: "ready" },
      { id: "opp-10", name: "BOPP Glossy 20 mic", unit: "Roll", price: "Rp 41.100", priceNumber: 41100, stockStatus: "ready" },
      { id: "opp-11", name: "Thermal Glossy 22, 24, 27 mic", unit: "Roll", price: "Rp 48.000", priceNumber: 48000, stockStatus: "ready" },
      { id: "opp-12", name: "OPP Glossy Waterbase 30 mic", unit: "Roll", price: "Rp 47.500", priceNumber: 47500, stockStatus: "ready" },
    ],
  },
  {
    id: "foil",
    num: "02",
    tag: "Bahan Baku Foil",
    title: "Foil",
    shortDesc:
      "Bahan baku finishing yang digunakan bersama teknik hot stamp maupun cold foil untuk memberikan sentuhan efek kilau eksklusif dan meningkatkan estetika cetakan.",
    fullDesc:
      "Foil adalah bahan baku yang digunakan bersamaan dengan teknik Hot stamp maupun cold foil dalam proses finishing untuk menciptakan efek visual yang menarik pada cetakan atau desain, memberikan sentuhan eksklusif, dan meningkatkan estetika produk.",
    specsHighlight: [
      "Standar Panjang: 120 Meter",
      "Teknik: Hot Stamp & Cold Foil",
      "Efek Visual Eksklusif",
      "Kualitas Finishing Presisi",
    ],
    startingPrice: "Rp 186.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
    popularVariants: [
      "Gold & Silver 120 Meter",
      "Warna - Warni 120 Meter",
      "Gold & SIlver Hologram",
      "Transparan 120 Meter",
      "Putih BO1 & White BO1",
    ],
    features: [
      {
        icon: "auto_awesome",
        title: "Sentuhan Eksklusif",
        desc: "Meningkatkan estetika dan nilai prestisius cetakan atau desain secara signifikan.",
      },
      {
        icon: "speed",
        title: "Hot Stamp & Cold Foil",
        desc: "Dapat diaplikasikan bersamaan dengan teknik hot stamping maupun inline cold foil.",
      },
      {
        icon: "verified",
        title: "Kilau & Presisi Tinggi",
        desc: "Memberikan aksen visual mewah, tajam, dan tidak mudah rontok atau mengelupas.",
      },
    ],
    items: [
      { id: "foil-01", name: "Gold", unit: "120 Meter", price: "Rp 186.000", priceNumber: 186000, stockStatus: "ready" },
      { id: "foil-02", name: "Silver", unit: "120 Meter", price: "Rp 186.000", priceNumber: 186000, stockStatus: "ready" },
      { id: "foil-03", name: "Warna - Warni", unit: "120 Meter", price: "Rp 227.000", priceNumber: 227000, stockStatus: "ready" },
      { id: "foil-04", name: "Gold & SIlver Hologram", unit: "120 Meter", price: "Rp 314.500", priceNumber: 314500, stockStatus: "ready" },
      { id: "foil-05", name: "Transparan", unit: "120 Meter", price: "Rp 360.500", priceNumber: 360500, stockStatus: "ready" },
      { id: "foil-06", name: "Putih BO1", unit: "-", price: "Rp 398.000", priceNumber: 398000, stockStatus: "ready" },
      { id: "foil-07", name: "White BO1", unit: "-", price: "Rp 815.500", priceNumber: 815500, stockStatus: "ready" },
    ],
  },
  {
    id: "foil-stamping",
    num: "03",
    tag: "Stamping Roll",
    title: "Hot & Cold Foil Stamping",
    shortDesc:
      "Memberikan sentuhan kilau logam mewah emas, perak, dan hologram ornamen untuk meningkatkan nilai prestisius kemasan retail.",
    fullDesc:
      "Hot & Cold Stamping Foil Pelangi UV dirancang khusus untuk kemasan prestisius dan etiket segel security. Memiliki rilis lepas sangat rapi tanpa serabut pada suhu mesin optimal 100°C–120°C serta daya kilau cermin tahan pudar terhadap gesekan dan oksidasi cuaca.",
    specsHighlight: [
      "Standar Panjang: 120 M, 240 M, 3000 M",
      "Suhu Transfer: 100°C - 120°C",
      "Kompatibilitas: Silinder, Platen, & Mesin Otomatis",
      "Pilihan: Emas, Perak, Laser Hologram, Custom",
    ],
    startingPrice: "Rp 186.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
    popularVariants: [
      "Gold & Silver 120M High Precision",
      "Gold & Silver Hologram Laser Security",
      "Transparan, White BO1 & Warna Custom",
    ],
    features: [
      {
        icon: "auto_awesome",
        title: "Kilap Reflektif Cermin",
        desc: "Pigmentasi logam murni memberikan efek emas cemerlang dan mewah pada cover.",
      },
      {
        icon: "center_focus_strong",
        title: "Lepas Rilis Presisi",
        desc: "Sangat tajam untuk tulisan mikro dan garis tipis tanpa serabut pinggir.",
      },
      {
        icon: "shield",
        title: "Tahan Gesekan Kemasan",
        desc: "Tidak mudah rontok atau mengelupas saat tumpuk karton dalam pengiriman.",
      },
    ],
    items: [
      { id: "foil-st-01", name: "Gold 120M High Precision", unit: "Roll (64cm x 120m)", price: "Rp 186.000", priceNumber: 186000, stockStatus: "ready" },
      { id: "foil-st-02", name: "Silver 120M High Precision", unit: "Roll (64cm x 120m)", price: "Rp 186.000", priceNumber: 186000, stockStatus: "ready" },
      { id: "foil-st-03", name: "Warna - Warni 120M (Red, Blue, Green, Copper)", unit: "Roll (64cm x 120m)", price: "Rp 227.000", priceNumber: 227000, stockStatus: "ready" },
      { id: "foil-st-04", name: "Gold & Silver Hologram Laser", unit: "Roll (64cm x 120m)", price: "Rp 314.500", priceNumber: 314500, stockStatus: "ready" },
      { id: "foil-st-05", name: "Transparan 120M (Security Ghost Stamp)", unit: "Roll (64cm x 120m)", price: "Rp 360.500", priceNumber: 360500, stockStatus: "ready" },
      { id: "foil-st-06", name: "Putih BO1 (Pigment White Stamp)", unit: "Roll", price: "Rp 398.000", priceNumber: 398000, stockStatus: "ready" },
      { id: "foil-st-07", name: "White BO1 (Extra Width Roll)", unit: "Roll Jumbo", price: "Rp 815.500", priceNumber: 815500, stockStatus: "ready" },
    ],
  },
  {
    id: "lem",
    num: "04",
    tag: "Adhesive Emulsion",
    title: "Lem Wet & Dry Laminating",
    shortDesc:
      "Formula perekat pasca-cetak berdaya rekat superior dan cepat kering, menembus kuat ke pori kertas & karton tebal untuk hasil rekat solid anti-lepas.",
    fullDesc:
      "Perekat dan lem emulsi sintetis industri berdaya rekat instan dengan penetrasi kuat pada pori-pori karton ivory, dupleks, dan art paper tebal. Menghasilkan ikatan rekat permanen yang tahan tekukan, anti-delaminasi, serta tidak bergelombang pada mesin laminasi berkecepatan tinggi.",
    specsHighlight: [
      "Basis: Synthetic Waterbase Emulsion (Low VOC)",
      "Kemasan: Pail 20 Kg & Drum 200 Kg",
      "Viskositas: Stabil pada kecepatan rol tinggi",
      "Aplikasi: Wet laminating, dry laminating, polygum",
    ],
    startingPrice: "Rp 15.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0HZt7qzpIhNn062ivZgfTkxuc6fNV2bVC-hpWUVGuLS8Dls-21shWao0YA_ZjT1AVcip6oiiEDcPclGaeG6KIXdbC0tXDwRuJpOV_CNwgg028b0efxNEmq_aOKRLaBdJebkMtbIUzu_hH0UBjNOBZswdcgh3oa8CQT-1tn4Wv1Gkpo7fa23Fs0pmUKgB0EFjJ7YbLbGIQ_4RAAb4DDP0ar_43-JbJiFG-z_JIaIM63fzRE67y3Sx",
    popularVariants: [
      "Lem Wet Laminating Waterbase Ekstra Kuat",
      "Lem Dry Laminating Komponen A & B",
      "Lem Polygum Kemasan & Karton Box",
    ],
    features: [
      {
        icon: "eco",
        title: "Rendah Bau (Low VOC)",
        desc: "Aman untuk lingkungan kerja dan cocok untuk kemasan makanan (food packaging).",
      },
      {
        icon: "speed",
        title: "Kering Cepat & Rekat Kuat",
        desc: "Penetrasi serat kertas solid, mencegah lipatan karton lepas saat finishing boks.",
      },
      {
        icon: "waves",
        title: "Bebas Gelombang (No Wrinkle)",
        desc: "Penyebaran emulsi rata pada silinder lem tanpa gumpalan atau gelembung udara.",
      },
    ],
    items: [
      { id: "lem-01", name: "Lem Wet Laminating", unit: "Pail / Kg", price: "Rp 45.000", priceNumber: 45000, stockStatus: "ready" },
      { id: "lem-02", name: "Lem Dry / Lem Laminating A", unit: "Pail / Kg", price: "Rp 40.000", priceNumber: 40000, stockStatus: "ready" },
      { id: "lem-03", name: "Lem Dry / Lem Laminating B", unit: "Pail / Kg", price: "Rp 45.000", priceNumber: 45000, stockStatus: "ready" },
      { id: "lem-04", name: "Lem Polygum", unit: "Pail / Kg", price: "Rp 37.000", priceNumber: 37000, stockStatus: "ready" },
      { id: "lem-05", name: "Creasing Matrix", unit: "Pcs / Strip", price: "Rp 15.000", priceNumber: 15000, stockStatus: "ready" },
      { id: "lem-06", name: "Hand Roll Stretch Film", unit: "Roll", price: "Rp 91.500", priceNumber: 91500, stockStatus: "ready" },
    ],
  },
  {
    id: "spotuv",
    num: "05",
    tag: "UV Varnish & Ink",
    title: "Tinta & Varnish Spot UV",
    shortDesc:
      "Varnish UV curing kilat berdaya rekat tinggi, menghasilkan efek kontras kilau basah 98 GU atau doff eksklusif tanpa merusak lembaran cetak.",
    fullDesc:
      "Formulasi cairan varnish photopolymer dan tinta spot UV dengan curing kilat lampu ultraviolet. Menghasilkan kontras kilap tinggi (gloss level 98 GU), hasil doff matte halus, atau efek pasir timbul pada packaging kosmetik, cover buku lux, serta etiket eksklusif tanpa merusak lembaran cetak.",
    specsHighlight: [
      "Gloss Level: Hingga 98 GU (Ultra Mirror Gloss)",
      "Curing: Lampu UV Ultra-Violet Kilat",
      "Karakter: Tidak kuning (anti-yellowing) & elastis",
      "Kemasan: Can 5 Kg & Drum 20 Kg",
    ],
    startingPrice: "Rp 35.200",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCssjTnAwOEGVKo7KwtxhOpEae4ilO4sQ3Y2F1eRaffAVhhIZ3tY3sGHSVOn02JmmeeDuItJej2ifnz1tieagVAfnGNoOddGwdrVO1qoWzQBtlUppvwN6VyLujidsmzNH1Kn2kyw_g5gGRQo_KqR7yRADmTplyZcL0j3jsS6ZwR0dG-zNUx7Ke7KlbPO9EtwYAi8iVpVhPI1wggEv9QsjR-9p4XraD6hD8R1lcPrP37Kv3HIN_v_JbX",
    popularVariants: [
      "Tinta Spot UV LumineX Gloss & Mix",
      "Bluish & Spot UV HG-25 Cepat Kering",
      "Tinta Spot UV Matte, WB Glossy & Tinta Tex 20",
    ],
    features: [
      {
        icon: "wb_sunny",
        title: "Curing Kilat Instant",
        desc: "Langsung kering sempurna di bawah lampu UV tanpa sisa lengket atau debu menempel.",
      },
      {
        icon: "contrast",
        title: "Tingkat Kontras Tinggi",
        desc: "Membuat logo atau tipografi kemasan tampak menonjol dengan pantulan kilap basah.",
      },
      {
        icon: "verified",
        title: "Anti-Yellowing Formula",
        desc: "Lapisan jernih bening tidak menguning meski terkena paparan cahaya lampu display toko.",
      },
    ],
    items: [
      { id: "uv-01", name: "Tinta Spot UV Standard", unit: "Kg / Can", price: "Rp 165.000", priceNumber: 165000, stockStatus: "ready" },
      { id: "uv-02", name: "Tinta Spot UV Mix", unit: "Kg / Can", price: "Rp 168.000", priceNumber: 168000, stockStatus: "ready" },
      { id: "uv-03", name: "Bluish High Gloss Varnish", unit: "Kg / Can", price: "Rp 173.000", priceNumber: 173000, stockStatus: "ready" },
      { id: "uv-04", name: "Tinta Spot UV HG - 25", unit: "Kg / Can", price: "Rp 246.500", priceNumber: 246500, stockStatus: "ready" },
      { id: "uv-05", name: "Tinta UV Full Varnish", unit: "Kg / Can", price: "Rp 95.000", priceNumber: 95000, stockStatus: "ready" },
      { id: "uv-06", name: "Tinta Spot UV Matte (Doff)", unit: "Kg / Can", price: "Rp 408.500", priceNumber: 408500, stockStatus: "ready" },
      { id: "uv-07", name: "WB Glossy (Waterbase Coat)", unit: "Kg / Can", price: "Rp 35.200", priceNumber: 35200, stockStatus: "ready" },
      { id: "uv-08", name: "Tinta Tex 20 Varnish", unit: "Kg / Can", price: "Rp 40.500", priceNumber: 40500, stockStatus: "ready" },
    ],
  },
];
