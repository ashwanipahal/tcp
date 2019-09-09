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
    // TODO: change to process.env.RWD_WEB_ANALYTICS
    ANALYTICS: true,
    // TODO: change to process.env.RWD_WEB_ANALYTICS_SCRIPT_URL
    ANALYTICS_SCRIPT_URL:
      '//assets.adobedtm.com/launch-EN35cf63837e524037bc099142d8051c4b-development.min.js',
  },
  webpack(config, { isServer }) {
    const newConfig = config;
    newConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    newConfig.module.rules.forEach(rule => {
      const newRule = rule;
      if (newRule.use && newRule.use.loader === 'next-babel-loader') {
        newRule.use.options.configFile = path.resolve('./.babelrc');
      }
      return newRule;
    });
    if (!isServer) {
      newConfig.resolve.alias.fs = path.resolve(__dirname, 'lib/fake/method.js');
    }
    newConfig.node = {
      __dirname: false,
    };

    return newConfig;
  },
});
