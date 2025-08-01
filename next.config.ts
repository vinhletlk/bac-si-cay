import type {NextConfig} from 'next';
import withPWAInit from "next-pwa";

const isDevelopment = process.env.NODE_ENV === 'development';

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

const withPWA = withPWAInit({
  dest: "public",
  disable: isDevelopment,
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
