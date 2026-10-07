"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { GalleryItem, LeadItem } from "@/lib/admin/db";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}

function StatCard({ icon, label, value, color, sub }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-bracket-border/40 transition-all shadow-xs group">
      <div className="flex items-center justify-between mb-3">
        <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
      </div>
      <p className="text-3xl font-heading font-extrabold text-gray-900 tracking-tight">{value}</p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1 font-mono">{sub}</p>}
    </div>
  );
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-red-50 text-red-700 border border-red-200" },
  contacted: { label: "Sudah Dihubungi", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  sample_sent: { label: "Sampel Terkirim", color: "bg-purple-50 text-purple-700 border border-purple-200" },
  closed: { label: "Closed / Order", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
};

export default function DashboardPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [gRes, lRes] = await Promise.all([
        fetch("/api/admin/gallery"),
        fetch("/api/admin/leads"),
      ]);

      if (gRes.status === 401 || lRes.status === 401) {
        router.push("/admin");
        return;
      }

      setGallery(await gRes.json());
      setLeads(await lRes.json());
      setLoading(false);
    }
    load();
  }, [router]);

  const newLeads = leads.filter((l) => l.status === "new").length;

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-bracket-border rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bracket-border/10 border border-bracket-border/20 text-bracket-border text-xs font-bold uppercase tracking-wider mb-2 font-mono">
          Ikhtisar Aktivitas
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 tracking-tight">
          Selamat datang kembali 👋
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 font-sans">
          Ringkasan aktivitas website, pesan calon klien, dan koleksi galeri finishing CV Pelangi UV.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="photo_library"
          label="Foto di Galeri"
          value={gallery.length}
          color="text-bracket-border"
        />
        <StatCard
          icon="inbox"
          label="Total Lead Masuk"
          value={leads.length}
          color="text-blue-600"
        />
        <StatCard
          icon="mark_unread_chat_alt"
          label="Lead Baru"
          value={newLeads}
          color="text-bracket-border"
          sub={newLeads > 0 ? "Butuh follow-up segera!" : "Semua sudah direspon ✓"}
        />
        <StatCard
          icon="star"
          label="Foto Featured"
          value={gallery.filter((g) => g.featured).length}
          color="text-amber-500"
          sub="Tampil di katalog unggulan"
        />
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-heading font-bold text-gray-900 text-base">Pesan Lead Terbaru</h2>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-bracket-border hover:underline transition"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {leads.slice(0, 5).map((lead) => {
              const s = STATUS_LABELS[lead.status] || STATUS_LABELS.new;
              return (
                <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {lead.company || "Perseorangan"} • {lead.service}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] px-2.5 py-1 rounded-full font-semibold ${s.color}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
            {leads.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-10 font-sans">
                Belum ada pesan lead masuk saat ini.
              </p>
            )}
          </div>
        </div>

        {/* Recent Gallery */}
        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-heading font-bold text-gray-900 text-base">Koleksi Galeri Terbaru</h2>
            <Link
              href="/admin/galeri"
              className="text-xs font-semibold text-bracket-border hover:underline transition"
            >
              Kelola galeri →
            </Link>
          </div>
          <div className="p-4 grid grid-cols-3 gap-3">
            {gallery.slice(0, 9).map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group border border-gray-200/80"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-black text-xs font-bold">star</span>
                  </div>
                )}
              </div>
            ))}
            {gallery.length === 0 && (
              <div className="col-span-3 py-10 text-center text-gray-400 text-sm">
                Belum ada foto di galeri.<br />
                <Link href="/admin/galeri" className="text-bracket-border hover:underline mt-1 inline-block font-semibold">
                  Upload foto pertama →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
