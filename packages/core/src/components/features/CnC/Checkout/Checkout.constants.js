const CONSTANTS = {
  INIT_CHECKOUT: 'INIT_CHECKOUT',
  ROUTING_CONST: {
    siteIds: {
      // the values here are the strings that make up the siteId protion of the sites' urls (i.e., it is the 'us' in the path ( /us/favorites)
      us: 'us',
      ca: 'ca',
    },
  },
  EMAIL_REGISTRATION_TYPE_CONSTANT: '10',
  CHECKOUT: 'checkout',
  CREDIT_CARD_CVV_INFO_LABEL: 'cvv_info',
  PAYMENT_METHOD_CREDIT_CARD: 'creditCard',
  ADDREESS_TYPE: {
    SHIPPING: 'Shipping',
    BILLING: 'Billing',
    SHIPPINGANDBILLING: 'ShippingAndBilling',
    MAILING: 'Mailing',
  },
  DEFAULT_LANGUAGE: 'en',
  REVIEW_ORDER_STATUS: 'V',
  ECOM: 'ECOM',
  NOT_AVAILABLE: '[NOT_AVAILABLE]',
  TRACKING_LINK_PREFIX_CONSTANT: '/shop/TCPOrderLookUp',
  SHIPMENT_TYPE_ID: 1,
  FOR_SEARCH: 1,
  COUPON_SCENARIO_CODE: '1006',
  COUPON_CUSTOMER_LOOKUP_TYPE: '1003',
  BAGPAGE: 'bag',
  US_LOCATION_ID: '0180',
  CA_LOCATION_ID: '3180',
  CHECKOUT_STAGES: {
    PICKUP: 'pickup',
    SHIPPING: 'shipping',
    BILLING: 'billing',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
    STAGES_ARRAY: ['pickup', 'shipping', 'billing', 'review'],
  },

  CHECKOUT_PAGES_NAMES: {
    CHECKOUT: 'checkout',
    PICKUP: 'pickupPage',
    SHIPPING: 'shippingPage',
    BILLING: 'billingPage',
    REVIEW: 'reviewPage',
    CONFIRMATION: 'confirmationPage',
  },

  CHECKOUT_ROUTES_NAMES: {
    CHECKOUT_PICKUP: 'CheckoutPickup',
    CHECKOUT_SHIPPING: 'CheckoutShipping',
    CHECKOUT_BILLING: 'CheckoutBilling',
    CHECKOUT_REVIEW: 'CheckoutReview',
    CHECKOUT_CONFIRMATION: 'CheckoutConfirmation',
  },

  PAYMENT_CARD_TYPE: {
    GC: 'GC',
  },

  CHECKOUT_FLAGS_SET_LOAD_METHODS: 'CHECKOUT_FLAGS_SET_LOAD_METHODS',
  CHECKOUT_ORDER_OPTIONS_SET_SHIPPING: 'CHECKOUT_ORDER_OPTIONS_SET_SHIPPING',
  SUBMIT_SHIPPING_SECTION: 'SUBMIT_SHIPPING_SECTION',
  SUBMIT_REVIEW_SECTION: 'SUBMIT_REVIEW_SECTION',
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
  CHECKOUT_VAlUES_SET_GIFT_WRAP: 'CHECKOUT_VAlUES_SET_GIFT_WRAP',
  GET_VENMO_CLIENT_TOKEN: 'GET_VENMO_CLIENT_TOKEN',
  GET_VENMO_CLIENT_TOKEN_SUCCESS: 'GET_VENMO_CLIENT_TOKEN_SUCCESS',
  GET_VENMO_CLIENT_TOKEN_ERROR: 'GET_VENMO_CLIENT_TOKEN_ERROR',
  SET_VENMO_PAYMENT_INPROGRESS: 'SET_VENMO_PAYMENT_INPROGRESS',
  SET_VENMO_DATA: 'SET_VENMO_DATA',
  CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT: 'CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT',
  CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_SHOW: 'CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_SHOW',
  CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_HIDE: 'CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_HIDE',
  ADD_GIFT_CARD_FAILED: 'ADD_GIFT_CARD_FAILED',
  ADD_GIFT_CARD_SUCCESS: 'ADD_GIFT_CARD_SUCCESS',
  RESET_ADD_GIFT_CARD: 'RESET_ADD_GIFT_CARD',
  RESET_ADD_GIFT_CARD_SUCCESS: 'RESET_ADD_GIFT_CARD_SUCCESS',
  PAYPAL_LOCATE: 'en_US',
  PAYPAL_LABEL: 'paypal',
};

const {
  CHECKOUT_PAGES_NAMES: { CHECKOUT },
  CHECKOUT_STAGES: { SHIPPING, PICKUP, BILLING, REVIEW, CONFIRMATION },
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
  confirmationPage: {
    to: `/${CHECKOUT}?section=${CONFIRMATION}`,
    asPath: `/${CHECKOUT}/${CONFIRMATION}`,
  },
};

export default CONSTANTS;
