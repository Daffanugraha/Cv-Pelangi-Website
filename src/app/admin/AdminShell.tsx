"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/karir", icon: "work", label: "Lowongan Karir" },
  { href: "/admin/pelamar", icon: "badge", label: "Berkas Pelamar" },
  { href: "/admin/momen", icon: "collections_bookmark", label: "Momen & Kegiatan" },
  { href: "/admin/galeri", icon: "photo_library", label: "Galeri Foto" },
  { href: "/admin/leads", icon: "inbox", label: "Kotak Masuk Lead" },
  { href: "/admin/pengaturan", icon: "settings", label: "Pengaturan Site" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111216] text-white">
      {/* Brand Header with CV Pelangi UV Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#191b22] border border-white/10 shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo CV Pelangi UV"
              className="h-7 w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="font-heading font-extrabold text-white text-sm leading-tight tracking-tight">
              CV Pelangi UV
            </p>
            <p className="text-bracket-border text-[11px] font-mono font-bold uppercase tracking-wider">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-bracket-border text-white shadow-md shadow-bracket-border/30 font-bold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  active ? "text-white" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
        >
          <span className="material-symbols-outlined text-lg">open_in_new</span>
          <span>Lihat Website Utama</span>
        </a>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all disabled:opacity-50 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>{loggingOut ? "Keluar..." : "Keluar Sesi"}</span>
        </button>
      </div>
    </div>
  );

  const currentNav = navItems.find((n) => pathname.startsWith(n.href));

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900 font-sans">
      {/* Desktop Sidebar (Navy/Black Pelangi theme) */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#111216] border-r border-gray-800 fixed inset-y-0 left-0 z-30 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-60 h-full bg-[#111216] border-r border-gray-800">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area (Clean White & Light Canvas seperti Website CV Pelangi UV) */}
      <main className="flex-1 lg:ml-60 min-h-screen flex flex-col bg-[#F8F9FA]">
        {/* Top Bar Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka Menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-bracket-border" />
              <span className="font-heading font-bold text-sm sm:text-base text-gray-900">
                {currentNav?.label ?? "Panel Admin"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistem Aktif</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
