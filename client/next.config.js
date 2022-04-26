/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["unsplash.com", "images.unsplash.com", "media.istockphoto.com"],
  },
};

module.exports = nextConfig;
