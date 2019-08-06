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
    path: '/c',
    resolver: '/ProductListingPage',
  },
  {
    path: '/cc',
    resolver: '/ProductListing',
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
];

module.exports = RoutesMap;
