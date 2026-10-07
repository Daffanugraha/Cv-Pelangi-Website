"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      router.push("/admin/dashboard");
    } else {
      setError(data.error ?? "Login gagal. Periksa kembali username & password Anda.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Red & Dark Glow Accents (Identik dengan Desain Website Pelangi UV) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-bracket-border/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-bracket-border/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header CV Pelangi UV */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-[#14161c] border border-white/10 shadow-xl mb-4 backdrop-blur-md">
            <img
              src="/images/logo.png"
              alt="Logo CV Pelangi UV"
              className="h-10 sm:h-12 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Portal Admin Website
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 font-sans">
            Panel Pengelolaan Konten &amp; Layanan CV Pelangi UV
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#13151b] border border-white/10 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1b1e26] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                  placeholder="Masukkan username admin"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1b1e26] border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-bracket-border focus:ring-1 focus:ring-bracket-border transition font-sans"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-950/60 border border-red-800/80 rounded-xl px-4 py-3 animate-fade-in">
                <span className="material-symbols-outlined text-red-400 text-lg shrink-0">error</span>
                <p className="text-red-300 text-xs sm:text-sm font-sans">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bracket-border hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-bracket-border/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm">Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  <span className="text-sm">Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Panel khusus otorisasi staf &amp; manajemen CV Pelangi UV.<br />
              Sistem terlindungi enkripsi sesi terstandarisasi.
            </p>
          </div>
        </div>

        {/* Back to Site Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs sm:text-sm text-gray-400 hover:text-white transition inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Kembali ke Website CV Pelangi UV</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
