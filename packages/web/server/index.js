const logger = require('@tcp/core/src/utils/loggerInstance');

if (process.env.RWD_APPD_ENABLED === 'true') {
  try {
    require('appdynamics').profile({
      controllerHostName: process.env.RWD_APPD_CONTROLLER_HOST_NAME,
      controllerPort: 443,
      controllerSslEnabled: true,
      accountName: process.env.RWD_APPD_ACCOUNT_NAME,
      accountAccessKey: process.env.RWD_APPD_ACCOUNT_ACCESS_KEY,
      applicationName: process.env.RWD_APPD_APPLICATION_NAME,
      tierName: process.env.RWD_APPD_TIER_NAME,
      nodeName: process.env.HOSTNAME,
    });
  } catch (error) {
    logger.error('Unable to initialize AppDynamics', error);
  }
}

const express = require('express');
const next = require('next');
const helmet = require('helmet');
const device = require('express-device');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const {
  ROUTES_LIST,
  ROUTING_MAP,
  ROUTE_PATH,
  preRouteSlugs,
} = require('@tcp/core/src/config/route.config');
const redis = require('async-redis');
const { join } = require('path');

const {
  initErrorReporter,
  getExpressMiddleware,
} = require('@tcp/core/src/utils/errorReporter.util');
const { ENV_DEVELOPMENT, ENV_PRODUCTION } = require('@tcp/core/src/constants/env.config');

const {
  connectRedis,
  getDataFromRedis,
  setDataInRedis,
} = require('@tcp/core/src/utils/redis.util');
const {
  settingHelmetConfig,
  settingDeviceConfig,
  sites,
  siteIds,
  setEnvConfig,
  HEALTH_CHECK_PATH,
  ERROR_REDIRECT_STATUS,
  CACHE_CLEAR_PATH,
} = require('./config/server.config');

const dev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === ENV_PRODUCTION;

setEnvConfig(dev);
const isLocalEnv = process.env.RWD_WEB_ENV_ID === 'LOCAL';
const port = process.env.RWD_WEB_PORT || 3000;

const app = next({ dev, dir: './src' });

const xrayEnabled = process.env.XRAY_ENABLED === 'true';

const server = express();

if (xrayEnabled) {
  var AWSXRay = require('aws-xray-sdk');
  server.use(AWSXRay.express.openSegment(process.env.XRAY_ENVIRONMENT));
}
const handle = app.getRequestHandler();

settingHelmetConfig(server, helmet);

const setErrorReporter = () => {
  const config = {
    isServer: true,
    envId: process.env.RWD_WEB_ENV_ID,
    raygunApiKey: process.env.RWD_WEB_RAYGUN_API_KEY,
    isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,
  };
  if (process.env.IS_ERROR_REPORTING_NODE_ACTIVE) {
    initErrorReporter(config);
  }
  const expressMiddleWare = getExpressMiddleware();
  if (expressMiddleWare) {
    server.use(expressMiddleWare);
  }
};
settingDeviceConfig(server, device);

const getLanguageByDomain = domain => {
  const langCode = domain.substr(0, 2).toLowerCase();

  // FIXME: backend should return this somehow, if not possible we need to complete this list
  return langCode === 'es' || langCode === 'en' || langCode === 'fr' ? langCode : 'en';
};

