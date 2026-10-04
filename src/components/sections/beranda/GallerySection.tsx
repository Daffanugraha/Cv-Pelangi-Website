"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { galleryVideos } from "@/lib/data";

type VideoItem = (typeof galleryVideos)[0] & {
  id?: string;
  shortcode?: string;
  date?: string;
};

export default function GallerySection() {
  const [videos, setVideos] = useState<VideoItem[]>(galleryVideos);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Ambil data video terbaru dari API Instagram secara background
  useEffect(() => {
    async function loadLatestReels() {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setVideos(json.data);
          }
        }
      } catch (err) {
        console.warn("Gagal memuat feed Instagram:", err);
      }
    }
    loadLatestReels();
  }, []);

  // Kunci scroll body saat modal video terbuka
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  // Dukungan keyboard ESC untuk menutup modal video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      className="w-full bg-surface-canvas py-space-3xl relative"
      id="galeri"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-label-meta text-label-meta uppercase tracking-widest text-bracket-border font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-bracket-border rounded-full"></span>
                <span translate="no" className="notranslate">Pelangi UV</span> Reels &amp; Video Media
              </span>
            </div>

            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
              Galeri Video &amp; Sorotan Produksi
            </h2>
            <p className="font-body-md text-body-md text-text-muted mt-1 max-w-2xl">
              Dokumentasi mesin finishing, proses produksi, dan edukasi teknik cetak dari <span translate="no" className="notranslate">CV Pelangi UV</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Tautan ke Galeri Momen & Kegiatan */}
            <Link
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bracket-border hover:bg-primary text-white font-cta-pill text-[13px] font-semibold transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group"
              href="/galeri"
            >
              <span translate="no" className="material-symbols-outlined notranslate text-[17px]">photo_library</span>
              <span>Galeri Foto &amp; Momen</span>
              <span translate="no" className="material-symbols-outlined notranslate text-[16px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
            </Link>

            {/* Tautan Profil Resmi Instagram */}
            <a
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navbar-black hover:bg-bracket-border text-white font-cta-pill text-[13px] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group"
              href="https://www.instagram.com/pelangi.uv/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
              <span>Follow @pelangi.uv</span>
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {videos.map((video, idx) => (
            <div
              key={video.id || video.shortcode || idx}
              onClick={() => setActiveVideo(video)}
              className="bg-surface-canvas rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-surface-container transition-all duration-300 hover:-translate-y-1.5 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navbar-black">
                <img
                  src={video.img}
                  alt={video.title}
                  onError={(e) => {
                    // Fallback aman jika link eksternal kedaluwarsa
                    e.currentTarget.src = "/images/instagram/DdYdcznzLJY.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88] group-hover:brightness-[0.78]"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-meta text-[11px] font-bold border border-white/20 shadow-sm flex items-center gap-1">
                    📷 Instagram Reels
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-bracket-border text-white font-label-meta text-[11px] font-bold shadow-sm">
                    {video.tag}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 rounded-full bg-bracket-border/90 hover:bg-bracket-border text-white flex items-center justify-center shadow-[0_4px_22px_rgba(246,84,86,0.7)] group-hover:scale-115 transition-all duration-300">
                    <span translate="no" className="material-symbols-outlined notranslate text-[28px] ml-0.5">
                      play_arrow
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-surface-bright text-[11px] font-label-meta font-medium">
                  {video.duration}
                </div>
              </div>

              <div className="p-space-md flex flex-col justify-between flex-1">
                <div className="mb-space-sm">
                  <h3 className="font-headline-sm text-[16px] font-bold text-on-surface group-hover:text-bracket-border transition-colors leading-snug mb-1">
                    {video.title}
                  </h3>
                  <p className="font-body-sm text-[13px] text-text-body line-clamp-2 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
                <div className="pt-space-xs border-t border-surface-container flex items-center justify-between">
                  <span className="font-label-meta text-xs text-text-muted">
                    {video.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1 font-cta-pill text-xs font-semibold text-bracket-border group-hover:text-primary transition-colors">
                    <span>Putar di Website</span>
                    <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                      play_circle
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Video Player Modal Pop-up */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[420px] bg-[#121417] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col my-auto transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 bg-gradient-to-r from-navbar-black to-[#1a1c22] border-b border-white/10 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-bracket-border shrink-0 animate-pulse"></span>
                <h4 className="font-headline-sm text-[14px] font-bold truncate">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shrink-0"
                aria-label="Tutup Video"
                title="Tutup (ESC)"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[18px]">close</span>
              </button>
            </div>

            {/* Video Frame Area */}
            <div className="relative w-full aspect-[9/16] max-h-[580px] bg-black flex items-center justify-center overflow-hidden">
              {activeVideo.embedUrl ? (
                <iframe
                  src={activeVideo.embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={activeVideo.title}
                ></iframe>
              ) : (
                <div className="p-6 text-center text-white">
                  <p className="text-sm mb-3">Video dapat ditonton langsung di akun resmi kami.</p>
                  <a
                    href={activeVideo.videoUrl || "https://www.instagram.com/pelangi.uv/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bracket-border text-white text-xs font-semibold"
                  >
                    Buka di Instagram
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3 bg-[#181a1f] border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
              <a
                href={activeVideo.videoUrl || "https://www.instagram.com/pelangi.uv/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>Buka di Instagram</span>
                <span translate="no" className="material-symbols-outlined notranslate text-[13px]">open_in_new</span>
              </a>
              <a
                href={`https://wa.me/6282231019363?text=${encodeURIComponent(
                  `Halo Tim Marketing CV Pelangi UV,\n\nSaya [Nama] dari [Perusahaan], mau tanya tentang contoh hasil finishing: *${activeVideo.title}*.\n\nSpesifikasi Kebutuhan (opsional):\n- Estimasi Oplah: \n- Catatan Spesifikasi: \n\nMohon informasi penawaran harga & estimasi jadwal pengerjaan. Terima kasih!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-action-whatsapp text-white text-[11px] font-semibold hover:bg-action-whatsapp-hover transition-all shadow-sm"
              >
                <span>Tanya CS Teknis</span>
                <span translate="no" className="material-symbols-outlined notranslate text-[13px]">chat</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
