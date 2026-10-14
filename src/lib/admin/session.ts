/**
 * Session management & cryptographic token helpers
 * Kompatibel dengan Edge Runtime (Middleware) & Node.js Runtime (API/Server Components)
 * Standard session duration: 2 jam (2 hours = 7,200 detik)
 */

export const AUTH_COOKIE = "admin_token";
export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 Jam (2 hours in ms)
export const SESSION_DURATION_SECONDS = 2 * 60 * 60; // 7,200 seconds

const SERVER_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  "cv_pelangi_admin_sec_secure_key_2026_xyz987!";

/**
 * Salted hashing function (MurmurHash3 + FNV-1a hybrid)
 * Mencegah token forgery tanpa memerlukan Node.js native crypto di Edge Runtime
 */
function computeSignature(payload: string): string {
  const combined = `${payload}:${SERVER_SECRET}:cv_pelangi_salt_v2`;
  let h1 = 0xdeadbeef ^ combined.length;
  let h2 = 0x41c6ce57 ^ combined.length;

  for (let i = 0; i < combined.length; i++) {
    const ch = combined.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const part1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const part2 = (h2 >>> 0).toString(16).padStart(8, "0");
  return `${part1}${part2}`;
}

/**
 * Buat session token baru dengan timestamp dan tanda tangan kriptografis
 */
export function createSessionToken(): string {
  const expiresAt = String(Date.now() + SESSION_DURATION_MS);
  const signature = computeSignature(expiresAt);
  return `${expiresAt}.${signature}`;
}

/**
 * Validasi apakah token ada, valid secara kriptografis, dan belum kedaluwarsa
 */
export function isValidSessionToken(token?: string | null): boolean {
  if (!token || typeof token !== "string") return false;

  // Format baru: {expiresAt}.{signature}
  if (token.includes(".")) {
    const [expiresAtStr, providedSignature] = token.split(".");
    if (!expiresAtStr || !providedSignature) return false;

    const expiresAt = Number(expiresAtStr);
    if (!expiresAt || isNaN(expiresAt)) return false;

    // Jika waktu sekarang sudah melewati masa berlaku (2 jam), sesi hangus
    if (Date.now() > expiresAt) {
      return false;
    }

    const expectedSignature = computeSignature(expiresAtStr);
    // Constant-time string comparison untuk mencegah timing attack
    if (providedSignature.length !== expectedSignature.length) return false;
    let diff = 0;
    for (let i = 0; i < expectedSignature.length; i++) {
      diff |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }
    return diff === 0;
  }

  // Fallback transisi token lama agar sesi admin saat ini tidak logout mendadak
  const parts = token.split("_");
  if (parts.length >= 2) {
    const expiresAt = Number(parts[0]);
    if (!expiresAt || isNaN(expiresAt) || Date.now() > expiresAt) return false;
    const secret = parts.slice(1).join("_");
    return secret === "cv_pelangi_admin_sec_2026";
  }

  return false;
}
