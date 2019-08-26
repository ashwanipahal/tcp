// This will only read from system vars and ./.env
require('dotenv').config();
const withTM = require('next-transpile-modules');
const path = require('path');

module.exports = withTM({
  transpileModules: ['@tcp'],
  useFileSystemPublicRoutes: false,
  // This is to supply build-time environment vars to both server and client files:
  //    https://nextjs.org/docs#build-time-configuration
  // We can also use something like this if we need entire *.env file usage:
  //    https://github.com/zeit/next.js/blob/canary/examples/with-dotenv/next.config.js
  env: {
    ANALYTICS: process.env.RWD_WEB_ANALYTICS,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.forEach(rule => {
      const newRule = rule;
      if (newRule.use && newRule.use.loader === 'next-babel-loader') {
        newRule.use.options.configFile = path.resolve('./.babelrc');
      }
      return newRule;
    });

    return config;
  },
});
