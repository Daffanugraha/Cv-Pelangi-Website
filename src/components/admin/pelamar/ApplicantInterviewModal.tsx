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

  // State Pengiriman Email Langsung (maharbasuki@gmail.com)
  const [emailRecipient, setEmailRecipient] = useState(applicant?.email || "");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [showAppPasswordInput, setShowAppPasswordInput] = useState(false);
  const [appPassword, setAppPassword] = useState("");

  useEffect(() => {
    if (applicant?.email) {
      setEmailRecipient(applicant.email);
    }
    const savedPass = localStorage.getItem("pelangi_gmail_app_pass");
    if (savedPass) {
      setAppPassword(savedPass);
    }
    setEmailSuccessMsg("");
    setEmailErrorMsg("");
  }, [applicant]);

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

  async function handleSendEmailDirect() {
    if (!applicant) return;
    if (!emailRecipient.trim()) {
      setEmailErrorMsg("Email pelamar belum diisi.");
      return;
    }

    setEmailSending(true);
    setEmailErrorMsg("");
    setEmailSuccessMsg("");

    try {
      const res = await fetch("/api/admin/applicants/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailRecipient.trim(),
          subject: `Undangan Wawancara Kerja (${applicant.jobTitle}) - CV Pelangi UV`,
          text: interviewMessage,
          appPassword: appPassword.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setEmailSuccessMsg(data.message || `Email berhasil dikirim ke ${emailRecipient}!`);
        if (appPassword.trim()) {
          localStorage.setItem("pelangi_gmail_app_pass", appPassword.trim());
        }
        setShowAppPasswordInput(false);
      } else {
        if (data.needAppPassword) {
          setShowAppPasswordInput(true);
        }
        setEmailErrorMsg(data.error || "Gagal mengirim email.");
      }
    } catch (err: any) {
      setEmailErrorMsg(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setEmailSending(false);
    }
  }

  return (
    <AdminModal
      isOpen={!!applicant}
      onClose={onClose}
      title="Undang Interview Kandidat"
      subtitle={`Kirim undangan wawancara resmi kepada ${applicant.name} (${applicant.jobTitle})`}
      maxWidth="3xl"
      footer={
        <div className="w-full flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              <span>{copied ? "Tersalin!" : "Salin Teks"}</span>
            </button>

            <button
              type="button"
              onClick={handleSendWA}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Kirim via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmailDirect}
              disabled={emailSending}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#F65456] hover:bg-[#E03F41] rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {emailSending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Mengirim Email...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Kirim Email Langsung</span>
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Notifikasi Hasil Kirim Email */}
        {emailSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
            <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
            <span>{emailSuccessMsg}</span>
          </div>
        )}

        {emailErrorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-base">error</span>
              <span>Gagal Kirim Email:</span>
            </div>
            <p className="text-[11px] leading-relaxed">{emailErrorMsg}</p>
          </div>
        )}

        {/* Input Sandi Aplikasi Gmail jika dibutuhkan */}
        {showAppPasswordInput && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <span className="material-symbols-outlined text-base">key</span>
              <span>Masukkan Sandi Aplikasi (App Password) Gmail maharbasuki@gmail.com</span>
            </div>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Google mewajibkan 16 karakter <b>Sandi Aplikasi</b> agar sistem dapat mengirim email otomatis tanpa membuka browser.
              Dapat dibuat di:{" "}
              <a
                href="https://myaccount.google.com/apppasswords"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-amber-900"
              >
                myaccount.google.com/apppasswords
              </a>{" "}
              (pilih Nama: <i>Website Pelangi</i>).
            </p>
            <div className="flex gap-2 pt-1">
              <input
                type="password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                placeholder="cth. abcd efgh ijkl mnop (16 karakter)"
                className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs font-mono text-gray-900 focus:outline-none focus:border-[#F65456]"
              />
              <button
                type="button"
                onClick={handleSendEmailDirect}
                disabled={!appPassword.trim() || emailSending}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer disabled:opacity-50"
              >
                Simpan &amp; Kirim Sekarang
              </button>
            </div>
          </div>
        )}

        {/* Bar Info Pengirim & Penerima Email */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-gray-500 font-mono block">Email Pengirim:</span>
            <span className="font-bold text-gray-900 font-mono">maharbasuki@gmail.com</span>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 font-mono block">Email Pelamar (Tujuan):</span>
            <input
              type="email"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              placeholder="nama@email.com"
              className="w-full mt-0.5 px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-mono text-gray-900 focus:outline-none focus:border-[#F65456]"
            />
          </div>
        </div>

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

        {/* Pratinjau Teks Pesan */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#F65456]">drafts</span>
              <span>Pratinjau Pesan Undangan (Email &amp; WhatsApp):</span>
            </label>
            <span className="text-[11px] text-gray-500 font-mono">CV Pelangi UV</span>
          </div>
          <textarea
            readOnly
            value={interviewMessage}
            rows={12}
            className="w-full p-3.5 text-xs font-mono bg-white border border-gray-300 rounded-xl focus:outline-none text-gray-800 resize-none leading-relaxed shadow-2xs"
          />
        </div>
      </div>
    </AdminModal>
  );
}
