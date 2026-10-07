import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full bg-navbar-black text-on-secondary relative pt-space-2xl pb-space-lg"
      style={{
        borderTop: "3px solid",
        borderImage:
          "linear-gradient(90deg, rgb(230, 33, 41) 0%, rgb(254, 209, 0) 50%, rgb(0, 155, 76) 100%) 1 / 1 / 0 stretch",
      }}
    >
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-2xl">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <div className="mb-space-md">
              <Link href="/" className="inline-block">
                <img
                  alt="Pelangi UV Logo"
                  className="h-16 w-auto object-contain"
                  src="/images/logo.png"
                />
              </Link>
            </div>
            <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed mb-space-sm">
              <strong translate="no" className="notranslate text-white font-semibold">CV Pelangi UV</strong> —{" "}
              <span translate="no" className="notranslate">When Quality Be A Priority</span>. Ahlinya jasa finishing cetak &amp; grosir
              bahan baku finishing sejak 2004 di Bizpark Sidoarjo.
            </p>
          </div>

          {/* Col 2: Menu Utama */}
          <div className="lg:col-span-1">
            <h3 className="font-headline-sm text-headline-sm text-on-secondary mb-space-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bracket-border"></span>
              Menu Utama
            </h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-surface-dim">
              <li>
                <Link
                  href="/#tentang-kami"
                  className="hover:text-bracket-border transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/#perjalanan"
                  className="hover:text-bracket-border transition-colors"
                >
                  Perjalanan
                </Link>
              </li>
              <li>
                <Link
                  href="/#partner"
                  className="hover:text-bracket-border transition-colors"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="hover:text-bracket-border transition-colors"
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  href="/#galeri"
                  className="hover:text-bracket-border transition-colors"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri/pengaplikasian-produk"
                  className="hover:text-bracket-border transition-colors"
                >
                  Galeri Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-bracket-border transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/karir"
                  className="hover:text-bracket-border transition-colors"
                >
                  Karir
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-bracket-border transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Produk */}
          <div className="lg:col-span-1">
            <h3 className="font-headline-sm text-headline-sm text-on-secondary mb-space-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bracket-border"></span>
              Produk
            </h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-surface-dim">
              <li>
                <Link
                  href="/layanan"
                  className="hover:text-bracket-border transition-colors"
                >
                  Layanan Jasa Finishing
                </Link>
              </li>
              <li>
                <Link
                  href="/produk/bahan-baku"
                  className="hover:text-bracket-border transition-colors"
                >
                  Bahan Baku Finishing
                </Link>
              </li>
              <li>
                <a
                  href="/katalog/katalog-pelangi-uv.pdf"
                  download="KATALOG PELANGI UV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bracket-border transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Katalog &amp; Pricelist</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-secondary-container font-mono">PDF</span>
                </a>
              </li>
              <li>
                <Link
                  href="/kontak#section-form"
                  className="hover:text-bracket-border transition-colors"
                >
                  Permintaan Penawaran
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hubungi Kami */}
          <div className="lg:col-span-1">
            <h3 className="font-headline-sm text-headline-sm text-on-secondary mb-space-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bracket-border"></span>
              Hubungi Kami
            </h3>
            <div className="space-y-space-xs font-body-sm text-body-sm text-surface-dim">
              <a
                href="https://maps.app.goo.gl/sfBs972qUZfScwMJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="leading-snug hover:text-white transition-colors block group"
                title="Buka rute Google Maps CV Pelangi UV"
              >
                <span className="group-hover:underline">
                  Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah, Waru,
                  Sidoarjo, Jawa Timur 61256
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-bracket-border font-medium mt-1">
                  <span translate="no" className="material-symbols-outlined notranslate text-[13px]">near_me</span>
                  Buka di Google Maps
                </span>
              </a>
              <div className="pt-space-2xs space-y-1.5">
                <p className="flex items-center gap-2">
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-bracket-border">
                    call
                  </span>
                  <span>031 866 7469 / 031 867 7468</span>
                </p>
                <p className="flex items-center gap-2">
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-action-whatsapp">
                    chat
                  </span>
                  <a
                    href="https://wa.me/6282231019363"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bracket-border transition-colors"
                  >
                    0822 3101 9363
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span translate="no" className="material-symbols-outlined notranslate text-[16px] text-accent-gold">
                    mail
                  </span>
                  <a
                    href="mailto:info@pelangiuv.com"
                    className="hover:text-bracket-border transition-colors"
                  >
                    info@pelangiuv.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Col 5: Media Sosial */}
          <div className="lg:col-span-1">
            <h3 className="font-headline-sm text-headline-sm text-on-secondary mb-space-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bracket-border"></span>
              Media Sosial
            </h3>
            <div className="flex items-center flex-wrap gap-2 mb-space-md">
              <a
                className="w-9 h-9 rounded-full bg-surface-canvas/10 hover:bg-bracket-border flex items-center justify-center transition-all text-on-secondary hover:scale-110"
                href="https://www.facebook.com/p/CV-Pelangi-UV-100088854224123/"
                rel="noopener noreferrer"
                target="_blank"
                title="Facebook Pelangi UV"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-canvas/10 hover:bg-bracket-border flex items-center justify-center transition-all text-on-secondary hover:scale-110"
                href="https://www.instagram.com/pelangi.uv/"
                rel="noopener noreferrer"
                target="_blank"
                title="Instagram Pelangi UV"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-canvas/10 hover:bg-bracket-border flex items-center justify-center transition-all text-on-secondary hover:scale-110"
                href="https://www.tiktok.com/@pelangi.uv"
                rel="noopener noreferrer"
                target="_blank"
                title="TikTok Pelangi UV"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.03 3.32-1.46 3.42-3.27.06-1.37.03-2.75.03-4.12V0l-.17.02z"></path>
                </svg>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-canvas/10 hover:bg-bracket-border flex items-center justify-center transition-all text-on-secondary hover:scale-110"
                href="https://www.youtube.com/@pelangi_uv/videos"
                rel="noopener noreferrer"
                target="_blank"
                title="YouTube Pelangi UV"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-canvas/10 hover:bg-bracket-border flex items-center justify-center transition-all text-on-secondary hover:scale-110"
                href="https://www.linkedin.com/company/cv-pelangi-uv"
                rel="noopener noreferrer"
                target="_blank"
                title="LinkedIn Pelangi UV"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
            <p className="font-label-meta text-label-meta text-surface-dim">
              Buka: Senin - Jumat (07.30 - 15.30 WIB) &bull; Sabtu (07.30 - 13.00 WIB)
            </p>
          </div>
        </div>

        {/* Bottom copyright line with gradient border */}
        <div
          className="pt-space-md border-t border-surface-canvas/10 flex flex-col md:flex-row items-center justify-between gap-space-sm text-surface-dim font-body-sm text-body-sm"
          style={{
            borderTop: "1px solid",
            borderImage:
              "linear-gradient(90deg, rgba(230, 33, 41, 0.6) 0%, rgba(254, 209, 0, 0.6) 50%, rgba(0, 155, 76, 0.6) 100%) 1 / 1 / 0 stretch",
          }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <p>
              Hak Cipta © 2026 <span translate="no" className="notranslate">Pelangi UV</span>. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-bracket-border transition-colors">
              Kebijakan Privasi
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-bracket-border transition-colors">
              Syarat &amp; Ketentuan
            </a>
          </div>
          <p className="font-label-meta text-label-meta text-surface-dim/80 text-xs">
            <span translate="no" className="notranslate">When Quality Be A Priority</span> • Modern Industrial Print Finishing
          </p>
        </div>
      </div>
    </footer>
  );
}
