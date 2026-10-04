export interface JourneyImageItem {
  url: string;
  caption: string;
}

export interface JourneyStoryPhase {
  year: string;
  badge: string;
  title: string;
  desc: string;
  images: JourneyImageItem[];
}

export const journeyStoryPhases: JourneyStoryPhase[] = [
  {
    year: "2004",
    badge: "2004",
    title: "AWAL CERITA KAMI",
    desc: "Dedikasi dan komitmen tinggi oleh 3 karyawan dengan alat-alat yang serba manual dan didukung oleh 1 armada pengiriman.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB9JGTa5sVaZ5kwgO85oLLq14yHr0-w7gBaIfs_r6ugBXOyjF0-osQgnphKGlqmxQLPQ5W7AanHVF3xPRSn7Oi7k_p9RxSRIh5Mv9Q-qfgmmG_f8HtDda1-HB_Ohm7jfy97y8fAOCDdfUOPufQuYjDAS5HntUgH73BXiOLTN2N_Z0t3hdrMzUKkLiidySewiFJDmR6hDDXOnYSIzKIBwpf-eg_1ZlaYZtzOJTABBQnRqDc_YAASo4a",
        caption: "Proses pengerjaan spot manual dengan ketelitian tinggi oleh tim awal CV Pelangi UV (2004).",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvvnUF2i4t2HIrDG2FSIGYAuffIh4LkRo05qKb1w4Clzg9inrLRfXpD05McFlagDpAJvW4NP0fcNdS6Wvgk1A0_FEADoAiNHiXNYod5vccNwR5htlHdSvlhDtLwkbFiKSCKSCYkIult1S2x1jW2sPjJorIz_wSvfacKULBKAlAktjIHYjh0XpgGa1Wyb5_tpliTH2_V6x2FzjvaIO6DpxGcOwnggHgwX9h171nnlBpJ5NOJ2rz9ZYl",
        caption: "Penataan lembaran cetak dan persiapan bahan finishing di awal pendirian usaha.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOi1hE4Dqgo49O2h9jOTn-AyANPdL6T0NuWM4e-m-0REUBnbYzggUtjhNoBXkBXGAyFKFJkvDb5j-ZxRGedSTrzluf0tRf6YCx6DgPAu2UMORgFkqIsTMT7YZIXdVY8abvIE-J6G5GIoV9rbWNrylbmUy1YqBfsuDji_0KcukxsGMLgvWGT7radoAtspu2yT1O6GSHqj9gtJxaaCG5b6XiPVZwH4NH0WRYXJtLu5Dwd2tCQnv8-bG",
        caption: "Armada pengiriman perdana CV Pelangi UV yang melayani antar-jemput order cetakan pelanggan.",
      },
    ],
  },
  {
    year: "2006–2008",
    badge: "2006–2008",
    title: "MULAINYA PERJALANAN YANG LEBIH BESAR",
    desc: "Kami berpindah ke daerah Tambak Rejo Indah 18. Dengan diikuti kenaikan pesanan dari hanya 100++ menjadi ribuan per bulan.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvvnUF2i4t2HIrDG2FSIGYAuffIh4LkRo05qKb1w4Clzg9inrLRfXpD05McFlagDpAJvW4NP0fcNdS6Wvgk1A0_FEADoAiNHiXNYod5vccNwR5htlHdSvlhDtLwkbFiKSCKSCYkIult1S2x1jW2sPjJorIz_wSvfacKULBKAlAktjIHYjh0XpgGa1Wyb5_tpliTH2_V6x2FzjvaIO6DpxGcOwnggHgwX9h171nnlBpJ5NOJ2rz9ZYl",
        caption: "Aktivitas pengerjaan finishing pasca-cetak di lokasi baru Tambak Rejo Indah 18.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0HZt7qzpIhNn062ivZgfTkxuc6fNV2bVC-hpWUVGuLS8Dls-21shWao0YA_ZjT1AVcip6oiiEDcPclGaeG6KIXdbC0tXDwRuJpOV_CNwgg028b0efxNEmq_aOKRLaBdJebkMtbIUzu_hH0UBjNOBZswdcgh3oa8CQT-1tn4Wv1Gkpo7fa23Fs0pmUKgB0EFjJ7YbLbGIQ_4RAAb4DDP0ar_43-JbJiFG-z_JIaIM63fzRE67y3Sx",
        caption: "Peningkatan volume pesanan finishing cetak hingga mencapai ribuan lembar per bulan.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB9JGTa5sVaZ5kwgO85oLLq14yHr0-w7gBaIfs_r6ugBXOyjF0-osQgnphKGlqmxQLPQ5W7AanHVF3xPRSn7Oi7k_p9RxSRIh5Mv9Q-qfgmmG_f8HtDda1-HB_Ohm7jfy97y8fAOCDdfUOPufQuYjDAS5HntUgH73BXiOLTN2N_Z0t3hdrMzUKkLiidySewiFJDmR6hDDXOnYSIzKIBwpf-eg_1ZlaYZtzOJTABBQnRqDc_YAASo4a",
        caption: "Pemeriksaan kualitas plano cetak secara teliti sebelum dikemas dan dikirimkan.",
      },
    ],
  },
  {
    year: "2009–2010",
    badge: "2009–2010",
    title: "SEMAKIN BERKEMBANG PESAT",
    desc: "Penambahan tim menjadi 15 orang yang didalamnya terdapat 2 perempuan sebagai bagian administrasi. Didukung dengan adanya 3 mesin spot manual, dan 1 mesin laminating, juga armada pengiriman yang bertambah 2 dorkas.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBzWCv_1bQ0raAwWBvc0X1HItS1f4e3NIzXZGGCieGUalTdu4AUJemOeEBM0tbf_WgZ_tWJV0v1eJ35wZZadrRVrGEzWZCiI1xkJyxpNDAjYvI95_2YRX5aL6ZHpG655ykDg8UzL-w6Wdg6opTzjoMSD4Iv9l1dk8_02xoeZutmlTjzBOhMGWUFZeTJ2FIxsLheY86fECbMU13iqEdps4tDJpusUl4oxEueoCrNJz1kmDgFzPSsR5",
        caption: "Pengoperasian unit mesin laminating dan mesin spot UV manual tambahan.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCssjTnAwOEGVKo7KwtxhOpEae4ilO4sQ3Y2F1eRaffAVhhIZ3tY3sGHSVOn02JmmeeDuItJej2ifnz1tieagVAfnGNoOddGwdrVO1qoWzQBtlUppvwN6VyLujidsmzNH1Kn2kyw_g5gGRQo_KqR7yRADmTplyZcL0j3jsS6ZwR0dG-zNUx7Ke7KlbPO9EtwYAi8iVpVhPI1wggEv9QsjR-9p4XraD6hD8R1lcPrP37Kv3HIN_v_JbX",
        caption: "Pertumbuhan tim produksi dan tim administrasi menjadi 15 orang personil.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvvnUF2i4t2HIrDG2FSIGYAuffIh4LkRo05qKb1w4Clzg9inrLRfXpD05McFlagDpAJvW4NP0fcNdS6Wvgk1A0_FEADoAiNHiXNYod5vccNwR5htlHdSvlhDtLwkbFiKSCKSCYkIult1S2x1jW2sPjJorIz_wSvfacKULBKAlAktjIHYjh0XpgGa1Wyb5_tpliTH2_V6x2FzjvaIO6DpxGcOwnggHgwX9h171nnlBpJ5NOJ2rz9ZYl",
        caption: "Penambahan 2 armada dorkas (kendaraan roda tiga) untuk mobilitas operasional.",
      },
    ],
  },
  {
    year: "2011–2015",
    badge: "2011–2015",
    title: "MESIN MULAI SEMI-OTOMATIS",
    desc: "Pesanan perhari naik hingga ribuan. Transaksi terus bertambah pesat. Dengan penambahan mesin semi-otomatis dan armada pengiriman yang terus ditambah. Selain itu Pelangi UV juga mengadakan rekreasi rutin setiap tahun untuk para anggota tim.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBzWCv_1bQ0raAwWBvc0X1HItS1f4e3NIzXZGGCieGUalTdu4AUJemOeEBM0tbf_WgZ_tWJV0v1eJ35wZZadrRVrGEzWZCiI1xkJyxpNDAjYvI95_2YRX5aL6ZHpG655ykDg8UzL-w6Wdg6opTzjoMSD4Iv9l1dk8_02xoeZutmlTjzBOhMGWUFZeTJ2FIxsLheY86fECbMU13iqEdps4tDJpusUl4oxEueoCrNJz1kmDgFzPSsR5",
        caption: "Modernisasi mesin finishing semi-otomatis untuk meningkatkan kapasitas dan kecepatan cetak.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCssjTnAwOEGVKo7KwtxhOpEae4ilO4sQ3Y2F1eRaffAVhhIZ3tY3sGHSVOn02JmmeeDuItJej2ifnz1tieagVAfnGNoOddGwdrVO1qoWzQBtlUppvwN6VyLujidsmzNH1Kn2kyw_g5gGRQo_KqR7yRADmTplyZcL0j3jsS6ZwR0dG-zNUx7Ke7KlbPO9EtwYAi8iVpVhPI1wggEv9QsjR-9p4XraD6hD8R1lcPrP37Kv3HIN_v_JbX",
        caption: "Pengawasan presisi register pada pesanan harian yang melonjak hingga ribuan lembar.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOi1hE4Dqgo49O2h9jOTn-AyANPdL6T0NuWM4e-m-0REUBnbYzggUtjhNoBXkBXGAyFKFJkvDb5j-ZxRGedSTrzluf0tRf6YCx6DgPAu2UMORgFkqIsTMT7YZIXdVY8abvIE-J6G5GIoV9rbWNrylbmUy1YqBfsuDji_0KcukxsGMLgvWGT7radoAtspu2yT1O6GSHqj9gtJxaaCG5b6XiPVZwH4NH0WRYXJtLu5Dwd2tCQnv8-bG",
        caption: "Agenda tahunan rekreasi keluarga besar CV Pelangi UV sebagai bentuk apresiasi kerja tim.",
      },
    ],
  },
  {
    year: "2016",
    badge: "2016",
    title: "PEMINDAHAN GUDANG KE PUSAT INDUSTRI",
    desc: "Semakin bertambah pelanggan dan banyak pesanan, perusahaan memindahkan gudang dan produksinya ke pusat industri di pergudangan Bizpark Waru Sidoarjo B3 dan C3.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsVUIE6UdWFrPCNnSsuLQtBRP2KgbEsCOO_bkna9IveJIUt8Sp_Gb68Q3pu1ohnQNSEC26hors_8KEwfMbs5sTKFsq9wL2kNVRAYY0-qSPLP4dqa9IC5HFFtgC0XzXVgYDDi7yYEX21idpkmONAmV1U5xKd4aJvlUKsFSBAlVrGnn8fnyfPkSgVC14gizg-8h4yfJSMStp0WYpC8UhbzYTWFnFX_H2zrrLz_XjuiQZhgAejkgHNJBq",
        caption: "Relokasi fasilitas pabrik dan gudang ke Kompleks Industri Bizpark Waru Sidoarjo (B3 & C3).",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMolZsN9yvmI-fKWoie6H_V2zLDxo7ivK0kNvONjo3RoDbmHXjSVJUiQEMeG4zYamZ7DTZeKLjwaAJ-r0vjUZFrxwnCdR1dtmKWapSiV1zoWRVfDZDwCGAldYZc-1uWSfbzIo5U19LzucaD9t0AUsU8UT9QmbIusfCgqMlWeJNzrvcqHmcYt-XzZfjGq_g6b1LU_x27Vz2aSzU49OG2h0fgpuh02KUxXVUdTGa0KsDkohyDOe8uF77",
        caption: "Penataan tata letak workshop produksi di area pergudangan modern berstandar industri.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
        caption: "Peningkatan kapasitas penyimpanan bahan baku dan kelancaran loading antar-jemput barang.",
      },
    ],
  },
  {
    year: "2017–2022",
    badge: "2017–2022",
    title: "SERBA PROFESIONAL",
    desc: "Mesin-mesin bertambah semakin banyak dan serba otomatis. Dengan karyawan 80 orang yang bekerja secara sift dan profesional pada bidangnya masing-masing. Semakin banyak armada pengiriman.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKcR8ohxuz1Z2RE4uAgAcy6cspuvddjEjT-O7BK8E8nzfzFvc1YYUzfcr4DkOs0jSYVgfcgKdbzeCEY_xiq4gsMTEXHmG84pbcJQxAYQkb17VcZwYly29BBn73Qr1Op9v5CvICHM_d2lS42lgUyv-9QoBZvVz35es5iUui34-cex9MTBxpqb0PsrC_j7sp80TG9f0OzD91DXlRpjR6WVZug8tYpl2GWwpxHTVKK3Fgig_j_QPLu-Py",
        caption: "Lini mesin otomatis modern CV Pelangi UV berkecepatan tinggi dan presisi konsisten.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEXJFAl9U2vieevJ01JauKl40I9hLNDc5i3TTZqyEvvIW41iwDDFjqEAcFJaEvVNMni-SiTko0A_srel6JQicrO-3yESDr_guNXnlm9LgV5KXMgjXUmF2pga6mbsnfeb2719sGmHtCu6vYShpDi3WxN4ztLgGpcGiM2IHvs1Z_ue4fTzQZIQNZ7RloVgRaa1TqSnd1p-mKi-2C8TPeIWcu5jONFobG7u_HtU-L8BsstZWjwfmZJdMh",
        caption: "80 tenaga kerja terampil yang bekerja secara profesional dengan pembagian shift terstruktur.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYkS7v20l8RLK7X4iGdClwmyaUi2_cePATVp-rjsqCssrweckGJim-CitycEX22eEtaSM-DhHCEZGmEXDH3EX9crdwC9YEFAWdI8g9PCjumoNiuuT_VyA5V4N0YDqjUBGk4wZGu5YBa0CqXw3nJJ3vBqbtIDhuSvmHHT2mF0CrDoKeGbmqQvGugAjNKKg1jefKxQZjKmGBeuQy7u02kiDTBC9HCNsXqI_y4pq1nfKco3Bxf50Wjn",
        caption: "Penguatan armada logistik operasional untuk menjangkau percetakan di seluruh wilayah Jawa Timur.",
      },
    ],
  },
  {
    year: "2023–now",
    badge: "2023–now",
    title: "MENUJU PERUSAHAAN DIGITAL",
    desc: "Mesin-mesin terus bertambah, munculnya dan mulai penerapan sistem digital pada perusahaan, lokasi berpindah ke yang lebih besar di di pergudangan Bizpark Waru Sidoarjo B8, dan C17 - C19",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOi1hE4Dqgo49O2h9jOTn-AyANPdL6T0NuWM4e-m-0REUBnbYzggUtjhNoBXkBXGAyFKFJkvDb5j-ZxRGedSTrzluf0tRf6YCx6DgPAu2UMORgFkqIsTMT7YZIXdVY8abvIE-J6G5GIoV9rbWNrylbmUy1YqBfsuDji_0KcukxsGMLgvWGT7radoAtspu2yT1O6GSHqj9gtJxaaCG5b6XiPVZwH4NH0WRYXJtLu5Dwd2tCQnv8-bG",
        caption: "Ekspansi workshop ke unit Bizpark B8 dan C17–C19 yang lebih luas untuk menunjang kapasitas tinggi.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV_Ux6pj5Ckh1wckXqpgyZ1YVqpt8dlkr2eBzdoFeqj4iYtacQpmmcIGeogtYXmWj-r2bVt_Lu2HUP90T9Hbt25Vn2pgbsRyzxJrEiLRCGDker_oAg1JelsQuKA1WMWYR8-MDuczbWHcP6lw2wPaIpxcms9VmRCWUMrY7DVncdcaMb7hlnMFUwS5WvzWMsgjtAfV_dutj8HEjsW2Of_pjErALLV-Ci0Kc7JZkVP--OM_dccwPNFf66",
        caption: "Penerapan sistem manajemen digital dalam pemantauan alur produksi dan akurasi order finishing.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfExHr5NtXgfBa9u2YHnpxRRPEPCE73orW9lZA_d_yzBZcitN95z8S3pGSlnw0Vc_o4jp8LEEH85ZkYlaGZx52GZ7PCxlskaWo1RA-_VT5VcXAAkmIdlpXO8dWn0DF87l1VwHTUoGFWjEatCW5qZYHk2YsveDx1oMuWaumvjNyX8Mbh2ouSnuIGC9NR0hRsKS0-W_mtnmZQU0CYudQbp5V-u9HpIbLwZd2xudSjVdWQtgj0Xiu_5T3",
        caption: "Kesiapan teknologi mesin otomatis pasca-cetak mutakhir demi kepuasan mitra percetakan.",
      },
    ],
  },
];
