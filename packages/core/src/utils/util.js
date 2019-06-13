import { ENV_PRODUCTION } from '../constants/env.config';

module.exports = {
  isProduction() {
    return process.env.NODE_ENV === ENV_PRODUCTION;
  },
  isDevelopment() {
    return process.env.NODE_ENV !== ENV_PRODUCTION;
  },
};
