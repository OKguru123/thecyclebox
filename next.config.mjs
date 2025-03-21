/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.101.80",
        port: "4000",
        pathname: "/static/**", // Allowing images from `/static/` folder
      },
    ],
  },
};

export default nextConfig;
