/* eslint-disable */

const express = require('express');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressIp = require('express-ip');
const helmet = require('helmet');
// const axios = require('axios');
// const uuidv4 = require('uuid/v4');
// const LRUCache = require('lru-cache');
const { MACHINE_IP, PORT } = require('./config/appConfig');
// const CSPConfig = require('./config/cspConfig');
const {
  ENV_PRODUCTION,
  HEALTH_CHECK,
  // SITE_SETTING,
  // SERVER_FALLBACK_LOCALE,
  // COOKIES_EXPIRES,
} = require('../isomorphic/constants');

const routes = require('./routes');
//const { apiRoutes } = require('./routes/pageRoutes');
//const { isValidLocale, getUserLocation } = require('./utils/utils');

//const getPerfLoggerFactory = require('./utils/perfLogger');

//const appInsights = require('applicationinsights');

// if (process.env.NODE_ENV === ENV_PRODUCTION) {
//   appInsights
//     .setup(process.env.APP_INSIGHT_KEY)
//     .setAutoDependencyCorrelation(true)
//     .setAutoCollectRequests(true)
//     .setAutoCollectPerformance(true)
//     .setAutoCollectExceptions(true)
//     .setAutoCollectDependencies(true)
//     .setAutoCollectConsole(true)
//     .setUseDiskRetryCaching(true)
//     .start();
// }

// const { isStaticUrl, parseStaticUrl } = require('./utils/staticVersioning');

// const blackListUrls = [
//   '/static/',
//   '/fonts/',
//   '/_next/',
//   '/webassets/',
//   'favicon.ico',
//   'robots.txt',
//   'sitemap.xml',
// ];

const app = next({
  dev: process.env.NODE_ENV !== ENV_PRODUCTION,
  dir: './app',
});

// Cache HTML page here
// const ssrCache = new LRUCache({
//   length(n, key) {
//     return n.toString().length + key.toString().length;
//   },
//   max: 100 * 1000 * 1000, // 100MB cache soft limit
//   maxAge: 1000 * 60 * 60, // 1hour
// });

// function getCacheKey(req) {
//   return `${req.url}`;
// }

// async function renderAndCache(req, res, pagePath, queryParams) {
//   const key = getCacheKey(req);
//   if (ssrCache.has(key)) {
//     res.setHeader('x-cache', 'HIT');
//     res.send(ssrCache.get(key));
//     return;
//   }

//   try {
//     const html = await app.renderToHTML(req, res, pagePath, queryParams);
//     if (res.statusCode !== 200) {
//       res.send(html);
//       return;
//     }

//     ssrCache.set(key, html);
//     res.setHeader('x-cache', 'MISS');
//     res.send(html);
//   } catch (err) {
//     app.renderError(err, req, res, pagePath, queryParams);
//   }
// }

process.on('unhandledRejection', err => {
  /* eslint-disable-next-line no-console */
  console.log('Unhandled rejection:', err);
});

// Code for making the synchronous call to the session API to make
// sure there is no duplication for session IDs at the ATG layer
const handler = routes.getRequestHandler(app, async ({ req, res, route, query }) => {
  // Valid Locale handling
  // const validLocale = isValidLocale(req.params['0'].split('/')[1]);
  // req.cookies.locale = validLocale || SERVER_FALLBACK_LOCALE;
  // end

  app
    .render(req, res, route.page, query)
    .then(() => {})
    .catch(err => {
      /* eslint-disable-next-line no-console */
      console.log(err);
    });
});

