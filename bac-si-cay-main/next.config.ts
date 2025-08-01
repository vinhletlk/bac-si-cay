import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

const isDevelopment = process.env.NODE_ENV === 'development';

let finalConfig = nextConfig;

if (!isDevelopment) {
  const withPWAInit = require("next-pwa");
  const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
  });
  finalConfig = withPWA(nextConfig);
}

export default finalConfig;
