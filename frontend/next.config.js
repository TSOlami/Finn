/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
module.exports = {
	images: {
	  domains: ['lh3.googleusercontent.com'],
	  remotePatterns: [
		{
		  protocol: "https",
		  hostname: "source.unsplash.com",
		},
	  ],
	},
  };
