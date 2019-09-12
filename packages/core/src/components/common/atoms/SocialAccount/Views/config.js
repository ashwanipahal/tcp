/**
 * @description - global config values which can be used in multiple components
 */
/*eslint-disable */
export const config = {
  COUPONS_SLICE_COUNT: 2,
  REDEMPTION_TYPE: {
    PUBLIC: 'public',
    WALLET: 'wallet',
    REWARDS: 'rewards',
    LOYALTY: 'LOYALTY',
    PLACECASH: 'PLACECASH',
    PC: 'PLACECASH'
  },
  BARCODE_OPTIONS: {
    font: 'Avenir',
    fontOptions: 'bold',
    textMargin: 20,
    fontSize: 23,
  },
  COUPON_SHRINKED_SIZE: 3,
  SMS_SUBSCRIPTION: {
    MOBILE_REGEX: '^[0,2-9]{1}[0-9]{9}$',
  },
  PREFERENCE_TYPE: {
    MPR_PUSH: 'placeRewardsPush',
    MPR_SMS: 'placeRewardsSms',
    MP_EMAIL: 'marketingPreferenceEmail',
    MP_SMS: 'marketingPreferenceSms',
  },
  VIEW_MODE: {
    read: 'read',
    edit: 'edit',
  },
  CAROUSEL_OPTIONS: {
    showThumbs: false,
    useKeyboardArrows: true,
    showIndicators: true, //default is true but added here so to update if required in component
  },
  SOCIAL_ACCOUNTS: {
    instagram: 'instagram',
    facebook: 'facebook',
    twitter: 'twitter',
    pinterest: 'pinterest',
  },
  PLACE_REWARDS: {
    PATH_SUFFIX_DETAILS: 'myplace-rewards-page?ecid=mpr_txt_learn_glft_100916',
    PATH_SUFFIX_TNC: '#termsAndConditionsli',
  },
  EXTRA_POINTS: {
    VARIATION_ACTIVITY_LIST: 'activity-list',
    VARIATION_ACTIVITY_CAROUSEL: 'activity-carousel',
  },
  SOCIAL_SDK: {
    pinterest: '//assets.pinterest.com/sdk/sdk.js',
    facebook: 'https://connect.facebook.net/en_US/sdk.js',
  },
  AUTH_URL: {
    INSTAGRAM: 'https://api.instagram.com/oauth/authorize/',
    TWITTER: 'https://api.twitter.com/oauth/authenticate',
  },
  CLIENT_SECRET_KEY: {
    pinterest: '4985207481876624718',
    facebook: '621457808261442',
    instagram: '1e3babbc821c4dd8aa9a644b7bb97f8e',
  },
  PICKUP_TYPE: {
    boss: 'boss',
    bopis: 'bopis',
  },
  SKU_DETAILS: {
    color: 'color',
    fit: 'fit',
    size: 'size',
    quantity: 'quantity',
    distance: 'distance',
  },
  // Added config for type of order item
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
  MINIMUM_STORE_COUNT: 1,
  ACCOUNT_REDIRECT: {
    accountUrl: '/account/',
    account: 'account',
    PREFERENCE: '/account/my-preference',
    TWITTER: '/twitter?stage=first'
  },
  STORE_SWITCH: {
    OPEN_SELECTION_MODAL: 0,
    AUTO_SWITCH: 1,
    OPEN_RESTRICTED_MODAL: 2,
    CACHE_REFRESH_TIME_IN_MS: 3 * 60 * 60 * 1000,
  },
  UPDATE_ITEM_IN_CART: {
    X_CALCULATION_USAGE: '-1,-3,-5,-6,-7',
    X_UPDATE_DESCRIPTION: 'true',
  },
  PRODUCT_AVAILABILITY_STATUS: {
    OK: 'OK'
  },
  NON_ECOM_ORDERS: [
    'USBOPIS', 'CABOPIS', 'USROPIS', 'CAROPIS', 'USBOSS'
  ],
  ANALYTICS_MY_PREFERENCES: {
    "placeRewardsPushConnected": "analytics-place-rewards-push-connected",
    "placeRewardsPushNotConnected": "analytics-place-rewards-push-not-connected",
    "placeRewardsSmsConnected": "analytics-place-rewards-sms-connected",
    "placeRewardsSmsNotConnected": "analytics-place-rewards-sms-not-connected",
    "marketingPreferenceEmailConnected": "analytics-marketing-preference-email-connected",
    "marketingPreferenceEmailNotConnected": "analytics-marketing-preference-email-not-connected",
    "marketingPreferenceSmsConnected": "analytics-marketing-preference-sms-connected",
    "marketingPreferenceSmsNotConnected": "analytics-marketing-preference-sms-not-connected",
  },
  QUERY_PARAM: {
    'RECALC_REWARDS': 'recalc'
  },
  KEY_CODES: {
    ENTER: 13,
  },
  STORE_DATA_ATTRIBUTE: {
    STORE_HOURS: 'STORE_HOURS_JSON',
  },
  PICKUP_MODAL_MODE: {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
  },
  ANCHOR_CLASS: {
    SOCIAL: 'social-accounts',
    SMS_SUBSCRIPTION: 'prefrence-container',
    PROFILE_INFO_UPDATE: 'personal-information-container',
    PWD_UPDATE: 'change-password-container',
    MY_PLACE_REWARDS_WRAPPER: 'available-rewards',
    SFL_LIST: 'sfl-header'
  },
  TCP_SEGMENT: {
    key: 'tcpSegment'
  },
  MBOX_NAMES: {
    BAG_ABTEST_TOP_CAROUSEL: 'bag-abtest-top-carousel',
    BAG_ABTEST_BOTTOM_CAROUSEL: 'bag-abtest-bottom-carousel',
    BAG_LINES_ITEM_RECS: 'bag-line-item-recs'
  },
  REQUEST_TIMEOUT: {
    response: 30000,
    deadline: 40000
  },
  REQUEST_INCREASE_TIMEOUT: {
    response: 60000,
    deadline: 70000
  },
  PII_FIELDS_USERINFO_API : [
    'lastName',
    'phone', 
    'userBirthday', 
    'plccCardNumber',
    'plccCardId', 
    'profileAddress',
    'addressBook'
  ],
  TIMESTAMP_USERPROFILE_DATA_CACHE : 'TIMESTAMP_USER_CACHE',
  USERPROFILE_DATA_CACHE_KEY : 'USERPROFILE_DATA_CACHE_KEY',
  TCP_SESSION_ACTIVE: 'tcp_session_active'
};
