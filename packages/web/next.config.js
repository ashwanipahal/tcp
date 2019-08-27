const withTM = require('next-transpile-modules');
const path = require('path');

module.exports = withTM({
  transpileModules: ['@tcp'],
  useFileSystemPublicRoutes: false,
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
