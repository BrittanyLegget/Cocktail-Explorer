/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["unsplash.com", "images.unsplash.com", "media.istockphoto.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.txt$/i,
      use: [
        {
          loader: "raw-loader",
          options: {
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
