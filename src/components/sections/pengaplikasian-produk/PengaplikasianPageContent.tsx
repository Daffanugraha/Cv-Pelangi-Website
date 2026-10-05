"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export interface GalleryProduct {
  id: string;
  category: "kosmetik" | "makanan" | "buku" | "identity" | "paperbag";
  categoryLabel: string;
  title: string;
  desc: string;
  tag: string;
  badges: string[];
  finishing: string;
  material: string;
  notes: string;
  highlight: string;
  img: string;
}

export const DEFAULT_GALLERY_PRODUCTS: GalleryProduct[] = [
  {
    id: "prod-1",
    category: "kosmetik",
    categoryLabel: "Kemasan Kosmetik & Luxury",
    title: "Rigid Box Parfum Eksklusif",
    desc: "Thermal Doff Velvet halus bebas sidik jari berpadu Hot Stamping Rose Gold 12 Micron dan deboss tajam presisi.",
    tag: "Rose Gold Foil",
    badges: ["Velvet Soft Touch", "Hot Stamping 12μ", "Greyboard 1200gsm"],
    finishing: "Thermal Doff Velvet + Hot Stamping Rose Gold + Deboss",
    material: "Karton Greyboard 1200gsm + Art Paper 150gsm",
    notes: "Presisi register foil micro-align dengan daya lekat tahan gesek 100% tanpa flaking.",
    highlight: "Akurasi Register 0.1mm",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMLrJTlHhWWWl8TkrYzWHlml7k99aYf-juJUl5LAs_I1m614sMb50JjP7dgiGwK1zOyYfvepfsXKlKZBdKVHrUWGyovURyP2YJD64EaWWxDxPs3aPipltsAB_1p-I2OVCARpQcx94EVpqaMkhPVACSwFTub4k_JLrDt6ihiqvv6ylYZlOIA5EFJcvcKQtRJIDlfGIH2jKJhAku5ciAkpCdv9to98CwRt_uuiO7SAKIQxIvWevSVoW9",
  },
  {
    id: "prod-2",
    category: "kosmetik",
    categoryLabel: "Skincare Packaging",
    title: "Dus Serum 'Aurora Glow'",
    desc: "Tekstur taktil Spot UV Pasir berserat halus dipadukan tetesan kilau Spot UV Gloss cermin mewah.",
    tag: "Spot UV Pasir",
    badges: ["Spot UV Pasir", "Spot UV Gloss", "Ivory 350gsm"],
    finishing: "Kombinasi Spot UV Pasir Taktil & Spot UV Cermin Glossy",
    material: "Karton Ivory 350gsm Food-Grade Coating",
    notes: "Teknologi screen cylinder otomatis berkecepatan 3,500 lembar/jam dengan akurasi optical sensor.",
    highlight: "Optical Sensor Precision",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUgjn3xDX4WDvDKcZGjTzds0n0pctBOd6lj-RoXi6j18h6qNnt_cMKur-5p-6K7NNRf7YL49sikbxmb4FQ1dO3y1fSBxptgf9lidkuS-TvQpjhm6za5DIYw_T4YjyzfzdBqmAJpBrO_XGHl8w3JbdaCETaT0nGFloSAngDVFdQTlOKPeXUhEbDHIHTQAFeAWQAQTWc5vkoOQnL0Pf4G9igM5CUY-LUzW_dHAJfjOdzW9nRTs-P7vl",
  },
  {
    id: "prod-3",
    category: "buku",
    categoryLabel: "Buku & Hardcover Agenda",
    title: "Hardcover Agenda Korporat",
    desc: "Laminasi Doff Anti-Scratch anti-gores kuku dipertegas Hot Stamping Gold Brilliant dan Spot UV selektif.",
    tag: "Gold Foil Brilliant",
    badges: ["Anti-Scratch Doff", "Hot Stamp Gold", "Greyboard No.30"],
    finishing: "Hot Stamping Foil Gold Brilliant + Laminasi Doff Anti Gores",
    material: "Greyboard No. 30 (2.5mm) + Art Paper 150gsm Cover",
    notes: "Kekuatan daya rekat lem punggung PUR & foil panas hingga suhu 120°C tanpa kerut pada lipatan engsel buku.",
    highlight: "Tahan Lipat & Abrasi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiUV4edDUXiRayyKMnaKnLW0HotEF4QY07s5iBeFS-wXhn6goKVHHwJq0CjI3ySyKZ2sKmUVRqvJmSxKKnDgZCNiwHQC9Zm7lUMW0--oQ1_eM3np1cBf5HzD5cjA2V7ZPTJmBVvD812Ph65byiMrOawZmC5XsTJDhuXQnuIuqymCgSdy4H3TpZ8HyyX4C-fmXoGkXnQSRVAxfnELt80FzbVWhMmFqk_-dswYLI6-6nJJDgPfUDVWXc",
  },
  {
    id: "prod-4",
    category: "makanan",
    categoryLabel: "Box Makanan & Minuman",
    title: "Packaging Dus Foodgrade 'Delice'",
    desc: "Mika bening BOPP 25 Micron bersertifikat food-safe tanpa gelembung lewat pond plong berkecepatan tinggi.",
    tag: "Window Food-Safe",
    badges: ["Window Lamination", "Waterbase Safe", "Foopak 310gsm"],
    finishing: "Window Lamination BOPP 25 Micron + Auto Die-Cutting",
    material: "Foopak Greaseproof Board 310gsm",
    notes: "Bahan bersertifikasi FDA aman bersentuhan langsung dengan makanan berminyak atau berlemak tinggi.",
    highlight: "FDA Certified Adhesive",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsu3nOaLEnilsSkuVXbBLHEQt4ewlmTFxTDv7ukJ9mt5Heq58yVtj2ZP3bVtbI1_iqlTyQ3aNRkasWbH62U8eboXmw8P6epZzmjNRxtP1O8Xp8tJ-kQzKeX_30gdbgp26lG7YCrG6eCltOCSrH9MlvSb7TjR2Cg5wnrzurWjVSzbo33o6oc2uYawnlIHvM4byteS5ROjiDxqH9bIjkyEteLNDqHwboIciNm47YyjblmwuXuFXOuAB-",
  },
  {
    id: "prod-5",
    category: "identity",
    categoryLabel: "Kartu Nama & Identity",
    title: "Business Card Cotton 360gsm",
    desc: "Sentuhan velvet 2 sisi tebal dengan sapuan edge gilding foil emas pada tepi kartu dan micro deboss tajam.",
    tag: "Edge Gilding Foil",
    badges: ["Edge Gilding", "Thermal Velvet", "Cotton 360gsm"],
    finishing: "Thermal Doff Velvet 2 Sisi + Edge Foil Gilding Emas",
    material: "Kertas Seni Cotton Extra White 360gsm",
    notes: "Proses pelapisan tepi kartu dengan mesin hot stamp rol hidrolik khusus untuk hasil cermin merata pada 4 sisi kartu.",
    highlight: "Hydraulic Hot-Edge",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuWCh0gVsNn5ZjdwTNVfC5tjHPwCNwCmhrIgf24XmiSREb1yO8FsQzHuCmA3BbMqvTetcSzK4_wkMniyfLJp5otWtWqkgisOowzLmkM4kwdeCcwIubuCIuzjq0GvzpXUiDF-8d8FKSQ4jt71e8xgJNxLmpd1lpCqoFdJVNLbDZXg3I_VfjX6cnhHeOT7e4XTjFu2EJmpJGNj9VuEZvmZXESIL3NsodT2qwJ59u8k8op02XmpuAXEP0",
  },
  {
    id: "prod-6",
    category: "paperbag",
    categoryLabel: "Shopping Bag & Merchandising",
    title: "Paper Bag Butik Doff & Spot UV",
    desc: "Daya lentur tinggi tanpa retak sudut lipatan berkat Thermal Doff 20μ dan aksen motif Spot UV mengkilap.",
    tag: "Doff + Spot UV",
    badges: ["Anti-Crack Crease", "Spot UV Monogram", "Art Carton 260gsm"],
    finishing: "Laminating Doff 20μ + Spot UV + Pond Creasing Anti-Pecah",
    material: "Art Carton 260gsm",
    notes: "Didesain khusus untuk menahan beban hingga 7kg dengan lekukan rel lipatan tajam tanpa pecah pigmen warna cetak.",
    highlight: "Kapasitas Beban 7kg",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXbtL37Qxnxv20fIemfwdE_haHFTrKB925zdKwtEIF3TPb0fXQfZOqt22JGajh9Dg774ark93kQxcyVwRmQxkkXYM6p8MTkclsxDHVPxZfVd4H-OXnjUyhX9hCNC4rdGTE75zeDHzEPLtxCJNoS-jVWcc5FscNjq8zy921ySFesyJpd8-8n7KjtxqtqZyl-yx07critNok5efbw7S-lVbLXRzAgOkIT6blV3HoZUHgYp1_4V2AryRF",
  },
];


