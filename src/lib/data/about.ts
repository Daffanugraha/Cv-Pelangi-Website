export interface AboutSlide {
  badge?: string;
  tabLabel?: string;
  title: string;
  desc: string;
  points?: string[];
  img?: string;
  youtubeId?: string;
  locationTitle?: string;
  locationSub?: string;
  tag?: string;
  ctaText: string;
  extra?: {
    author: string;
    sub: string;
  };
}

export interface PillarItem {
  title: string;
  desc: string;
  icon: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  desc: string;
}

export const aboutSlides: AboutSlide[] = [
  {
    badge: "",
    tabLabel: "Profil Perusahaan",
    title: "Ahlinya Jasa Finishing Cetak & Grosir Bahan Baku Berkualitas",
    desc: "Berdiri sejak 2004, CV Pelangi UV menghadirkan solusi finishing cetak presisi tinggi dan penyediaan bahan baku impor langsung. Kami memprioritaskan ketepatan waktu, efisiensi pengerjaan, dan standar mutu terbaik untuk mendukung kesuksesan setiap mitra percetakan.",
    youtubeId: "HAawkWRQK1M",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsVUIE6UdWFrPCNnSsuLQtBRP2KgbEsCOO_bkna9IveJIUt8Sp_Gb68Q3pu1ohnQNSEC26hors_8KEwfMbs5sTKFsq9wL2kNVRAYY0-qSPLP4dqa9IC5HFFtgC0XzXVgYDDi7yYEX21idpkmONAmV1U5xKd4aJvlUKsFSBAlVrGnn8fnyfPkSgVC14gizg-8h4yfJSMStp0WYpC8UhbzYTWFnFX_H2zrrLz_XjuiQZhgAejkgHNJBq",
    locationTitle: "Bizpark C17-C19",
    locationSub: "Tambaksawah, Waru, Sidoarjo",
    tag: "",
    ctaText: "Pesan Sekarang",
  },
  {
    badge: "",
    tabLabel: "Visi",
    title: "Visi Perusahaan",
    desc: "Menjadi partner kerja terdepan yang inovatif, produktif, dan konsisten memberikan nilai tambah tinggi bagi industri percetakan melalui hasil finishing bermutu prima.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKcR8ohxuz1Z2RE4uAgAcy6cspuvddjEjT-O7BK8E8nzfzFvc1YYUzfcr4DkOs0jSYVgfcgKdbzeCEY_xiq4gsMTEXHmG84pbcJQxAYQkb17VcZwYly29BBn73Qr1Op9v5CvICHM_d2lS42lgUyv-9QoBZvVz35es5iUui34-cex9MTBxpqb0PsrC_j7sp80TG9f0OzD91DXlRpjR6WVZug8tYpl2GWwpxHTVKK3Fgig_j_QPLu-Py",
    locationTitle: "Visi Pelangi UV",
    locationSub: "Inovatif & Berkualitas Tinggi",
    tag: "",
    ctaText: "Konsultasi Sekarang",
  },
  {
    badge: "",
    tabLabel: "Misi",
    title: "Misi Perusahaan",
    desc: "Komitmen utama kami dalam mewujudkan standar kualitas terbaik bersama para mitra:",
    points: [
      "Bekerja dengan mutu prima dan ketepatan waktu pengerjaan.",
      "Berinovasi secara berkelanjutan mengikuti perkembangan kebutuhan pasar.",
      "Membangun sinergi kemitraan yang saling menguntungkan.",
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMolZsN9yvmI-fKWoie6H_V2zLDxo7ivK0kNvONjo3RoDbmHXjSVJUiQEMeG4zYamZ7DTZeKLjwaAJ-r0vjUZFrxwnCdR1dtmKWapSiV1zoWRVfDZDwCGAldYZc-1uWSfbzIo5U19LzucaD9t0AUsU8UT9QmbIusfCgqMlWeJNzrvcqHmcYt-XzZfjGq_g6b1LU_x27Vz2aSzU49OG2h0fgpuh02KUxXVUdTGa0KsDkohyDOe8uF77",
    locationTitle: "Misi Pelangi UV",
    locationSub: "Kualitas, Inovasi & Kemitraan",
    tag: "",
    ctaText: "Bekerjasama Sekarang",
  },
];

export const pillarsData: PillarItem[] = [
  {
    title: "Layanan & Produk Berkualitas",
    desc: "Standar inspeksi berlapis memastikan setiap lembar kilap UV, foil, dan pond rapi tanpa cacat.",
    icon: "quality",
  },
  {
    title: "Harga Bersaing",
    desc: "Efisiensi 35 lini mesin modern memberikan penawaran harga terbaik untuk percetakan skala mikro hingga pabrikan.",
    icon: "pricing",
  },
  {
    title: "Gratis Pengiriman Se-Jawa Timur",
    desc: "Dukungan armada mandiri antar-jemput barang cetakan Anda tanpa beban ongkos kirim area Jawa Timur.",
    icon: "delivery",
  },
  {
    title: "Tenaga Kerja Profesional",
    desc: "Operator terampil berpengalaman puluhan tahun, sigap memproses detail teknis rumit dengan presisi tinggi.",
    icon: "workforce",
  },
];

export const whyChooseUsCards: WhyChooseUsCard[] = [
  {
    id: "01",
    title: "Kecepatan Hingga 4.000–5.000 Lembar / Jam",
    desc: "Lini mesin otomatis beroperasi dengan kecepatan 4.000 hingga 5.000 lembar per jam, mampu memproses format lembaran kertas plano ukuran 52×74 cm sampai 72×102 cm dengan register klise yang stabil.",
  },
  {
    id: "02",
    title: "35 Lini Mesin Beroperasi Paralel",
    desc: "Terbagi dalam unit terpisah Spot UV, Hot Stamping Foil, Laminasi Thermal, hingga Pond Die-Cut otomatis. Pekerjaan skala puluhan ribu lembar dapat diproses simultan tanpa antrean mesin.",
  },
  {
    id: "03",
    title: "Armada Pick-Up Bahan & Antar Hasil Jadi",
    desc: "Armada pengiriman rutin siap mengambil lembaran cetakan dari workshop percetakan Anda dan mengantarkan kembali hasil finishing yang sudah siap kemas ke berbagai kota se-Jawa Timur.",
  },
];
