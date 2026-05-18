import path from "node:path";
import { fileURLToPath } from "node:url";

/** Bu dosyanın bulunduğu klasör = bahen projesi (asla üst Desktop / Users kökü değil) */
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const tailwindcss = path.join(projectRoot, "node_modules/tailwindcss");
const tailwindPostcss = path.join(projectRoot, "node_modules/@tailwindcss/postcss");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss,
      "@tailwindcss/postcss": tailwindPostcss,
    },
  },
  outputFileTracingRoot: projectRoot,
  images: {
    localPatterns: [
      { pathname: "/api/img" },
      { pathname: "/**" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bahen.com.tr",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
