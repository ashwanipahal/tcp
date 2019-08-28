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
    path: '/place-card/application',
    resolver: '/ApplyCardPage',
  },
  {
    path: '/c/:l2?/:l3?',
    resolver: '/ProductListing',
    params: ['l2', 'l3'],
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
