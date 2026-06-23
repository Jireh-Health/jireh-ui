import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jireh-health/ui"],
  images: { unoptimized: true },
};

export default nextConfig;
