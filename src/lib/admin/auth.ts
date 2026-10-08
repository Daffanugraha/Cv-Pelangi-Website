/**
 * Admin authentication helpers
 * Simple token-based auth stored in an encrypted env variable.
 * For production, replace with NextAuth.js or a proper session library.
 */

import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "pelangiuv2024";
const AUTH_COOKIE = "admin_token";
const AUTH_TOKEN = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;

export function verifyCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();
  return cleanUser === ADMIN_USERNAME.toLowerCase() && cleanPass === ADMIN_PASSWORD;
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
