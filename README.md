# CV Pelangi UV — Website Redesign (Halaman Beranda)

Folder ini (`dumb/`) adalah implementasi lengkap halaman beranda Next.js 14 App Router + Tailwind CSS + TypeScript hasil konversi desain Stitch CV Pelangi UV, dibuat sesuai acuan standar skill **website-pelangi-agent** (`references/stitch-conversion.md` & `references/global-components.md`).

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Desain token lengkap di `tailwind.config.ts` bersumber dari `DESIGN.md`)
- **Icons & Typography**: Google Fonts (Plus Jakarta Sans & Inter), Material Symbols Outlined
- **Interaktivitas**: React Client State hooks (`useState`, `useEffect`, `useRef`, `IntersectionObserver`)

---

## 📁 Struktur Modul & Komponen

```
dumb/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (Google Fonts, Navbar, Footer, FloatingActions)
│   │   ├── page.tsx           # Halaman Beranda lengkap (14 sections)
│   │   └── globals.css        # Keyframe animasi (marquee, aura, float, glowing CTA)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Header sticky, menu dropdown, live search modal, language switcher
│   │   │   ├── Footer.tsx     # Footer resmi border pelangi 3 warna, menu, kontak, sosmed
│   │   │   └── FloatingActions.tsx # WhatsApp direct ping button + Pelangi Assistant Chatbot interaktif
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Hero factory plate + auto-sliding testimonial card
│   │   │   ├── StatsSection.tsx       # 4 counter bracket stats + count-up on view
│   │   │   ├── AboutSection.tsx       # Multi-tab auto-slide tentang kapasitas & logistik
│   │   │   ├── PillarsSection.tsx     # 4 Pillars of Excellence grid
│   │   │   ├── VisionMissionSection.tsx # Mengapa CV Pelangi UV (3 kartu pembeda)
│   │   │   ├── TaglineBanner.tsx      # Banner prinsip & "When Quality Be A Priority"
│   │   │   ├── JourneySection.tsx     # Perjalanan sejarah (2004-2026) dengan dome globe ring
│   │   │   ├── ProductsSection.tsx    # Tab Layanan Jasa (13) vs Bahan Baku (4) + loop marquee
│   │   │   ├── PartnersSection.tsx    # Marquee loop mitra percetakan
│   │   │   ├── GallerySection.tsx     # Reels video & sorotan produksi
│   │   │   ├── BlogSection.tsx        # 3 kolom artikel edukasi & teknologi finishing
│   │   │   ├── FaqSection.tsx         # Accordion interaktif FAQ 3 info penting
│   │   │   ├── LocationSection.tsx    # Peta Google Maps embed Bizpark Sidoarjo & jam buka
│   │   │   └── ContactSection.tsx     # Form pemesanan penawaran harga interaktif
│   │   └── ui/
│   │       └── Button.tsx             # Reusable button variant
│   └── lib/
│       ├── data.ts            # Master data konten statis, katalog search, FAQs, knowledge-base
│       └── utils.ts           # Class merging helper (cn)
├── tailwind.config.ts         # Token warna, typography, spacing resmi DESIGN.md
├── tsconfig.json
├── package.json
└── next.config.mjs
```

---

## 🚀 Cara Menjalankan

Masuk ke folder `dumb`:

```bash
cd "D:\Website Pelangi\dumb"
npm run dev
```

Buka browser di:
`http://localhost:3000`

Untuk build produksi:
```bash
npm run build
npm start
```
