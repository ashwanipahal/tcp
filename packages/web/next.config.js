// This will only read from system vars and ./.env
require('dotenv').config();
const withTM = require('next-transpile-modules');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSourceMaps = require('@zeit/next-source-maps');
const nextBuildId = require('next-build-id');
const path = require('path');

const isProductionBuild = process.env.NODE_ENV === 'production';
const isSourceMapsEnabled = process.env.SOURCE_MAPS_ENABLED === 'true';
const isAnalyzeBundles = process.env.ANALYZE_BUNDLES === 'true';

let buildConfig = withTM({
  generateBuildId: () => process.env.RWD_WEB_BUILD_ID || nextBuildId({ dir: __dirname }),
  transpileModules: ['@tcp', '../core/+/*.+.js'],
  useFileSystemPublicRoutes: false,
  // This is to supply build-time environment vars to both server and client files:
  //    https://nextjs.org/docs#build-time-configuration
  // We can also use something like this if we need entire *.env file usage:
  //    https://github.com/zeit/next.js/blob/canary/examples/with-dotenv/next.config.js
  env: {
    // TODO: change to process.env.RWD_WEB_PERF_TIMING
    PERF_TIMING: true,
    // TODO: change to process.env.RWD_WEB_ANALYTICS
    ANALYTICS: true,
    // TODO: change to process.env.RWD_WEB_ANALYTICS_SCRIPT_URL
    ANALYTICS_SCRIPT_URL:
      '//assets.adobedtm.com/launch-EN2ad1a963f240455f9fff064520345530-development.min.js',
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

    /**
     * Polyfills added as per
     * https://nextjs.org/docs#browser-support
     * https://github.com/zeit/next.js/tree/canary/examples/with-polyfills
     */
    const originalEntry = newConfig.entry;
    newConfig.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./utils/polyfills.js')) {
        entries['main.js'].unshift('./utils/polyfills.js');
      }
      return entries;
    };

    return newConfig;
  },
});

if (isProductionBuild && isSourceMapsEnabled) {
  buildConfig = withSourceMaps(buildConfig);
}

if (isAnalyzeBundles) {
  const BUNDLE_ANALYZER_PATH = './bundle-sizes/bundles';
  const analyzerCommonOptions = {
    analyzerMode: 'static',
    openAnalyzer: false,
  };
  buildConfig = withBundleAnalyzer({
    analyzeServer: true,
    analyzeBrowser: true,
    bundleAnalyzerConfig: {
      server: {
        ...analyzerCommonOptions,
        reportFilename: `${BUNDLE_ANALYZER_PATH}/server.html`,
      },
      browser: {
        ...analyzerCommonOptions,
        reportFilename: `${BUNDLE_ANALYZER_PATH}/client.html`,
      },
    },
    ...buildConfig,
  });
}

module.exports = buildConfig;
