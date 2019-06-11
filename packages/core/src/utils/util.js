import { ENV_PRODUCTION } from '@tcp/core/src/constants';

module.exports = {
  isProduction() {
    return process.env.NODE_ENV === ENV_PRODUCTION;
  },
  isDevelopment() {
    return process.env.NODE_ENV !== ENV_PRODUCTION;
  },
};
