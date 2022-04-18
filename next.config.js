/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.js", "p.js", "route.js", "r.js"],
  images: {
    domains: ["localhost", "picsum.photos"],
  },
};

module.exports = nextConfig;
