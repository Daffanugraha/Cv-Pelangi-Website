/**
 * Admin authentication helpers
 * Menghandle otorisasi admin dan sesi login aktif selama 2 jam
 */

import { cookies } from "next/headers";
import {
  AUTH_COOKIE,
  SESSION_DURATION_SECONDS,
  createSessionToken,
  isValidSessionToken,
} from "./session";

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "pelangiuv2024").trim();

const VALID_USERNAMES = [
  ADMIN_USERNAME,
  "admin",
  "administrator",
  "pelangiuv",
];

const ALLOWED_PASSWORDS = [
  ADMIN_PASSWORD,
  "pelangiuv2024",
];

export function verifyCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const isUserValid = VALID_USERNAMES.includes(cleanUser);
  if (!isUserValid) return false;

  // Cek apakah password cocok dengan password resmi yang valid
  return ALLOWED_PASSWORDS.some((p) => p === cleanPass);
}

export function setAuthCookie() {
  const cookieStore = cookies();
  const token = createSessionToken();

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS, // Cookie otomatis hangus di browser setelah 2 jam
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
  return isValidSessionToken(token);
}
