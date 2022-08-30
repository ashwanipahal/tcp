/**
 * @description - global config values which can be used in multiple components
 */

const config = {
  SOCIAL_ACCOUNTS: {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter',
    pinterest: 'Pinterest',
  },

  SOCIAL_ACCOUNTS_INFO: {
    facebook: 'facebook',
    instagram: 'instagram',
    twitter: 'twitter',
    pinterest: 'pinterest',
  },
  SOCIAL_SDK: {
    pinterest: '//assets.pinterest.com/sdk/sdk.js',
    facebook: 'https://connect.facebook.net/en_US/sdk.js',
  },
  CLIENT_SECRET_KEY: {
    pinterest: '4985207481876624718',
    facebook: '312738492865420',
    instagram: '1e3babbc821c4dd8aa9a644b7bb97f8e',
  },
  VIEW_MODE: {
    read: 'read',
    edit: 'edit',
  },
  AUTH_URL: {
    INSTAGRAM: 'https://api.instagram.com/oauth/authorize/',
    TWITTER: 'https://api.twitter.com/oauth/authenticate',
  },
  ACCOUNT_REDIRECT: {
    TWITTER: '/twitter?stage=first',
  },
};

export default config;
