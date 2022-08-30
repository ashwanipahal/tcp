/**
 * @description - global config values which can be used in multiple components
 */

export const config = {
  PICKUP_TYPE: {
    boss: 'boss',
    bopis: 'bopis',
  },
  ORDER_ITEM_TYPE: {
    BOSS: 'BOSS',
    BOPIS: 'BOPIS',
    ECOM: 'ECOM',
  },
  CHECKOUT_ORDER: {
    ECOM_NO_STORE: 'eComNoStore',
    REVIEW_PRODUCT_SEQUENCE: ['SHIPIT', 'PICKUP'],
    PICKUP_ITEM_ORDER: ['BOPIS', 'BOSS'],
    ORDER_PICKUP_LABEL: 'PICKUP',
    ORDER_SHIPIT_LABEL: 'SHIPIT',
    ORDER_BOPIS_LABEL: 'BOPIS',
    ORDER_BOSS_LABEL: 'BOSS',
  },
  NON_ECOM_ORDERS: ['USBOPIS', 'CABOPIS', 'USROPIS', 'CAROPIS', 'USBOSS'],
};

export default config;
