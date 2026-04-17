import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: process.env.IPWHITELIST ? [process.env.IPWHITELIST] : [],
};

export default nextConfig;
