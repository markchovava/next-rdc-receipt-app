/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{ 
        ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
        domains: ['127.0.0.1', 'localhost'], // Add your domains here
    },
};

export default nextConfig;
