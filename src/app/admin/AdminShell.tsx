"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Accordion state
  const isCareerActive =
    pathname.startsWith("/admin/karir") || pathname.startsWith("/admin/pelamar");
  const isGalleryActive =
    pathname.startsWith("/admin/galeri") || pathname.startsWith("/admin/momen");

  const [careerExpanded, setCareerExpanded] = useState(isCareerActive);
  const [galleryExpanded, setGalleryExpanded] = useState(isGalleryActive);

  // Keep expanded if route changes to child
  useEffect(() => {
    if (isCareerActive) setCareerExpanded(true);
    if (isGalleryActive) setGalleryExpanded(true);
  }, [isCareerActive, isGalleryActive]);

  // Cek masa aktif sesi login secara berkala (maksimal 2 jam)
  useEffect(() => {
    async function checkAuthSession() {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.status === 401) {
          window.location.href = "/admin";
        }
      } catch {
        // Abaikan gangguan jaringan sesaat
      }
    }

    checkAuthSession();
    const interval = setInterval(checkAuthSession, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const currentTab = searchParams.get("tab");

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
            <p className="text-[#F65456] text-[11px] font-mono font-bold uppercase tracking-wider">
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

        {/* 1. Dashboard */}
        <Link
          href="/admin/dashboard"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            pathname === "/admin/dashboard"
              ? "bg-[#F65456] text-white shadow-md shadow-[#F65456]/30 font-bold"
              : "text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl ${
              pathname === "/admin/dashboard" ? "text-white" : "text-gray-400"
            }`}
          >
            dashboard
          </span>
          <span>Dashboard</span>
        </Link>

        {/* 2. Karir (Collapsible Group: Lowongan & Berkas Lamaran) */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setCareerExpanded((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              isCareerActive
                ? "bg-white/10 text-white font-bold"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-xl ${
                  isCareerActive ? "text-[#F65456]" : "text-gray-400"
                }`}
              >
                work
              </span>
              <span>Karir & Pelamar</span>
            </div>
            <span
              className={`material-symbols-outlined text-lg transition-transform duration-200 text-gray-400 ${
                careerExpanded ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>

          {careerExpanded && (
            <div className="pl-4 pr-1 py-1 space-y-1 animate-fade-in border-l-2 border-white/10 ml-5">
              <Link
                href="/admin/karir"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pathname === "/admin/karir"
                    ? "bg-[#F65456] text-white shadow-sm font-bold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span>Lowongan Karir</span>
              </Link>
              <Link
                href="/admin/pelamar"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pathname === "/admin/pelamar"
                    ? "bg-[#F65456] text-white shadow-sm font-bold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">badge</span>
                <span>Berkas Lamaran</span>
              </Link>
            </div>
          )}
        </div>

        {/* 3. Galeri (Collapsible Group: Beranda, Momen, Pengaplikasian Produk) */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setGalleryExpanded((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              isGalleryActive
                ? "bg-white/10 text-white font-bold"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-xl ${
                  isGalleryActive ? "text-[#F65456]" : "text-gray-400"
                }`}
              >
                photo_library
              </span>
              <span>Kelola Galeri</span>
            </div>
            <span
              className={`material-symbols-outlined text-lg transition-transform duration-200 text-gray-400 ${
                galleryExpanded ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>

          {galleryExpanded && (
            <div className="pl-4 pr-1 py-1 space-y-1 animate-fade-in border-l-2 border-white/10 ml-5">
              <Link
                href="/admin/galeri?tab=beranda"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pathname === "/admin/galeri" && currentTab === "beranda"
                    ? "bg-[#F65456] text-white shadow-sm font-bold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">home</span>
                <span>Galeri di Beranda</span>
              </Link>
              <Link
                href="/admin/momen"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pathname === "/admin/momen"
                    ? "bg-[#F65456] text-white shadow-sm font-bold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">collections_bookmark</span>
                <span>Galeri Momen</span>
              </Link>
              <Link
                href="/admin/galeri?tab=produk"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  pathname === "/admin/galeri" && currentTab !== "beranda"
                    ? "bg-[#F65456] text-white shadow-sm font-bold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>Pengaplikasian Produk</span>
              </Link>
            </div>
          )}
        </div>

        {/* 4. Berita & Blog */}
        <Link
          href="/admin/blog"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            pathname.startsWith("/admin/blog")
              ? "bg-[#F65456] text-white shadow-md shadow-[#F65456]/30 font-bold"
              : "text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl ${
              pathname.startsWith("/admin/blog") ? "text-white" : "text-gray-400"
            }`}
          >
            newspaper
          </span>
          <span>Berita & Blog</span>
        </Link>

        {/* 5. Kotak Masuk Lead */}
        <Link
          href="/admin/leads"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            pathname.startsWith("/admin/leads")
              ? "bg-[#F65456] text-white shadow-md shadow-[#F65456]/30 font-bold"
              : "text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl ${
              pathname.startsWith("/admin/leads") ? "text-white" : "text-gray-400"
            }`}
          >
            inbox
          </span>
          <span>Kotak Masuk Lead</span>
        </Link>

        {/* 6. Pengaturan Site */}
        <Link
          href="/admin/pengaturan"
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            pathname.startsWith("/admin/pengaturan")
              ? "bg-[#F65456] text-white shadow-md shadow-[#F65456]/30 font-bold"
              : "text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl ${
              pathname.startsWith("/admin/pengaturan") ? "text-white" : "text-gray-400"
            }`}
          >
            settings
          </span>
          <span>Pengaturan Site</span>
        </Link>
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

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900 font-sans">
      {/* Desktop Sidebar (Navy/Black Pelangi theme) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#111216] border-r border-gray-800 fixed inset-y-0 left-0 z-30 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 h-full bg-[#111216] border-r border-gray-800">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200/90 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
              aria-label="Buka Menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="text-xs font-semibold text-gray-500">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900 font-mono">Administrator</p>
              <p className="text-[11px] text-gray-500">CV Pelangi UV</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-[#F65456] text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#F65456] rounded-full animate-spin" />
        </div>
      }
    >
      <ShellInner>{children}</ShellInner>
    </Suspense>
  );
}
