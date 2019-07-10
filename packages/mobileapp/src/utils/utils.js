/* eslint-disable complexity */
/* eslint-disable global-require */
const brand = 'tcp';

export const getIcon = icon => {
  switch (icon) {
    case 'home-inactive':
      return require('../assets/images/icon-home-normal.png');
    case 'shop-inactive':
      return require('../assets/images/icon-shop-normal.png');
    case 'account-inactive':
      return require('../assets/images/icon-user-normal.png');
    case 'wallet-inactive':
      return require('../assets/images/icon-wallet-normal.png');
    case 'home-active': {
      if (brand === 'tcp') {
        return require('../assets/images/tcp/icon-home-active.png');
      }
      return require('../assets/images/gymboree/icon-home-active.png');
    }
    case 'shop-active': {
      if (brand === 'tcp') {
        return require('../assets/images/tcp/icon-shop-active.png');
      }
      return require('../assets/images/gymboree/icon-shop-active.png');
    }
    case 'account-active': {
      if (brand === 'tcp') {
        return require('../assets/images/tcp/icon-user-active.png');
      }
      return require('../assets/images/gymboree/icon-user-active.png');
    }
    case 'wallet-active': {
      if (brand === 'tcp') {
        return require('../assets/images/tcp/icon-wallet-active.png');
      }
      return require('../assets/images/gymboree/icon-wallet-active.png');
    }
    case 'tcp':
      return require('../assets/images/tcp/brand-logo.png');
    default:
      return require('../assets/images/icon-home-normal.png');
  }
};

export default {
  getIcon,
};
