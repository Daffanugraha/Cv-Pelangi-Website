"use client";

import React, { useState, useMemo, useEffect } from "react";
import AdminModal from "../AdminModal";
import type { JobApplicantItem } from "@/lib/admin/db";

interface ApplicantInterviewModalProps {
  applicant: JobApplicantItem | null;
  onClose: () => void;
}

export default function ApplicantInterviewModal({
  applicant,
  onClose,
}: ApplicantInterviewModalProps) {
  const [copied, setCopied] = useState(false);

  // Default tanggal besok format YYYY-MM-DD
  const defaultDateRaw = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const d = String(tomorrow.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  const [interviewDateRaw, setInterviewDateRaw] = useState(defaultDateRaw);
  const [interviewTimeRaw, setInterviewTimeRaw] = useState("09:00");
  const [hrName, setHrName] = useState("Dliyauddin");
  const [contactPerson, setContactPerson] = useState("08563444213 - Dliyauddin");
  const [interviewAddress, setInterviewAddress] = useState(
    "Kompleks Pergudangan Bizpark Blok C17-C19, Tambak Sawah, Kec. Waru, Kabupaten Sidoarjo (Laporan ke Security dahulu)"
  );

  // Format tanggal ke Bahasa Indonesia (cth: Kamis, 24 September 2026)
  const formattedDate = useMemo(() => {
    if (!interviewDateRaw) return "";
    const [y, m, d] = interviewDateRaw.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${days[dt.getDay()]}, ${d} ${months[m - 1]} ${y}`;
  }, [interviewDateRaw]);

  // Format waktu jam dan menit (cth: 09.00 WIB)
  const formattedTime = useMemo(() => {
    if (!interviewTimeRaw) return "09.00 WIB";
    const [hh, mm] = interviewTimeRaw.split(":");
    return `${hh}.${mm} WIB`;
  }, [interviewTimeRaw]);

  // Template pesan resmi gabungan CV Pelangi UV
  const defaultMessage = useMemo(() => {
    if (!applicant) return "";

    return `Halo ${applicant.name},

Perkenalkan saya ${hrName.trim() || "dari HRD"} dari CV PELANGI. Kami sudah menerima lamaran Anda untuk lowongan *${applicant.jobTitle}* yang Anda kirimkan melalui website kami (pelangiuv.com/karir) dan ingin melanjutkan proses rekrutmen ke tahap selanjutnya.

Lamaran kamu yang kami terima:
• Posisi: ${applicant.jobTitle}
• No. Referensi: #${applicant.id}
• Status: Lolos Seleksi Berkas

Berdasarkan berkas yang kami terima, kami mengundang saudara pada:

Hari : ${formattedDate}
Pukul : ${formattedTime}
Alamat : ${interviewAddress}

Mohon melakukan pengisian Tes:
1. Tes DISC : https://psycho.cahyadsn.com/disc_id/ 
2. Papi Kostik : https://bit.ly/cvgrc-psikotest
3. Tes Buta Warna : https://forms.gle/X2RRiMFXKdqHtMDSA
(Hasil tes DISC bisa di screenshoot ya, grafik dan hasil analisa nya)

Terima kasih atas waktunya.
Harap konfirmasi hadir / tidak melalui chat WA (${contactPerson})

Regards,
HRD CV Pelangi UV`;
  }, [applicant, hrName, formattedDate, formattedTime, interviewAddress, contactPerson]);

  const [message, setMessage] = useState(defaultMessage);
  const [isCustomized, setIsCustomized] = useState(false);

  // Sync saat data default berubah (jika admin belum manual edit)
  useEffect(() => {
    if (!isCustomized) {
      setMessage(defaultMessage);
    }
  }, [defaultMessage, isCustomized]);

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
    const subject = `Undangan Wawancara Kerja & Tahap Selanjutnya (${applicant.jobTitle}) - CV Pelangi UV`;
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(composeUrl, "_blank");
  };

  const handleReset = () => {
    setMessage(defaultMessage);
    setIsCustomized(false);
  };

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title="Lanjut Tahap Selanjutnya (Undangan & Tes)"
      subtitle={`${applicant.name} • Posisi: ${applicant.jobTitle}`}
      maxWidth="2xl"
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
        {/* Pengaturan Detail Undangan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Nama Pengirim (HRD):</label>
            <input
              type="text"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
              placeholder="cth: Dliyauddin"
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Kontak Konfirmasi (WA):</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="cth: 08563444213 - Dliyauddin"
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Tanggal Wawancara:</label>
            <input
              type="date"
              value={interviewDateRaw}
              onChange={(e) => setInterviewDateRaw(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Waktu / Jam:</label>
            <input
              type="time"
              value={interviewTimeRaw}
              onChange={(e) => setInterviewTimeRaw(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Lokasi Wawancara:</label>
            <input
              type="text"
              value={interviewAddress}
              onChange={(e) => setInterviewAddress(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
        </div>

        {/* Pratinjau & Edit Teks Pesan */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <span>Pratinjau Pesan Undangan (Bisa diedit langsung):</span>
              {isCustomized && (
                <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  Telah diedit manual
                </span>
              )}
            </label>
            {isCustomized && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Reset ke Template
              </button>
            )}
          </div>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsCustomized(true);
            }}
            rows={15}
            className="w-full p-3.5 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456] text-gray-900 resize-none leading-relaxed shadow-2xs"
          />
        </div>
      </div>
    </AdminModal>
  );
}
