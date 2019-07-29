import { PRODUCTLISTINGPAGE_CONSTANTS } from '../ProductListingPage.constants';

export const setPlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS,
    payload,
  };
};

export const getPlpProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS,
    payload,
  };
};

export const setGiftCardProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.SET_GIFT_CARD_PRODUCTS,
    payload,
  };
};

export const getGiftCardProducts = payload => {
  return {
    type: PRODUCTLISTINGPAGE_CONSTANTS.FETCH_GIFT_CARD_PRODUCTS,
    payload,
  };
};
