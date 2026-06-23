import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  transpilePackages: ["@jireh-health/ui"],
  images: { unoptimized: true },
  ...(isGhPages && {
    output: "export",
    basePath: "/jireh-ui",
  }),
};

export default nextConfig;
