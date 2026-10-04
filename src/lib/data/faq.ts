export interface FaqItem {
  num: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    num: "01",
    question: "Apakah ada minimal order (MOQ) untuk jasa finishing?",
    answer:
      "Kami melayani skala UMKM hingga partai besar industri kemasan. Tidak ada batasan ketat, kami siap memberikan penawaran harga terbaik sesuai volume lembaran cetak Anda.",
  },
  {
    num: "02",
    question: "Bagaimana layanan gratis antar-jemput se-Jawa Timur?",
    answer:
      "Armada truk tertutup kami siap jemput dan antar barang cetakan plano ke workshop Anda tanpa biaya tambahan untuk area Surabaya, Sidoarjo, Gresik, Malang, dan sekitarnya.",
  },
  {
    num: "03",
    question: "Berapa estimasi waktu pengerjaan dan apakah bisa minta sampel fisik?",
    answer:
      "Lead time berkisar 1–3 hari kerja dengan opsi pengerjaan kilat. Swatch sample kit fisik gratis juga tersedia dan siap dikirim ke workshop Anda.",
  },
];
