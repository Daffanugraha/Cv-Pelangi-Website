import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, isValidSessionToken } from "@/lib/admin/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lindungi semua rute admin (/admin/karir, /admin/dashboard, dll) kecuali halaman login (/admin)
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const token = request.cookies.get(AUTH_COOKIE)?.value;

    // Jika belum login atau sesi sudah lebih dari 2 jam (expired), tendang ke /admin
    if (!token || !isValidSessionToken(token)) {
      const loginUrl = new URL("/admin", request.url);
      const response = NextResponse.redirect(loginUrl);
      // Bersihkan cookie yang tidak valid/kadaluarsa
      response.cookies.delete(AUTH_COOKIE);
      return response;
    }
  }

  // Jika sudah login aktif (< 2 jam) dan membuka halaman login /admin, arahkan langsung ke dashboard
  if (pathname === "/admin") {
    const token = request.cookies.get(AUTH_COOKIE)?.value;
    if (token && isValidSessionToken(token)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
