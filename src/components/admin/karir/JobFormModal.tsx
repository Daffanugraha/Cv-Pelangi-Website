"use client";

import React, { useState, useEffect } from "react";
import AdminModal from "../AdminModal";
import type { CareerJobItem } from "@/lib/admin/db";

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingJob: CareerJobItem | null;
  onSave: (payload: {
    title: string;
    division: CareerJobItem["division"];
    isOpen: boolean;
    qualifications: string[];
    responsibilities: string[];
  }) => Promise<void>;
  saving: boolean;
}

const DIVISIONS: CareerJobItem["division"][] = [
  "Production",
  "Operational",
  "Marketing",
  "Finance",
  "Warehouse",
];

export default function JobFormModal({
  isOpen,
  onClose,
  editingJob,
  onSave,
  saving,
}: JobFormModalProps) {
  const [formTitle, setFormTitle] = useState("");
  const [formDivision, setFormDivision] = useState<CareerJobItem["division"]>("Production");
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [newQualInput, setNewQualInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newRespInput, setNewRespInput] = useState("");

  useEffect(() => {
    if (editingJob) {
      setFormTitle(editingJob.title);
      setFormDivision(editingJob.division);
      setFormIsOpen(editingJob.isOpen);
      setQualifications(editingJob.qualifications || []);
      setResponsibilities(editingJob.responsibilities || []);
    } else {
      setFormTitle("");
      setFormDivision("Production");
      setFormIsOpen(true);
      setQualifications([]);
      setResponsibilities([]);
    }
    setNewQualInput("");
    setNewRespInput("");
  }, [editingJob, isOpen]);

  const handleAddQual = () => {
    if (newQualInput.trim()) {
      setQualifications([...qualifications, newQualInput.trim()]);
      setNewQualInput("");
    }
  };

  const handleRemoveQual = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const handleAddResp = () => {
    if (newRespInput.trim()) {
      setResponsibilities([...responsibilities, newRespInput.trim()]);
      setNewRespInput("");
    }
  };

  const handleRemoveResp = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    await onSave({
      title: formTitle.trim(),
      division: formDivision,
      isOpen: formIsOpen,
      qualifications,
      responsibilities,
    });
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingJob ? "Edit Lowongan Pekerjaan" : "Tambah Lowongan Baru"}
      subtitle="Atur posisi, divisi, kualifikasi persyaratan, dan status publikasi website."
      maxWidth="2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !formTitle.trim()}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#F65456] hover:bg-[#d61e1b] rounded-xl shadow-md transition cursor-pointer disabled:opacity-50 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>{saving ? "Menyimpan..." : "Simpan Lowongan"}</span>
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Judul Posisi Lowongan *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Operator Mesin Foil & Emboss"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Divisi Pekerjaan
            </label>
            <select
              value={formDivision}
              onChange={(e) => setFormDivision(e.target.value as any)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#F65456]"
            >
              {DIVISIONS.map((d) => (
                <option key={d} value={d}>
                  Divisi {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Status Publikasi
            </label>
            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={formIsOpen}
                  onChange={(e) => setFormIsOpen(e.target.checked)}
                  className="w-4 h-4 rounded text-[#F65456] focus:ring-[#F65456]"
                />
                <span>Aktifkan &amp; Tayangkan di Website</span>
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Qualifications List */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Syarat &amp; Kualifikasi Kandidat
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Tambahkan kualifikasi... lalu tekan Tambah"
              value={newQualInput}
              onChange={(e) => setNewQualInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddQual();
                }
              }}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#F65456]"
            />
            <button
              type="button"
              onClick={handleAddQual}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold cursor-pointer"
            >
              Tambah
            </button>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {qualifications.map((q, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700"
              >
                <span>{q}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQual(idx)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Responsibilities List */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            Tanggung Jawab Pekerjaan
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Tambahkan tanggung jawab... lalu tekan Tambah"
              value={newRespInput}
              onChange={(e) => setNewRespInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddResp();
                }
              }}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#F65456]"
            />
            <button
              type="button"
              onClick={handleAddResp}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold cursor-pointer"
            >
              Tambah
            </button>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {responsibilities.map((r, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700"
              >
                <span>{r}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveResp(idx)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
