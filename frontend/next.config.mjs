import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your regular Next.js configurations
  reactStrictMode: true,
  // Add other Next.js specific configurations here
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

export default withPWAConfig(nextConfig);