const FILTER_TABS = [
  { key: "all", label: "Semua Produk" },
  { key: "kosmetik", label: "Kemasan Kosmetik & Luxury" },
  { key: "makanan", label: "Box Makanan & Minuman" },
  { key: "buku", label: "Buku & Hardcover Agenda" },
  { key: "identity", label: "Kartu Nama & Identity" },
  { key: "paperbag", label: "Paper Bag" },
];

const EDUCATIONAL_SLIDES = [
  {
    category: "Kosmetik & Skincare Luxury",
    headline: "Proteksi Sidik Jari & Kemewahan Sentuhan Pertama",
    desc: "Produk kecantikan dan wewangian premium bersaing langsung di meja rias dan display toko. Konsumen menilai kemewahan dari sentuhan fisik sebelum membuka isi kemasan.",
    recommendations: [
      {
        title: "Thermal Doff Velvet (Soft-Touch)",
        text: "Menghilangkan silau lampu toko dan 100% bebas bercak minyak sidik jari.",
      },
      {
        title: "Hot Stamping Foil (Rose Gold / 24K)",
        text: "Ketajaman garis tipografi hingga 0.2mm tanpa rontok pada sudut lipatan.",
      },
      {
        title: "Spot UV Pasir & Emboss Timbal Balik",
        text: "Menciptakan efek taktil berdimensi yang sulit dipalsukan kompetitor tiruan.",
      },
    ],
    technicalSpec: {
      standard: "Uji Gesek Sutherland (ASTM D5264) > 500 strokes",
      register: "± 0.1 mm Optical Micro-Registration",
      durability: "Tahan goresan kuku & paparan alkohol ringan",
    },
  },
  {
    category: "Makanan, Minuman & Farmasi",
    headline: "Standar Higienitas Food-Grade & Tahan Suhu Dingin",
    desc: "Kemasan pangan dan obat-obatan mewajibkan lapisan yang tidak berbau kimia tajam, anti-lemak minyak, dan lolos sertifikasi kontak pangan regulasi BPOM & FDA.",
    recommendations: [
      {
        title: "Window Patching Film BOPP Food-Safe",
        text: "Mika jendela jernih bebas kabut tanpa gelembung untuk visibilitas produk di dalam.",
      },
      {
        title: "Lem Waterbased & Hotmelt Non-Toxic",
        text: "Formula ramah pangan tanpa migrasi senyawa kimia ke produk makanan beku/hangat.",
      },
      {
        title: "Pond Plong Presisi (Auto Die-Cut)",
        text: "Kunci lidah dus rapat sempurna untuk menjaga kesegaran dan mencegah kontaminasi debu.",
      },
    ],
    technicalSpec: {
      standard: "FDA 21 CFR 175.300 & Bebas Senyawa Benzena",
      register: "± 0.2 mm Kecepatan 4.500 lembar/jam",
      durability: "Tahan suhu chiller -18°C hingga kelembaban 90% RH",
    },
  },
  {
    category: "Buku, Agenda & Annual Report",
    headline: "Ketahanan Engsel Lipat & Kekuatan Punggung Jilid",
    desc: "Hardcover buku tahunan dan agenda eksekutif sering dibuka-tutup ratusan kali. Finishing harus lentur pada lipatan engsel tanpa timbul retakan putih.",
    recommendations: [
      {
        title: "Laminasi Doff Anti-Scratch",
        text: "Permukaan doff khusus yang tahan gesekan kuku, meja kerja, dan tumpukan buku.",
      },
      {
        title: "Foil Panas Suhu Terkalibrasi 120°C",
        text: "Penempelan foil emas/perak yang menembus serat kain linen atau art paper tebal.",
      },
      {
        title: "Daya Rekat Lem Punggung PUR Prima",
        text: "Mencegah lembaran cover terlepas dari karton greyboard tebal No. 30 (2.5mm).",
      },
    ],
    technicalSpec: {
      standard: "Uji Tekuk Lipatan ISO 5626 > 1.000 kali bolak-balik",
      register: "Presisi garis punggung buku 0.15 mm",
      durability: "Garansi tidak pecah retak pada engsel hingga 5 tahun",
    },
  },
  {
    category: "Kartu Nama & Brand Identity",
    headline: "Wibawa Profesional Lewat Detail Sapuan Tepi Kartu",
    desc: "Kartu nama premium adalah perwakilan reputasi direksi dan pemilik bisnis saat diserahkan langsung. Detail tepian kartu berbicara tentang standar kualitas tertinggi.",
    recommendations: [
      {
        title: "Edge Foil Gilding Hidrolik 4 Sisi",
        text: "Sapuan foil cermin berkilau pada tepi tumpukan kertas tebal 360gsm–600gsm.",
      },
      {
        title: "Deboss Micro-Depth Presisi",
        text: "Cekungan logo tegas ke dalam serat kertas cotton tanpa merusak bagian belakang.",
      },
      {
        title: "Double-Side Velvet Lamination",
        text: "Dua sisi sentuhan beludru mewah yang kokoh dan tidak melengkung di dompet.",
      },
    ],
    technicalSpec: {
      standard: "Hydraulic Pressure 15 Ton Thermal Block",
      register: "Akurasi tepi potong ± 0.05 mm",
      durability: "Foil tepi tahan gesekan dompet tanpa rontok",
    },
  },
  {
    category: "Shopping Bag & Paper Bag Retail",
    headline: "Daya Lentur Garis Pond & Kapasitas Beban Maksimal",
    desc: "Paper bag butik eksklusif harus mampu menahan beban belanjaan tanpa robek di sudut lipatan bawah atau pada lubang tali gantungan.",
    recommendations: [
      {
        title: "Rel Creasing Pond Anti-Pecah",
        text: "Tekanan pisau pond terkalibrasi agar pigmen warna tinta cetak tidak pecah di lekukan.",
      },
      {
        title: "Laminasi Thermal Doff 20 Micron",
        text: "Lapisan pelindung elastis yang memperkuat daya tahan serat kertas art carton 260g.",
      },
      {
        title: "Aksen Spot UV Pattern Monogram",
        text: "Kilau pola logo brand yang berkilau elegan saat tas bergerak di bawah pencahayaan mall.",
      },
    ],
    technicalSpec: {
      standard: "Uji Kekuatan Beban Tarik Dinamis hingga 8.5 kg",
      register: "Akurasi rel pond lipatan 0.1 mm",
      durability: "Tahan rintik air hujan & kelembaban tinggi",
    },
  },
];

