/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.62.151.153'],
  turbopack: {
    resolveAlias: {
      canvas: './empty-module.js',
      encoding: './empty-module.js',
    },
  },
};
  /*async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
};*/

export default nextConfig;