/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/inquire',
        destination: '/anfrage',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
