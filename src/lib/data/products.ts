export interface ProductItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
  capacity: string;
  href?: string;
}

export const productsJasa: ProductItem[] = [
  {
    num: "01",
    tag: "",
    title: "Hot Stamp Foil",
    desc: "Finishing cetak kilap metalik mewah dengan pilihan warna Gold, Silver, Rose Gold, Hologram, dan Pigment Foil tahan gores.",
    img: "/images/layanan/hot-stamp.jpg",
    capacity: "120k/hari",
    href: "/layanan",
  },
  {
    num: "02",
    tag: "",
    title: "Spot UV",
    desc: "Lapisan vernis mengkilap kontras pada area tertentu (logo/tipografi) untuk menciptakan efek visual dimensi yang elegan dan eksklusif.",
    img: "/images/layanan/spot-uv.jpg",
    capacity: "150k/hari",
    href: "/layanan",
  },
  {
    num: "03",
    tag: "",
    title: "Laminating Gloss & Doff",
    desc: "Pelapisan plastik tipis termal (Thermal) dan Wet berkualitas prima untuk perlindungan kelembaban, anti gores, serta daya tahan kemasan.",
    img: "/images/layanan/laminating.jpg",
    capacity: "200k/hari",
    href: "/layanan",
  },
  {
    num: "04",
    tag: "",
    title: "Cast and Cure",
    desc: "Efek holografis ramah lingkungan tanpa laminasi lapisan mika, memberikan kilauan pelangi autentik yang sulit dipalsukan.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEXJFAl9U2vieevJ01JauKl40I9hLNDc5i3TTZqyEvvIW41iwDDFjqEAcFJaEvVNMni-SiTko0A_srel6JQicrO-3yESDr_guNXnlm9LgV5KXMgjXUmF2pga6mbsnfeb2719sGmHtCu6vYShpDi3WxN4ztLgGpcGiM2IHvs1Z_ue4fTzQZIQNZ7RloVgRaa1TqSnd1p-mKi-2C8TPeIWcu5jONFobG7u_HtU-L8BsstZWjwfmZJdMh",
    capacity: "80k/hari",
    href: "/layanan",
  },
  {
    num: "05",
    tag: "",
    title: "Pond & Window Patch",
    desc: "Potong bentuk presisi tinggi (Die-Cut) dan penempelan jendela mika bening otomatis untuk kemasan kue, kosmetik, dan garmen.",
    img: "/images/layanan/laminating-window.jpg",
    capacity: "90k/hari",
    href: "/layanan",
  },
];

export const productsBahan: ProductItem[] = [
  {
    num: "01",
    tag: "",
    title: "BOPP / Thermal Film",
    desc: "Plastik film laminating termal doff, glossy, soft-touch velvet, dan waterbase impor dengan daya rekat superior dan tahan sobek.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Ux6pj5Ckh1wckXqpgyZ1YVqpt8dlkr2eBzdoFeqj4iYtacQpmmcIGeogtYXmWj-r2bVt_Lu2HUP90T9Hbt25Vn2pgbsRyzxJrEiLRCGDker_oAg1JelsQuKA1WMWYR8-MDuczbWHcP6lw2wPaIpxcms9VmRCWUMrY7DVncdcaMb7hlnMFUwS5WvzWMsgjtAfV_dutj8HEjsW2Of_pjErALLV-Ci0Kc7JZkVP--OM_dccwPNFf66",
    capacity: "Lebar: 200 - 1200 mm",
    href: "/produk/bahan-baku#product-card-opp",
  },
  {
    num: "02",
    tag: "",
    title: "Foil Hot Stamping",
    desc: "Master roll foil aneka warna: Gold, Silver, Rose Gold, Hologram, Matte, dan Pigment Foil berkualitas tinggi untuk hasil tajam bebas rontok.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
    capacity: "Panjang: 120m - 3000m",
    href: "/produk/bahan-baku#product-card-foil",
  },
  {
    num: "03",
    tag: "",
    title: "Lem Wet & Dry Laminating",
    desc: "Formula lem laminasi waterbase dan thermal superior tanpa bau kimia menyengat, bersertifikasi ramah pangan dan cepat kering.",
    img: "/images/bahan-baku/lem-wet-dry-laminating.png",
    capacity: "Kemasan: Pail 20kg & Drum",
    href: "/produk/bahan-baku#product-card-lem",
  },
  {
    num: "04",
    tag: "",
    title: "Tinta & Varnish Spot UV",
    desc: "Varnish UV curing ultra kilap, daya rekat tinggi pada berbagai jenis kertas plano dan karton dupleks, tidak mudah menguning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOi1hE4Dqgo49O2h9jOTn-AyANPdL6T0NuWM4e-m-0REUBnbYzggUtjhNoBXkBXGAyFKFJkvDb5j-ZxRGedSTrzluf0tRf6YCx6DgPAu2UMORgFkqIsTMT7YZIXdVY8abvIE-J6G5GIoV9rbWNrylbmUy1YqBfsuDji_0KcukxsGMLgvWGT7radoAtspu2yT1O6GSHqj9gtJxaaCG5b6XiPVZwH4NH0WRYXJtLu5Dwd2tCQnv8-bG",
    capacity: "Kemasan: Can 5kg & 20kg",
    href: "/produk/bahan-baku#product-card-spotuv",
  },
];
