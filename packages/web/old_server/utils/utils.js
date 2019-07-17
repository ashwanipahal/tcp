/* eslint-disable */
const {
  ENV_PRODUCTION,
  SERVER_FALLBACK_LOCALE,
  DEFAULT_COUNTRY,
} = require('../../isomorphic/constants');
const { MACHINE_IP } = require('../config/appConfig');

module.exports = {
  getUserLocation: req => {
    /* eslint-disable */
    const userIP =
      (req.headers && req.headers['x-forwarded-for']) ||
      req.ip ||
      req._remoteAddress ||
      (req.connection && req.connection.remoteAddress);
    /* eslint-enable */
    let ip;
    if (process.env.NODE_ENV === ENV_PRODUCTION) {
      ip = userIP ? userIP.split(':')[0] : MACHINE_IP;
    } else {
      ip = MACHINE_IP;
    }

    return {
      country: (req.ipInfo && req.ipInfo.country) || DEFAULT_COUNTRY,
      ip,
    };
  },

  isValidLocale: param => process.env.LOCALE_LIST.split('|').find(item => param === item),

  getLocale: param => {
    return (
      process.env.LOCALE_LIST.split('|').find(item => param === item) || SERVER_FALLBACK_LOCALE
    );
  },
};
