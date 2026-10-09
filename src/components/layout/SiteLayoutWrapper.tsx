"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import GoogleTranslator from "@/components/layout/GoogleTranslator";
import VisitorTracker from "@/components/analytics/VisitorTracker";
import { LanguageProvider } from "@/context/LanguageContext";

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-gray-950 text-gray-100">{children}</div>;
  }

  return (
    <LanguageProvider>
      <GoogleTranslator />
      <VisitorTracker />
      <Navbar />
      <main suppressHydrationWarning className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </LanguageProvider>
  );
}
