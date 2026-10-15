import type { Metadata } from "next";
import Script from "next/script";
// CSS side-effect imports are handled by Next.js; avoid TypeScript's unresolved
// side-effect import diagnostic in projects without a CSS module declaration.
// @ts-ignore -- Next.js loads this global stylesheet at build time.
import "./globals.css";
import SiteLayoutWrapper from "@/components/layout/SiteLayoutWrapper";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cv-pelangi-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CV Pelangi UV - Jasa Finishing Percetakan Presisi & Bahan Baku",
    template: "%s | CV Pelangi UV",
  },
  description:
    "Pusat jasa finishing percetakan presisi dan grosir bahan baku: Spot UV, Hot Stamping Foil, Laminating Thermal, dan Pond Otomatis di Jawa Timur & Indonesia. Didukung 40+ unit mesin modern berkecepatan tinggi.",
  keywords: [
    "finishing cetak",
    "jasa finishing percetakan",
    "spot uv",
    "spot uv pasir",
    "hot stamping foil",
    "foil emas perak",
    "laminating thermal",
    "laminasi doff glossy",
    "pond otomatis",
    "die cutting",
    "grosir roll foil",
    "lem percetakan",
    "CV Pelangi UV",
    "finishing percetakan jawa timur",
    "percetakan sidoarjo",
    "percetakan surabaya",
    "percetakan jawa timur",
    "percetakan indonesia",
    "finishing kemasan packaging",
    "cetak buku eksklusif",
  ],
  authors: [{ name: "CV Pelangi UV", url: siteUrl }],
  creator: "CV Pelangi UV",
  publisher: "CV Pelangi UV",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CV Pelangi UV - When Quality Be A Priority | Finishing Percetakan",
    description:
      "Pusat jasa finishing percetakan presisi (Spot UV, Foil Stamping, Laminating, Pond Otomatis) & grosir bahan baku di Jawa Timur & Indonesia.",
    url: siteUrl,
    siteName: "CV Pelangi UV",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Logo Resmi CV Pelangi UV - Finishing Percetakan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Pelangi UV - Jasa Finishing Percetakan Presisi",
    description:
      "Spot UV, Hot Stamping Foil, Laminating Thermal & Pond Otomatis di Jawa Timur & Indonesia.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      className="scroll-smooth"
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#organization`,
              name: "CV Pelangi UV",
              alternateName: "Pelangi UV",
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              image: `${siteUrl}/images/logo.png`,
              description:
                "Pusat jasa finishing percetakan presisi (Spot UV, Hot Stamping Foil, Laminating Thermal, Pond Otomatis) & distributor bahan baku cetak berkualitas sejak 2004 melayani Jawa Timur dan seluruh Indonesia.",
              telephone: "+62318667469",
              areaServed: [
                {
                  "@type": "AdministrativeArea",
                  name: "Jawa Timur",
                },
                {
                  "@type": "Country",
                  name: "Indonesia",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Kompleks Pergudangan Bizpark C17-C19, Jabon, Tambaksawah, Kec. Waru",
                addressLocality: "Kabupaten Sidoarjo",
                addressRegion: "Jawa Timur",
                postalCode: "61256",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -7.3688,
                longitude: 112.7667,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "07:30",
                  closes: "15:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "07:30",
                  closes: "13:00",
                },
              ],
              priceRange: "$$",
            }),
          }}
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
