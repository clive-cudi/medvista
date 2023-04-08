/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com"
    ]
  },
  env: {
    BACKEND_URL: `${process.env.BACKEND_URL}`,
    NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
    NEXTAUTH_SECRET: `${process.env.NEXTAUTH_SECRET}`,
    BACKEND_URL_PROD: `${process.env.BACKEND_URL_PROD}`,
    NEXTAUTH_URL_PROD: `${process.env.NEXTAUTH_URL_PROD}`,
    DEV_ENV: `${process.env.DEV_ENV}`
  }
}

module.exports = nextConfig
