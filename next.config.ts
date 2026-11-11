import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, // temporary sample photos
      { protocol: "https", hostname: "cdn.sanity.io" },       // CMS images later
    ],
  },
};

export default nextConfig;