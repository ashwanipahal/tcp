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
    path: '/test',
    resolver: '/test',
    withoutCountryCode: true,
  },
  {
    path: '/bag',
    resolver: '/Bag',
  },
  {
    path: '/pickup',
    resolver: '/Pickup',
  },
  {
    path: '/shipping',
    resolver: '/Shipping',
  },
  { path: '/cookiesTesting', resolver: '/cookiesTesting' },
  {
    path: '/gallery',
    resolver: '/gallery',
  },
];

module.exports = RoutesMap;
