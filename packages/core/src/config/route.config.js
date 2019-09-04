const ROUTE_PATH = {
  guestOrderDetails: ({ pathSuffix }) => `/track-order/${pathSuffix}`,
  home: '/home',
  // TODO - Make all page constants and use them in ROUTES_LIST for mapping
};

// DO NOT USE IMPORT IN IT, This file is run on node as well.
// Although this is a web specific file but need to move it to core to be used by all core components as well.

const preRouteSlugs = ['/:siteId?'];
const ROUTES_LIST = [
  // NOTE - This list is being used to make ROUTING_MAP as well,
  // if changing any route, make sure MAP is not referring to it.
  // For ex: ROUTING_MAP.home or ROUTING_MAP.error are being referred
  {
    noSlugPath: 'home',
    path: '/home',
    resolver: '/index',
  },
  {
    noSlugPath: 'login',
    path: '/login',
    resolver: '/login',
  },
  {
    noSlugPath: 'account',
    path: '/account/:id?/:subSection?',
    resolver: '/account',
    params: ['id', 'subSection'],
  },
  {
    noSlugPath: 'ds',
    path: '/ds',
    resolver: '/DeltaSyncSamplePage',
  },
  {
    noSlugPath: 'cc',
    path: '/cc',
    resolver: '/ProductListingPage',
  },
  {
    noSlugPath: 'place-card/application',
    path: '/place-card/application',
    resolver: '/ApplyCardPage',
  },
  {
    noSlugPath: 'c',
    path: '/c/:cid',
    resolver: '/ProductListing',
    params: ['cid'],
  },
  {
    noSlugPath: 'place-card',
    path: '/place-card',
    resolver: '/WebInstantCredit',
  },
  {
    noSlugPath: 'place-card-application',
    path: '/place-card/application',
    resolver: '/ApplyCardPage',
  },
  {
    noSlugPath: 'test',
    path: '/test',
    resolver: '/test',
  },
  {
    noSlugPath: 'bag',
    path: '/bag',
    resolver: '/Bag',
  },
  {
    noSlugPath: 'cookies-testing',
    path: '/cookies-testing',
    resolver: '/cookiesTesting',
  },
  {
    noSlugPath: 'gallery',
    path: '/gallery',
    resolver: '/gallery',
  },
  {
    noSlugPath: 'checkout',
    path: '/checkout/:section',
    resolver: '/Checkout',
    params: ['section'],
  },
  {
    noSlugPath: 'error',
    path: '/error',
    resolver: '/error',
  },
];

const ROUTING_MAP = {};
ROUTES_LIST.forEach(({ noSlugPath, resolver }) => {
  ROUTING_MAP[noSlugPath] = resolver;
});

module.exports = { ROUTES_LIST, preRouteSlugs, ROUTING_MAP, ROUTE_PATH };
