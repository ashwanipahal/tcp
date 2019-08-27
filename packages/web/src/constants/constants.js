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

export const defaultDeviceType = 'desktop';

const OPTIMIZELY_DECISION_LABEL = 'optimizely_decision';

const OPTIMIZELY_HEADER_PREFIX = 'x-flag-';

export default {
  brand,
  defaultDeviceType,
  OPTIMIZELY_DECISION_LABEL,
  OPTIMIZELY_HEADER_PREFIX,
  sites,
};
