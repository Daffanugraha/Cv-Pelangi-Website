"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ID" | "EN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const UI_TRANSLATIONS: Record<string, { ID: string; EN: string }> = {
  // Navigation
  nav_home: { ID: "Beranda", EN: "Home" },
  nav_about: { ID: "Tentang Kami", EN: "About Us" },
  nav_journey: { ID: "Perjalanan", EN: "Journey" },
  nav_products: { ID: "Produk", EN: "Products" },
  nav_services: { ID: "Layanan Jasa Finishing", EN: "Finishing Services" },
  nav_materials: { ID: "Bahan Baku Finishing", EN: "Finishing Raw Materials" },
  nav_partner: { ID: "Partner", EN: "Partners" },
  nav_contact: { ID: "Kontak", EN: "Contact" },
  nav_gallery: { ID: "Galeri", EN: "Gallery" },
  nav_gallery_products: {
    ID: "Pengaplikasian Produk",
    EN: "Product Applications",
  },
  nav_gallery_moments: {
    ID: "Momen & Kegiatan",
    EN: "Moments & Activities",
  },
  nav_blog: { ID: "Blog", EN: "Blog" },
  nav_career: { ID: "Karir", EN: "Careers" },
  nav_download_catalog: { ID: "Unduh Katalog", EN: "Download Catalog" },
  nav_order_now: { ID: "Pesan Sekarang", EN: "Order Now" },

  // Contact Page Hero
  contact_hero_title: {
    ID: "Masih Bingung Menentukan",
    EN: "Still Wondering How to Choose",
  },
  contact_hero_suffix: { ID: "yang Tepat?", EN: "the Right Finishing?" },
  contact_hero_desc: {
    ID: "Ceritakan ide produk, jenis kemasan, atau konsep cetakan Anda. Tim konsultan CV Pelangi UV siap memandu dari pemilihan efek, uji kecocokan bahan baku, hingga kalkulasi paling efisien secara ramah, jelas, dan tanpa bingung lagi.",
    EN: "Tell us about your product idea, packaging type, or print concept. CV Pelangi UV's consultant team is ready to guide you from effect selection, material compatibility testing, to the most efficient calculation clearly and hassle-free.",
  },
  contact_hero_badge1: {
    ID: "Bebas Diskusi & Tanya Kapan Saja",
    EN: "Free Consultation Anytime",
  },
  contact_hero_badge2: {
    ID: "Panduan Rekomendasi Efek & Bahan",
    EN: "Effect & Material Recommendations",
  },
  contact_hero_badge3: {
    ID: "Siap Kirim Sample Swatch Fisik",
    EN: "Ready to Send Physical Swatches",
  },
  contact_hero_hotline_title: {
    ID: "Bicara Langsung via WhatsApp",
    EN: "Talk Directly via WhatsApp",
  },
  contact_hero_hotline_status: {
    ID: "Tim Siap Membantu & Berdiskusi",
    EN: "Team Ready to Assist & Discuss",
  },
  contact_hero_cta: {
    ID: "Konsultasi Gratis Sekarang",
    EN: "Free Consultation Now",
  },

  // Contact Form
  form_badge: {
    ID: "Formulir Pesan & Penawaran",
    EN: "Inquiry & Quotation Form",
  },
  form_title: {
    ID: "Kirim Rincian Pekerjaan Anda",
    EN: "Submit Your Project Details",
  },
  form_desc: {
    ID: "Isi spesifikasi kebutuhan cetak atau bahan baku. Tim kami akan merespons dalam waktu 15 menit dengan simulasi penawaran harga terbaik.",
    EN: "Fill in your print specifications or raw material needs. Our team will respond within 15 minutes with the best price estimation.",
  },
  form_name_label: { ID: "Nama Lengkap *", EN: "Full Name *" },
  form_name_placeholder: {
    ID: "Contoh: Hendra Wijaya",
    EN: "e.g. Hendra Wijaya",
  },
  form_company_label: {
    ID: "Nama Percetakan / Perusahaan",
    EN: "Printing House / Company Name",
  },
  form_company_placeholder: {
    ID: "Contoh: PT Grafika Abadi",
    EN: "e.g. PT Grafika Abadi",
  },
  form_wa_label: {
    ID: "Nomor WhatsApp Aktif *",
    EN: "Active WhatsApp Number *",
  },
  form_wa_placeholder: {
    ID: "Contoh: 081234567890",
    EN: "e.g. 081234567890",
  },
  form_category_label: {
    ID: "Kategori Kebutuhan *",
    EN: "Inquiry Category *",
  },
  form_msg_label: {
    ID: "Detail Spesifikasi & Estimasi Oplah Cetak",
    EN: "Specification Details & Print Quantity",
  },
  form_msg_placeholder: {
    ID: "Sebutkan jenis finishing (misal: Spot UV + Foil Emas), ukuran plano (misal: 65x100 cm), gramatur kertas (misal: Art Carton 260g), dan jumlah lembar...",
    EN: "Specify finishing type (e.g., Spot UV + Gold Foil), sheet size (e.g., 65x100 cm), paper weight (e.g., Art Carton 260g), and number of sheets...",
  },
  form_submit_btn: {
    ID: "Kirim Pesan Penawaran",
    EN: "Send Quotation Request",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "ID",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ID");

  useEffect(() => {
    sessionStorage.removeItem("pelangi_lang_reloading");
    const saved = localStorage.getItem("pelangi_lang");
    if (saved === "EN") {
      setLanguageState("EN");
      applyGoogleTranslate("en");
    } else {
      setLanguageState("ID");
      clearGoogleTranslateCookies();
      if (typeof window !== "undefined" && window.restoreOriginalLanguage) {
        window.restoreOriginalLanguage();
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("pelangi_lang", lang);

    if (lang === "ID") {
      clearGoogleTranslateCookies();
      if (typeof window !== "undefined") {
        if (window.restoreOriginalLanguage) {
          window.restoreOriginalLanguage();
        } else {
          const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
          if (combo) {
            combo.value = "";
            combo.dispatchEvent(new Event("change"));
          }
        }

        const isTranslated =
          document.documentElement.classList.contains("translated-ltr") ||
          document.documentElement.classList.contains("translated-rtl");

        document.documentElement.classList.remove("translated-ltr", "translated-rtl");

        if (isTranslated && !sessionStorage.getItem("pelangi_lang_reloading")) {
          sessionStorage.setItem("pelangi_lang_reloading", "true");
          window.location.reload();
          return;
        }
      }
    } else {
      applyGoogleTranslate("en");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "ID" ? "EN" : "ID");
  };

  const t = (key: string): string => {
    if (UI_TRANSLATIONS[key]) {
      return UI_TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

function clearGoogleTranslateCookies() {
  if (typeof window === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", host, "." + host];
  const paths = ["/", window.location.pathname];

  domains.forEach((d) => {
    paths.forEach((p) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p};` + (d ? ` domain=${d};` : "");
      document.cookie = `googtrans=; Max-Age=0; path=${p};` + (d ? ` domain=${d};` : "");
    });
  });
}

/**
 * Triggers Google Translate seamlessly
 */
function applyGoogleTranslate(targetLang: "id" | "en") {
  if (typeof window === "undefined") return;

  if (window.protectTechnicalTerms) {
    try {
      window.protectTechnicalTerms();
    } catch (e) {
      // ignore
    }
  }

  const hostname = window.location.hostname;

  if (targetLang === "en") {
    document.cookie = "googtrans=/id/en; path=/;";
    document.cookie = `googtrans=/id/en; path=/; domain=${hostname};`;

    const trigger = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = "en";
        select.dispatchEvent(new Event("change"));
        return true;
      }
      return false;
    };

    if (!trigger()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (trigger() || attempts > 25) {
          clearInterval(interval);
        }
      }, 150);
    }
  } else {
    clearGoogleTranslateCookies();
    if (window.restoreOriginalLanguage) {
      window.restoreOriginalLanguage();
    } else {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = "";
        select.dispatchEvent(new Event("change"));
      }
    }
  }
}
