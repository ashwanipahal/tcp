const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: ['@tcp'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
