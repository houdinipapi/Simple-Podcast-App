/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['images.pexels.com'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
        ],
    },
};

// Updated next.config.js file
// module.exports = {
//     images: {
//         domains: ['via.placeholder.com'],
//     },
// };


export default nextConfig;
