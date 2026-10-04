/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
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
