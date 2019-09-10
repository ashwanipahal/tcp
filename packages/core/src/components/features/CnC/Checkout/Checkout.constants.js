const CONSTANTS = {
  INIT_CHECKOUT: 'INIT_CHECKOUT',
  ROUTING_CONST: {
    siteIds: {
      // the values here are the strings that make up the siteId protion of the sites' urls (i.e., it is the 'us' in the path ( /us/favorites)
      us: 'us',
      ca: 'ca',
    },
  },

  CHECKOUT: 'checkout',

  ADDREESS_TYPE: {
    SHIPPING: 'Shipping',
    BILLING: 'Billing',
    SHIPPINGANDBILLING: 'ShippingAndBilling',
    MAILING: 'Mailing',
  },
  BAGPAGE: 'bag',
  CHECKOUT_STAGES: {
    PICKUP: 'pickup',
    SHIPPING: 'shipping',
    BILLING: 'billing',
    REVIEW: 'review',
    STAGES_ARRAY: ['pickup', 'shipping', 'billing', 'review'],
  },

  CHECKOUT_PAGES_NAMES: {
    CHECKOUT: 'checkout',
    PICKUP: 'pickupPage',
    SHIPPING: 'shippingPage',
    BILLING: 'billingPage',
  },

  CHECKOUT_ROUTES_NAMES: {
    CHECKOUT_PICKUP: 'CheckoutPickup',
    CHECKOUT_SHIPPING: 'CheckoutShipping',
    CHECKOUT_BILLING: 'CheckoutBilling',
  },

  CHECKOUT_FLAGS_SET_LOAD_METHODS: 'CHECKOUT_FLAGS_SET_LOAD_METHODS',
  CHECKOUT_ORDER_OPTIONS_SET_SHIPPING: 'CHECKOUT_ORDER_OPTIONS_SET_SHIPPING',
  SUBMIT_SHIPPING_SECTION: 'SUBMIT_SHIPPING_SECTION',
  CHECKOUT_LOAD_SHIPMENT_METHODS: 'CHECKOUT_LOAD_SHIPMENT_METHODS',
  CHECKOUT_FLAGS_SET_ADDRESS_ERROR: 'CHECKOUT_FLAGS_SET_ADDRESS_ERROR',
  CHECKOUT_VALUES_SET_SMS_UPDATES: 'CHECKOUT_VALUES_SET_SMS_UPDATES',
  ROUTE_TO_PICKUP_PAGE: 'ROUTE_TO_PICKUP_PAGE',
  CHECKOUT_UPDATE_SHIPMENT_METHOD_SELECTION: 'CHECKOUT_UPDATE_SHIPMENT_METHOD_SELECTION',
  UPDATE_SHIPPING_ADDRESS: 'UPDATE_SHIPPING_ADDRESS',
  ADD_NEW_SHIPPING_ADDRESS: 'ADD_NEW_SHIPPING_ADDRESS',
  SET_ON_FILE_ADDRESS_KEY: 'SET_ON_FILE_ADDRESS_KEY',
  SUBMIT_BILLING_SECTION: 'SUBMIT_BILLING_SECTION',
  CHECKOUT_FLAGS_SET_BILLING_VISITED: 'CHECKOUT_FLAGS_SET_BILLING_VISITED',
  SET_GIFTCARD_ERROR: 'SET_GIFTCARD_ERROR',
  RESET_GIFTCARD_ERROR: 'RESET_GIFTCARD_ERROR',
  SET_ORDER_TOTAL: 'SET_ORDER_TOTAL',
  CUSTOM_OOS_ERROR_CODE: 'API_CART_OOS_ITEM',
};

const {
  CHECKOUT_PAGES_NAMES: { CHECKOUT },
  CHECKOUT_STAGES: { SHIPPING, PICKUP, BILLING, REVIEW },
  BAGPAGE,
} = CONSTANTS;

export const CHECKOUT_ROUTES = {
  bagPage: {
    to: `/${BAGPAGE}`,
    asPath: `/${BAGPAGE}`,
  },
  pickupPage: {
    to: `/${CHECKOUT}?section=${PICKUP}`,
    asPath: `/${CHECKOUT}/${PICKUP}`,
  },
  shippingPage: {
    to: `/${CHECKOUT}?section=${SHIPPING}`,
    asPath: `/${CHECKOUT}/${SHIPPING}`,
  },
  billingPage: {
    to: `/${CHECKOUT}?section=${BILLING}`,
    asPath: `/${CHECKOUT}/${BILLING}`,
  },
  reviewPage: {
    to: `/${CHECKOUT}?section=${REVIEW}`,
    asPath: `/${CHECKOUT}/${REVIEW}`,
  },
};

export default CONSTANTS;
