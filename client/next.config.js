const i18n = require('./config/i18n.config');
const rewrites = require('./config/rewrite.config');
const intercept = require('intercept-stdout');

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
	if (text.includes('Duplicate atom key')) {
		return '';
	}
	return text;
}
if (process.env.NODE_ENV === 'development') {
	intercept(interceptStdout);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	i18n,
	async rewrites() {
		return rewrites;
	},
};

module.exports = nextConfig;
