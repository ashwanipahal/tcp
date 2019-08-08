const dotenv = require('dotenv');
const path = require('path');

// TODO - Ideally, all this config should be moved to @tcp/core/services/config
const sites = ['us', 'ca'];
const siteIds = {
  us: 'us',
  ca: 'ca',
};
const brandIds = {
  tcp: 'tcp',
  gym: 'gym',
};
const envIds = {
  local: 'local',
  dev: 'dev',
  int: 'int',
  uat: 'uat',
  prod: 'prod',
};

const BRAND_CONFIG = brandIds.tcp;
const ENV_CONFIG = envIds.local;
const ENV_CONFIG_FILE_PATH = BRAND_CONFIG + '_' + ENV_CONFIG; // Set this to change the env file

/**
 * This function configures helmet properties and setting CSP policies
 * @param {*} server | Object - Instance of express server
 * @param {*} helmet | Object - Instance of helmet package
 */
const settingHelmetConfig = (server, helmet) => {
  // Security headers
  server.set('x-powered-by', false);

  server.use(helmet.frameguard({ action: 'sameorigin' }));
  server.use(
    helmet.hsts({ force: true, maxAge: 10886400, includeSubDomains: true, preload: true })
  ); // 90 days
  server.use(helmet.noSniff());
  server.use(helmet.xssFilter());
  server.use(helmet.ieNoOpen());
};

/**
 * This function sets the environment variables for local server run based on ENV_CONFIG_FILE_PATH variable
 * @param {*} dev | boolean - depicts whether environment is local
 */
const setEnvConfig = dev => {
  if (dev) {
    console.log(
      '************* Using Env Config File Of ' + ENV_CONFIG_FILE_PATH,
      '  *************'
    );
    dotenv.config({
      path: path.resolve(__dirname, `..${path.sep}env${path.sep}${ENV_CONFIG_FILE_PATH}.env`),
    });
  }
};

module.exports = {
  sites,
  siteIds,
  brandIds,
  settingHelmetConfig,
  setEnvConfig,
};
