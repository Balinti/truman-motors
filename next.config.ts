import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/truman-motors",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
