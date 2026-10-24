"use client";

import React, { useState, useEffect } from "react";
import AdminModal from "../AdminModal";
import type { JobApplicantItem } from "@/lib/admin/db";

interface ApplicantRejectionModalProps {
  applicant: JobApplicantItem | null;
  onClose: () => void;
}

export default function ApplicantRejectionModal({
  applicant,
  onClose,
}: ApplicantRejectionModalProps) {
  const [copied, setCopied] = useState(false);
  const [hrName, setHrName] = useState("Tim HRD CV Pelangi UV");
  const [message, setMessage] = useState("");
  const [isCustomized, setIsCustomized] = useState(false);

  const buildDefaultMessage = (app: JobApplicantItem, hr: string) => {
    return `Halo ${app.name},

Terima kasih atas minat dan antusiasme Anda dalam melamar posisi *${app.jobTitle}* di CV Pelangi UV melalui website resmi kami.

Setelah meninjau berkas lamaran dan profil yang Anda kirimkan dengan seksama, kami menginformasikan bahwa untuk saat ini kami belum dapat melanjutkan proses rekrutmen Anda ke tahap berikutnya karena kualifikasi yang dibutuhkan saat ini belum sesuai dengan kebutuhan posisi tersebut.

Profil dan berkas Anda tetap tersimpan dalam database kami untuk peluang kesempatan kerja di masa mendatang apabila ada posisi yang sesuai dengan keahlian Anda.

Kami sangat menghargai waktu serta dedikasi yang telah Anda berikan, dan mendoakan yang terbaik bagi perjalanan karir Anda ke depannya.

Salam hangat,
${hr || "Tim HRD CV Pelangi UV"}`;
  };

  useEffect(() => {
    if (applicant && !isCustomized) {
      setMessage(buildDefaultMessage(applicant, hrName));
    }
  }, [applicant, hrName, isCustomized]);

  if (!applicant) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWA = () => {
    const phoneClean = applicant.phone.replace(/^0/, "62").replace(/\D/g, "");
    window.open(
      `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleOpenGmailCompose = () => {
    const targetEmail = (applicant.email || "").trim();
    const subject = `Pemberitahuan Status Lamaran (${applicant.jobTitle}) - CV Pelangi UV`;
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(composeUrl, "_blank");
  };

  const handleReset = () => {
    setMessage(buildDefaultMessage(applicant, hrName));
    setIsCustomized(false);
  };

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title="Pemberitahuan Status Lamaran"
      subtitle={`${applicant.name} • Posisi: ${applicant.jobTitle}`}
      maxWidth="xl"
      footer={
        <div className="w-full flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              <span>{copied ? "Tersalin!" : "Salin Teks"}</span>
            </button>

            <button
              type="button"
              onClick={handleSendWA}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Kirim via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleOpenGmailCompose}
              className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
              title="Buka langsung di Gmail dengan pesan dan penerima terisi otomatis"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Kirim via Gmail</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Info Pelamar & Pengirim */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="font-bold text-gray-800">Status: Ditolak (Belum Sesuai)</span>
            </div>
            <div className="text-[11px] text-gray-500">
              {applicant.email && <span>{applicant.email} • </span>}
              <span>{applicant.phone}</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Nama Pengirim (HRD):</label>
            <input
              type="text"
              value={hrName}
              onChange={(e) => {
                setHrName(e.target.value);
                if (!isCustomized) {
                  setMessage(buildDefaultMessage(applicant, e.target.value));
                }
              }}
              placeholder="cth: Tim HRD CV Pelangi UV"
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-800 text-xs"
            />
          </div>
        </div>

        {/* Textarea Pesan */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-gray-700">
              Isi Pesan:
            </label>
            {isCustomized && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-semibold text-gray-500 hover:text-[#F65456] transition cursor-pointer"
              >
                Reset ke Teks Standar
              </button>
            )}
          </div>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsCustomized(true);
            }}
            rows={12}
            className="w-full p-3.5 text-xs font-sans bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-800 resize-none leading-relaxed shadow-2xs"
            placeholder="Tulis pesan..."
          />
        </div>
      </div>
    </AdminModal>
  );
}
