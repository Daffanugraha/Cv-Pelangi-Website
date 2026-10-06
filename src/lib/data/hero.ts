export interface HeroTestimonial {
  quote: string;
  author: string;
  role?: string;
  badge: string;
}

export const heroTestimonials: HeroTestimonial[] = [
  {
    quote:
      '"Pelayanan cepat dan responsive oleh admin. Harga cukup terjangkau tapi hasil tetap berkualitas. Recomended buat bisnis yang baru berjalan dan butuh jasa finishing 👍👍👍"',
    author: "Arif B. Ramadhan",
    badge: "Ulasan Google Bintang 5",
  },
  {
    quote:
      '"Hasil Hot Stamping Gold dan Spot UV di Pelangi UV selalu presisi tinggi dan tidak pernah mbrodol. Deadline packaging pesanan puluhan ribu eksemplar aman tepat waktu."',
    author: "Hendra Pratama",
    badge: "Mitra Sejak 2018 • Offset",
  },
  {
    quote:
      '"Kualitas laminating thermal doff velvetnya benar-benar juara. Permukaannya mulus bebas gelembung, pelanggan skincare kami sangat puas dengan finishing box-nya."',
    author: "Sylvia Wijaya",
    badge: "Mitra Sejak 2021 • Skincare Box",
  },
  {
    quote:
      '"Pengiriman cepat se-Jawa Timur sangat membantu saat lonjakan cetak pilkada dan kalender. Layanan antar jemput Bizpark benar-benar responsif dan terpercaya."',
    author: "Budi Santoso",
    badge: "Mitra Sejak 2016 • Commercial",
  },
];
