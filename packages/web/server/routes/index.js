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
    path: '/p',
    resolver: '/ProductListingPage',
  },
  {
    path: '/test',
    resolver: '/test',
    withoutCountryCode: true,
  },
  {
    path: '/cookiesTesting',
    resolver: '/cookiesTesting',
  },
];

module.exports = RoutesMap;
