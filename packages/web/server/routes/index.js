const RoutesMap = [
  {
    path: '/',
    resolver: '/index',
  },
  {
    path: '/home',
    resolver: '/index',
  },
  {
    path: '/login',
    resolver: '/login',
  },
  {
    path: '/account/:id?/:subSection?',
    resolver: '/account',
    params: ['id', 'subSection'],
  },
  {
    path: '/ds',
    resolver: '/DeltaSyncSamplePage',
  },
  {
    path: '/cc',
    resolver: '/ProductListingPage',
  },
  {
    path: '/place-card',
    resolver: '/WebInstantCredit',
  },
  {
    path: '/place-card/application',
    resolver: '/ApplyCardPage',
  },
  {
    path: '/c/:cid',
    resolver: '/ProductListing',
    params: ['cid'],
  },
  {
    path: '/test',
    resolver: '/test',
    withoutCountryCode: true,
  },
  {
    path: '/bag',
    resolver: '/Bag',
  },
  { path: '/cookiesTesting', resolver: '/cookiesTesting' },
  {
    path: '/gallery',
    resolver: '/gallery',
  },
  {
    path: '/checkout/:section',
    resolver: '/Checkout',
    params: ['section'],
  },
];

module.exports = RoutesMap;