export default function PengaplikasianPageContent() {
  // 1. Filter state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Admin gallery items merge (if any uploaded from admin panel)
  const [extraGallery, setExtraGallery] = useState<GalleryProduct[]>([]);
  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: GalleryProduct[] = data.map((item) => ({
            id: item.id,
            category: "kosmetik",
            categoryLabel: item.category || "Kemasan Khusus",
            title: item.title,
            desc: `${item.technique} — hasil finishing presisi tinggi CV Pelangi UV.`,
            tag: item.technique || "Custom Finishing",
            badges: [item.technique, item.category, "Custom Spec"].filter(Boolean),
            finishing: item.technique,
            material: "Sesuai permintaan percetakan mitra",
            notes: "Diproduksi dengan kalibrasi ketat di pabrik Bizpark Sidoarjo.",
            highlight: "Presisi Pabrik Bizpark",
            img: item.imageUrl,
          }));
          setExtraGallery(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // 4. Combined products
  const allProducts = useMemo(() => {
    return [...DEFAULT_GALLERY_PRODUCTS, ...extraGallery];
  }, [extraGallery]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchFilter = activeFilter === "all" || p.category === activeFilter;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.finishing.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [allProducts, activeFilter, searchQuery]);

  // 5. Modal State
  const [selectedProduct, setSelectedProduct] = useState<GalleryProduct | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 6. Educational Guide Slide State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  useEffect(() => {
    if (isSlidePaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % EDUCATIONAL_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isSlidePaused]);

  // 7. Request Sample Form State
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    phone: "",
    packageType: "Dus Skincare / Kosmetik",
    finishingInterests: ["Spot UV Gloss / Pasir", "Hot Stamping Foil Gold"],
    address: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFinishingInterest = (tech: string) => {
    setFormState((prev) => {
      const exists = prev.finishingInterests.includes(tech);
      return {
        ...prev,
        finishingInterests: exists
          ? prev.finishingInterests.filter((t) => t !== tech)
          : [...prev.finishingInterests, tech],
      };
    });
  };

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) {
      alert("Mohon lengkapi nama dan nomor WhatsApp Anda.");
      return;
    }

    // Save lead to admin API in background
    fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formState.name,
        company: formState.company || "-",
        phone: formState.phone,
        email: "",
        service: `Sample: ${formState.packageType}`,
        message: `Finishing: ${formState.finishingInterests.join(", ")} | Alamat: ${formState.address || "-"}`,
      }),
    }).catch(() => {});

    // Format WhatsApp message
    const msg = `Halo Tim CV Pelangi UV, saya ingin meminta Kiriman Sample Swatch Fisik:%0A%0A• *Nama PIC:* ${encodeURIComponent(formState.name)}%0A• *Percetakan / Brand:* ${encodeURIComponent(formState.company || "-")}%0A• *No. WhatsApp:* ${encodeURIComponent(formState.phone)}%0A• *Jenis Kemasan:* ${encodeURIComponent(formState.packageType)}%0A• *Finishing yang Diinginkan:* ${encodeURIComponent(formState.finishingInterests.join(", "))}%0A• *Alamat Pengiriman:* ${encodeURIComponent(formState.address || "Hubungi saya via WA")}%0A%0AMohon info ketersediaan swatch sampel fisiknya. Terima kasih!`;

    window.open(`https://wa.me/6282231019363?text=${msg}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <div
      suppressHydrationWarning
      className="w-full bg-surface min-h-screen font-sans text-text-body antialiased selection:bg-bracket-border selection:text-white"
    >
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & HERO SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-navbar-black rounded-b-[40px] shadow-2xl pt-12 pb-20 border-b border-white/10">
        {/* Workshop Ambient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            alt="Workshop Industri CV Pelangi UV"
            className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1X8hUYRnyrzcmk40q8h_QhSLFCdR_322fC-Sf0MzF_son0DBlP6sBiJThSE0RcBy0Nr1HytYFhIPNdQjXaMSA99Ozsq3yPKMyOsMrdQj7xUfD7EUMIBm0O8yfWnjQks2v9efmAGY1Vubn0IQP1VtA8Sn6t_8rllU2UjdGRyMh4Z4ys0vr2MHZ8evYEiU1BQB_lDhDiF5TCtd0qVFsQvQ_vFtJugqUG11f_FwNOSA0C8tXbBt-3NGoXtwU4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navbar-black via-navbar-black/85 to-navbar-black/95"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs text-surface-dim/80 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-6"
            >
              <Link href="/" className="hover:text-bracket-border transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">home</span>
                <span>Beranda</span>
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link href="/galeri" className="hover:text-bracket-border transition-colors">
                Galeri
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-white font-medium">Pengaplikasian Produk</span>
            </nav>

            {/* Headline */}
            <h1 className="font-heading font-extrabold tracking-tight text-white mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Galeri Pengaplikasian <span className="text-bracket-border">Produk Cetak</span>
            </h1>

            {/* Headline Subtitle */}
            <p className="text-surface-dim max-w-3xl leading-relaxed mb-8 text-base sm:text-lg">
              Solusi visualisasi hasil aplikasi finishing cetak presisi tinggi dari CV Pelangi UV — mulai dari Hardcover Agenda Eksekutif hingga beragam kemasan berstandar industri ekspor.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#request-sample"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-bracket-border text-white font-semibold shadow-[0_8px_24px_rgba(246,84,86,0.4)] hover:bg-primary-container transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Minta Swatch Sample Fisik</span>
              </a>
              <a
                href="/katalog-pelangi-uv.pdf"
                download="KATALOG PELANGI UV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all hover:scale-105 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh E-Katalog Hasil Cetak</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FILTER & SEARCH CONTROLS */}
      {/* ========================================================================= */}
      <section className="relative z-10 bg-surface py-5 shadow-sm border-b border-surface-container-high transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Pills Marquee (Bergerak pelan terus-menerus & pause saat hover) */}
            <div className="relative flex-1 overflow-hidden min-w-0 w-full py-1">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

              <div className="category-marquee-track items-center py-1">
                {[...Array(2)].map((_, loopIdx) => (
                  <div key={loopIdx} className="flex items-center gap-2.5 px-1.5 shrink-0">
                    {FILTER_TABS.map((tab) => {
                      const isActive = activeFilter === tab.key;
                      return (
                        <button
                          key={`${loopIdx}-${tab.key}`}
                          onClick={() => setActiveFilter(tab.key)}
                          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer select-none ${
                            isActive
                              ? "bg-gradient-to-r from-bracket-border to-primary text-white shadow-md shadow-bracket-border/30 scale-105"
                              : "bg-surface-container text-on-surface hover:bg-divider-tint hover:text-bracket-border"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari efek finishing atau produk..."
                className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-surface-container-high rounded-full text-xs text-on-surface placeholder-gray-400 focus:outline-none focus:border-bracket-border transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE PRODUCT GALLERY SHOWCASE (RESPONSIVE GRID) */}
      {/* ========================================================================= */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="material-symbols-outlined text-bracket-border text-xl">auto_awesome</span>
              <span className="font-semibold text-on-surface text-base">
                Koleksi Mockup & Portofolio Fisik Terverifikasi
              </span>
            </div>
            <span className="text-xs text-text-muted hidden sm:inline">
              Klik salah satu produk untuk inspeksi spesifikasi teknis
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-16 text-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-gray-400">search_off</span>
              <h3 className="text-lg font-bold text-on-surface mt-3">Tidak Ada Produk yang Cocok</h3>
              <p className="text-sm text-text-muted mt-1">
                Coba gunakan kata kunci pencarian lain atau pilih kategori "Semua Produk".
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-full bg-bracket-border text-white text-xs font-semibold hover:bg-primary transition shadow"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer bg-surface-container-lowest rounded-2xl overflow-hidden border border-surface-container-high shadow-sm hover:shadow-xl hover:border-bracket-border/40 transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-bracket-border text-white text-xs font-bold shadow-md">
                        {product.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-bracket-border/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Inspeksi Detail Finishing
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-bracket-border uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <h3 className="font-heading font-bold text-on-surface text-lg group-hover:text-bracket-border transition-colors mt-0.5">
                        {product.title}
                      </h3>
                      <p className="text-xs text-text-body line-clamp-2 leading-relaxed mt-1">
                        {product.desc}
                      </p>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-surface-container text-[11px] font-medium text-text-muted"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-surface-container-high flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-bracket-border flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {product.highlight}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-surface-tint-light hover:bg-bracket-border text-bracket-border hover:text-white flex items-center justify-center transition-colors shadow-sm"
                        title="Buka Detail Spesifikasi"
                      >
                        <span className="material-symbols-outlined text-base">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EDUCATIONAL SELECTION GUIDE (PANDUAN SELEKSI PASCA-CETAK) */}
      {/* ========================================================================= */}
      <section className="w-full bg-gradient-to-b from-surface-container-low via-surface to-surface-container-low py-16 border-t border-surface-container-high relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-tint-light border border-bracket-border/20 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm animate-pulse">verified</span>
                Panduan Seleksi Pasca-Cetak Industri
              </div>
              <h2 className="font-heading font-bold text-on-surface text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Mengapa Efek Tertentu Wajib Dipilih untuk Produk Anda?
              </h2>
              <p className="text-sm text-text-body mt-2 leading-relaxed">
                Finishing bukan sekadar riasan visual—ini tentang proteksi higienitas fungsional, kepatuhan regulasi BPOM & cukai, hingga pemicu keputusan impulsif saat sentuhan pertama konsumen di rak display.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      (prev) => (prev - 1 + EDUCATIONAL_SLIDES.length) % EDUCATIONAL_SLIDES.length
                    )
                  }
                  className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-sm active:scale-95"
                  title="Kategori Sebelumnya"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev + 1) % EDUCATIONAL_SLIDES.length)
                  }
                  className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-bracket-border hover:text-white flex items-center justify-center transition shadow-sm active:scale-95"
                  title="Kategori Berikutnya"
                >
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
              <a
                href="https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20spesifikasi%20finishing%20kemasan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bracket-border text-white text-xs font-semibold shadow hover:bg-primary transition"
              >
                <span>Konsultasi Formulasi Teknis</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
            {EDUCATIONAL_SLIDES.map((slide, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-bracket-border to-primary text-white shadow-md shadow-bracket-border/30 scale-105"
                      : "bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  <span>{slide.category}</span>
                </button>
              );
            })}
          </div>

          {/* Active Slide Display Card */}
          {(() => {
            const slide = EDUCATIONAL_SLIDES[activeSlide];
            return (
              <div
                onMouseEnter={() => setIsSlidePaused(true)}
                onMouseLeave={() => setIsSlidePaused(false)}
                className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Recommendations */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                      <span className="text-xs font-bold text-bracket-border uppercase tracking-wider">
                        Kategori Pilihan 0{activeSlide + 1} / 0{EDUCATIONAL_SLIDES.length}
                      </span>
                      <h3 className="font-heading font-extrabold text-on-surface text-xl sm:text-2xl mt-1">
                        {slide.headline}
                      </h3>
                      <p className="text-sm text-text-body mt-2 leading-relaxed">{slide.desc}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Rekomendasi Finishing Berdasarkan Standard Industri:
                      </p>
                      {slide.recommendations.map((rec, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container hover:border-bracket-border/40 transition"
                        >
                          <span className="material-symbols-outlined text-bracket-border text-lg shrink-0 mt-0.5">
                            task_alt
                          </span>
                          <div>
                            <p className="text-xs font-bold text-on-surface">{rec.title}</p>
                            <p className="text-xs text-text-body mt-0.5 leading-relaxed">{rec.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Technical Specs & WhatsApp CTA */}
                  <div className="lg:col-span-5 bg-navbar-black text-white rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl border border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span className="material-symbols-outlined text-accent-gold text-xl">
                          precision_manufacturing
                        </span>
                        <p className="font-heading font-bold text-sm text-white">
                          Parameter Presisi Pabrik Bizpark
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                          <p className="text-[11px] text-gray-400">Standar Pengujian Mutu</p>
                          <p className="text-xs font-semibold text-white mt-0.5">
                            {slide.technicalSpec.standard}
                          </p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                          <p className="text-[11px] text-gray-400">Toleransi Register Mesin</p>
                          <p className="text-xs font-semibold text-accent-gold mt-0.5">
                            {slide.technicalSpec.register}
                          </p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                          <p className="text-[11px] text-gray-400">Garansi Daya Tahan</p>
                          <p className="text-xs font-semibold text-white mt-0.5">
                            {slide.technicalSpec.durability}
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20ingin%20konsultasi%20finishing%20untuk%20kategori%20${encodeURIComponent(
                        slide.category
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-bracket-border hover:bg-primary-container text-white text-xs font-bold shadow-lg transition active:scale-95"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Uji Sampel Bahan Kategori Ini</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. REQUEST PHYSICAL SAMPLE SWATCH (FORMULIR SWATCH FISIK) */}
      {/* ========================================================================= */}
      <section id="request-sample" className="w-full py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navbar-black to-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-bracket-border/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bracket-border/20 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2 border border-bracket-border/30">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  Katalog Fisik Gratis untuk Mitra Cetak
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  Ingin Menguji Kualitas Finishing Pada Kemasan Anda?
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Kami mengirimkan swatch sampel fisik lengkap (Spot UV Pasir, Hot Stamping Gold, Thermal Velvet, Die-Cut Pond) langsung ke kantor percetakan atau pabrik Anda di seluruh Indonesia.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-8 text-center max-w-lg mx-auto">
                  <span className="material-symbols-outlined text-5xl text-emerald-400">
                    check_circle
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white mt-3">
                    Permintaan Sampel Berhasil Dibuat!
                  </h3>
                  <p className="text-xs text-gray-300 mt-2">
                    WhatsApp admin marketing kami telah terbuka. Tim Pelangi UV akan segera mengonfirmasi alamat pengiriman swatch fisik Anda.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
                  >
                    Kirim Permintaan Sampel Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSampleSubmit} className="space-y-6 max-w-3xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nama PIC / Pemohon *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Contoh: Hendra Wijaya"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-bracket-border transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nama Percetakan / Perusahaan *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.company}
                        onChange={(e) => setFormState((f) => ({ ...f, company: e.target.value }))}
                        placeholder="Contoh: PT Grafika Mandiri"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-bracket-border transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="Contoh: 081234567890"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-bracket-border transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Fokus Jenis Kemasan
                      </label>
                      <select
                        value={formState.packageType}
                        onChange={(e) => setFormState((f) => ({ ...f, packageType: e.target.value }))}
                        className="w-full bg-gray-800 border border-white/20 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-bracket-border transition"
                      >
                        <option value="Dus Skincare / Kosmetik">Dus Skincare / Kosmetik</option>
                        <option value="Rigid Box Parfum & Luxury">Rigid Box Parfum & Luxury</option>
                        <option value="Packaging Food-grade Makanan">Packaging Food-grade Makanan</option>
                        <option value="Hardcover Agenda & Buku">Hardcover Agenda & Buku</option>
                        <option value="Paper Bag Retail & Butik">Paper Bag Retail & Butik</option>
                        <option value="Kartu Nama & Tag Eksklusif">Kartu Nama & Tag Eksklusif</option>
                      </select>
                    </div>
                  </div>

                  {/* Finishing Checkboxes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Pilih Sampel Efek Finishing yang Ingin Diuji:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        "Spot UV Gloss / Pasir",
                        "Hot Stamping Foil Gold",
                        "Hot Stamping Rose Gold",
                        "Thermal Doff Velvet",
                        "Pond & Window Mika",
                        "Cast & Cure Hologram",
                      ].map((tech) => {
                        const isChecked = formState.finishingInterests.includes(tech);
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleFinishingInterest(tech)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition ${
                              isChecked
                                ? "bg-bracket-border/20 border-bracket-border text-white font-semibold"
                                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 border ${
                                isChecked
                                  ? "bg-bracket-border border-bracket-border text-white"
                                  : "border-gray-500"
                              }`}
                            >
                              {isChecked && "✓"}
                            </span>
                            <span className="truncate">{tech}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Alamat Pengiriman Sampel (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      value={formState.address}
                      onChange={(e) => setFormState((f) => ({ ...f, address: e.target.value }))}
                      placeholder="Tuliskan nama jalan, kota, dan kode pos tujuan pengiriman sampel..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-bracket-border transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-bracket-border to-primary hover:from-primary hover:to-bracket-border text-white font-bold text-sm shadow-xl shadow-bracket-border/30 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                    <span>Kirim Permintaan Swatch Sampel Fisik (Gratis)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE SPECIFICATION MODAL (POPUP INSPEKSI FINISHING) */}
      {/* ========================================================================= */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-surface-container-lowest border border-surface-container-high rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-md"
              title="Tutup Modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-surface-container rounded-t-3xl">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-bracket-border text-white text-xs font-bold shadow">
                  {selectedProduct.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  {selectedProduct.categoryLabel}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-on-surface">
                  {selectedProduct.title}
                </h3>
                <p className="text-sm text-text-body mt-2 leading-relaxed">
                  {selectedProduct.desc}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-surface-container-low rounded-2xl p-5 border border-surface-container-high space-y-3">
                <p className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-bracket-border text-base">
                    tune
                  </span>
                  Spesifikasi Teknis & Finishing
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
                    <span className="text-text-muted font-medium block">Teknik Finishing:</span>
                    <span className="text-on-surface font-semibold mt-0.5 block">
                      {selectedProduct.finishing}
                    </span>
                  </div>

                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
                    <span className="text-text-muted font-medium block">Bahan / Kertas:</span>
                    <span className="text-on-surface font-semibold mt-0.5 block">
                      {selectedProduct.material}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container text-xs">
                  <span className="text-text-muted font-medium block">Standar Kualitas & Toleransi:</span>
                  <span className="text-bracket-border font-bold mt-0.5 block">
                    {selectedProduct.notes}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/6282231019363?text=Halo%20Pelangi%20UV%2C%20saya%20tertarik%20dengan%20finishing%20produk%20*${encodeURIComponent(
                    selectedProduct.title
                  )}*%20(${encodeURIComponent(
                    selectedProduct.finishing
                  )}).%20Bisa%20info%20minimal%20oplah%20dan%20biayanya%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-action-whatsapp hover:bg-action-whatsapp-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-action-whatsapp/30 transition active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>Konsultasi Produk Ini via WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container text-xs font-semibold transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
