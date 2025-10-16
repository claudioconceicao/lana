import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
          output: "export",
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
  },
  basePath: "/lana", // 👈 important!
  assetPrefix: "/lana/",
}
export default nextConfig
