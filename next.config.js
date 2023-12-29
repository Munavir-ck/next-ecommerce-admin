/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["lh3.googleusercontent.com", "example.com", "another-domain.com",'next-e-commerce.s3.amazonaws.com'],
    },
};

module.exports = nextConfig;
