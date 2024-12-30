
/** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;


const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
    ],
  },
};


export default nextConfig;




// const nextConfig = {
//   images: {
//     domains: ['127.0.0.1', 'p46sp2n4-8000.inc1.devtunnels.ms'],
//   },
// };
// export default nextConfig;
