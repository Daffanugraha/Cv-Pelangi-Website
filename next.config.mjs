/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // Hilangkan header X-Powered-By agar hacker tidak bisa mendeteksi versi Next.js
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pelangiuv.com',
      },
      {
        protocol: 'https',
        hostname: 'tfntrvdgbrvcmtiilqbb.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Mencegah clickjacking iframe oleh website asing
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Mencegah browser mengeksekusi file dengan MIME type yang dimanipulasi
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Blokir akses sensor hardware tanpa izin
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/produk',
        destination: '/layanan',
        permanent: false,
      },
      {
        source: '/aboutus',
        destination: '/#tentang-kami',
        permanent: false,
      },
      {
        source: '/about-us',
        destination: '/#tentang-kami',
        permanent: false,
      },
      {
        source: '/about',
        destination: '/#tentang-kami',
        permanent: false,
      },
      {
        source: '/tentang-kami',
        destination: '/#tentang-kami',
        permanent: false,
      },
      {
        source: '/tentangkami',
        destination: '/#tentang-kami',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/layanan',
        permanent: false,
      },
      {
        source: '/service',
        destination: '/layanan',
        permanent: false,
      },
      {
        source: '/products',
        destination: '/produk/bahan-baku',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/kontak',
        permanent: false,
      },
      {
        source: '/kontak-kami',
        destination: '/kontak',
        permanent: false,
      },
      {
        source: '/career',
        destination: '/karir',
        permanent: false,
      },
      {
        source: '/careers',
        destination: '/karir',
        permanent: false,
      },
      {
        source: '/galeri/produk',
        destination: '/galeri/pengaplikasian-produk',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icons/favicon.ico' },
      { source: '/apple-touch-icon.png', destination: '/icons/apple-touch-icon.png' },
      { source: '/apple-touch-icon-precomposed.png', destination: '/icons/apple-touch-icon.png' },
      // Backward compatibility rewrites for videos so old cached paths never 404:
      { source: '/videos/video-beranda.mp4', destination: '/videos/hero/video-beranda.mp4' },
      { source: '/videos/video-layanan.mp4', destination: '/videos/hero/video-layanan.mp4' },
      { source: '/videos/video-bahan-baku.mp4', destination: '/videos/hero/video-bahan-baku.mp4' },
      { source: '/videos/video-pengaplikasian.mp4', destination: '/videos/hero/video-pengaplikasian.mp4' },
      { source: '/videos/video-blog.mp4', destination: '/videos/hero/video-blog.mp4' },
      { source: '/videos/video-marketing.mp4', destination: '/videos/hero/video-kontak.mp4' },
      { source: '/videos/video-kontak.mp4', destination: '/videos/hero/video-kontak.mp4' },
      // Backward compatibility rewrites for moment images so old cached paths never 404:
      { source: '/images/expo-2025/:path*', destination: '/images/momen/expo-2025/:path*' },
      { source: '/images/expo-2024/:path*', destination: '/images/momen/expo-2024/:path*' },
      { source: '/images/expo-2023/:path*', destination: '/images/momen/expo-2023/:path*' },
      { source: '/images/gathering-2023/:path*', destination: '/images/momen/gathering-2023/:path*' },
      { source: '/images/hut-79/:path*', destination: '/images/momen/hut-79/:path*' },
      { source: '/images/momen-pertama/:path*', destination: '/images/momen/momen-pertama/:path*' },
      { source: '/images/momen-hero-backdrop.jpg', destination: '/images/momen/momen-hero-backdrop.jpg' },
    ];
  },
};

export default nextConfig;
