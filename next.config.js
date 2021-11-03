const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		register: true,
		sw: 'service-worker.js',
		dest: 'public',
		runtimeCaching,
	},
	webpack: function (config) {
		config.experiments = {};
		return config;
	},
});
