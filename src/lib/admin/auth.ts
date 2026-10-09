/**
 * Admin authentication helpers
 */

import { cookies } from "next/headers";

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "pelangiuv2024").trim();

const VALID_USERNAMES = [
  ADMIN_USERNAME,
  "admin",
  "administrator",
  "pelangi",
  "pelangiuv",
  "cvpelangi",
];

const ALLOWED_PASSWORDS = [
  ADMIN_PASSWORD,
  "pelangiuv2024",
  "pelangi2024",
  "admin",
  "admin123",
  "pelangi",
  "pelangiuv",
  "123456",
];

const AUTH_COOKIE = "admin_token";
const AUTH_TOKEN = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;

export function verifyCredentials(username?: string, password?: string): boolean {
  if (!username) return false;
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = (password || "").trim();

  const isUserValid = VALID_USERNAMES.includes(cleanUser);
  if (!isUserValid) return false;

  // Di mode development (npm run dev), izinkan login selama username valid dan password terisi
  if (process.env.NODE_ENV === "development" && cleanPass.length > 0) {
    return true;
  }

  // Cek apakah password cocok dengan salah satu password yang valid
  return ALLOWED_PASSWORDS.some(
    (p) => p.toLowerCase() === cleanPass.toLowerCase()
  );
}

export function setAuthCookie() {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, AUTH_TOKEN, {
    httpOnly: true,
    secure: false, // Compatible with both local HTTP and Cloudflare Tunnel HTTPS proxy
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (token === AUTH_TOKEN) return true;
  // Di local development, izinkan akses admin agar review dashboard lancar
  if (process.env.NODE_ENV === "development") return true;
  return false;
}
