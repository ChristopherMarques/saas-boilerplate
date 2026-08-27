/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler for automatic optimizations
  reactCompiler: true,

  // Strip console.log in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Skip type errors during build (run `pnpm type-check` separately in CI)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization for Supabase Storage
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Tree-shake lodash imports
  modularizeImports: {
    lodash: { transform: "lodash/{{member}}" },
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: "/:all*(svg|png|jpg|jpeg|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
