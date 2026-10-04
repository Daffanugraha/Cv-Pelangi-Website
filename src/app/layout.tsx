import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
// CSS side-effect imports are handled by Next.js; avoid TypeScript's unresolved
// side-effect import diagnostic in projects without a CSS module declaration.
// @ts-ignore -- Next.js loads this global stylesheet at build time.
import "./globals.css";
import SiteLayoutWrapper from "@/components/layout/SiteLayoutWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CV Pelangi UV - When Quality Be A Priority | Finishing Percetakan",
  description:
    "CV Pelangi UV adalah pusat jasa finishing percetakan presisi dan grosir bahan baku: Spot UV, Hot Stamping Foil, Laminating Thermal, dan Pond Otomatis di Bizpark Sidoarjo.",
  keywords: [
    "finishing cetak",
    "spot uv",
    "hot stamping foil",
    "laminating thermal",
    "pond otomatis",
    "CV Pelangi UV",
    "percetakan sidoarjo",
    "percetakan surabaya",
  ],
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <Script
          id="react-dom-patch"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof Node === 'function' && Node.prototype) {
                  var originalRemoveChild = Node.prototype.removeChild;
                  Node.prototype.removeChild = function(child) {
                    if (child.parentNode !== this) {
                      if (child.parentNode) {
                        try {
                          return child.parentNode.removeChild(child);
                        } catch (e) {
                          return child;
                        }
                      }
                      return child;
                    }
                    return originalRemoveChild.apply(this, arguments);
                  };

                  var originalInsertBefore = Node.prototype.insertBefore;
                  Node.prototype.insertBefore = function(newNode, referenceNode) {
                    if (referenceNode && referenceNode.parentNode !== this) {
                      if (referenceNode.parentNode) {
                        try {
                          return referenceNode.parentNode.insertBefore(newNode, referenceNode);
                        } catch (e) {
                          return originalInsertBefore.call(this, newNode, null);
                        }
                      }
                      return originalInsertBefore.call(this, newNode, null);
                    }
                    return originalInsertBefore.apply(this, arguments);
                  };
                }

                function protectAllIcons() {
                  var els = document.querySelectorAll('.material-symbols-outlined, .material-symbols-rounded, .material-symbols-sharp, .material-icons, [class*="material-symbols"]');
                  for (var i = 0; i < els.length; i++) {
                    els[i].setAttribute('translate', 'no');
                    if (!els[i].classList.contains('notranslate')) {
                      els[i].classList.add('notranslate');
                    }
                  }
                }
                if (typeof window !== 'undefined') {
                  window.addEventListener('DOMContentLoaded', protectAllIcons);
                  window.addEventListener('load', protectAllIcons);
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-surface-canvas font-sans text-text-body antialiased selection:bg-bracket-border selection:text-white">
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
