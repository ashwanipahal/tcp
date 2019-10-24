import { isCanada } from '../../../core/src/utils';

const country = isCanada() ? 'ca' : 'us';

const CHECKOUT_STAGES = {
  PICKUP: 'pickup',
  SHIPPING: 'shipping',
  BILLING: 'billing',
  REVIEW: 'review',
  CONFIRMATION: 'confirmation',
  INTERNATIONAL_CHECKOUT: 'international-checkout',
};

export const CHECKOUT_URLS = {
  PICKUP: `checkout/${CHECKOUT_STAGES.PICKUP}`,
  SHIPPING: `checkout/${CHECKOUT_STAGES.SHIPPING}`,
  BILLING: `checkout/${CHECKOUT_STAGES.BILLING}`,
  REVIEW: `checkout/${CHECKOUT_STAGES.REVIEW}`,
  CONFIRMATION: `checkout/${CHECKOUT_STAGES.CONFIRMATION}`,
  INTERNATIONAL_CHECKOUT: CHECKOUT_STAGES.INTERNATIONAL_CHECKOUT,
};

export const ADDED_TO_BAG_PAGE = 'isAddedToBagPage';

export const CHECKOUT_PAGE = 'checkout';

export const CHECKOUT_SECTIONS = {
  [CHECKOUT_STAGES.PICKUP]: {
    id: CHECKOUT_STAGES.PICKUP,
    page: CHECKOUT_PAGE,
    displayName: 'Pickup',
    pathPart: 'pickup',
    pathPattern: `/${country}/checkout/pickup`,
  },
  [CHECKOUT_STAGES.SHIPPING]: {
    id: CHECKOUT_STAGES.SHIPPING,
    page: CHECKOUT_PAGE,
    displayName: 'Shipping',
    pathPart: 'shipping',
    pathPattern: `/${country}/checkout/shipping`,
  },
  [CHECKOUT_STAGES.BILLING]: {
    id: CHECKOUT_STAGES.BILLING,
    page: CHECKOUT_PAGE,
    displayName: 'Billing',
    pathPart: 'billing',
    pathPattern: `/${country}/checkout/billing`,
  },
  [CHECKOUT_STAGES.REVIEW]: {
    id: CHECKOUT_STAGES.REVIEW,
    page: CHECKOUT_PAGE,
    displayName: 'Review',
    pathPart: 'review',
    pathPattern: `/${country}/checkout/review`,
  },
  [CHECKOUT_STAGES.CONFIRMATION]: {
    id: CHECKOUT_STAGES.CONFIRMATION,
    page: CHECKOUT_PAGE,
    displayName: '',
    pathPart: 'confirmation',
    pathPattern: `/${country}/checkout/confirmation`,
  },
};

export default CHECKOUT_STAGES;
