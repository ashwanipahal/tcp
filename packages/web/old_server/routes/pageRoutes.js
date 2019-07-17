module.exports = {
  baseRoutes: {
    index: '/:language',
  },

  routes: {
    index: '/:language',
    checkout: '/:language/checkout',
    error: '/:language/error',
    systemerror: '/:language/systemerror',
    orders: '/:language/orders/:id?',
    cart: '/:language/cart',
    'find-store': '/:language/find-store',
    'my-orders': '/:language/my-orders',
    payment: '/:language/payment',
    'story-detail': '/:language/story/:slug',
    'story-hub': '/:language/stories/:tag?',
    vouchers: '/:language/vouchers/:slug',
    pdp: '/:language/:categoriesSlug/:slug',
    category: '/:language/:categoriesSlug/:filter(filter)?/:tag?',
  },

  apiRoutes: {
    voucherRedemption: {
      type: 'get',
      url: '/:language/voucherredemption',
      callback: 'voucherRedemption',
    },
    ssoVoucherRedemption: {
      type: 'get',
      url: '/voucherredemption',
      callback: 'voucherRedemption',
    },
  },

  externalAPIs: {
    cart: '/api/cms/v1/cart',
  },

  fileExclusionList: ['_document.js', 'index.js', 'error.js'],
};
