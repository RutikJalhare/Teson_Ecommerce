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
  output: 'standalone',
  trailingSlash: false,
}

export default nextConfig