const setSiteDetails = (req, res) => {
  const { url } = req;
  let siteId = siteIds.us;
  const reqUrl = url.split('/');
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

const setBrandId = (req, res) => {
  if (isLocalEnv) {
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
    return null;
  }
  res.locals.brandId = process.env.RWD_WEB_BRANDID;
};

setErrorReporter();

connectRedis({
  REDIS_CLIENT: redis,
  REDIS_HOST: process.env.RWD_REDIS_HOST,
  REDIS_PORT: process.env.RWD_WEB_REDIS_PORT,
});

const setHostname = (req, res) => {
  const { hostname } = req;
  logger.info('hostname: ', hostname);
  res.locals.hostname = hostname;
};

const redirectToErrorPage = (req, res) => {
  // TODO - To handle all this in Akamai redirect ?
  // This should redirect based on country like us/ca - Note hardcoded US
  // This method should handle all other cases like /wrongCountry/wrongRoute & /us/wrongRoute
  const errorPageRoute = `/${siteIds.us}${ROUTING_MAP.error}`;
  res.redirect(ERROR_REDIRECT_STATUS, errorPageRoute);
};

const redirectToHomePage = (req, res) => {
  const errorPageRoute = `/${siteIds.us}${ROUTE_PATH.home}`;
  res.redirect(ERROR_REDIRECT_STATUS, errorPageRoute);
};

/**
 * Function to get the cache key for the requested path
 * @param {object} req The request object
 */
const getCacheKey = req => {
  return `${req.path}`;
};
/**
 * Function to cache a requested path
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} app The express/next app instance
 * @param {string} resolver The route resolver
 * @param {object} params The route params
 * NOTE: To be used when page level cache is needed from redis, currently its done by akamai
 */
const renderAndCache = async (app, req, res, resolver, params) => {
  // Key it the request path
  const key = getCacheKey(req);

  try {
    const cachedKey = await getDataFromRedis(key);
    if (cachedKey) {
      logger.info(`ROUTE CACHE HIT: ${key}`);
      res.setHeader('x-cache', 'CACHE HIT');
      const data = JSON.parse(cachedKey);
      res.send(data.html);
      return;
    }
    const html = await app.renderToHTML(req, res, resolver, params);
    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    // TBD: The route paths that should not be cached.
    await setDataInRedis({
      data: { html },
      CACHE_IDENTIFIER: key,
    });
    logger.info(`ROUTE CACHE MISS: ${key}`);
    res.setHeader('x-cache', 'CACHE MISS');
    res.send(html);
  } catch (err) {
    if (!key.match(/error/)) {
      logger.error(err);
      redirectToErrorPage(req, res);
    } else {
      app.render(req, res, resolver, params);
    }
  }
};

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: join(__dirname, 'log'),
});

app.prepare().then(() => {
  // static files path - ignore version and serve file from the directory
  // this is being done to avoid serving stale files from Akamai - add version numbers to static files
  server.get(
    '/static/:buildId?/*.(css|js|jpeg|jpg|svg|png|gif|ttf|woff|woff2|eot|otf)',
    (req, res) => {
      const filePath = join(__dirname, '..', 'src/static', `${req.params[0]}.${req.params[1]}`);
      res.sendFile(filePath);
    }
  );

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
      if (!route.params) {
        app.render(req, res, route.resolver, req.query);
        return;
      }

      // Handling routes with params
      const params = route.params.reduce((componentParam, paramKey) => {
        // eslint-disable-next-line no-param-reassign
        componentParam[paramKey] = req.params[paramKey];
        return componentParam;
      }, {});
      app.render(req, res, route.resolver, params);
    });
  });

  server.get(HEALTH_CHECK_PATH, (req, res) => {
    res.send({
      success: true,
    });
  });
  // Clear redis cache
  server.get(CACHE_CLEAR_PATH, async (req, res) => {
    if (global.redisClient) {
      global.redisClient
        .flushdb()
        .then(() => {
          res.send({
            success: true,
          });
        })
        .catch(err => {
          res.send({
            success: false,
          });
        });
    } else {
      res.send({
        success: false,
      });
    }
  });

  // setup the logger
  if (isProd) {
    server.use(morgan('combined', { stream: accessLogStream }));
  }

  server.get('/', redirectToHomePage);

  // handling of other routes
  server.get('*', (req, res) => {
    // TODO - To handle static files and all other routes here..
    // server.get('*', redirectToErrorPage);
    return handle(req, res);
  });

  if (xrayEnabled) {
    server.use(AWSXRay.express.closeSegment());
  }
  server.listen(port, err => {
    if (err) throw err;
    logger.info(`> Ready on http://localhost:${port}`);
  });
});
