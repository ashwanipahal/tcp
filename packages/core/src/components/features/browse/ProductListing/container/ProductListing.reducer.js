import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

// eslint-disable-next-line complexity
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
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_LOYALTY_BANNER:
      return { ...state, ...action.payload };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_WISHLIST_ITEMS:
      return { ...state };
    case PRODUCTLISTINGPAGE_CONSTANTS.RESET_PRODUCTS:
      return { ...state };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_FILTER:
      return { ...state, ...{ selectedFilter: action.payload } };
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_ADD_TO_FAVORITE: {
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
    }
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
