import React from "react";
import {
  Hero,
  StatsSection,
  AboutSection,
  PillarsSection,
  VisionMissionSection,
  TaglineBanner,
  JourneySection,
  ProductsSection,
  PartnersSection,
  GallerySection,
  BlogSection,
  FaqSection,
  LocationSection,
  ContactSection,
} from "@/components/sections/beranda";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-navbar-black">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats & Counter */}
      <StatsSection />

      {/* 3. Tentang Kami Interactive Slider */}
      <AboutSection />

      {/* 4. Pillars of Excellence */}
      <PillarsSection />

      {/* 5. Mengapa Harus CV Pelangi UV / Nilai Pembeda */}
      <VisionMissionSection />

      {/* 6. Tagline & Motto Banner */}
      <TaglineBanner />

      {/* 7. Perjalanan / Authentic Journey Timeline */}
      <JourneySection />

      {/* 8. Produk & Layanan Portfolio */}
      <ProductsSection />

      {/* 9. Partner Kami Marquee */}
      <PartnersSection />

      {/* 10. Galeri & Sorotan Video Produksi */}
      <GallerySection />

      {/* 11. Blog & Berita Terbaru */}
      <BlogSection />

      {/* 12. FAQ Singkat */}
      <FaqSection />

      {/* 13. Lokasi Fasilitas & Kantor Bizpark */}
      <LocationSection />

      {/* 14. Form Konsultasi & Pesan Sekarang */}
      <ContactSection />
    </div>
  );
}
