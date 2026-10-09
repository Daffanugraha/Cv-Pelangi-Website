/**
 * Session management & token helpers
 * Token format: {expiresAt}_{secret}
 * Standard session duration: 2 jam (2 hours = 7,200 detik)
 */

export const AUTH_COOKIE = "admin_token";
export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 Jam (2 hours in ms)
export const SESSION_DURATION_SECONDS = 2 * 60 * 60; // 7,200 seconds

const DEFAULT_SECRET = "cv_pelangi_admin_sec_2026";

/**
 * Buat session token baru dengan masa kedaluwarsa 2 jam dari sekarang
 */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  return `${expiresAt}_${DEFAULT_SECRET}`;
}

/**
 * Validasi apakah token ada, valid, dan belum kedaluwarsa (> 2 jam)
 */
export function isValidSessionToken(token?: string | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split("_");
  if (parts.length < 2) return false;

  const expiresAt = Number(parts[0]);
  if (!expiresAt || isNaN(expiresAt)) return false;

  // Jika waktu sekarang sudah melewati masa berlaku (2 jam), sesi hangus
  if (Date.now() > expiresAt) {
    return false;
  }

  // Validasi secret
  const secret = parts.slice(1).join("_");
  return secret === DEFAULT_SECRET;
}
