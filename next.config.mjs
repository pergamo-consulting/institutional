/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // HTML estático: conteúdo no fonte, deploy em qualquer CDN
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
