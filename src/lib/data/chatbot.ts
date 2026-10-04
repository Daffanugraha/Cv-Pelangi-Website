export interface ChatbotKnowledgeItem {
  keywords: string[];
  reply: string;
}

export const chatbotKnowledge: ChatbotKnowledgeItem[] = [
  {
    keywords: ["pricelist", "harga", "katalog", "biaya", "tarif", "download"],
    reply:
      '<p class="font-medium text-navbar-black mb-1">📋 Katalog &amp; Pricelist 2026 Tersedia</p><p class="text-text-body mb-2">Kami menyediakan daftar tarif lengkap Hot Stamp Foil, Spot UV, BOPP Thermal, dan Cast &amp; Cure.</p><a href="#unduh-pricelist" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-bracket-border text-white text-xs font-semibold hover:bg-primary transition-all">Unduh Pricelist PDF <span class="material-symbols-outlined text-[14px]">download</span></a>',
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
      "jatim",
      "logistik",
    ],
    reply:
      '<p class="font-medium text-navbar-black mb-1">🚚 Gratis Pengiriman Se-Jawa Timur!</p><p class="text-text-body mb-1.5">CV Pelangi UV memiliki armada pick-up dan truk boks mandiri yang siap antar-jemput plano cetakan tanpa biaya kirim untuk area Surabaya, Sidoarjo, Gresik, Pasuruan, hingga Malang.</p><p class="text-[11px] text-bracket-border font-medium">✓ Jadwal rute teratur setiap hari kerja.</p>',
  },
  {
    keywords: ["sampel", "sample", "swatch", "kit", "contoh", "mockup"],
    reply:
      '<p class="font-medium text-navbar-black mb-1">✨ Swatch Sample Kit Gratis</p><p class="text-text-body mb-2">Anda bisa meminta katalog sampel fisik aneka warna foil emas/perak, doff velvet, dan vernis spot UV langsung ke workshop Anda.</p><a href="https://wa.me/6282231019363?text=Halo%20Admin%20Pelangi%20UV%2C%20saya%20ingin%20meminta%20Swatch%20Sample%20Kit%20Finishing%20Gratis" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-action-whatsapp text-white text-xs font-semibold hover:bg-action-whatsapp-hover transition-all">Kirim Alamat via WhatsApp <span class="material-symbols-outlined text-[14px]">chat</span></a>',
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
    ],
    reply:
      '<p class="font-medium text-navbar-black mb-1">💬 Terhubung Langsung dengan Marketing</p><p class="text-text-body mb-1.5">Kantor &amp; Workshop: Bizpark C17-C19 Tambaksawah, Waru, Sidoarjo.<br>Telepon: 031 866 7469<br>WhatsApp: 0822 3101 9363</p><a href="https://wa.me/6282231019363?text=Halo%20Tim%20Marketing%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20spesifikasi%20cetak" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-action-whatsapp text-white text-xs font-semibold hover:bg-action-whatsapp-hover transition-all">Chat WhatsApp Sekarang <span class="material-symbols-outlined text-[14px]">send</span></a>',
  },
];
