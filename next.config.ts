import { netlifyPlugin } from "@netlify/next";


const nextConfig = {
  
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default netlifyPlugin(nextConfig);