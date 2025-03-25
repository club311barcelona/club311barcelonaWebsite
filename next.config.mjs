/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Deployment Configuration
  output: 'standalone',
  distDir: process.env.VERCEL ? '.next' : 'build',
  
  // Image Optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Server Configuration (moved from experimental)
  serverExternalPackages: ['@supabase/supabase-js'],

  // Experimental Features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    scrollRestoration: true,
    typedRoutes: true,
  },

  // Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  poweredByHeader: false,
  
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString()
  }
};

export default nextConfig;