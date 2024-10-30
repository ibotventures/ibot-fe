
/** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;


const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};


export default nextConfig;

