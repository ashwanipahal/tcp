const config = require('./cspPolicy.js');

const locations = ['us', 'ca'];

/**
 * This function configures helmet properties and setting CSP policies
 * @param {*} server | Object - Instance of express server
 * @param {*} helmet | Object - Instance of helmet package
 */
const settingCspConfig = (server, helmet) => {
  // Security headers
  server.set('x-powered-by', false);

  server.use(helmet.frameguard({ action: 'sameorigin' }));
  server.use(
    helmet.hsts({ force: true, maxAge: 10886400, includeSubDomains: true, preload: true })
  ); // 90 days
  server.use(helmet.noSniff());
  server.use(helmet.xssFilter());
  server.use(helmet.ieNoOpen());
  server.use(helmet.contentSecurityPolicy(config));
};

module.exports = {
  locations,
  settingCspConfig,
};
