/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Deployment Configuration
  distDir: '.next',
  
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

  // Server Configuration
  serverExternalPackages: ['@supabase/supabase-js'],


  // Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false
  },

  // Modular Imports
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}'
    }
  },

  poweredByHeader: false,
  
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString();
  }
};

export default nextConfig;