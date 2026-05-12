import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.contentviewspro.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
              protocol: 'https',
              hostname: 'raw.githubusercontent.com', // Biasanya gambar GitHub raw ada di sini
            },
    ],
  },
};

export default nextConfig;
