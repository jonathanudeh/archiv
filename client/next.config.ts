import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: process.env.IPWHITELIST ? [process.env.IPWHITELIST] : [],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-003.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "myschoolgist.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
