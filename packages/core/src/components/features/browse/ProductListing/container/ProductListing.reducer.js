/* eslint-disable */
import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
  products: [],
  giftCardProducts: [],
};

export const ProductListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLISTINGPAGE_CONSTANTS.FETCH_PRODUCTS:
      return Object.assign({}, state, {
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        products: action.payload,
      });
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_GIFT_CARD_PRODUCTS:
      return Object.assign({}, state, {
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        giftCardProducts: action.payload,
      });
    default:
      return state;
  }
};
