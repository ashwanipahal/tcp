/* eslint-disable */
import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
  loadedProductsPages: [],
};

export const ProductListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS:
      console.log('SET_PRODUCTS');
      return Object.assign({}, state, {
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        loadedProductsPages: action.payload.plpProducts,
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
