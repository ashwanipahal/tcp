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
  {
    path: '/billing',
    resolver: '/billing',
  },
  {
    path: '/review',
    resolver: '/review',
  },
  { path: '/cookiesTesting', resolver: '/cookiesTesting' },
  {
    path: '/gallery',
    resolver: '/gallery',
  },
  {
    path: '/checkout/:section?',
    resolver: '/Checkout',
    params: ['section'],
  },
];

module.exports = RoutesMap;
