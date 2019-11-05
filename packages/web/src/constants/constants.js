export const brand = {
  TCP: 'tcp',
  GYMBOREE: 'gymboree',
};

export const sites = {
  us: {
    countryCode: 'US',
    currencyCode: 'USD',
  },
  ca: {
    countryCode: 'CA',
    currencyCode: 'CAD',
  },
};

export const keyboard = {
  KEY_ENTER: 13,
  KEY_SPACE: 32,
  KEY_ESCAPE: 27,
  KEY_UP: 38,
  KEY_DOWN: 40,
  KEY_HOME_KEY: 36,
  KEY_END_KEY: 35,
};

export const filterParams = {
  FILTER_CATAGORY: 'categoryPath2_uFilter',
  FILTER_COLOR: 'TCPColor_uFilter',
  FILTER_SIZE: 'v_tcpsize_uFilter',
  FILTER_PRICE_RANGE: 'unbxd_price_range_uFilter',
  FILTER_FIT: 'v_tcpfit_unbxd_uFilter',
  FILTER_GENDER: 'gender_uFilter',
  FILTER_AGE: 'age_group_uFilter',
};

export const clearAll = {
  CLEAR_ALL_SEARCH_FILTER: 'CLEAR_ALL_SEARCH_FILTER',
  CLEAR_ALL_PLP_FILTER: 'CLEAR_ALL_PLP_FILTER',
};

export const defaultDeviceType = 'desktop';

const OPTIMIZELY_DECISION_LABEL = 'optimizely_decision';

const OPTIMIZELY_HEADER_PREFIX = 'x-flag-';

const PREVIEW_RES_HEADER_KEY = 'x-akamai-staging';
const PREVIEW_REQ_HEADER_KEY = 'is_preview';

export default {
  brand,
  defaultDeviceType,
  OPTIMIZELY_DECISION_LABEL,
  OPTIMIZELY_HEADER_PREFIX,
  PREVIEW_RES_HEADER_KEY,
  PREVIEW_REQ_HEADER_KEY,
  sites,
  keyboard,
};
