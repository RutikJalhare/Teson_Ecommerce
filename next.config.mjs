/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['fakestoreapi.com'],
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
}

export default nextConfig
