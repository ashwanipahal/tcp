const express = require('express');
const next = require('next');
const RoutesMap = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });

app.prepare().then(() => {
  const server = express();

  RoutesMap.forEach(route => {
    const routePaths = [`/us${route.path}`, `/ca${route.path}`];
    server.get(routePaths, (req, res) => {
      if (!route.params) return app.render(req, res, route.resolver, req.query);

      const params = route.params.reduce((componentParam, paramKey) => {
        // eslint-disable-next-line no-param-reassign
        componentParam[paramKey] = req.params[paramKey];
        return componentParam;
      }, {});
      return app.render(req, res, route.resolver, params);
    });
  });

  server.get('*', (req, res) => {
    return app.render(req, res, '/404');
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
