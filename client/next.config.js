const i18n = require('./config/i18n.config');
const rewrites = require('./config/rewrite.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n,
	async rewrites() {
		return rewrites;
	},
};

module.exports = nextConfig;
