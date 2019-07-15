import icons from './icons';

const brandName = 'tcp';

/**
 * This function returns icon based on brand
 * @param {*} icon Icon name
 * @param {*} brand Brand
 */
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

/**
 * Returns icon based on icon name, if not found will search for icon in current selected brand
 * @param {*} icon
 */
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

export const getIconCard = icon => {
  switch (icon) {
    case 'disc-small':
      return icons.dicoveryCard;
    case 'mc-small':
      return icons.masterCard;
    case 'amex-small':
      return icons.amexCard;
    case 'visa-small':
      return icons.visaSmall;
    case 'gift-card-small':
      return icons.giftCardSmall;
    case 'place-card-small':
      return icons.plccCard;
    case 'venmo-blue-acceptance-mark':
      return icons.venmoCard;
    default:
      return icons.visaSmall;
  }
};

export default {
  getIcon,
};
