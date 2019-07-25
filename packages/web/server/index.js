const express = require('express');
const next = require('next');
const helmet = require('helmet');
const RoutesMap = require('./routes');

const portIndex = process.argv.indexOf('-p') + 1;
const port = portIndex != 0 ? process.argv[portIndex] : 3000;

const dev = process.env.NODE_ENV === 'development';
const app = next({ dev, dir: './src' });

const locationCodes = require('./config/server.config').locations;
const { settingCspConfig } = require('./config/server.config');

const server = express();

const handle = app.getRequestHandler();

settingCspConfig(server, helmet);

app.prepare().then(() => {
  // Looping through the routes and providing the corresponding resolver route
  RoutesMap.forEach(route => {
    // creating routes for country code eg: /ca/xyz and /us/xyz
    const routePaths = route.withoutCountryCode
      ? route.path
      : locationCodes.map(location => `/${location}${route.path}`);
    server.get(routePaths, (req, res) => {
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
