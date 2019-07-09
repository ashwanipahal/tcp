/* eslint-disable global-require */
// eslint-disable-next-line import/prefer-default-export
export const getIcon = icon => {
  switch (icon) {
    case 'home':
      return require('../assets/images/shop.png');
    case 'shop':
      return require('../assets/images/shop.png');
    case 'account':
      return require('../assets/images/user-icon.png');
    case 'wallet':
      return require('../assets/images/wallet.png');
    case 'tcp':
      return require('../assets/images/tcp.png');
    case 'gymboree':
      return require('../assets/images/gymboree.png');
    default:
      return require('../assets/images/user-icon.png');
  }
};
