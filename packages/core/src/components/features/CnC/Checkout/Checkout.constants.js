export default {
  INIT_CHECKOUT: 'INIT_CHECKOUT',
  ROUTING_CONST: {
    siteIds: {
      // the values here are the strings that make up the siteId protion of the sites' urls (i.e., it is the 'us' in the path ( /us/favorites)
      us: 'us',
      ca: 'ca',
    },
  },

  ADDREESS_TYPE: {
    SHIPPING: 'Shipping',
    BILLING: 'Billing',
    SHIPPINGANDBILLING: 'ShippingAndBilling',
    MAILING: 'Mailing',
  },
  CHECKOUT_STAGES: {
    PICKUP: 'pickup',
    SHIPPING: 'shipping',
    BILLING: 'billing',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
  },
  CHECKOUT_FLAGS_SET_LOAD_METHODS: 'CHECKOUT_FLAGS_SET_LOAD_METHODS',
  CHECKOUT_ORDER_OPTIONS_SET_SHIPPING: 'CHECKOUT_ORDER_OPTIONS_SET_SHIPPING',
  SUBMIT_SHIPPING_SECTION: 'SUBMIT_SHIPPING_SECTION',
  CHECKOUT_LOAD_SHIPMENT_METHODS: 'CHECKOUT_LOAD_SHIPMENT_METHODS',
  CHECKOUT_FLAGS_SET_ADDRESS_ERROR: 'CHECKOUT_FLAGS_SET_ADDRESS_ERROR',
  CHECKOUT_VALUES_SET_SMS_UPDATES: 'CHECKOUT_VALUES_SET_SMS_UPDATES',
};
