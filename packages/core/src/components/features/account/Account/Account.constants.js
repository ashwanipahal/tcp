import { ACCOUNT_ACTION_PATTERN } from '../../../../constants/reducer.constants';

const ACCOUNT_CONSTANTS = {
  GET_ACCOUNT_NAVIGATION_LIST: `${ACCOUNT_ACTION_PATTERN}GET_ACCOUNT_NAVIGATION_LIST`,
  SET_ACCOUNT_NAVIGATION_LIST: `${ACCOUNT_ACTION_PATTERN}SET_ACCOUNT_NAVIGATION_LIST`,
  SHOW_LOADER: `${ACCOUNT_ACTION_PATTERN}SHOW_LOADER`,
  GET_ACCOUNT_NAV_LIST_TTL: 30 * 1000,
  ACCOUNT_BRAND_US: 'TCP',
  ACCOUNT_CHANNEL_US: 'Desktop',
  ACCOUNT_COUNTRY_US: 'USA',
  ACCOUNT_BRAND_CA: 'TCP',
  ACCOUNT_CHANNEL_CA: 'Desktop',
  ACCOUNT_COUNTRY_CA: 'Canada',
  ACCOUNT_SITE_US: 'us',
  ACCOUNT_SITE_CA: 'ca',
  ACCOUNT_ANALYTICS: {
    navigationText: {
      createAccount: 'header-create account',
      logIn: 'header-log in',
      welcomeMsg: 'header-welcome message',
    },
  },
  FOOTER_LINKS: 'account-footer-links',
  LEGAL_LINKS: 'account-legal-links',
};

export default ACCOUNT_CONSTANTS;
