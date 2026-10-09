"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CareerJob } from "@/data/careers";
import KarirApplyModal from "@/components/sections/karir/KarirApplyModal";

interface KarirJobDetailClientProps {
  job: CareerJob;
  otherJobs: CareerJob[];
}

export default function KarirJobDetailClient({
  job,
  otherJobs,
}: KarirJobDetailClientProps) {
  const searchParams = useSearchParams();
  const autoApply = searchParams?.get("apply") === "true";
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(autoApply);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (autoApply) {
      setIsApplyModalOpen(true);
    }
  }, [autoApply]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href.split("?")[0];
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleShareWhatsApp = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href.split("?")[0];
    const text = encodeURIComponent(
      `Halo! CV Pelangi UV sedang membuka lowongan kerja untuk posisi *${job.title}* (${job.division}). Cek detail dan kirim lamaran langsung di sini:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const getDivisionBadgeColor = (division: string) => {
    switch (division) {
      case "Finance":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Marketing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Production":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Warehouse":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Operational":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-body font-sans antialiased selection:bg-bracket-border selection:text-white">
      {/* 1. Header & Breadcrumb Banner */}
      <section className="w-full bg-[#111111] text-white pt-10 pb-12 sm:pb-16 border-b border-white/10 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-bracket-border/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-40 bg-accent-gold/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-gutter relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/karir" className="hover:text-white transition-colors">
              Karir
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-white/90 font-medium truncate max-w-[240px] sm:max-w-md">
              {job.title}
            </span>
          </nav>

          {/* Title & Metadata Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getDivisionBadgeColor(
                    job.division
                  )}`}
                >
                  Divisi {job.division}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    job.isOpen
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-red-500/15 text-red-400 border-red-500/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      job.isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                    }`}
                  />
                  <span>{job.isOpen ? "Lowongan Dibuka" : "Lowongan Ditutup"}</span>
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>{job.type}</span>
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Bizpark Sidoarjo</span>
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                {job.title}
              </h1>

              <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                Penempatan kerja langsung di fasilitas produksi CV Pelangi UV — Kompleks Pergudangan Bizpark C17-C19, Tambaksawah, Waru, Sidoarjo.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0 sm:min-w-[220px]">
              {job.isOpen ? (
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full px-6 py-3 rounded-xl bg-bracket-border hover:bg-primary text-white font-bold text-sm transition-all shadow-lg hover:shadow-bracket-border/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Lamar Posisi Ini</span>
                </button>
              ) : (
                <div className="w-full px-5 py-3 rounded-xl bg-white/10 text-white/60 text-xs font-semibold text-center border border-white/10">
                  Posisi saat ini sedang ditutup
                </div>
              )}

              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Salin tautan lowongan ini"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedLink ? "check" : "link"}
                  </span>
                  <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold transition border border-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Bagikan lowongan ini ke WhatsApp"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>WA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-gutter py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Kualifikasi & Persyaratan */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-surface-container shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-container">
                <div className="w-10 h-10 rounded-2xl bg-bracket-border/10 text-bracket-border flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">checklist</span>
                </div>
                <div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-on-surface">
                    Kualifikasi &amp; Persyaratan
                  </h2>
                  <p className="text-xs text-text-muted">
                    Kriteria yang dibutuhkan untuk posisi {job.title}
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {job.qualifications && job.qualifications.length > 0 ? (
                  job.qualifications.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-body">
                      <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="leading-relaxed">{q}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-text-muted italic">
                    Kualifikasi detail dapat ditanyakan langsung pada saat proses wawancara.
                  </li>
                )}
              </ul>
            </div>

            {/* Tanggung Jawab Pekerjaan */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-surface-container shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-container">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">assignment</span>
                </div>
                <div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-on-surface">
                    Tanggung Jawab Pekerjaan
                  </h2>
                  <p className="text-xs text-text-muted">
                    Uraian tugas pokok dan ruang lingkup pekerjaan
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {job.responsibilities && job.responsibilities.length > 0 ? (
                  job.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-body">
                      <span className="material-symbols-outlined text-blue-600 text-lg shrink-0 mt-0.5">
                        task_alt
                      </span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-text-muted italic">
                    Tanggung jawab operasional akan disesuaikan dengan instruksi pimpinan divisi.
                  </li>
                )}
              </ul>
            </div>

            {/* Benefit & Keuntungan Bergabung */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-surface-neutral-alt border border-surface-container shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-container">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-on-surface">
                    Benefit &amp; Fasilitas Karyawan
                  </h2>
                  <p className="text-xs text-text-muted">
                    Keuntungan berkarier bersama CV Pelangi UV
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-bracket-border text-xl shrink-0">payments</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Gaji Pokok &amp; Lembur Resmi</h4>
                    <p className="text-xs text-text-muted mt-0.5">Perhitungan lembur proporsional tepat waktu setiap periode penggajian.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-bracket-border text-xl shrink-0">health_and_safety</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">BPJS Kesehatan &amp; Ketenagakerjaan</h4>
                    <p className="text-xs text-text-muted mt-0.5">Jaminan perlindungan kerja dan kesehatan bagi karyawan tetap.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-bracket-border text-xl shrink-0">trending_up</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Jenjang Karir Terbuka</h4>
                    <p className="text-xs text-text-muted mt-0.5">Peluang peningkatan level dari staf/operator hingga pimpinan regu (leader).</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-bracket-border text-xl shrink-0">groups</span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Kekeluargaan &amp; Gathering</h4>
                    <p className="text-xs text-text-muted mt-0.5">Suasana kerja solid, makan siang bersama, dan kegiatan tahunan tim.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tahapan Seleksi */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-surface-container shadow-xs">
              <h3 className="font-heading font-extrabold text-lg text-on-surface mb-4">
                Tahapan Rekrutmen di CV Pelangi UV
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                {[
                  { step: "01", title: "Seleksi Berkas", desc: "Skrining CV" },
                  { step: "02", title: "Psikotes", desc: "DISC & PAPI" },
                  { step: "03", title: "Wawancara", desc: "HR & User" },
                  { step: "04", title: "Tes Praktik", desc: "Uji Keterampilan" },
                  { step: "05", title: "Offering", desc: "Kontrak Kerja" },
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-surface-neutral-alt border border-surface-container flex flex-col justify-between">
                    <span className="font-mono text-xs font-bold text-bracket-border">{item.step}</span>
                    <h5 className="font-bold text-xs text-on-surface my-1">{item.title}</h5>
                    <p className="text-[11px] text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (1/3) */}
          <div className="space-y-6">
            {/* Kartu Ringkasan Posisi & Tombol Lamar */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-surface-container shadow-md sticky top-28 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-bracket-border">
                  Ringkasan Lowongan
                </span>
                <h3 className="font-heading font-extrabold text-xl text-on-surface mt-1">
                  {job.title}
                </h3>
              </div>

              <div className="space-y-3.5 text-xs pb-4 border-b border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Divisi:</span>
                  <span className="font-bold text-on-surface">{job.division}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Tipe Pekerjaan:</span>
                  <span className="font-bold text-on-surface">{job.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Lokasi Penempatan:</span>
                  <span className="font-bold text-on-surface text-right">Bizpark Sidoarjo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Status:</span>
                  <span
                    className={`font-bold ${
                      job.isOpen ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {job.isOpen ? "Aktif Menerima Lamaran" : "Sudah Ditutup"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {job.isOpen ? (
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-bracket-border hover:bg-primary text-white font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Isi Formulir Lamaran</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-3 px-4 rounded-xl bg-surface-container text-text-muted font-bold text-xs cursor-not-allowed"
                >
                  Lowongan Sedang Ditutup
                </button>
              )}

              <div className="p-4 rounded-2xl bg-surface-neutral-alt border border-surface-container space-y-2 text-xs">
                <div className="flex items-center gap-2 text-on-surface font-bold">
                  <span className="material-symbols-outlined text-bracket-border text-lg">support_agent</span>
                  <span>Butuh Pertanyaan?</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  Tim Rekrutmen CV Pelangi UV siap membantu setiap hari kerja (Senin - Sabtu 08.00 - 17.00 WIB).
                </p>
                <a
                  href="https://wa.me/6282231019363?text=Halo%20HRD%20CV%20Pelangi%20UV,%20saya%20ingin%20bertanya%20seputar%20lowongan%20kerja."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-bracket-border hover:underline font-semibold text-xs pt-1"
                >
                  <span>Hubungi via WhatsApp</span>
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/karir"
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-neutral-alt hover:bg-surface-container text-text-body font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Kembali ke Semua Lowongan</span>
                </Link>
              </div>
            </div>

            {/* Rekomendasi Lowongan Lainnya */}
            {otherJobs && otherJobs.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-surface-container shadow-xs space-y-4">
                <h4 className="font-heading font-extrabold text-sm text-on-surface uppercase tracking-wider">
                  Posisi Terbuka Lainnya
                </h4>
                <div className="space-y-3">
                  {otherJobs.slice(0, 3).map((oj) => (
                    <Link
                      key={oj.id}
                      href={`/karir/${oj.id}`}
                      className="block p-3.5 rounded-2xl hover:bg-surface-neutral-alt border border-transparent hover:border-surface-container transition-all group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-text-muted mb-1">
                        <span>{oj.division}</span>
                        <span className="text-bracket-border font-semibold group-hover:underline">Detail →</span>
                      </div>
                      <h5 className="font-bold text-xs text-on-surface group-hover:text-bracket-border transition-colors line-clamp-1">
                        {oj.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Modal Form Lamaran */}
      <KarirApplyModal
        job={isApplyModalOpen ? job : null}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
