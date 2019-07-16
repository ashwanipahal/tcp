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
    path: '/account/:id',
    resolver: '/account',
    params: ['id'],
  },
  {
    path: '/ds',
    resolver: '/DeltaSyncSamplePage',
  },
  {
    path: '/p',
    resolver: '/ProductListingPage',
  },
];

module.exports = RoutesMap;
