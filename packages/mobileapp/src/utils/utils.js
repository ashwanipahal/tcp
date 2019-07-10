import icons from './icons';

const brandName = 'tcp';

export const getIconByBrand = (icon, brand) => {
  switch (icon) {
    case 'home-active':
      return icons[brand].homeActive;
    case 'shop-active': {
      return icons[brand].shopActive;
    }
    case 'account-active': {
      return icons[brand].accountActive;
    }
    case 'wallet-active': {
      return icons[brand].walletActive;
    }
    case 'brand-logo': {
      return icons[brand].brandLogo;
    }
    default:
      return icons.homeInactive;
  }
};

export const getIcon = icon => {
  switch (icon) {
    case 'home-inactive':
      return icons.homeInactive;
    case 'shop-inactive':
      return icons.shopInactive;
    case 'account-inactive':
      return icons.accountInactive;
    case 'wallet-inactive':
      return icons.walletInactive;
    default:
      return getIconByBrand(icon, brandName);
  }
};

export default {
  getIcon,
};
