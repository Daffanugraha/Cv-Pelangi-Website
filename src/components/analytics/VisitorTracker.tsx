"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getDeviceType(): "mobile" | "desktop" | "tablet" {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua)) {
    return "tablet";
  }
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua) || width < 768) {
    return "mobile";
  }
  return "desktop";
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "anonymous";
  const KEY = "pelangi_vis_id";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Abaikan jika route admin
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Hindari duplikasi track di path yang sama secara berturut-turut dalam 1 sesi instan
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    const device = getDeviceType();
    const visitorId = getVisitorId();
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    const timer = setTimeout(() => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer,
          device,
          visitorId,
        }),
      }).catch(() => {
        // Silent fail for analytics
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
