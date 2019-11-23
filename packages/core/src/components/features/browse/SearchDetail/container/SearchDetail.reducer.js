import SLP_CONSTANTS from './SearchDetail.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const SearchDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SLP_CONSTANTS.SET_PRODUCTS:
      return {
        ...state,
        loadedProductsPages: [...state.loadedProductsPages, action.payload.loadedProductsPages[0]],
      };
    case SLP_CONSTANTS.SET_SLP_FIRST_PRODUCTS_PAGE:
      return { ...state, ...action.productsPage, [DEFAULT_REDUCER_KEY]: setCacheTTL() };
    case SLP_CONSTANTS.SET_SLP_LOADING_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.SET_SLP_SEARCHTERM_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.SET_SLP_RESULTS_AVAILABLE_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.RESET_PRODUCTS:
      return { ...state };
    case SLP_CONSTANTS.SET_ADD_TO_FAVORITE:
      if (state.loadedProductsPages) {
        state.loadedProductsPages[0].forEach(item => {
          if (
            item.miscInfo &&
            item.productInfo &&
            item.productInfo.generalProductId === action.payload.colorProductId
          ) {
            // eslint-disable-next-line no-param-reassign
            item.miscInfo = {
              ...item.miscInfo,
              isInDefaultWishlist: true,
              favoriteCounter: action.payload.res && action.payload.res.favoritedCount,
            };
          }
        });
      }
      return { ...state };
    default:
      return { ...state };
  }
};

export default SearchDetailReducer;
