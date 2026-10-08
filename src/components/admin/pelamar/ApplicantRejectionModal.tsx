"use client";

import React, { useState } from "react";
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

  if (!applicant) return null;

  const rejectionMessage = `Halo ${applicant.name},

Terima kasih atas minat dan waktu yang Anda luangkan untuk melamar posisi ${applicant.jobTitle} di CV Pelangi UV.

Setelah melalui proses peninjauan berkas yang seksama, kami menginformasikan bahwa saat ini kami belum dapat melanjutkan lamaran Anda ke tahap berikutnya karena kualifikasi yang kami butuhkan saat ini belum sepenuhnya sesuai dengan profil Anda.

Profil Anda akan tetap tersimpan di database kami untuk kesempatan mendatang jika ada posisi yang lebih cocok. Kami mendoakan yang terbaik untuk kesuksesan karir Anda ke depannya.

Salam hangat,
Tim HRD CV Pelangi UV`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rejectionMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWA = () => {
    const phoneClean = applicant.phone.replace(/^0/, "62").replace(/\D/g, "");
    window.open(
      `https://wa.me/${phoneClean}?text=${encodeURIComponent(rejectionMessage)}`,
      "_blank"
    );
  };

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title="Template Pesan Penolakan Sopan"
      subtitle={`Kirim pesan penolakan yang profesional kepada ${applicant.name} via WhatsApp.`}
      maxWidth="xl"
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
            <span>{copied ? "Tersalin!" : "Salin Teks"}</span>
          </button>
          <button
            type="button"
            onClick={handleSendWA}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>Buka di WhatsApp</span>
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block text-xs font-bold text-gray-700">
          Pratinjau Pesan yang Akan Dikirim:
        </label>
        <textarea
          readOnly
          value={rejectionMessage}
          rows={11}
          className="w-full p-3.5 text-xs font-mono bg-gray-50 border border-gray-300 rounded-xl focus:outline-none text-gray-800 resize-none leading-relaxed"
        />
      </div>
    </AdminModal>
  );
}
