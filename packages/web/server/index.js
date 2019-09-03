const express = require('express');
const next = require('next');
const helmet = require('helmet');
const device = require('express-device');
const {
  ROUTES_LIST,
  ROUTING_MAP,
  ROUTE_PATH,
  preRouteSlugs,
} = require('@tcp/core/src/config/route.config');
const redis = require('async-redis');

const {
  settingHelmetConfig,
  settingDeviceConfig,
  sites,
  siteIds,
  setEnvConfig,
  HEALTH_CHECK_PATH,
  ERROR_REDIRECT_STATUS,
} = require('./config/server.config');
const {
  initErrorReporter,
  getExpressMiddleware,
} = require('@tcp/core/src/utils/errorReporter.util');
const { ENV_DEVELOPMENT } = require('@tcp/core/src/constants/env.config');

const { connectRedis } = require('@tcp/core/src/utils/redis.util');

const dev = process.env.NODE_ENV === 'development';
setEnvConfig(dev);
const port = process.env.RWD_WEB_PORT || 3000;

const app = next({ dev, dir: './src' });

const server = express();

const handle = app.getRequestHandler();

settingHelmetConfig(server, helmet);

const setErrorReporter = () => {
  const config = {
    isServer: true,
    envId: process.env.RWD_WEB_ENV_ID,
    raygunApiKey: process.env.RWD_WEB_RAYGUN_API_KEY,
    isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,
  };
  initErrorReporter(config);
  const expressMiddleWare = getExpressMiddleware();
  if (expressMiddleWare) {
    server.use(expressMiddleWare);
  }
};
settingDeviceConfig(server, device);

const getLanguageByDomain = domain => {
  let langCode = domain.substr(0, 2).toLowerCase();

  // FIXME: backend should return this somehow, if not possible we need to complete this list
  return langCode === 'es' || langCode === 'en' || langCode === 'fr' ? langCode : 'en';
};

const setSiteDetails = (req, res) => {
  const { url } = req;
  let siteId = siteIds.us;
  let reqUrl = url.split('/');
  for (let i = 0; i < reqUrl.length - 1; i++) {
    if (reqUrl[i].toLowerCase() === siteIds.ca) {
      siteId = siteIds.ca;
      break;
    }
  }
  res.locals.siteId = siteId;
  res.locals.country = siteId === siteIds.ca ? 'CA' : 'US';
  res.locals.currency = siteId === siteIds.ca ? 'CAD' : 'USD';
  res.locals.language = getLanguageByDomain(req.hostname);
};

// TODO - To be picked from env config file when Gym build process is done....
const setBrandId = (req, res) => {
  const { hostname } = req;
  let brandId = 'tcp';
  const reqUrl = hostname.split('.');
  for (let i = 0; i < reqUrl.length - 1; i++) {
    if (reqUrl[i].toLowerCase() === 'gymboree') {
      brandId = 'gym';
      break;
    }
  }
  res.locals.brandId = brandId;
};

connectRedis({
  REDIS_CLIENT: redis,
  REDIS_HOST: process.env.RWD_REDIS_HOST,
  REDIS_PORT: process.env.RWD_WEB_REDIS_PORT,
});

const setHostname = (req, res) => {
  const { hostname } = req;
  res.locals.hostname = hostname;
};

setErrorReporter();

const redirectToErrorPage = (req, res) => {
  // TODO - To handle all this in Akamai redirect ?
  // This should redirect based on country like us/ca - Note hardcoded US
  // This method should handle all other cases like /wrongCountry/wrongRoute & /us/wrongRoute
  const errorPageRoute = '/' + siteIds.us + ROUTING_MAP.error;
  res.redirect(ERROR_REDIRECT_STATUS, errorPageRoute);
};

const redirectToHomePage = (req, res) => {
  const errorPageRoute = '/' + siteIds.us + ROUTE_PATH.home;
  res.redirect(ERROR_REDIRECT_STATUS, errorPageRoute);
};

app.prepare().then(() => {
  // Looping through the routes and providing the corresponding resolver route
  ROUTES_LIST.forEach(route => {
    const routeWithSlug = preRouteSlugs.join('') + route.path;
    // creating routes for country code eg: /:siteId?/xyz
    server.get(routeWithSlug, (req, res) => {
      const reqSiteId = req.params.siteId;
      const isValidSiteId = reqSiteId && sites.includes(reqSiteId.toLowerCase());
      if (!isValidSiteId) {
        redirectToErrorPage(req, res);
      }
      setSiteDetails(req, res);
      setBrandId(req, res);
      setHostname(req, res);
      // Handling routes without params
      if (!route.params) return app.render(req, res, route.resolver, req.query);

      // Handling routes with params
      const params = route.params.reduce((componentParam, paramKey) => {
        // eslint-disable-next-line no-param-reassign
        componentParam[paramKey] = req.params[paramKey];
        return componentParam;
      }, {});
      return app.render(req, res, route.resolver, params);
    });
  });

  server.get(HEALTH_CHECK_PATH, (req, res) => {
    res.send({
      success: true,
    });
  });

  server.get('/', redirectToHomePage);

  // handling of other routes
  server.get('*', (req, res) => {
    // TODO - To handle static files and all other routes here..
    // server.get('*', redirectToErrorPage);
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
