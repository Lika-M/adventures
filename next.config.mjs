/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 's2-casavogue.glbimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'dynamic-media-cdn.tripadvisor.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        }
      ],
    },
  };
  
  export default nextConfig;
  
  
  
  