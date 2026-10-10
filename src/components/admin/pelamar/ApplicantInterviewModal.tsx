"use client";

import React, { useState, useMemo } from "react";
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

  // Default tanggal besok
  const defaultDateStr = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
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
    return `${days[tomorrow.getDay()]}, ${tomorrow.getDate()} ${months[tomorrow.getMonth()]} ${tomorrow.getFullYear()}`;
  }, []);

  const [interviewDate, setInterviewDate] = useState(defaultDateStr);
  const [interviewTime, setInterviewTime] = useState("09.00 WIB");
  const [interviewAddress, setInterviewAddress] = useState(
    "Kompleks Pergudangan Bizzpark No C3, Tambak Sawah (Laporan ke Security dahulu)"
  );
  const [contactPerson, setContactPerson] = useState("08563444213 - Dliyauddin");

  if (!applicant) return null;

  // Template undangan resmi sesuai arahan user (GRC dihilangkan, form data diri dihilangkan)
  const interviewMessage = `Hai ${applicant.name},
Berdasarkan CV saudara, kami mengundang saudara pada:

Hari : ${interviewDate}
Pukul : ${interviewTime}
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

  const handleCopy = () => {
    navigator.clipboard.writeText(interviewMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWA = () => {
    const phoneClean = applicant.phone.replace(/^0/, "62").replace(/\D/g, "");
    window.open(
      `https://wa.me/${phoneClean}?text=${encodeURIComponent(interviewMessage)}`,
      "_blank"
    );
  };

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title="Undang Interview Kandidat"
      subtitle={`Template resmi undangan wawancara kerja untuk ${applicant.name} (${applicant.jobTitle})`}
      maxWidth="2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">content_copy</span>
            <span>{copied ? "Tersalin!" : "Salin Pesan"}</span>
          </button>
          <button
            type="button"
            onClick={handleSendWA}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>Kirim via WhatsApp</span>
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Pengaturan Jadwal & Lokasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Hari &amp; Tanggal:</label>
            <input
              type="text"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              placeholder="cth. Kamis, 24 September 2026"
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Pukul / Waktu:</label>
            <input
              type="text"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              placeholder="cth. 09.00 WIB"
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Alamat Penempatan Interview:</label>
            <input
              type="text"
              value={interviewAddress}
              onChange={(e) => setInterviewAddress(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#F65456]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Kontak Konfirmasi HRD:</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#F65456]"
            />
          </div>
        </div>

        {/* Pratinjau Teks WhatsApp */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-600">chat</span>
              <span>Pratinjau Pesan WhatsApp:</span>
            </label>
            <span className="text-[11px] text-gray-500 font-mono">CV Pelangi UV</span>
          </div>
          <textarea
            readOnly
            value={interviewMessage}
            rows={13}
            className="w-full p-3.5 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:outline-none text-gray-800 resize-none leading-relaxed shadow-2xs"
          />
        </div>
      </div>
    </AdminModal>
  );
}