app.prepare().then(() => {
  const server = express();
  server
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Parse cookies from request object
    .use(cookieParser())

    // Add perflogger to request object in order to share the same instance
    .use((req, res, nextMiddleware) => {
      // let isStaticPath = false;

      // blackListUrls.forEach((path) => {
      //   if (req.url.indexOf(path) !== -1) {
      //     isStaticPath = true;
      //   }
      // });

      // if (!isStaticPath) {
      //   /* eslint-disable-next-line no-console */
      //   console.log(`[PERFLOGGER] - OPEN - ${req.url}`);
      //   req.perfLoggerEnabled = true;
      //   req.perfLogger = getPerfLoggerFactory({ sessionId: req.cookies.JSESSIONID });
      // }
      nextMiddleware();
    })

    // Enable compression on response
    .use(compression())
    .use(expressIp().getIpInfoMiddleware)
    .use(helmet());
  // .use(helmet.contentSecurityPolicy(CSPConfig));

  // Health check route for load balanacer
  server.get(HEALTH_CHECK, (req, res) => {
    res.send({
      success: true,
    });
  });

  //   server.get('/', (req, res) => {
  //     /* eslint-disable-next-line no-console */
  // //    const userInfo = getUserLocation(req);
  //     const headers = {
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Headers': '*',
  //       'Content-Type': 'application/json',
  //       withCredentials: 'true',
  // //      'Ocp-Apim-Subscription-Key': process.env.API_SUBSCRIPTION_KEY,
  //       'X-Correlation-ID': uuidv4(),
  // //      country: userInfo.country,
  //     };

  //     try {
  //       axios
  //         .get(`${process.env.API_DOMAIN}${SITE_SETTING}`, {
  //           headers,
  //         })
  //         .then((response) => {
  //           if (response) {
  //             if (response && response.data) {
  //               res.redirect(`/${response.data.defaultLocale.code}`);
  //             } else {
  //               res.redirect(`/${SERVER_FALLBACK_LOCALE}`);
  //             }
  //           }
  //         })
  //         .catch(() => {
  //           res.redirect(`/${SERVER_FALLBACK_LOCALE}`);
  //         });
  //     } catch (error) {
  //       res.redirect(`/${SERVER_FALLBACK_LOCALE}`);
  //     }
  //   });

  const isSecure = process.env.NODE_ENV === ENV_PRODUCTION;

  // Handle post request for login
  // server.post('*', (req, res) => {
  //   const tokenInfo = req.body;
  //   if (tokenInfo && tokenInfo.access_token) {
  //     /* eslint-disable-next-line */
  //     const { access_token, token_type, expires_in, scope } = tokenInfo;
  //     res.cookie('accessToken', access_token, {
  //       maxAge: parseInt(expires_in, 10),
  //       secure: isSecure,
  //     });
  //     res.cookie('tokenType', token_type, { maxAge: parseInt(expires_in, 10), secure: isSecure });
  //     res.cookie('scope', scope, { maxAge: parseInt(expires_in, 10), secure: isSecure });
  //   }

  //   res.redirect(req.url);
  // });

  // Register routes for all the APIs created on node server
  // Object.keys(apiRoutes).forEach((name) => {
  //   const api = apiRoutes[name];
  //   const method = api.type.toLowerCase();
  //   const { url } = api;
  //   const path = `./api/${api.callback}`;
  //   /* eslint-disable-next-line  */
  //   const callback = require(path);
  //   /* eslint-enable */

  //   server[method](url, callback);
  // });

  // const sendFile = (req, res) => {
  //   const parsedUrl = parse(req.url, true);

  //   if (process.env.NODE_ENV === ENV_PRODUCTION) {
  //     // robots.txt and sitemap path handling
  //     const validLocale = isValidLocale(req.params['0'].split('/')[1]);
  //     const locale = validLocale || SERVER_FALLBACK_LOCALE;
  //     const rootStaticFiles = [
  //       '/robots.txt',
  //       '/sitemap.xml',
  //       `/${locale}/robots.txt`,
  //       `/${locale}/sitemap.xml`,
  //       '/favicon.ico',
  //     ];
  //     // const homePage = [
  //     //   `/${locale}`,
  //     // ];
  //     if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
  //       const fileName = parsedUrl.pathname.split('/')[2]
  //         ? parsedUrl.pathname.split('/')[2]
  //         : parsedUrl.pathname.split('/')[1];
  //       const path = join(__dirname, '../app/.next/dist/static/', fileName);
  //       res.sendFile(path);
  //       return;
  //     }

  //     if (isStaticUrl(req.url)) {
  //       [req.url] = parseStaticUrl(req.url).split('?');
  //       const filePath = join(__dirname, '../app/.next/dist', req.url);
  //       res.sendFile(filePath);
  //       return;
  //     }

  //     // Cache home page
  //     // if (homePage.indexOf(parsedUrl.pathname) > -1) {
  //     //   const queryParams = { language: locale };
  //     //   renderAndCache(req, res, '/', queryParams);
  //     //   return;
  //     // }
  //   }

  //   handler(req, res, parsedUrl);
  // };

  // Handle all other requests as page / static requests
  // server.get('*', (req, res) => {
  //   const userInfo = getUserLocation(req);
  //   if (!req.cookies.countryManualUpdate) {
  //     const cookieExpiry = COOKIES_EXPIRES * 24 * 60 * 60 * 1000;
  //     res.cookie('country', userInfo.country, { maxAge: cookieExpiry, secure: isSecure });
  //     res.cookie('userIp', userInfo.ip, { maxAge: cookieExpiry, secure: isSecure });
  //   }

  //   if (!req.cookies.country) {
  //     req.cookies.country = userInfo.country;
  //     req.cookies.userIp = userInfo.ip;
  //   }

  //   sendFile(req, res);
  // });

  const portNum = process.env.PORT || PORT;
  server.listen(portNum, err => {
    if (err) throw err;
    /* eslint-disable-next-line no-console */
    console.log(`> Ready on http://${MACHINE_IP}:${portNum}`);
  });
  /* eslint-enable no-console */
});
