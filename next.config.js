/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n/next-i18next.config")
const nextConfig = {
  i18n,
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "demo.joodbooking.com",
      "res.cloudinary.com",
      "ghost.madatourism.com",
      "taysir.madatourism.com",
      "static.joodlab.com"
    ],
  },
}

module.exports = nextConfig
