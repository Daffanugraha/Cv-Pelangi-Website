/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  async redirects() {
    return [
      {
        source: '/produk',
        destination: '/layanan',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icons/favicon.ico' },
      { source: '/apple-touch-icon.png', destination: '/icons/apple-touch-icon.png' },
      { source: '/apple-touch-icon-precomposed.png', destination: '/icons/apple-touch-icon.png' },
    ];
  },
};

export default nextConfig;
