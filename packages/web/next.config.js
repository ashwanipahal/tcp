const withTM = require('next-transpile-modules');
const path = require('path');

module.exports = withTM({
  transpileModules: ['@tcp'],
  useFileSystemPublicRoutes: false,
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
