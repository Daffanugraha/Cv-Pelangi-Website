// src/lib/chatbotAdvisor.ts
// Modul Konsultasi Pintar & Responsif untuk CV Pelangi UV

export interface AdvisorResponse {
  html: string;
  chips: string[];
  suggestedAction?: {
    label: string;
    url: string;
    icon: string;
    type: "wa" | "link";
  };
}

export interface ScenarioPattern {
  id: string;
  keywords: string[];
  replyGenerator: (userInput: string) => AdvisorResponse;
}

// Format respons dengan gaya bahasa empati, ramah, dan solutif
const formatAdvice = (options: {
  greeting: string;
  explanation: string;
  tips: { title: string; desc: string }[];
  conclusion?: string;
  waTopic?: string;
  chips: string[];
}): AdvisorResponse => {
  const tipsHtml = options.tips
    .map(
      (tip) => `
      <div class="mt-2 p-2.5 rounded-xl bg-neutral-50/90 border border-neutral-200/70 text-left">
        <div class="flex items-start gap-2">
          <span class="text-neutral-400 font-bold text-xs mt-0.5">💡</span>
          <div>
            <strong class="text-neutral-900 text-xs font-semibold block">${tip.title}</strong>
            <p class="text-neutral-600 text-[11px] leading-relaxed mt-0.5">${tip.desc}</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  const waTopic = options.waTopic || "Konsultasi Layanan Finishing Pelangi UV";
  const waUrl = `https://wa.me/6282231019363?text=${encodeURIComponent(
    `Halo Admin Pelangi UV, saya ingin konsultasi teknis seputar: ${waTopic}`
  )}`;

  const html = `
    <div class="space-y-1.5 text-left">
      <div class="flex items-center gap-1.5 text-neutral-400 font-medium text-[10px] uppercase tracking-wider">
        <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
        <span>Konsultan CV Pelangi UV</span>
      </div>
      <p class="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">${options.greeting}</p>
      <p class="text-neutral-600 text-xs leading-relaxed">${options.explanation}</p>
      ${tipsHtml}
      ${
        options.conclusion
          ? `<p class="text-neutral-500 text-[11px] italic mt-1.5">${options.conclusion}</p>`
          : ""
      }
      <div class="pt-2 flex flex-wrap gap-2">
        <a href="${waUrl}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-medium transition-all shadow-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
          <span>Diskusi Teknis di WhatsApp</span>
          <span class="material-symbols-outlined text-[13px] text-neutral-400">arrow_forward</span>
        </a>
      </div>
    </div>
  `;

  return {
    html,
    chips: options.chips,
    suggestedAction: {
      label: "Chat WhatsApp Teknis",
      url: waUrl,
      icon: "chat",
      type: "wa",
    },
  };
};

export const consultationScenarios: ScenarioPattern[] = [
  // 1. Skincare, Kosmetik, Parfum, Beauty, Kemasan Mewah
  {
    id: "skincare-luxury",
    keywords: [
      "skincare",
      "skin care",
      "kosmetik",
      "cosmetic",
      "parfum",
      "perfume",
      "serum",
      "lipstik",
      "cream",
      "mewah",
      "luxury",
      "elegan",
      "estetik",
      "aesthetic",
      "glamour",
      "premium box",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, paham banget! Untuk produk skincare & kecantikan, kemasan adalah kunci trust pertama pelanggan! ✨",
        explanation:
          "Packaging skincare membutuhkan sentuhan yang lembut saat dipegang (tactile experience) dan aksen kilau berkilau agar terlihat eksklusif di etalase maupun video unboxing.",
        tips: [
          {
            title: "Kombinasi Rekomendasi Utama",
            desc: "Gunakan dasar <strong>Laminasi Doff Velvet (Soft Touch)</strong> + <strong>Hot Stamp Foil Rose Gold / Gold</strong> pada logo dan nama produk. Saat disentuh, permukaannya sehalus sutra dan tidak meninggalkan bekas sidik jari.",
          },
          {
            title: "Aksen Tekstur (Spot UV Emboss)",
            desc: "Tambahkan Spot UV timbul tipis di pattern atau tagline untuk memberikan efek 3D transparan yang modern.",
          },
          {
            title: "Tips Hemat Biaya",
            desc: "Gunakan kertas Art Carton 260-310gsm standar, lalu fokuskan foil hanya pada logo utama (ukuran spot kecil). Efek mewahnya tetap 100% terasa tanpa boros biaya!",
          },
        ],
        conclusion:
          "Mau kami kirimkan Swatch Sample Kit fisik kemasan skincare langsung ke workshop/alamat kakak?",
        waTopic: `Rekomendasi Finishing Kemasan Skincare (${input})`,
        chips: [
          "Minta Sampel Foil Rose Gold",
          "Tips Hemat Budget Kemasan",
          "Berapa Minimum Ordernya?",
          "Kirim Alamat untuk Sample Kit",
        ],
      }),
  },

  // 2. Masalah Box Pecah, Retak saat dilipat / Creasing Cracking
  {
    id: "box-pecah",
    keywords: [
      "pecah",
      "retak",
      "sobek",
      "patah",
      "rusak",
      "tekukan",
      "lipatan",
      "dilipat",
      "pond",
      "rel",
      "creasing",
      "cracking",
      "ngelupas",
      "kelupas",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, masalah karton pecah di garis lipatan itu memang sering bikin pusing ya! Tenang, ini penyebab dan solusi tepatnya: 🛠️",
        explanation:
          "Karton pecah atau retak saat ditekuk biasanya disebabkan oleh 3 faktor: arah serat kertas yang berlawanan dengan rel pond, penggunaan laminasi manual (water-based) yang rapuh, atau spon/pisau pond yang terlalu tajam.",
        tips: [
          {
            title: "Gunakan Laminasi Thermal BOPP Pelangi UV",
            desc: "Laminasi Thermal kami menggunakan lem panas EVA resin berkekuatan tinggi yang elastis. Lem ini meresap ke serat kertas sehingga lapisan laminasi tidak akan pernah pecah atau terangkat saat ditekuk 180°.",
          },
          {
            title: "Perhatikan Arah Serat (Grain Direction)",
            desc: "Pastikan garis tekukan sejajar dengan arah serat karton (grain parallel). Jangan melintang, karena kertas rentan robek bila seratnya tertekuk patah.",
          },
          {
            title: "Koreksi Pisau Pond & Matriks Creasing",
            desc: "Gunakan creasing matrix yang sesuai dengan gramasi kertas (misal untuk Art Carton 310gsm, pakai channel matriks yang lebih lega agar serat tidak tercekik).",
          },
        ],
        conclusion:
          "Tim teknisi kami siap uji coba pond sampel cetakan kakak di workshop Sidoarjo untuk memastikan 100% aman sebelum diproduksi massal.",
        waTopic: `Konsultasi Problem Solving Box Pecah/Retak (${input})`,
        chips: [
          "Solusi Laminasi Thermal BOPP",
          "Uji Coba Sampel Cetakan",
          "Konsultasi Setting Mesin Pond",
          "Jadwal Jemput Bahan ke Workshop",
        ],
      }),
  },

  // 3. Mau Kemasan Mewah tapi Budget Terbatas / Hemat
  {
    id: "budget-hemat",
    keywords: [
      "budget",
      "hemat",
      "murah",
      "terjangkau",
      "biaya minim",
      "modal kecil",
      "irit",
      "low budget",
      "ekonomis",
      "ramah kantong",
      "kemahalan",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, ini trik cerdas yang sering kami bagikan ke teman-teman UMKM & percetakan: Mewah tidak harus mahal! 💡💰",
        explanation:
          "Kunci kemasan terlihat mahal bukan pada banyaknya efek yang dipasang, melainkan pada 'kontras' visual yang tepat sasaran.",
        tips: [
          {
            title: "Trik 1: Dasar Doff + Spot UV Logo",
            desc: "Gunakan Art Carton standar + Laminasi Doff murah, lalu tambahkan Spot UV hanya pada logo/nama brand. Kontras kilau di atas permukaan doff gelap langsung memberikan kesan jutaan rupiah dengan biaya sangat terjangkau!",
          },
          {
            title: "Trik 2: Foil Ukuran Minimalis (Spot Stamping)",
            desc: "Jangan gunakan foil pada area lebar. Cukup foil emas/perak ukuran kecil (misal: 3x3 cm untuk inisial/logo). Biaya plat klise dan konsumsi foil jadi sangat hemat.",
          },
          {
            title: "Trik 3: Maksimalkan Tata Letak Plano",
            desc: "Susun layout desain di plano cetak secara efisien agar 1 lembar plano menghasilkan unit box lebih banyak, memangkas biaya finishing per pcs hingga 30-40%.",
          },
        ],
        conclusion:
          "Mau kami bantu hitungkan estimasi perbandingan biaya opsi-opsi finishing ini sesuai ukuran lembaran kakak?",
        waTopic: `Simulasi Biaya Finishing Hemat & Mewah (${input})`,
        chips: [
          "Hitung Estimasi Biaya",
          "Cek Pricelist Per Lembar Plano",
          "Minta Contoh Hasil Doff + Spot UV",
          "Tanya Minimal Order",
        ],
      }),
  },

  // 4. Makanan, Minuman, FnB, Bakery, Kopi, Frozen Food
  {
    id: "fnb-food",
    keywords: [
      "makanan",
      "minuman",
      "fnb",
      "kuliner",
      "bakery",
      "roti",
      "kopi",
      "coffee",
      "snack",
      "camilan",
      "frozen",
      "kulkas",
      "lemari es",
      "minyak",
      "greaseproof",
      "food grade",
      "tahan air",
      "box kue",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, kemasan makanan & FnB punya standar khusus! Selain estetik, faktor higienitas & ketahanan minyak/air adalah nomor satu! 🍔🍰",
        explanation:
          "Uap panas dari makanan, minyak mentega, atau suhu dingin freezer bisa merusak karton jika tidak dilapisi proteksi yang tepat.",
        tips: [
          {
            title: "Laminasi Thermal BOPP Glossy / Doff Food-Safe",
            desc: "Melindungi box dari rembesan minyak goreng/mentega dan cairan. Permukaannya aman untuk kemasan luar makanan dan tidak berbau bahan kimia menyengat.",
          },
          {
            title: "Khusus Frozen Food (Tahan Kelembapan)",
            desc: "Gunakan karton Ivory atau Duplex dengan laminasi bolak-balik (atau laminasi luar + barrier dalam) agar box tidak meleyot/lembek saat disimpan di freezer.",
          },
          {
            title: "Pond Window Mika (Jendela Transparan)",
            desc: "Buat jendela mika pada kemasan roti/kue agar produk di dalam terlihat menggiurkan, dipadukan dengan aksen Hot Stamp Foil pada bingkai jendela.",
          },
        ],
        conclusion:
          "Kami berpengalaman melayani finishing box bakery ternama & packaging kopi se-Jawa Timur.",
        waTopic: `Konsultasi Kemasan FnB & Food Grade (${input})`,
        chips: [
          "Rekomendasi Bahan Box Bakery",
          "Finishing Tahan Minyak & Air",
          "Minta Sampel Box FnB",
          "Jemput Plano Area Surabaya-Sidoarjo",
        ],
      }),
  },

  // 5. Undangan Pernikahan, Souvenir, Kartu Ucapan
  {
    id: "wedding-invitation",
    keywords: [
      "undangan",
      "wedding",
      "pernikahan",
      "nikah",
      "souvenir",
      "greeting card",
      "kartu ucapan",
      "amplop",
      "hardcover undangan",
      "undangan nikah",
      "rustic",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Wah selamat ya kak untuk rencana pernikahannya! Untuk undangan, sentuhan finishing adalah yang membuat momen sakral terasa istimewa 💍💌",
        explanation:
          "Undangan pernikahan yang berkesan selalu memadukan tekstur kertas eksklusif dengan aksen logam mulia yang presisi.",
        tips: [
          {
            title: "Hot Stamp Foil Emas / Rose Gold / Hologram",
            desc: "Sangat cantik diaplikasikan pada inisial nama mempelai, kaligrafi Bismillah, atau ornamen floral. Foil kami memiliki daya rekat tajam pada detail garis tipis.",
          },
          {
            title: "Emboss / Deboss 3D Timbul",
            desc: "Memberi efek cekung/cembung timbul tanpa tinta pada monogram nama pengantin. Terlihat sangat klasik dan berkelas saat diraba.",
          },
          {
            title: "Paduan Doff Velvet + Spot UV Pattern",
            desc: "Jika menggunakan amplop atau hardcover, lapisan doff halus dengan motif damask / bunga transparan di Spot UV akan membuat undangan terasa seperti karya seni.",
          },
        ],
        conclusion:
          "Mau lihat katalog pilihan warna foil khusus wedding (Gold, Rose Gold, Champagne, Copper, Silver)?",
        waTopic: `Finishing Undangan Pernikahan Mewah (${input})`,
        chips: [
          "Lihat Pilihan Warna Foil",
          "Perbedaan Emboss & Deboss",
          "Minta Contoh Fisik Undangan",
          "Chat WhatsApp Tim Pelangi UV",
        ],
      }),
  },

  // 6. Buku, Majalah, Company Profile, Katalog, Kalender
  {
    id: "buku-kalender",
    keywords: [
      "buku",
      "majalah",
      "katalog",
      "company profile",
      "annual report",
      "agenda",
      "kalender",
      "calendar",
      "novel",
      "cover",
      "jilid",
      "hard cover",
      "soft cover",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, untuk publikasi seperti buku, katalog, dan kalender, cover adalah jendela utama yang menentukan nilai jualnya! 📚📅",
        explanation:
          "Buku dan katalog sering disentuh dan dibolak-balik, sehingga butuh lapisan pelindung anti-baret yang sekaligus menonjolkan visual judul.",
        tips: [
          {
            title: "Standar Penerbit: Doff + Spot UV Timbul",
            desc: "Cover dilaminasi Doff Thermal untuk mencegah goresan dan sidik jari, lalu judul utama dan grafis kunci di-Spot UV timbul agar langsung mencolok.",
          },
          {
            title: "Edisi Khusus / Hardcover: Foil Stamping",
            desc: "Tambahkan Hot Stamp Foil emas/perak di punggung buku (spine) dan nama penulis untuk edisi hardcover kolektor.",
          },
          {
            title: "Finishing Kalender Meja & Dinding",
            desc: "Gunakan Varnish UV Water-based atau Thermal Glossy agar warna foto kalender tetap cerah tajam dan tidak pudar terkena sinar matahari sepanjang tahun.",
          },
        ],
        conclusion:
          "Pelangi UV memiliki lini mesin otomatis berkecepatan tinggi yang mampu menyelesaikan ribuan eksemplar cover buku per hari.",
        waTopic: `Finishing Buku & Kalender (${input})`,
        chips: [
          "Tips Finishing Cover Buku",
          "Kapasitas Mesin & Lead Time",
          "Pricelist Kalender & Katalog",
          "Hubungi Sales Pelangi UV",
        ],
      }),
  },

  // 7. Perbedaan Finishing: Doff vs Glossy, Spot UV vs Hotprint, Thermal vs Water-based
  {
    id: "perbedaan-finishing",
    keywords: [
      "bedanya",
      "perbedaan",
      "pilih mana",
      "bagusan mana",
      "bandingkan",
      "doff atau glossy",
      "doff vs glossy",
      "spot uv vs",
      "foil vs",
      "thermal vs",
      "apa beda",
      "penjelasan",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, banyak banget yang menanyakan perbandingan ini! Biar tidak bingung, ini rangkuman singkat dan mudahnya: 🧐🔍",
        explanation:
          "Setiap finishing punya karakter unik dan peruntukan produk yang berbeda:",
        tips: [
          {
            title: "Doff (Matte) vs Glossy (Mengkilap)",
            desc: "<strong>Doff:</strong> Teduh, kalem, tidak silau, berkesan mewah & premium (cocok untuk skincare, buku, undangan).<br><strong>Glossy:</strong> Berkilau terang, warna lebih kontras & pop-up, mudah dibersihkan (cocok untuk dus obat, brosur, box makanan).",
          },
          {
            title: "Spot UV vs Hot Stamp Foil",
            desc: "<strong>Spot UV:</strong> Efek vernis bening mengkilap dan timbul di bagian tertentu.<br><strong>Hot Stamp Foil:</strong> Efek lapisan logam berkilau (emas, perak, rose gold, hologram) menggunakan tekanan dan panas klise.",
          },
          {
            title: "Laminasi Thermal vs Lem Basah (Water-based)",
            desc: "<strong>Thermal Pelangi UV:</strong> Menggunakan plastik pre-coated lem kering yang dipanaskan. Hasil 100% rata, bebas gelembung, dan tidak pecah saat ditekuk.<br><strong>Water-based:</strong> Murah tapi rentan bergelombang jika kertas tipis.",
          },
        ],
        conclusion:
          "Masih ragu membayangkannya? Minta Sample Swatch Kit kami untuk melihat dan memegang perbedaannya langsung!",
        waTopic: `Tanya Perbedaan Jenis Finishing (${input})`,
        chips: [
          "Minta Swatch Sample Kit Gratis",
          "Rekomendasi Terbaik untuk Produk Saya",
          "Katalog Warna Foil 2026",
          "Konsultasi Teknis via WA",
        ],
      }),
  },

  // 8. Pemula, Baru Buka Usaha, Bingung Mau Mulai dari Mana
  {
    id: "pemula-curhat",
    keywords: [
      "aku gini",
      "aku mau",
      "aku baru",
      "pemula",
      "baru mulai",
      "baru buka",
      "bingung",
      "ragu",
      "curhat",
      "gimana ya",
      "nggak ngerti",
      "belum paham",
      "saran dong",
      "rekomendasi dong",
      "bantuin",
      "tolong",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, santai aja! Semangat ya untuk proyek & bisnis barunya! Wajar banget kok kalau di awal masih bingung memilih spek finishing yang tepat 😊🙌",
        explanation:
          "Di CV Pelangi UV, kami terbiasa mendampingi ribuan pelaku usaha dari nol hingga produknya sukses bersaing di rak supermarket & e-commerce. Ini 3 langkah mudahnya:",
        tips: [
          {
            title: "Langkah 1: Ceritakan Produk & Target Pasarmu",
            desc: "Produk apa yang kakak jual dan siapa pembelinya? (Misal: kopi anak muda, herbal kesehatan, atau skincare premium). Ini menentukan apakah karakter packagingnya harus cerah, doff elegan, atau natural kraft.",
          },
          {
            title: "Langkah 2: Pegang Contoh Fisik (Gratis dari Kami!)",
            desc: "Jangan menebak-nebak di layar monitor! Minta <strong>Sample Kit Swatch</strong> dari Pelangi UV. Kami kirimkan sampel foil, doff velvet, dan spot UV ke alamat kakak tanpa biaya.",
          },
          {
            title: "Langkah 3: Uji Coba Proofing Sebelum Cetak Banyak",
            desc: "Setelah desain cetak selesai di plano, kita bisa uji finishing beberapa lembar dulu sampai kakak 100% puas dengan hasilnya!",
          },
        ],
        conclusion:
          "Mau ngobrol santai lewat WhatsApp bareng konsultan spesifikasi cetak kami?",
        waTopic: `Konsultasi Pemula & Rekomendasi Produk (${input})`,
        chips: [
          "Minta Sample Kit Swatch Gratis",
          "Tanya Rekomendasi Sesuai Budget",
          "Contoh Kemasan yang Sudah Jadi",
          "Chat WhatsApp Konsultan",
        ],
      }),
  },

  // 9. Syarat Gratis Antar Jemput Jawa Timur
  {
    id: "antar-jemput",
    keywords: [
      "ongkir",
      "antar",
      "jemput",
      "kirim",
      "surabaya",
      "sidoarjo",
      "malang",
      "gresik",
      "pasuruan",
      "mojokerto",
      "jatim",
      "jawa timur",
      "armada",
      "truk",
      "ekspedisi",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, kabar gembira! CV Pelangi UV punya fasilitas ANTAR-JEMPUT CETAKAN PLANO GRATIS se-Jawa Timur! 🚚✨",
        explanation:
          "Kakak tidak perlu pusing memikirkan biaya transportasi atau repot membawa lembaran plano yang berat ke workshop.",
        tips: [
          {
            title: "Area Cakupan Antar-Jemput Gratis",
            desc: "Armada truk boks & pick-up kami beroperasi rutin setiap hari kerja mencakup: <strong>Surabaya, Sidoarjo, Gresik, Pasuruan, Mojokerto, hingga Malang</strong>.",
          },
          {
            title: "Keamanan Plano Terjamin",
            desc: "Armada tertutup terlindung dari hujan, debu, dan cuaca panas. Plano cetakan Anda ditata rapi di atas palet kayu agar tidak kusut atau terlipat di jalan.",
          },
          {
            title: "Jadwal Pengambilan Fleksibel",
            desc: "Cukup infokan ke tim admin saat cetakan plano di percetakan Anda selesai dicetak, armada kami akan langsung meluncur ke lokasi percetakan Anda.",
          },
        ],
        conclusion:
          "Ingin menjadwalkan pick-up bahan hari ini?",
        waTopic: `Request Jadwal Antar-Jemput Cetakan (${input})`,
        chips: [
          "Jadwalkan Penjemputan Bahan",
          "Alamat Workshop Sidoarjo",
          "Hubungi Driver / Logistik",
          "Cek Pricelist & Brosur",
        ],
      }),
  },

  // 10. Minta Swatch Sample Kit Gratis
  {
    id: "sample-swatch",
    keywords: [
      "sample",
      "sampel",
      "contoh",
      "swatch",
      "kit",
      "mockup",
      "katalog foil",
      "pegang",
      "lihat contoh",
      "minta sampel",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Bisa banget kak! Kami sediakan Swatch Sample Kit Resmi CV Pelangi UV secara GRATIS! 📦🎁",
        explanation:
          "Melihat foto di layar HP seringkali berbeda dengan aslinya. Dengan Sample Kit ini, kakak bisa meraba langsung tekstur kertas dan menguji pantulan kilaunya.",
        tips: [
          {
            title: "Isi dalam Box Sample Kit",
            desc: "✓ Lembaran Swatch Warna Foil (Gold, Silver, Rose Gold, Hologram, Bronze).<br>✓ Perbandingan Laminasi Doff Standar vs Doff Velvet Soft Touch.<br>✓ Contoh Spot UV Glossy Timbul pada berbagai jenis kertas.<br>✓ Panduan standar rel pisau pond & creasing.",
          },
          {
            title: "Cara Mendapatkannya Mudah Sekali",
            desc: "Cukup klik tombol WhatsApp di bawah, kirimkan Nama Percetakan/Brand dan Alamat Pengiriman Anda. Tim kami akan segera mengirimkannya ke workshop Anda!",
          },
        ],
        conclusion: "100% Gratis untuk rekan percetakan, desainer grafis, dan pemilik brand.",
        waTopic: `Permintaan Swatch Sample Kit Finishing Gratis (${input})`,
        chips: [
          "Kirim Alamat Pengiriman via WA",
          "Cek Pilihan Warna Foil",
          "Tanya Lokasi Workshop",
          "Layanan Antar-Jemput Gratis",
        ],
      }),
  },

  // 11. Pricelist & Estimasi Biaya
  {
    id: "pricelist",
    keywords: [
      "pricelist",
      "harga",
      "katalog",
      "biaya",
      "ongkos",
      "tarif",
      "berapa",
      "ongkos cetak",
      "download",
      "kalkulasi",
      "hitung",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Oh iya kak, untuk daftar harga & pricelist lengkap 2026 CV Pelangi UV sangat transparan dan kompetitif! 📋🏷️",
        explanation:
          "Tarif finishing dihitung berdasarkan ukuran lembaran plano cetak (misal: 65x100, 79x109, atau setengah plano) dan volume kuantiti pesanan.",
        tips: [
          {
            title: "Kapasitas 35+ Mesin Otomatis",
            desc: "Karena menggunakan mesin full-automatic berkecepatan tinggi, kami dapat memberikan harga grosir yang sangat efisien untuk volume menengah hingga jutaan lembar.",
          },
          {
            title: "Kalkulasi Presisi dalam 15 Menit",
            desc: "Kirimkan detail ukuran plano, jenis bahan (misal Art Carton 260gsm), dan kuantiti lembar ke tim admin via WhatsApp untuk mendapatkan kalkulasi harga resmi dan diskon volume.",
          },
        ],
        conclusion:
          "Ingin mengunduh Pricelist PDF atau mau langsung dibantu hitungkan estimasi spesifik?",
        waTopic: `Minta Daftar Harga / Pricelist Finishing (${input})`,
        chips: [
          "Hitung Estimasi Biaya Cetakan Saya",
          "Unduh Pricelist PDF",
          "Tanya Diskon Order Kuantiti Besar",
          "Chat WhatsApp Sales",
        ],
      }),
  },

  // 12. Kontak, Alamat, Jam Operasional, CS
  {
    id: "kontak-alamat",
    keywords: [
      "alamat",
      "lokasi",
      "dimana",
      "buka",
      "jam",
      "telepon",
      "kontak",
      "cs",
      "marketing",
      "whatsapp",
      "admin",
      "hubungi",
      "workshop",
      "pabrik",
      "maps",
      "peta",
      "google maps",
      "petunjuk arah",
      "rute",
      "arah",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Halo kak! Workshop & kantor CV Pelangi UV selalu terbuka untuk kunjungan dan konsultasi langsung 🏢🤝",
        explanation:
          "Berikut informasi resmi operasional kami:",
        tips: [
          {
            title: "Alamat Workshop & Pabrik Utama",
            desc: 'Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256 (Akses strategis dekat Bandara Juanda & Tol Rungkut).<br><a href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[#e62129] font-semibold text-xs mt-1 hover:underline">📍 Buka Rute di Google Maps</a>',
          },
          {
            title: "Jam Operasional",
            desc: "Senin – Jumat: 07.30 – 15.30 WIB<br>Sabtu: 07.30 – 13.00 WIB (Kapasitas mesin 35+ unit dengan sistem shift beroperasi untuk pesanan volume besar).",
          },
          {
            title: "Kontak Resmi",
            desc: "WhatsApp Marketing: <strong>0822 3101 9363</strong><br>Telepon Kantor: 031 866 7469 / 031 867 7468<br>Email: info@pelangiuv.com",
          },
        ],
        conclusion:
          "Silakan klik tombol WhatsApp untuk terhubung langsung dengan Customer Service kami!",
        waTopic: `Menghubungi Customer Service Pelangi UV (${input})`,
        chips: [
          "Chat WhatsApp Customer Service",
          "Petunjuk Arah Google Maps",
          "Minta Sample Fisik Gratis",
          "Cek Layanan Finishing",
        ],
      }),
  },

  // 13. Grosir Bahan Baku Cetak (Roll BOPP, Foil Hot Stamping, Lem Waterbase)
  {
    id: "bahan-baku",
    keywords: [
      "bahan baku",
      "bopp",
      "opp",
      "thermal film",
      "roll foil",
      "stamping foil",
      "lem",
      "lem waterbase",
      "lem opp",
      "lem laminasi",
      "slitting",
      "potong roll",
      "grosir bahan",
      "beli bahan",
      "stok bahan",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "CV Pelangi UV adalah distributor utama bahan baku finishing cetak terpercaya di Bizpark Sidoarjo! 📦🏭",
        explanation:
          "Kami menyediakan pasokan bahan baku industri berkualitas grade A+ ready stock di gudang Bizpark Sidoarjo dengan fasilitas Free Slitting (potong belah ukuran custom presisi rotari ±0.5 mm).",
        tips: [
          {
            title: "Film BOPP Thermal & Waterbase",
            desc: "Ketebalan 12–30 mic (Glossy, Doff Halus, Velvet Soft-Touch, PET Metalize). Corona dyne level ≥ 42 dynes/cm menjamin daya rekat kuat tanpa delaminasi.",
          },
          {
            title: "Roll Hot Stamping Foil",
            desc: "Pilihan warna Gold, Silver, Rose Gold, Hologram, hingga Pigment Foil. Tersedia ukuran standar 120 meter hingga roll jumbo 3.000 meter untuk mesin otomatis.",
          },
          {
            title: "Lem Wet & Dry Laminating Waterbase",
            desc: "Formula ramah lingkungan food-safe tanpa bau menyengat, cepat kering, dan tidak menggelembung saat ditekuk. Kemasan pail 20kg dan drum industri.",
          },
        ],
        conclusion:
          "Siap kirim ke workshop Anda dengan fasilitas Antar-Jemput Gratis se-Jawa Timur.",
        waTopic: `Tanya Stok & Harga Bahan Baku (${input})`,
        chips: [
          "Cek Stok Film BOPP Thermal",
          "Harga Roll Foil Hot Stamping",
          "Spesifikasi Lem Waterbase",
          "Free Slitting Ukuran Custom",
        ],
      }),
  },

  // 14. Kemasan Rokok & Box Industrial Eksklusif
  {
    id: "kemasan-rokok-industri",
    keywords: [
      "rokok",
      "cigarette",
      "kemasan rokok",
      "box rokok",
      "slop rokok",
      "hologram rokok",
      "cukai",
      "kemasan industri",
      "packaging farmasi",
      "obat",
    ],
    replyGenerator: (input) =>
      formatAdvice({
        greeting: "Untuk kemasan rokok & industri berstandar tinggi, presisi register mikron dan anti-pemalsuan adalah prioritas utama! 🚬🏭",
        explanation:
          "CV Pelangi UV berpengalaman menangani finishing kemasan rokok eksklusif dan box farmasi/industri dengan toleransi ketat, kapasitas puluhan ribu lembar per hari, dan standar bebas cacat.",
        tips: [
          {
            title: "Cast & Cure Hologram Anti-Counterfeit",
            desc: "Efek holografis optik mikro langsung pada lapisan UV varnish tanpa plastik mika konvensional. Ramah lingkungan sekaligus menjadi fitur keamanan produk dari pemalsuan.",
          },
          {
            title: "Hot Stamping Foil Presisi Tinggi",
            desc: "Aplikasi foil emas/hologram berkecepatan tinggi pada tipografi kecil dan logo rokok/brand tanpa rontok dan tanpa bleeding.",
          },
          {
            title: "Pond Die-Cut Otomatis & Creasing Rapi",
            desc: "Menggunakan pisau rel presisi agar tekukan box rokok bersudut tajam 90° sempurna, tidak sobek, dan lancar pada mesin packing otomatis (high-speed packing line).",
          },
        ],
        conclusion:
          "Workshop kami di Bizpark Sidoarjo siap uji coba proofing sampel kemasan industri Anda.",
        waTopic: `Finishing Kemasan Rokok & Industri (${input})`,
        chips: [
          "Konsultasi Kemasan Rokok",
          "Sampel Efek Cast & Cure",
          "Kapasitas Produksi Oplah Besar",
          "Chat Tim Marketing",
        ],
      }),
  },
];

// Fallback cerdas jika user mengetik pertanyaan yang sangat unik/spesifik
export const getSmartAdvisorReply = (userText: string): AdvisorResponse => {
  const cleanText = userText.trim().toLowerCase();

  // 1. Cek skenario yang cocok berdasarkan kata kunci
  for (const scenario of consultationScenarios) {
    const isMatched = scenario.keywords.some((kw) => {
      // Cocokkan bila userText mengandung kata kunci
      return cleanText.includes(kw.toLowerCase());
    });

    if (isMatched) {
      return scenario.replyGenerator(userText);
    }
  }

  // 2. Jika user menyapa singkat
  if (
    cleanText === "halo" ||
    cleanText === "hai" ||
    cleanText === "hi" ||
    cleanText === "pagi" ||
    cleanText === "siang" ||
    cleanText === "malam" ||
    cleanText === "tes" ||
    cleanText === "test" ||
    cleanText === "assalamualaikum"
  ) {
    return formatAdvice({
      greeting: "Halo kak! Senang sekali bisa menyapa kakak hari ini 👋😊",
      explanation:
        "Ada yang bisa kami bantu seputar kebutuhan kemasan, packaging produk, atau finishing cetak (Hot Stamp Foil, Spot UV, Laminating Doff/Glossy, Pond Rel)?",
      tips: [
        {
          title: "Bebas Konsultasi Masalah & Kebutuhan Cetak",
          desc: "Bisa cerita seputar kemasan skincare, FnB, kartu undangan, masalah karton pecah saat dilipat, atau tips hemat biaya finishing. Kami siap beri saran teknis terbaik!",
        },
      ],
      conclusion: "Pilih salah satu rekomendasi topik di bawah atau ketik langsung ceritamu ya kak!",
      waTopic: "Konsultasi Layanan Finishing Pelangi UV",
      chips: [
        "Kemasan Skincare Mewah",
        "Solusi Box Pecah Saat Dilipat",
        "Trik Finishing Hemat Budget",
        "Minta Sampel Kit Fisik Gratis",
      ],
    });
  }

  // 3. Fallback Solutif & Berempati Tinggi (menanggapi gaya curhat "aku gini gitu...")
  return formatAdvice({
    greeting: "Oh iya kak, paham banget apa yang kakak maksud! Menarik sekali diskusinya 😊✨",
    explanation:
      `Terkait kebutuhan: <em>"${userText}"</em>, tim teknis & konsultan spesifikasi finishing CV Pelangi UV siap membantu memberikan rekomendasi material dan teknik terbaik agar hasilnya presisi, rapi, dan sesuai budget.`,
    tips: [
      {
        title: "Saran Awal dari Kami",
        desc: "Setiap jenis cetakan (box, kemasan, buku, atau kartu) memiliki karakter kertas dan toleransi panas/tekanan yang berbeda. Kami sarankan mengirimkan foto/mockup atau ukuran plano ke tim teknis kami agar bisa dianalisis dengan tepat.",
      },
      {
        title: "Layanan Uji Coba & Sampel Gratis",
        desc: "Kakak juga bisa meminta Swatch Sample Kit fisik gratis untuk melihat langsung perbandingan hasil laminasi thermal, foil emas, dan spot UV sebelum memutuskan.",
      },
    ],
    conclusion:
      "Mau lanjut ngobrol detail via WhatsApp dengan technical engineer kami? Pesan kakak sudah otomatis disiapkan!",
    waTopic: `Pertanyaan Khusus: ${userText}`,
    chips: [
      "Minta Swatch Sample Kit Gratis",
      "Konsultasi Bahan & Finishing",
      "Cek Syarat Antar-Jemput Gratis",
      "Hitung Estimasi Biaya",
    ],
  });
};
