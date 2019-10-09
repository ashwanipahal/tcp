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

export const defaultDeviceType = 'desktop';

const OPTIMIZELY_DECISION_LABEL = 'optimizely_decision';

const OPTIMIZELY_HEADER_PREFIX = 'x-flag-';

const PREVIEW_HEADER_KEY = 'x-akamai-staging';

export default {
  brand,
  defaultDeviceType,
  OPTIMIZELY_DECISION_LABEL,
  OPTIMIZELY_HEADER_PREFIX,
  PREVIEW_HEADER_KEY,
  sites,
  keyboard,
};
