/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.eulsa.vn",
        pathname: "/wp-content/uploads/**"
      }
    ]
  }
};
module.exports = nextConfig;
