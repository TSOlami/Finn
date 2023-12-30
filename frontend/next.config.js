/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "source.unsplash.com",
			},
		],
	},
};
