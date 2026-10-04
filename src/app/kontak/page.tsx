import React from "react";
import type { Metadata } from "next";
import {
  ContactHero,
  MarketingTeamSection,
  ContactTestimonialsSection,
  FactoryLocationSection,
  InquiryFormSection,
} from "@/components/sections/kontak";

export const metadata: Metadata = {
  title:
    "Kontak & Tim Marketing - CV Pelangi UV | Konsultasi Finishing Percetakan",
  description:
    "Hubungi tim Marketing & Sales Executive CV Pelangi UV. Konsultasi gratis Spot UV, Hot Stamping Foil, Laminasi Doff/Glossy, kalkulasi harga cepat, serta pengiriman sampel swatch fisik langsung ke workshop Anda.",
  keywords: [
    "kontak pelangi uv",
    "tim marketing pelangi uv",
    "konsultasi finishing cetak",
    "spot uv sidoarjo",
    "hot stamping foil surabaya",
    "laminasi doff glossy",
    "percetakan bizpark sidoarjo",
  ],
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Refined Premium Hero Section with dynamic text & hotline */}
      <ContactHero />

      {/* 2. Marketing & Consultant Team Cards + WhatsApp Modal */}
      <MarketingTeamSection />

      {/* 3. Customer Testimonials Slider & Social Proof Stats */}
      <ContactTestimonialsSection />

      {/* 4. Factory & Operational Warehouse Location with Map */}
      <FactoryLocationSection />

      {/* 5. Request for Quotation & Sample Inquiry Form */}
      <InquiryFormSection />
    </div>
  );
}
