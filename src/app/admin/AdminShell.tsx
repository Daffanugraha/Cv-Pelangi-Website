"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
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
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-lg">admin_panel_settings</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">CV Pelangi UV</p>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-violet-600/20 text-violet-300 border border-violet-600/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${active ? "text-violet-400" : ""}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-gray-800 space-y-2">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-all"
        >
          <span className="material-symbols-outlined text-xl">open_in_new</span>
          Lihat Website
        </a>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950 hover:text-red-300 transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          {loggingOut ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-gray-900 border-r border-gray-800 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-56 h-full bg-gray-900 border-r border-gray-800">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-56 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="text-sm text-gray-400">
            {navItems.find((n) => pathname.startsWith(n.href))?.label ?? "Admin"}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
