import { fromJS } from 'immutable';
import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const ProductListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS:
      return state
        .set(
          'loadedProductsPages',
          state.get('loadedProductsPages').concat([action.payload.loadedProductsPages[0]])
        )
        .set('isFirstTimeLoad', false);
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_FIRST_PRODUCTS_PAGE:
      return state
        .merge(action.productsPage)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL())
        .set('isFirstTimeLoad', true);
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PLP_LOADING_STATE:
      return state.merge(action.payload);
    case PRODUCTLISTINGPAGE_CONSTANTS.RESET_PRODUCTS:
      return { ...state };
    default:
      return getDefaultState(state);
  }
};

export default ProductListingReducer;
