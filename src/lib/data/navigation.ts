export interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; desc?: string; icon?: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang-kami" },
  { label: "Perjalanan", href: "#perjalanan" },
  {
    label: "Produk",
    href: "#produk",
    dropdown: [
      {
        label: "Layanan Jasa Finishing",
        href: "/layanan",
        desc: "Spot UV, Hot Stamping, Laminasi & Pond",
        icon: "layers",
      },
      {
        label: "Bahan Baku Finishing",
        href: "/produk/bahan-baku",
        desc: "Grosir roll foil, film BOPP, lem wet & tinta UV",
        icon: "inventory_2",
      },
    ],
  },
  { label: "Partner", href: "#partner" },
  { label: "Kontak", href: "/kontak" },
  {
    label: "Galeri",
    href: "/#galeri",
    dropdown: [
      {
        label: "Galeri Pengaplikasian Produk",
        href: "/galeri/pengaplikasian-produk",
        desc: "Hasil jadi finishing cetak, spot UV & foil",
        icon: "package_2",
      },
      {
        label: "Galeri Momen",
        href: "/galeri/momen",
        desc: "Dokumentasi kegiatan tim & fasilitas pabrik",
        icon: "photo_camera",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
];
