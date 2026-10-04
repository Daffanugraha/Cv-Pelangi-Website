"use client";

import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useRouter } from "next/navigation";
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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-yellow-500/20 text-yellow-400" },
  contacted: { label: "Sudah Dihubungi", color: "bg-blue-500/20 text-blue-400" },
  sample_sent: { label: "Sampel Terkirim", color: "bg-purple-500/20 text-purple-400" },
  closed: { label: "Closed / Order", color: "bg-emerald-500/20 text-emerald-400" },
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
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-violet-500 rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Selamat datang 👋</h1>
        <p className="text-gray-400 text-sm mt-1">Ini adalah ringkasan aktivitas website CV Pelangi UV hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="photo_library" label="Foto di Galeri" value={gallery.length} color="text-violet-400" />
        <StatCard icon="inbox" label="Total Lead Masuk" value={leads.length} color="text-blue-400" />
        <StatCard
          icon="mark_unread_chat_alt"
          label="Lead Baru"
          value={newLeads}
          color="text-yellow-400"
          sub={newLeads > 0 ? "Butuh follow-up segera!" : "Semua sudah direspon ✓"}
        />
        <StatCard
          icon="star"
          label="Foto Featured"
          value={gallery.filter((g) => g.featured).length}
          color="text-emerald-400"
          sub="Tampil di halaman utama"
        />
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Lead Terbaru</h2>
            <a href="/admin/leads" className="text-xs text-violet-400 hover:text-violet-300 transition">
              Lihat semua →
            </a>
          </div>
          <div className="divide-y divide-gray-800">
            {leads.slice(0, 5).map((lead) => {
              const s = STATUS_LABELS[lead.status];
              return (
                <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.company} • {lead.service}</p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
            {leads.length === 0 && (
              <p className="text-center text-gray-600 text-sm py-8">Belum ada lead masuk.</p>
            )}
          </div>
        </div>

        {/* Recent Gallery */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Foto Galeri Terbaru</h2>
            <a href="/admin/galeri" className="text-xs text-violet-400 hover:text-violet-300 transition">
              Kelola galeri →
            </a>
          </div>
          <div className="p-4 grid grid-cols-3 gap-2">
            {gallery.slice(0, 9).map((item) => (
              <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-800 relative group">
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-black text-xs">star</span>
                  </div>
                )}
              </div>
            ))}
            {gallery.length === 0 && (
              <div className="col-span-3 py-8 text-center text-gray-600 text-sm">
                Belum ada foto di galeri.<br />
                <a href="/admin/galeri" className="text-violet-400 hover:underline">Upload foto pertama →</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
