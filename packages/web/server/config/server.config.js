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

module.exports = {
  sites,
  siteIds,
  brandIds,
  settingHelmetConfig,
};
