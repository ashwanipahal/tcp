// import { fromJS } from 'immutable';
import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: 'xyz',
};

const ProductListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS:
      return {
        ...state,
        loadedProductsPages: [...state.loadedProductsPages, action.payload.loadedProductsPages[0]],
        isFirstTimeLoad: false,
      };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_FIRST_PRODUCTS_PAGE:
      return {
        ...state,
        ...action.productsPage,
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        isFirstTimeLoad: true,
        ssr: true,
      };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PLP_LOADING_STATE:
      return { ...state, ...action.payload };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_WISHLIST_ITEMS:
      return { ...state };
    case PRODUCTLISTINGPAGE_CONSTANTS.RESET_PRODUCTS:
      return { ...state };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_FIRST_PRODUCTS_PAGE_SSR:
      return {
        ...state,
        ...action.payload,
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        isFirstTimeLoad: true,
        ssr: true,
      };
    default: {
      return { ...state };
    }
  }
};

export default ProductListingReducer;
