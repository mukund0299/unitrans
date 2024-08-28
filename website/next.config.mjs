/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export'
	async rewrites() {
		return [
		  {
			source: '/api/:path*',
			destination: 'http://localhost:5093/api/:path*' // Proxy to Backend
		  }
		]
	  }
};

export default nextConfig;
