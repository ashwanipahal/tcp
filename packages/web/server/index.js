const express = require('express');
const next = require('next');
const helmet = require('helmet');
const RoutesMap = require('./routes');
const {
  settingHelmetConfig,
  sites,
  siteIds,
  setEnvConfig,
  HEALTH_CHECK_PATH,
} = require('./config/server.config');

const dev = process.env.NODE_ENV === 'development';
setEnvConfig(dev);
const port = process.env.RWD_WEB_PORT || 3000;

const app = next({ dev, dir: './src' });

const server = express();

const handle = app.getRequestHandler();

settingHelmetConfig(server, helmet);

const setSiteId = (req, res) => {
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

const setHostname = (req, res) => {
  const { hostname } = req;
  res.locals.hostname = hostname;
};

app.prepare().then(() => {
  // Looping through the routes and providing the corresponding resolver route
  RoutesMap.forEach(route => {
    // creating routes for country code eg: /ca/xyz and /us/xyz
    const routePaths = route.withoutCountryCode
      ? route.path
      : sites.map(location => `/${location}${route.path}`);
    server.get(routePaths, (req, res) => {
      setSiteId(req, res);
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

  // handling of other routes
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
