export interface ChatbotKnowledgeItem {
  keywords: string[];
  reply: string;
}

export const chatbotKnowledge: ChatbotKnowledgeItem[] = [
  {
    keywords: ["pricelist", "harga", "katalog", "biaya", "tarif", "download", "tarif finishing"],
    reply:
      '<p class="font-medium text-navbar-black mb-1">📋 Katalog &amp; Pricelist CV Pelangi UV</p><p class="text-text-body mb-2">Tersedia daftar spesifikasi dan tarif lengkap Hot Stamp Foil, Spot UV, BOPP Thermal, Cast &amp; Cure, hingga Pond Die-Cut.</p><a href="/produk/bahan-baku" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-bracket-border text-white text-xs font-semibold hover:bg-primary transition-all">Lihat Daftar Harga &amp; Bahan Baku <span class="material-symbols-outlined text-[14px]">arrow_forward</span></a>',
  },
  {
    keywords: [
      "ongkir",
      "antar",
      "jemput",
      "kirim",
      "surabaya",
      "sidoarjo",
      "malang",
      "gresik",
      "mojokerto",
      "pasuruan",
      "jatim",
      "logistik",
      "armada",
    ],
    reply:
      '<p class="font-medium text-navbar-black mb-1">🚚 Gratis Antar-Jemput Se-Jawa Timur!</p><p class="text-text-body mb-1.5">CV Pelangi UV menyediakan armada truk boks &amp; pick-up mandiri untuk antar-jemput lembaran plano cetakan secara GRATIS untuk area Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, hingga Malang.</p><p class="text-[11px] text-bracket-border font-medium">✓ Jadwal rute pengiriman rutin setiap hari kerja.</p>',
  },
  {
    keywords: ["sampel", "sample", "swatch", "kit", "contoh", "mockup", "swatch kit"],
    reply:
      '<p class="font-medium text-navbar-black mb-1">✨ Swatch Sample Kit Fisik Gratis</p><p class="text-text-body mb-2">Dapatkan katalog contoh fisik warna foil (Gold, Silver, Rose Gold, Hologram), laminasi doff velvet, dan efek spot UV langsung dikirim ke workshop percetakan Anda secara gratis.</p><a href="https://wa.me/6282231019363?text=Halo%20Admin%20CV%20Pelangi%20UV%2C%20saya%20ingin%20meminta%20Swatch%20Sample%20Kit%20Finishing%20Gratis" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-action-whatsapp text-white text-xs font-semibold hover:bg-action-whatsapp-hover transition-all">Kirim Alamat via WhatsApp <span class="material-symbols-outlined text-[14px]">chat</span></a>',
  },
  {
    keywords: [
      "marketing",
      "cs",
      "kontak",
      "telepon",
      "wa",
      "whatsapp",
      "admin",
      "hubungi",
      "alamat",
      "lokasi",
      "jam",
      "buka",
      "pabrik",
    ],
    reply:
      '<p class="font-medium text-navbar-black mb-1">💬 Workshop &amp; Kontak Resmi CV Pelangi UV</p><p class="text-text-body mb-1.5"><strong>Alamat Pabrik:</strong> Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah, Waru, Sidoarjo 61256.<br><strong>Jam Buka:</strong> Senin–Jumat 07.30–15.30 WIB, Sabtu 07.30–13.00 WIB.<br><strong>Telepon:</strong> 031 866 7469 / 031 867 7468<br><strong>WhatsApp:</strong> 0822 3101 9363</p><a href="https://wa.me/6282231019363?text=Halo%20Tim%20Marketing%20CV%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20spesifikasi%20cetak" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-action-whatsapp text-white text-xs font-semibold hover:bg-action-whatsapp-hover transition-all">Chat WhatsApp Sekarang <span class="material-symbols-outlined text-[14px]">send</span></a>',
  },
];
