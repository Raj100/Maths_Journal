/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

// module.exports = {
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'http://127.0.0.1:5328/:path*', // Proxy to Backend
//         },
//       ]
//     },
//   }