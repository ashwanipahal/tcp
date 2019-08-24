const CHECKOUT_STAGES = {
  PICKUP: 'pickup',
  SHIPPING: 'shipping',
  BILLING: 'billing',
  REVIEW: 'review',
  CONFIRMATION: 'confirmation',
};

export const CHECKOUT_PAGE = 'checkout';

export const CHECKOUT_SECTIONS = {
  [CHECKOUT_STAGES.PICKUP]: {
    id: CHECKOUT_STAGES.PICKUP,
    page: CHECKOUT_PAGE,
    displayName: 'Pickup',
    pathPart: 'pickup',
    pathPattern: '/us/checkout/pickup',
  },
  [CHECKOUT_STAGES.SHIPPING]: {
    id: CHECKOUT_STAGES.SHIPPING,
    page: CHECKOUT_PAGE,
    displayName: 'Shipping',
    pathPart: 'shipping',
    pathPattern: '/us/checkout/shipping',
  },
  [CHECKOUT_STAGES.BILLING]: {
    id: CHECKOUT_STAGES.BILLING,
    page: CHECKOUT_PAGE,
    displayName: 'Billing',
    pathPart: 'billing',
    pathPattern: '/us/checkout/billing',
  },
  [CHECKOUT_STAGES.REVIEW]: {
    id: CHECKOUT_STAGES.REVIEW,
    page: CHECKOUT_PAGE,
    displayName: 'Review',
    pathPart: 'review',
    pathPattern: '/us/checkout/review',
  },
  [CHECKOUT_STAGES.CONFIRMATION]: {
    id: CHECKOUT_STAGES.CONFIRMATION,
    page: CHECKOUT_PAGE,
    displayName: '',
    pathPart: 'confirmation',
    pathPattern: '/us/checkout/confirmation',
  },
};

export default CHECKOUT_STAGES;
